import { mkdirSync } from 'node:fs';
mkdirSync('.directory-reports/ui-2026-10-17', { recursive: true });
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { getProfiles } from '../lib/directory.js';
import { businessContactMessage } from '../lib/contact.js';
const origin = process.env.SHARE_TEST_ORIGIN || 'http://127.0.0.1:3100';
const browser = await chromium.launch();
const context = await browser.newContext({ colorScheme: 'dark', viewport: { width: 1440, height: 960 } });
const page = await context.newPage();
try {
 await page.goto(origin); await page.getByRole('button',{name:'Compartir Todo Lima'}).waitFor();
 assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),false,'Light despite OS dark preference');
 await page.getByRole('button',{name:'Cambiar a modo oscuro'}).first().click();
 await page.reload(); await page.getByRole('button',{name:'Cambiar a modo claro'}).first().waitFor();
 assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),true,'Saved dark preference');
 await page.getByRole('button',{name:'Cambiar a modo claro'}).first().click();
 await page.reload(); await page.getByRole('button',{name:'Cambiar a modo oscuro'}).first().waitFor();
 const profile=getProfiles().find(b=>/^519/.test(b.phone.replace(/\D/g,'')) || /^9/.test(b.phone.replace(/\D/g,'')));
 assert(businessContactMessage(profile).includes(`https://todolima.com/negocios/${profile.slug}`));
 await page.goto(`${origin}/negocios/${profile.slug}`);
 const contact=await page.getByRole('link',{name:'Abrir WhatsApp',exact:true}).getAttribute('href');
 assert(new URL(contact).searchParams.get('text').includes(`https://todolima.com/negocios/${profile.slug}`));
 assert.equal(await page.locator('meta[property="og:image"]').getAttribute('content'),'https://todolima.com/images/compartir-todo-lima.jpg');
 assert(await page.locator('meta[property="og:description"]').getAttribute('content'));
 await page.getByRole('button',{name:'Compartir Todo Lima'}).click();
 let share=await page.getByRole('link',{name:'Facebook',exact:true}).getAttribute('href');
 assert.equal(new URL(share).searchParams.get('u'),`https://todolima.com/negocios/${profile.slug}`);
 await page.getByRole('combobox',{name:'Qué compartir'}).selectOption('home');
 share=await page.getByRole('link',{name:'WhatsApp',exact:true}).getAttribute('href');
 assert(new URL(share).searchParams.get('text').includes('https://todolima.com/'));
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));
 await page.getByRole('button',{name:'Copiar enlace',exact:true}).click();
 await page.getByRole('textbox',{name:'Enlace para copiar'}).waitFor();
 await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('button',{name:'Compartir Todo Lima'}).evaluate(el=>el===document.activeElement),true);
 for (const viewport of [{width:375,height:812},{width:812,height:375},{width:1280,height:800}]) {
  await page.setViewportSize(viewport);
  await page.getByRole('button',{name:'Compartir Todo Lima'}).click();
  assert(await page.locator('#share-options').isVisible());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
  await page.screenshot({path:`.directory-reports/ui-2026-10-17/share-${viewport.width}.png`});
  await page.keyboard.press('Escape');
 }
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 await page.getByRole('button',{name:'Compartir Todo Lima'}).click();
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Zoom/text scaling');
 console.log('Sharing, contact URL, social metadata, theme persistence, keyboard and responsive checks passed.');
} finally { await browser.close(); }
