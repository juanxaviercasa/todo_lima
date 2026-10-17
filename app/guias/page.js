import EditorialShell from '../../components/EditorialShell.js';
import { GUIDES } from '../../lib/guides.js';
import { pageMetadata } from '../../lib/seo.js';
import GuidesExplorer from '../../components/GuidesExplorer.js';
import Link from 'next/link';
import { EDITORIAL_IMAGES } from '../../lib/editorialImages.js';
export const metadata = pageMetadata('Guías para elegir servicios en Lima | Todo Lima', 'Checklists y preguntas prácticas para comparar proveedores, preparar una consulta y contratar con información clara.', '/guias', EDITORIAL_IMAGES['guias-lima']);
export default function GuidesPage() {
  return <EditorialShell title="Resuelve tu próxima decisión en Lima" image={EDITORIAL_IMAGES['guias-lima']} intro="Desde preparar una mudanza hasta acordar el menú de un evento: encuentra preguntas, criterios y pasos específicos para cada situación."><aside className="editorial-card"><p className="font-bold">¿Estás organizando tu negocio?</p><p className="mt-2 text-slate-600 dark:text-slate-300">Aprende a preparar cotizaciones, calcular precios y usar herramientas digitales con capturas de cada paso.</p><Link href="/herramientas" className="inline-flex items-center min-h-11 mt-2 font-semibold text-sky-700 dark:text-sky-300 underline">Explorar herramientas y tutoriales ilustrados →</Link></aside><GuidesExplorer guides={GUIDES.map(({ slug, category, title, description, group }) => ({ slug, category, title, description, group }))} /><p className="text-xs text-slate-500">Las imágenes son ilustraciones editoriales generadas con IA; no representan negocios ni servicios evaluados por Todo Lima.</p></EditorialShell>;
}
