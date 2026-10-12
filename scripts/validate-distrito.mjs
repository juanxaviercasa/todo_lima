/**
 * Validador de expedientes de distrito generados con Deep Research.
 * Uso: node scripts/validate-distrito.mjs data/distritos/miraflores.json
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { CATEGORIES } from '../scraper/config/categories.js';
import { LIMA_ZONES } from '../lib/districts.js';

const VALID_SLUGS = new Set(CATEGORIES.map(c => c.slug));
const VALID_ZONES = new Set(Object.keys(LIMA_ZONES));

const targetFile = process.argv[2];
if (!targetFile) {
  console.error('Uso: node scripts/validate-distrito.mjs <ruta-al-json>');
  process.exit(1);
}

const raw = fs.readFileSync(path.resolve(targetFile), 'utf8');
const data = JSON.parse(raw);

console.log(`Verificando expediente: ${data.nombre} (${data.slug})...`);

// Validaciones requeridas
assert(data.slug && typeof data.slug === 'string', 'Falta slug');
assert(data.nombre && typeof data.nombre === 'string', 'Falta nombre');
assert(VALID_ZONES.has(data.zona), `Zona inválida: "${data.zona}". Debe ser una de: ${[...VALID_ZONES].join(', ')}`);
assert(data.ubigeo && typeof data.ubigeo === 'string', 'Falta ubigeo');
assert(data.definicion && data.definicion.length >= 80, 'Definición muy corta o ausente');
assert(data.identidad && data.identidad.length >= 100, 'Identidad muy corta o ausente');

// Población y superficie
assert(data.poblacion && typeof data.poblacion.valor === 'number', 'Falta dato numérico de población');
assert(data.superficie_km2 && typeof data.superficie_km2.valor === 'number', 'Falta superficie_km2');

// Historia y patrimonio
assert(Array.isArray(data.historia) && data.historia.length >= 3, 'Se requieren al menos 3 hitos históricos');
assert(Array.isArray(data.patrimonio) && data.patrimonio.length >= 2, 'Se requieren al menos 2 sitios patrimoniales');

// Economía y atractivos
assert(data.economia?.motores && data.economia.motores.length >= 2, 'Faltan motores económicos');
assert(Array.isArray(data.imperdibles) && data.imperdibles.length >= 3, 'Se requieren al menos 3 imperdibles');

// Transporte y contactos
assert(data.transporte?.ejes_viales && data.transporte.ejes_viales.length >= 2, 'Faltan ejes viales');
assert(Array.isArray(data.contactos_utiles) && data.contactos_utiles.length >= 2, 'Faltan contactos útiles (comisaría, serenazgo)');

// Categorías prioritarias: deben pertenecer a nuestro catálogo real de 126
assert(Array.isArray(data.categorias_prioritarias) && data.categorias_prioritarias.length >= 4, 'Faltan categorías prioritarias (mínimo 4)');
for (const cat of data.categorias_prioritarias) {
  assert(VALID_SLUGS.has(cat), `Categoría desconocida en catálogo: "${cat}"`);
}

// FAQs
assert(Array.isArray(data.faq) && data.faq.length >= 3, 'Se requieren al menos 3 FAQs');

console.log(`✓ Expediente validado con éxito para ${data.nombre}`);
console.log(`  - Categorías priorizadas en Todo Lima: ${data.categorias_prioritarias.join(', ')}`);
console.log(`  - Hitos históricos: ${data.historia.length} | Patrimonio: ${data.patrimonio.length} | Imperdibles: ${data.imperdibles.length}`);
