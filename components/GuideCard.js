import Link from 'next/link';
import EditorialImage from './EditorialImage.js';
export default function GuideCard({ guide }) {
  return <Link href={`/guias/${guide.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 transition-colors"><EditorialImage id={`guia-${guide.category}`} sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" /><div className="p-6"><p className="text-xs font-semibold text-sky-600 dark:text-sky-300 mb-3">GUÍA DE CONTRATACIÓN</p><h2 className="text-xl font-bold leading-snug">{guide.title}</h2><p className="mt-3 leading-relaxed text-sm text-slate-600 dark:text-slate-300">{guide.description}</p><span className="block mt-5 font-semibold text-sky-600 dark:text-sky-300">Leer guía →</span></div></Link>;
}
