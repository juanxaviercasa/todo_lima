import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const categoriesDir = path.join(rootDir, 'public', 'images', 'categories');

const TARGETS = [
  { slug: 'academias_de_artes_marciales', query: 'Martial arts dojo' },
  { slug: 'adiestramiento_canino', query: 'Dog training obedience' },
  { slug: 'hospedajes_para_mascotas', query: 'Pet boarding hotel' },
  { slug: 'guarderias_caninas', query: 'Dog daycare' },
  { slug: 'paseadores_de_perros', query: 'Dog walking park' },
  { slug: 'estudios_de_maquillaje', query: 'Makeup artist cosmetics' },
  { slug: 'academias_de_natacion', query: 'Indoor swimming pool' },
  { slug: 'estudios_de_yoga', query: 'Yoga studio class' },
  { slug: 'estudios_de_pilates', query: 'Pilates exercise machine' },
  { slug: 'reparacion_de_impresoras', query: 'Computer hardware technician repair' },
  { slug: 'refrigeracion_comercial', query: 'Commercial refrigeration equipment' },
  { slug: 'equipos_gastronomicos', query: 'Commercial restaurant kitchen' },
  { slug: 'courier_y_mensajeria', query: 'Motorcycle courier delivery' },
  { slug: 'academias_de_idiomas', query: 'Language school classroom' },
  { slug: 'academias_preuniversitarias', query: 'University lecture hall students' },
  { slug: 'clases_particulares', query: 'Tutoring student learning' },
  { slug: 'escuelas_de_danza', query: 'Dance studio rehearsal' },
  { slug: 'centros_de_depilacion', query: 'Cosmetology dermatology clinic' },
  { slug: 'estudios_de_tatuajes', query: 'Tattoo artist studio' },
  { slug: 'estudios_de_piercing', query: 'Body piercing studio' },
  { slug: 'manicure_y_pedicure', query: 'Manicure nail salon' }
];

async function fetchImageForQuery(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=5&prop=pageimages&piprop=original&format=json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TodoLimaBot/1.0 (https://todolima.com; contacto@todolima.com)' }
  });
  const data = await res.json();
  if (!data?.query?.pages) return null;

  const pages = Object.values(data.query.pages);
  for (const page of pages) {
    if (page.original?.source) {
      const src = page.original.source;
      const lower = src.toLowerCase();
      if (!lower.endsWith('.svg') && !lower.endsWith('.gif') && !lower.endsWith('.tif')) {
        return src;
      }
    }
  }
  return null;
}

async function main() {
  console.log(`🚀 Buscando imágenes para ${TARGETS.length} categorías...`);
  let successCount = 0;

  for (const item of TARGETS) {
    const destPath = path.join(categoriesDir, `${item.slug}.webp`);
    try {
      console.log(`\n🔍 Buscando para: ${item.slug} ("${item.query}")`);
      let imgUrl = await fetchImageForQuery(item.query);
      if (!imgUrl) {
        // Fallback a término simplificado
        const simpleTerm = item.query.split(' ')[0];
        console.log(`  Intentando término simplificado: "${simpleTerm}"`);
        imgUrl = await fetchImageForQuery(simpleTerm);
      }

      if (!imgUrl) {
        console.warn(`  ⚠️ No se encontró imagen para ${item.slug}`);
        continue;
      }

      console.log(`  📸 Descargando: ${imgUrl.slice(0, 75)}...`);
      const imgRes = await fetch(imgUrl, {
        headers: { 'User-Agent': 'TodoLimaBot/1.0 (https://todolima.com; contacto@todolima.com)' }
      });
      if (!imgRes.ok) {
        console.warn(`  ❌ Error HTTP ${imgRes.status}`);
        continue;
      }

      const buf = Buffer.from(await imgRes.arrayBuffer());
      await sharp(buf)
        .resize(1376, 768, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(destPath);

      console.log(`  ✅ Guardado en public/images/categories/${item.slug}.webp`);
      successCount++;
    } catch (err) {
      console.error(`  ❌ Error procesando ${item.slug}:`, err.message);
    }
  }

  console.log(`\n🎉 Finalizado: ${successCount} de ${TARGETS.length} imágenes procesadas con éxito.`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
