import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES } from '../scraper/config/categories.js';
import { getSourceDirectory } from '../lib/directory.js';
import { hash,publicObservation,planReconciliation,makeSnapshot,validateSnapshot } from '../lib/directoryReconciliation.js';
import { databaseClient } from './directory-db.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'data/directory.snapshot.json');
const args=new Set(process.argv.slice(2));
const backupTable='businesses_'+new Date().toISOString().replace(/[^0-9]/g,'');
if([...args].some(a=>!['--plan','--apply','--export','--check'].includes(a)))throw new Error('Unknown reconciliation option');
if(args.has('--check')) {
  validateSnapshot(JSON.parse(fs.readFileSync(output,'utf8')),CATEGORIES);
  console.log('Public directory snapshot integrity verified.');
  process.exit(0);
}
process.chdir(root);
const client=databaseClient(root);
let stage='connect';
try {
  await client.connect();
  await client.query('BEGIN');
  await client.query("SET LOCAL lock_timeout='5s'; SET LOCAL statement_timeout='30s'");
  const apply=args.has('--apply'),publish=apply||args.has('--export');
  if(apply) {
    await client.query('SELECT pg_advisory_xact_lock(71261012)');
    await client.query('LOCK TABLE public.businesses IN SHARE ROW EXCLUSIVE MODE');
    stage='backup';
    await client.query(`CREATE SCHEMA IF NOT EXISTS directory_reconciliation_backup_20261012;
      REVOKE ALL ON SCHEMA directory_reconciliation_backup_20261012 FROM PUBLIC,anon,authenticated,service_role;
      CREATE TABLE directory_reconciliation_backup_20261012.${backupTable} AS TABLE public.businesses;
      REVOKE ALL ON ALL TABLES IN SCHEMA directory_reconciliation_backup_20261012 FROM PUBLIC,anon,authenticated,service_role`);
    await client.query(fs.readFileSync(path.join(root,'supabase/migrations/20261012_directory_reconciliation.sql'),'utf8'));
  }
  stage='plan';
  const before=(await client.query('SELECT id,category_slug,name,rating,reviews_count,address,district,phone_public,website_url,maps_url FROM public.businesses ORDER BY id')).rows;
  const local=getSourceDirectory().flatMap(c=>c.businesses.map(b=>publicObservation(b,c.meta.slug,c.updatedAt)));
  const plan=planReconciliation(local,before);
  if(apply) {
    stage='apply';
    const inserts=plan.actions.filter(a=>a.kind==='insert').map(a=>({id:a.id,...a.observation}));
    for(let i=0;i<inserts.length;i+=250) await client.query(`INSERT INTO public.businesses(id,category_slug,name,address,district,phone_public,website_url,maps_url,rating,reviews_count,is_verified)
      SELECT id,category_slug,name,address,district,phone_public,website_url,maps_url,rating,reviews_count,false FROM jsonb_to_recordset($1::jsonb)
      AS x(id varchar(100),category_slug varchar(100),name varchar(255),address text,district varchar(100),phone_public varchar(50),website_url text,maps_url text,rating numeric,reviews_count integer)
      ON CONFLICT(id) DO NOTHING`,[JSON.stringify(inserts.slice(i,i+250))]);
    const updates=plan.actions.filter(a=>a.kind==='match'&&Object.keys(a.patch).length).map(a=>({id:a.id,patch:a.patch}));
    for(let i=0;i<updates.length;i+=250) await client.query(`UPDATE public.businesses b SET
      address=CASE WHEN x.patch?'address' THEN x.patch->>'address' ELSE b.address END,
      district=CASE WHEN x.patch?'district' THEN x.patch->>'district' ELSE b.district END,
      phone_public=CASE WHEN x.patch?'phone_public' THEN x.patch->>'phone_public' ELSE b.phone_public END,
      website_url=CASE WHEN x.patch?'website_url' THEN x.patch->>'website_url' ELSE b.website_url END,
      maps_url=CASE WHEN x.patch?'maps_url' THEN x.patch->>'maps_url' ELSE b.maps_url END,
      rating=CASE WHEN x.patch?'rating' THEN (x.patch->>'rating')::numeric ELSE b.rating END,
      reviews_count=CASE WHEN x.patch?'reviews_count' THEN (x.patch->>'reviews_count')::integer ELSE b.reviews_count END,
      updated_at=now() FROM jsonb_to_recordset($1::jsonb) AS x(id text,patch jsonb) WHERE b.id=x.id`,[JSON.stringify(updates.slice(i,i+250))]);
    const observations=plan.actions.map(a=>({business_id:a.id,source_hash:hash(a.observation),identity:a.identity,payload:a.observation,conflicts:a.conflicts||[]}));
    for(let i=0;i<observations.length;i+=250) await client.query(`INSERT INTO public.directory_source_observations(business_id,source,source_hash,identity,payload,conflicts)
      SELECT business_id,'todo_lima_static_files',source_hash,identity,payload,conflicts FROM jsonb_to_recordset($1::jsonb)
      AS x(business_id varchar(100),source_hash text,identity text,payload jsonb,conflicts jsonb) ON CONFLICT DO NOTHING`,[JSON.stringify(observations.slice(i,i+250))]);
    for(let i=0;i<plan.reviews.length;i+=250) await client.query(`INSERT INTO public.directory_reconciliation_reviews(source_hash,reason,identity,category_slug)
      SELECT source_hash,reason,identity,category_slug FROM jsonb_to_recordset($1::jsonb) AS x(source_hash text,reason text,identity text,category_slug text) ON CONFLICT DO NOTHING`,[JSON.stringify(plan.reviews.slice(i,i+250))]);
  }
  stage='verify';
  const rows=(await client.query(`SELECT b.id,b.category_slug,b.name,b.rating,b.reviews_count,b.address,b.district,b.phone_public,b.website_url,b.maps_url,b.updated_at,b.is_verified,
    d.name AS canonical_district FROM public.businesses b LEFT JOIN public.directory_districts d ON d.slug=b.district_slug ORDER BY b.id`)).rows;
  const afterIndex=new Map(rows.map(r=>[r.id,r]));
  const actionIndex=new Map(plan.actions.map(a=>[a.id,a]));
  for(const original of before) {
    const saved=afterIndex.get(original.id);if(!saved)throw new Error('Existing business removed');
    const patch=apply?(actionIndex.get(original.id)?.patch||{}):{};
    for(const key of Object.keys(original)) if(!(key in patch)&&saved[key]!==original[key])throw new Error('Populated field overwritten');
  }
  const replay=planReconciliation(local,rows);
  if(apply&&(replay.counts.inserts||replay.counts.updates))throw new Error('Reconciliation not idempotent');
  if(apply)for(const role of ['anon','authenticated','sector_catalog_reader_v1'])for(const table of ['directory_source_observations','directory_reconciliation_reviews']) {
    if((await client.query('SELECT has_table_privilege($1,$2,$3) AS allowed',[role,'public.'+table,'SELECT'])).rows[0].allowed)throw new Error('Source ledger unexpectedly public');
  }
  const categories=(await client.query('SELECT slug,title,area_slug FROM public.categories ORDER BY slug')).rows;
  const snapshot=makeSnapshot(rows,categories);validateSnapshot(snapshot,CATEGORIES);
  let restored=null;
  if(apply) {
    await client.query(`CREATE TEMP TABLE reconciled_restore_check AS TABLE directory_reconciliation_backup_20261012.${backupTable}`);
    restored=(await client.query('SELECT count(*)::int AS count FROM reconciled_restore_check')).rows[0].count;
    if(restored!==before.length)throw new Error('Backup restoration mismatch');
  }
  await client.query(apply?'COMMIT':'ROLLBACK');
  stage='export';
  if(publish) {
    if(fs.existsSync(output)) {
      const archive=path.join(root,'.directory-backups');fs.mkdirSync(archive,{recursive:true});
      fs.copyFileSync(output,path.join(archive,hash(fs.readFileSync(output,'utf8'))+'.json'));
    }
    const temp=output+'.tmp';fs.writeFileSync(temp,JSON.stringify(snapshot,null,2)+'\n');fs.renameSync(temp,output);
  }
  const report={...plan.counts,after:rows.length,committed:apply,snapshot_exported:publish,snapshot_sha256:snapshot.content_sha256,
    replay_inserts:replay.counts.inserts,replay_updates:replay.counts.updates,existing_populated_fields_preserved:true,
    districts:['Surquillo','Los Olivos'].map(d=>({name:d,count:snapshot.businesses.filter(b=>b.district===d).length})),
    backup_table:apply?'directory_reconciliation_backup_20261012.'+backupTable:null,backup_restored_rows:restored,
    private_leads_modified:false,contact:false};
  fs.mkdirSync(path.join(root,'.directory-reports'),{recursive:true});
  fs.writeFileSync(path.join(root,'.directory-reports',apply?'applied.json':publish?'exported.json':'plan.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));
} catch(error) {
  await client.query('ROLLBACK').catch(()=>{});
  console.error(JSON.stringify({stage,error_code:error.code||'RECONCILIATION_FAILED',snapshot_exported:false}));process.exitCode=1;
} finally {await client.end();}
