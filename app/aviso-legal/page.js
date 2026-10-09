import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Scale, Building2, ShieldCheck, Mail, Phone, Globe } from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY, 
  LEGAL_TITULAR, 
  LEGAL_ENTITY_NAME, 
  LEGAL_DOMICILE,
  LEGAL_DEV_URL 
} from '../../lib/contact';

export const metadata = {
  title: 'Aviso Legal e Información Corporativa | Todo Lima',
  description: 'Información societaria, titularidad del dominio todolima.com, marco de operación legal y condiciones de propiedad intelectual en el Perú.',
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 mb-4">
            <Scale className="w-8 h-8 text-sky-500 dark:text-sky-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-300">
              Marco Jurídico Institucional • República del Perú
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Aviso Legal e Identificación del Titular
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            En cumplimiento del principio de transparencia mercantil y del marco legal de comercio electrónico del Perú • todolima.com
          </p>

          <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            
            {/* 1. Datos Identificativos */}
            <section className="p-6 rounded-xl bg-slate-900/70 border border-slate-700 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" /> 1. Datos del Titular y Responsable del Portal
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Titular y Responsable Legal:</span>
                  <strong className="text-white">{LEGAL_TITULAR}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Denominación del Proyecto:</span>
                  <strong className="text-white">{LEGAL_ENTITY_NAME} (todolima.com)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Domicilio Legal / Operativo:</span>
                  <span className="text-slate-200">{LEGAL_DOMICILE}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Correo Electrónico de Contacto:</span>
                  <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-400 underline font-medium">
                    {TODOLIMA_EMAIL}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Canal Directo de Atención:</span>
                  <span className="text-slate-200 font-medium">{TODOLIMA_WHATSAPP_DISPLAY}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Arquitectura y Desarrollo Tecnológico:</span>
                  <a href={LEGAL_DEV_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline font-medium">
                    Xavier Cabello
                  </a>
                </div>
              </div>
            </section>

            {/* 2. Objeto de la Plataforma */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">2. Objeto y Actividad de la Plataforma</h2>
              <p>
                <strong>todolima.com</strong> es una plataforma tecnológica independiente orientada a la organización, geolocalización e indexación de la oferta comercial, médica, profesional y técnica en Lima Metropolitana. Adicionalmente, provee servicios de transformación digital, desarrollo web enfocado en embudos de ventas, implementación de asistentes de inteligencia artificial y auditorías de rendimiento y ciberseguridad para negocios locales.
              </p>
            </section>

            {/* 3. Condiciones de Acceso */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">3. Condiciones de Acceso y Uso</h2>
              <p>
                El acceso al portal es libre y gratuito para los usuarios en general con fines de consulta. El usuario se compromete a hacer un uso diligente y lícito del sitio web, evitando cualquier conducta que pueda dañar la imagen, los intereses o los derechos de Todo Lima o de terceros, o que impida la normal utilización del servicio.
              </p>
            </section>

            {/* 4. Propiedad Intelectual */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">4. Propiedad Intelectual e Industrial</h2>
              <p>
                Todos los derechos sobre el diseño visual, código fuente de la aplicación, estructura de navegación, marcas, logotipos y contenidos elaborados por el equipo de Todo Lima son de titularidad exclusiva de <strong>{LEGAL_TITULAR}</strong> o cuentan con licencias legítimas de uso. Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación no autorizada de dichos elementos protegidos.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Las marcas, logotipos o nombres comerciales de los negocios listados en el directorio pertenecen a sus respectivos titulares y se incorporan exclusivamente para fines de identificación y localización pública ciudadana.
              </p>
            </section>

            {/* 5. Exclusión de Responsabilidad por Enlaces */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Enlaces Externos a Sitios de Terceros</h2>
              <p>
                Este portal contiene enlaces que conducen a páginas web, redes sociales y canales de mensajería de terceros. Todo Lima no ejerce control sobre dichos sitios externos y no asume responsabilidad alguna por sus contenidos, políticas de privacidad o prácticas comerciales.
              </p>
            </section>

            {/* 6. Normativa y Jurisdicción */}
            <section className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-2">6. Legislación Aplicable y Competencia Judicial</h2>
              <p>
                Las relaciones entre Todo Lima y los usuarios del portal se rigen por las leyes de la República del Perú. Para la resolución de cualquier conflicto o controversia judicial, ambas partes se someten a la jurisdicción exclusiva de los jueces y tribunales del Distrito Judicial de Lima, renunciando a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
