import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { chromium } from 'playwright';
import { GUIDES } from '../lib/guides.js';
import { EDITORIAL_IMAGES } from '../lib/editorialImages.js';
const origin = process.env.SEO_TEST_ORIGIN || 'http://localhost:3000';
assert.equal(Object.keys(EDITORIAL_IMAGES).length, 25);
for (const [id, asset] of Object.entries(EDITORIAL_IMAGES)) {
  assert(asset.alt.length > 20, id);
  for (const width of [1440, 768, 480]) {
    const file = 'public/images/editorial/' + id + (width === 1440 ? '' : '-' + width) + '.webp';
    const meta = await sharp(file).metadata();
    assert.equal(meta.format, 'webp');
    assert.equal(meta.width, width);
    assert((await fs.stat(file)).size < 300000, 'Image budget: ' + file);
  }
}
const browser = await chromium.launch();
const paths = ['/guias', '/metodologia', '/para-negocios', ...GUIDES.map(g => '/guias/' + g.slug)];
const seen = new Set();
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const path of paths) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200, path);
      await page.locator('img[src*="/images/editorial/"]').evaluateAll(async images => {
        await Promise.all(images.map(image => { image.loading = 'eager'; return image.decode(); }));
      });
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        images: [...document.querySelectorAll('img[src*="/images/editorial/"]')].map(i => ({src:i.getAttribute('src'),width:i.naturalWidth,alt:i.alt})),
        og: document.querySelector('meta[property="og:image"]')?.content
      }));
      assert(!state.overflow, 'Horizontal overflow: ' + path + ' at ' + width);
      assert(state.images.length >= 3, path);
      assert(state.images.every(i => i.width > 0 && i.alt), 'Broken or unlabeled image: ' + path);
      assert(state.og.includes('/images/editorial/'), 'Share image: ' + path);
      state.images.forEach(i => seen.add(i.src));
      if (width === 1440 && ['/guias', '/para-negocios'].includes(path)) await page.screenshot({ path: 'C:/Users/cabel/AppData/Local/Temp/todolima-' + path.slice(1) + '.png', fullPage: true });
    }
    await page.close();
  }
  assert.equal(seen.size, 25, 'All illustrations must be used');
  console.log('Passed: 75 WebP assets, all 25 scenes used, 11 pages at 3 widths, loaded images, alt text, share previews and no horizontal overflow.');
} finally { await browser.close(); }
