import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CATEGORIES } from '../scraper/config/categories.js';
import { CATEGORY_DETAILS } from '../lib/categoryEditorial.js';
import { getDirectory, getLocalPages, getProfiles } from '../lib/directory.js';
import { extractDistrict } from '../lib/districts.js';
import { businessPhone } from '../lib/contact.js';
import { serializeSchema } from '../lib/seo.js';
import { GUIDES } from '../lib/guides.js';
const files = fs.readdirSync('data').filter(f => f.endsWith('.json'));
let total = 0;
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(`data/${file}`, 'utf8'));
  assert(Array.isArray(data.businesses), `${file}: missing businesses`);
  for (const b of data.businesses) {
    assert.equal(typeof b.name, 'string', `${file}: invalid business name`);
    assert(b.name.trim(), `${file}: empty business name`);
    assert(!b.url || /^https:\/\/www\.google\.com\/maps\//.test(b.url), `${file}: unexpected source URL`);
  }
  total += data.businesses.length;
}
assert.equal(files.length, CATEGORIES.length);
assert.equal(new Set(CATEGORIES.map(c => c.slug)).size, CATEGORIES.length);
for (const c of CATEGORIES) assert(CATEGORY_DETAILS[c.slug]?.length === 2, `Editorial missing: ${c.slug}`);
assert.equal(extractDistrict('Av. Lima 20, San Juan de Lurigancho, Lima'), 'San Juan de Lurigancho');
assert.equal(extractDistrict('Calle Lima 15, Magdalena del Mar 15086'), 'Magdalena del Mar');
assert.equal(extractDistrict('Av. Principal, Surco, Lima'), 'Santiago de Surco');
assert.equal(businessPhone('(01) 234 5678').telephone, '+5112345678');
assert.equal(businessPhone('987 654 321').mobile, '51987654321');
assert.equal(businessPhone('123').telephone, null);
assert.equal(businessPhone('(01) 234 5678').mobile, null);
assert(!serializeSchema({ name: '</script><script>alert(1)</script>' }).includes('</script>'));
const locals = getLocalPages();
for (const p of locals) {
  assert(p.businesses.length >= 5);
  assert(p.businesses.every(b => b.district === p.district));
  assert(p.businesses.some(b => b.phone));
}
const profiles = getProfiles();
assert.equal(new Set(profiles.map(b => b.slug)).size, profiles.length);
for (const b of profiles) assert(b.name && b.address && b.phone);
assert.equal(new Set(GUIDES.map(g => g.slug)).size, GUIDES.length);
for (const g of GUIDES) { assert(CATEGORIES.some(c => c.slug === g.category)); assert(g.sections.length >= 3 && g.checklist.length >= 5); }
console.log(JSON.stringify({ validJsonFiles: files.length, sourceRecords: total, deduplicatedCategoryRecords: getDirectory().reduce((sum, c) => sum + c.businesses.length, 0), categoryPages: CATEGORIES.length, localPages: locals.length, profiles: profiles.length, guides: GUIDES.length }, null, 2));
