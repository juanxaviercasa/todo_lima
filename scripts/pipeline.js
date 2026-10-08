#!/usr/bin/env node

/**
 * PIPELINE MAESTRO TODO-EN-UNO: SCRAPING -> AUDITORÍA -> SUPABASE
 * 
 * Uso:
 *   node scripts/pipeline.js --slug [categoria]
 *   node scripts/pipeline.js --slug barberias --limit 30
 * 
 * Este script automatiza todo el flujo en 1 solo comando:
 * 1. Extrae los negocios reales de Google Maps con Playwright.
 * 2. Audita sus webs y genera los pitches de WhatsApp B2B.
 * 3. Sube los datos directamente a Supabase (PostgreSQL).
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

const slug = getArg('--slug') || getArg('-s');
const limit = getArg('--limit') || getArg('-l');

if (!slug) {
  console.log('❌ Debes especificar el slug de la categoría.');
  console.log('Ejemplo de uso:');
  console.log('  node scripts/pipeline.js --slug veterinarias');
  console.log('  node scripts/pipeline.js --slug barberias --limit 30\n');
  process.exit(1);
}

function runStep(command, stepArgs, stepName) {
  return new Promise((resolve, reject) => {
    console.log(`\n======================================================`);
    console.log(`▶️ [Paso] ${stepName}`);
    console.log(`Comando: node ${command} ${stepArgs.join(' ')}`);
    console.log(`======================================================\n`);

    const child = spawn('node', [command, ...stepArgs], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`El paso "${stepName}" finalizó con código de error ${code}`));
      }
    });

    child.on('error', err => reject(err));
  });
}

async function main() {
  console.log(`\n🚀 INICIANDO PIPELINE AUTOMÁTICO PARA: "${slug}"`);

  try {
    // 1. Scraping con Playwright
    const scrapeArgs = ['--slug', slug, '--no-git'];
    if (limit) scrapeArgs.push('--limit', limit);
    await runStep('scraper/runner.js', scrapeArgs, '1. Extracción de Google Maps con Playwright');

    // 2. Auditoría y generación de propuestas
    const auditArgs = ['--category', slug, '--skip-http'];
    await runStep('auditor/run-audit.js', auditArgs, '2. Generación de Auditoría y Pitches WhatsApp');

    // 3. Sincronización masiva con Supabase
    await runStep('scripts/bulk-migration.js', [], '3. Sincronización en vivo con Supabase PostgreSQL');

    console.log(`\n🎉 ¡PIPELINE COMPLETADO CON ÉXITO!`);
    console.log(`La categoría "${slug}" ya está extraída, auditada y sincronizada en Supabase.`);
    console.log(`Puedes ver los nuevos leads en: http://localhost:3000/admin/prospectos\n`);

  } catch (err) {
    console.error('\n❌ Error en el pipeline:', err.message);
    process.exit(1);
  }
}

main();
