import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.TEST_BASE_URL || 'http://localhost:3013';
const browser = await chromium.launch();
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({viewport: {width, height: 900}});
    for (const route of ['/sobre-nosotros', '/contacto']) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://todolima.com' + route);
      assert.ok(await page.locator('a[href="mailto:contacto@todolima.com"]').count());
      assert.equal(await page.locator('footer a[href="https://xavier.cabellosalirrosas.com"]').innerText(), 'Xavier Cabello Salirrosas');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(json);
      console.log(`PASS ${route} at ${width}px: email, credit, canonical, JSON-LD, no overflow`);
    }
    await page.close();
  }
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  for (const route of ['/sobre-nosotros', '/contacto', '/herramientas']) assert.ok(sitemap.includes('https://todolima.com' + route));
  console.log('PASS sitemap');
} finally { await browser.close(); }
