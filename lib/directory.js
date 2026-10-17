import { validateSnapshot } from './directoryReconciliation.js';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { CATEGORIES } from '../scraper/config/categories.js';
import { resolveDistrict } from './districts.js';
import { districtFromCoords, mapsPlaceCoords } from './districtGeo.js';
import { slugify, EDITORIAL_DATE } from './seo.js';
import { PURCHASING_POWER_RANKING } from '../auditor/config/purchasingPowerRanking.js';

export const PILOT_CATEGORIES = ['gasfiteros', 'cerrajeros', 'mudanzas', 'reparacion-lavadoras', 'reparacion-refrigeradoras', 'reparacion-laptops', 'camaras-de-seguridad', 'veterinarias'];
export const LOCAL_PAGE_CATEGORIES = PURCHASING_POWER_RANKING.map(c => c.slug);
let cached;
let sourceCached;

export function getSourceDirectory() {
  if (sourceCached) return sourceCached;
  sourceCached = CATEGORIES.map(meta => {
    const filename = path.join(process.cwd(), 'data', `${meta.slug}.json`);
    const data = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, 'utf8')) : { businesses: [] };
    const seen = new Set();
    const businesses = (data.businesses || []).filter(b => {
      const key = b.url || `${b.name}|${b.address}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(b => ({ ...b, district: resolveDistrict({ address: b.address, ...mapsPlaceCoords(b.url) }, districtFromCoords), entityId: createHash('sha256').update(b.url || `${b.name}|${b.address}`).digest('hex').slice(0, 12) }));
    return { meta, businesses, updatedAt: data.updatedAt || null, contentModified: EDITORIAL_DATE };
  });
  return sourceCached;
}

export function getCategory(slug) { return getDirectory().find(c => c.meta.slug === slug); }

export function getLocalPages() {
  return getDirectory().filter(c => LOCAL_PAGE_CATEGORIES.includes(c.meta.slug)).flatMap(category => {
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

// Build from one exported public database revision. Raw scraping stays a source input.
export function getDirectory() {
  if(cached) return cached;
  const filename=path.join(process.cwd(),'data/directory.snapshot.json');
  if(!fs.existsSync(filename)) throw new Error('Missing public directory snapshot; run npm run directory:reconcile -- --apply or npm run directory:export');
  const snapshot=JSON.parse(fs.readFileSync(filename,'utf8'));
  validateSnapshot(snapshot,CATEGORIES);
  cached=CATEGORIES.map(meta=>{
    const businesses=snapshot.businesses.filter(b=>b.categorySlug===meta.slug);
    const updatedAt=businesses.reduce((latest,b)=>!latest||b.updatedAt>latest?b.updatedAt:latest,null);
    return {meta,businesses,updatedAt,contentModified:EDITORIAL_DATE};
  });
  return cached;
}
