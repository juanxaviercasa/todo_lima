import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const origin=process.env.BLOG_TEST_ORIGIN||'http://localhost:3006';
const browser=await chromium.launch();
try {
  for (const width of [320,390,768,1024,1440]) {
    const page=await browser.newPage({viewport:{width,height:900}});
    for (const path of ['/','/gasfiteros','/car-wash','/guias','/metodologia','/para-negocios','/blog','/blog/que-visitar-centro-historico-lima','/blog/revisar-informacion-negocio-lima']) {
      const response=await page.goto(origin+path);assert.equal(response.status(),200,path);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),path+' overflow '+width);
      const media=page.locator('.editorial-hero-media');
      if(await media.count()) {
        const box=await media.boundingBox();assert(Math.abs(box.width/box.height-16/9)<.02,path+' ratio');
        const img=media.locator('img');await img.evaluate(i=>i.decode());
        assert.equal(await img.evaluate(i=>getComputedStyle(i).objectFit),'contain');
      }
      const cover=page.locator('.article-title-hero');
      if(await cover.count()) {
        const c=await cover.boundingBox(),h=await page.locator('h1').boundingBox();assert(h.y>=c.y&&h.y+h.height<=c.y+c.height,path+' title inside hero');assert(h.y+h.height<650,path+' title visible without scroll');
        const image=page.locator('.article-title-image');const box=await image.boundingBox();assert(Math.abs(box.width/box.height-16/9)<.02,path+' article image ratio');assert.equal(await image.evaluate(i=>getComputedStyle(i).objectFit),'contain');
        const rows=page.locator('.article-toc-list li');let previousBottom=0;
        for(let i=0;i<await rows.count();i++) {const row=rows.nth(i),r=await row.boundingBox();assert(r.y>=previousBottom-1,'TOC order');previousBottom=r.y+r.height;assert.equal(await row.locator('.article-toc-number').textContent(),String(i+1).padStart(2,'0'));assert(!/^\s*\d+[.)]/.test(await row.locator('.article-toc-label').textContent()),'Duplicate TOC number');}
      }
      if(path==='/') {const hero=await page.locator('.home-hero').boundingBox();assert(hero.y+hero.height>=899,'Home viewport fill');}
      if(width===390&&path.endsWith('centro-historico-lima'))await page.screenshot({path:process.env.TEMP+'/todo-lima-article-layout.png',fullPage:false});
      if(width===1440&&path==='/guias')await page.screenshot({path:process.env.TEMP+'/todo-lima-guides-layout.png',fullPage:false});
    }
    await page.close();
  }
  console.log('Hero layout verified: 9 routes × 5 viewport widths.');
} finally {await browser.close();}
