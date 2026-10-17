import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { ALL_TOOLS } from '../lib/toolsCatalog.js';

// Isolated browser; after loading the public interface ALL networking is blocked.
// Only fictitious values and synthetic pixels are used. No local user file is loaded.
const browser = await chromium.launch();
const manifest = JSON.parse(await fs.readFile('lib/toolTutorialImages.json','utf8').catch(()=>'{}'));
const focus = {
 'calculadora-precios-venta-igv': ['Costo del producto','Margen de ganancia deseado','Margen Inverso','Comparador','Kits'],
 'calculadora-sobrecostos-laborales': ['Vista Mensual','Agregar empleado','TIPO DE SEGURO','Agregar','COSTO TOTAL EMPLEADOR'],
 'calculadora-prestamos-amortizaciones': ['Configura tu crédito','Periodo de gracia','Comparar escenarios','Perfilador de capacidad de pago','Tabla de amortización'],
 'flujo-caja-pymes': ['Nuevo movimiento','Fecha de vencimiento','Categoría','Movimientos y vencimientos','Respaldo JSON'],
 'generador-codigos-qr': ['Número de WhatsApp','Mensaje predefinido','Parámetros de rastreo (UTM)','ESTILO DEL QR','Tu enlace generado'],
 'calculadora-flete-envio-local': ['Datos del paquete','Paradas de la ruta','Cotización de ruta','Manifiesto de envío'],
 'creador-facturas-proforma': ['DATOS DEL EMISOR','DETALLES DEL DOCUMENTO','ÍTEMS','PAGO RÁPIDO (CÓDIGO QR)','DISEÑO DE PLANTILLA'],
 'generador-cotizaciones': ['Datos de la Cotización','CONDICIONES DE PAGO','Ítems / Servicios','Aplicar Detracción','PREVISUALIZACIÓN'],
 'crm-pymes': ['Nuevo contacto','Nueva oportunidad','Probabilidad (%)','Pipeline comercial','Respaldo JSON'],
 'generador-contratos-servicios': ['Tipo de documento','Datos del Contratista','Detalles del Servicio','Cláusulas personalizadas','Firma digital'],
 'generador-politicas-devolucion': ['01 — ¿QUÉ VENDES?','Nombre de la tienda','Condición del empaque','Generar política','Desbloquear'],
 'generador-politicas-terminos': ['Nombre de la empresa','Identificación fiscal','Cumplimiento legal','Privacidad','Generar documentos'],
 'auditor-seo-basico': ['Extracción automática','Meta Title','Mejorar con IA','Open Graph','Comparador SEO'],
 'conversor-optimizador-imagenes': ['Arrastra tus imágenes o haz clic','Calidad global','Recortar y redimensionar','Marca de agua (opcional)','Descargar ZIP'],
 'analizador-titulares': ['Escribe tu titular','CARACTERES','HUELLA EMOCIONAL','Google','Test A/B'],
 'generador-paletas-corporativas': ['Tu combinación de colores','Generar combinación','Matriz de contraste cruzado','Deuteranopía','Descargar CSS'],
};
const click = async (p,name) => p.getByRole('button',{name,exact:true}).first().click();
const fill = async (p,selector,value) => {const l=p.locator(selector).first();await l.fill(value);await l.blur();};
await fs.mkdir('public/images/tutoriales',{recursive:true});
await fs.mkdir('docs/qa/tutoriales',{recursive:true});
try {
 for(const tool of ALL_TOOLS) {
  if(process.argv[2] && !process.argv.slice(2).includes(tool.slug))continue;
  const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  await page.goto(tool.url,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.route('**/*',r=>r.abort());
  const slug=tool.slug;
  if(slug==='generador-contratos-servicios') await click(page,'Crear mi documento');
  if(slug==='calculadora-precios-venta-igv') for(const [id,v]of Object.entries({cost:'100',margin:'30',tax:'18'}))await fill(page,'#'+id,v);
  if(slug==='generador-codigos-qr') {await page.getByRole('combobox',{name:'Código de país'}).selectOption('51');await fill(page,'input[type=tel]','900000000');await fill(page,'textarea','Hola, quisiera una cotización. Mensaje ficticio de demostración.');}
  if(slug==='analizador-titulares') await page.locator('[contenteditable=true]').first().fill('7 ideas prácticas para organizar tu negocio en Lima');
  if(slug==='creador-facturas-proforma') {
   await page.getByPlaceholder('Mi Empresa S.A.C.',{exact:true}).fill('Empresa de demostración');
   await page.getByPlaceholder('Escribe o selecciona un cliente',{exact:true}).fill('Cliente de ejemplo');
   await page.getByPlaceholder('Concepto (busca en catálogo)',{exact:true}).fill('Servicio de demostración');
   await page.getByRole('spinbutton',{name:'Precio unitario',exact:true}).fill('100');
  }
  if(slug==='generador-cotizaciones') {
   await page.getByLabel('Nombre de la Empresa Emisora',{exact:true}).fill('Empresa de demostración');
   await page.getByPlaceholder('Descripción del servicio o producto',{exact:true}).fill('Servicio de ejemplo');
   await page.getByRole('spinbutton',{name:'Precio unitario',exact:true}).fill('350');
  }
  if(slug==='generador-politicas-devolucion') {await page.getByRole('button',{name:/Ropa y Moda/}).click();await page.getByLabel('Nombre de la tienda',{exact:false}).fill('Tienda de demostración');}
  if(slug==='generador-politicas-terminos') {await page.getByLabel('Nombre de la empresa',{exact:true}).fill('Empresa de demostración');await page.getByLabel('URL del sitio web',{exact:true}).fill('https://example.com');await page.getByLabel('País',{exact:true}).fill('Perú');}
  if(slug==='generador-contratos-servicios') for(const[id,v]of Object.entries({contractorName:'Proveedor de ejemplo',contractorEmail:'proveedor@example.com',clientName:'Cliente de ejemplo',serviceDescription:'Diseño de un catálogo de demostración',amount:'1500',place:'Lima'}))await fill(page,'#'+id,v);
  if(slug==='calculadora-flete-envio-local') for(const[id,v]of Object.entries({length:'30',width:'20',height:'15',weight:'2'}))await fill(page,'#'+id,v);
  manifest[slug]=[];
  for(const[index,step]of tool.tutorialSteps.entries()) {
   if(slug==='calculadora-precios-venta-igv'&&index>=2)await click(page,['Margen Inverso','Comparador','Kits'][index-2]);
   if(slug==='generador-codigos-qr'&&index===2)await click(page,'Parámetros de rastreo (UTM)');
   if(slug==='calculadora-sobrecostos-laborales'&&index===1) {await page.getByPlaceholder('Ej. Ana Torres',{exact:true}).fill('Persona de ejemplo');await page.getByPlaceholder('Ej. Analista',{exact:true}).fill('Asistente');await page.getByPlaceholder('0.00',{exact:true}).fill('2000');}
   if(slug==='calculadora-sobrecostos-laborales'&&index===4) {await click(page,'Agregar');await click(page,'Vista Anual');}
   if(slug==='generador-contratos-servicios'&&index===3)await click(page,'Añadir cláusula personalizada');
   if(slug==='generador-politicas-devolucion'&&index===4)await click(page,'Generar política');
   if(slug==='generador-politicas-terminos'&&(index===2||index===4))await click(page,'Continuar');
   if(slug==='analizador-titulares'&&index===4)await click(page,'Test A/B');
   if(slug==='generador-paletas-corporativas'&&index===3)await click(page,'Deuteranopía');
   if(slug==='conversor-optimizador-imagenes'&&index===2)await click(page,'Editar');
   if(slug==='conversor-optimizador-imagenes'&&index===3)await click(page,'Cancelar');
   if(slug==='conversor-optimizador-imagenes'&&index===1) {
    const png=await sharp({create:{width:1200,height:800,channels:3,background:'#0284c7'}}).png().toBuffer();
    await page.locator('input[type=file]').first().setInputFiles({name:'ejemplo-sintetico.png',mimeType:'image/png',buffer:png});
   }
   const label=focus[slug][index];
   let target=page.getByText(label,{exact:true}).first();
   if(!await target.isVisible())target=page.getByText(new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i')).first();
   const matched=await target.isVisible();
   if(matched)await target.evaluate(e=>{document.querySelectorAll('[data-capture-focus]').forEach(x=>{x.style.outline='';x.removeAttribute('data-capture-focus');});e.dataset.captureFocus='true';e.style.outline='3px solid #0284c7';e.style.outlineOffset='5px';scrollTo(0,Math.max(0,e.getBoundingClientRect().top+scrollY-180));});
   else {await page.evaluate(()=>scrollTo(0,250));console.log(`REVISAR ${slug} paso ${index+1}: ${label}`);}
   await page.waitForTimeout(250);
   const file=`${slug}-${index+1}.webp`;
   const shot=slug==='generador-politicas-devolucion'&&index===4
    ? await target.locator('..').screenshot({animations:'disabled'})
    : await page.screenshot({animations:'disabled'});
   const meta=await sharp(shot).metadata();
   await sharp(shot).webp({quality:86}).toFile(`public/images/tutoriales/${file}`);
   manifest[slug].push({src:`/images/tutoriales/${file}`,width:meta.width,height:meta.height,alt:`${tool.name}, paso ${index+1}: ${label}. Captura de la interfaz de Nube para Pymes.`,caption:matched?`Localiza «${label}», resaltado en azul, y sigue la indicación de este paso.`:`Vista de referencia de la herramienta para ${step.stepTitle.toLowerCase()}.`,source:tool.url,capturedAt:new Date().toISOString().slice(0,10),target:label,matched});
  }
  await fs.writeFile(`docs/qa/tutoriales/${slug}.txt`,await page.locator('body').innerText());
  await page.close();console.log(`${slug}: ${manifest[slug].length} capturas`);
  await fs.writeFile('lib/toolTutorialImages.json',JSON.stringify(manifest,null,2)+'\n');
 }
 await fs.writeFile('lib/toolTutorialImages.json',JSON.stringify(manifest,null,2)+'\n');
}finally{await browser.close();}
