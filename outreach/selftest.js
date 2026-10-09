/**
 * Suite de Pruebas Unitarias Automatizadas para el Motor de Cumplimiento (Compliance Selftest).
 * Ejecuta aserciones estrictas sobre las reglas de la Ley N° 32323, Ley N° 29733 y Meta Policy.
 */

import { canSend } from './compliance.js';
import { isOptOutMessage, isOptInMessage } from './policy.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

console.log('\n======================================================');
console.log('🧪 INICIANDO SELFTEST DE CUMPLIMIENTO LEGAL & WHATSAPP');
console.log('======================================================\n');

// TEST 1: Lead en frío sin consentimiento (Scraped) DEBE ser bloqueado por Ley 32323
const coldLeadCheck = canSend({
  contact: { phone_e164: '+51987654321', first_inbound_at: null },
  consent: null,
  isSuppressed: false,
  category: 'marketing'
});
assert(!coldLeadCheck.allowed, 'Lead en frío sin contacto previo es BLOQUEADO');
assert(coldLeadCheck.reasons.some(r => r.includes('LEY_32323')), 'Motivo incluye infracción a Ley 32323');

// TEST 2: Número en Lista de Supresión Global (Do-Not-Contact) DEBE ser bloqueado
const suppressedCheck = canSend({
  contact: { phone_e164: '+51987654321', first_inbound_at: new Date() },
  consent: { status: 'granted', purpose: 'marketing' },
  isSuppressed: true,
  category: 'marketing'
});
assert(!suppressedCheck.allowed, 'Número en lista de supresión (baja) es BLOQUEADO');
assert(suppressedCheck.reasons.some(r => r.includes('BLOQUEO_SUPRESION')), 'Motivo identifica Lista de Supresión');

// TEST 3: Envío en Domingo DEBE ser bloqueado
// Simulamos un domingo a las 11:00 AM (ej. 2026-10-11 es Domingo)
const sundayDate = new Date('2026-10-11T16:00:00Z'); // 11:00 AM en Lima (UTC-5)
const sundayCheck = canSend({
  contact: { phone_e164: '+51987654321', first_inbound_at: new Date() },
  consent: { status: 'granted', purpose: 'marketing' },
  isSuppressed: false,
  category: 'marketing',
  now: sundayDate
});
assert(!sundayCheck.allowed, 'Envío de marketing en Domingo es BLOQUEADO');
assert(sundayCheck.reasons.some(r => r.includes('BLOQUEO_HORARIO')), 'Motivo prohíbe envíos dominicales');

// TEST 4: Calidad de Cuenta en ROJO DEBE pausar todos los envíos
const redHealthCheck = canSend({
  contact: { phone_e164: '+51987654321', first_inbound_at: new Date() },
  consent: { status: 'granted', purpose: 'marketing' },
  isSuppressed: false,
  category: 'marketing',
  health: { quality_rating: 'RED', messaging_limit_tier: 250 }
});
assert(!redHealthCheck.allowed, 'Estado de cuenta en ROJO es BLOQUEADO');

// TEST 5: Contacto Inbound con consentimiento válido en horario hábil DEBE ser PERMITIDO
// Simulamos un martes a las 11:00 AM (ej. 2026-10-13 es Martes)
const validTuesday = new Date('2026-10-13T16:00:00Z'); // 11:00 AM Lima
const validCheck = canSend({
  contact: { phone_e164: '+51987654321', first_inbound_at: new Date('2026-10-01') },
  consent: { status: 'granted', purpose: 'marketing' },
  isSuppressed: false,
  category: 'marketing',
  now: validTuesday,
  history: [],
  health: { quality_rating: 'GREEN', messaging_limit_tier: 250 }
});
assert(validCheck.allowed, 'Contacto inbound con consentimiento previo en día hábil es PERMITIDO');

// TEST 6: Detección precisa de palabras clave de Opt-out (Baja)
assert(isOptOutMessage('BAJA'), 'Detecta palabra clave "BAJA"');
assert(isOptOutMessage('por favor baja'), 'Detecta "baja" con texto adicional');
assert(isOptOutMessage('no molestar más'), 'Detecta "no molestar"');
assert(!isOptOutMessage('Hola, qué tal el servicio'), 'No confunde mensajes ordinarios con baja');

// TEST 7: Detección de consentimiento explícito (Opt-in)
assert(isOptInMessage('Acepto recibir mi auditoría por WhatsApp'), 'Detecta "Acepto"');
assert(isOptInMessage('Hola, reclamo mi ficha oficial'), 'Detecta "reclamo mi ficha"');

console.log(`\n======================================================`);
console.log(`📊 RESULTADO DE LA SUITE DE CUMPLIMIENTO:`);
console.log(`   Superadas: ${passed} | Fallidas: ${failed}`);
console.log(`======================================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ¡TODAS LAS PRUEBAS DE CUMPLIMIENTO PASARON EXITOSAMENTE!');
}
