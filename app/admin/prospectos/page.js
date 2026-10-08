import fs from 'fs';
import path from 'path';
import AuditoriaClient from '../../../components/AuditoriaClient.js';

export const metadata = {
  title: 'Prospectos Comerciales & WhatsApp B2B | Todo Lima Admin',
  description: 'Panel privado de prospección comercial de negocios en Lima Metropolitana.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminProspectosPage() {
  let auditData = { summary: {}, businesses: [] };

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

  return <AuditoriaClient initialData={auditData} />;
}
