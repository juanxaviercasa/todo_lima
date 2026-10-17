import Link from 'next/link';
import { GUIDES } from '../lib/guides.js';
import { getBuyerPersona } from '../auditor/config/buyerPersonas.js';

const scenarios = {
  'museos-de-lima-como-elegir-una-visita-segun-tus-intereses': ['turismo-virtual-quiebra-aerolineas', '¿Qué cambiaría si el turismo fuera virtual?'],
  'que-visitar-centro-historico-lima': ['turismo-virtual-quiebra-aerolineas', 'Un escenario sobre el futuro del turismo virtual'],
};

const BLOG_CATEGORY_DEFAULTS = {
  'gastronomia-limena': ['cevicherias', 'pollerias', 'cafeterias'],
  'planes-y-bienestar': ['spas', 'gimnasios', 'fisioterapia'],
  'vida-practica': ['gasfiteros', 'cerrajeros', 'mudanzas'],
  'negocios-locales': ['contadores', 'abogados', 'agentes-inmobiliarios'],
  'barrios-y-distritos': ['agentes-inmobiliarios', 'arquitectura', 'cafeterias'],
  'lugares-y-patrimonio': ['fotografia-eventos', 'cafeterias', 'locales-de-eventos'],
  'cultura-y-tradiciones': ['tortas-personalizadas', 'catering', 'florerias'],
  'historia-de-lima': ['arquitectura', 'notarias', 'librerias'],
};

const KEYWORD_TO_CATEGORY = [
  [/dent|odont|ortodonc|sonrisa/i, 'dentistas'],
  [/m[eé]dic|salud|cl[ií]nic|consulta/i, 'doctores'],
  [/psicol|terapia|ansiedad|emocional/i, 'psicologos'],
  [/mascota|perro|gato|veterinar/i, 'veterinarias'],
  [/ba[ñn]o.*perro|grooming|peluquer[ií]a canina/i, 'grooming-canino'],
  [/mudanza|traslado.*mueble|embalaje/i, 'mudanzas'],
  [/gasfiter|fuga.*agua|tuber[ií]a/i, 'gasfiteros'],
  [/cerrajer|llave|cerradura/i, 'cerrajeros'],
  [/el[eé]ctric|tablero|cortocircuito/i, 'electricistas'],
  [/pintor|pintura|pared/i, 'pintores'],
  [/remodela|obra|arquitect/i, 'arquitectura'],
  [/inmueble|departamento|alquiler.*vivienda|inmobiliar/i, 'agentes-inmobiliarios'],
  [/abogad|legal|contrato|notar/i, 'abogados'],
  [/contad|sunat|impuesto|tribut/i, 'contadores'],
  [/auto|veh[ií]culo|mec[aá]nic|taller/i, 'talleres-mecanicos'],
  [/cevich|marino|pescado/i, 'cevicherias'],
  [/pollo a la brasa|poller[ií]a/i, 'pollerias'],
  [/caf[eé]|cafeter[ií]a|desayuno/i, 'cafeterias'],
  [/evento|boda|celebraci[oó]n|catering/i, 'catering'],
  [/gimnasio|entrenamiento|deporte|cancha/i, 'gimnasios'],
];

function matchCategoriesForPost(post) {
  const haystack = `${post.slug} ${post.title} ${post.description || ''} ${(post.tags || []).join(' ')}`;
  const matched = [];
  for (const [regex, catSlug] of KEYWORD_TO_CATEGORY) {
    if (regex.test(haystack) && !matched.includes(catSlug)) {
      matched.push(catSlug);
    }
  }
  const defaults = BLOG_CATEGORY_DEFAULTS[post.category] || ['dentistas', 'gasfiteros', 'abogados'];
  for (const d of defaults) {
    if (!matched.includes(d)) matched.push(d);
  }
  return matched.slice(0, 2);
}

function referral(host, path, slug) {
  return `https://${host}${path}?${new URLSearchParams({ utm_source: 'todolima', utm_medium: 'referral', utm_campaign: 'ecosistema', utm_content: slug })}`;
}

export default function EcosystemResources({ post }) {
  const business = post.category === 'negocios-locales' || post.slug === 'revisar-informacion-negocio-lima';
  const scenario = scenarios[post.slug];
  const matchedSlugs = matchCategoriesForPost(post);
  const primarySlug = matchedSlugs[0];
  const primaryGuide = GUIDES.find((g) => g.category === primarySlug);
  const primaryPersona = getBuyerPersona(primarySlug, primarySlug, '');

  return (
    <aside className="editorial-card mt-10 space-y-6" aria-label="Recursos complementarios y herramientas gratuitas">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
          Herramientas Gratuitas Todo Lima · Para Usuarios y Negocios
        </p>
        <h2 className="text-xl font-bold mb-3">Un siguiente paso según lo que necesitas</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
            <h3 className="font-bold text-base mb-1.5">
              1. ¿Buscas contratar un servicio en Lima?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Usa nuestro checklist anti-sorpresas y generador de consulta para WhatsApp antes de pedir presupuesto.
            </p>
            <div className="flex flex-wrap gap-2">
              {primaryGuide && (
                <Link href={`/guias/${primaryGuide.slug}`} className="editorial-chip text-xs">
                  Ver Checklist: {primarySlug.replace(/-/g, ' ')} →
                </Link>
              )}
              <Link href={`/${primarySlug}`} className="editorial-chip text-xs">
                Directorio de {primarySlug.replace(/-/g, ' ')} →
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
            <h3 className="font-bold text-base mb-1.5">
              2. ¿Diriges un negocio en Lima? ({primaryPersona.icpB2B.decisionMaker})
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Simula cuántas consultas pierdes al mes en WhatsApp con la Calculadora MAPA y copia los 3 guiones de recepción.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/auditoria/${primarySlug}`} className="editorial-chip text-xs">
                Calculadora MAPA y Kit de Guiones →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {business && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <p>
            Si eres titular o representante de un negocio, puedes solicitar la revisión de tu ficha. Para organizar consultas y seguimiento, consulta también las herramientas de Nube para Pymes.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link href="/para-negocios" className="editorial-chip">
              Revisar mi ficha de negocio →
            </Link>
            <a
              className="editorial-chip"
              href={referral('nubeparapymes.online', '/herramientas/', post.slug)}
              data-ecosystem-destination="nubeparapymes"
            >
              Herramientas para organizar mi negocio →
            </a>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/auditoria" className="underline">
              Consultar sobre web y automatización
            </Link>
          </p>
        </div>
      )}

      {scenario && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <p>
            Para continuar con una lectura de ficción especulativa y sus posibles consecuencias, explora este escenario de Mundos Simulados. No es una predicción ni una fuente sobre el lugar visitado.
          </p>
          <a
            className="inline-block underline text-sky-700 dark:text-sky-300 mt-4"
            href={referral('mundossimulados.online', `/${scenario[0]}/`, post.slug)}
            data-ecosystem-destination="mundossimulados"
          >
            {scenario[1]} →
          </a>
        </div>
      )}
    </aside>
  );
}
