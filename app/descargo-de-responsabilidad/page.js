import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { AlertTriangle, ShieldCheck, FileCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { 
  TODOLIMA_EMAIL, 
  TODOLIMA_WHATSAPP_DISPLAY, 
  LEGAL_TITULAR, 
  LEGAL_ENTITY_NAME 
} from '../../lib/contact';

export const metadata = {
  title: 'Descargo de Responsabilidad y Fuentes Públicas | Todo Lima',
  description: 'Condiciones de exención de responsabilidad civil, carácter orientativo de la información del directorio y deslinde respecto a servicios prestados por terceros en Lima.',
};

export default function DescargoResponsabilidadPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          
          <div className="flex items-center gap-3 text-amber-400 mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Deslinde Legal • Descargo de Responsabilidad (Disclaimer)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Descargo de Responsabilidad y Régimen de Información Pública
          </h1>
          <p className="text-sm text-slate-400 mb-8 pb-6 border-b border-slate-700">
            Aviso legal general para usuarios, consumidores y comercios en Lima Metropolitana • todolima.com
          </p>

          <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
            
            {/* 1. Naturaleza del Directorio */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">1. Naturaleza Informativa e Indexadora</h2>
              <p>
                <strong>todolima.com</strong> es una plataforma de catálogo, geolocalización e indexación informativa de acceso abierto. Su propósito es facilitar a los ciudadanos y empresas la localización de negocios, profesionales independientes y servicios disponibles en los 43 distritos de Lima Metropolitana.
              </p>
              <p className="mt-2 text-slate-300">
                Todo Lima <strong>no presta directamente</strong> los servicios de salud, fontanería, abogacía, mecánica, gastronomía ni ninguna de las actividades profesionales de los comercios indexados.
              </p>
            </section>

            {/* 2. Deslinde de Responsabilidad */}
            <section className="p-5 rounded-xl bg-slate-900/70 border border-amber-500/30">
              <h2 className="text-lg font-bold text-amber-300 mb-2">2. Deslinde Total de Responsabilidad por Servicios de Terceros</h2>
              <p>
                Cualquier contratación, cotización, pago, consulta médica, encargo legal o servicio técnico acordado entre un usuario del directorio y cualquiera de los establecimientos o profesionales listados constituye un <strong>contrato privado e independiente</strong> exclusivo entre ambas partes.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                En consecuencia, <strong>Todo Lima ({LEGAL_TITULAR})</strong> no asume responsabilidad civil, contractual, extracontractual, penal ni administrativa por:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm text-slate-400">
                <li>La calidad, idoneidad, puntualidad, garantías o legalidad de los servicios provistos por los comercios listados.</li>
                <li>Mala praxis médica, odontológica, veterinaria o profesional cometida por terceros.</li>
                <li>Desacuerdos comerciales, cobros indebidos, retrasos o incumplimientos contractuales de los negocios indexados.</li>
                <li>Daños directos, indirectos, incidentales o lucro cesante derivados de la contratación con cualquier comercio del directorio.</li>
              </ul>
            </section>

            {/* 3. Fuentes de Información y Veracidad */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">3. Procedencia de los Datos (Fuentes de Acceso Público)</h2>
              <p>
                La información de comercios (denominación comercial, dirección, número telefónico público, categoría y calificaciones públicas) es recopilada periódicamente a partir de <strong>fuentes de acceso público</strong> (tales como perfiles públicos de Google Maps, directorios abiertos y sitios web institucionales), amparado en el artículo 13 de la Ley N° 29733 de Protección de Datos Personales del Perú.
              </p>
              <p className="mt-2 text-slate-300">
                Si bien Todo Lima realiza esfuerzos continuos de actualización, los horarios, números de teléfono, direcciones y tarifas pueden ser modificados por los negocios sin previo aviso. Recomendamos al usuario verificar siempre los detalles antes de contratar.
              </p>
            </section>

            {/* 4. Procedimiento de Retirada */}
            <section className="p-5 rounded-xl bg-slate-900/70 border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-2">4. Procedimiento de Notificación y Retirada Inmediata (Notice & Takedown)</h2>
              <p>
                Si usted es el titular, apoderado o representante legal de un comercio indexado y desea modificar, enriquecer o <strong>eliminar definitivamente su ficha del directorio</strong>, garantizamos su tramitación gratuita e inmediata:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/baja"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Solicitar Retirada / Baja de Ficha
                </Link>
                <Link
                  href="/derechos-arco"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-colors"
                >
                  Canal Formal de Derechos ARCO
                </Link>
              </div>
            </section>

            {/* 5. Contacto */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2">5. Contacto Institucional</h2>
              <p>
                Para cualquier consulta, requerimiento legal o notificación, comuníquese directamente a nuestro correo oficial <a href={`mailto:${TODOLIMA_EMAIL}`} className="text-sky-400 underline">{TODOLIMA_EMAIL}</a> o mediante nuestro <Link href="/libro-de-reclamaciones" className="text-sky-400 underline">Libro de Reclamaciones</Link>.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
