import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const BRAIN_DIR = 'C:\\Users\\cabel\\.gemini\\antigravity\\brain\\047ec125-6dd5-4a41-b081-01ef7839de79';

const NEW_IMAGES = [
  {
    baseName: 'museos-lima-portada',
    source: path.join(BRAIN_DIR, 'museos_lima_portada_1791825333558.jpg'),
    prompt: 'Authentic 35mm documentary photography of an expansive and elegant museum exhibition hall in Lima, Peru. High vaulted ceilings, warm natural daylight filtering from upper windows onto polished floors. Minimalist glass vitrines showcasing ancient pre-Columbian ceramic vessels with subtle warm spot illumination. A young Peruvian couple seen from a three-quarter angle respectfully observing an exhibit, authentic atmosphere, natural human proportions, realistic skin textures, sharp architectural perspective, warm neutral colors. Cinematic composition, 16:9 aspect ratio, no text, no letters, no logos, no watermarks, photorealistic.'
  },
  {
    baseName: 'museos-lima-curaduria',
    source: path.join(BRAIN_DIR, 'museos_lima_curaduria_1791825357483.jpg'),
    prompt: 'Authentic 35mm documentary photography of a Peruvian museum docent and a female visitor in an exhibition gallery in Lima, Peru. The cultural docent is speaking warmly and gesturing toward a beautifully illuminated museum display case showcasing ancestral Andean textile fragments and natural dyed fibers. Subtle museum ambient lighting, genuine respectful dialogue, realistic facial features, natural skin textures, elegant museum atmosphere, crisp focus on the foreground subjects with gently blurred gallery background. 16:9 aspect ratio, photorealistic, no text, no signs, no logos, no watermarks.'
  },
  {
    baseName: 'museos-lima-patio',
    source: path.join(BRAIN_DIR, 'museos_lima_patio_1791825391479.jpg'),
    prompt: 'Authentic 35mm documentary photography of a sunlit colonial courtyard inside a prestigious historic museum in Lima, Peru. Traditional colonial whitewashed and ochre arches adorned with climbing vibrant bougainvillea flowers, an antique carved stone fountain with gently flowing water in the center of the tiled courtyard. Two visitors sitting peacefully on a dark carved wooden bench consulting a guidebook, enjoying the quiet cultural atmosphere, soft warm coastal afternoon daylight. 16:9 aspect ratio, crisp textures, natural greenery, photorealistic, no text, no logos, no watermarks.'
  }
];

const TARGET_DIRS = [
  path.join(ROOT, 'staging', 'editorial', 'TLB-001', 'images'),
  path.join(ROOT, 'imagenes_generadas'),
  path.join(ROOT, 'public', 'editorial')
];

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function run() {
  console.log('--- REEMPLAZANDO IMÁGENES CARICATURAS POR FOTOGRAFÍAS HIPERREALISTAS 35MM ---');

  for (const item of NEW_IMAGES) {
    console.log(`\nProcesando: ${item.baseName}...`);
    if (!fs.existsSync(item.source)) {
      throw new Error(`No se encontró el archivo de origen: ${item.source}`);
    }

    // 1. Guardar original JPG en staging
    const stagingOriginal = path.join(ROOT, 'staging', 'editorial', 'TLB-001', 'images', `${item.baseName}-original.jpg`);
    fs.copyFileSync(item.source, stagingOriginal);
    console.log(` -> Guardado original en: ${stagingOriginal}`);

    const imageInstance = sharp(item.source);
    const metadata = await imageInstance.metadata();

    // 2. Generar WebP 1440w (calidad 84)
    const buf1440 = await sharp(item.source)
      .resize({ width: 1440, height: 810, fit: 'cover', position: 'center' })
      .webp({ quality: 84 })
      .toBuffer();

    // 3. Generar WebP 768w (calidad 82)
    const buf768 = await sharp(item.source)
      .resize({ width: 768, height: 432, fit: 'cover', position: 'center' })
      .webp({ quality: 82 })
      .toBuffer();

    // 4. Generar WebP 480w (calidad 80)
    const buf480 = await sharp(item.source)
      .resize({ width: 480, height: 270, fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toBuffer();

    // Distribuir a los directorios objetivo
    for (const dir of TARGET_DIRS) {
      fs.writeFileSync(path.join(dir, `${item.baseName}.webp`), buf1440);
      fs.writeFileSync(path.join(dir, `${item.baseName}-768.webp`), buf768);
      fs.writeFileSync(path.join(dir, `${item.baseName}-480.webp`), buf480);
      console.log(` -> Actualizado ${item.baseName} (.webp, -768, -480) en: ${dir}`);
    }
  }

  // 5. Actualizar manifest.json de TLB-001
  const manifestPath = path.join(ROOT, 'staging', 'editorial', 'TLB-001', 'images', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    for (const entry of manifestData.manifest) {
      const match = NEW_IMAGES.find(x => x.baseName === entry.id);
      if (match) {
        entry.asset_type = 'fotografia_documental_ia';
        entry.prompt = match.prompt;
        entry.negative_prompt = 'Sin estilo de dibujo, caricatura, ilustración vectorial, texto incrustado, logos ni marcas de agua.';
        entry.visually_reviewed = true;
      }
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
    console.log(`\nManifest actualizado exitosamente en: ${manifestPath}`);
  }

  console.log('\n¡Proceso de reemplazo completado con éxito!');
}

run().catch(err => {
  console.error('Error durante la ejecución:', err);
  process.exit(1);
});
