import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const STAGING_DIR = path.join(ROOT, 'staging', 'editorial');
const DATA_DIR = path.join(ROOT, 'data', 'blog');
const ALL_POSTS_PATH = path.join(STAGING_DIR, 'all-180-posts.json');
const QUEUE_PATH = path.join(STAGING_DIR, 'publishing-queue.json');
const MANIFEST_PATH = path.join(STAGING_DIR, 'batch-manifest.json');
const POSTS_PROD_PATH = path.join(DATA_DIR, 'posts.json');

// 1. Argumentos CLI
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(name);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return defaultValue;
}

// Por defecto 1 artículo por ejecución (se dispara 3 veces al día: mañana, tarde, noche)
const countArg = parseInt(getArg('--count', '1'), 10);
const forceDate = getArg('--force-date', null);
const forceSlot = getArg('--slot', null);
const isDryRun = args.includes('--dry-run');

// 2. Determinar fecha y franja horaria en zona horaria America/Lima (UTC-5)
function getLimaTimeInfo() {
  const now = new Date();
  const dateStr = forceDate || new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now);

  const hourStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    hour12: false
  }).format(now);
  const hour = parseInt(hourStr, 10);

  let slot = forceSlot;
  if (!slot) {
    if (hour < 12) {
      slot = 'mañana';
    } else if (hour >= 12 && hour < 18) {
      slot = 'tarde';
    } else {
      slot = 'noche';
    }
  }

  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  return { date: dateStr, time: timeStr, hour, slot };
}

const timeInfo = getLimaTimeInfo();
const publishDate = timeInfo.date;
const publishSlot = timeInfo.slot;

// 3. Cargar cola y publicaciones
if (!fs.existsSync(QUEUE_PATH)) {
  console.error(`[ERROR] Archivo de cola no existe: ${QUEUE_PATH}. Ejecuta scripts/setup-editorial-queue.mjs primero.`);
  process.exit(1);
}

const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
const allPosts = JSON.parse(fs.readFileSync(ALL_POSTS_PATH, 'utf8'));
const currentProdPosts = JSON.parse(fs.readFileSync(POSTS_PROD_PATH, 'utf8'));

// Identificar artículos pendientes
const pendingInQueue = queue.filter(item => item.status === 'en_cola');

if (pendingInQueue.length === 0) {
  console.log(`\n======================================================`);
  console.log(`[INFO] ¡El catálogo editorial completo ya ha sido publicado!`);
  console.log(`- Artículos en producción: ${currentProdPosts.length}`);
  console.log(`- Pendientes en cola: 0`);
  console.log(`======================================================\n`);
  process.exit(0);
}

// Determinar el número de día de lote actual
const maxBatchDay = queue.reduce((max, item) => Math.max(max, item.batch_day || 0), 0);
// Si ya hay artículos publicados hoy, mantenemos el batch_day; si es una fecha nueva, incrementamos
const todayItems = queue.filter(item => item.published_at === publishDate);
const currentBatchDay = todayItems.length > 0 ? maxBatchDay : (maxBatchDay + 1);

// Seleccionar la tanda de artículos a publicar (por defecto 1)
const batchToPublish = pendingInQueue.slice(0, countArg);

console.log(`\n======================================================`);
console.log(`[DRIP-FEED EDITORIAL] Publicación por Franja Horaria`);
console.log(`- Fecha: ${publishDate} ${timeInfo.time} (Hora Lima - America/Lima)`);
console.log(`- Franja / Slot del día: [${publishSlot.toUpperCase()}]`);
console.log(`- Día editorial acumulado: Día #${currentBatchDay}`);
console.log(`- Artículos a publicar en esta franja: ${batchToPublish.length}`);
if (isDryRun) console.log(`- MODO: [DRY-RUN / SIMULACIÓN] No se escribirán cambios en disco`);
console.log(`======================================================\n`);

const newlyPublishedPosts = [];

for (const item of batchToPublish) {
  const masterPost = allPosts.find(p => p.slug === item.slug);
  if (!masterPost) {
    console.error(`[ERROR] No se encontró el post para slug: ${item.slug}`);
    continue;
  }

  const postForProd = {
    ...masterPost,
    published: publishDate,
    modified: publishDate
  };

  newlyPublishedPosts.push(postForProd);

  console.log(`  -> [${item.article_id}] ${postForProd.title}`);
  console.log(`     Slug: /blog/${postForProd.slug}`);
  console.log(`     Categoría: ${postForProd.category} | Portada: ${postForProd.cover}`);
  console.log(`     Slot asignado: ${publishSlot}`);

  if (!isDryRun) {
    // 1. Actualizar estado en la cola
    item.status = 'publicado';
    item.published_at = publishDate;
    item.published_slot = publishSlot;
    item.batch_day = currentBatchDay;

    // 2. Actualizar paquete en staging
    const pkgDir = path.join(STAGING_DIR, item.article_id);
    const pkgFile = path.join(pkgDir, 'package.json');
    if (fs.existsSync(pkgFile)) {
      try {
        const pkgData = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
        pkgData.stage = 'publicado';
        if (!pkgData.quality) pkgData.quality = {};
        pkgData.quality.publication_approved = true;
        pkgData.quality.publication_date = publishDate;
        pkgData.quality.publication_slot = publishSlot;
        if (pkgData.content) {
          pkgData.content.published = publishDate;
          pkgData.content.modified = publishDate;
        }
        fs.writeFileSync(pkgFile, JSON.stringify(pkgData, null, 2) + '\n', 'utf8');
      } catch (err) {
        console.warn(`Error al actualizar package ${pkgFile}:`, err.message);
      }
    }
  }
}

if (!isDryRun) {
  // Guardar cola actualizada
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n', 'utf8');

  // Integrar nuevos artículos en data/blog/posts.json
  const updatedProdPosts = [...currentProdPosts];
  for (const newPost of newlyPublishedPosts) {
    const existingIdx = updatedProdPosts.findIndex(p => p.slug === newPost.slug);
    if (existingIdx !== -1) {
      updatedProdPosts[existingIdx] = newPost;
    } else {
      updatedProdPosts.push(newPost);
    }
  }

  // Ordenar por fecha de publicación descendente y luego por slug
  updatedProdPosts.sort((a, b) => (b.published || '').localeCompare(a.published || '') || a.slug.localeCompare(b.slug));

  fs.writeFileSync(POSTS_PROD_PATH, JSON.stringify(updatedProdPosts, null, 2) + '\n', 'utf8');

  // Actualizar batch-manifest si existe
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      manifest.last_published_date = publishDate;
      manifest.last_published_slot = publishSlot;
      manifest.last_batch_day = currentBatchDay;
      manifest.published_count = queue.filter(x => x.status === 'publicado').length;
      manifest.queued_count = queue.filter(x => x.status === 'en_cola').length;
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    } catch (err) {
      // Ignorar error leve de manifest
    }
  }
}

const remainingCount = queue.filter(x => x.status === 'en_cola').length;
const totalPublished = queue.filter(x => x.status === 'publicado').length;
const daysLeft = Math.ceil(remainingCount / 3);

console.log(`\n======================================================`);
console.log(`[RESUMEN FINAL]`);
console.log(`- Artículos publicados en este turno: ${newlyPublishedPosts.length} (Franja: ${publishSlot})`);
console.log(`- Total artículos activos en blog: ${isDryRun ? currentProdPosts.length : (currentProdPosts.length + newlyPublishedPosts.length)}`);
console.log(`- Total TLB publicados acumulados: ${totalPublished} / 180`);
console.log(`- Artículos pendientes en cola: ${remainingCount}`);
console.log(`- Días restantes a 3 por día (1 mañana, 1 tarde, 1 noche): ~${daysLeft} días`);
console.log(`======================================================\n`);
