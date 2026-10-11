import Link from 'next/link';
import {Mail, MessageCircle, ArrowRight} from 'lucide-react';
import EditorialShell from '../../components/EditorialShell.js';
import JsonLd from '../../components/JsonLd.js';
import {TODOLIMA_EMAIL, TODOLIMA_WHATSAPP_DISPLAY, buildWhatsAppLink} from '../../lib/contact.js';
import {pageMetadata, SITE_URL, breadcrumbs} from '../../lib/seo.js';

export const metadata = pageMetadata('Contacto | Todo Lima', 'Contacta con Todo Lima en contacto@todolima.com: consultas, correcciones de fichas, colaboración editorial y atención para negocios.', '/contacto');

export default function ContactPage() {
  return <EditorialShell title="Conversemos sobre Todo Lima" intro="Consultas sobre el directorio, colaboración y atención para negocios. Elige el canal adecuado para que podamos revisar tu mensaje.">
    <section className="grid md:grid-cols-2 gap-6">
      <div className="editorial-card space-y-4"><Mail className="text-sky-600" size={28} aria-hidden="true"/><h2 className="text-2xl font-bold">Correo oficial</h2><p>Para consultas generales, propuestas de colaboración y comentarios sobre nuestros contenidos.</p><a href={`mailto:${TODOLIMA_EMAIL}`} className="text-xl font-semibold text-sky-700 dark:text-sky-300 underline break-all">{TODOLIMA_EMAIL}</a><p className="text-sm text-slate-500">El enlace abre tu aplicación de correo. No envía mensajes automáticamente.</p></div>
      <div className="editorial-card space-y-4"><MessageCircle className="text-emerald-600" size={28} aria-hidden="true"/><h2 className="text-2xl font-bold">WhatsApp para negocios</h2><p>Para coordinar la revisión de una ficha, consultar servicios digitales o presentarnos tu negocio.</p><a href={buildWhatsAppLink('Hola Todo Lima, quiero hacer una consulta sobre el directorio.')} target="_blank" rel="noopener noreferrer" className="editorial-chip">Escribir al {TODOLIMA_WHATSAPP_DISPLAY} <ArrowRight size={16} aria-hidden="true"/></a><p className="text-sm text-slate-500">Es el canal de Todo Lima, no el de los negocios listados.</p></div>
    </section>
    <section><h2 className="text-2xl font-bold mb-5">¿En qué podemos ayudarte?</h2><div className="grid sm:grid-cols-2 gap-5">{[
      ['Corregir información de una ficha', 'Comparte el enlace de la ficha, el dato incorrecto y una fuente que permita revisarlo.', '/correcciones', 'Solicitar una corrección'],
      ['Publicar o administrar tu negocio', 'Indica el nombre del negocio, categoría, ubicación y tu relación con él.', '/para-negocios', 'Atención para negocios'],
      ['Privacidad y datos personales', 'Consulta el procedimiento para ejercer tus derechos sin publicar documentación personal.', '/derechos-arco', 'Consultar derechos ARCO'],
      ['Reclamos sobre Todo Lima', 'Usa nuestro canal específico de reclamaciones. Para acuerdos con un proveedor, contacta directamente con ese negocio.', '/libro-de-reclamaciones', 'Libro de reclamaciones']
    ].map(([title, text, href, label]) => <div className="editorial-card" key={href}><h3 className="text-xl font-bold mb-3">{title}</h3><p>{text}</p><Link href={href} className="inline-block mt-4 text-sky-700 dark:text-sky-300 underline">{label} →</Link></div>)}</div></section>
    <section className="editorial-card space-y-4"><h2 className="text-2xl font-bold">Antes de escribirnos</h2><ul className="list-disc pl-5 space-y-3"><li>Incluye el asunto de tu consulta y, si corresponde, el enlace de la página o ficha.</li><li>No envíes contraseñas, datos bancarios ni documentación personal que no te hayamos solicitado por un canal adecuado.</li><li>Para horarios, reservas, precios o disponibilidad, utiliza el contacto del negocio que aparece en su ficha.</li></ul><p className="text-sm text-slate-500">Las solicitudes requieren revisión; enviar un mensaje no modifica ni publica una ficha automáticamente. Consulta nuestra <Link href="/privacidad" className="underline">política de privacidad</Link>.</p></section>
    <JsonLd data={breadcrumbs([['Inicio', '/'], ['Contacto', '/contacto']])}/>
    <JsonLd data={{'@context':'https://schema.org','@type':'ContactPage',name:'Contacto de Todo Lima',url:SITE_URL+'/contacto',description:metadata.description,mainEntity:{'@id':SITE_URL+'/#organization','@type':'Organization',name:'Todo Lima',url:SITE_URL,email:TODOLIMA_EMAIL}}}/>
  </EditorialShell>;
}
