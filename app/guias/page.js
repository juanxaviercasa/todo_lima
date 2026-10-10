import EditorialShell from '../../components/EditorialShell.js';
import { GUIDES } from '../../lib/guides.js';
import { pageMetadata } from '../../lib/seo.js';
import GuideCard from '../../components/GuideCard.js';
import { EDITORIAL_IMAGES } from '../../lib/editorialImages.js';
export const metadata = pageMetadata('Guías para elegir servicios en Lima | Todo Lima', 'Checklists y preguntas prácticas para comparar proveedores, preparar una consulta y contratar con información clara.', '/guias', EDITORIAL_IMAGES['guias-lima']);
export default function GuidesPage() {
  return <EditorialShell title="Decide con más información" image={EDITORIAL_IMAGES['guias-lima']} intro="Guías prácticas para hacer mejores preguntas, comparar propuestas y preparar tu próximo servicio en Lima."><div><p className="text-sky-600 dark:text-sky-300 text-sm font-semibold mb-3">PREPARA · COMPARA · CONSULTA</p><h2 className="text-3xl font-bold mb-6">Una guía para tu próximo servicio</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{GUIDES.map(g => <GuideCard guide={g} key={g.slug} />)}</div></div><p className="text-xs text-slate-500">Las imágenes son ilustraciones editoriales generadas con IA; no representan negocios ni servicios evaluados por Todo Lima.</p></EditorialShell>;
}
