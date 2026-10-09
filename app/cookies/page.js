import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Cookie, ShieldCheck, Settings, CheckCircle2, Info } from 'lucide-react';
import { TODOLIMA_EMAIL, TODOLIMA_WHATSAPP_DISPLAY, LEGAL_TITULAR, LEGAL_ENTITY_NAME } from '../../lib/contact';

export const metadata = {
  title: 'Política de Cookies y Tecnologías de Rastreo | Todo Lima',
  description: 'Conoce cómo Todo Lima utiliza cookies y tecnologías de almacenamiento local para garantizar la seguridad, rendimiento y análisis de navegación.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 mb-4">
            <Cookie className="w-8 h-8 text-amber-500 dark:text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300">
              Transparencia Digital • Política de Cookies
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Política de Cookies y Tecnologías de Almacenamiento
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            Última actualización: Octubre 2026 • Portal: todolima.com
          </p>

          <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            
            {/* 1. Qué son */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-sky-400" /> 1. ¿Qué son las Cookies y Tecnologías Similares?
              </h2>
              <p>
                Las cookies son pequeños archivos de datos que se descargan en su dispositivo (computadora, tableta o teléfono móvil) al acceder a determinadas páginas web. Permiten a una plataforma recordar las acciones y preferencias del usuario (como idioma, filtros de búsqueda y opciones de visualización) a lo largo del tiempo, así como garantizar la seguridad de la navegación.
              </p>
              <p className="mt-2">
                Además de cookies, utilizamos tecnologías equivalentes como <em>LocalStorage</em> de HTML5 para recordar temporalmente sus filtros de búsqueda (por ejemplo, el distrito seleccionado en Lima) sin almacenar información sensible en servidores ajenos.
              </p>
            </section>

            {/* 2. Categorías de cookies */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" /> 2. Tipos de Cookies que Empleamos
              </h2>
              <div className="space-y-4">
                
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                  <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    a) Cookies Técnicas y Estrictamente Necesarias (Obligatorias)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Son esenciales para el funcionamiento básico del portal y no pueden desactivarse. Permiten la mitigación de ataques cibernéticos a través de Cloudflare (WAF), el balanceo de carga y la prevención de fraudes o consultas automatizadas maliciosas.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                  <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    b) Cookies de Personalización y Preferencias
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Permiten recordar las selecciones previas del usuario, como el distrito metropolitano seleccionado para el filtrado de directorios o el estado de aceptación del banner de consentimiento.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                  <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    c) Cookies Analíticas y de Rendimiento (Estadísticas Anónimas)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Recopilan datos cuantitativos y agregados sobre cómo los visitantes interactúan con el directorio (categorías más visitadas, tiempos de respuesta, errores de página). Estos datos se anonimizan sin asociar identificadores personales directos.
                  </p>
                </div>

              </div>
            </section>

            {/* 3. Tabla informativa */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3">3. Inventario Resumido de Cookies</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-700 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Proveedor</th>
                      <th className="p-3">Finalidad</th>
                      <th className="p-3">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-mono text-sky-400">__cf_bm / cf_clearance</td>
                      <td className="p-3">Cloudflare</td>
                      <td className="p-3">Seguridad perimetral anti-bots y protección DDoS</td>
                      <td className="p-3">30 min / 1 año</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">tl_cookie_consent</td>
                      <td className="p-3">todolima.com</td>
                      <td className="p-3">Guarda la preferencia del usuario sobre el aviso de cookies</td>
                      <td className="p-3">1 año (LocalStorage)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-sky-400">_ga / _ga_*</td>
                      <td className="p-3">Google Analytics</td>
                      <td className="p-3">Métricas agregadas de navegación y visitas anonimizadas</td>
                      <td className="p-3">13 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. Cómo gestionar cookies */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">4. ¿Cómo Administrar o Desactivar las Cookies?</h2>
              <p>
                Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador web que utilice:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
                <li><strong>Apple Safari:</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
                <li><strong>Microsoft Edge:</strong> Configuración &gt; Permisos del sitio &gt; Cookies y datos almacenados.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-400">
                Tenga en cuenta que si desactiva las cookies estrictamente necesarias, es posible que algunas funciones de seguridad o búsqueda de comercios no respondan con la fluidez óptima.
              </p>
            </section>

            {/* 5. Contacto */}
            <section className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-2">5. Contacto sobre Tratamiento de Cookies</h2>
              <p>
                Si tiene dudas sobre esta política, puede ponerse en contacto con <strong>{LEGAL_TITULAR}</strong> ({LEGAL_ENTITY_NAME}) enviando un correo a <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-400 underline">{TODOLIMA_EMAIL}</a> o a través de nuestra <Link href="/privacidad" className="text-sky-400 underline">Política de Privacidad Integral</Link>.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
