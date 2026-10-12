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
// Distritos: cobertura completa (43 Lima + 7 Callao) y casos de calles con nombre de distrito
const { LIMA_ZONES, resolveDistrict } = await import('../lib/districts.js');
const { districtFromCoords, mapsPlaceCoords } = await import('../lib/districtGeo.js');
const zoneDistricts = Object.values(LIMA_ZONES).flatMap(z => z.districts);
assert.equal(zoneDistricts.length, 50, 'LIMA_ZONES debe cubrir 43 distritos de Lima + 7 del Callao');
assert.equal(new Set(zoneDistricts).size, 50, 'Distritos duplicados en LIMA_ZONES');
assert.equal(extractDistrict('Av. Canadá 3684, San Luis 15021'), 'San Luis');
assert.equal(extractDistrict('Av. San Luis 2680, San Borja 15037'), 'San Borja');
assert.equal(extractDistrict('C. Independencia 596, Miraflores 15074'), 'Miraflores');
assert.equal(extractDistrict('Av. Próceres de la Independencia 1680, SJL 15401'), 'San Juan de Lurigancho');
assert.equal(extractDistrict('Jr. Grau 120, La Perla, Callao'), 'La Perla');
assert.equal(extractDistrict('Av. Sáenz Peña 450, Callao 07001'), 'Callao');
assert.equal(districtFromCoords(-12.1219, -77.0297), 'Miraflores');
assert.equal(districtFromCoords(-12.0464, -77.0428), 'Cercado de Lima');
assert.equal(districtFromCoords(-13.5, -71.97), null);
assert.deepEqual(mapsPlaceCoords('https://www.google.com/maps/place/X/data=!3d-12.1219!4d-77.0297'), { latitude: -12.1219, longitude: -77.0297 });
assert.equal(resolveDistrict({ address: 'Av. Caminos del Inca 3439, Cercado de Lima 15039', latitude: -12.1295, longitude: -76.9925 }, districtFromCoords), 'Santiago de Surco');
assert.equal(resolveDistrict({ address: 'Av. Arenales 2310, Lince 15046', latitude: -12.0464, longitude: -77.0428 }, districtFromCoords), 'Lince');
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

// Macro-áreas taxonomy integrity check
const { MACRO_AREAS, CATEGORY_TO_AREA_SLUG, getMacroAreas } = await import('../lib/areasTaxonomy.js');
assert.equal(MACRO_AREAS.length, 14, 'Must define 14 macro-areas');
assert.equal(Object.keys(CATEGORY_TO_AREA_SLUG).length, CATEGORIES.length, 'All categories must be mapped');
for (const c of CATEGORIES) {
  assert(CATEGORY_TO_AREA_SLUG[c.slug], `Category unmapped to macro-area: ${c.slug}`);
}
const activeAreas = getMacroAreas({ includeUpcoming: false });
assert.equal(activeAreas.length, 14, 'Must have 14 active areas with existing data');
assert.equal(activeAreas.reduce((sum, a) => sum + a.categorySlugs.length, 0), CATEGORIES.length, 'Total categories across active areas must equal CATEGORIES.length');

console.log(JSON.stringify({ validJsonFiles: files.length, sourceRecords: total, deduplicatedCategoryRecords: getDirectory().reduce((sum, c) => sum + c.businesses.length, 0), categoryPages: CATEGORIES.length, macroAreas: MACRO_AREAS.length, activeAreas: activeAreas.length, localPages: locals.length, profiles: profiles.length, guides: GUIDES.length }, null, 2));

