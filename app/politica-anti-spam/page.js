import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldAlert, CheckCircle2, MessageSquare, Ban, PhoneOff, AlertTriangle } from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY, 
  buildWhatsAppLink, 
  LEGAL_TITULAR, 
  LEGAL_ENTITY_NAME 
} from '../../lib/contact';

export const metadata = {
  title: 'Política Anti-Spam y Comunicaciones Responsables | Todo Lima',
  description: 'Conoce nuestro compromiso estricto contra el spam, llamadas en frío y mensajes no solicitados conforme a la Ley N° 32323 del Perú.',
};

export default function PoliticaAntiSpamPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-rose-500 dark:text-rose-400 mb-4">
            <ShieldAlert className="w-8 h-8 text-rose-500 dark:text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-300">
              Ley N° 32323 • Cero Tolerancia al Spam
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Política Anti-Spam y Código de Comunicaciones Éticas
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            En estricto cumplimiento del marco legal peruano de protección al consumidor y de las políticas de mensajería empresarial de Meta / WhatsApp Business API.
          </p>

          <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            
            {/* 1. Marco Legal */}
            <section className="p-5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30">
              <h2 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-2">
                <Ban className="w-5 h-5 text-rose-600 dark:text-rose-400" /> 1. Marco Normativo: Ley N° 32323 del Perú
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                La <strong>Ley N° 32323</strong> (publicada en el Diario Oficial El Peruano), modificó el artículo 58 del Código de Protección y Defensa del Consumidor (Ley N° 29571), estableciendo que:
              </p>
              <blockquote className="my-3 pl-4 border-l-2 border-rose-400 text-xs text-slate-600 dark:text-slate-300 italic">
                &quot;Queda prohibido a los proveedores el empleo de centros de llamada (call centers), sistemas de llamado telefónico, envío de mensajes de texto a celular o de mensajes electrónicos masivos para promover productos y servicios (...) de manera comercial o publicitaria, sin que medie el consentimiento previo, expreso e inequívoco del consumidor.&quot;
              </blockquote>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Todo Lima</strong> suscribe plenamente esta normativa y adopta una postura institucional de <strong>Tolerancia Cero</strong> ante cualquier práctica de spam, acoso digital o venta agresiva.
              </p>
            </section>

            {/* 2. Compromisos Operativos */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <PhoneOff className="w-5 h-5 text-amber-500 dark:text-amber-400" /> 2. Nuestros Compromisos Operativos
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">No realizamos llamadas telefónicas ni SMS en frío:</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Nunca utilizamos marcadores predictivos, llamadas automatizadas (robocalls) ni SMS masivos a números de personas naturales no solicitantes.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">Principio de Consentimiento Previo (Opt-In):</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Toda comunicación directa se fundamenta en la iniciativa previa del usuario: cuando escribe a nuestro WhatsApp oficial, solicita una auditoría digital gratuita de su negocio o reclama su ficha en el directorio.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">Identificación Inequívoca del Remitente:</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Cualquier mensaje enviado por Todo Lima se identifica claramente con nuestra denominación, nuestro canal oficial verificado y el propósito informativo o técnico de la conversación.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">Mecanismo de Exclusión Inmediata (Opt-Out):</strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Cualquier titular puede revocar su consentimiento en cualquier momento respondiendo la palabra <strong>BAJA</strong> o <strong>STOP</strong> a nuestro WhatsApp, produciendo el bloqueo inmediato y permanente de cualquier comunicación adicional.
                    </span>
                  </div>
                </li>
              </ul>
            </section>

            {/* 3. Canales de desuscripción */}
            <section className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sky-500 dark:text-sky-400" /> 3. ¿Cómo darse de baja de cualquier contacto?
              </h2>
              <p className="mb-4">
                Usted puede revocar de manera inmediata y gratuita cualquier autorización comercial a través de cualquiera de los siguientes medios:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/baja"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  <Ban className="w-4 h-4" /> Formulario Web de Baja / Opt-Out
                </Link>
                <a
                  href={buildWhatsAppLink('BAJA - Deseo ser excluido de cualquier mensaje de Todo Lima')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs transition-colors"
                >
                  Escribir &quot;BAJA&quot; al WhatsApp Oficial
                </a>
                <a
                  href={`mailto:${TODOLIMA_EMAIL}?subject=SOLICITUD%20DE%20BAJA%20INMEDIATA`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs transition-colors"
                >
                  Enviar correo a {TODOLIMA_EMAIL}
                </a>
              </div>
            </section>

            {/* 4. Canales de denuncia y fiscalización */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. Fiscalización y Reclamaciones ante INDECOPI</h2>
              <p>
                Si usted considera que ha recibido una comunicación que vulnera esta política o la Ley N° 32323 por parte de algún colaborador o sistema automatizado, le solicitamos reportarlo inmediatamente a <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-600 dark:text-sky-400 underline">{TODOLIMA_EMAIL}</a> para auditar el registro y sancionar internamente la desviación.
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Asimismo, le informamos que la Comisión de Protección al Consumidor del INDECOPI cuenta con canales oficiales para fiscalizar y sancionar el envío no autorizado de comunicaciones comerciales (WhatsApp No Insista / Reclamos INDECOPI).
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
