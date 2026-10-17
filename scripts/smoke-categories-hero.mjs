import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
try {
 for (const width of [1440,375,812]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto('http://127.0.0.1:3100/categorias',{waitUntil:'domcontentloaded'});
  const img=page.locator('.editorial-hero-media img');await img.waitFor();await img.evaluate(el=>el.decode());
  assert(await img.evaluate(el=>el.naturalWidth>0));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.getByRole('button',{name:'Compartir Todo Lima'}).focus();assert(await page.getByRole('button',{name:'Compartir Todo Lima'}).evaluate(el=>el===document.activeElement));
  console.log('PASS categories image, layout and focus',width);await page.close();
 }
} finally {await browser.close();}
