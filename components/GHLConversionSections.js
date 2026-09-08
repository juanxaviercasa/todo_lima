import { ShieldCheck, UserCheck, MessageCircle, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GHLConversionSections({ category }) {
  const faqs = [
    {
      q: `¿Cómo se eligen a los mejores ${category.slug} en Lima?`,
      a: `Analizamos de forma automatizada las fichas públicas de Google Maps en Lima Metropolitana, seleccionando únicamente a los que cuentan con las puntuaciones más altas (4.5 a 5.0 estrellas) y un volumen comprobable de opiniones reales de usuarios.`
    },
    {
      q: '¿Todo Lima cobra alguna comisión por contactar a los negocios?',
      a: 'No. El servicio para los usuarios es 100% gratuito. Todos los botones de llamada y WhatsApp te conectan directamente con el negocio sin ningún tipo de intermediario.'
    },
    {
      q: '¿Qué hacer si un número o dirección no está actualizado?',
      a: 'Nuestro robot de auditoría escanea y actualiza la información constantemente. Si notas algún dato desactualizado, puedes informarnos para corregirlo en el siguiente ciclo de sincronización.'
    }
  ];

  return (
    <div className="bg-slate-50 border-t border-slate-200 mt-16">
      {/* Sección 1: Por qué elegir un negocio verificado */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 py-1 px-3 rounded-full border border-sky-200">
            Garantía de Confianza
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué elegir profesionales desde Todo Lima?
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Evita malas experiencias y pérdida de dinero eligiendo profesionales con trayectoria comprobada.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reputación Comprobada</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Filtramos automáticamente negocios con calificaciones sobresalientes de clientes reales en distritos de Lima.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-5">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Contacto Directo Inmediato</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Comunícate por WhatsApp o llamada directa sin llenar formularios molestos ni esperar cotizaciones que nunca llegan.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-5">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Transparencia Total</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Direcciones exactas, enlace a perfiles de Google Maps y páginas web para que tomes la mejor decisión con calma.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 2: Preguntas Frecuentes */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Preguntas Frecuentes
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Resolvemos tus dudas sobre cómo funciona nuestro directorio local en Lima.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 3: Banner de Conversión para Dueños de Negocios */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-900/60 py-1 px-3 rounded-full border border-sky-700/60">
              Para Dueños de Negocios
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-black leading-tight">
              ¿Ofreces servicios en este rubro en Lima?
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Posiciona tu marca frente a miles de personas que buscan atención confiable a diario en los subdominios de Todo Lima.
            </p>
          </div>

          <a
            href="https://wa.me/51999999999?text=Hola,%20tengo%20un%20negocio%20en%20Lima%20y%20quiero%20publicarme%20en%20todolima.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            <span>Postular mi Negocio Gratis</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
