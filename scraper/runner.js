import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from './config/categories.js';
import { scrapeCategory } from './scrape-category.js';
import { syncWithGit } from './utils/gitSync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stateFilePath = path.join(__dirname, 'state.json');
const dataDir = path.resolve(__dirname, '../data');

// Configuración por defecto
const CONFIG = {
  minDelaySeconds: 6,
  maxDelaySeconds: 14,
  maxResultsPerCategory: 100,
  refreshDaysThreshold: 7 // Volver a raspar si pasaron más de 7 días
};

/**
 * Carga o inicializa el archivo de estado
 */
function loadState() {
  if (fs.existsSync(stateFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
    } catch {
      console.warn('⚠️ Archivo de estado corrupto, inicializando uno nuevo.');
    }
  }
  return {
    version: '1.0',
    createdAt: new Date().toISOString(),
    lastUpdated: null,
    totalCompleted: 0,
    categories: {}
  };
}

/**
 * Guarda el archivo de estado
 */
function saveState(state) {
  state.lastUpdated = new Date().toISOString();
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2), 'utf-8');
}

/**
 * Espera un tiempo aleatorio entre min y max segundos (anti-ban jitter)
 */
function sleepWithJitter(minSec = CONFIG.minDelaySeconds, maxSec = CONFIG.maxDelaySeconds) {
  const seconds = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
  console.log(`\n⏳ Esperando ${seconds} segundos antes de la siguiente categoría (delay anti-bloqueo)...`);
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * Determina si una categoría necesita actualización según la antigüedad
 */
function getStoredResultCount(slug) {
  const filePath = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return 0;

  try {
    const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return Array.isArray(payload.businesses) ? payload.businesses.length : 0;
  } catch {
    return 0;
  }
}

function needsScraping(state, slug, maxResults, force = false) {
  if (force) return true;

  const storedResultCount = getStoredResultCount(slug);
  if (storedResultCount < maxResults) return true;

  const catState = state.categories[slug];
  if (!catState || catState.status !== 'success' || !catState.lastScraped) {
    return false;
  }
  const lastScrapedDate = new Date(catState.lastScraped);
  const diffDays = (Date.now() - lastScrapedDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= CONFIG.refreshDaysThreshold;
}

/**
 * Orquestador principal
 */
async function runOrchestrator() {
  const args = process.argv.slice(2);
  const isLoop = args.includes('--loop');
  const isForce = args.includes('--force');
  const noGit = args.includes('--no-git');
  
  const limitIndex = args.indexOf('--limit');
  const limitCount = limitIndex !== -1 ? parseInt(args[limitIndex + 1], 10) : Infinity;

  const slugIndex = args.indexOf('--slug');
  const specificSlug = slugIndex !== -1 ? args[slugIndex + 1] : null;

  console.log(`\n======================================================`);
  console.log(`🤖 ORQUESTADOR MAESTRO 24/7 - TODOLIMA.COM`);
  console.log(`📋 Total de categorías en matriz: ${CATEGORIES.length}`);
  console.log(`🔄 Modo: ${isLoop ? 'Continuo (24/7)' : 'Pase único'}`);
  console.log(`🐙 Git Sync automático: ${noGit ? 'DESACTIVADO' : 'ACTIVADO'}`);
  if (specificSlug) console.log(`🎯 Categoría fija: ${specificSlug}`);
  if (limitCount !== Infinity) console.log(`🔢 Límite de lote: ${limitCount}`);
  console.log(`======================================================\n`);

  let state = loadState();

  do {
    let queue = CATEGORIES;

    if (specificSlug) {
      queue = CATEGORIES.filter(c => c.slug === specificSlug);
      if (queue.length === 0) {
        console.error(`❌ Categoría con slug "${specificSlug}" no encontrada en la matriz.`);
        process.exit(1);
      }
    }

    // Filtrar las que requieren scraping
    let pendingCategories = queue.filter(cat => needsScraping(
      state,
      cat.slug,
      CONFIG.maxResultsPerCategory,
      isForce
    ));

    if (limitCount !== Infinity) {
      pendingCategories = pendingCategories.slice(0, limitCount);
    }

    console.log(`📊 Categorías pendientes por procesar: ${pendingCategories.length} de ${queue.length}`);

    if (pendingCategories.length === 0) {
      console.log('✅ Todas las categorías están al día con datos frescos.');
      if (isLoop) {
        console.log('😴 Durmiendo 2 horas antes de la próxima verificación...');
        await new Promise(r => setTimeout(r, 2 * 60 * 60 * 1000));
        continue;
      } else {
        break;
      }
    }

    let processedInThisRun = 0;

    for (let i = 0; i < pendingCategories.length; i++) {
      const cat = pendingCategories[i];
      console.log(`\n------------------------------------------------------`);
      console.log(`👉 [${i + 1}/${pendingCategories.length}] Categoría: ${cat.title} (${cat.slug})`);
      console.log(`------------------------------------------------------`);

      try {
        const result = await scrapeCategory(cat.query, cat.slug, CONFIG.maxResultsPerCategory);

        // Actualizar estado local
        state.categories[cat.slug] = {
          lastScraped: new Date().toISOString(),
          status: 'success',
          resultsCount: result.totalResults,
          error: null
        };
        state.totalCompleted = Object.values(state.categories).filter(c => c.status === 'success').length;
        saveState(state);

        // Sincronizar automáticamente con Git y GitHub
        if (!noGit) {
          await syncWithGit(cat.slug);
        }

        processedInThisRun++;

      } catch (err) {
        console.error(`❌ Falló la extracción para "${cat.slug}":`, err.message);
        state.categories[cat.slug] = {
          lastScraped: new Date().toISOString(),
          status: 'error',
          error: err.message
        };
        saveState(state);
      }

      // Delay aleatorio antes del siguiente scrape si quedan categorías
      if (i < pendingCategories.length - 1) {
        await sleepWithJitter();
      }
    }

    console.log(`\n🎉 Lote de ejecución completado. Categorías procesadas: ${processedInThisRun}`);

    if (!isLoop) break;

  } while (isLoop);

  console.log('\n🏁 Orquestador finalizado.\n');
}

runOrchestrator().catch(err => {
  console.error('💥 Error crítico en el orquestador:', err);
  process.exit(1);
});
