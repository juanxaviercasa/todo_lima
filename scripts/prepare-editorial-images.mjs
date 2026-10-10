import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const sources = JSON.parse(await fs.readFile(process.argv[2], 'utf8'));
const directory = path.resolve('public/images/editorial');
await fs.mkdir(directory, { recursive: true });
let total = 0;
for (const asset of sources) {
  if (!/^[a-z0-9-]+$/.test(asset.id)) throw new Error('Invalid asset id');
  for (const width of [1440, 768, 480]) {
    const filename = path.join(directory, `${asset.id}${width === 1440 ? '' : `-${width}`}.webp`);
    const info = await sharp(asset.source).rotate().resize(width, Math.round(width * 9 / 16), { fit: 'cover', position: 'centre' }).webp({ quality: 80, effort: 5 }).toFile(filename);
    total += info.size;
  }
  console.log(`Prepared ${asset.id}`);
}
console.log(`${sources.length} scenes, ${sources.length * 3} WebP files, ${Math.round(total / 1024)} KiB total`);
