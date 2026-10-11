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
const countArg = parseInt(getArg('--count', '3'), 10);
const forceDate = getArg('--force-date', null);
const isDryRun = args.includes('--dry-run');

// 2. Determinar fecha en zona horaria America/Lima (UTC-5)
function getLimaDate() {
  if (forceDate) return forceDate;
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(now);
}

const publishDate = getLimaDate();

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
const currentBatchDay = maxBatchDay + 1;

// Seleccionar la tanda de artículos a publicar
const batchToPublish = pendingInQueue.slice(0, countArg);

console.log(`\n======================================================`);
console.log(`[DRIP-FEED EDITORIAL] Tanda de publicación diaria`);
console.log(`- Fecha asignada: ${publishDate} (Zona Horaria Lima / America/Lima)`);
console.log(`- Lote de publicación: Día #${currentBatchDay}`);
console.log(`- Cantidad solicitada: ${countArg} artículos`);
console.log(`- Artículos a publicar en esta tanda: ${batchToPublish.length}`);
if (isDryRun) console.log(`- MODO: [DRY-RUN / SIMULACIÓN] No se escribirán cambios en disco`);
console.log(`======================================================\n`);

const newlyPublishedPosts = [];

for (const item of batchToPublish) {
  // Buscar contenido maestro
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

  if (!isDryRun) {
    // 1. Actualizar estado en la cola
    item.status = 'publicado';
    item.published_at = publishDate;
    item.batch_day = currentBatchDay;

    // 2. Actualizar el paquete individual en staging
    const pkgDir = path.join(STAGING_DIR, item.article_id);
    const pkgFile = path.join(pkgDir, 'package.json');
    if (fs.existsSync(pkgFile)) {
      try {
        const pkgData = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
        pkgData.stage = 'publicado';
        if (!pkgData.quality) pkgData.quality = {};
        pkgData.quality.publication_approved = true;
        pkgData.quality.publication_date = publishDate;
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
console.log(`- Artículos publicados hoy: ${newlyPublishedPosts.length}`);
console.log(`- Total artículos activos en blog: ${isDryRun ? currentProdPosts.length : (currentProdPosts.length + newlyPublishedPosts.length)}`);
console.log(`- Total TLB publicados acumulados: ${totalPublished} / 180`);
console.log(`- Artículos pendientes en cola: ${remainingCount}`);
console.log(`- Días restantes de goteo (a 3 por día): ~${daysLeft} días`);
console.log(`======================================================\n`);
