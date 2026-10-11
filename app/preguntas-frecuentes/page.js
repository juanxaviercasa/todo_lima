import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import {INSTITUTIONAL_IMAGES} from '../../lib/institutionalImages.js';
import {pageMetadata} from '../../lib/seo.js';

export const metadata = pageMetadata('Preguntas frecuentes | Todo Lima', 'Resuelve dudas sobre búsqueda de negocios, fichas, fuentes, contacto y contenidos de Todo Lima.', '/preguntas-frecuentes', INSTITUTIONAL_IMAGES['preguntas-frecuentes']);
const groups = [
  ['Buscar y comparar', [
    ['¿Necesito registrarme para consultar el directorio?', 'No. Puedes explorar las categorías, usar sus filtros y consultar la información pública sin crear una cuenta.'],
    ['¿Cómo encuentro negocios en mi distrito?', 'Entra en una categoría y utiliza los filtros de distrito o el buscador. Si necesitas atención a domicilio, confirma la cobertura con cada negocio: su dirección no acredita cobertura en toda Lima.'],
    ['¿Todo Lima contrata el servicio por mí?', 'No. El contacto y el acuerdo se realizan directamente con el proveedor. Todo Lima no confirma reservas, precios ni disponibilidad.']
  ]],
  ['Fichas y fuentes', [
    ['¿De dónde sale la información?', 'Las fichas parten de información pública. Mostramos las fuentes y fechas disponibles; revisa la metodología y confirma los datos actuales con el negocio.'],
    ['¿Aparecer en el directorio significa estar verificado?', 'No. La inclusión no certifica identidad, habilitación profesional, calidad ni seguridad. Las valoraciones externas se atribuyen a su fuente.'],
    ['¿Puedo corregir o administrar mi ficha?', 'Sí. Envía el enlace, los datos propuestos y una fuente que permita comprobarlos. Si representas al negocio, indícalo. La solicitud se revisa antes de modificar datos.']
  ]],
  ['Contenidos y herramientas', [
    ['¿Quién es responsable de los contenidos?', 'Actualmente el responsable editorial es Xavier Cabello Salirrosas. La página de equipo editorial explica sus funciones y el uso de asistencia automatizada.'],
    ['¿Las imágenes muestran negocios reales?', 'Las imágenes editoriales generadas con IA son ilustrativas, salvo que se indique un origen distinto. No constituyen testimonios ni fotografías documentales de negocios listados.'],
    ['¿Dónde se abren las herramientas?', 'La sección Herramientas enlaza recursos del ecosistema aliado. Al abrirlos puedes acceder a otro sitio con sus propias condiciones y políticas de privacidad.']
  ]],
  ['Contacto y privacidad', [
    ['¿Cómo puedo enviar una consulta?', 'Desde el formulario de Contacto puedes elegir un tema y enviar tu mensaje. También puedes escribir a contacto@todolima.com o usar el WhatsApp oficial.'],
    ['¿Enviar una consulta me suscribe a publicidad?', 'No. Los datos del formulario se utilizan para gestionar y responder la consulta. La autorización para esa finalidad no es una suscripción comercial.'],
    ['¿Dónde presento una reclamación o solicitud de privacidad?', 'Utiliza el Libro de Reclamaciones para reclamos sobre Todo Lima, o Derechos ARCO para solicitudes de datos personales. Las consultas sobre un servicio contratado con un negocio deben dirigirse a ese proveedor.']
  ]]
];
export default function FAQPage() {
  return <EditorialShell image={INSTITUTIONAL_IMAGES['preguntas-frecuentes']} title="Respuestas para usar Todo Lima" intro="Una ayuda práctica para explorar el directorio, entender las fichas y elegir el canal adecuado para tu consulta.">
    <nav aria-label="Temas de preguntas frecuentes" className="flex flex-wrap gap-3">{groups.map(([title], i) => <a className="editorial-chip" key={title} href={`#faq-${i}`}>{title}</a>)}</nav>
    {groups.map(([title, items], i) => <section id={`faq-${i}`} key={title} className="scroll-mt-28"><h2 className="text-2xl font-bold mb-4">{title}</h2><div className="editorial-card divide-y divide-slate-200 dark:divide-slate-700">{items.map(([q, a]) => <details key={q} className="py-4"><summary className="font-semibold cursor-pointer leading-relaxed pr-3">{q}</summary><p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{a}</p></details>)}</div></section>)}
    <div className="flex flex-wrap gap-3"><Link className="editorial-chip" href="/contacto#formulario-contacto">Enviar una consulta</Link><Link className="editorial-chip" href="/metodologia">Metodología</Link><Link className="editorial-chip" href="/correcciones">Corregir una ficha</Link></div>
    <p className="text-xs text-slate-500">Portada ilustrativa generada con IA; no representa usuarios reales.</p>
  </EditorialShell>;
}
