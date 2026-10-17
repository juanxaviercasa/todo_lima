import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import { EDITORIAL_IMAGES } from '../../lib/editorialImages.js';
import { pageMetadata } from '../../lib/seo.js';
import { buildWhatsAppLink } from '../../lib/contact.js';
import { PURCHASING_POWER_RANKING } from '../../auditor/config/purchasingPowerRanking.js';

export const metadata = pageMetadata('Revisión digital para negocios en Lima | Todo Lima', 'Consulta sobre presencia web, organización de consultas y automatización. Acordamos alcance y presupuesto según tu negocio.', '/auditoria', EDITORIAL_IMAGES['negocio-revision-solicitud']);

export default function DigitalReview() {
  const contact = buildWhatsAppLink('Hola Todo Lima, quiero consultar una revisión digital de mi negocio. Mi sitio o ficha es: . Necesito ayuda con: presencia web / organización de consultas / automatización.');
  return <EditorialShell title="Convierte tu presencia digital en un siguiente paso claro" intro="Cuéntanos qué necesita tu negocio en Lima. Revisamos el objetivo contigo y acordamos el alcance antes de proponer una solución." image={EDITORIAL_IMAGES['negocio-revision-solicitud']} action={{ href: contact, label: "Consultar mi revisión digital" }}>
    <section><h2 className="text-2xl font-bold mb-5">¿Qué quieres mejorar?</h2><div className="grid md:grid-cols-3 gap-5">{[
      ['Presencia web', 'Presentar tus servicios, ubicación y formas de contacto en una web que ayude a decidir.'],
      ['Organización de consultas', 'Identificar dónde se pierden consultas y cómo registrar solicitudes, seguimiento y próximas acciones.'],
      ['Automatización', 'Evaluar tareas repetitivas y definir qué puede automatizarse con revisión humana y qué debe seguir atendiendo una persona.']
    ].map(([title, text]) => <div key={title} className="editorial-card"><h3 className="text-xl font-bold mb-3">{title}</h3><p>{text}</p></div>)}</div></section>
    <section aria-labelledby="calculadoras-rubro" className="editorial-card"><h2 id="calculadoras-rubro" className="text-2xl font-bold mb-3">Calculadoras de Fuga Comercial MAPA y Guiones por Rubro</h2><p className="text-slate-600 dark:text-slate-300 mb-5">Selecciona el rubro de tu negocio en Lima para acceder gratuitamente a la radiografía de tu cliente ideal, la calculadora interactiva de ingresos por consultas en WhatsApp y los 3 guiones de recepción de tu sector:</p><div className="flex flex-wrap gap-2.5">{PURCHASING_POWER_RANKING.map(item => <Link key={item.slug} href={`/auditoria/${item.slug}`} className="editorial-chip text-xs sm:text-sm">{(item.name || item.slug).replace(' en Lima', '')}</Link>)}</div></section>
    <section aria-labelledby="proceso-revision"><h2 id="proceso-revision" className="text-2xl font-bold mb-5">Cómo pasamos de la consulta a una propuesta</h2><ol className="grid md:grid-cols-3 gap-5 list-none">{[
      ['1. Entendemos el objetivo', 'Comparte tu web o ficha, el servicio que ofreces y la tarea que quieres mejorar. No envíes contraseñas ni datos de tus clientes.'],
      ['2. Delimitamos la revisión', 'Acordamos qué páginas o procesos revisar, qué información hace falta y las condiciones de esa revisión.'],
      ['3. Definimos el siguiente paso', 'Si hay una oportunidad de trabajo, recibirás una propuesta con prioridades, entregables, presupuesto y plazos acordados antes de contratar.']
    ].map(([title, description]) => <li key={title} className="editorial-card"><h3 className="text-xl font-bold mb-3">{title}</h3><p>{description}</p></li>)}</ol></section>
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-4">Qué puede incluir el alcance acordado</h2><ul className="list-disc pl-6 space-y-3"><li>Revisión de cómo presentas tus servicios y de los pasos de contacto.</li><li>Identificación de problemas de navegación, lectura y funcionamiento en móvil.</li><li>Priorización de mejoras de web o tareas que convenga automatizar.</li><li>Propuesta de implementación y mantenimiento cuando corresponda.</li></ul><p className="mt-5">El alcance depende del caso. No se garantiza una posición en Google, un volumen de ventas ni una mejora de las valoraciones del directorio. La consulta inicial sirve para coordinar; no equivale a una auditoría entregada.</p></section>
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-4">Conversemos sobre tu caso</h2><p>Comparte el nombre de tu negocio, su web o ficha, y el problema que quieres resolver. Coordinaremos la revisión y, si corresponde, una propuesta con alcance, condiciones y presupuesto. Esta consulta no contrata ni publica nada automáticamente.</p><a href={contact} data-contact-event="digital_review_inquiry" className="editorial-chip mt-6">Consultar mi caso por WhatsApp →</a></section>
    <section><h2 className="text-2xl font-bold mb-4">Prepara la decisión con recursos gratuitos</h2><p>Nube para Pymes reúne herramientas y guías para ordenar el trabajo antes de elegir software o contratar una implementación.</p><ul className="list-disc pl-6 mt-4 space-y-3">
      <li><a className="underline text-sky-700 dark:text-sky-300" href="https://nubeparapymes.online/herramientas/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=auditoria">Explorar las herramientas de Nube para Pymes</a></li>
      <li><a className="underline text-sky-700 dark:text-sky-300" href="https://nubeparapymes.online/crm-con-ia-para-pymes-que-automatizar/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=auditoria">Qué revisar antes de automatizar un CRM</a></li>
    </ul></section>
    <section className="editorial-card"><h2 className="text-xl font-bold mb-3">¿Solo necesitas publicar o corregir una ficha?</h2><p>Ese proceso tiene un recorrido propio. Contratar un servicio digital no altera las valoraciones ni la metodología del directorio.</p><Link href="/para-negocios" className="editorial-chip mt-5">Solicitar revisión de mi ficha →</Link></section>
    <section aria-labelledby="dudas-revision"><h2 id="dudas-revision" className="text-2xl font-bold mb-4">Antes de escribirnos</h2><div className="space-y-4">
      <details className="editorial-card"><summary className="font-bold cursor-pointer">¿Es una revisión gratuita?</summary><p className="mt-3">Puedes iniciar la conversación para explicar tu caso. El trabajo de revisión o implementación se acuerda con su alcance y presupuesto; no se ofrece una auditoría completa gratuita por defecto.</p></details>
      <details className="editorial-card"><summary className="font-bold cursor-pointer">¿Necesito tener una web?</summary><p className="mt-3">No. Si hoy trabajas con una ficha o redes sociales, comparte esos enlaces y describe qué necesitas. Podemos evaluar contigo si una web sería un siguiente paso útil.</p></details>
      <details className="editorial-card"><summary className="font-bold cursor-pointer">¿La consulta se envía automáticamente?</summary><p className="mt-3">El botón abre WhatsApp con un mensaje que puedes editar. Tú decides si enviarlo. También puedes usar la página de contacto de Todo Lima.</p><Link href="/contacto" className="underline">Ir a contacto →</Link></details>
    </div></section>
  </EditorialShell>;
}
