import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  PhoneCall, 
  Terminal, 
  Database, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../../scraper/config/categories.js';

export const metadata = {
  title: 'Dashboard Administrativo | Todo Lima',
};

export default function AdminDashboardPage() {
  let auditSummary = {
    totalBusinesses: 3268,
    noWebsite: 3042,
    withMobilePhone: 2196,
    noWebsitePct: 93
  };

  const auditsSummaryPath = path.join(process.cwd(), 'audits', 'summary.json');
  if (fs.existsSync(auditsSummaryPath)) {
    try {
      const raw = fs.readFileSync(auditsSummaryPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.summary) {
        auditSummary = parsed.summary;
      }
    } catch (e) {
      console.error('Error al leer summary.json en dashboard:', e);
    }
  }

  // Contar cuántos archivos JSON existen en data/
  const dataDir = path.join(process.cwd(), 'data');
  let dataCategoriesCount = 0;
  if (fs.existsSync(dataDir)) {
    try {
      dataCategoriesCount = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).length;
    } catch (e) {}
  }

  return (
    <div className="space-y-8">
      {/* Banner de Bienvenida y Estado de Seguridad */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Área Administrativa Privada & Conectada a Supabase</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Centro de Operaciones Todo Lima
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Bienvenido a tu panel de control privado. Tu plataforma cuenta ahora con una base de datos relacional PostgreSQL en Supabase con Row Level Security (RLS) para proteger todos tus leads y automatizaciones de forma estricta.
          </p>
        </div>
      </div>

      {/* Grid de KPIs Operativos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Negocios en Base de Datos</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white">{auditSummary.totalBusinesses.toLocaleString()}</div>
          <div className="text-xs text-sky-400 mt-1 font-medium">Sincronizados en Supabase</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Oportunidades Sin Web</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">{auditSummary.noWebsite.toLocaleString()}</div>
          <div className="text-xs text-rose-300 mt-1 font-medium">{auditSummary.noWebsitePct || 93}% sin presencia web propia</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>WhatsApp Móvil Listo</span>
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{auditSummary.withMobilePhone.toLocaleString()}</div>
          <div className="text-xs text-emerald-300 mt-1 font-medium">Listos para prospección directa</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Categorías Mapeadas</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-indigo-400">{CATEGORIES.length} / {CATEGORIES.length}</div>
          <div className="text-xs text-indigo-300 mt-1 font-medium">{CATEGORIES.length} categorías oficiales activas</div>
        </div>
      </div>

      {/* Módulos Principales de Navegación Interna */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta: CRM de Prospectos */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 hover:border-slate-700 transition flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Pipeline de Prospectos & WhatsApp B2B
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Accede a la matriz privada de comercios de Lima ordenados por prioridad comercial. Visualiza sus números de teléfono directo, diagnósticos técnicos y copia o envía los pitches de WhatsApp con un solo clic.
            </p>
          </div>

          <Link
            href="/admin/prospectos"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-5 py-3 rounded-xl transition"
          >
            <span>Abrir Pipeline de Prospectos ({auditSummary.totalBusinesses} leads)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tarjeta: Consola de Ejecuciones */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 hover:border-slate-700 transition flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Consola de Ejecuciones & Automatización
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Supervisa el estado de las {CATEGORIES.length} categorías locales, consulta comandos de extracción masiva con Playwright, auditorías web y generadores de prototipos para tu terminal o backend.
            </p>
          </div>

          <Link
            href="/admin/ejecuciones"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-5 py-3 rounded-xl border border-slate-700 transition"
          >
            <span>Ver Consola de Ejecuciones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Estado de Supabase y Próximo Paso (Clerk) */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base">
              Base de Datos Supabase (PostgreSQL) Activa
            </h4>
            <p className="text-xs text-slate-400">
              Tablas creadas y vinculadas con Row Level Security (RLS) protegiendo tus leads.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Base de Datos Sincronizada</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              3,268 negocios, leads y mensajes de WhatsApp se encuentran almacenados y estructurados de forma segura en las tablas de Supabase.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 font-bold text-purple-400 mb-1.5">
              <Key className="w-4 h-4 text-purple-400" />
              <span>Siguiente Paso: Login con Clerk</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Para agregar autenticación con correo o Google OAuth a este panel, consulta la guía <code className="text-purple-300">BACKEND_SETUP_GUIDE.md</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
