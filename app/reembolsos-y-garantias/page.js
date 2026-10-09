import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BadgePercent, ShieldCheck, RefreshCw, FileText, CheckCircle2, Clock } from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY, 
  LEGAL_TITULAR, 
  LEGAL_ENTITY_NAME 
} from '../../lib/contact';

export const metadata = {
  title: 'Política de Contratación, Garantías y Reembolsos | Todo Lima',
  description: 'Términos de contratación de servicios digitales, embudos de venta, asistentes de IA, garantías de soporte y políticas de devolución de Todo Lima.',
};

export default function ReembolsosYGarantiasPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-emerald-400 mb-4">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              Garantía de Servicio • Términos Comerciales Transparentes
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Política de Contratación, Garantías y Reembolsos
          </h1>
          <p className="text-sm text-slate-400 mb-8 pb-6 border-b border-slate-700">
            Marco contractual aplicable a los servicios tecnológicos y soluciones digitales brindadas por Todo Lima ({LEGAL_TITULAR}) • Lima, Perú
          </p>

          <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
            
            {/* 1. Alcance de los Servicios */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" /> 1. Servicios Tecnológicos Cubiertos
              </h2>
              <p>
                Las presentes condiciones regulan la contratación de los servicios profesionales prestados por Todo Lima:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm text-slate-300">
                <li><strong>Rediseño de Sitios Web y Embudos de Venta (Funnels):</strong> Arquitectura frontend ultrarrápida, diseño enfocado a conversión móvil y optimización de velocidad de carga.</li>
                <li><strong>Asistentes de Inteligencia Artificial para WhatsApp & CRM:</strong> Configuración de chatbots inteligentes con modelos LLM y automatización de flujos de captación 24/7.</li>
                <li><strong>Auditorías Técnicas Digitales y Hardening Web:</strong> Informes de rendimiento, auditoría de vulnerabilidades y ciberseguridad perimetral.</li>
                <li><strong>Planes de Visibilidad y Verificación en el Directorio:</strong> Sellos de verificación oficial y posicionamiento prioritario en todolima.com.</li>
              </ul>
            </section>

            {/* 2. Proceso de Contratación y Aprobación */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">2. Proceso de Contratación y Hitos de Trabajo</h2>
              <p>
                Todo proyecto se inicia con una <strong>Propuesta Técnica y Comercial</strong> detallada que especifica el alcance, los entregables, las tecnologías a emplear, el cronograma y el costo total. El trabajo se desarrolla habitualmente en tres fases:
              </p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs sm:text-sm text-slate-300">
                <li><strong>Fase 1: Diagnóstico y Prototipado:</strong> Definición de arquitectura, textos persuasivos (copywriting) y diseño preliminar.</li>
                <li><strong>Fase 2: Implementación y Pruebas:</strong> Desarrollo de software, integraciones de API (WhatsApp, CRM) y pruebas de funcionalidad.</li>
                <li><strong>Fase 3: Entrega y Pase a Producción:</strong> Despliegue en dominio del cliente, capacitación técnica y entrega formal de accesos.</li>
              </ol>
            </section>

            {/* 3. Política de Cancelación y Reembolsos */}
            <section className="p-5 rounded-xl bg-slate-900/70 border border-emerald-500/30">
              <h2 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-400" /> 3. Política de Cancelaciones y Devoluciones
              </h2>
              <p>
                En cumplimiento del Código de Protección y Defensa del Consumidor del Perú (Ley N° 29571) y las mejores prácticas mercantiles:
              </p>
              <div className="space-y-3 mt-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <strong className="text-white block mb-0.5">a) Cancelación antes del inicio de labores técnicas:</strong>
                  <span>Si el cliente solicita la cancelación del proyecto antes de que se hayan iniciado las tareas de diseño o desarrollo, se procederá al <strong>reembolso del 100%</strong> del importe abonado (deduciendo únicamente posibles comisiones de pasarelas de pago o transferencias bancarias de terceros).</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <strong className="text-white block mb-0.5">b) Cancelación durante el desarrollo (Fase intermedia):</strong>
                  <span>Si el proyecto se cancela cuando ya se han desarrollado prototipos o código, se liquidará el importe correspondiente a las horas de ingeniería y recursos de servidor devengados hasta la fecha. El saldo restante, si existiere a favor del cliente, será reembolsado.</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <strong className="text-white block mb-0.5">c) Proyectos aprobados y entregados:</strong>
                  <span>Una vez que el cliente ha otorgado su visto bueno final y el software o embudo ha sido desplegado en producción, no procederán solicitudes de reembolso por la naturaleza digital personalizada del servicio, aplicándose en su lugar la <strong>Garantía de Soporte Técnico</strong>.</span>
                </div>
              </div>
            </section>

            {/* 4. Garantía de Soporte Técnico */}
            <section className="p-5 rounded-xl bg-slate-900/70 border border-sky-500/30">
              <h2 className="text-lg font-bold text-sky-300 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-400" /> 4. Garantía de Estabilidad Técnica Post-Entrega
              </h2>
              <p>
                Todo desarrollo web, embudo o integración de asistente de IA entregado por Todo Lima cuenta con una <strong>Garantía de Estabilidad Técnica gratuita de 30 a 90 días naturales</strong> (según lo estipulado en la cotización comercial):
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm text-slate-300">
                <li>Corrección prioritaria y sin costo de cualquier bug o fallo de código que impida el funcionamiento pactado.</li>
                <li>Monitoreo de disponibilidad y soporte ante incidencias de integración con APIs de WhatsApp o pasarelas de pago.</li>
                <li>Ajustes menores de diseño o calibración de respuestas del asistente de IA.</li>
              </ul>
              <p className="mt-2 text-xs text-slate-400">
                La garantía no cubre modificaciones de código efectuadas por terceros ajenos al equipo de Todo Lima, ni cambios unilaterales en las políticas de plataformas externas como Meta o Google.
              </p>
            </section>

            {/* 5. Facturación y Medios de Pago */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Comprobantes de Pago Electrónicos</h2>
              <p>
                Por cada servicio contratado se emite el correspondiente comprobante de pago electrónico (Boleta de Venta o Factura Electrónica con RUC) conforme a los requerimientos tributarios de la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de la República del Perú.
              </p>
            </section>

            {/* 6. Contacto y Libro de Reclamaciones */}
            <section className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-2">6. Atención de Consultas o Reclamos Comerciales</h2>
              <p>
                Para cualquier consulta referida a pagos, garantías o contrataciones, puede escribir a <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-400 underline">{TODOLIMA_EMAIL}</a> o al WhatsApp <strong>{TODOLIMA_WHATSAPP_DISPLAY}</strong>. Ponemos además a su disposición nuestro <Link href="/libro-de-reclamaciones" className="text-sky-400 underline">Libro de Reclamaciones Virtual</Link>.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
