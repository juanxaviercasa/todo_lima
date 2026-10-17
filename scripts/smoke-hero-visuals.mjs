import { mkdirSync } from 'node:fs';
mkdirSync('.directory-reports/ui-2026-10-17', { recursive: true });
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch();
const paths=['/','/categorias','/conoce-lima','/herramientas','/gasfiteros','/guias','/blog'];
try {
 for (const width of [1440,375]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  for (const route of paths) {
   await page.goto(`http://127.0.0.1:3100${route}`, {waitUntil:'domcontentloaded'});await page.locator('h1').waitFor();
   if (route === '/categorias') {
    const img = page.locator('.editorial-hero-media img');
    await img.waitFor();
    assert(await img.evaluate(el => el.complete && el.naturalWidth > 0), 'Categories hero image loaded');
   }

   await page.waitForTimeout(800);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow');
   await page.screenshot({path:`.directory-reports/ui-2026-10-17/hero-${route.replaceAll('/','')||'home'}-${width}.png`});
   await page.evaluate(()=>document.documentElement.classList.add('dark'));
   const hero=page.locator('.atlas-hero-shade,.category-hero-shade').first();
   if (await hero.count()) console.log(width,route,await hero.evaluate(e=>getComputedStyle(e).backgroundImage));
  }
  await page.close();
 }
}finally{await browser.close();}
