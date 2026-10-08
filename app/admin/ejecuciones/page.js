import fs from 'fs';
import path from 'path';
import { CATEGORIES } from '../../../scraper/config/categories.js';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Cpu, 
  Sparkles, 
  FolderCheck,
  RefreshCw
} from 'lucide-react';

export const metadata = {
  title: 'Consola de Ejecuciones & Automatización | Todo Lima Admin',
  description: 'Control de scrapers, auditorías y generación de datos.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminEjecucionesPage() {
  const dataDir = path.join(process.cwd(), 'data');
  const auditsDir = path.join(process.cwd(), 'audits');

  // Evaluar estado real de cada categoría
  const categoryStats = CATEGORIES.map(cat => {
    const filePath = path.join(dataDir, `${cat.slug}.json`);
    let exists = false;
    let businessCount = 0;
    let updatedAt = null;

    if (fs.existsSync(filePath)) {
      exists = true;
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        businessCount = (parsed.businesses || []).length;
        updatedAt = parsed.updatedAt || null;
      } catch (e) {}
    }

    return {
      slug: cat.slug,
      title: cat.title,
      niche: cat.niche,
      exists,
      businessCount,
      updatedAt
    };
  });

  const completedCount = categoryStats.filter(c => c.exists && c.businessCount > 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Motor de Ejecución de Tareas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Consola de Ejecuciones & Control de Scraping
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Supervisa el estado de la base de datos de las 38 categorías locales y los atajos para correr Playwright y auditorías.
        </p>
      </div>

      {/* Tarjetas de Métricas de Ejecución */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>Categorías Procesadas</span>
            <FolderCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{completedCount} / {CATEGORIES.length}</div>
          <div className="text-xs text-emerald-300 mt-1">Archivos JSON generados y listos</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>Pendientes por Scrapear</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">{CATEGORIES.length - completedCount}</div>
          <div className="text-xs text-amber-300 mt-1">Categorías en espera de extracción</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase mb-2">
            <span>Motor de Scraping</span>
            <Cpu className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold text-white">Playwright 24/7</div>
          <div className="text-xs text-sky-400 mt-1">Headless Chromium con anti-detección</div>
        </div>
      </div>

      {/* Recetario de Comandos de Ejecución */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Comandos de Ejecución Local / Servidor</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-sans font-bold block">1. Extracción de Google Maps (Playwright)</span>
            <div className="text-sky-300 bg-slate-900/80 p-2.5 rounded-lg select-all">
              node scraper/runner.js --slug doctores
            </div>
            <p className="text-slate-500 text-[11px] font-sans">
              Extrae los mejores negocios de la categoría especificada y los guarda en <code className="text-slate-400">data/[slug].json</code>.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-sans font-bold block">2. Bucle de Scraping Continuo Desatendido</span>
            <div className="text-sky-300 bg-slate-900/80 p-2.5 rounded-lg select-all">
              npm run runner:loop
            </div>
            <p className="text-slate-500 text-[11px] font-sans">
              Ejecuta todas las categorías pendientes una tras otra con pausas aleatorias de seguridad.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-sans font-bold block">3. Auditoría Comercial Rápida (Sin esperas HTTP)</span>
            <div className="text-emerald-300 bg-slate-900/80 p-2.5 rounded-lg select-all">
              npm run audit:fast
            </div>
            <p className="text-slate-500 text-[11px] font-sans">
              Procesa todas las categorías y genera los pitches de WhatsApp y rankings en segundos.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-sans font-bold block">4. Generar Prototipos Web de Alta Conversión</span>
            <div className="text-purple-300 bg-slate-900/80 p-2.5 rounded-lg select-all">
              npm run prototype:rank
            </div>
            <p className="text-slate-500 text-[11px] font-sans">
              Crea los blueprints de demostración para los negocios con mayor poder adquisitivo.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de Categorías y Estado */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white">Estado de las 38 Categorías</h3>
            <p className="text-xs text-slate-400">Registro de archivos y negocios en memoria local</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Categoría</th>
                <th className="px-5 py-3">Nicho</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3 text-right">Negocios</th>
                <th className="px-5 py-3 text-right">Comando Directo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {categoryStats.map(cat => (
                <tr key={cat.slug} className="hover:bg-slate-800/40 transition">
                  <td className="px-5 py-3.5 font-bold text-white">
                    {cat.title.split(' en Lima')[0]}
                    <span className="block text-[11px] font-mono text-slate-400 font-normal">{cat.slug}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-300 capitalize">{cat.niche}</td>
                  <td className="px-5 py-3.5">
                    {cat.exists ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Extraído
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <Clock className="w-3 h-3" /> Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-white">
                    {cat.businessCount}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-sky-400 select-all">
                    node scraper/runner.js --slug {cat.slug}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
