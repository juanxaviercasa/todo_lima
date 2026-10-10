import Link from 'next/link';
import EditorialShell from '../../components/EditorialShell.js';
import EditorialImage from '../../components/EditorialImage.js';
import { EDITORIAL_IMAGES } from '../../lib/editorialImages.js';
import { pageMetadata } from '../../lib/seo.js';
import { buildWhatsAppLink } from '../../lib/contact.js';
export const metadata = pageMetadata('Publica o actualiza tu negocio en Lima | Todo Lima', 'Solicita la revisión de tu ficha y presenta información útil a quienes buscan tu servicio en Lima.', '/para-negocios', EDITORIAL_IMAGES['para-negocios-lima']);
export default function ForBusinesses() {
  return <EditorialShell image={EDITORIAL_IMAGES['para-negocios-lima']} title="Tu negocio, con información que ayuda a elegir" intro="Facilita que las personas encuentren tu ubicación, entiendan tu servicio y sepan cómo contactarte.">
    <section><h2 className="text-3xl font-bold mb-6">Presenta tu negocio con claridad</h2><div className="grid md:grid-cols-3 gap-6">{[
      ['negocio-ficha', '1. Identifica tu ficha', 'Comparte el nombre, la categoría y el enlace del negocio. Si aún no aparece, envía su información pública.'],
      ['negocio-revision-solicitud', '2. Revisamos la solicitud', 'Coordinamos la información necesaria para revisar los datos y tu relación con el negocio.'],
      ['negocio-completar-datos', '3. Completa los datos', 'Presenta servicios, ubicación, contactos, horarios y condiciones vigentes. Solo atribuimos información que pueda respaldarse.']
    ].map(([id, title, text]) => <div key={id} className="editorial-card min-w-0"><EditorialImage id={id} sizes="(min-width: 768px) 400px, 100vw" /><h3 className="font-bold text-xl mt-5 mb-3">{title}</h3><p>{text}</p></div>)}</div></section>
    <section className="editorial-card"><h2 className="text-2xl font-bold mb-4">Solicita la administración o publicación</h2><p>Enviar una solicitud no publica automáticamente una ficha ni confirma titularidad. La inclusión en el directorio no garantiza visitas, consultas o ventas.</p><a className="editorial-chip mt-6" data-contact-event="claim_listing" href={buildWhatsAppLink('Hola Todo Lima, soy titular o representante de un negocio y quiero solicitar la revisión o publicación de su ficha. Nombre y enlace: ')}>Coordinar mi ficha por WhatsApp →</a></section>
    <section className="grid md:grid-cols-2 gap-8 items-center"><EditorialImage id="negocio-digital" sizes="(min-width: 768px) 600px, 100vw" /><div><h2 className="text-2xl font-bold mb-4">¿Necesitas mejorar tu presencia digital?</h2><p>También puedes consultar sobre sitio web, organización de consultas y automatización de atención. Se acuerdan alcance y condiciones por separado; contratar estos servicios no modifica las valoraciones del directorio.</p><Link className="editorial-chip mt-5" href="/auditoria">Conocer la auditoría digital</Link></div></section>
    <p className="text-xs text-slate-500">Imágenes editoriales generadas con IA para representar situaciones habituales; no muestran negocios específicos ni testimonios.</p>
    <Link className="underline text-sky-600" href="/metodologia">Lee nuestra metodología y política de independencia</Link>
  </EditorialShell>;
}
