import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import JsonLd from '../../components/JsonLd.js';
import {INSTITUTIONAL_IMAGES} from '../../lib/institutionalImages.js';
import {LEGAL_TITULAR, LEGAL_DEV_URL} from '../../lib/contact.js';
import {pageMetadata, SITE_URL} from '../../lib/seo.js';

export const metadata = pageMetadata('Equipo editorial y autor | Todo Lima', 'Conoce al único responsable editorial actual de Todo Lima, Xavier Cabello Salirrosas, y nuestros criterios de publicación y corrección.', '/equipo-editorial', INSTITUTIONAL_IMAGES['equipo-editorial']);
export default function EditorialTeamPage() {
  return <EditorialShell image={INSTITUTIONAL_IMAGES['equipo-editorial']} title="Una persona detrás. Criterios claros." intro="Hoy Todo Lima tiene un único responsable editorial: Xavier Cabello Salirrosas. Esta página explica quién responde por el proyecto, sin presentar un equipo que no existe.">
    <section className="editorial-card"><p className="text-sm text-sky-600 font-semibold mb-2">Responsable del proyecto y de la edición</p><h2 className="text-3xl font-bold mb-4">{LEGAL_TITULAR}</h2><p>Organiza la dirección del proyecto, la planificación de contenidos y el desarrollo tecnológico de Todo Lima. Cuando un artículo aparece firmado como “Equipo editorial de Todo Lima”, esa firma identifica la publicación del sitio y su responsabilidad corresponde actualmente a Xavier Cabello Salirrosas; no implica varios autores.</p><a className="editorial-chip mt-5" href={LEGAL_DEV_URL} target="_blank" rel="noopener noreferrer">Conocer su sitio personal →</a></section>
    <section className="grid md:grid-cols-2 gap-5">{[
      ['Información con fuentes', 'Diferenciamos datos del directorio, contexto editorial y enlaces de origen. Un contenido no acredita por sí mismo calidad, habilitación profesional ni disponibilidad de un negocio.'],
      ['Asistencia automatizada', 'El proyecto utiliza automatización y herramientas de IA en la preparación de textos, organización y generación de imágenes. Esto no sustituye la responsabilidad editorial ni debe presentarse como una experiencia personal no documentada.'],
      ['Sin perfiles inventados', 'No atribuimos artículos a especialistas ficticios, ni publicamos credenciales o retratos sintéticos como si correspondieran a autores reales.'],
      ['Correcciones y límites', 'Un dato puede quedar desactualizado. Puedes enviar el enlace, la observación y una fuente para revisar una corrección. Las guías generales no sustituyen asesoramiento profesional individual.']
    ].map(([title, text]) => <div className="editorial-card" key={title}><h2 className="text-xl font-bold mb-3">{title}</h2><p>{text}</p></div>)}</section>
    <div className="flex flex-wrap gap-3"><Link className="editorial-chip" href="/metodologia">Fuentes y metodología</Link><Link className="editorial-chip" href="/contacto#formulario-contacto">Contactar al responsable editorial</Link></div>
    <p className="text-xs text-slate-500">La portada es una ilustración generada con IA de un espacio de edición. No es una fotografía del autor ni de su oficina.</p>
    <JsonLd data={{'@context':'https://schema.org','@type':'ProfilePage',url:SITE_URL+'/equipo-editorial',mainEntity:{'@type':'Person','@id':SITE_URL+'/#editor',name:LEGAL_TITULAR,url:LEGAL_DEV_URL,sameAs:[LEGAL_DEV_URL]}}}/>
  </EditorialShell>;
}
