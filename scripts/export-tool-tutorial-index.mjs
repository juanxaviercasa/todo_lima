import fs from 'node:fs/promises';
import { ALL_TOOLS } from '../lib/toolsCatalog.js';
const captures=JSON.parse(await fs.readFile('lib/toolTutorialImages.json','utf8'));
const origin='https://todolima.com';
const tools=ALL_TOOLS.map(tool=>({slug:tool.slug,name:tool.name,toolUrl:tool.url,tutorialUrl:`${origin}/herramientas/${tool.slug}`,steps:tool.tutorialSteps.map((step,index)=>{
 const image=captures[tool.slug]?.[index];
 if(!image?.matched)throw new Error(`Captura sin verificar: ${tool.slug}/${index+1}`);
 return {number:index+1,title:step.stepTitle,url:`${origin}/herramientas/${tool.slug}#tutorial-paso-${index+1}`,image:`${origin}${image.src}`,alt:image.alt,capturedAt:image.capturedAt};
})}));
await fs.writeFile('public/tutoriales-herramientas.json',JSON.stringify({version:1,tools},null,2)+'\n');
console.log(`Índice público de tutoriales: ${tools.length} herramientas.`);
