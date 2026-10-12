import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';
export function databaseClient(root) {
  const filename=path.join(root,'.env.local');
  const env={};
  for(const line of (fs.existsSync(filename)?fs.readFileSync(filename,'utf8'):'').split(/\r?\n/)) {
    const match=line.match(/^([A-Z_][A-Z_0-9]*)\s*=\s*(.*)$/);
    if(match)env[match[1]]=match[2].trim().replace(/^(['"])(.*)\1$/,'$2');
  }
  const dsn=process.env.DATABASE_URL||env.DATABASE_URL;
  const projectUrl=process.env.NEXT_PUBLIC_SUPABASE_URL||env.NEXT_PUBLIC_SUPABASE_URL;
  if(!dsn||!projectUrl)throw new Error('Backend database configuration required');
  const url=new URL(dsn),project=new URL(projectUrl).hostname.split('.')[0];
  if(!/\.supabase\.(com|co)$/.test(url.hostname)||(!url.hostname.includes(project)&&!decodeURIComponent(url.username).endsWith('.'+project)))throw new Error('Unexpected database target');
  for(const key of ['sslmode','sslcert','sslkey','sslrootcert'])url.searchParams.delete(key);
  return new pg.Client({connectionString:url.href,ssl:{rejectUnauthorized:true,ca:fs.readFileSync(path.join(root,'supabase/prod-ca-2021.crt'),'utf8')},connectionTimeoutMillis:10000,query_timeout:30000});
}
