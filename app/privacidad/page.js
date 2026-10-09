import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldCheck, Lock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY, 
  buildWhatsAppLink,
  LEGAL_TITULAR,
  LEGAL_ENTITY_NAME,
  LEGAL_DOMICILE
} from '../../lib/contact';

export const metadata = {
  title: 'Política de Privacidad y Protección de Datos | Todo Lima',
  description: 'Política de Privacidad de Todo Lima conforme a la Ley N° 29733 de Protección de Datos Personales del Perú y la Ley N° 32323.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 mb-4">
            <ShieldCheck className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-300">
              Cumplimiento Legal • Perú Ley N° 29733 & Ley N° 32323
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Política de Privacidad y Tratamiento de Datos Personales
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            Última actualización: Octubre 2026 • Ámbito territorial: Lima Metropolitana, República del Perú
          </p>

          <div className="space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            
            {/* 1. Responsable */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-500 dark:text-sky-400" /> 1. Identificación del Responsable del Banco de Datos
              </h2>
              <p>
                El presente portal web <strong>todolima.com</strong> es operado y administrado por <strong>{LEGAL_TITULAR}</strong> en representación de <strong>{LEGAL_ENTITY_NAME}</strong> (en adelante, &quot;Todo Lima&quot;), con domicilio fiscal y operativo en <strong>{LEGAL_DOMICILE}</strong>. Correo electrónico oficial de contacto: <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-600 dark:text-sky-400 underline">{TODOLIMA_EMAIL}</a>; canal de atención directa: <strong>{TODOLIMA_WHATSAPP_DISPLAY}</strong>.
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                El tratamiento de datos personales realizado a través de este portal se encuentra alineado estrictamente a los principios de legalidad, consentimiento, proporcionalidad, seguridad y finalidad contemplados en la Ley N° 29733 y su Reglamento (D.S. N° 003-2013-JUS).
              </p>
            </section>

            {/* 2. Principios y Ley 32323 */}
            <section className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
              <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> 2. Compromiso Anti-Spam (Ley N° 32323 / Art. 58 Código del Consumidor)
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                Todo Lima cumple estrictamente con el marco legal peruano contra comunicaciones no deseadas. Conforme a la <strong>Ley N° 32323</strong> (que modifica el Art. 58 de la Ley 29571):
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                <li><strong>No realizamos contacto comercial saliente en frío:</strong> No enviamos mensajes publicitarios no solicitados por WhatsApp, SMS o llamadas a números que no hayan tomado la iniciativa previa de contactarnos.</li>
                <li><strong>Consentimiento previo y explícito:</strong> Todo contacto comercial se realiza únicamente cuando el titular del negocio o usuario escribe primero a Todo Lima y acepta libremente recibir comunicaciones.</li>
                <li><strong>Revocatoria inmediata (Opt-out):</strong> Cualquier persona puede revocar su consentimiento en cualquier momento escribiendo la palabra <strong>BAJA</strong> a nuestro WhatsApp o a través de nuestra sección <Link href="/baja" className="text-sky-600 dark:text-sky-400 underline font-semibold">Baja / Opt-out</Link>.</li>
              </ul>
            </section>

            {/* 3. Datos recopilados */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Datos Personales y Comerciales que Recopilamos</h2>
              <p>Tratamos las siguientes categorías de datos:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Datos de Fuentes de Acceso Público:</strong> Nombre comercial, dirección física pública, distrito, categoría de servicio y datos de contacto comercial expuestos públicamente por los propios titulares en plataformas públicas como Google Maps.</li>
                <li><strong>Datos proporcionados directamente por el usuario:</strong> Nombre, número de teléfono celular / WhatsApp, correo electrónico y consultas técnicas que usted nos remita libremente a través de nuestros formularios o chats de WhatsApp.</li>
                <li><strong>Datos técnicos y de navegación:</strong> Dirección IP anonimizada, tipo de navegador y cookies técnicas necesarias para el funcionamiento seguro de la plataforma en Cloudflare.</li>
              </ul>
            </section>

            {/* 4. Finalidades */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. Finalidades del Tratamiento</h2>
              <p>Sus datos personales se tratan para las siguientes finalidades necesarias:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Operar el directorio público geolocalizado de comercios de Lima Metropolitana en todolima.com.</li>
                <li>Atender solicitudes de verificación de fichas, consultas técnicas y solicitudes de auditoría digital solicitadas por los dueños de negocios.</li>
                <li>Gestionar pedidos de soporte, agendamiento de demostraciones y prestación de servicios tecnológicos contratados.</li>
                <li>Atender solicitudes de derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) y reclamos normativos.</li>
              </ul>
            </section>

            {/* 5. Transferencias y Encargados */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">5. Transferencia a Terceros y Flujo Transfronterizo</h2>
              <p>
                Todo Lima no vende ni comercializa sus datos personales con terceros para fines ajenos. Para prestar nuestros servicios tecnológicos, compartimos datos estrictamente necesarios con proveedores que actúan en calidad de encargados de tratamiento bajo estrictos estándares de seguridad:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                <li><strong>Cloudflare Inc.</strong> (EE.UU.): Alojamiento en la red de borde (Edge), CDN y seguridad perimetral WAF.</li>
                <li><strong>Supabase Inc. / Amazon Web Services</strong> (EE.UU.): Base de datos en la nube cifrada en reposo y en tránsito.</li>
                <li><strong>Meta Platforms Inc. / WhatsApp Business Platform</strong> (EE.UU.): Canal oficial de mensajería conversacional.</li>
                <li><strong>Clerk Inc.</strong> (EE.UU.): Gestión segura de autenticación y sesiones.</li>
              </ul>
            </section>

            {/* 6. Derechos ARCO */}
            <section className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">6. Ejercicio de Derechos ARCO</h2>
              <p>
                Conforme a la Ley N° 29733, usted tiene derecho a acceder a sus datos personales, solicitar su actualización o rectificación, pedir su supresión/cancelación cuando considere que no son pertinentes, y oponerse a su tratamiento con fines específicos.
              </p>
              <p className="mt-2">
                Para ejercer sus derechos ARCO o solicitar la eliminación/modificación de la ficha de su negocio en nuestro directorio:
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  href="/baja"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Formulario de Baja y Rectificación
                </Link>
                <a
                  href={buildWhatsAppLink('BAJA - Deseo ejercer mis derechos ARCO para mi ficha en todolima.com')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-xs transition-colors"
                >
                  Canal de WhatsApp Directo
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Asimismo, le asiste el derecho de recurrir ante la Autoridad Nacional de Protección de Datos Personales (ANPD) del Ministerio de Justicia si considera que su solicitud no fue atendida debidamente.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
