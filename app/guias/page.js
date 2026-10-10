import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import { GUIDES } from '../../lib/guides.js';
import { pageMetadata } from '../../lib/seo.js';
export const metadata = pageMetadata('Guías para elegir servicios en Lima | Todo Lima', 'Checklists y preguntas prácticas para comparar proveedores, preparar una consulta y contratar con información clara.', '/guias');
export default function GuidesPage() {
  return <EditorialShell title="Decide con más información" intro="Guías prácticas para hacer mejores preguntas, comparar propuestas y preparar tu próximo servicio en Lima."><div className="grid md:grid-cols-2 gap-5">{GUIDES.map(g => <Link className="editorial-card" href={`/guias/${g.slug}`} key={g.slug}><p className="text-sm text-sky-600 mb-3">Guía de contratación</p><h2 className="text-xl font-bold">{g.title}</h2><p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{g.description}</p><span className="block mt-4 font-semibold text-sky-600">Leer guía →</span></Link>)}</div></EditorialShell>;
}
