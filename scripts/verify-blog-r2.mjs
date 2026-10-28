import fs from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

async function verifyImage(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(30000) });
      if (response.ok && response.headers.get('content-type')?.startsWith('image/')) return;
      const transient = [408, 429].includes(response.status) || response.status >= 500;
      if (!transient || attempt === 3) return `${response.status}: ${url}`;
    } catch (error) {
      if (attempt === 3) return `${error.message}: ${url}`;
    }
    console.warn(`Retrying editorial image (${attempt}/3): ${url}`);
    await delay(1000 * attempt);
  }
}

const catalog = JSON.parse(fs.readFileSync('data/blog/images.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('data/blog/posts.json', 'utf8'));
const all = process.argv.includes('--all');
const ids = all ? Object.keys(catalog) : [...new Set(posts.flatMap(p => [p.cover, ...(p.internal || [])]))];
const base = process.env.NEXT_PUBLIC_MEDIA_URL || process.env.NEXT_PUBLIC_CDN_URL || 'https://media.todolima.com';
const errors = [];
const urls = new Set();
for (const id of ids) {
  if (!catalog[id]) { errors.push(`Missing catalog ID: ${id}`); continue; }
  if (catalog[id].src.startsWith('/editorial/')) urls.add(`${base}${catalog[id].src}`);
}
let cursor = 0;
const entries = [...urls];
await Promise.all(Array.from({ length: 12 }, async () => {
  while (cursor < entries.length) {
    const url = entries[cursor++];
    const error = await verifyImage(url);
    if (error) errors.push(error);
  }
}));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`R2 verified: ${entries.length} public editorial image URLs (${all ? 'complete catalog' : 'published covers and internal images'}).`);
