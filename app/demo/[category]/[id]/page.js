import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { generatePrototypeBlueprint } from '../../../../auditor/engine/prototypeGenerator.js';
import { extractDistrict, parsePhone } from '../../../../auditor/engine/districtExtractor.js';

export async function generateMetadata({ params }) {
  const { category, id } = params;
  return {
    title: `Prototipo Web Oficial — ${category} en Lima`,
    description: `Página web de alta conversión diseñada exclusivamente para negocios de ${category} en Lima Metropolitana.`
  };
}

export default function DemoPrototypePage({ params }) {
  const { category, id } = params;
  
  // Intentar cargar blueprint pregenerado
  const blueprintPath = path.join(process.cwd(), 'audits', 'prototypes', category, `${id}.json`);
  let blueprint = null;

  if (fs.existsSync(blueprintPath)) {
    try {
      blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf-8'));
    } catch (e) {
      blueprint = null;
    }
  }

  // Fallback: Si no existe el archivo guardado, generarlo en caliente desde data/[category].json
  if (!blueprint) {
    const dataPath = path.join(process.cwd(), 'data', `${category}.json`);
    if (fs.existsSync(dataPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        const biz = (raw.businesses || []).find(b => b.id === id) || (raw.businesses || [])[0];
        if (biz) {
          const district = extractDistrict(biz.address);
          const phoneData = parsePhone(biz.phone);
          blueprint = generatePrototypeBlueprint(biz, category, district, phoneData);
        }
      } catch (err) {
        blueprint = null;
      }
    }
  }

  if (!blueprint) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Prototipo no encontrado</h1>
          <p className="text-slate-400 mb-6">No se encontraron datos para la categoría {category} e id {id}.</p>
          <Link href="/auditoria" className="bg-sky-500 hover:bg-sky-600 px-5 py-2.5 rounded-xl font-bold">
            Volver a la Auditoría
          </Link>
        </div>
      </div>
    );
  }

  const { theme, hero, valuePillars, services, processSteps, faqs } = blueprint;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Banner de Prototipo Comercial Exclusivo */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-4 py-2 text-xs font-black tracking-wide text-center sticky top-0 z-50 shadow-md flex items-center justify-center gap-2 flex-wrap">
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>PROTOTIPO EXCLUSIVO DISEÑADO PARA: <strong>{blueprint.name.toUpperCase()}</strong></span>
        <span className="hidden sm:inline">•</span>
        <span className="text-[11px] font-bold bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md">
          Listo para Desplegar en {blueprint.suggestedSubdomain}
        </span>
      </div>

      {/* Header del Negocio */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-8 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-sky-500/20">
              {blueprint.name.charAt(0)}
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-white block leading-tight">
                {blueprint.name}
              </span>
              <span className="text-xs text-sky-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {blueprint.district}, Lima
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {blueprint.phoneData?.raw && (
              <span className="hidden md:inline-flex text-xs text-slate-300 font-mono bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                📞 {blueprint.phoneData.raw}
              </span>
            )}
            <a
              href={blueprint.waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Contactar WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* HÉROE DE ALTA CONVERSIÓN */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            {hero.headline}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={blueprint.waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl transition flex items-center gap-2 shadow-xl shadow-emerald-500/25 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>{hero.primaryCta}</span>
            </a>
            <a
              href="#servicios"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition border border-slate-700"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Atención Inmediata
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              100% Confiable
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              {blueprint.district}
            </span>
          </div>
        </div>
      </section>

      {/* PILARES DE CONFIANZA */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {valuePillars.map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
                <div className="text-xl mb-2">⭐</div>
                <h4 className="font-bold text-white text-sm mb-1">{p.title}</h4>
                <p className="text-xs text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE SERVICIOS */}
      <section id="servicios" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sky-400 text-xs font-black uppercase tracking-widest">Servicios Destacados</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            Lo que Hacemos por Ti en {blueprint.name}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Soluciones integrales diseñadas con los más altos estándares para clientes exigentes en {blueprint.district}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Garantía y Calidad
                </span>
                <a
                  href={blueprint.waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1"
                >
                  <span>Cotizar servicio</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO TRABAJAMOS (3 PASOS) */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Atención Rápida</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Tu Consulta Resuelta en 3 Pasos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative">
                <span className="text-4xl font-black text-slate-800 block mb-2">{st.step}</span>
                <h4 className="text-base font-bold text-white mb-1">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQS) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sky-400 text-xs font-black uppercase tracking-widest">Resuelve tus Dudas</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-sm sm:text-base font-bold text-white mb-2">{f.q}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UBICACIÓN Y FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">{blueprint.name}</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{blueprint.address}</span>
            </p>
          </div>

          <div className="text-xs text-slate-500 text-right">
            <p>© {new Date().getFullYear()} {blueprint.name}. Todos los derechos reservados.</p>
            <p className="mt-1">
              Verificado en el Directorio Oficial de{' '}
              <a href="https://todolima.com" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                Todo Lima
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Botón Flotante Fijo de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={blueprint.waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all"
        >
          <MessageCircle className="w-6 h-6 fill-slate-950" />
          <span className="text-xs sm:text-sm">Agendar / Cotizar</span>
        </a>
      </div>
    </div>
  );
}
