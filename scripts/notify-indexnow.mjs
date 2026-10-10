// Notify only URLs that actually changed; receipt is not proof of indexing.
import { SITE_URL } from '../lib/seo.js';
import fs from 'node:fs';
import { getDirectory, getLocalPages, getProfiles } from '../lib/directory.js';
import { GUIDES } from '../lib/guides.js';
const key = process.env.INDEXNOW_KEY || fs.readFileSync(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8').trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key || '')) throw new Error('Configure INDEXNOW_KEY and publish its matching UTF-8 verification file before notifying.');
const args = process.argv.slice(2);
const paths = args.length === 1 && args[0] === '--all' ? ['/', '/guias', '/metodologia', '/correcciones', '/para-negocios', ...getDirectory().map(c => `/${c.meta.slug}`), ...getLocalPages().map(p => `/${p.category}/${p.slug}`), ...getProfiles().map(p => `/negocios/${p.slug}`), ...GUIDES.map(g => `/guias/${g.slug}`)] : args;
const urlList = paths.map(value => new URL(value, SITE_URL));
if (!urlList.length || urlList.length > 10000) throw new Error('Provide between 1 and 10000 changed URLs.');
if (urlList.some(url => url.origin !== SITE_URL)) throw new Error('Only Todo Lima URLs may be submitted.');
const keyLocation = `${SITE_URL}/indexnow-key.txt`;
const verification = await fetch(keyLocation);
if (!verification.ok || (await verification.text()).trim() !== key) throw new Error('The public verification file does not match INDEXNOW_KEY.');
const result = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ host: new URL(SITE_URL).hostname, key, keyLocation, urlList: urlList.map(String) }) });
if (![200, 202].includes(result.status)) throw new Error(`IndexNow returned ${result.status}`);
console.log(`IndexNow received ${urlList.length} changed URLs (${result.status}); indexing is not guaranteed.`);
