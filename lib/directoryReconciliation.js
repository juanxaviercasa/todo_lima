import { createHash } from 'node:crypto';

export function canonical(v) { return Array.isArray(v) ? v.map(canonical) : v && typeof v==='object' ? Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])) : v; }
export function hash(v) { return createHash('sha256').update(JSON.stringify(canonical(v))).digest('hex'); }
export function mapsIdentity(value) {
  if (typeof value!=='string') return null;
  let url;try { url=new URL(value); } catch { return null; }
  if (!/(^|\.)google\.(com|com\.pe)$/.test(url.hostname) || !['https:','http:'].includes(url.protocol)) return null;
  let decoded;try{decoded=decodeURIComponent(url.href);}catch{return null;}
  const hex=decoded.match(/0x[0-9a-f]+:0x([0-9a-f]+)/i);
  if(hex) return 'cid:'+BigInt('0x'+hex[1]).toString();
  const cid=url.searchParams.get('cid');
  if(cid && /^\d+$/.test(cid)) return 'cid:'+BigInt(cid).toString();
  const place=url.searchParams.get('query_place_id') || decoded.match(/!19s(ChI[A-Za-z0-9_-]+)/)?.[1];
  return place ? 'place:'+place : null;
}
const text=v=>typeof v==='string' ? v.trim() : '';
const safeUrl=v=>{try{const u=new URL(v);return ['http:','https:'].includes(u.protocol)&&!u.username&&!u.password?u.href:null;}catch{return null;}};
export function publicObservation(b, category, capturedAt) {
  const rating=Number(b.rating);
  const reviews=Number(b.reviewsCount);
  return { category_slug:category,name:text(b.name),address:text(b.address)||null,
    district:text(b.district)||'Lima', phone_public:text(b.phone)||null,
    website_url:safeUrl(b.website),maps_url:safeUrl(b.url),
    rating:b.rating!=null&&Number.isFinite(rating)&&rating>0&&rating<=5?rating:null,
    reviews_count:b.reviewsCount!=null&&Number.isInteger(reviews)&&reviews>=0?reviews:null,
    captured_at:capturedAt||null };
}
export function planReconciliation(local, remote) {
  const groups=new Map(), remoteIndex=new Map();
  for(const row of remote) {
    const identity=mapsIdentity(row.maps_url);
    if(!identity)continue;
    const key=row.category_slug+'|'+identity;
    if(!remoteIndex.has(key))remoteIndex.set(key,[]);
    remoteIndex.get(key).push(row);
  }
  const actions=[],reviews=[];
  for(const item of local) {
    const identity=mapsIdentity(item.maps_url);
    if(!item.name || !identity){reviews.push({reason:'missing_strong_identity',source_hash:hash(item),category_slug:item.category_slug});continue;}
    const key=item.category_slug+'|'+identity;
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(item);
  }
  for(const [key,items] of groups) {
    const unique=[...new Map(items.map(i=>[hash(i),i])).values()];
    const matches=remoteIndex.get(key)||[];
    if(unique.length!==1||matches.length>1){reviews.push({reason:unique.length!==1?'local_identity_conflict':'remote_identity_collision',identity:key,source_hash:hash(unique)});continue;}
    const item=unique[0], existing=matches[0];
    if(!existing){actions.push({kind:'insert',id:'dir_'+hash(key).slice(0,32),identity:key,observation:item});continue;}
    // Preserve populated remote fields. Only fill actual gaps; conflicts stay in observations.
    const patch={};
    for(const field of ['address','phone_public','website_url','maps_url']) if(!text(existing[field])&&item[field])patch[field]=item[field];
    if((!text(existing.district)||existing.district==='Lima')&&item.district!=='Lima')patch.district=item.district;
    if(existing.rating==null&&item.rating!=null)patch.rating=item.rating;
    if(existing.reviews_count==null&&item.reviews_count!=null)patch.reviews_count=item.reviews_count;
    const conflicts=['name','address','phone_public','website_url','district'].filter(f=>text(existing[f])&&text(item[f])&&existing[f]!==item[f]&&!(f in patch));
    actions.push({kind:'match',id:existing.id,identity:key,patch,conflicts,observation:item});
  }
  return {actions,reviews,counts:{local:local.length,remote:remote.length,inserts:actions.filter(a=>a.kind==='insert').length,
    matches:actions.filter(a=>a.kind==='match').length,updates:actions.filter(a=>a.kind==='match'&&Object.keys(a.patch).length).length,
    conflicting_matches:actions.filter(a=>a.conflicts?.length).length,review:reviews.length,
    review_reasons:Object.fromEntries([...new Set(reviews.map(r=>r.reason))].map(reason=>[reason,reviews.filter(r=>r.reason===reason).length])),
    filled_fields:Object.fromEntries(['address','district','phone_public','website_url','maps_url','rating','reviews_count'].map(field=>[field,actions.filter(a=>a.patch&&field in a.patch).length]))}};
}
export function makeSnapshot(rows, categories) {
  const names=new Map(categories.map(c=>[c.slug,c.title]));
  const businesses=rows.map(b=>({id:b.id,supabase_business_id:b.id,name:b.name,categorySlug:b.category_slug,
    category:names.get(b.category_slug),address:b.address,district:b.canonical_district||'Lima',
    phone:b.phone_public,website:b.website_url,url:b.maps_url,rating:b.rating==null?null:Number(b.rating),
    reviewsCount:b.reviews_count,entityId:createHash('sha256').update(b.maps_url||`${b.name}|${b.address}`).digest('hex').slice(0,12),
    updatedAt:new Date(b.updated_at).toISOString()}));
  const content={schema_version:'1.0',source:'supabase_public_directory',categories:categories.map(c=>({slug:c.slug,area_slug:c.area_slug})),businesses};
  return {...content,content_sha256:hash(content)};
}
export function validateSnapshot(snapshot, expectedCategories) {
  const {content_sha256,...content}=snapshot;
  if(snapshot.source!=='supabase_public_directory'||snapshot.schema_version!=='1.0'||hash(content)!==content_sha256)throw new Error('Invalid public directory snapshot');
  if(snapshot.categories.length!==expectedCategories.length||new Set(snapshot.categories.map(c=>c.slug)).size!==expectedCategories.length||expectedCategories.some(c=>!snapshot.categories.some(s=>s.slug===c.slug)))throw new Error('Snapshot taxonomy mismatch');
  const fields=new Set(['id','supabase_business_id','name','categorySlug','category','address','district','phone','website','url','rating','reviewsCount','entityId','updatedAt']);
  const ids=new Set();
  for(const b of snapshot.businesses){if(ids.has(b.id)||Object.keys(b).some(k=>!fields.has(k))||!expectedCategories.some(c=>c.slug===b.categorySlug))throw new Error('Invalid public snapshot row');ids.add(b.id);}
}
