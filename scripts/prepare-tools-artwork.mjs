import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/herramientas-imagenes-prompts.json'), 'utf8'));
for (const item of manifest) {
  const folder = item.id === 'blog-lima-portada-v2' ? 'editorial' : 'herramientas';
  const destination = path.join(root, 'public/images', folder);
  fs.mkdirSync(destination, {recursive: true});
  const metadata = await sharp(item.source).metadata();
  if (Math.abs(metadata.width / metadata.height - 16 / 9) > .01) throw new Error(`${item.id}: regenerate artwork at 16:9; do not crop`);
  for (const width of [1440, 768, 480]) {
    const filename = item.id + (width === 1440 ? '' : `-${width}`) + '.webp';
    // Generated canvas is within one pixel of 16:9; normalize without cropping.
    await sharp(item.source).resize(width, width * 9 / 16, {fit: 'fill'}).webp({quality: 82, effort: 5}).toFile(path.join(destination, filename));
  }
  console.log(`Prepared ${item.id}: three full-frame 16:9 WebP variants`);
}
