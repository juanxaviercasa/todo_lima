import { chromium } from 'playwright';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const categoriesDir = path.join(rootDir, 'public', 'images', 'categories');

const CATEGORY_SEARCHES = [
  { slug: 'adiestramiento_canino', query: 'dog training' },
  { slug: 'hospedajes_para_mascotas', query: 'dog hotel' },
  { slug: 'guarderias_caninas', query: 'dog daycare' },
  { slug: 'paseadores_de_perros', query: 'dog walker' },
  { slug: 'estudios_de_maquillaje', query: 'makeup artist' },
  { slug: 'academias_de_natacion', query: 'swimming pool' },
  { slug: 'estudios_de_yoga', query: 'yoga studio' },
  { slug: 'estudios_de_pilates', query: 'pilates reformer' },
  { slug: 'reparacion_de_impresoras', query: 'computer repair' },
  { slug: 'refrigeracion_comercial', query: 'industrial refrigerator' },
  { slug: 'equipos_gastronomicos', query: 'commercial kitchen' },
  { slug: 'courier_y_mensajeria', query: 'courier delivery' },
  { slug: 'academias_de_idiomas', query: 'language class' },
  { slug: 'academias_preuniversitarias', query: 'study classroom' },
  { slug: 'clases_particulares', query: 'tutor student' },
  { slug: 'escuelas_de_danza', query: 'dance studio' },
  { slug: 'centros_de_depilacion', query: 'laser clinic' },
  { slug: 'estudios_de_tatuajes', query: 'tattoo studio' },
  { slug: 'estudios_de_piercing', query: 'piercing jewelry' },
  { slug: 'manicure_y_pedicure', query: 'manicure nails' }
];

async function main() {
  console.log(`🚀 Iniciando búsqueda de ${CATEGORY_SEARCHES.length} categorías con queries concisas...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  let completed = 0;

  for (let i = 0; i < CATEGORY_SEARCHES.length; i++) {
    const item = CATEGORY_SEARCHES[i];
    const destPath = path.join(categoriesDir, `${item.slug}.webp`);
    console.log(`\n🔍 [${i + 1}/${CATEGORY_SEARCHES.length}] "${item.slug}" (query: "${item.query}")...`);

    try {
      const searchUrl = `https://www.pexels.com/search/${encodeURIComponent(item.query)}/`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);

      const photoUrls = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('article img, [data-testid="item"] img, img[src*="images.pexels.com"], img[srcset*="images.pexels.com"]'));
        return imgs
          .map(img => {
            if (img.src && img.src.includes('images.pexels.com/photos/')) return img.src;
            const srcset = img.getAttribute('srcset');
            if (srcset && srcset.includes('images.pexels.com/photos/')) {
              return srcset.split(',')[0].trim().split(' ')[0];
            }
            return null;
          })
          .filter(src => src && !src.includes('profile') && !src.includes('user'));
      });

      if (!photoUrls.length) {
        console.warn(`  ⚠️ Sin resultados en Pexels para "${item.query}".`);
        continue;
      }

      // Tomamos la primera o segunda foto horizontal
      const cleanUrl = photoUrls[0].split('?')[0];
      const highResUrl = `${cleanUrl}?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop`;
      console.log(`  📸 Descargando: ${highResUrl.slice(0, 65)}...`);

      const response = await page.request.get(highResUrl);
      if (response.ok()) {
        const imageBuffer = await response.body();
        await sharp(imageBuffer)
          .resize(1376, 768, { fit: 'cover', position: 'center' })
          .webp({ quality: 85 })
          .toFile(destPath);
        console.log(`  ✅ Guardado en public/images/categories/${item.slug}.webp`);
        completed++;
      } else {
        console.warn(`  ❌ Error HTTP ${response.status()}`);
      }
    } catch (err) {
      console.error(`  ❌ Error:`, err.message);
    }
  }

  await browser.close();
  console.log(`\n🎉 Descarga completada: ${completed} de ${CATEGORY_SEARCHES.length} procesadas con éxito.`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
