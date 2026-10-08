import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { convertToWebp } from './convert-to-webp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

const MISSING_CATEGORIES = [
  {
    slug: 'alquiler_de_canchas',
    query: 'football',
    output: path.join(rootDir, 'public/images/categories/alquiler_de_canchas.webp')
  }
];

async function fetchAndConvert() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  for (const item of MISSING_CATEGORIES) {
    console.log(`\n🔍 Buscando imagen de alta resolución para "${item.slug}" (${item.query})...`);
    
    try {
      const searchUrl = `https://www.pexels.com/search/${encodeURIComponent(item.query)}/`;
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Extraer imágenes de Pexels
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
        console.warn(`⚠️ No se encontraron imágenes para ${item.slug} en Pexels.`);
        continue;
      }

      // Tomar la primera imagen y pedir resolución alta (1600x900)
      let highResUrl = photoUrls[0].split('?')[0] + '?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop';
      console.log(`📸 Descargando imagen de alta calidad: ${highResUrl}`);

      // Descargar imagen directamente en memoria con page.request
      const response = await page.request.get(highResUrl);
      const buffer = await response.body();
      
      const tempJpg = path.join(rootDir, `temp_${item.slug}.jpg`);
      fs.writeFileSync(tempJpg, buffer);

      // Convertir a WebP con nuestra función estándar (1376x768)
      await convertToWebp(tempJpg, item.output, 1376, 768, 0.85);

      // Limpiar archivo temporal
      if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);

      console.log(`🎉 [Listo] Categoría "${item.slug}" cuenta con su imagen WebP oficial.`);
    } catch (err) {
      console.error(`❌ Error procesando ${item.slug}:`, err.message);
    }
  }

  await browser.close();
}

fetchAndConvert().catch(console.error);
