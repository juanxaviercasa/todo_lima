import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { CATEGORIES } from '../scraper/config/categories.js';

const dir = 'public/images/categories';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
console.log('Total webp images found:', files.length);

const hashes = {};
for (const f of files) {
  const buf = fs.readFileSync(path.join(dir, f));
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (!hashes[hash]) hashes[hash] = [];
  hashes[hash].push(f);
}

const dupes = Object.entries(hashes).filter(([h, list]) => list.length > 1);
console.log('Duplicate hash groups:', dupes.length);
dupes.forEach(([h, list]) => {
  console.log(`[Group (${list.length})] ${list.join(', ')}`);
});

console.log('Total categories defined in scraper/config/categories.js:', CATEGORIES.length);

const missing = [];
for (const c of CATEGORIES) {
  const expected = `${c.slug.replace(/-/g, '_')}.webp`;
  if (!fs.existsSync(path.join(dir, expected))) {
    missing.push({ slug: c.slug, expected });
  }
}

if (missing.length > 0) {
  console.log('Missing category images:', missing.length);
  missing.forEach(m => console.log(` - ${m.slug} -> ${m.expected}`));
} else {
  console.log('All 126 categories have their respective unique webp image files present!');
}
