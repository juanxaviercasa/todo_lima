#!/usr/bin/env node

/**
 * GENERADOR DE PROTOTIPOS WEB EN VIVO — TODO LIMA
 * 
 * Uso:
 *   node auditor/generate-prototypes.js --rank 1
 *   node auditor/generate-prototypes.js --category agentes-inmobiliarios
 *   node auditor/generate-prototypes.js --list-ranking
 *   node auditor/generate-prototypes.js --top 5
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PURCHASING_POWER_RANKING, getCategoryRankInfo } from './config/purchasingPowerRanking.js';
import { extractDistrict, parsePhone } from './engine/districtExtractor.js';
import { generatePrototypeBlueprint } from './engine/prototypeGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const dataDir = path.join(rootDir, 'data');
const auditsDir = path.join(rootDir, 'audits');
const prototypesDir = path.join(auditsDir, 'prototypes');

const args = process.argv.slice(2);
function getArg(flag, alias) {
  const idx = args.findIndex(a => a === flag || a === alias);
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) {
    return args[idx + 1];
  }
  return null;
}
const hasFlag = (flag, alias) => args.includes(flag) || (alias && args.includes(alias));

if (hasFlag('--list-ranking') || hasFlag('-l')) {
  console.log(`\n======================================================`);
  console.log(`🏆 RANKING DE PODER ADQUISITIVO (38 CATEGORÍAS)`);
  console.log(`======================================================\n`);
  PURCHASING_POWER_RANKING.forEach(c => {
    console.log(
      `#${c.rank.toString().padStart(2, '0')} | ${c.slug.padEnd(25, ' ')} | Tier: ${c.tier.padEnd(16, ' ')} | Ticket Promedio: S/ ${c.avgTicketPEN.toLocaleString().padStart(6, ' ')} ($${c.avgTicketUSD} USD)`
    );
  });
  console.log(`\n======================================================\n`);
  process.exit(0);
}

const rankParam = getArg('--rank', '-r') ? parseInt(getArg('--rank', '-r'), 10) : null;
const categoryParam = getArg('--category', '-c');
const topParam = getArg('--top', '-t') ? parseInt(getArg('--top', '-t'), 10) : null;

// Determinar categorías a procesar
let categoriesToProcess = [];

if (rankParam) {
  const match = PURCHASING_POWER_RANKING.find(c => c.rank === rankParam);
  if (!match) {
    console.error(`❌ No existe categoría para el rango #${rankParam}`);
    process.exit(1);
  }
  categoriesToProcess = [match];
} else if (categoryParam) {
  const match = PURCHASING_POWER_RANKING.find(c => c.slug === categoryParam);
  if (!match) {
    categoriesToProcess = [{ rank: 99, slug: categoryParam, name: categoryParam, tier: 'TIER_CUSTOM', avgTicketPEN: 500, avgTicketUSD: 140 }];
  } else {
    categoriesToProcess = [match];
  }
} else if (topParam) {
  categoriesToProcess = PURCHASING_POWER_RANKING.slice(0, topParam);
} else {
  // Por defecto procesa el Rank #1 (la categoría de mayor poder adquisitivo)
  categoriesToProcess = [PURCHASING_POWER_RANKING[0]];
}

console.log(`\n======================================================`);
console.log(`⚡ GENERADOR DE PROTOTIPOS WEB EN VIVO (TODO LIMA)`);
console.log(`======================================================`);
console.log(`Categorías seleccionadas: ${categoriesToProcess.map(c => `#${c.rank} ${c.slug}`).join(', ')}\n`);

for (const catInfo of categoriesToProcess) {
  const slug = catInfo.slug;
  const filePath = path.join(dataDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Archivo data/${slug}.json no existe. Saltando.`);
    continue;
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const businesses = raw.businesses || [];

  // Filtrar los que NO tienen sitio web (o solo tienen redes)
  const leadsWithoutWeb = businesses.filter(b => {
    if (!b.website) return true;
    const clean = b.website.toLowerCase();
    return clean.includes('facebook.com') || clean.includes('instagram.com') || clean.includes('wa.me');
  });

  console.log(`📌 Procesando #${catInfo.rank} [${catInfo.name}]`);
  console.log(`   Total negocios: ${businesses.length} | Sin sitio web propio: ${leadsWithoutWeb.length}`);
  console.log(`   Ticket promedio estimado: S/ ${catInfo.avgTicketPEN.toLocaleString()} ($${catInfo.avgTicketUSD} USD)\n`);

  const catPrototypesDir = path.join(prototypesDir, slug);
  if (!fs.existsSync(catPrototypesDir)) {
    fs.mkdirSync(catPrototypesDir, { recursive: true });
  }

  const generatedPrototypes = [];

  for (const biz of leadsWithoutWeb) {
    const district = extractDistrict(biz.address);
    const phoneData = parsePhone(biz.phone);
    const blueprint = generatePrototypeBlueprint(biz, slug, district, phoneData);

    // Guardar blueprint en JSON
    const blueprintFile = path.join(catPrototypesDir, `${biz.id}.json`);
    fs.writeFileSync(blueprintFile, JSON.stringify(blueprint, null, 2), 'utf-8');

    // Enlace demo en vivo en Next.js
    const demoUrl = `http://localhost:3000/demo/${slug}/${biz.id}`;
    const prodDemoUrl = `https://todolima.com/demo/${slug}/${biz.id}`;

    // Actualizar pitch persuasivo con el enlace en vivo del prototipo
    const pitchWithDemo = `Hola equipo de *${blueprint.name}* 👋, los saluda el equipo de *Todo Lima*.

Vimos que son uno de los referentes con mejor reputación en Google Maps en *${district}* (⭐ *${blueprint.rating}* estrellas).

Al ver que aún no cuentan con una página web oficial con catálogo y reserva directa, *nuestro equipo les diseñó un prototipo web exclusivo en vivo*, listo para conectar a su WhatsApp:

🔗 Ver prototipo en vivo aquí:
👉 *${prodDemoUrl}*

✅ Carga en menos de 1 segundo en celulares
✅ Botón de WhatsApp directo con mensaje precargado
✅ Subdominio verificado: *${blueprint.suggestedSubdomain}*
✅ Catálogo de servicios optimizado para clientes de ${district}

¿Pudieron abrir el enlace? Nos encantaría saber si les gustaría activar este modelo para su negocio esta semana. 🚀`;

    const encodedPitch = encodeURIComponent(pitchWithDemo);
    const waDemoUrl = phoneData.isMobile && phoneData.international
      ? `https://wa.me/${phoneData.international}?text=${encodedPitch}`
      : null;

    generatedPrototypes.push({
      id: biz.id,
      name: biz.name,
      district,
      rating: biz.rating,
      reviewsCount: biz.reviewsCount,
      phone: phoneData.raw,
      isMobile: phoneData.isMobile,
      subdomain: blueprint.suggestedSubdomain,
      demoUrlLocal: demoUrl,
      demoUrlProd: prodDemoUrl,
      waDemoUrl,
      pitchWithDemo,
      zipwpPrompt: blueprint.zipwpPrompt,
      zipwpLength: blueprint.zipwpLength
    });
  }

  // Guardar resumen de la categoría
  const summaryCatPath = path.join(catPrototypesDir, `_resumen.json`);
  fs.writeFileSync(summaryCatPath, JSON.stringify({
    category: slug,
    rank: catInfo.rank,
    tier: catInfo.tier,
    avgTicketPEN: catInfo.avgTicketPEN,
    totalPrototypes: generatedPrototypes.length,
    withMobile: generatedPrototypes.filter(p => p.isMobile).length,
    prototypes: generatedPrototypes
  }, null, 2), 'utf-8');

  console.log(`✅ [${slug}] ¡${generatedPrototypes.length} prototipos generados con éxito!`);
  console.log(`   Prototipos guardados en: audits/prototypes/${slug}/`);
  console.log(`   Pruébalos en vivo en: http://localhost:3000/demo/${slug}/biz_1\n`);
}

console.log(`======================================================`);
console.log(`🚀 PROCESO COMPLETADO EXITOSAMENTE`);
console.log(`======================================================\n`);
