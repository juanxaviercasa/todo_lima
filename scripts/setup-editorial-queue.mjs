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
const PILOT_POSTS_PATH = path.join(STAGING_DIR, 'pilot-posts.json');
const POSTS_PROD_PATH = path.join(DATA_DIR, 'posts.json');

const allPosts = JSON.parse(fs.readFileSync(ALL_POSTS_PATH, 'utf8'));

// Cargar pilotos históricos
let pilotPosts = [];
if (fs.existsSync(PILOT_POSTS_PATH)) {
  pilotPosts = JSON.parse(fs.readFileSync(PILOT_POSTS_PATH, 'utf8'));
} else {
  console.warn('[ADVERTENCIA] pilot-posts.json no encontrado en staging.');
}

// Configuración de publicación inicial: Día 1 (3 primeros artículos)
const INITIAL_PUBLISHED_COUNT = 3;
const TODAY = '2026-10-11';

// Construir la cola maestra de los 180 artículos
const queue = [];

for (let i = 0; i < allPosts.length; i++) {
  const post = allPosts[i];
  const pkgId = `TLB-${String(i + 1).padStart(3, '0')}`;
  const isInitial = i < INITIAL_PUBLISHED_COUNT;

  queue.push({
    article_id: pkgId,
    slug: post.slug,
    title: post.title,
    category: post.category,
    status: isInitial ? 'publicado' : 'en_cola',
    published_at: isInitial ? TODAY : null,
    batch_day: isInitial ? 1 : null
  });

  // Actualizar package.json individual en staging
  const pkgDir = path.join(STAGING_DIR, pkgId);
  const pkgFile = path.join(pkgDir, 'package.json');
  if (fs.existsSync(pkgFile)) {
    try {
      const pkgData = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
      pkgData.stage = isInitial ? 'publicado' : 'en_cola';
      if (!pkgData.quality) pkgData.quality = {};
      pkgData.quality.publication_approved = isInitial;
      pkgData.quality.publication_date = isInitial ? TODAY : null;
      if (isInitial && pkgData.content) {
        pkgData.content.published = TODAY;
        pkgData.content.modified = TODAY;
      }
      fs.writeFileSync(pkgFile, JSON.stringify(pkgData, null, 2) + '\n', 'utf8');
    } catch (err) {
      console.warn(`Error al actualizar ${pkgFile}:`, err.message);
    }
  }
}

fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n', 'utf8');

// Configurar posts.json de producción
const initialPosts = [...pilotPosts];

for (let i = 0; i < INITIAL_PUBLISHED_COUNT; i++) {
  const post = { ...allPosts[i] };
  post.published = TODAY;
  post.modified = TODAY;
  if (!initialPosts.some(x => x.slug === post.slug)) {
    initialPosts.push(post);
  }
}

// Ordenar por fecha descendente
initialPosts.sort((a, b) => (b.published || '').localeCompare(a.published || '') || a.slug.localeCompare(b.slug));

fs.writeFileSync(POSTS_PROD_PATH, JSON.stringify(initialPosts, null, 2) + '\n', 'utf8');

console.log(`\n======================================================`);
console.log(`[OK] Cola de publicación editorial inicializada:`);
console.log(`- Total artículos en catálogo: ${queue.length}`);
console.log(`- Artículos publicados hoy (Día 1): ${INITIAL_PUBLISHED_COUNT}`);
console.log(`- Pilotos históricos activos: ${pilotPosts.length}`);
console.log(`- Total posts en producción hoy: ${initialPosts.length}`);
console.log(`- Artículos en cola para goteo diario: ${queue.filter(q => q.status === 'en_cola').length}`);
console.log(`- Días restantes a 3 por día: ${Math.ceil(queue.filter(q => q.status === 'en_cola').length / 3)} días (~59 días)`);
console.log(`- Archivo de cola: ${QUEUE_PATH}`);
console.log(`- Archivo activo de producción: ${POSTS_PROD_PATH}`);
console.log(`======================================================\n`);
