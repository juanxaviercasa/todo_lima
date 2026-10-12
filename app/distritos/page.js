import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import { getDistrictProfiles, getDistrictInventory } from '../../lib/districtDirectory.js';
import { pageMetadata } from '../../lib/seo.js';
export const metadata = pageMetadata('Distritos de Lima: negocios y servicios | Todo Lima', 'Explora Surquillo y Los Olivos por áreas, categorías y negocios con dirección identificada.', '/distritos');
export default function DistrictsPage() {
  return <EditorialShell title="Explora Lima por distrito" intro="Empieza por Surquillo y Los Olivos. Ampliaremos estas guías conforme revisemos su contenido y el inventario disponible.">
    <div className="grid gap-5 sm:grid-cols-2">{getDistrictProfiles().map(p => <article key={p.slug} className="editorial-card"><p>{p.zone}</p><h2 className="text-2xl font-bold my-3"><Link className="underline inline-flex min-h-11 items-center" href={`/distritos/${p.slug}`}>{p.name}</Link></h2><p>{p.intro}</p><p className="mt-3">{getDistrictInventory(p.slug).count} negocios en el inventario disponible.</p></article>)}</div>
    <p>Los conteos corresponden a fichas del directorio, no al total de empresas del distrito. <Link className="underline" href="/metodologia">Consulta nuestra metodología</Link>.</p>
  </EditorialShell>;
}
