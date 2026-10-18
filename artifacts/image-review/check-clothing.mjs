import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const root = path.resolve('out');
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(3195, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage();
  const cases = [
    ['estudios-de-yoga', 'estudios_de_yoga'],
    ['estudios-de-pilates', 'estudios_de_pilates'],
    ['spas', 'spas'],
    ['categorias/deporte-y-actividad-fisica', 'estudios_de_yoga'],
    ['categorias/deporte-y-actividad-fisica', 'estudios_de_pilates'],
    ['categorias/belleza-y-cuidado-personal', 'spas'],
  ];
  for (const [route, image] of cases) {
    assert(fs.readFileSync(`out/images/categories/${image}.webp`).equals(fs.readFileSync(`public/images/categories/${image}.webp`)));
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`http://127.0.0.1:3195/${route}`, { waitUntil: 'networkidle' });
      const img = page.locator(`img[src="/images/categories/${image}.webp"]`).first();
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(e => e.decode());
      assert.equal(await img.evaluate(e => e.naturalWidth), 1600);
      const target = route.startsWith('categorias/') ? img : page.locator('main > header');
      await target.screenshot({ path: `artifacts/image-review/${image}-${route.startsWith('categorias/') ? 'card' : 'hero'}-${width}.png` });
    }
  }
  console.log('12 desktop/mobile views verified; exported images match originals.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
