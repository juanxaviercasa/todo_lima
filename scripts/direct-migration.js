import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../scraper/config/categories.js';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

const connectionString = 'postgresql://postgres.uhpekavdwcezyzzgsdnn:572814scxJ357@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

async function migrate() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🚀 Iniciando migración de datos a Supabase...');
    await client.connect();
    console.log('✅ Conexión establecida con PostgreSQL.');

    // 1. MIGRAR CATEGORÍAS
    console.log(`\n📦 1. Insertando ${CATEGORIES.length} categorías...`);
    for (const cat of CATEGORIES) {
      await client.query(`
        INSERT INTO public.categories (slug, title, niche, query, hero_hook, is_active)
        VALUES ($1, $2, $3, $4, $5, true)
        ON CONFLICT (slug) DO UPDATE 
        SET title = EXCLUDED.title,
            niche = EXCLUDED.niche,
            query = EXCLUDED.query,
            hero_hook = EXCLUDED.hero_hook,
            updated_at = timezone('utc'::text, now());
      `, [cat.slug, cat.title, cat.niche, cat.query, cat.heroHook]);
    }
    console.log(`✅ ${CATEGORIES.length} categorías sincronizadas con éxito.`);

    // 2. MIGRAR DESDE audits/summary.json
    const summaryPath = path.join(rootDir, 'audits', 'summary.json');
    if (fs.existsSync(summaryPath)) {
      console.log('\n📊 2. Procesando negocios y leads desde audits/summary.json...');
      const raw = fs.readFileSync(summaryPath, 'utf-8');
      const parsed = JSON.parse(raw);
      const businesses = parsed.businesses || [];

      console.log(`Encontrados ${businesses.length} negocios auditados.`);

      let bizCount = 0;
      let leadCount = 0;
      let pitchCount = 0;

      // Iniciar transacción
      await client.query('BEGIN');

      for (let i = 0; i < businesses.length; i++) {
        const b = businesses[i];

        // A. Tabla pública: businesses
        await client.query(`
          INSERT INTO public.businesses (
            id, category_slug, name, rating, reviews_count, address, district, phone_public, website_url, maps_url, is_verified
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
          ON CONFLICT (id) DO UPDATE 
          SET category_slug = EXCLUDED.category_slug,
              name = EXCLUDED.name,
              rating = EXCLUDED.rating,
              reviews_count = EXCLUDED.reviews_count,
              address = EXCLUDED.address,
              district = EXCLUDED.district,
              phone_public = EXCLUDED.phone_public,
              website_url = EXCLUDED.website_url,
              maps_url = EXCLUDED.maps_url,
              updated_at = timezone('utc'::text, now());
        `, [
          b.id,
          b.categorySlug,
          b.name,
          b.rating ? parseFloat(b.rating) : 5.0,
          b.reviewsCount || 0,
          b.address || '',
          b.district || '',
          b.phone || b.phoneData?.raw || '',
          b.website || b.webAudit?.url || null,
          b.mapsUrl || ''
        ]);
        bizCount++;

        // B. Tabla privada: leads_prospecting
        await client.query(`
          INSERT INTO public.leads_prospecting (
            business_id, mobile_phone_raw, mobile_phone_intl, is_mobile, has_website,
            web_audit_type, web_audit_score, web_audit_issues, opportunity_status,
            commercial_priority, sales_stage, internal_notes
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (business_id) DO UPDATE 
          SET mobile_phone_raw = EXCLUDED.mobile_phone_raw,
              mobile_phone_intl = EXCLUDED.mobile_phone_intl,
              is_mobile = EXCLUDED.is_mobile,
              has_website = EXCLUDED.has_website,
              web_audit_type = EXCLUDED.web_audit_type,
              web_audit_score = EXCLUDED.web_audit_score,
              web_audit_issues = EXCLUDED.web_audit_issues,
              opportunity_status = EXCLUDED.opportunity_status,
              commercial_priority = EXCLUDED.commercial_priority,
              updated_at = timezone('utc'::text, now());
        `, [
          b.id,
          b.phoneData?.raw || null,
          b.phoneData?.international || null,
          !!b.phoneData?.isMobile,
          b.webAudit?.type !== 'NO_WEBSITE',
          b.webAudit?.type || 'UNKNOWN',
          b.webAudit?.score || 0,
          JSON.stringify(b.webAudit?.issues || []),
          b.proposal?.status || 'NEEDS_WEBSITE',
          b.proposal?.priority || 'MEDIUM',
          'LEAD',
          'Auditado y extraído en tanda inicial'
        ]);
        leadCount++;

        // C. Tabla privada: outreach_pitches
        if (b.proposal?.whatsappPitch) {
          await client.query(`
            INSERT INTO public.outreach_pitches (
              business_id, suggested_subdomain, whatsapp_pitch, phone_script,
              demo_url, whatsapp_direct_url
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (business_id) DO UPDATE 
            SET suggested_subdomain = EXCLUDED.suggested_subdomain,
                whatsapp_pitch = EXCLUDED.whatsapp_pitch,
                phone_script = EXCLUDED.phone_script,
                demo_url = EXCLUDED.demo_url,
                whatsapp_direct_url = EXCLUDED.whatsapp_direct_url;
          `, [
            b.id,
            b.proposal?.suggestedSubdomain || null,
            b.proposal?.whatsappPitch || '',
            b.proposal?.callScript || null,
            b.proposal?.suggestedSubdomain ? `https://${b.proposal.suggestedSubdomain}` : null,
            b.proposal?.whatsappUrl || null
          ]);
          pitchCount++;
        }

        if (i % 100 === 0 || i === businesses.length - 1) {
          process.stdout.write(`⏳ Progreso: ${i + 1}/${businesses.length} registros insertados...\r`);
        }
      }

      await client.query('COMMIT');
      console.log(`\n✅ Negocios: ${bizCount} | Leads Privados: ${leadCount} | Pitches Privados: ${pitchCount}`);
    }

    // 3. VERIFICAR TOTALES EN LA BASE DE DATOS
    console.log('\n📊 3. Resumen final en Supabase:');
    const catTotal = await client.query('SELECT COUNT(*) FROM public.categories');
    const bizTotal = await client.query('SELECT COUNT(*) FROM public.businesses');
    const leadTotal = await client.query('SELECT COUNT(*) FROM public.leads_prospecting');
    const pitchTotal = await client.query('SELECT COUNT(*) FROM public.outreach_pitches');

    console.log(`  • Categorías activas: ${catTotal.rows[0].count}`);
    console.log(`  • Negocios en Directorio Público: ${bizTotal.rows[0].count}`);
    console.log(`  • Leads Privados (CRM): ${leadTotal.rows[0].count}`);
    console.log(`  • Pitches WhatsApp Privados: ${pitchTotal.rows[0].count}`);

    console.log('\n🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE! Toda Lima ahora opera con Supabase.');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error durante la migración:', err);
  } finally {
    await client.end();
  }
}

migrate();
