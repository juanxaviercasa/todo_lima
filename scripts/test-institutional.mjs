import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const root=path.resolve('out');
const server=http.createServer((req,res)=>{
  let file=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(!path.extname(file))file+='.html';
  if(!fs.existsSync(file)){res.writeHead(404).end();return;}
  const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg'};
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(3016,'127.0.0.1',resolve));
const browser=await chromium.launch();
try {
  const page=await browser.newPage();
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:900});
    for(const slug of ['sobre-nosotros','contacto','preguntas-frecuentes','equipo-editorial','mapa-del-sitio']){
      await page.goto(`http://127.0.0.1:3016/${slug}`);
      await page.locator('.editorial-hero-media img').evaluate(img=>img.decode());
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${slug} overflow ${width}`);
      const box=await page.locator('.editorial-hero-media img').boundingBox();
      assert.ok(Math.abs(box.width/box.height-16/9)<.01);
    }
    if(width<1280){await page.getByRole('button',{name:'Abrir menú'}).click();assert.ok(await page.locator('#mobile-menu a[href="/contacto"]').isVisible());await page.keyboard.press('Escape');}
  }
  console.log('Five pages: full-frame 16:9 images and no horizontal overflow at 390, 768 and 1440px.');
}finally{await browser.close();server.close();}
