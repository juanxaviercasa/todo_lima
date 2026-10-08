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

async function bulkMigrate() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('⚡ Conectando a Supabase PostgreSQL para migración completa...');
    await client.connect();
    console.log('✅ Conexión establecida.');

    // 1. MIGRAR CATEGORÍAS MAESTRAS
    console.log(`📦 1. Sincronizando ${CATEGORIES.length} categorías maestras...`);
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
    console.log(`✅ ${CATEGORIES.length} categorías maestras sincronizadas.`);

    // 2. MIGRAR O ACTUALIZAR NEGOCIOS EN LOTES (BULK UPSERTS)

    // 3. MIGRAR NEGOCIOS EN LOTES (BULK INSERTS)
    const summaryPath = path.join(rootDir, 'audits', 'summary.json');
    if (!fs.existsSync(summaryPath)) {
      console.error('❌ audits/summary.json no encontrado.');
      return;
    }

    const raw = fs.readFileSync(summaryPath, 'utf-8');
    const parsed = JSON.parse(raw);
    const businesses = parsed.businesses || [];
    console.log(`\n🚀 2. Procesando ${businesses.length} negocios totales en lotes concurrentes...`);

    const BATCH_SIZE = 150;
    const totalBatches = Math.ceil(businesses.length / BATCH_SIZE);

    for (let batchIdx = 0; batchIdx < totalBatches; batchIdx++) {
      const chunk = businesses.slice(batchIdx * BATCH_SIZE, (batchIdx + 1) * BATCH_SIZE);

      // --- A. BULK INSERT BUSINESSES ---
      const bizValues = [];
      const bizParams = [];
      let pIdx = 1;

      for (const b of chunk) {
        const uniqueBizId = `${b.categorySlug}_${b.id}`;
        bizValues.push(`($${pIdx}, $${pIdx+1}, $${pIdx+2}, $${pIdx+3}, $${pIdx+4}, $${pIdx+5}, $${pIdx+6}, $${pIdx+7}, $${pIdx+8}, $${pIdx+9}, true)`);
        bizParams.push(
          uniqueBizId,
          b.categorySlug,
          b.name,
          b.rating ? parseFloat(b.rating) : 5.0,
          b.reviewsCount || 0,
          b.address || '',
          b.district || '',
          b.phone || b.phoneData?.raw || '',
          b.website || b.webAudit?.url || null,
          b.mapsUrl || ''
        );
        pIdx += 10;
      }

      await client.query(`
        INSERT INTO public.businesses (
          id, category_slug, name, rating, reviews_count, address, district, phone_public, website_url, maps_url, is_verified
        )
        VALUES ${bizValues.join(', ')}
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
      `, bizParams);

      // --- B. BULK INSERT LEADS PROSPECTING ---
      const leadValues = [];
      const leadParams = [];
      let lpIdx = 1;

      for (const b of chunk) {
        const uniqueBizId = `${b.categorySlug}_${b.id}`;
        leadValues.push(`($${lpIdx}, $${lpIdx+1}, $${lpIdx+2}, $${lpIdx+3}, $${lpIdx+4}, $${lpIdx+5}, $${lpIdx+6}, $${lpIdx+7}, $${lpIdx+8}, $${lpIdx+9}, $${lpIdx+10}, $${lpIdx+11})`);
        leadParams.push(
          uniqueBizId,
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
          'Auditado y clasificado comercialmente'
        );
        lpIdx += 12;
      }

      await client.query(`
        INSERT INTO public.leads_prospecting (
          business_id, mobile_phone_raw, mobile_phone_intl, is_mobile, has_website,
          web_audit_type, web_audit_score, web_audit_issues, opportunity_status,
          commercial_priority, sales_stage, internal_notes
        )
        VALUES ${leadValues.join(', ')}
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
      `, leadParams);

      // --- C. BULK INSERT OUTREACH PITCHES ---
      const pitchItems = chunk.filter(b => b.proposal?.whatsappPitch);
      if (pitchItems.length > 0) {
        const pitchValues = [];
        const pitchParams = [];
        let ppIdx = 1;

        for (const b of pitchItems) {
          const uniqueBizId = `${b.categorySlug}_${b.id}`;
          pitchValues.push(`($${ppIdx}, $${ppIdx+1}, $${ppIdx+2}, $${ppIdx+3}, $${ppIdx+4}, $${ppIdx+5})`);
          pitchParams.push(
            uniqueBizId,
            b.proposal?.suggestedSubdomain || null,
            b.proposal?.whatsappPitch || '',
            b.proposal?.callScript || null,
            b.proposal?.suggestedSubdomain ? `https://${b.proposal.suggestedSubdomain}` : null,
            b.proposal?.whatsappUrl || null
          );
          ppIdx += 6;
        }

        await client.query(`
          INSERT INTO public.outreach_pitches (
            business_id, suggested_subdomain, whatsapp_pitch, phone_script,
            demo_url, whatsapp_direct_url
          )
          VALUES ${pitchValues.join(', ')}
          ON CONFLICT (business_id) DO UPDATE 
          SET suggested_subdomain = EXCLUDED.suggested_subdomain,
              whatsapp_pitch = EXCLUDED.whatsapp_pitch,
              phone_script = EXCLUDED.phone_script,
              demo_url = EXCLUDED.demo_url,
              whatsapp_direct_url = EXCLUDED.whatsapp_direct_url;
        `, pitchParams);
      }

      console.log(`✅ Lote ${batchIdx + 1}/${totalBatches} completado (${Math.min((batchIdx + 1) * BATCH_SIZE, businesses.length)}/${businesses.length})`);
    }

    // 4. VERIFICAR TOTALES REALES
    console.log('\n📊 4. Verificando estado final en Supabase:');
    const catTotal = await client.query('SELECT COUNT(*) FROM public.categories');
    const bizTotal = await client.query('SELECT COUNT(*) FROM public.businesses');
    const leadTotal = await client.query('SELECT COUNT(*) FROM public.leads_prospecting');
    const pitchTotal = await client.query('SELECT COUNT(*) FROM public.outreach_pitches');

    console.log(`  • Categorías sincronizadas: ${catTotal.rows[0].count}`);
    console.log(`  • Negocios en Directorio Público: ${bizTotal.rows[0].count}`);
    console.log(`  • Leads Privados (CRM): ${leadTotal.rows[0].count}`);
    console.log(`  • Pitches de WhatsApp Privados: ${pitchTotal.rows[0].count}`);

    console.log('\n🎉 ¡MIGRACIÓN TOTAL DE TODO LIMA A SUPABASE COMPLETADA CON ÉXITO!');

  } catch (err) {
    console.error('❌ Error durante la migración:', err);
  } finally {
    await client.end();
  }
}

bulkMigrate();
