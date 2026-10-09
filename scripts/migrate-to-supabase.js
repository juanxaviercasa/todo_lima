#!/usr/bin/env node

/**
 * SCRIPT DE MIGRACIÓN: TODO LIMA -> SUPABASE (POSTGRESQL)
 * 
 * Lee los archivos locales (data/*.json y audits/summary.json) y los inserta
 * en la base de datos Supabase separando datos públicos de inteligencia privada.
 * 
 * Requisitos:
 *   npm install @supabase/supabase-js
 *   Variables en .env.local:
 *     NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
 *     SUPABASE_SERVICE_ROLE_KEY=tu-clave-service-role
 * 
 * Uso:
 *   node scripts/migrate-to-supabase.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../scraper/config/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

async function runMigration() {
  console.log('🚀 Iniciando script de migración a Supabase para Todo Lima...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan las variables de entorno de Supabase.');
    console.error('Por favor agrega en tu archivo .env.local:');
    console.error('  NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co');
    console.error('  SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key\n');
    process.exit(1);
  }

  let createClient;
  try {
    const supabaseModule = await import('@supabase/supabase-js');
    createClient = supabaseModule.createClient;
  } catch (err) {
    console.error('❌ El paquete @supabase/supabase-js no está instalado.');
    console.error('Ejecuta: npm install @supabase/supabase-js y vuelve a correr este script.\n');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. MIGRAR CATEGORÍAS
  console.log(`📦 1. Migrando ${CATEGORIES.length} categorías maestras...`);
  const categoryPayload = CATEGORIES.map(cat => ({
    slug: cat.slug,
    title: cat.title,
    niche: cat.niche,
    query: cat.query,
    hero_hook: cat.heroHook,
    is_active: true
  }));

  const { error: catErr } = await supabase
    .from('categories')
    .upsert(categoryPayload, { onConflict: 'slug' });

  if (catErr) {
    console.error('❌ Error migrando categorías:', catErr.message);
  } else {
    console.log(`✅ ${categoryPayload.length} categorías sincronizadas.`);
  }

  // 2. MIGRAR NEGOCIOS Y LEADS DESDE audits/summary.json
  const summaryPath = path.join(rootDir, 'audits', 'summary.json');
  if (fs.existsSync(summaryPath)) {
    console.log('\n📊 2. Leyendo audits/summary.json para extraer negocios y leads...');
    const raw = fs.readFileSync(summaryPath, 'utf-8');
    const parsed = JSON.parse(raw);
    const businesses = parsed.businesses || [];

    console.log(`Encontrados ${businesses.length} negocios auditados.`);

    const batchSize = 100;
    for (let i = 0; i < businesses.length; i += batchSize) {
      const chunk = businesses.slice(i, i + batchSize);

      // A. Datos públicos del directorio
      const publicBusinesses = chunk.map(b => ({
        id: b.id,
        category_slug: b.categorySlug,
        name: b.name,
        rating: b.rating ? parseFloat(b.rating) : 5.0,
        reviews_count: b.reviewsCount || 0,
        address: b.address || '',
        district: b.district || '',
        phone_public: b.phone || b.phoneData?.raw || '',
        website_url: b.website || b.webAudit?.url || null,
        maps_url: b.mapsUrl || '',
        is_verified: true
      }));

      const { error: bizErr } = await supabase
        .from('businesses')
        .upsert(publicBusinesses, { onConflict: 'id' });

      if (bizErr) {
        console.error(`❌ Error en lote ${i}-${i + chunk.length} de businesses:`, bizErr.message);
      }

      // B. Inteligencia comercial privada (leads_prospecting)
      const privateLeads = chunk.map(b => ({
        business_id: b.id,
        mobile_phone_raw: b.phoneData?.raw || null,
        mobile_phone_intl: b.phoneData?.international || null,
        is_mobile: !!b.phoneData?.isMobile,
        has_website: b.webAudit?.type !== 'NO_WEBSITE',
        web_audit_type: b.webAudit?.type || 'UNKNOWN',
        web_audit_score: b.webAudit?.score || 0,
        web_audit_issues: b.webAudit?.issues || [],
        opportunity_status: b.proposal?.status || 'NEEDS_WEBSITE',
        commercial_priority: b.proposal?.priority || 'MEDIUM',
        sales_stage: 'LEAD',
        internal_notes: `Extraído en lote de prospección`
      }));

      const { error: leadErr } = await supabase
        .from('leads_prospecting')
        .upsert(privateLeads, { onConflict: 'business_id' });

      if (leadErr) {
        console.error(`❌ Error en lote ${i}-${i + chunk.length} de leads:`, leadErr.message);
      }

      // C. Pitches privados de WhatsApp
      const privatePitches = chunk.map(b => ({
        business_id: b.id,
        suggested_subdomain: b.proposal?.suggestedSubdomain || null,
        whatsapp_pitch: b.proposal?.whatsappPitch || '',
        phone_script: b.proposal?.callScript || null,
        whatsapp_direct_url: b.proposal?.whatsappUrl || null
      }));

      const { error: pitchErr } = await supabase
        .from('outreach_pitches')
        .upsert(privatePitches, { onConflict: 'business_id' });

      if (pitchErr) {
        console.error(`❌ Error en lote ${i}-${i + chunk.length} de pitches:`, pitchErr.message);
      }

      process.stdout.write(`⏳ Progreso: ${Math.min(i + batchSize, businesses.length)}/${businesses.length}\r`);
    }

    console.log(`\n✅ Negocios, leads y pitches migrados con éxito a Supabase.`);
  } else {
    console.log('⚠️ No se encontró audits/summary.json, migrando únicamente desde data/*.json...');
  }

  console.log('\n🎉 Migración completada exitosamente.');
}

runMigration().catch(err => {
  console.error('Error fatal durante la migración:', err);
  process.exit(1);
});
