import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Registro de Administrador | Todo Lima',
  description: 'Registro de credenciales para la gerencia de Todo Lima.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Resplandores ambientales de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header del Registro */}
      <div className="relative z-10 text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            TL
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">Todo Lima</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Alta de Usuario Gerencial</span>
        </div>
      </div>

      {/* Componente SignUp de Clerk */}
      <div className="relative z-10">
        <SignUp
          appearance={{
            elements: {
              card: 'bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md rounded-3xl',
              headerTitle: 'text-white font-black text-xl',
              headerSubtitle: 'text-slate-400 text-sm',
              formButtonPrimary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all',
              formFieldInput: 'bg-slate-950 border-slate-800 text-white rounded-xl focus:border-sky-500',
              formFieldLabel: 'text-slate-300 text-xs font-semibold',
              socialButtonsBlockButton: 'bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white transition-all',
              socialButtonsBlockButtonText: 'text-white font-medium text-xs',
              dividerLine: 'bg-slate-800',
              dividerText: 'text-slate-500 text-xs',
              footer: 'bg-transparent',
              footerAction: 'text-slate-400 text-xs',
              footerActionLink: 'text-sky-400 hover:text-sky-300 font-semibold',
              footerActionText: 'text-slate-400',
              identityPreviewText: 'text-slate-300',
              identityPreviewEditButton: 'text-sky-400',
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/admin"
        />
      </div>

      {/* Volver al inicio */}
      <div className="relative z-10 mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Directorio Público</span>
        </Link>
      </div>
    </div>
  );
}
