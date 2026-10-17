import Link from 'next/link';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import JsonLd from '../../components/JsonLd.js';
import { TOOL_IMAGES, TOOLS_HERO, getToolImage } from '../../lib/toolImages.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../lib/seo.js';
import {
  QrCode,
  Coins,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

const baseMetadata = pageMetadata(
  'Herramientas y Calculadoras para Negocios en Lima | Todo Lima',
  'Centro de utilidades gratuitas para comercios y pymes en Lima Metropolitana: calculadora de IGV 18%, generador de QR para WhatsApp, flete local, cotizaciones y contratos.',
  '/herramientas',
  TOOLS_HERO
);

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: [{ url: `${SITE_URL}${TOOLS_HERO.src}`, width: 1440, height: 810, alt: TOOLS_HERO.alt }],
  },
};

const CATEGORY_COLOR_STYLES = {
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400',
  sky: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400',
  amber: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
  violet: 'bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400',
};

const TOOLS_DATA = [
  {
    id: 'finanzas-sunat',
    category: 'Finanzas & SUNAT',
    subtitle: 'Cálculo tributario de IGV (18%), costos de planilla laboral, cronogramas de crédito y control de caja en soles',
    categoryIcon: Coins,
    color: 'emerald',
    tools: [
      {
        slug: 'calculadora-precios-venta-igv',
        title: 'Calculadora de Precios con IGV (18% SUNAT)',
        description: 'Calcula al instante el valor de venta, IGV desglosado y precio final al consumidor conforme a la normativa tributaria peruana.',
        url: 'https://nubeparapymes.online/herramientas/finanzas/calculadora-precios-venta-igv/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-calculadora-precios-venta-igv',
        badge: 'SUNAT Perú',
        popular: true
      },
      {
        slug: 'calculadora-sobrecostos-laborales',
        title: 'Calculadora de Sobrecostos Laborales Perú',
        description: 'Simula el costo real de planilla: régimen mype, gratificaciones, CTS, EsSalud (9%) y vacaciones en el Perú.',
        url: 'https://nubeparapymes.online/herramientas/finanzas/calculadora-sobrecostos-laborales/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-calculadora-sobrecostos-laborales',
        badge: 'Laboral Perú'
      },
      {
        slug: 'calculadora-prestamos-amortizaciones',
        title: 'Calculadora de Préstamos y Amortizaciones',
        description: 'Evalúa cronogramas de pago, cuotas fijas, método francés y costo financiero total para financiamiento comercial.',
        url: 'https://nubeparapymes.online/herramientas/finanzas/calculadora-prestamos-amortizaciones/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-calculadora-prestamos-amortizaciones',
        badge: 'Financiero'
      },
      {
        slug: 'flujo-caja-pymes',
        title: 'Flujo de Caja y Cobranzas para Pymes',
        description: 'Plantilla interactiva para proyectar ingresos semanales, egresos fijos y control de cuentas por cobrar en soles.',
        url: 'https://nubeparapymes.online/herramientas/finanzas/flujo-caja-pymes/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-flujo-caja-pymes',
        badge: 'Operativo'
      }
    ]
  },
  {
    id: 'ventas-operaciones',
    category: 'Ventas, Cobros & Envíos Locales',
    subtitle: 'Contacto por WhatsApp mediante QR, estimación de tarifas de reparto en Lima, proformas, cotizaciones y CRM',
    categoryIcon: QrCode,
    color: 'sky',
    tools: [
      {
        slug: 'generador-codigos-qr',
        title: 'Generador de enlaces y códigos QR para WhatsApp',
        description: 'Crea un enlace de WhatsApp con mensaje predefinido y un código QR para facilitar consultas desde tu mostrador, vitrina o redes.',
        url: 'https://nubeparapymes.online/herramientas/ventas/generador-codigos-qr/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-generador-codigos-qr',
        badge: 'WhatsApp',
        popular: true
      },
      {
        slug: 'calculadora-flete-envio-local',
        title: 'Calculadora de Flete y Envíos Locales en Lima',
        description: 'Estima costos y tarifas de despacho por distancia y peso para entregas entre los 43 distritos de Lima Metropolitana.',
        url: 'https://nubeparapymes.online/herramientas/operaciones/calculadora-flete-envio-local/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-calculadora-flete-envio-local',
        badge: 'Lima & Callao',
        popular: true
      },
      {
        slug: 'creador-facturas-proforma',
        title: 'Creador de Facturas Proforma y Presupuestos',
        description: 'Genera documentos proforma formales con logo, RUC, detalle de productos y cálculo automático de totales para clientes.',
        url: 'https://nubeparapymes.online/herramientas/ventas/creador-facturas-proforma/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-creador-facturas-proforma',
        badge: 'Comercial'
      },
      {
        slug: 'generador-cotizaciones',
        title: 'Generador de Cotizaciones Comerciales',
        description: 'Ideal para técnicos, gasfiteros, carpinteros, vidrierías y pintores que necesitan enviar cotizaciones claras por WhatsApp.',
        url: 'https://nubeparapymes.online/herramientas/ventas/generador-cotizaciones/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-generador-cotizaciones',
        badge: 'Servicios Técnicos'
      },
      {
        slug: 'crm-pymes',
        title: 'Micro CRM y Pipeline Comercial',
        description: 'Gestiona prospectos, estados de negociación y tareas de seguimiento de ventas sin pagar suscripciones mensuales.',
        url: 'https://nubeparapymes.online/herramientas/ventas/crm-pymes/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-crm-pymes',
        badge: 'Ventas'
      }
    ]
  },
  {
    id: 'legal-contratos',
    category: 'Legal & Contratos para Pymes',
    subtitle: 'Documentos comerciales alineados al Código Civil peruano y lineamientos de protección al consumidor (Indecopi)',
    categoryIcon: ShieldCheck,
    color: 'amber',
    tools: [
      {
        slug: 'generador-contratos-servicios',
        title: 'Generador de Contratos de Prestación de Servicios',
        description: 'Minuta contractual redactada bajo el Código Civil peruano para proteger tus acuerdos comerciales y plazos de entrega.',
        url: 'https://nubeparapymes.online/herramientas/legal/generador-contratos-servicios/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-generador-contratos-servicios',
        badge: 'Legal Perú'
      },
      {
        slug: 'generador-politicas-devolucion',
        title: 'Generador de Políticas de Devolución y Garantías',
        description: 'Define condiciones de cambio, reembolso y garantías para tu tienda física o virtual según la Ley de Protección al Consumidor.',
        url: 'https://nubeparapymes.online/herramientas/legal/generador-politicas-devolucion/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-generador-politicas-devolucion',
        badge: 'Indecopi'
      },
      {
        slug: 'generador-politicas-terminos',
        title: 'Generador de Términos y Condiciones Web',
        description: 'Genera los términos de uso estándar para tu sitio web, catálogo digital o landing page comercial.',
        url: 'https://nubeparapymes.online/herramientas/legal/generador-politicas-terminos/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-generador-politicas-terminos',
        badge: 'Web Legal'
      }
    ]
  },
  {
    id: 'marketing-web',
    category: 'Marketing Digital & Rendimiento Web',
    subtitle: 'Diagnóstico SEO técnico, compresión de imágenes a WebP, redacción comercial e identidad visual corporativa',
    categoryIcon: TrendingUp,
    color: 'violet',
    tools: [
      {
        slug: 'auditor-seo-basico',
        title: 'Auditor SEO Básico y Estructura Web',
        description: 'Audita títulos, etiquetas meta, jerarquía H1-H3 y legibilidad móvil para mejorar el posicionamiento en Google.',
        url: 'https://nubeparapymes.online/herramientas/marketing/auditor-seo-basico/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-auditor-seo-basico',
        badge: 'SEO Técnico'
      },
      {
        slug: 'conversor-optimizador-imagenes',
        title: 'Optimizador y Conversor a Formato WebP',
        description: 'Reduce el peso de las fotos de tus productos y servicios hasta en un 80% sin perder calidad visual.',
        url: 'https://nubeparapymes.online/herramientas/productividad/conversor-optimizador-imagenes/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-conversor-optimizador-imagenes',
        badge: 'Velocidad Web',
        popular: true
      },
      {
        slug: 'analizador-titulares',
        title: 'Analizador de Titulares Persuasivos',
        description: 'Evalúa la fuerza emocional y tasa de clics de los titulares de tus anuncios, publicaciones o promociones.',
        url: 'https://nubeparapymes.online/herramientas/marketing/analizador-titulares/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-analizador-titulares',
        badge: 'Copywriting'
      },
      {
        slug: 'generador-paletas-corporativas',
        title: 'Generador de Paletas Corporativas',
        description: 'Crea combinaciones de colores contrastadas y profesionales para la imagen gráfica de tu comercio.',
        url: 'https://nubeparapymes.online/herramientas/productividad/generador-paletas-corporativas/?utm_source=todolima&utm_medium=referral&utm_campaign=ecosistema&utm_content=herramientas-generador-paletas-corporativas',
        badge: 'Branding'
      }
    ]
  }
];

export default function HerramientasHubPage() {
  const allTools = TOOLS_DATA.flatMap(cat => cat.tools);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main id="contenido" className="flex-1 min-w-0 [overflow-wrap:anywhere]">
        {/* Cabecera Principal */}
        <section className="tools-hero editorial-hero relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
          <div className="editorial-hero-media">
            <img
              {...TOOLS_HERO}
              sizes="100vw"
              width="1440"
              height="810"
              fetchPriority="high"
              loading="eager"
              className="block w-full h-auto object-contain"
            />
            <div className="category-hero-shade absolute inset-0" aria-hidden="true" />
          </div>

          <div className="editorial-hero-copy max-w-7xl mx-auto relative z-10">
            <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-semibold mb-4 uppercase tracking-wider">
              <Link href="/" className="hover:underline">Inicio</Link>
              <span>/</span>
              <span className="text-slate-300">Herramientas</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>Red Aliada • Herramientas Gratuitas para Negocios del Perú</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 max-w-3xl lg:max-w-[60%]">
              Centro de Herramientas y Calculadoras Comerciales
            </h1>

            <p className="text-base sm:text-lg text-slate-100 max-w-2xl lg:max-w-[55%] leading-relaxed mb-6">
              Calculadoras tributarias, cotizadores, generadores de QR y recursos operativos diseñados para optimizar la gestión de comercios y pymes en Lima Metropolitana.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300 max-w-2xl">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> 100% Gratuitas
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Adaptadas a Normativa de Perú (SUNAT)
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Tutoriales y Fórmulas Detalladas
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-7" aria-label="Categorías de herramientas">
              {TOOLS_DATA.map((cat) => {
                const Icon = cat.categoryIcon;
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                    <span>{cat.category}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Listado de Categorías y Herramientas */}
        <section className="max-w-6xl mx-auto px-4 py-14 sm:px-6 lg:px-8 space-y-14">
          {TOOLS_DATA.map((cat, idx) => {
            const Icon = cat.categoryIcon;
            const iconColorClass = CATEGORY_COLOR_STYLES[cat.color] || CATEGORY_COLOR_STYLES.sky;
            return (
              <div key={cat.id || idx} id={cat.id} className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColorClass}`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {cat.category}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.subtitle || 'Recursos especializados para optimizar tus procesos diarios'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {cat.tools.map((tool, tIdx) => {
                    const toolImage = getToolImage(tool.url) || TOOL_IMAGES[new URL(tool.url).pathname];
                    return (
                      <article
                        key={tIdx}
                        data-tool-card
                        className="group relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <Link
                            href={`/herramientas/${tool.slug}`}
                            className="block overflow-hidden bg-slate-100 dark:bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                            aria-label={`Ver tutorial y fórmulas de ${tool.title}`}
                          >
                            <img
                              {...toolImage}
                              sizes="(min-width: 768px) 550px, 100vw"
                              width="960"
                              height="540"
                              loading="lazy"
                              decoding="async"
                              className="block w-full h-auto aspect-video object-contain bg-slate-100 dark:bg-slate-950 group-hover:scale-[1.015] transition-transform duration-300"
                            />
                          </Link>

                          <div className="p-5 pb-0">
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                                {tool.badge}
                              </span>
                              {tool.popular && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                                  <Sparkles className="w-2.5 h-2.5" aria-hidden="true" /> Popular
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                              <Link
                                href={`/herramientas/${tool.slug}`}
                                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors focus:outline-none focus-visible:underline"
                              >
                                {tool.title}
                              </Link>
                            </h3>

                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {tool.description}
                            </p>
                          </div>
                        </div>

                        {/* Footer con doble acción diferenciada */}
                        <div className="p-5 pt-4">
                          <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                            <Link
                              href={`/herramientas/${tool.slug}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/60 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 text-xs font-semibold border border-slate-200/80 dark:border-slate-700 transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-sky-500" aria-hidden="true" />
                              <span>Ver tutorial y fórmulas</span>
                            </Link>

                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-colors"
                              aria-label={`Abrir herramienta interactiva ${tool.title} en nueva pestaña`}
                            >
                              <span>Abrir herramienta</span>
                              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
        <p className="max-w-6xl mx-auto px-6 pb-8 text-xs text-slate-500 dark:text-slate-400">
          Imágenes ilustrativas generadas con IA; no representan negocios ni usuarios reales de las herramientas.
        </p>

        {/* Sección de Conversión B2B Todo Lima */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Crecimiento Comercial para Negocios en Lima
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ¿Quieres organizar tus consultas y presencia digital en Lima?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Las calculadoras ordenan tu operación interna, pero el crecimiento constante requiere atender bien cada consulta. En Todo Lima ayudamos a los comercios a presentar mejor su propuesta web, ordenar el seguimiento comercial y evaluar qué procesos automatizar en WhatsApp.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auditoria"
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <span>Consultar Revisión Digital</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/para-negocios"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-all border border-slate-700"
              >
                Publicar o Corregir mi Ficha
              </Link>

              <Link
                href="/"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs sm:text-sm font-bold transition-all border border-slate-800"
              >
                Explorar el Directorio de Lima
              </Link>
            </div>
          </div>
        </section>

        <JsonLd
          data={breadcrumbs([
            ['Inicio', '/'],
            ['Herramientas', '/herramientas']
          ])}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Herramientas y Calculadoras para Negocios en Lima',
            url: `${SITE_URL}/herramientas`,
            description: 'Centro de utilidades gratuitas para comercios y pymes en Lima Metropolitana: calculadora de IGV 18%, generador de QR para WhatsApp, flete local, cotizaciones y contratos.',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: allTools.length,
              itemListElement: allTools.map((tool, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: tool.title,
                description: tool.description,
                url: tool.url.split('?')[0],
              })),
            },
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
