import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../scraper/config/categories.js';
import { mapsIdentity } from '../lib/directoryReconciliation.js';
import { resolveDistrict } from '../lib/districts.js';
import { districtFromCoords } from '../lib/districtGeo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

function cleanField(text) {
  if (!text) return '';
  return text.replace(/[\uE000-\uF8FF]/g, '').replace(/^[\s\n\r]+|[\s\n\r]+$/g, '').trim();
}

const SECTOR_DISTRICTS = [
  'Miraflores San Isidro',
  'Santiago de Surco San Borja',
  'Cercado de Lima Breña',
  'Jesús María Lince Pueblo Libre',
  'Los Olivos San Martin de Porres',
  'Barranco Chorrillos Surquillo',
  'San Juan de Lurigancho Ate',
  'La Molina Magdalena del Mar'
];

const CUSTOM_BASE_QUERIES = {
  'veterinarias': 'veterinarias',
  'tiendas-de-mascotas': 'tiendas de mascotas pet shop',
  'hospedajes-para-mascotas': 'hospedaje para mascotas hotel canino',
  'guarderias-caninas': 'guarderia canina',
  'adiestramiento-canino': 'adiestramiento canino entrenamiento perros',
  'paseadores-de-perros': 'paseadores de perros',
  'electricistas': 'electricistas',
  'empresas-de-limpieza': 'empresas de limpieza',
  'limpieza-de-muebles': 'lavado de muebles y tapices',
  'desatoros': 'desatoros y gasfiteria',
  'limpieza-de-cisternas': 'limpieza de cisternas',
  'impermeabilizacion': 'impermeabilizacion de techos',
  'reparacion-de-calzado': 'reparacion de calzado renovadora',
  'sastrerias': 'sastrerias arreglos de ropa',
  'reparacion-de-bicicletas': 'taller de bicicletas reparacion',
  'albanileria-y-remodelaciones': 'albanileria remodelaciones construccion',
  'diseno-de-interiores': 'diseno de interiores',
  'estructuras-metalicas': 'estructuras metalicas carpinteria metalica',
  'jardineria': 'servicios de jardineria',
  'fumigacion': 'fumigacion y control de plagas',
  'talleres-mecanicos': 'taller mecanico automotriz',
  'car-wash': 'car wash lavado de autos',
  'auxilio-mecanico': 'auxilio mecanico gruas'
};

export async function expandCategory(browser, slug, targetTotal = 100) {
  const catConfig = CATEGORIES.find(c => c.slug === slug);
  const baseKeyword = CUSTOM_BASE_QUERIES[slug] || (catConfig ? catConfig.query.replace(/\ben Lima\b/gi, '') : slug.replace(/-/g, ' '));
  const baseQuery = `${baseKeyword.trim()} en Lima`;
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  let existingBusinesses = [];
  let searchQuery = baseQuery;

  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      existingBusinesses = Array.isArray(data.businesses) ? data.businesses : [];
      if (data.searchQuery) searchQuery = data.searchQuery;
    } catch {}
  }

  const seenIdentities = new Set();
  const seenUrls = new Set();
  for (const b of existingBusinesses) {
    const id = mapsIdentity(b.url);
    if (id) seenIdentities.add(id);
    if (b.url) seenUrls.add(b.url.split('?')[0]);
  }

  console.log(`\n======================================================`);
  console.log(`🚀 Expandiendo [${slug}]: Actual: ${existingBusinesses.length} -> Meta: ${targetTotal}`);
  console.log(`======================================================`);

  if (existingBusinesses.length >= targetTotal) {
    console.log(`✅ [${slug}] ya tiene ${existingBusinesses.length} negocios. Saltando.`);
    return existingBusinesses.length;
  }

  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    locale: 'es-PE',
    timezoneId: 'America/Lima',
  });

  const page = await context.newPage();
  const candidateUrls = new Set();

  const cleanBase = baseQuery.replace(/\ben Lima\b/gi, '').replace(/\s+/g, ' ').trim();
  const queries = [
    baseQuery,
    ...SECTOR_DISTRICTS.map(sector => `${cleanBase} en ${sector} Lima`)
  ];

  for (const q of queries) {
    if (existingBusinesses.length + candidateUrls.size >= targetTotal + 35) break;
    console.log(`🔍 Buscando: "${q}"...`);

    try {
      await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(q)}?hl=es`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);

      try {
        const acceptBtn = page.locator('button:has-text("Aceptar todo"), button:has-text("Aceptar")').first();
        if (await acceptBtn.isVisible({ timeout: 1500 })) await acceptBtn.click();
      } catch {}

      if (page.url().includes('/maps/place/')) {
        const cleanU = page.url().split('?')[0];
        if (!seenUrls.has(cleanU)) candidateUrls.add(cleanU);
        continue;
      }

      await page.waitForSelector('div[role="feed"], a[href*="/maps/place/"]', { timeout: 8000 }).catch(() => {});

      for (let s = 1; s <= 6; s++) {
        const links = await page.$$eval('a[href*="/maps/place/"]', els => els.map(a => a.href));
        for (const l of links) {
          const cleanU = l.split('?')[0];
          if (!seenUrls.has(cleanU)) candidateUrls.add(cleanU);
        }

        const scrolled = await page.evaluate(() => {
          const feed = document.querySelector('div[role="feed"]');
          if (feed) {
            feed.scrollBy(0, 1500);
            return true;
          }
          return false;
        });

        if (!scrolled) await page.mouse.wheel(0, 1500);
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.warn(`   ⚠️ Error en búsqueda "${q}":`, e.message);
    }
  }

  await page.close();
  console.log(`📋 Candidatos nuevos únicos encontrados: ${candidateUrls.size}`);

  const candidates = Array.from(candidateUrls);
  const newlyVerified = [];
  const detailPage = await context.newPage();

  for (let i = 0; i < candidates.length && (existingBusinesses.length + newlyVerified.length) < targetTotal; i++) {
    const rawUrl = candidates[i];
    try {
      await detailPage.goto(`${rawUrl}?hl=es`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await detailPage.waitForSelector('h1', { timeout: 7000 });

      const currentUrl = detailPage.url();
      const identity = mapsIdentity(currentUrl);
      if (!identity || seenIdentities.has(identity)) continue;

      const raw = await detailPage.evaluate(() => {
        const h1 = document.querySelector('h1');
        const name = h1 ? h1.innerText.trim() : '';

        let rating = null;
        const starEl = document.querySelector('span[aria-label*="estrellas"]');
        const ratingEl = document.querySelector('div.fontDisplayLarge, span[aria-hidden="true"]');
        if (starEl) {
          const match = starEl.getAttribute('aria-label')?.match(/([\d,.]+)/);
          if (match) rating = parseFloat(match[1].replace(',', '.'));
        } else if (ratingEl && /^[\d,.]+$/.test(ratingEl.innerText.trim())) {
          rating = parseFloat(ratingEl.innerText.trim().replace(',', '.'));
        }

        let reviewsCount = null;
        const reviewsEls = [...document.querySelectorAll('button[aria-label*="reseña"], span[aria-label*="reseña"]')];
        for (const el of reviewsEls) {
          const label = el.getAttribute('aria-label') || '';
          const match = label.match(/([\d.,]+)\s*reseña/i);
          if (match) {
            const parsed = parseInt(match[1].replace(/[.,]/g, ''), 10);
            if (Number.isFinite(parsed)) {
              reviewsCount = parsed;
              break;
            }
          }
        }
        if (!reviewsCount) {
          const bodyMatches = document.body.innerText.match(/\(([\d.,]+)\s*(?:reseñas|reviews)?\)/i);
          if (bodyMatches) {
            reviewsCount = parseInt(bodyMatches[1].replace(/[.,]/g, ''), 10);
          }
        }

        let address = '';
        const addressBtn = document.querySelector('button[data-item-id="address"], [data-tooltip="Copiar la dirección"]');
        if (addressBtn) address = addressBtn.innerText;

        let phone = '';
        const phoneButtons = [...document.querySelectorAll('button[data-item-id^="phone:"], a[href^="tel:"], [data-tooltip="Copiar el número de teléfono"], [aria-label*="Teléfono"], [aria-label*="teléfono"]')];
        const phoneValues = phoneButtons.flatMap(b => [
          b.getAttribute('data-item-id')?.replace(/^phone:/, ''),
          b.getAttribute('href')?.replace(/^tel:/, ''),
          b.getAttribute('aria-label'),
          b.innerText
        ]).filter(v => v && /\d{6,}/.test(v));
        phone = phoneValues[0] || '';

        let website = '';
        const websiteBtn = document.querySelector('a[data-item-id="authority"]');
        if (websiteBtn && websiteBtn.href) website = websiteBtn.href;

        let category = '';
        const catBtn = document.querySelector('button[jsaction*="category"]');
        if (catBtn) category = catBtn.innerText.trim();

        return { name, rating, reviewsCount, category, address, phone, website };
      });

      let latitude = null;
      let longitude = null;
      const coordsMatch = currentUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordsMatch) {
        latitude = parseFloat(coordsMatch[1]);
        longitude = parseFloat(coordsMatch[2]);
      }

      const cleanName = cleanField(raw.name);
      const cleanAddress = cleanField(raw.address);
      const cleanPhone = cleanField(raw.phone);

      if (!cleanName || cleanName.length < 3) continue;
      if (!cleanAddress || cleanAddress === 'Lima, Perú') continue;

      const district = resolveDistrict({ address: cleanAddress, latitude, longitude }, districtFromCoords);
      if (!district || district === 'Lima') continue;

      seenIdentities.add(identity);
      seenUrls.add(currentUrl.split('?')[0]);

      const bizRecord = {
        name: cleanName,
        rating: raw.rating || null,
        reviewsCount: raw.reviewsCount || null,
        category: raw.category || slug,
        address: cleanAddress,
        phone: cleanPhone ? (cleanPhone.startsWith('tel:') ? cleanPhone : `tel:${cleanPhone.replace(/[\s\-\(\)]/g, '')}`) : null,
        website: raw.website || null,
        url: currentUrl,
        latitude,
        longitude
      };

      newlyVerified.push(bizRecord);
      const currentTotal = existingBusinesses.length + newlyVerified.length;
      if (currentTotal % 10 === 0 || currentTotal === targetTotal) {
        console.log(`   📈 [${currentTotal}/${targetTotal}] ${bizRecord.name} (${district}) - ⭐ ${bizRecord.rating ?? '-'} (${bizRecord.reviewsCount ?? 0})`);
      }
    } catch (err) {
      // ignore
    }
  }

  await detailPage.close();
  await context.close();

  const allCombined = [...existingBusinesses, ...newlyVerified];
  console.log(`\n🎉 [${slug}] Consolidado: ${allCombined.length} negocios (${existingBusinesses.length} previas + ${newlyVerified.length} nuevas)`);

  const payload = {
    category: slug,
    searchQuery,
    totalResults: allCombined.length,
    updatedAt: new Date().toISOString(),
    businesses: allCombined.map((b, idx) => ({ ...b, id: `biz_${idx + 1}` }))
  };

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  return allCombined.length;
}

export async function expandBatch(slugs, targetTotal = 100) {
  console.log(`\n======================================================`);
  console.log(`🔥 INICIANDO EXPANSIÓN DE LOTE: ${slugs.length} categorías (Meta: ${targetTotal} c/u)`);
  console.log(`======================================================`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--lang=es-PE,es']
  });

  const summary = {};
  for (const slug of slugs) {
    const finalCount = await expandCategory(browser, slug, targetTotal);
    summary[slug] = finalCount;
  }

  await browser.close();

  console.log('\n======================================================');
  console.log('📊 RESUMEN FINAL DE EXPANSIÓN:');
  console.table(summary);
  console.log('======================================================');
  return summary;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const targetArg = args.find(a => a.startsWith('--target='));
  const target = targetArg ? parseInt(targetArg.split('=')[1], 10) : 100;
  const slugs = args.filter(a => !a.startsWith('--'));

  if (slugs.length === 0) {
    console.error('Uso: node scripts/expand-batch.mjs [--target=100] slug-1 slug-2 ...');
    process.exit(1);
  }

  expandBatch(slugs, target).catch(err => {
    console.error('Fatal error in expandBatch:', err);
    process.exit(1);
  });
}
