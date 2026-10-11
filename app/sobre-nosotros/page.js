import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import JsonLd from '../../components/JsonLd.js';
import {CATEGORIES} from '../../scraper/config/categories.js';
import {LEGAL_TITULAR, LEGAL_DEV_URL, TODOLIMA_EMAIL} from '../../lib/contact.js';
import {pageMetadata, SITE_URL, breadcrumbs} from '../../lib/seo.js';

export const metadata = pageMetadata('Sobre nosotros | Todo Lima', 'Conoce Todo Lima: un directorio local independiente para encontrar negocios, comparar información y explorar Lima, Perú.', '/sobre-nosotros');

export default function AboutPage() {
  return <EditorialShell title="Lima, más cerca de ti" intro="Somos Todo Lima: un directorio local independiente que reúne información de negocios y servicios para ayudarte a explorar la ciudad y elegir con más contexto.">
    <section className="grid md:grid-cols-[2fr_1fr] gap-6 items-start">
      <div className="editorial-card space-y-4"><h2 className="text-2xl font-bold">Para qué existe Todo Lima</h2><p>Encontrar un servicio no debería empezar de cero. Organizamos opciones por categoría y ubicación, mostramos la información disponible y facilitamos el contacto directo con cada proveedor.</p><p>Complementamos el directorio con guías para comparar servicios, artículos sobre la vida local y herramientas para negocios. Nuestro propósito es hacer más fácil descubrir lo que Lima ofrece, sin sustituir las comprobaciones que necesitas hacer antes de contratar.</p></div>
      <aside className="editorial-card"><p className="text-4xl font-black text-sky-600">{CATEGORIES.length}</p><p className="mt-2 font-semibold">categorías de negocios y servicios</p><p className="mt-4 text-sm text-slate-500">Organizadas para explorar Lima Metropolitana. La ubicación de un negocio no garantiza que atienda a domicilio en todos los distritos.</p><Link href="/#directorios" className="editorial-chip mt-5">Explorar el directorio →</Link></aside>
    </section>
    <section><h2 className="text-2xl font-bold mb-5">Qué puedes encontrar aquí</h2><div className="grid sm:grid-cols-2 gap-5">{[
      ['Negocios y servicios', 'Consulta categorías, direcciones, canales de contacto y fuentes disponibles.', '/#directorios'],
      ['Guías para elegir', 'Prepara preguntas y compara propuestas antes de contratar.', '/guias'],
      ['Historias y vida local', 'Explora lugares, patrimonio y decisiones cotidianas en Lima.', '/blog'],
      ['Herramientas para negocios', 'Encuentra recursos de gestión y utilidades del ecosistema aliado.', '/herramientas']
    ].map(([title, description, href]) => <div key={title} className="editorial-card"><h3 className="text-xl font-bold mb-3">{title}</h3><p>{description}</p><Link href={href} className="inline-block mt-4 text-sky-700 dark:text-sky-300 underline">Explorar →</Link></div>)}</div></section>
    <section className="editorial-card space-y-4"><h2 className="text-2xl font-bold">Transparencia antes que promesas</h2><p>Las fichas parten de información pública. Estar listado no acredita identidad, habilitación profesional, calidad ni disponibilidad. Las valoraciones externas se atribuyen a su fuente y no son reseñas propias de Todo Lima.</p><p>El directorio facilita el contacto, pero no interviene en los acuerdos entre usuarios y proveedores. Los servicios digitales para negocios se ofrecen por separado y no compran una valoración editorial.</p><div className="flex flex-wrap gap-3"><Link href="/metodologia" className="editorial-chip">Metodología y fuentes</Link><Link href="/correcciones" className="editorial-chip">Solicitar una corrección</Link></div></section>
    <section className="editorial-card space-y-4"><h2 className="text-2xl font-bold">Quién está detrás del proyecto</h2><p>El responsable del proyecto y de su desarrollo tecnológico es <a href={LEGAL_DEV_URL} className="text-sky-700 dark:text-sky-300 underline" target="_blank" rel="noopener noreferrer">{LEGAL_TITULAR}</a>. No presentamos perfiles de especialistas ni testimonios ficticios.</p><p>Si quieres conocer el proyecto, colaborar o señalar información que necesita revisión, escríbenos a <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-700 dark:text-sky-300 underline break-all">{TODOLIMA_EMAIL}</a>.</p><Link href="/contacto" className="editorial-chip">Contactar con Todo Lima →</Link></section>
    <JsonLd data={breadcrumbs([['Inicio', '/'], ['Sobre nosotros', '/sobre-nosotros']])}/>
    <JsonLd data={{'@context':'https://schema.org','@type':'AboutPage',name:'Sobre Todo Lima',url:SITE_URL+'/sobre-nosotros',description:metadata.description,about:{'@id':SITE_URL+'/#organization'}}}/>
  </EditorialShell>;
}
