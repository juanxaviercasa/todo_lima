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
      auditData = JSON.parse(raw);
    } catch (e) {
      console.error('Error cargando audits/summary.json:', e);
    }
  }

  return <AuditoriaClient initialData={auditData} />;
}
