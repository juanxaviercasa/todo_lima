import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {TOOL_IMAGES} from '../lib/toolImages.js';

const base = process.env.TEST_BASE_URL || 'http://localhost:3012';
const browser = await chromium.launch({headless: true});
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({viewport: {width, height: 900}});
    for (const route of ['/blog', '/herramientas']) {
      await page.goto(base + route);
      await page.evaluate(async () => {
        for (const img of document.images) { img.loading = 'eager'; await img.decode(); }
      });
      const geometry = await page.locator('.editorial-hero-media').evaluate(el => {
        const frame = el.getBoundingClientRect();
        const image = el.querySelector('img').getBoundingClientRect();
        return {top: image.top - frame.top, gap: frame.height - image.height, ratio: image.width / image.height};
      });
      assert.ok(Math.abs(geometry.top) < 1 && Math.abs(geometry.gap) < 1, `${route}: letterboxing at ${width}`);
      assert.ok(Math.abs(geometry.ratio - 16 / 9) < .002, `${route}: not 16:9`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow`);
      if (route === '/herramientas') {
        const cards = page.locator('a[target="_blank"] img');
        assert.equal(await cards.count(), Object.keys(TOOL_IMAGES).length);
        const sources = await cards.evaluateAll(images => images.map(img => img.currentSrc));
        assert.equal(new Set(sources).size, 16);
      }
      console.log(`PASS ${route} at ${width}px: decoded images, full 16:9 hero, no overflow`);
    }
    await page.close();
  }
} finally { await browser.close(); }
