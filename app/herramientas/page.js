import Link from 'next/link';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import { 
  Calculator, 
  QrCode, 
  Truck, 
  FileText, 
  Receipt, 
  Coins, 
  Briefcase, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { TODOLIMA_WHATSAPP_DISPLAY, TODOLIMA_EMAIL } from '../../lib/contact.js';

export const metadata = {
  title: 'Herramientas y Calculadoras para Negocios en Lima | Todo Lima',
  description: 'Centro de utilidades gratuitas para comercios y pymes en Lima Metropolitana: calculadora de IGV 18%, generador de QR Yape/Plin, flete local, cotizaciones y contratos.',
};

const TOOLS_DATA = [
  {
    category: 'Finanzas & SUNAT',
    categoryIcon: Coins,
    color: 'emerald',
    tools: [
      {
        title: 'Calculadora de Precios con IGV (18% SUNAT)',
        description: 'Calcula al instante el valor de venta, IGV desglosado y precio final al consumidor conforme a la normativa tributaria peruana.',
        url: 'https://nubeparapymes.online/calculadora-precios-venta-igv.html',
        badge: 'SUNAT Perú',
        popular: true
      },
      {
        title: 'Calculadora de Sobrecostos Laborales Perú',
        description: 'Simula el costo real de planilla: régimen mype, gratificaciones, CTS, EsSalud (9%) y vacaciones en el Perú.',
        url: 'https://nubeparapymes.online/calculadora-sobrecostos-laborales.html',
        badge: 'Laboral Perú'
      },
      {
        title: 'Calculadora de Préstamos y Amortizaciones',
        description: 'Evalúa cronogramas de pago, cuotas fijas, método francés y costo financiero total para financiamiento comercial.',
        url: 'https://nubeparapymes.online/calculadora-prestamos-amortizaciones.html',
        badge: 'Financiero'
      },
      {
        title: 'Flujo de Caja y Cobranzas para Pymes',
        description: 'Plantilla interactiva para proyectar ingresos semanales, egresos fijos y control de cuentas por cobrar en soles.',
        url: 'https://nubeparapymes.online/flujo-caja-pymes.html',
        badge: 'Operativo'
      }
    ]
  },
  {
    category: 'Ventas, Cobros & Envíos Locales',
    categoryIcon: QrCode,
    color: 'sky',
    tools: [
      {
        title: 'Generador de Códigos QR (Yape, Plin y WhatsApp)',
        description: 'Genera códigos QR de alta resolución listos para imprimir en tu mostrador o vitrina para cobrar con billeteras digitales.',
        url: 'https://nubeparapymes.online/generador-codigos-qr.html',
        badge: 'Yape / Plin',
        popular: true
      },
      {
        title: 'Calculadora de Flete y Envíos Locales en Lima',
        description: 'Estima costos y tarifas de despacho por distancia y peso para entregas entre los 43 distritos de Lima Metropolitana.',
        url: 'https://nubeparapymes.online/calculadora-flete-envio-local.html',
        badge: 'Lima & Callao',
        popular: true
      },
      {
        title: 'Creador de Facturas Proforma y Presupuestos',
        description: 'Genera documentos proforma formales con logo, RUC, detalle de productos y cálculo automático de totales para clientes.',
        url: 'https://nubeparapymes.online/creador-facturas-proforma.html',
        badge: 'Comercial'
      },
      {
        title: 'Generador de Cotizaciones Comerciales',
        description: 'Ideal para técnicos, gasfiteros, carpinteros, vidrierías y pintores que necesitan enviar cotizaciones claras por WhatsApp.',
        url: 'https://nubeparapymes.online/generador-cotizaciones.html',
        badge: 'Servicios Técnicos'
      },
      {
        title: 'Micro CRM y Pipeline Comercial',
        description: 'Gestiona prospectos, estados de negociación y tareas de seguimiento de ventas sin pagar suscripciones mensuales.',
        url: 'https://nubeparapymes.online/crm-pymes.html',
        badge: 'Ventas'
      }
    ]
  },
  {
    category: 'Legal & Contratos para Pymes',
    categoryIcon: ShieldCheck,
    color: 'amber',
    tools: [
      {
        title: 'Generador de Contratos de Prestación de Servicios',
        description: 'Minuta contractual redactada bajo el Código Civil peruano para proteger tus acuerdos comerciales y plazos de entrega.',
        url: 'https://nubeparapymes.online/generador-contratos-servicios.html',
        badge: 'Legal Perú'
      },
      {
        title: 'Generador de Políticas de Devolución y Garantías',
        description: 'Define condiciones de cambio, reembolso y garantías para tu tienda física o virtual según la Ley de Protección al Consumidor.',
        url: 'https://nubeparapymes.online/generador-politicas-devolucion.html',
        badge: 'Indecopi'
      },
      {
        title: 'Generador de Términos y Condiciones Web',
        description: 'Genera los términos de uso estándar para tu sitio web, catálogo digital o landing page comercial.',
        url: 'https://nubeparapymes.online/generador-politicas-terminos.html',
        badge: 'Web Legal'
      }
    ]
  },
  {
    category: 'Marketing Digital & Rendimiento Web',
    categoryIcon: TrendingUp,
    color: 'violet',
    tools: [
      {
        title: 'Auditor SEO Básico y Estructura Web',
        description: 'Audita títulos, etiquetas meta, jerarquía H1-H3 y legibilidad móvil para mejorar el posicionamiento en Google.',
        url: 'https://nubeparapymes.online/auditor-seo-basico.html',
        badge: 'SEO Técnico'
      },
      {
        title: 'Optimizador y Conversor a Formato WebP',
        description: 'Reduce el peso de las fotos de tus productos y servicios hasta en un 80% sin perder calidad visual.',
        url: 'https://nubeparapymes.online/conversor-optimizador-imagenes.html',
        badge: 'Velocidad Web',
        popular: true
      },
      {
        title: 'Analizador de Titulares Persuasivos',
        description: 'Evalúa la fuerza emocional y tasa de clics de los titulares de tus anuncios, publicaciones o promociones.',
        url: 'https://nubeparapymes.online/analizador-titulares.html',
        badge: 'Copywriting'
      },
      {
        title: 'Generador de Paletas Corporativas',
        description: 'Crea combinaciones de colores contrastadas y profesionales para la imagen gráfica de tu comercio.',
        url: 'https://nubeparapymes.online/generador-paletas-corporativas.html',
        badge: 'Branding'
      }
    ]
  }
];

export default function HerramientasHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Cabecera Principal */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-transparent to-transparent opacity-60"></div>
          
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Red Aliada • Herramientas Gratuitas para Negocios del Perú</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Centro de Herramientas y Calculadoras Comerciales
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Calculadoras tributarias, cotizadores, generadores de QR y recursos operativos diseñados para optimizar la gestión de comercios y pymes en Lima Metropolitana.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Gratuitas
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Adaptadas a Normativa de Perú (SUNAT)
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sin Registro Requerido
              </span>
            </div>
          </div>
        </section>

        {/* Listado de Categorías y Herramientas */}
        <section className="max-w-6xl mx-auto px-4 py-14 sm:px-6 lg:px-8 space-y-14">
          {TOOLS_DATA.map((cat, idx) => {
            const Icon = cat.categoryIcon;
            return (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {cat.category}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Recursos especializados para optimizar tus procesos diarios
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {cat.tools.map((tool, tIdx) => (
                    <a
                      key={tIdx}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                            {tool.badge}
                          </span>
                          {tool.popular && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" /> Popular
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center justify-between gap-2 mb-2">
                          <span>{tool.title}</span>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors shrink-0" />
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Abrir herramienta interactiva</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Sección de Conversión B2B Todo Lima */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Crecimiento Comercial para Negocios en Lima
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ¿Quieres captar más clientes en tu distrito de forma automática?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Las calculadoras ordenan tu operación interna, pero la rentabilidad depende de recibir prospectos calificados todos los días. En Todo Lima ayudamos a los comercios a modernizar su presencia web, posicionar en Google Maps y automatizar la atención en WhatsApp con Inteligencia Artificial.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auditoria"
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <span>Solicitar Auditoría Digital Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-all border border-slate-700"
              >
                Explorar el Directorio de Lima
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
