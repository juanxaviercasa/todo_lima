import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const catalog = read('data/blog/images.json');
const posts = read('data/blog/posts.json');
const planned = read('staging/editorial/all-180-posts.json');
const errors = [];
let copied = 0;

for (const post of [...posts, ...planned]) {
  for (const id of [post.cover, ...(post.internal || [])]) {
    if (!catalog[id]) errors.push(`${post.slug}: missing image ID ${id}`);
  }
}

for (const [id, image] of Object.entries(catalog)) {
  if (!image.src.startsWith('/')) {
    errors.push(`${id}: expected a local image path`);
    continue;
  }
  const target = path.resolve(root, 'public', `.${image.src}`);
  if (!target.startsWith(path.join(root, 'public') + path.sep)) {
    errors.push(`${id}: invalid image path`);
    continue;
  }
  if (image.src.startsWith('/editorial/')) {
    const original = path.join(root, 'imagenes_generadas', path.basename(image.src));
    if (!fs.existsSync(original)) { errors.push(`${id}: missing original`); continue; }
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(original, target);
    copied++;
    for (const width of [480, 768]) {
      const variant = original.replace(/\.webp$/, `-${width}.webp`);
      if (fs.existsSync(variant)) fs.copyFileSync(variant, target.replace(/\.webp$/, `-${width}.webp`));
    }
  } else if (!fs.existsSync(target)) errors.push(`${id}: missing public asset`);
}
if (!fs.existsSync(path.join(root, 'public/images/editorial/blog-lima-portada-v2.webp'))) errors.push('Missing blog hero');
if (errors.length) throw new Error([...new Set(errors)].join('\n'));
console.log(`Blog images verified: ${Object.keys(catalog).length} entries; ${copied} originals prepared for local hosting.`);
