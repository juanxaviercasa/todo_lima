import fs from 'node:fs';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
const manifest = JSON.parse(fs.readFileSync(new URL('../docs/institucional-imagenes-prompts.json', import.meta.url), 'utf8'));
const destination = new URL('../public/images/institucional/', import.meta.url);
fs.mkdirSync(destination, {recursive:true});
for (const item of manifest) {
  const metadata = await sharp(item.source).metadata();
  if (Math.abs(metadata.width / metadata.height - 16 / 9) > .01) throw new Error(`${item.id}: canvas must be 16:9`);
  for (const width of [1440,768,480]) {
    await sharp(item.source).resize(width,width*9/16,{fit:'fill'}).webp({quality:82,effort:5}).toFile(fileURLToPath(new URL(`${item.id}${width===1440?'':`-${width}`}.webp`,destination)));
  }
  console.log(`Prepared ${item.id}`);
}
