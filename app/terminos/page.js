import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FileCheck, Shield, HelpCircle } from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY,
  LEGAL_TITULAR,
  LEGAL_ENTITY_NAME,
  LEGAL_DOMICILE
} from '../../lib/contact';

export const metadata = {
  title: 'Términos y Condiciones de Uso | Todo Lima',
  description: 'Términos y Condiciones de uso del directorio de comercios y servicios tecnológicos de todolima.com.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 mb-4">
            <FileCheck className="w-8 h-8 text-sky-500 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-300">
              Marco Contractual • Todo Lima
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            Última actualización: Octubre 2026 • Lima Metropolitana, Perú
          </p>

          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Objeto y Titularidad</h2>
              <p>
                Los presentes Términos regulan el acceso y uso del portal <strong>todolima.com</strong>, una plataforma de indexación, visibilidad local y consultoría digital operada por <strong>{LEGAL_TITULAR}</strong> en representación de <strong>{LEGAL_ENTITY_NAME}</strong>, con domicilio en <strong>{LEGAL_DOMICILE}</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Naturaleza del Directorio y Fuentes Públicas</h2>
              <p>
                La información de comercios contenida en el directorio público es recopilada de fuentes de acceso público (como perfiles públicos de Google Maps y sitios web corporativos) con la finalidad de ofrecer una guía de orientación útil y geolocalizada a los ciudadanos de Lima.
              </p>
              <p className="mt-2">
                Los titulares de cualquier negocio indexado pueden reclamar, actualizar, enriquecer o solicitar la remoción gratuita de su perfil en cualquier momento mediante nuestra sección de <Link href="/baja" className="text-sky-600 dark:text-sky-400 underline font-semibold">Baja y Rectificación</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Exoneración de Responsabilidad por Servicios de Terceros</h2>
              <p>
                Todo Lima actúa exclusivamente como un canal de indexación e intermediación informativa. No garantiza, avala ni asume responsabilidad civil o contractual por la idoneidad, calidad, cumplimiento o precios de los servicios contratados con los profesionales o comercios listados en el directorio. Cualquier contratación entre un usuario y un comercio listado constituye una relación jurídica independiente.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. Servicios Tecnológicos y de Crecimiento Digital</h2>
              <p>
                Todo Lima ofrece servicios profesionales de:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Desarrollo de landing pages de alta velocidad y arquitectura de embudo de ventas.</li>
                <li>Automatización de atención con Asistentes de IA para WhatsApp 24/7 y software CRM a medida.</li>
                <li>Auditorías de ciberseguridad, blindaje WAF y hardening de infraestructura web.</li>
                <li>Estrategias de posicionamiento Local SEO, AEO (Answer Engine Optimization) y GEO (Generative Engine Optimization).</li>
              </ul>
              <p className="mt-2">
                Cualquier servicio contratado se rige por su respectiva propuesta técnica y cotización comercial formal aprobada entre las partes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">5. Política de Comunicaciones y Cero Spam</h2>
              <p>
                En estricto apego a la <strong>Ley N° 32323</strong> del Perú, Todo Lima no realiza prospección comercial invasiva no solicitada por canales privados. Las comunicaciones comerciales directas se efectúan única y exclusivamente tras el contacto previo y voluntario del interesado.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">6. Propiedad Intelectual</h2>
              <p>
                Los logotipos, software, código fuente, diseño gráfico y contenidos propios de Todo Lima son propiedad exclusiva de sus creadores y están protegidos por las leyes de propiedad intelectual de la República del Perú. Las marcas comerciales y nombres de terceros mencionados en el directorio pertenecen a sus respectivos propietarios y se muestran únicamente con fines referenciales de identificación.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">7. Ley Aplicable y Jurisdicción</h2>
              <p>
                Para cualquier controversia derivada del uso del portal o de la interpretación de estos términos, las partes se someten expresamente a la legislación vigente en la República del Perú y a la competencia de los jueces y tribunales del Distrito Judicial de Lima.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">8. Contacto y Libro de Reclamaciones</h2>
              <p>
                Para cualquier consulta respecto a estos términos, comuníquese a <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-600 dark:text-sky-400 underline">{TODOLIMA_EMAIL}</a> o al WhatsApp <strong>{TODOLIMA_WHATSAPP_DISPLAY}</strong>. Ponemos a disposición de nuestros usuarios nuestro <Link href="/libro-de-reclamaciones" className="text-sky-600 dark:text-sky-400 underline font-semibold">Libro de Reclamaciones Virtual</Link> conforme a ley.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
