import fs from 'fs';
import path from 'path';
import AuditoriaClient from '../../components/AuditoriaClient.js';

export const metadata = {
  title: 'Auditoría Comercial & Propuestas | Todo Lima',
  description: 'Panel de prospección comercial y análisis técnico de negocios en las 38 categorías de Lima Metropolitana.',
};

export default function AuditoriaPage() {
  const summaryPath = path.join(process.cwd(), 'audits', 'summary.json');
  let auditData = { summary: {}, businesses: [] };

  if (fs.existsSync(summaryPath)) {
    try {
      const raw = fs.readFileSync(summaryPath, 'utf-8');
      const parsed = JSON.parse(raw);
      
      const fullBusinesses = parsed.businesses || [];
      
      // Ordenar por prioridad comercial: con teléfono móvil WhatsApp, mayor calificación y más reseñas
      const sortedBusinesses = fullBusinesses.sort((a, b) => {
        const aMobile = a.phoneData?.isMobile ? 1 : 0;
        const bMobile = b.phoneData?.isMobile ? 1 : 0;
        if (bMobile !== aMobile) return bMobile - aMobile;
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });

      // Optimizar payload para Vercel: extraer únicamente los campos requeridos por la UI para los mejores prospectos
      // Evita exceder el límite de 19MB de Vercel en páginas estáticas ISR
      const slimBusinesses = sortedBusinesses.slice(0, 350).map(b => ({
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
          whatsappUrl: b.proposal?.whatsappUrl,
          whatsappPitch: b.proposal?.whatsappPitch,
        },
      }));

      auditData = {
        summary: parsed.summary || {},
        businesses: slimBusinesses,
      };
    } catch (e) {
      console.error('Error cargando audits/summary.json:', e);
    }
  }

  return <AuditoriaClient initialData={auditData} />;
}
