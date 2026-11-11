import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = path.join(root, 'public');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const catalog = read('data/blog/images.json');
const posts = [...read('data/blog/posts.json'), ...read('staging/editorial/all-180-posts.json')];
const covers = new Set(posts.map((post) => catalog[post.cover]?.src).filter(Boolean));
const tasks = new Map();

for (const image of Object.values(catalog)) {
  if (!image.src.startsWith('/editorial/')) continue;
  const source = path.join(root, 'imagenes_generadas', path.basename(image.src));
  if (!fs.existsSync(source)) throw Error('Falta original editorial: ' + image.src);
  tasks.set(image.src, {source, group: 'blog', widths: covers.has(image.src) ? [480, 768, 1200] : [480, 768]});
}
const categoriesDir = path.join(publicRoot, 'images/categories');
for (const name of fs.readdirSync(categoriesDir)) {
  if (!name.endsWith('.webp') || /-\d{3,4}\.webp$/.test(name)) continue;
  const src = '/images/categories/' + name;
  tasks.set(src, {source: path.join(categoriesDir, name), group: 'site', widths: [360, 640, 960]});
}
for (const name of ['lima-hero.jpg', 'salud-feature.jpg', 'hogar-feature.jpg']) {
  const src = '/images/' + name;
  tasks.set(src, {source: path.join(publicRoot, 'images', name), group: 'site', widths: [480, 768, 1200]});
}

const manifest = {blog: {}, site: {}};
let processed = 0;
let generated = 0;
let savedBytes = 0;
const entries = [...tasks.entries()];
let cursor = 0;

async function processAsset(src, task) {
  const sourceStats = fs.statSync(task.source);
  const metadata = await sharp(task.source).metadata();
  if (!metadata.width || !metadata.height) throw Error('Dimensiones invalidas: ' + src);
  // A JPEG also gets a full-resolution WebP candidate, preserving the JPEG as fallback.
  const isJpeg = /\.jpe?g$/i.test(src);
  const widths = [...new Set([...task.widths, ...(isJpeg ? [metadata.width] : [])])]
    .filter((w) => w < metadata.width || (isJpeg && w === metadata.width))
    .sort((a, b) => a - b);
  const variants = [];
  for (const width of widths) {
    const destinationSrc = src.replace(/\.(webp|jpe?g)$/i, '-' + width + '.webp');
    const destination = path.join(publicRoot, destinationSrc.slice(1));
    fs.mkdirSync(path.dirname(destination), {recursive: true});
    let valid = false;
    if (fs.existsSync(destination) && fs.statSync(destination).mtimeMs >= sourceStats.mtimeMs) {
      const previous = await sharp(destination).metadata();
      valid = previous.width === width && previous.format === 'webp';
    }
    if (!valid) {
      await sharp(task.source).resize({width, withoutEnlargement: true})
        .webp({quality: 76, effort: 4}).toFile(destination);
      generated++;
    }
    const variantMetadata = await sharp(destination).metadata();
    const variantBytes = fs.statSync(destination).size;
    if (variantMetadata.width === width && variantBytes < sourceStats.size) {
      variants.push({src: destinationSrc, width});
      savedBytes += sourceStats.size - variantBytes;
    }
  }
  manifest[task.group][src] = {width: metadata.width, height: metadata.height, variants};
  processed++;
}

async function worker() {
  while (cursor < entries.length) {
    const i = cursor++;
    const [src, task] = entries[i];
    await processAsset(src, task);
  }
}
await Promise.all(Array.from({length: 4}, worker));
fs.writeFileSync(path.join(root, 'data/blog/responsive-manifest.json'), JSON.stringify(manifest.blog, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data/responsive-site-images.json'), JSON.stringify(manifest.site, null, 2) + '\n');
console.log('Responsive images: ' + processed + ' sources; ' + generated + ' generated variants; candidate byte savings ' + Math.round(savedBytes / 1024 / 1024) + ' MiB (not a traffic measurement).');
