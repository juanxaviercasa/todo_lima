import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const pillars=JSON.parse(fs.readFileSync('data/atlas/pilares.json','utf8'));
const root=path.resolve('out');
const server=http.createServer((req,res)=>{
  let file=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(!path.extname(file))file+='.html';
  if(!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(3017,'127.0.0.1',resolve));
const browser=await chromium.launch();
try {
  const page=await browser.newPage();
  const routes=['/conoce-lima',...pillars.map(p=>'/conoce-lima/'+p.slug)];
  for(const width of [360,390,768,1024,1280,1440]){
    await page.setViewportSize({width,height:900});
    for(const route of routes){
      await page.goto('http://127.0.0.1:3017'+route);
      await page.locator('.atlas-hero-media img').evaluate(img=>img.decode());
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route}: overflow at ${width}`);
      const image=await page.locator('.atlas-hero-media img').boundingBox();
      assert.ok(Math.abs(image.width/image.height-16/9)<.01);
      assert.ok(image.width>=width-1,'Hero image must cover full viewport width');
      const title=await page.locator('h1').boundingBox(),hero=await page.locator('.atlas-hero').boundingBox();
      assert.ok(title.y>=hero.y && title.y+title.height<=hero.y+hero.height,'Hero title contained');
      assert.ok(await page.locator('.atlas-hero nav').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=16),'Breadcrumbs must remain readable');
      assert.ok(await page.locator('.atlas-hero-intro').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=18),'Intro must remain readable');
      const toc=page.locator('.atlas-contents');
      if(await toc.count()){
        await toc.locator('summary').click();
        const numbers=await toc.locator('li a > span:first-child').allTextContents();
        assert.deepEqual(numbers,numbers.map((_,index)=>String(index+1)));
        for(const link of await toc.locator('a').all())assert.equal(await page.locator(await link.getAttribute('href')).count(),1);
      }
      const clipped=await page.locator('main :is(h1,h2,h3,li)').evaluateAll(elements=>elements.filter(el=>getComputedStyle(el).overflow==='hidden' && el.scrollHeight>el.clientHeight+1).map(el=>el.textContent));
      assert.deepEqual(clipped,[],`Clipped headings at ${width}`);
      if([390,1440].includes(width) && [routes[0],routes[1]].includes(route))await page.screenshot({path:`${process.env.TEMP}/atlas-${route===routes[0]?'hub':'article'}-${width}.png`,fullPage:true});
      if(width===1440 && route.endsWith('/gastronomia-limena'))await page.screenshot({path:`${process.env.TEMP}/atlas-gastronomia-hero.png`});
    }
  }
  console.log('Atlas: eight routes at six viewport widths; full-frame heroes, no page overflow, valid sequential TOC links.');
}finally{await browser.close();server.close();}
