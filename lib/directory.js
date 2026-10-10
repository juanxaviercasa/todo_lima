import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { CATEGORIES } from '../scraper/config/categories.js';
import { extractDistrict } from './districts.js';
import { slugify, EDITORIAL_DATE } from './seo.js';

export const PILOT_CATEGORIES = ['gasfiteros', 'cerrajeros', 'mudanzas', 'reparacion-lavadoras', 'reparacion-refrigeradoras', 'reparacion-laptops', 'camaras-de-seguridad', 'veterinarias'];
let cached;

export function getDirectory() {
  if (cached) return cached;
  cached = CATEGORIES.map(meta => {
    const filename = path.join(process.cwd(), 'data', `${meta.slug}.json`);
    const data = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, 'utf8')) : { businesses: [] };
    const seen = new Set();
    const businesses = (data.businesses || []).filter(b => {
      const key = b.url || `${b.name}|${b.address}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(b => ({ ...b, district: extractDistrict(b.address), entityId: createHash('sha256').update(b.url || `${b.name}|${b.address}`).digest('hex').slice(0, 12) }));
    return { meta, businesses, updatedAt: data.updatedAt || null, contentModified: EDITORIAL_DATE };
  });
  return cached;
}

export function getCategory(slug) { return getDirectory().find(c => c.meta.slug === slug); }

export function getLocalPages() {
  return getDirectory().filter(c => PILOT_CATEGORIES.includes(c.meta.slug)).flatMap(category => {
    const grouped = new Map();
    category.businesses.forEach(b => {
      if (b.district === 'Lima') return;
      if (!grouped.has(b.district)) grouped.set(b.district, []);
      grouped.get(b.district).push(b);
    });
    return [...grouped].filter(([, businesses]) => businesses.length >= 5 && businesses.some(b => b.phone)).map(([district, businesses]) => ({ category: category.meta.slug, district, slug: slugify(district), businesses, updatedAt: category.updatedAt }));
  });
}

export function getProfiles() {
  const seen = new Set();
  return getDirectory().filter(c => PILOT_CATEGORIES.includes(c.meta.slug)).flatMap(category => category.businesses.filter(b => b.name && b.address && b.phone).slice(0, 10).flatMap(b => {
    if (seen.has(b.entityId)) return [];
    seen.add(b.entityId);
    return [{ ...b, slug: `${slugify(b.name).slice(0, 75)}-${b.entityId}`, category: category.meta.slug, categoryTitle: category.meta.title, updatedAt: category.updatedAt }];
  }));
}

export function enrichBusinesses(businesses) {
  const profiles = new Map(getProfiles().map(b => [b.entityId, b.slug]));
  return businesses.map(b => ({ ...b, profileSlug: profiles.get(b.entityId) || null }));
}
