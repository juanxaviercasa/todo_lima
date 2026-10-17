import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { TOOL_IMAGES } from '../lib/toolImages.js';

let server = null;
let base = process.env.TEST_BASE_URL;

if (!base) {
  const root = path.resolve('out');
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml' };
  server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (reqPath === '/') reqPath = '/index.html';
    let file = path.join(root, reqPath);
    if (!path.extname(file)) {
      if (fs.existsSync(file + '.html')) file += '.html';
      else if (fs.existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
}

const screenshotDir = process.env.TOOLS_SCREENSHOT_DIR || '';
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of ['/blog', '/herramientas']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        for (const img of document.images) { img.loading = 'eager'; await img.decode(); }
      });
      const geometry = await page.locator('.editorial-hero-media').evaluate(el => {
        const frame = el.getBoundingClientRect();
        const image = el.querySelector('img').getBoundingClientRect();
        return { top: image.top - frame.top, gap: frame.height - image.height, ratio: image.width / image.height };
      });
      assert.ok(Math.abs(geometry.top) < 1 && Math.abs(geometry.gap) < 1, `${route}: letterboxing at ${width}`);
      assert.ok(Math.abs(geometry.ratio - 16 / 9) < .002, `${route}: not 16:9`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow`);
      if (route === '/herramientas') {
        const cards = page.locator('a[target="_blank"] img');
        assert.equal(await cards.count(), Object.keys(TOOL_IMAGES).length);
        const details = await cards.evaluateAll(images =>
          images.map(img => ({
            currentSrc: img.currentSrc,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            alt: img.getAttribute('alt') || '',
          }))
        );
        assert.equal(new Set(details.map(d => d.currentSrc)).size, 16);
        assert.ok(details.every(d => d.currentSrc && d.naturalWidth > 0 && d.naturalHeight > 0 && d.alt.trim().length > 10), 'All 16 tool images must load with naturalWidth > 0 and descriptive alt text');
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://todolima.com/herramientas');
        assert.equal(await page.locator('main#contenido').count(), 1);
        const ldJsonScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
        assert.ok(ldJsonScripts.length >= 2, 'Must include BreadcrumbList and CollectionPage JSON-LD');
        for (const raw of ldJsonScripts) JSON.parse(raw);

        if (screenshotDir) {
          if (width === 1440) {
            await page.screenshot({ path: path.join(screenshotDir, 'herramientas-hero-1440.png'), fullPage: false });
            await page.locator('#finanzas-sunat').scrollIntoViewIfNeeded();
            await page.waitForTimeout(150);
            await page.screenshot({ path: path.join(screenshotDir, 'herramientas-cards-1440.png'), fullPage: false });
            await page.evaluate(() => document.documentElement.classList.add('dark'));
            await page.waitForTimeout(150);
            await page.screenshot({ path: path.join(screenshotDir, 'herramientas-cards-dark-1440.png'), fullPage: false });
            await page.evaluate(() => document.documentElement.classList.remove('dark'));
          }
          if (width === 390) {
            await page.locator('#finanzas-sunat').scrollIntoViewIfNeeded();
            await page.waitForTimeout(150);
            await page.screenshot({ path: path.join(screenshotDir, 'herramientas-cards-390.png'), fullPage: false });
          }
        }

        if (width === 390) {
          await page.keyboard.press('Tab');
          const skipHref = await page.evaluate(() => document.activeElement?.getAttribute('href'));
          assert.equal(skipHref, '#contenido', 'First Tab focuses skip-to-content link');
        }
        if (width === 1440) {
          await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'No overflow at 200% font size');
          await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
        }
      }
      console.log(`PASS ${route} at ${width}px: decoded images, full 16:9 hero, canonical, JSON-LD, no overflow`);
    }
    await page.close();
  }
} finally {
  await browser.close();
  if (server) server.close();
}
