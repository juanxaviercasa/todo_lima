import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { ALL_TOOLS } from '../lib/toolsCatalog.js';
import { GUIDES } from '../lib/guides.js';
import sharp from 'sharp';

const images=JSON.parse(fs.readFileSync('lib/toolTutorialImages.json','utf8'));
assert.equal(new Set(GUIDES.map(g=>g.slug)).size,56);
assert.equal(new Set(GUIDES.map(g=>g.title)).size,56);
assert.ok(new Set(GUIDES.map(g=>g.group)).size>=10);
for(const tool of ALL_TOOLS) {
 assert.equal(images[tool.slug].length,tool.tutorialSteps.length,tool.slug);
 for(const image of images[tool.slug]) {
  assert.ok(image.matched,`${tool.slug}: capture target ${image.target} not found`);
  const size=await sharp(path.join('public',image.src)).metadata();
  assert.equal(size.width,image.width);assert.equal(size.height,image.height);
 }
}
const root=path.resolve('out');
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 let file=path.join(root,decodeURIComponent(url.pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 if(fs.existsSync(file+'.html'))file+='.html';
 else if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404).end();return;}
 const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.json':'application/json'};
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch();
fs.mkdirSync('docs/qa/guias-visuales',{recursive:true});
try {
 for(const width of [390,768,1440]) {
  const p=await browser.newPage({viewport:{width,height:900}});
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/guias',{waitUntil:'networkidle'});
  const cookies=p.getByRole('button',{name:'Solo necesarias',exact:true});if(await cookies.isVisible())await cookies.click();
  const search=p.getByRole('searchbox');await search.fill('catering');
  await p.getByRole('status').filter({hasText:'1 guía disponible'}).waitFor();
  assert.equal(await p.locator('a[href="/guias/como-elegir-catering-lima"]').count(),1);
  await search.fill('zzzz-no-existe');assert.ok(await p.getByText('No encontramos guías',{exact:false}).isVisible());
  await p.getByRole('button',{name:'Ver todas las guías',exact:true}).click();
  await p.getByRole('combobox').selectOption('Eventos y celebraciones');
  assert.equal(await p.locator('a[href^="/guias/"]').count(),6);
  await p.locator('main img').evaluateAll(async es=>{for(const e of es){e.loading='eager';await e.decode();}});
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`guides overflow at ${width}`);
  await p.screenshot({path:`docs/qa/guias-visuales/guias-${width}.png`});
  await p.goto(base+'/herramientas/calculadora-precios-venta-igv',{waitUntil:'networkidle'});
  const open=p.getByRole('button',{name:'Ampliar captura del paso 1',exact:true});
  await open.scrollIntoViewIfNeeded();await open.focus();await p.keyboard.press('Enter');
  await p.locator('dialog[open]').waitFor();assert.ok(await p.getByRole('button',{name:'Cerrar',exact:true}).evaluate(el=>el===document.activeElement));
  await p.keyboard.press('Tab');assert.ok(await p.locator('dialog[open]').evaluate(el=>el.contains(document.activeElement)));
  await p.getByRole('button',{name:'Ver tamaño original',exact:true}).click();
  assert.equal(await p.getByRole('button',{name:'Ajustar a la pantalla',exact:true}).getAttribute('aria-pressed'),'true');
  await p.keyboard.press('Escape');assert.equal(await p.locator('dialog[open]').count(),0);
  assert.ok(await open.evaluate(el=>el===document.activeElement));
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`tutorial overflow at ${width}`);
  await p.screenshot({path:`docs/qa/guias-visuales/tutorial-${width}.png`});
  if(width===1440){await p.evaluate(()=>document.documentElement.style.zoom='2');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% zoom overflow');await p.screenshot({path:'docs/qa/guias-visuales/tutorial-zoom-200.png'});await p.evaluate(()=>{document.documentElement.style.zoom='1';document.documentElement.classList.add('dark');});await open.scrollIntoViewIfNeeded();await p.screenshot({path:'docs/qa/guias-visuales/tutorial-dark.png'});}
  assert.deepEqual(errors,[]);await p.close();
 }
 const p=await browser.newPage();
 for(const tool of ALL_TOOLS) {
  await p.goto(base+'/herramientas/'+tool.slug,{waitUntil:'networkidle'});
  const shots=p.locator('#tutorial figure > button img');
  assert.equal(await shots.count(),tool.tutorialSteps.length);
  await shots.evaluateAll(async es=>{for(const e of es){e.loading='eager';await e.decode();}});
  assert.ok(await shots.evaluateAll(es=>es.every(e=>e.naturalWidth>0)));
  assert.equal(await p.locator('nav[aria-label="Pasos del tutorial"] a').count(),tool.tutorialSteps.length);
 }
 await p.close();console.log('PASS: 56 guías, 16 tutoriales, capturas completas, búsqueda, filtros, móvil, teclado, diálogo y zoom 200%.');
}finally{await browser.close();await new Promise(r=>server.close(r));}
