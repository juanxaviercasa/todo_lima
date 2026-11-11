import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const catalog = read('data/blog/images.json');
const blog = read('data/blog/responsive-manifest.json');
const site = read('data/responsive-site-images.json');
const editorialPaths = new Set(Object.values(catalog).filter((x) => x.src.startsWith('/editorial/')).map((x) => x.src));
for (const src of editorialPaths) {
  if (!blog[src]) throw Error('Imagen editorial sin manifesto: ' + src);
}
let variants = 0;
for (const [src, info] of Object.entries({...blog, ...site})) {
  if (!Number.isInteger(info.width) || !Number.isInteger(info.height)) throw Error('Dimensiones invalidas: ' + src);
  let last = 0;
  for (const variant of info.variants) {
    if (!variant.src.startsWith('/') || variant.width <= last || variant.width >= info.width && !/\.jpe?g$/i.test(src)) throw Error('Candidato invalido: ' + src);
    const local = path.join(root, 'public', variant.src.slice(1));
    if (!fs.existsSync(local)) throw Error('Falta variante: ' + local);
    const metadata = await sharp(local).metadata();
    if (metadata.width !== variant.width || metadata.format !== 'webp') throw Error('Anchura incorrecta: ' + local);
    variants++;
    last = variant.width;
  }
}
if (!Object.keys(site).some((p) => p.endsWith('lima-hero.jpg'))) throw Error('Falta portada responsive');
console.log('Responsive images OK: ' + Object.keys(blog).length + ' editorial, ' + Object.keys(site).length + ' local; ' + variants + ' valid candidates.');
