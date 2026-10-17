import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { ALL_TOOLS } from '../lib/toolsCatalog.js';
const b = await chromium.launch();
for (const t of ALL_TOOLS) {
 const p=await b.newPage(); await p.goto(t.url,{waitUntil:'networkidle'});
 const controls=await p.locator('input,textarea,select,button').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().width).map(e=>({tag:e.tagName,id:e.id,type:e.type,text:e.textContent?.slice(0,110),placeholder:e.placeholder,label:e.labels?.[0]?.textContent,aria:e.getAttribute('aria-label'),value:e.value})));
 await fs.writeFile(`docs/qa/tutoriales/${t.slug}-controls.json`,JSON.stringify(controls,null,2)); await p.close();
}
await b.close();
