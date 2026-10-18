import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Cargar variables de entorno si existen en .env.local
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '821ab621fcfca78218b3b9456fcb08cb';
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'todolima-media';
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  console.error('\n[ERROR] Faltan las credenciales de Cloudflare R2:');
  console.error('Por favor define R2_ACCESS_KEY_ID y R2_SECRET_ACCESS_KEY en .env.local\n');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const IMG_DIR = path.join(ROOT, 'imagenes_generadas');
const files = fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.webp'));

console.log(`\n======================================================`);
console.log(`Iniciando subida a Cloudflare R2:`);
console.log(`- Bucket: ${BUCKET_NAME}`);
console.log(`- Cuenta: ${ACCOUNT_ID}`);
console.log(`- Total archivos encontrados: ${files.length} imágenes WebP`);
console.log(`======================================================\n`);

let uploaded = 0;
let skipped = 0;
let errors = 0;
let processed = 0;

const CONCURRENCY = 12;
let cursor = 0;

async function worker(workerId) {
  while (cursor < files.length) {
    const idx = cursor++;
    const file = files[idx];
    const filePath = path.join(IMG_DIR, file);
    const fileStats = fs.statSync(filePath);
    const key = `editorial/${file}`;

    try {
      try {
        const head = await s3.send(new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
        if (head.ContentLength === fileStats.size) {
          skipped++;
          continue;
        }
      } catch (e) {
        if (e.$metadata?.httpStatusCode !== 404) throw e;
      }

      const fileBuffer = fs.readFileSync(filePath);
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      uploaded++;
    } catch (err) {
      errors++;
      console.error(`[ERROR] Falló subida de ${file}:`, err.message);
    } finally {
      processed++;
      if (processed % 50 === 0 || processed === files.length) {
        console.log(`[Progreso ${processed}/${files.length}] Subidos: ${uploaded}, Omitidos: ${skipped}, Errores: ${errors}`);
      }
    }
  }
}

const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
await Promise.all(workers);

console.log(`\n======================================================`);
console.log(`[FIN] Subida a Cloudflare R2 completada:`);
console.log(`- Subidos con éxito: ${uploaded}`);
console.log(`- Ya existentes (omitidos): ${skipped}`);
console.log(`- Errores: ${errors}`);
console.log(`- Total procesados: ${processed}/${files.length}`);
console.log(`======================================================\n`);
if (errors) process.exitCode = 1;
