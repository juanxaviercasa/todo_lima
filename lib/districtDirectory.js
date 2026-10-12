import fs from 'node:fs';
import path from 'node:path';
import { getDirectory, getLocalPages } from './directory.js';
import { getAreaForCategory } from './areasTaxonomy.js';

export function getDistrictProfiles() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/district-profiles.json'), 'utf8')).profiles;
}
export function buildDistrictInventory(profile, directory, localPages) {
  const seen = new Set();
  const businesses = [];
  const areas = new Map();
  for (const category of directory) {
    const matches = category.businesses.filter(b => b.district === profile.name);
    if (!matches.length) continue;
    const area = getAreaForCategory(category.meta.slug);
    const key = area?.slug || 'otras-categorias';
    if (!areas.has(key)) areas.set(key, { slug:key, title:area?.title || 'Otras categorías', categories:[] });
    const local = localPages.find(p => p.category === category.meta.slug && p.district === profile.name);
    areas.get(key).categories.push({ slug:category.meta.slug, title:category.meta.title.replace(/ en Lima$/, ''), count:matches.length, href:local ? `/${local.category}/${local.slug}` : `/${category.meta.slug}?distrito=${encodeURIComponent(profile.name)}` });
    for (const b of matches) {
      const id = b.entityId || b.url || `${b.name}|${b.address}`;
      if (seen.has(id)) continue;
      seen.add(id);
      businesses.push({ ...b, category:category.meta.slug });
    }
  }
  return { ...profile, businesses, areas:[...areas.values()], count:businesses.length };
}
export function getDistrictInventory(slug) {
  const profile = getDistrictProfiles().find(p => p.slug === slug);
  return profile ? buildDistrictInventory(profile, getDirectory(), getLocalPages()) : null;
}
