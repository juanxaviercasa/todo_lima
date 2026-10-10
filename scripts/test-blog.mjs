import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {chromium} from 'playwright';
import {filterPosts,paginatePosts} from '../lib/blogUtils.js';
const posts=JSON.parse(await fs.readFile('data/blog/posts.json','utf8'));
const origin=process.env.BLOG_TEST_ORIGIN||'http://localhost:3003';
assert.equal(posts.length,2);
assert.equal(new Set(posts.map(p=>p.slug)).size,2);
const sample=Array.from({length:13},(_,i)=>({...posts[i%2],slug:'test-'+i}));
assert.equal(paginatePosts(sample,3).items.length,1);
assert.equal(paginatePosts(sample,2).items[0].slug,'test-6');
assert.equal(paginatePosts(sample,99).current,3);
assert.equal(filterPosts(posts,{query:'HISTÓRICO'}).length,1);
for(const p of posts){
  assert(p.blocks.filter(b=>b.type==='h2').length>=6);
  assert(p.blocks.some(b=>b.type==='table'));
  assert.equal(new Set([p.cover,...p.internal]).size,3);
  for(const id of [p.cover,...p.internal])for(const width of [480,768,1440]){
    const file='public/images/editorial/'+id+(width===1440?'':'-'+width)+'.webp';
    const m=await sharp(file).metadata();assert.equal(m.format,'webp');assert.equal(m.width,width);
  }
}
const browser=await chromium.launch();
try{
 const paths=['/blog',...posts.map(p=>'/blog/'+p.slug),...new Set(posts.map(p=>'/blog/categoria/'+p.category)),...new Set(posts.flatMap(p=>p.tags.map(t=>'/blog/etiqueta/'+t)))];
 for(const width of [320,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const path of paths){
    const response=await page.goto(origin+path,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200,path);
    assert.equal(await page.locator('h1').count(),1,path);
    await page.locator('img[src*="/images/editorial/blog-"]').evaluateAll(images=>Promise.all(images.map(i=>{i.loading='eager';return i.decode();})));
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+path+' at '+width);
    const canonical=await page.locator('link[rel=canonical]').getAttribute('href');assert.equal(new URL(canonical).pathname,path);
    if(posts.some(p=>path==='/blog/'+p.slug)){
      assert.equal(await page.locator('article img').count(),3);
      assert((await page.locator('article table').count())>=1);
      assert(await page.locator('nav[aria-label="Contenido del artículo"] a').evaluateAll(links=>links.every(a=>document.getElementById(a.hash.slice(1)))));
      for(const text of await page.locator('script[type="application/ld+json"]').allTextContents())JSON.parse(text);
      assert.equal(await page.locator('article').getByRole('heading',{name:'Fuentes y referencias'}).count(),1);
      assert(!(await page.locator('article').first().textContent()).includes('<!--'));
    }
    if(width===1440&&path==='/blog')await page.screenshot({path:'C:/Users/cabel/AppData/Local/Temp/todolima-blog-index.png',fullPage:true});
    if(width===390&&path==='/blog/'+posts[0].slug)await page.screenshot({path:'C:/Users/cabel/AppData/Local/Temp/todolima-blog-article.png',fullPage:true});
  }
  await page.goto(origin+'/blog',{waitUntil:'domcontentloaded'});
  await page.getByRole('searchbox').fill('histórico');
  await page.waitForTimeout(100);
  assert.equal(await page.locator('form + p + div article').count(),1);
  await page.getByRole('button',{name:'Limpiar filtros'}).click();
  await page.getByLabel('Categoría',{exact:true}).selectOption('historia-de-lima');
  assert(await page.getByRole('heading',{name:'Aún no hay artículos para esta selección'}).isVisible());
  await page.getByRole('button',{name:'Limpiar filtros'}).click();
  await page.getByLabel('Etiqueta',{exact:true}).selectOption('patrimonio');
  assert.equal(await page.locator('form + p + div article').count(),1);
  await page.close();
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});
 const page=await nojs.newPage();await page.goto(origin+'/blog/'+posts[1].slug);
 assert((await page.locator('article').first().textContent()).includes('Asegúrate'));
 assert.equal(await page.locator('article img').count(),3);
 await nojs.close();
 const sitemap=await(await fetch(origin+'/sitemap.xml')).text();
 for(const p of posts)assert(sitemap.includes('/blog/'+p.slug));
 console.log('Passed: 2 articles, 18 WebP variants, 10 blog routes at 5 widths, search/category/tag filtering, empty state, real content without JS, anchors/tables/schema and synthetic 3-page pagination.');
}finally{await browser.close();}
