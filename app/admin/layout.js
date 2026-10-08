import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export const metadata = {
  title: 'Consola Administrativa Privada | Todo Lima',
  description: 'Panel privado de control, prospección B2B y ejecución de tareas de Todo Lima.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Barra de Navegación Privada */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-sky-500/20">
              TL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Todo Lima Admin</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Privado
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Consola Central de Operaciones & CRM</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2 text-xs font-semibold">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/prospectos"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prospectos & WhatsApp</span>
            </Link>
            <Link
              href="/admin/ejecuciones"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Ejecuciones & Scraping</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="ml-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Web Pública</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
