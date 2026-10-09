import { Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
import CategoryDirectorioClient from '../../../components/CategoryDirectorioClient.js';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

// Genera las rutas estáticas del directorio
export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);
  return files.filter(f => f.endsWith('.json')).map(file => ({
    categoria: file.replace('.json', '')
  }));
}

export default async function DirectorioPage({ params }) {
  const { categoria } = params;
  const filePath = path.join(process.cwd(), 'data', `${categoria}.json`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md">
            <h1 className="text-2xl font-black text-slate-900 mb-2">Directorio en Construcción</h1>
            <p className="text-slate-500 text-sm mb-6">Estamos recopilando las mejores fichas para esta categoría.</p>
            <Link href="/" className="font-bold text-xs bg-slate-900 text-white px-4 py-2.5 rounded-xl">
              Volver al Inicio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { pageContent, businesses = [] } = data;

  const isArray = Array.isArray(pageContent);
  const activeCopy = isArray
    ? pageContent[Math.floor(Math.random() * pageContent.length)]
    : pageContent;

  const categoryName = categoria.replace(/-/g, ' ');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar categoryTitle={categoryName} />

      <main className="flex-grow">
        {/* Cabecera con Open Design */}
        <section className="mesh-gradient-hero text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Directorio Verificado • Lima</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              {activeCopy?.headline || `Los Mejores Especialistas de ${categoryName} en Lima`}
            </h1>

            {activeCopy?.subtitles?.map((sub, i) => (
              <p key={i} className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-2">
                {sub}
              </p>
            ))}

            <div className="mt-6 flex items-center justify-center gap-4 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>4.8+ Calificación</span>
              </span>
              <span>•</span>
              <span>{businesses.length} Negocios Listados</span>
            </div>
          </div>
        </section>

        {/* Sección del Directorio con Filtrado Interactivo y por Distritos */}
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 font-medium">Cargando directorio de especialistas...</div>}>
          <CategoryDirectorioClient
            businesses={businesses}
            categoryTitle={categoryName}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}