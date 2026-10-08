import fs from 'fs';
import path from 'path';
import pg from 'pg';
import AuditoriaClient from '../../../components/AuditoriaClient.js';

export const metadata = {
  title: 'Prospectos Comerciales & WhatsApp B2B | Todo Lima Admin',
  description: 'Panel privado de prospección comercial de negocios en Lima Metropolitana.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function AdminProspectosPage() {
  let auditData = { summary: {}, businesses: [] };
  const dbUrl = process.env.DATABASE_URL;

  // 1. Cargar en vivo desde Supabase PostgreSQL si está configurado
  if (dbUrl) {
    const { Client } = pg;
    const client = new Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client.connect();

      // Consultar KPIs en tiempo real
      const totalRes = await client.query('SELECT COUNT(*) as count FROM public.businesses;');
      const mobileRes = await client.query('SELECT COUNT(*) as count FROM public.leads_prospecting WHERE is_mobile = true;');
      const noWebRes = await client.query("SELECT COUNT(*) as count FROM public.leads_prospecting WHERE has_website = false;");

      const totalCount = parseInt(totalRes.rows[0]?.count || '0', 10);
      const withMobile = parseInt(mobileRes.rows[0]?.count || '0', 10);
      const noWeb = parseInt(noWebRes.rows[0]?.count || '0', 10);

      // Consultar los mejores prospectos para la interfaz interactiva
      const q = await client.query(`
        SELECT 
          b.id,
          b.name,
          b.rating,
          b.reviews_count as "reviewsCount",
          b.district,
          b.category_slug as "categorySlug",
          c.title as "categoryName",
          b.maps_url as "mapsUrl",
          json_build_object(
            'raw', lp.mobile_phone_raw,
            'isMobile', lp.is_mobile,
            'international', lp.mobile_phone_intl
          ) as "phoneData",
          json_build_object(
            'url', b.website_url,
            'type', lp.web_audit_type,
            'score', lp.web_audit_score,
            'issues', lp.web_audit_issues
          ) as "webAudit",
          json_build_object(
            'status', lp.opportunity_status,
            'priority', lp.commercial_priority,
            'suggestedSubdomain', op.suggested_subdomain,
            'whatsappUrl', op.whatsapp_direct_url,
            'whatsappPitch', op.whatsapp_pitch
          ) as "proposal"
        FROM public.businesses b
        JOIN public.categories c ON b.category_slug = c.slug
        LEFT JOIN public.leads_prospecting lp ON b.id = lp.business_id
        LEFT JOIN public.outreach_pitches op ON b.id = op.business_id
        ORDER BY lp.is_mobile DESC, b.reviews_count DESC
        LIMIT 400;
      `);

      auditData = {
        summary: {
          totalBusinesses: totalCount,
          withMobilePhone: withMobile,
          noWebsite: noWeb,
          noWebsitePct: totalCount > 0 ? Math.round((noWeb / totalCount) * 100) : 0,
        },
        businesses: q.rows,
      };

      await client.end();
    } catch (e) {
      console.error('Error cargando prospectos desde Supabase:', e.message);
    }
  }

  // 2. Fallback resiliente a summary.json si la DB no está disponible
  if (!auditData.businesses.length) {
    const summaryPath = path.join(process.cwd(), 'audits', 'summary.json');
    if (fs.existsSync(summaryPath)) {
      try {
        const raw = fs.readFileSync(summaryPath, 'utf-8');
        const parsed = JSON.parse(raw);
        const fullBusinesses = parsed.businesses || [];
        const sortedBusinesses = fullBusinesses.sort((a, b) => {
          const aMobile = a.phoneData?.isMobile ? 1 : 0;
          const bMobile = b.phoneData?.isMobile ? 1 : 0;
          if (bMobile !== aMobile) return bMobile - aMobile;
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        });

        auditData = {
          summary: parsed.summary || {},
          businesses: sortedBusinesses.slice(0, 350).map(b => ({
            id: b.id,
            name: b.name,
            rating: b.rating,
            reviewsCount: b.reviewsCount,
            district: b.district,
            categorySlug: b.categorySlug,
            categoryName: b.categoryName,
            mapsUrl: b.mapsUrl,
            phoneData: {
              raw: b.phoneData?.raw,
              isMobile: b.phoneData?.isMobile,
              international: b.phoneData?.international,
            },
            webAudit: {
              url: b.webAudit?.url,
              type: b.webAudit?.type,
              score: b.webAudit?.score,
              issues: b.webAudit?.issues || [],
            },
            proposal: {
              status: b.proposal?.status,
              priority: b.proposal?.priority,
              suggestedSubdomain: b.proposal?.suggestedSubdomain,
              whatsappUrl: b.proposal?.whatsappUrl,
              whatsappPitch: b.proposal?.whatsappPitch,
            },
          })),
        };
      } catch (err) {
        console.error('Error en fallback summary.json:', err);
      }
    }
  }

  return <AuditoriaClient initialData={auditData} />;
}
