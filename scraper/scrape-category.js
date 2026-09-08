import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Limpia caracteres especiales o iconos unicode que Google Maps inyecta en los botones
 */
function cleanField(text) {
  if (!text) return '';
  // Elimina caracteres del rango Private Use Area (íconos de Google Maps) y saltos iniciales/finales
  return text.replace(/[\uE000-\uF8FF]/g, '').replace(/^[\s\n\r]+|[\s\n\r]+$/g, '').trim();
}

/**
 * Scraper especializado en Google Maps para directorios locales
 * @param {string} query Término de búsqueda (ej. "doctores en Lima")
 * @param {string} slug Identificador de categoría para el archivo JSON (ej. "doctores")
 * @param {number} maxResults Cantidad de resultados deseados (por defecto 10)
 */
export async function scrapeCategory(query = 'doctores en Lima', slug = 'doctores', maxResults = 10) {
  console.log(`\n==============================================`);
  console.log(`🚀 Iniciando extracción para: "${query}"`);
  console.log(`📁 Archivo destino: data/${slug}.json`);
  console.log(`🎯 Meta: Top ${maxResults} negocios mejor calificados`);
  console.log(`==============================================\n`);

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--lang=es-PE,es'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'es-PE',
    timezoneId: 'America/Lima',
  });

  const page = await context.newPage();

  try {
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}?hl=es`;
    console.log(`🌐 Navegando a: ${searchUrl}`);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

    // 1. Manejo de cookies / Consentimiento de Google si aparece
    try {
      const consentButtons = [
        'button:has-text("Aceptar todo")',
        'button:has-text("Rechazar todo")',
        'button:has-text("Acepto")',
        'form[action*="consent"] button'
      ];
      for (const btnSelector of consentButtons) {
        const btn = page.locator(btnSelector).first();
        if (await btn.isVisible({ timeout: 2000 })) {
          console.log(`🍪 Diálogo de consentimiento detectado. Aceptando...`);
          await btn.click();
          await page.waitForTimeout(2000);
          break;
        }
      }
    } catch {
      // Continuar si no se requiere consentimiento
    }

    // 2. Esperar contenedor de resultados (feed)
    console.log('⏳ Esperando lista de resultados...');
    const feedSelector = 'div[role="feed"]';
    
    try {
      await page.waitForSelector(feedSelector, { timeout: 20000 });
    } catch {
      console.warn('⚠️ No se encontró feed directo.');
    }

    // 3. Scroll progresivo para recolectar al menos maxResults enlaces a fichas
    console.log(`📜 Scrolleando feed para cargar al menos ${maxResults} resultados...`);
    const placeUrls = new Set();
    let scrollAttempts = 0;
    const maxScrollAttempts = 15;

    while (placeUrls.size < maxResults && scrollAttempts < maxScrollAttempts) {
      scrollAttempts++;
      
      const urls = await page.$$eval('a[href*="/maps/place/"]', links => 
        links.map(l => l.href).filter(href => href.includes('/maps/place/'))
      );

      for (const u of urls) {
        const cleanUrl = u.split('?')[0];
        placeUrls.add(cleanUrl);
      }

      console.log(`   [Scroll ${scrollAttempts}] Enlaces encontrados: ${placeUrls.size}/${maxResults}`);

      if (placeUrls.size >= maxResults) break;

      const scrolled = await page.evaluate(() => {
        const feed = document.querySelector('div[role="feed"]');
        if (feed) {
          feed.scrollBy(0, 1000);
          return true;
        }
        return false;
      });

      if (!scrolled) {
        await page.mouse.wheel(0, 1000);
      }
      await page.waitForTimeout(1500);
    }

    const targetUrls = Array.from(placeUrls).slice(0, maxResults);
    console.log(`\n🔍 Extrayendo datos limpios de ${targetUrls.length} negocios...`);

    // 4. Extracción individual de cada ficha
    const detailPage = await context.newPage();
    const results = [];

    for (let i = 0; i < targetUrls.length; i++) {
      const url = targetUrls[i];
      console.log(`\n[${i + 1}/${targetUrls.length}] Procesando ficha...`);

      try {
        await detailPage.goto(`${url}?hl=es`, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await detailPage.waitForSelector('h1', { timeout: 10000 });

        const rawData = await detailPage.evaluate(() => {
          // Nombre
          const h1 = document.querySelector('h1');
          const name = h1 ? h1.innerText.trim() : '';

          // Rating
          let rating = null;
          const ratingEl = document.querySelector('div.fontDisplayLarge, span[aria-hidden="true"]');
          const starEl = document.querySelector('span[aria-label*="estrellas"]');
          if (starEl) {
            const match = starEl.getAttribute('aria-label')?.match(/([\d,\.]+)/);
            if (match) rating = parseFloat(match[1].replace(',', '.'));
          } else if (ratingEl && /^[\d,\.]+$/.test(ratingEl.innerText.trim())) {
            rating = parseFloat(ratingEl.innerText.trim().replace(',', '.'));
          }

          // Reseñas
          let reviewsCount = null;
          const reviewsEl = document.querySelector('button[aria-label*="reseñas"], span[aria-label*="reseñas"]');
          if (reviewsEl) {
            const match = reviewsEl.getAttribute('aria-label')?.replace(/[^0-9]/g, '');
            if (match) reviewsCount = parseInt(match, 10);
          }
          if (!reviewsCount) {
            const bodyMatches = document.body.innerText.match(/\(([\d\.\,]+)\s*(?:reseñas|reviews)?\)/i);
            if (bodyMatches) {
              reviewsCount = parseInt(bodyMatches[1].replace(/[\.\,]/g, ''), 10);
            }
          }

          // Dirección
          let address = '';
          const addressBtn = document.querySelector('button[data-item-id="address"], [data-tooltip="Copiar la dirección"]');
          if (addressBtn) {
            address = addressBtn.innerText;
          }

          // Teléfono
          let phone = '';
          const phoneBtn = document.querySelector('button[data-item-id^="phone:"], [data-tooltip="Copiar el número de teléfono"]');
          if (phoneBtn) {
            phone = phoneBtn.innerText;
          }

          // Sitio Web
          let website = '';
          const websiteBtn = document.querySelector('a[data-item-id="authority"]');
          if (websiteBtn && websiteBtn.href) {
            website = websiteBtn.href;
          }

          // Categoría primaria de Google Maps
          let category = '';
          const catBtn = document.querySelector('button[jsaction*="category"]');
          if (catBtn) {
            category = catBtn.innerText.trim();
          }

          return {
            name,
            rating,
            reviewsCount,
            category,
            address,
            phone,
            website
          };
        });

        // Extraer coordenadas latitud / longitud
        const currentUrl = detailPage.url();
        let latitude = null;
        let longitude = null;

        const coordsMatch = currentUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (coordsMatch) {
          latitude = parseFloat(coordsMatch[1]);
          longitude = parseFloat(coordsMatch[2]);
        }

        const cleanAddress = cleanField(rawData.address);
        const cleanPhone = cleanField(rawData.phone);

        const businessRecord = {
          id: `biz_${i + 1}`,
          name: rawData.name || 'Sin nombre',
          rating: rawData.rating,
          reviewsCount: rawData.reviewsCount,
          category: rawData.category || slug,
          address: cleanAddress || 'Lima, Perú',
          phone: cleanPhone || null,
          website: rawData.website || null,
          url: currentUrl,
          latitude,
          longitude
        };

        console.log(`   ✅ ${businessRecord.name}`);
        console.log(`      ⭐ ${businessRecord.rating ?? 'N/A'} (${businessRecord.reviewsCount ?? 0} rev) | 📞 ${businessRecord.phone || 'Sin tel.'} | 📍 ${businessRecord.address}`);
        results.push(businessRecord);

        await detailPage.waitForTimeout(800);
      } catch (err) {
        console.warn(`   ⚠️ Error extrayendo ficha ${url}:`, err.message);
      }
    }

    await detailPage.close();

    // 5. Ordenar por mejor puntuación ponderada
    results.sort((a, b) => {
      const scoreA = (a.rating || 0) * 1000 + (a.reviewsCount || 0);
      const scoreB = (b.rating || 0) * 1000 + (b.reviewsCount || 0);
      return scoreB - scoreA;
    });

    // 6. Formatear y guardar el archivo JSON
    const dataDir = path.resolve(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputFilePath = path.join(dataDir, `${slug}.json`);
    const outputPayload = {
      category: slug,
      searchQuery: query,
      totalResults: results.length,
      updatedAt: new Date().toISOString(),
      businesses: results
    };

    fs.writeFileSync(outputFilePath, JSON.stringify(outputPayload, null, 2), 'utf-8');
    console.log(`\n🎉 Datos guardados exitosamente en: ${outputFilePath}`);
    console.log(`📊 Total estructurados: ${results.length} registros`);

    return outputPayload;

  } catch (error) {
    console.error('❌ Error general durante el scraping:', error);
    throw error;
  } finally {
    await browser.close();
    console.log('🔒 Navegador cerrado.\n');
  }
}

// Ejecución directa desde CLI
const isDirectExecution = process.argv[1] && process.argv[1].endsWith('scrape-category.js');

if (isDirectExecution) {
  const queryArg = process.argv[2] || 'doctores en Lima';
  const slugArg = process.argv[3] || 'doctores';
  const maxResultsArg = parseInt(process.argv[4] || '10', 10);

  scrapeCategory(queryArg, slugArg, maxResultsArg)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
