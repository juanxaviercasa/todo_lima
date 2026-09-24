#!/usr/bin/env node

/**
 * ORQUESTADOR MAESTRO DE AUDITORÍA COMERCIAL Y PROPUESTAS — TODO LIMA
 * 
 * Uso:
 *   node auditor/run-audit.js --all
 *   node auditor/run-audit.js --category dentistas
 *   node auditor/run-audit.js --all --skip-http
 *   node auditor/run-audit.js --category cerrajeros --limit 10
 *   node auditor/run-audit.js --all --html --leads
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractDistrict, parsePhone } from './engine/districtExtractor.js';
import { auditWebsite, categorizeWebsite } from './engine/webAuditor.js';
import { generateProposal } from './engine/proposalGenerator.js';
import { generateHtmlReport } from './reports/htmlReportGenerator.js';
import { generateMarkdownSummary } from './reports/markdownSummary.js';
import { syncWithGit } from '../scraper/utils/gitSync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const dataDir = path.join(rootDir, 'data');
const auditsDir = path.join(rootDir, 'audits');

// Parsear argumentos de línea de comandos
const args = process.argv.slice(2);
function getArg(flag, alias) {
  const idx = args.findIndex(a => a === flag || a === alias);
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) {
    return args[idx + 1];
  }
  return null;
}
const hasFlag = (flag, alias) => args.includes(flag) || (alias && args.includes(alias));

const targetCategory = getArg('--category', '-c');
const limitParam = getArg('--limit', '-l') ? parseInt(getArg('--limit', '-l'), 10) : null;
const concurrency = getArg('--concurrency') ? parseInt(getArg('--concurrency'), 10) : 8;
const timeoutMs = getArg('--timeout') ? parseInt(getArg('--timeout'), 10) : 6000;
const skipHttp = hasFlag('--skip-http', '-s');
const shouldGenerateHtml = hasFlag('--html') || true; // Generar siempre por defecto para máxima utilidad
const shouldExportLeads = hasFlag('--leads') || true;
const shouldSyncGit = hasFlag('--sync');

/**
 * Pool concurrente para limitar peticiones HTTP en paralelo
 */
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = new Set();
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    if (executing.size >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

/**
 * Audita una categoría específica
 */
async function auditCategory(slug) {
  const filePath = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [Auditor] Archivo data/${slug}.json no encontrado.`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  let categoryData;
  try {
    categoryData = JSON.parse(raw);
  } catch (e) {
    console.error(`❌ [Auditor] Error al parsear JSON en ${slug}:`, e.message);
    return null;
  }

  let businesses = categoryData.businesses || [];
  if (limitParam && limitParam > 0) {
    businesses = businesses.slice(0, limitParam);
  }

  console.log(`\n🔍 [Auditor] Analizando categoría "${slug}" (${businesses.length} negocios)...`);

  // Procesar cada negocio
  const auditedBusinesses = await asyncPool(concurrency, businesses, async (biz) => {
    const district = extractDistrict(biz.address);
    const phoneData = parsePhone(biz.phone);

    let webAudit;
    const catResult = categorizeWebsite(biz.website);

    if (skipHttp || catResult.type === 'NO_WEBSITE' || catResult.type === 'INVALID_URL' || catResult.type === 'SOCIAL_ONLY') {
      webAudit = {
        tested: false,
        url: catResult.cleanUrl,
        type: catResult.type,
        provider: catResult.provider,
        score: catResult.type === 'SOCIAL_ONLY' ? 25 : 0,
        accessible: catResult.type === 'SOCIAL_ONLY',
        issues: catResult.type === 'NO_WEBSITE' 
          ? ['No cuenta con un sitio web oficial registrado.'] 
          : catResult.type === 'SOCIAL_ONLY'
          ? [`Utiliza solo perfil de ${catResult.provider}. Pierde posicionamiento orgánico en Google.`]
          : ['URL inválida o no registrada.'],
        recommendations: [
          'Crear una landing page móvil de alta velocidad con botón directo a WhatsApp y catálogo.'
        ]
      };
    } else {
      // Realizar auditoría técnica HTTP en vivo
      try {
        process.stdout.write(`🌐`);
        webAudit = await auditWebsite(biz.website, timeoutMs);
      } catch (err) {
        webAudit = {
          tested: false,
          url: biz.website,
          type: 'CUSTOM_WEBSITE',
          score: 10,
          accessible: false,
          issues: [`Error en conexión web: ${err.message}`],
          recommendations: ['Restaurar y migrar el sitio a Next.js ultrarrápido.']
        };
      }
    }

    const proposal = generateProposal(biz, slug, district, phoneData, webAudit);

    return {
      id: biz.id,
      name: biz.name,
      rating: biz.rating,
      reviewsCount: biz.reviewsCount,
      address: biz.address,
      district,
      phoneData,
      categorySlug: slug,
      categoryName: biz.category || slug,
      webAudit,
      proposal,
      mapsUrl: biz.url
    };
  });

  // Estadísticas de la categoría
  const total = auditedBusinesses.length;
  const noWeb = auditedBusinesses.filter(b => b.webAudit.type === 'NO_WEBSITE' || b.webAudit.type === 'INVALID_URL').length;
  const socialOnly = auditedBusinesses.filter(b => b.webAudit.type === 'SOCIAL_ONLY').length;
  const withWeb = auditedBusinesses.filter(b => b.webAudit.type === 'CUSTOM_WEBSITE' || b.webAudit.type === 'FREE_PLATFORM').length;
  const withMobile = auditedBusinesses.filter(b => b.phoneData.isMobile).length;
  
  const testedWebs = auditedBusinesses.filter(b => b.webAudit.tested);
  const avgScore = testedWebs.length ? Math.round(testedWebs.reduce((a, b) => a + b.webAudit.score, 0) / testedWebs.length) : 0;

  const categoryResult = {
    slug,
    total,
    noWebsite: noWeb,
    noWebsitePct: total ? Math.round((noWeb / total) * 100) : 0,
    socialOnly,
    withWeb,
    withMobile,
    avgScore,
    businesses: auditedBusinesses
  };

  // Guardar archivo granular de auditoría de la categoría
  const catAuditsDir = path.join(auditsDir, 'categories');
  if (!fs.existsSync(catAuditsDir)) {
    fs.mkdirSync(catAuditsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(catAuditsDir, `${slug}.json`), JSON.stringify(categoryResult, null, 2), 'utf-8');

  console.log(`\n  ✅ [${slug}] Completado: ${total} negocios | ${noWeb} sin web | ${withMobile} con WhatsApp móvil | Score promedio: ${avgScore}/100`);

  return categoryResult;
}

/**
 * Función Principal
 */
async function main() {
  console.log(`\n======================================================`);
  console.log(`🚀 INICIANDO AUDITORÍA COMERCIAL & GENERADOR DE PROPUESTAS`);
  console.log(`   todolima.com — 38 Categorías de Lima Metropolitana`);
  console.log(`======================================================\n`);

  if (!fs.existsSync(auditsDir)) {
    fs.mkdirSync(auditsDir, { recursive: true });
  }

  // Identificar qué categorías procesar
  let categoriesToAudit = [];
  if (targetCategory) {
    categoriesToAudit = [targetCategory];
  } else {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    categoriesToAudit = files.map(f => f.replace('.json', ''));
  }

  console.log(`📋 Total categorías a procesar: ${categoriesToAudit.length}`);
  console.log(`⚙️ Modo HTTP: ${skipHttp ? 'OFF (Análisis instantáneo sin red)' : 'ON (Sondeo técnico en vivo)'}`);

  const results = {};
  const allBusinessesFlattened = [];

  for (const slug of categoriesToAudit) {
    const catResult = await auditCategory(slug);
    if (catResult) {
      results[slug] = catResult;
      allBusinessesFlattened.push(...catResult.businesses);
    }
  }

  // Resumen global
  const totalBusinesses = allBusinessesFlattened.length;
  const noWebsite = allBusinessesFlattened.filter(b => b.webAudit.type === 'NO_WEBSITE' || b.webAudit.type === 'INVALID_URL').length;
  const socialOnly = allBusinessesFlattened.filter(b => b.webAudit.type === 'SOCIAL_ONLY').length;
  const withWebsite = allBusinessesFlattened.filter(b => b.webAudit.type === 'CUSTOM_WEBSITE' || b.webAudit.type === 'FREE_PLATFORM').length;
  const withMobilePhone = allBusinessesFlattened.filter(b => b.phoneData.isMobile).length;

  const testedWebs = allBusinessesFlattened.filter(b => b.webAudit.tested && b.webAudit.score > 0);
  const avgWebScore = testedWebs.length ? Math.round(testedWebs.reduce((a, b) => a + b.webAudit.score, 0) / testedWebs.length) : 0;

  const globalSummary = {
    totalCategories: categoriesToAudit.length,
    totalBusinesses,
    noWebsite,
    noWebsitePct: totalBusinesses ? Math.round((noWebsite / totalBusinesses) * 100) : 0,
    socialOnly,
    socialOnlyPct: totalBusinesses ? Math.round((socialOnly / totalBusinesses) * 100) : 0,
    withWebsite,
    withWebsitePct: totalBusinesses ? Math.round((withWebsite / totalBusinesses) * 100) : 0,
    withMobilePhone,
    withMobilePhonePct: totalBusinesses ? Math.round((withMobilePhone / totalBusinesses) * 100) : 0,
    avgWebScore
  };

  const finalAuditPayload = {
    updatedAt: new Date().toISOString(),
    summary: globalSummary,
    categories: results,
    businesses: allBusinessesFlattened
  };

  // Guardar archivo global audits/summary.json
  const summaryJsonPath = path.join(auditsDir, 'summary.json');
  fs.writeFileSync(summaryJsonPath, JSON.stringify(finalAuditPayload, null, 2), 'utf-8');
  console.log(`\n💾 [Guardado] Resumen global guardado en: ${summaryJsonPath}`);

  // Exportar leads listos para WhatsApp
  if (shouldExportLeads) {
    const readyLeads = allBusinessesFlattened
      .filter(b => b.phoneData.isMobile && b.proposal.status !== 'OPTIMIZE_WEBSITE')
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const leadsPath = path.join(auditsDir, 'leads-ready-to-contact.json');
    fs.writeFileSync(leadsPath, JSON.stringify(readyLeads, null, 2), 'utf-8');

    // Exportar también en CSV para Excel / Google Sheets
    const csvHeader = 'Nombre,Categoria,Distrito,Rating,Opiniones,Telefono,Tipo_Oportunidad,Subdominio_Sugerido,Enlace_WhatsApp\n';
    const csvRows = readyLeads.map(l => {
      const cleanName = `"${(l.name || '').replace(/"/g, '""')}"`;
      const cleanAddr = `"${(l.district || '').replace(/"/g, '""')}"`;
      const cleanWaUrl = `"${(l.proposal.whatsappUrl || '').replace(/"/g, '""')}"`;
      return `${cleanName},${l.categorySlug},${cleanAddr},${l.rating || ''},${l.reviewsCount || 0},${l.phoneData.clean || ''},${l.proposal.status},${l.proposal.suggestedSubdomain},${cleanWaUrl}`;
    }).join('\n');

    const csvPath = path.join(auditsDir, 'leads-ready-to-contact.csv');
    fs.writeFileSync(csvPath, '\uFEFF' + csvHeader + csvRows, 'utf-8'); // \uFEFF para UTF-8 BOM compatible con Excel
    console.log(`📱 [Leads WhatsApp] ${readyLeads.length} prospectos listos exportados en:`);
    console.log(`   - JSON: ${leadsPath}`);
    console.log(`   - CSV (Excel): ${csvPath}`);
  }

  // Generar Reporte HTML
  if (shouldGenerateHtml) {
    const htmlPath = path.join(auditsDir, 'index.html');
    generateHtmlReport(finalAuditPayload, htmlPath);
  }

  // Generar Reporte Markdown
  const mdPath = path.join(auditsDir, 'AUDIT_SUMMARY.md');
  generateMarkdownSummary(finalAuditPayload, mdPath);

  // Resumen en consola
  console.log(`\n======================================================`);
  console.log(`📊 BALANCE FINAL DE LA AUDITORÍA COMERCIAL`);
  console.log(`======================================================`);
  console.log(`Total Negocios Auditados:        ${totalBusinesses}`);
  console.log(`Sin Sitio Web (Oportunidad Alta): ${noWebsite} (${globalSummary.noWebsitePct}%)`);
  console.log(`Solo Red Social (Facebook/IG):   ${socialOnly} (${globalSummary.socialOnlyPct}%)`);
  console.log(`Con Sitio Web Propio:            ${withWebsite} (${globalSummary.withWebsitePct}%)`);
  console.log(`Con WhatsApp Móvil Directo:      ${withMobilePhone} (${globalSummary.withMobilePhonePct}%)`);
  console.log(`Puntaje Promedio Web:            ${avgWebScore}/100`);
  console.log(`======================================================\n`);

  // Sincronización automática con Git si se solicitó o por regla de autonomía
  if (shouldSyncGit) {
    console.log(`🐙 [Git] Sincronizando resultados con el repositorio remoto...`);
    // Sincronizar directorio audits
    syncWithGit('audits');
  }
}

main().catch(err => {
  console.error('💥 Error crítico en auditoría:', err);
  process.exit(1);
});
