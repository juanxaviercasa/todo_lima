/**
 * ============================================================================
 * SCRIPT MAESTRO HEADLESS: GOOGLE MAPS DIRECTO A NEXT.JS (Fase MVP)
 * ============================================================================
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

const MAPEO_PATH = path.join(__dirname, 'config/mapeo.json');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function cleanField(text) {
  if (!text) return '';
  return text.replace(/[\uE000-\uF8FF]/g, '').replace(/^[\s\n\r]+|[\s\n\r]+$/g, '').trim();
}

/**
 * Git Sync: Push a origin para detonar Vercel
 */
function gitSync(slug) {
  console.log(`\n🐙 [GitSync] Sincronizando datos de "${slug}" con GitHub...`);
  try {
    const targetFile = `data/${slug}.json`;
    execSync(`git add "${targetFile}"`, { cwd: rootDir, stdio: 'pipe' });
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const commitMsg = `feat(${slug}): update directory data 100 businesses (${timestamp})`;
    
    execSync(`git commit -m "${commitMsg}"`, { cwd: rootDir, stdio: 'pipe' });
    const currentBranch = execSync('git branch --show-current', { cwd: rootDir, encoding: 'utf-8' }).trim() || 'main';
    execSync(`git push origin ${currentBranch}`, { cwd: rootDir, stdio: 'pipe' });
    console.log(`🚀 [GitSync] Push exitoso. Despliegue en Vercel detonado.`);
  } catch (error) {
    console.warn(`⚠️ [GitSync] Nota:`, error.message);
  }
}

/**
 * FASE 1: Scraping de Google Maps (Hasta 100 negocios)
 */
async function scrapeMapsForCategory(context, query, slug) {
  console.log(`\n📍 [Maps] Extrayendo Top 100 para: "${query}"...`);
  const page = await context.newPage();
  
  try {
    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=es`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    
    console.log('📜 [Maps] Scrolleando feed para cargar hasta 100 negocios...');
    const placeUrls = new Set();
    let scrollAttempts = 0;
    
    // Límite ampliado a 100 negocios o 40 intentos de scroll
    while (placeUrls.size < 100 && scrollAttempts < 40) {
      scrollAttempts++;
      const urls = await page.$$eval('a[href*="/maps/place/"]', links =>
        links.map(l => l.href.split('?')[0]).filter(href => href.includes('/maps/place/'))
      );
      urls.forEach(u => placeUrls.add(u));
      
      process.stdout.write(`\r   [Scroll ${scrollAttempts}] Enlaces recopilados: ${placeUrls.size}/100`);
      
      if (placeUrls.size >= 100) break;
      await page.evaluate(() => {
        const feed = document.querySelector('div[role="feed"]');
        if (feed) feed.scrollBy(0, 1500);
      });
      await sleep(1500);
    }
    console.log('\n');

    const targetUrls = Array.from(placeUrls).slice(0, 100);
    const businesses = [];

    for (let i = 0; i < targetUrls.length; i++) {
      const url = targetUrls[i];
      try {
        await page.goto(`${url}?hl=es`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForSelector('h1', { timeout: 8000 });
        
        const data = await page.evaluate(() => {
          const name = document.querySelector('h1')?.innerText.trim() || '';
          let rating = null, reviewsCount = null;
          const starEl = document.querySelector('span[aria-label*="estrellas"]');
          if (starEl) {
            const m = starEl.getAttribute('aria-label')?.match(/([\d,\.]+)/);
            if (m) rating = parseFloat(m[1].replace(',', '.'));
          }
          const revEl = document.querySelector('button[aria-label*="reseñas"]');
          if (revEl) {
            const m = revEl.getAttribute('aria-label')?.replace(/[^0-9]/g, '');
            if (m) reviewsCount = parseInt(m, 10);
          }
          const cat = document.querySelector('button[jsaction*="category"]')?.innerText.trim() || '';
          const addr = document.querySelector('button[data-item-id="address"]')?.innerText || '';
          
          return { name, rating, reviewsCount, category: cat, address: addr };
        });

        businesses.push({
          id: `biz_${i + 1}`,
          name: data.name || 'Sin nombre',
          rating: data.rating,
          reviewsCount: data.reviewsCount,
          category: data.category || slug,
          address: cleanField(data.address),
          url: url
        });
        console.log(`   ✅ [Maps #${i + 1}] Extraído: ${data.name}`);
      } catch (err) {
        // Ignorar errores de carga individuales
      }
    }

    businesses.sort((a, b) => ((b.rating || 0) * 1000 + (b.reviewsCount || 0)) - ((a.rating || 0) * 1000 + (a.reviewsCount || 0)));
    return { businesses, top1: businesses[0] || { name: `${slug.toUpperCase()} en Lima`, address: 'Lima, Perú' } };
  } finally {
    await page.close();
  }
}

/**
 * FASE 2: Estructuración Directa de Copy
 */
function generateDirectResponseCopy(slug, topBusiness) {
  console.log(`✍️ [Copy] Generando estructura de respuesta directa localmente...`);
  const tituloNicho = slug.replace(/-/g, ' ').toUpperCase();
  
  return {
    headline: `Los Mejores Expertos en ${tituloNicho} en Lima: Conoce a ${topBusiness.name}`,
    subtitles: [
      `Garantiza resultados hoy mismo. Ubicados en ${topBusiness.address}, destacan como la opción número uno validada por usuarios reales.`,
      `Descubre por qué cuentan con una calificación de ${topBusiness.rating || 'excelencia'} estrellas en Google. No dejes tu necesidad al azar.`
    ],
    ctas: ['Contactar por WhatsApp Ahora', 'Ver Directorio Completo']
  };
}

/**
 * FASE 3: Consolidación
 */
function consolidateCategoryData(slug, queryMaps, topBusiness, businesses, localCopy) {
  const dataDir = path.join(rootDir, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const filePath = path.join(dataDir, `${slug}.json`);
  const payload = {
    category: slug,
    searchQuery: queryMaps,
    totalResults: businesses.length,
    updatedAt: new Date().toISOString(),
    topBusinessContext: topBusiness,
    pageContent: localCopy,
    businesses: businesses
  };

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`📁 [JSON] Archivo guardado: ${filePath}`);
}

/**
 * ORQUESTADOR
 */
async function runMasterCycle() {
  console.log('🚀 INICIANDO MODO HEADLESS (MAPS -> JSON -> VERCEL)');
  const mapeo = JSON.parse(fs.readFileSync(MAPEO_PATH, 'utf-8'));
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const queue = Object.keys(mapeo);

  for (const slug of queue) {
    // Memoria: Salta si ya existe
    if (fs.existsSync(path.join(rootDir, `data/${slug}.json`))) {
      console.log(`⏭️ Directorio "${slug}" ya existe en /data/. Saltando...`);
      continue;
    }

    console.log(`\n▶️ PROCESANDO: "${slug.toUpperCase()}"`);
    const catConfig = mapeo[slug];
    
    try {
      const { businesses, top1 } = await scrapeMapsForCategory(context, catConfig.queryMaps, slug);
      const copyContent = generateDirectResponseCopy(slug, top1);
      consolidateCategoryData(slug, catConfig.queryMaps, top1, businesses, copyContent);
      gitSync(slug);
    } catch (err) {
      console.error(`💥 Error en "${slug}":`, err.message);
    }
  }

  await browser.close();
  console.log('🎉 FASE MVP COMPLETADA CON ÉXITO.');
}

runMasterCycle();