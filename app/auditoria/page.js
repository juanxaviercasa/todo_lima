import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import { EDITORIAL_IMAGES } from '../../lib/editorialImages.js';
import { pageMetadata } from '../../lib/seo.js';
import { buildWhatsAppLink } from '../../lib/contact.js';

export const metadata = pageMetadata('Revisión digital para negocios en Lima | Todo Lima', 'Consulta sobre presencia web, organización de consultas y automatización. Acordamos alcance y presupuesto según tu negocio.', '/auditoria', EDITORIAL_IMAGES['negocio-revision-solicitud']);

export default function DigitalReview() {
  const contact = buildWhatsAppLink('Hola Todo Lima, quiero consultar una revisión digital de mi negocio. Mi sitio o ficha es: . Necesito ayuda con: presencia web / organización de consultas / automatización.');
  return <EditorialShell title="Convierte tu presencia digital en un siguiente paso claro" intro="Cuéntanos qué necesita tu negocio en Lima. Revisamos el objetivo contigo y acordamos el alcance antes de proponer una solución." image={EDITORIAL_IMAGES['negocio-revision-solicitud']}>
    <section><h2 className="text-2xl font-bold mb-5">¿Qué quieres mejorar?</h2><div className="grid md:grid-cols-3 gap-5">{[
      ['Presencia web', 'Presentar tus servicios, ubicación y formas de contacto en una web que ayude a decidir.'],
      ['Organización de consultas', 'Identificar dónde se pierden consultas y cómo registrar solicitudes, seguimiento y próximas acciones.'],
      ['Automatización', 'Evaluar tareas repetitivas y definir qué puede automatizarse con revisión humana y qué debe seguir atendiendo una persona.']
    ].map(([title, text]) => <div key={title} className="editorial-card"><h3 className="text-xl font-bold mb-3">{title}</h3><p>{text}</p></div>)}</div></section>
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-4">Conversemos sobre tu caso</h2><p>Comparte el nombre de tu negocio, su web o ficha, y el problema que quieres resolver. Coordinaremos la revisión y, si corresponde, una propuesta con alcance, condiciones y presupuesto. Esta consulta no contrata ni publica nada automáticamente.</p><a href={contact} data-contact-event="digital_review_inquiry" className="editorial-chip mt-6">Consultar mi caso por WhatsApp →</a></section>
    <section><h2 className="text-2xl font-bold mb-4">Prepara la decisión con recursos gratuitos</h2><p>Nube para Pymes reúne herramientas y guías para ordenar el trabajo antes de elegir software o contratar una implementación.</p><ul className="list-disc pl-6 mt-4 space-y-3">
      <li><a className="underline text-sky-700 dark:text-sky-300" href="https://nubeparapymes.online/herramientas/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=auditoria">Explorar las herramientas de Nube para Pymes</a></li>
      <li><a className="underline text-sky-700 dark:text-sky-300" href="https://nubeparapymes.online/crm-con-ia-para-pymes-que-automatizar/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=auditoria">Qué revisar antes de automatizar un CRM</a></li>
    </ul></section>
    <section className="editorial-card"><h2 className="text-xl font-bold mb-3">¿Solo necesitas publicar o corregir una ficha?</h2><p>Ese proceso tiene un recorrido propio. Contratar un servicio digital no altera las valoraciones ni la metodología del directorio.</p><Link href="/para-negocios" className="editorial-chip mt-5">Solicitar revisión de mi ficha →</Link></section>
  </EditorialShell>;
}
