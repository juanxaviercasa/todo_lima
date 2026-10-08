#!/usr/bin/env node

/**
 * ORQUESTADOR POR BLOQUES PARA LA EXPANSIÓN DE TODO LIMA (56 CATEGORÍAS)
 * 
 * Uso:
 *   node scripts/batch-expand.js --block 1         (Gastronomía: pollerias, chifas, pizzerias, cafeterias)
 *   node scripts/batch-expand.js --block 2         (Servicios: florerias, opticas, lavanderias, escuelas-de-manejo, casas-de-cambio)
 *   node scripts/batch-expand.js --block 3         (Salud & Mascotas: podologos, laboratorios-clinicos, traumatologos, grooming-canino)
 *   node scripts/batch-expand.js --block 4         (Fitness & Eventos: gimnasios, locales-de-eventos, decoracion-de-eventos, alquiler-de-canchas)
 *   node scripts/batch-expand.js --all             (Todos los 17 nuevos restantes)
 *   node scripts/batch-expand.js --slug pollerias  (Una categoría específica)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { CATEGORIES, getCategoryBySlug } from '../scraper/config/categories.js';
import { scrapeCategory } from '../scraper/scrape-category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const dataDir = path.join(rootDir, 'data');
const stateFilePath = path.join(rootDir, 'scraper', 'state.json');

const BLOCKS = {
  1: ['cevicherias', 'pollerias', 'chifas', 'pizzerias', 'cafeterias'],
  2: ['florerias', 'opticas', 'lavanderias', 'escuelas-de-manejo', 'casas-de-cambio'],
  3: ['podologos', 'laboratorios-clinicos', 'traumatologos', 'grooming-canino'],
  4: ['gimnasios', 'locales-de-eventos', 'decoracion-de-eventos', 'alquiler-de-canchas']
};

const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const blockNum = getArg('--block') || getArg('-b');
const specificSlug = getArg('--slug') || getArg('-s');
const isAll = args.includes('--all');
const forceScrape = args.includes('--force');

function runCommand(cmd, cmdArgs, label) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶️ [Ejecutando] ${label}`);
    const child = spawn(cmd, cmdArgs, { cwd: rootDir, stdio: 'inherit' });
    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`"${label}" falló con código ${code}`));
    });
    child.on('error', err => reject(err));
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateState(slug, resultsCount) {
  let state = { categories: {} };
  if (fs.existsSync(stateFilePath)) {
    try {
      state = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
    } catch {}
  }
  state.categories = state.categories || {};
  state.categories[slug] = {
    lastScraped: new Date().toISOString(),
    status: 'success',
    resultsCount,
    error: null
  };
  state.lastUpdated = new Date().toISOString();
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2), 'utf-8');
}

async function main() {
  let targetSlugs = [];

  if (specificSlug) {
    targetSlugs = [specificSlug];
  } else if (blockNum && BLOCKS[blockNum]) {
    targetSlugs = BLOCKS[blockNum];
  } else if (isAll) {
    targetSlugs = [
      ...BLOCKS[1],
      ...BLOCKS[2],
      ...BLOCKS[3],
      ...BLOCKS[4]
    ];
  } else {
    console.log('❌ Debes especificar un bloque o parámetro:');
    console.log('   node scripts/batch-expand.js --block 1');
    console.log('   node scripts/batch-expand.js --block 2');
    console.log('   node scripts/batch-expand.js --all');
    console.log('   node scripts/batch-expand.js --slug pollerias');
    process.exit(1);
  }

  console.log(`\n======================================================`);
  console.log(`🚀 EXPANSOR MAESTRO DE CATEGORÍAS — TODO LIMA`);
  console.log(`🎯 Categorías objetivo: ${targetSlugs.join(', ')}`);
  console.log(`📊 Total a procesar: ${targetSlugs.length}`);
  console.log(`======================================================\n`);

  let processedCount = 0;

  for (let i = 0; i < targetSlugs.length; i++) {
    const slug = targetSlugs[i];
    const catConfig = getCategoryBySlug(slug);

    if (!catConfig) {
      console.warn(`⚠️ Slug "${slug}" no está registrado en categories.js. Omitiendo.`);
      continue;
    }

    const dataPath = path.join(dataDir, `${slug}.json`);
    let alreadyHasData = false;
    let existingCount = 0;

    if (fs.existsSync(dataPath)) {
      try {
        const d = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        existingCount = Array.isArray(d.businesses) ? d.businesses.length : 0;
        if (existingCount >= 50 && !forceScrape) {
          alreadyHasData = true;
        }
      } catch {}
    }

    console.log(`\n------------------------------------------------------`);
    console.log(`👉 [${i + 1}/${targetSlugs.length}] ${catConfig.title} (${slug})`);
    console.log(`------------------------------------------------------`);

    if (alreadyHasData) {
      console.log(`⚡ Ya cuenta con ${existingCount} negocios extraídos. Saltando scraping web.`);
    } else {
      console.log(`🌐 Extrayendo negocios con Playwright (${catConfig.query})...`);
      try {
        const scrapeResult = await scrapeCategory(catConfig.query, slug, 100);
        updateState(slug, scrapeResult.totalResults || 0);
      } catch (err) {
        console.error(`❌ Error extrayendo "${slug}":`, err.message);
        continue;
      }
    }

    // 2. Ejecutar Auditoría comercial y generación de propuestas B2B
    try {
      await runCommand(
        'node',
        ['auditor/run-audit.js', '--category', slug, '--skip-http'],
        `Auditoría y Pitches para ${slug}`
      );
    } catch (auditErr) {
      console.error(`⚠️ Error en auditoría de "${slug}":`, auditErr.message);
    }

    processedCount++;

    // Pausa breve anti-bloqueo entre categorías si no es la última
    if (i < targetSlugs.length - 1 && !alreadyHasData) {
      console.log(`⏳ Esperando 8 segundos antes de la siguiente categoría...`);
      await sleep(8000);
    }
  }

  // 3. Sincronización masiva final con Supabase PostgreSQL
  console.log(`\n======================================================`);
  console.log(`⚡ Sincronizando todos los nuevos registros con Supabase...`);
  console.log(`======================================================\n`);
  try {
    await runCommand('node', ['scripts/bulk-migration.js'], 'Sincronización Supabase');
  } catch (dbErr) {
    console.error('❌ Error sincronizando con Supabase:', dbErr.message);
  }

  console.log(`\n🎉 Lote finalizado con éxito (${processedCount}/${targetSlugs.length} categorías procesadas).\n`);
}

main().catch(err => {
  console.error('💥 Error crítico en batch-expand:', err);
  process.exit(1);
});
