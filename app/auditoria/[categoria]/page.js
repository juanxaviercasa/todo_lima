import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialShell from '../../../components/EditorialShell.js';
import JsonLd from '../../../components/JsonLd.js';
import MapaCalculatorLeadMagnet from '../../../components/MapaCalculatorLeadMagnet.js';
import { getCategory, getDirectory } from '../../../lib/directory.js';
import { CATEGORY_DETAILS } from '../../../lib/categoryEditorial.js';
import { getBuyerPersona } from '../../../auditor/config/buyerPersonas.js';
import { pageMetadata, breadcrumbs, SITE_URL } from '../../../lib/seo.js';
import { buildWhatsAppLink } from '../../../lib/contact.js';

export const dynamicParams = false;

export function generateStaticParams() {
  return getDirectory().map((c) => ({ categoria: c.meta.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategory(params.categoria);
  if (!category) return {};
  const cleanName = category.meta.title.replace(' en Lima', '');
  const persona = getBuyerPersona(category.meta.slug, category.meta.title, category.meta.niche);
  const description = `Diagnóstico comercial MAPA, calculadora de fuga de consultas en WhatsApp y guiones de recepción para negocios de ${cleanName.toLowerCase()} en Lima (${persona.icpB2B.decisionMaker}).`;
  return pageMetadata(
    `Auditoría Comercial y Calculadora MAPA para ${cleanName} en Lima | Todo Lima`,
    description,
    `/auditoria/${category.meta.slug}`,
    `/images/categories/${category.meta.slug.replace(/-/g, '_')}.webp`
  );
}

export default function CategoryAuditB2BPage({ params }) {
  const category = getCategory(params.categoria);
  if (!category) notFound();

  const { meta, businesses } = category;
  const cleanName = meta.title.replace(' en Lima', '');
  const persona = getBuyerPersona(meta.slug, meta.title, meta.niche);
  const [scope, criteria] = CATEGORY_DETAILS[meta.slug] || [
    'servicios especializados en Lima',
    'alcance del servicio, presupuesto y condiciones de garantía',
  ];

  const { icpB2B, endCustomerAvatar, hookStoryOffer } = persona;
  const contactHref = buildWhatsAppLink(
    `Hola Todo Lima y Hazlo Crecer, soy ${icpB2B.decisionMaker} (${cleanName}) y deseo consultar un Diagnóstico Estratégico MAPA para mi negocio en Lima. Mi web o ficha es: `
  );

  const relatedCategories = getDirectory()
    .filter((c) => c.meta.niche === meta.niche && c.meta.slug !== meta.slug)
    .slice(0, 6);

  const crumbs = [
    ['Inicio', '/'],
    ['Auditoría Digital', '/auditoria'],
    [cleanName, `/auditoria/${meta.slug}`],
  ];

  return (
    <EditorialShell
      title={`Auditoría Comercial MAPA: ${cleanName} en Lima`}
      intro={hookStoryOffer.hook}
      image={`/images/categories/${meta.slug.replace(/-/g, '_')}.webp`}
      trail={[['Auditoría Digital', '/auditoria']]}
      action={{ href: '#calculadora-mapa', label: 'Calcular mi fuga en soles (Gratis)' }}
    >
      {/* Bloque 1: Realidad Operativa del Propietario (ICP B2B) */}
      <section className="grid md:grid-cols-2 gap-6 min-w-0">
        <div className="editorial-card min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
            Perfil del Decisor B2B · {cleanName}
          </p>
          <h2 className="text-2xl font-bold mb-3">{icpB2B.decisionMaker}</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            <strong>Realidad diaria en Lima:</strong> {icpB2B.dailyReality}
          </p>
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-sm text-rose-900 dark:text-rose-200">
            <strong>Cuello de botella principal detectado en el rubro:</strong> {icpB2B.primaryBottleneck}
          </div>
        </div>

        <div className="editorial-card min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              El Cambio de Oportunidad · Metodología MAPA
            </p>
            <h2 className="text-2xl font-bold mb-3">Por qué las soluciones tradicionales fallan</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {hookStoryOffer.story}
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-sm text-emerald-900 dark:text-emerald-200">
              <strong>Nueva Oportunidad:</strong> {icpB2B.opportunitySwitch}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
            <a href={contactHref} className="editorial-chip">
              Solicitar Diagnóstico MAPA por WhatsApp →
            </a>
            <Link href={`/${meta.slug}`} className="editorial-chip">
              Ver directorio público ({businesses.length} fichas)
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque 2: Regalo B2B #3 - Radiografía del Comprador Limeño (End-Customer Avatar) */}
      <section className="editorial-card min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
          Regalo de Inteligencia de Mercado · Radiografía del Cliente Ideal en Lima
        </p>
        <h2 className="text-2xl font-bold mb-2">
          Cómo decide hoy tu cliente potencial: {endCustomerAvatar.archetypeName}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
          Perfil demográfico observado en Lima Metropolitana: <strong>{endCustomerAvatar.demographics}</strong>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
            <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1.5">
              1. Deseo Ardiente
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {endCustomerAvatar.burningDesire}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
            <h3 className="font-bold text-sm text-rose-700 dark:text-rose-400 mb-1.5">
              2. Miedo Visceral al Cotizar
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {endCustomerAvatar.visceralFear}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
            <h3 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-1.5">
              3. Evento Disparador (Trigger)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {endCustomerAvatar.triggerEvent}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
            <h3 className="font-bold text-sm text-sky-700 dark:text-sky-400 mb-1.5">
              4. Comportamiento Móvil
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {endCustomerAvatar.mobileBehavior}
            </p>
          </div>
        </div>
      </section>

      {/* Bloque 3: Calculadora Interactiva MAPA + Kit de 3 Guiones WhatsApp */}
      <div id="calculadora-mapa" className="scroll-mt-24">
        <MapaCalculatorLeadMagnet
          categorySlug={meta.slug}
          categoryTitle={meta.title}
          persona={persona}
          criteria={criteria}
        />
      </div>

      {/* Bloque 4: Derribando las 3 Falsas Creencias del Rubro */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Preguntas frecuentes y mitos operativos en {cleanName}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="editorial-card">
            <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-2">
              Mito #1 · Sobre el Sistema (Vehículo)
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {icpB2B.falseBeliefs.vehicle}
            </p>
          </div>
          <div className="editorial-card">
            <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-2">
              Mito #2 · Sobre tu Tiempo (Interno)
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {icpB2B.falseBeliefs.internal}
            </p>
          </div>
          <div className="editorial-card">
            <p className="text-xs font-bold uppercase text-sky-600 dark:text-sky-400 mb-2">
              Mito #3 · Sobre el Mercado en Lima (Externo)
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {icpB2B.falseBeliefs.external}
            </p>
          </div>
        </div>
      </section>

      {/* Bloque 5: Plan de Acción 30-60-90 Días */}
      <section className="editorial-card bg-slate-950 text-white border-slate-800">
        <h2 className="text-2xl font-bold mb-3">
          {hookStoryOffer.offer}
        </h2>
        <p className="text-slate-300 leading-relaxed mb-5">
          {icpB2B.theBigDomino}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={contactHref}
            className="inline-block rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-3"
          >
            Coordinar Diagnóstico MAPA por WhatsApp →
          </a>
          <Link
            href="/para-negocios"
            className="inline-block rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-900 font-semibold px-5 py-3"
          >
            Solo deseo actualizar mi ficha pública
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-4">
          Nota metodológica: Los parámetros económicos pre-cargados corresponden a referencias sectoriales en Lima y se clasifican como hipótesis por validar hasta completar el levantamiento con datos reportados por el titular. Contratar servicios de consultoría o automatización no modifica las valoraciones ni el orden del directorio público.
        </p>
      </section>

      {/* Enlazado Interno a Otras Auditorías Verticales */}
      {relatedCategories.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Diagnósticos MAPA en rubros relacionados
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedCategories.map((c) => (
              <Link
                key={c.meta.slug}
                href={`/auditoria/${c.meta.slug}`}
                className="editorial-chip"
              >
                Auditoría: {c.meta.title.replace(' en Lima', '')}
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Auditoría Comercial MAPA para ${cleanName} en Lima`,
          url: `${SITE_URL}/auditoria/${meta.slug}`,
          description: hookStoryOffer.hook,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />
    </EditorialShell>
  );
}
