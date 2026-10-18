import fs from 'node:fs/promises';
import sharp from 'sharp';

// Vector masters reconstructed from the approved TL concept. No bitmap tracing.
const dir = 'public/brand';
await fs.mkdir(dir, { recursive: true });
const blue = '#0284c7';
const letters = '<path d="M8 30h46v62H34V50H8z"/><path d="M60 50h17v18q0 7 7 7h18v17H84q-24 0-24-24z"/>';
const pin = '<path fill-rule="evenodd" d="M74 4a16 16 0 0 0-16 16c0 12 16 25 16 25s16-13 16-25A16 16 0 0 0 74 4zm0 9a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>';
const svg = (body, box, width, height) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" width="${width}" height="${height}">${body}</svg>`;
for (const [name, color] of [['logo-symbol', blue], ['logo-symbol-white', '#ffffff'], ['logo-symbol-black', '#000000']]) {
  await fs.writeFile(`${dir}/${name}.svg`, svg(`<g fill="${color}">${letters}${pin}</g>`, '0 0 110 100', 110, 100));
}
const micro = svg(`<rect width="64" height="64" rx="14" fill="${blue}"/><g fill="white"><path d="M10 16h25v33H24V27H10z"/><path d="M39 16h10v20q0 3 3 3h5v10h-7q-11 0-11-12z"/></g>`, '0 0 64 64', 64, 64);
await fs.writeFile('public/favicon.svg', micro);
const sizes = [16, 32, 48, 180, 192, 512];
for (const size of sizes) await sharp(Buffer.from(micro)).resize(size, size).png().toFile(`${dir}/icon-${size}.png`);
await fs.copyFile(`${dir}/icon-180.png`, 'public/apple-touch-icon.png');
const pngs = await Promise.all([16, 32, 48].map(size => fs.readFile(`${dir}/icon-${size}.png`)));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const p = 6 + i * 16;
  header[p] = header[p + 1] = [16, 32, 48][i];
  header.writeUInt16LE(1, p + 4); header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(png.length, p + 8); header.writeUInt32LE(offset, p + 12);
  offset += png.length;
});
await fs.writeFile('public/favicon.ico', Buffer.concat([header, ...pngs]));
for (const [name, color, text] of [['logo-horizontal', blue, '#0f172a'], ['logo-horizontal-white', '#ffffff', '#ffffff']]) {
  const body = `<g fill="${color}">${letters}${pin}</g><g fill="${text}" font-family="Outfit, Arial, sans-serif"><text x="126" y="53" font-size="45" font-weight="800" letter-spacing="-1">Todo Lima</text><text x="128" y="81" font-size="17" letter-spacing="2">Tu guía local</text></g>`;
  await fs.writeFile(`${dir}/${name}.svg`, svg(body, '0 0 370 100', 370, 100));
  await sharp(Buffer.from(svg(body, '0 0 370 100', 1110, 300))).png().toFile(`${dir}/${name}.png`);
}
const symbol = await fs.readFile(`${dir}/logo-symbol.svg`);
await sharp(symbol).resize(550, 500).png().toFile(`${dir}/logo-symbol.png`);
// Raster logo is useful to consumers of Organization structured data.
await sharp(symbol).resize(550, 500).flatten({ background: '#f8fafc' }).png().toFile(`${dir}/logo-organization.png`);
await fs.writeFile('public/site.webmanifest', JSON.stringify({ name: 'Todo Lima', short_name: 'Todo Lima', lang: 'es-PE', start_url: '/', display: 'browser', background_color: '#f8fafc', theme_color: blue, icons: [192, 512].map(size => ({ src: `/brand/icon-${size}.png`, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' })) }, null, 2) + '\n');
console.log('Brand SVG, PNG, ICO and manifest generated.');
