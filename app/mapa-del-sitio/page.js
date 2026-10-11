import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import LimaMap from '../../components/LimaMap.js';
import {INSTITUTIONAL_IMAGES} from '../../lib/institutionalImages.js';
import {CATEGORIES} from '../../scraper/config/categories.js';
import {GUIDES} from '../../lib/guides.js';
import {BLOG_POSTS} from '../../lib/blog.js';
import {pageMetadata} from '../../lib/seo.js';

export const metadata = pageMetadata('Mapa del sitio y mapa de Lima | Todo Lima', 'Navega por las categorías de negocios, guías, artículos y páginas de Todo Lima. Consulta también el mapa geográfico de Lima.', '/mapa-del-sitio', INSTITUTIONAL_IMAGES['mapa-del-sitio']);
const sections = [
  ['Descubrir Todo Lima', [['Inicio','/'],['Herramientas','/herramientas'],['Guías','/guias'],['Blog','/blog'],['Para negocios','/para-negocios']]],
  ['Información y ayuda', [['Sobre nosotros','/sobre-nosotros'],['Contacto','/contacto'],['Preguntas frecuentes','/preguntas-frecuentes'],['Equipo editorial','/equipo-editorial'],['Metodología','/metodologia'],['Correcciones','/correcciones']]],
  ['Privacidad y condiciones', [['Privacidad','/privacidad'],['Términos','/terminos'],['Cookies','/cookies'],['Aviso legal','/aviso-legal'],['Derechos ARCO','/derechos-arco'],['Baja de comunicaciones','/baja'],['Libro de reclamaciones','/libro-de-reclamaciones'],['Política anti-spam','/politica-anti-spam'],['Descargo de responsabilidad','/descargo-de-responsabilidad'],['Garantías y reembolsos','/reembolsos-y-garantias']]]
];
const list = links => <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">{links.map(([label, href]) => <li className="min-w-0" key={href}><Link href={href} className="text-sky-700 dark:text-sky-300 underline leading-relaxed break-words">{label}</Link></li>)}</ul>;
export default function SiteMapPage() {
  return <EditorialShell image={INSTITUTIONAL_IMAGES['mapa-del-sitio']} title="Todo Lima, bien organizado" intro="Un mapa para encontrar tu siguiente página: negocios, recursos, contenidos y ayuda. También puedes ubicar la ciudad en el mapa geográfico.">
    <nav aria-label="Secciones del mapa" className="flex flex-wrap gap-3"><a className="editorial-chip" href="#categorias">Categorías</a><a className="editorial-chip" href="#guias">Guías</a><a className="editorial-chip" href="#articulos">Artículos</a><a className="editorial-chip" href="#mapa-lima">Mapa de Lima</a></nav>
    {sections.map(([title, links]) => <section className="editorial-card" key={title}><h2 className="text-2xl font-bold mb-5">{title}</h2>{list(links)}</section>)}
    <section id="categorias" className="editorial-card scroll-mt-28"><h2 className="text-2xl font-bold mb-5">Categorías de negocios y servicios</h2>{list(CATEGORIES.map(c => [c.title.replace(/ en Lima$/, ''), `/${c.slug}`]))}</section>
    <section id="guias" className="editorial-card scroll-mt-28"><h2 className="text-2xl font-bold mb-5">Guías para contratar y comparar</h2>{list(GUIDES.map(g => [g.title, `/guias/${g.slug}`]))}</section>
    <section id="articulos" className="editorial-card scroll-mt-28"><h2 className="text-2xl font-bold mb-5">Artículos publicados</h2>{list(BLOG_POSTS.map(p => [p.title, `/blog/${p.slug}`]))}</section>
    <LimaMap/>
    <p className="text-xs text-slate-500">Portada ilustrativa generada con IA; para cartografía utiliza el mapa de OpenStreetMap. El <a href="/sitemap.xml" className="underline">sitemap XML</a> es la versión destinada a los buscadores.</p>
  </EditorialShell>;
}
