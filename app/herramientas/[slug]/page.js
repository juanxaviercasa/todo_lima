import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
import JsonLd from '../../../components/JsonLd.js';
import {
  ALL_TOOLS,
  getAllToolSlugs,
  getToolBySlug,
  getRelatedTools,
} from '../../../lib/toolsCatalog.js';
import { getToolImage } from '../../../lib/toolImages.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../../lib/seo.js';
import {
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Calculator,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Store,
  Info,
} from 'lucide-react';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const toolImage = getToolImage(tool.url);
  const baseMeta = pageMetadata(
    `${tool.name} | Tutorial y Fórmulas | Todo Lima`,
    `${tool.shortDesc} Guía paso a paso para usar la herramienta interactiva, mapa de interfaz, fórmulas matemáticas y caso resuelto en Lima.`,
    `/herramientas/${tool.slug}`,
    toolImage
  );

  return {
    ...baseMeta,
    openGraph: {
      ...baseMeta.openGraph,
      images: toolImage ? [{ url: `${SITE_URL}${toolImage.src}`, width: 960, height: 540, alt: toolImage.alt }] : [],
    },
  };
}

export default function HerramientaDetailPage({ params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  const toolImage = getToolImage(tool.url);
  const relatedTools = getRelatedTools(tool.slug, 3);

  const jsonLdData = [
    breadcrumbs([
      ['Inicio', '/'],
      ['Herramientas', '/herramientas'],
      [tool.name, `/herramientas/${tool.slug}`],
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `Cómo usar ${tool.name}`,
      description: tool.purpose,
      step: tool.tutorialSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.stepTitle,
        text: `${step.uiTarget}: ${step.instruction} ${step.whatHappens}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.appTitle || tool.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      url: tool.url.split('?')[0],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'PEN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main id="contenido" className="flex-1 min-w-0 [overflow-wrap:anywhere]">
        {/* Cabecera / Hero */}
        <header className="relative bg-slate-950 text-white border-b border-slate-800 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
            <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-xs text-sky-400 font-semibold mb-6 uppercase tracking-wider">
              <Link href="/" className="hover:underline">Inicio</Link>
              <span>/</span>
              <Link href="/herramientas" className="hover:underline">Herramientas</Link>
              <span>/</span>
              <span className="text-slate-300">{tool.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{tool.categoryTitle}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                    {tool.badge}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {tool.name}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {tool.heroSubtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold shadow-lg shadow-sky-500/20 transition-all"
                  >
                    <span>Abrir herramienta interactiva</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <a
                    href="#tutorial"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400" aria-hidden="true" />
                    <span>Ver tutorial y fórmulas</span>
                  </a>
                </div>
              </div>

              {toolImage && (
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                    <img
                      {...toolImage}
                      sizes="(min-width: 1024px) 460px, 100vw"
                      width="960"
                      height="540"
                      fetchPriority="high"
                      loading="eager"
                      className="block w-full h-auto aspect-video object-contain bg-slate-900"
                    />
                    <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-medium truncate max-w-[240px]">{tool.appTitle}</span>
                      <span className="text-emerald-400 font-bold shrink-0">100% Gratuita</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accesos rápidos */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
              <a href="#proposito" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                1. Para qué sirve
              </a>
              <a href="#interfaz" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                2. Mapa de la interfaz
              </a>
              <a href="#tutorial" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                3. Tutorial paso a paso
              </a>
              <a href="#formulas" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                4. Fórmulas matemáticas
              </a>
              <a href="#ejemplo" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                5. Caso práctico resuelto
              </a>
              <a href="#usos-diarios" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                6. Uso diario y errores
              </a>
              <a href="#faqs" className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors">
                7. Preguntas frecuentes
              </a>
            </div>
          </div>
        </header>

        {/* Contenido Editorial y Tutorial */}
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">
          {/* Sección 1: Propósito */}
          <section id="proposito" className="scroll-mt-24 space-y-4">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" aria-hidden="true" />
              <span>Diagnóstico Operativo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              ¿Qué problema resuelve en el día a día de tu negocio?
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <p>{tool.purpose}</p>
            </div>
          </section>

          {/* Sección 2: Mapa de la Interfaz */}
          <section id="interfaz" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Anatomía de la Aplicación</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Mapa de Controles, Pestañas y Paneles
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Esta es la estructura exacta que encontrarás al abrir la herramienta interactiva:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tool.interfaceMap.map((zone, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                        Zona {idx + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        {zone.controls.length} controles clave
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {zone.zone}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Controles en pantalla:
                    </p>
                    <ul className="space-y-1.5">
                      {zone.controls.map((ctrl, cIdx) => (
                        <li key={cIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" aria-hidden="true" />
                          <span>{ctrl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sección 3: Tutorial Paso a Paso */}
          <section id="tutorial" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Guía Operativa Pantalla por Pantalla</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Tutorial Paso a Paso: Cómo Usar la Herramienta
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Sigue estas instrucciones exactas para operar la interfaz interactiva y obtener resultados precisos:
              </p>
            </div>

            <div className="space-y-4">
              {tool.tutorialSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-5 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                    {idx + 1}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                        {step.uiTarget}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.stepTitle}
                    </h3>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step.instruction}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200 font-semibold">Respuesta de la herramienta: </strong>
                        <span>{step.whatHappens}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sección 4: Fórmulas Matemáticas */}
          <section id="formulas" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" aria-hidden="true" />
              <span>Lógica de Cálculo y Auditoría</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Fórmulas Matemáticas y Lógica Interna
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Estas son las ecuaciones exactas que ejecuta el motor de la aplicación y cómo puedes verificarlas manualmente:
              </p>
            </div>

            <div className="space-y-5">
              {tool.formulas.map((form, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span>{form.title}</span>
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-sm sm:text-base border border-slate-800 overflow-x-auto">
                    <code>{form.expression}</code>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Variables:
                    </p>
                    {form.variables.map((v, vIdx) => (
                      <p key={vIdx} className="pl-3 border-l-2 border-slate-300 dark:border-slate-700">
                        {v}
                      </p>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 leading-relaxed">
                    <strong className="text-slate-900 dark:text-white font-semibold">Explicación técnica: </strong>
                    {form.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Sección 5: Caso Práctico Resuelto en Soles */}
          <section id="ejemplo" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              <span>Simulación Real en Lima</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Caso Práctico Resuelto Paso a Paso
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Ejemplo real con los datos exactos que debes digitar en la herramienta y los resultados obtenidos:
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 bg-slate-950 text-white border-b border-slate-800">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Escenario Comercial</span>
                <h3 className="text-lg font-bold mt-1 text-white">{tool.workedExample.scenarioTitle}</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{tool.workedExample.context}</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    1. Datos digitados en los campos de la herramienta:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tool.workedExample.inputs.map((inp, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">{inp.field}</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{inp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    2. Traza matemática ejecutada por el motor:
                  </h4>
                  <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-4 list-decimal">
                    {tool.workedExample.calculationSteps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                    3. Tarjetas de resultados mostradas en pantalla:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tool.workedExample.outputs.map((out, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                            {out.label}
                          </span>
                          <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white block">
                            {out.value}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 block">
                          {out.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-sky-900 dark:text-sky-300 font-bold block mb-1">Conclusión y toma de decisión:</strong>
                  {tool.workedExample.decision}
                </div>
              </div>
            </div>
          </section>

          {/* Sección 6: Rutinas de Uso Diario y Errores Frecuentes */}
          <section id="usos-diarios" className="scroll-mt-24 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Store className="w-4 h-4" aria-hidden="true" />
                <span>Operación Cotidiana</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Cómo Integrar esta Herramienta en el Día a Día
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {tool.dailyUseCases.map((useCase, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {useCase.role}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {useCase.workflow}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="errores" className="scroll-mt-24 space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>Prevención de Errores</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                3 Errores Frecuentes al Usar la Aplicación (y Cómo Evitarlos)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tool.commonMistakes.map((mis, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-3">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Error Común {idx + 1}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      "{mis.mistake}"
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-amber-200/60 dark:border-amber-800/40">
                      <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Corrección: </strong>
                      {mis.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sección 7: Preguntas Frecuentes */}
          <section id="faqs" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span>Dudas Comunes</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Preguntas Frecuentes sobre {tool.name}
              </h2>
            </div>

            <div className="space-y-4">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-start gap-2.5">
                    <span className="text-sky-500 font-black">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Sección 8: Rubros Relacionados en el Directorio de Lima */}
          <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Ecosistema Todo Lima</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Rubros y Negocios en Lima que Utilizan esta Herramienta
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Conoce proveedores verificados, asesores y servicios en Lima relacionados con esta operativa:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tool.relatedCategorySlugs.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/${cat.slug}`}
                  className="group p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center justify-between gap-1 transition-colors">
                      <span>{cat.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 shrink-0 transition-colors" aria-hidden="true" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {cat.reason}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 mt-3 block">
                    Ver negocios en Lima →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Sección 9: Herramientas Complementarias */}
          {relatedTools.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Herramientas Recomendadas</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    Complementa tu Gestión Operativa
                  </h2>
                </div>
                <Link href="/herramientas" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
                  Ver las 16 herramientas →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedTools.map((relTool, idx) => (
                  <Link
                    key={idx}
                    href={`/herramientas/${relTool.slug}`}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {relTool.badge}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1.5">
                        {relTool.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {relTool.shortDesc}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-4 flex items-center gap-1">
                      <span>Ver tutorial y fórmulas</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Sección 10: Call To Action Principal */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-6 shadow-xl relative overflow-hidden">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Herramienta Interactiva Gratuita</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
              ¿Listo para usar {tool.name}?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              La herramienta se ejecuta 100% en tu navegador de forma gratuita, privada y sin necesidad de crear ninguna cuenta.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                <span>Abrir {tool.name}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>

              <Link
                href="/herramientas"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition-all border border-slate-700 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Volver al Catálogo de Herramientas</span>
              </Link>
            </div>
          </section>
        </div>

        {jsonLdData.map((data, idx) => (
          <JsonLd key={idx} data={data} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
