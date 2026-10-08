import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { 
  LayoutDashboard, 
  Users, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  ShieldAlert,
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

export default async function AdminLayout({ children }) {
  const user = await currentUser();
  const allowedEmail = process.env.ADMIN_ALLOWED_EMAIL || 'j76018445@gmail.com';
  
  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  const isAuthorized = !user || userEmail === allowedEmail.toLowerCase();

  // Si el usuario inició sesión con otra cuenta no autorizada
  if (user && !isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-slate-900 border border-rose-500/30 p-8 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-white mb-2">Acceso No Autorizado</h2>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Has iniciado sesión como <strong className="text-white">{userEmail}</strong>, pero esta cuenta no tiene permisos de administrador para Todo Lima.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">Cerrar sesión:</span>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    );
  }

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
                  <ShieldCheck className="w-3 h-3" /> Autenticado
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
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Web Pública</span>
            </Link>

            {/* Perfil de Usuario de Clerk */}
            <div className="ml-2 pl-2 border-l border-slate-800 flex items-center">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
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
