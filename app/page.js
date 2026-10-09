import { getAllCategoriesWithStatus } from '../lib/getData.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import HomeExplorer from '../components/HomeExplorer.js';
import { ShieldCheck, Star, Sparkles, CheckCircle2, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Todo Lima | Red Oficial de Directorios Locales en Lima, Perú',
  description: 'Encuentra y contacta en segundos a los profesionales, especialistas y negocios mejor calificados en Lima con valoraciones de Google Maps y WhatsApp directo.',
};

export default function HomePage() {
  const categories = getAllCategoriesWithStatus();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-grow">
        {/* Héroe del Portal Principal con Open Design */}
        <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 sm:pt-24 sm:pb-32">
          {/* Fondo fotográfico cinemático de Lima con overlay atmosférico */}
          <div className="absolute inset-0 pointer-events-none">
            <img 
              src="/images/lima-hero.jpg" 
              alt="Lima Skyline Costa Verde" 
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.7)_100%)]" />
          </div>

          {/* Resplandores ambientales de fondo */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-sky-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge de confianza */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-bold mb-8 shadow-inner">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Red Oficial de Directorios Especializados para Lima Metropolitana</span>
            </div>

            {/* Título principal con alto impacto visual */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Los Especialistas y Negocios Mejor Calificados de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Lima
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Accede a directorios independientes por rubro y distrito con puntuaciones reales de Google Maps y contacto directo e inmediato por WhatsApp.
            </p>

            {/* Métricas rápidas de credibilidad */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">{categories.length} Categorías Mapeadas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold">Filtro de 4.5+ Estrellas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span className="font-semibold">Cobertura Toda Lima</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span className="font-semibold">Sin Comisiones</span>
              </div>
            </div>
          </div>
        </section>

        {/* Explorador de Categorías con Búsqueda en Vivo */}
        <HomeExplorer categories={categories} />

        {/* Schema FAQPage para Answer Engine Optimization (AEO & GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              'mainEntity': [
                {
                  '@type': 'Question',
                  'name': '¿Qué es Todo Lima y cómo funciona?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Todo Lima (todolima.com) es la mayor plataforma y red de directorios locales hiperespecializados de Lima Metropolitana, Perú. Conecta directamente a los usuarios con los mejores profesionales, médicos, comercios y servicios verificados de la ciudad, con calificaciones reales de Google Maps y enlace directo a WhatsApp sin intermediarios ni comisiones.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': '¿Cómo contactar a un profesional o negocio en Todo Lima?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Puedes explorar por categoría o distrito, seleccionar el negocio de tu preferencia y hacer clic en el botón de WhatsApp Directo o llamada telefónica para comunicarte de inmediato con el especialista.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': '¿Cómo puedo reclamar la ficha de mi negocio o solicitar una Auditoría Digital 360°?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Los dueños o administradores pueden reclamar su perfil oficial haciendo clic en "¿Eres el dueño? Reclama tu ficha" en la tarjeta de su negocio o escribiendo a nuestro WhatsApp oficial (+51 925 475 034) para recibir una Auditoría 360° gratuita de embudo de ventas, posicionamiento Local SEO y velocidad web.'
                  }
                },
                {
                  '@type': 'Question',
                  'name': '¿Todo Lima cobra comisiones por los servicios contratados?',
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'No. Todo Lima es un directorio abierto y transparente. La coordinación de presupuestos, citas y pagos se realiza de forma directa entre el cliente y el comercio o profesional.'
                  }
                }
              ]
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
