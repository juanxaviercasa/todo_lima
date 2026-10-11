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

// Configuración de publicación inicial:
// Día 1 (Hoy 11 de Octubre de 2026): Iniciamos con 1 artículo oficial matutino (TLB-001)
// Los siguientes artículos (TLB-002 para la tarde y TLB-003 para la noche) quedan en cola.
const INITIAL_PUBLISHED_COUNT = 1;
const TODAY = '2026-10-11';
const INITIAL_SLOT = 'mañana';

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
    published_slot: isInitial ? INITIAL_SLOT : null,
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
      pkgData.quality.publication_slot = isInitial ? INITIAL_SLOT : null;
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

// Configurar posts.json de producción con los 2 pilotos + el primer post matutino
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
console.log(`[OK] Cola de publicación editorial (1 por slot) inicializada:`);
console.log(`- Total artículos en catálogo: ${queue.length}`);
console.log(`- Artículos publicados hoy en slot matutino: ${INITIAL_PUBLISHED_COUNT} (${queue[0].article_id} - ${queue[0].title})`);
console.log(`- Pilotos históricos activos: ${pilotPosts.length}`);
console.log(`- Total posts en producción ahora mismo: ${initialPosts.length}`);
console.log(`- Artículos en cola para goteo (1 por turno): ${queue.filter(q => q.status === 'en_cola').length}`);
console.log(`- Próximos turnos de hoy:`);
console.log(`    * Tarde (14:00 Lima): ${queue[1].article_id} (${queue[1].title})`);
console.log(`    * Noche (20:00 Lima): ${queue[2].article_id} (${queue[2].title})`);
console.log(`- Archivo de cola: ${QUEUE_PATH}`);
console.log(`- Archivo activo de producción: ${POSTS_PROD_PATH}`);
console.log(`======================================================\n`);
