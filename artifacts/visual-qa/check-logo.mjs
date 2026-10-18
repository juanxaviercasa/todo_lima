import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const root = path.resolve('out');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let name = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!name.startsWith(root + path.sep) && name !== root) return res.writeHead(403).end();
  if (fs.existsSync(name) && fs.statSync(name).isDirectory()) name = path.join(name, 'index.html');
  if (!fs.existsSync(name)) return res.writeHead(404).end();
  res.setHeader('Content-Type', types[path.extname(name)] || 'application/octet-stream');
  res.end(fs.readFileSync(name));
});
await new Promise(resolve => server.listen(3197, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3197/', { waitUntil: 'networkidle' });
  assert(await page.locator('link[rel="icon"][href="/favicon.svg"]').count());
  for (const url of ['/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/site.webmanifest', '/brand/icon-192.png', '/brand/icon-512.png']) assert.equal((await page.request.get('http://127.0.0.1:3197' + url)).status(), 200, url);
  const results = [];
  for (const dark of [false, true]) {
    await page.evaluate(d => document.documentElement.classList.toggle('dark', d), dark);
    for (const width of [1440, 375, 320]) {
      await page.setViewportSize({ width, height: 950 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
      for (const selector of ['header .brand-logo', 'footer .brand-logo']) {
        const logo = page.locator(selector);
        assert(await logo.locator('img').evaluate(img => img.complete && img.naturalWidth > 0));
        const box = await logo.boundingBox();
        assert(box.x >= 0 && box.x + box.width <= width, `logo clipped ${selector} ${width}`);
        await logo.screenshot({ path: `artifacts/visual-qa/logo-${selector.startsWith('header') ? 'header' : 'footer'}-${width}-${dark ? 'dark' : 'light'}.png` });
      }
      results.push({ width, dark, overflow: false, logosLoaded: true });
      await page.locator('header').screenshot({ path: `artifacts/visual-qa/logo-navigation-${width}-${dark ? 'dark' : 'light'}.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => { document.documentElement.classList.remove('dark'); document.documentElement.style.zoom = '2'; });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, '200% CSS zoom overflow');
  await page.locator('header').screenshot({ path: 'artifacts/visual-qa/logo-header-zoom-200.png' });
  await page.evaluate(() => document.documentElement.style.zoom = '');
  await page.setViewportSize({ width: 375, height: 950 });
  await page.locator('header a[aria-label="Todo Lima, inicio"]').focus();
  assert.equal(await page.locator('header a[aria-label="Todo Lima, inicio"]').evaluate(e => getComputedStyle(e).outlineStyle), 'solid');
  const menu = page.getByRole('button', { name: 'Abrir menú', exact: true });
  await menu.focus(); await page.keyboard.press('Enter');
  await page.locator('#mobile-menu').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#mobile-menu').waitFor({ state: 'detached' });
  fs.writeFileSync('artifacts/visual-qa/logo-results.json', JSON.stringify({ results, keyboard: 'logo focus, menu Enter/Escape passed', zoom: '200% CSS zoom checked; native browser zoom not automated', icons: 'all served 200, favicon metadata present' }, null, 2));
  console.log('Logo QA passed: light/dark, 320/375/1440px, CSS zoom 200%, keyboard, assets and favicon metadata.');
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
