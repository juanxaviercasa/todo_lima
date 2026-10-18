import Link from 'next/link';
import { BRAND_FOUNDATIONS } from '../lib/brand.js';

export default function BrandPurpose() {
  return <section aria-labelledby="brand-purpose-heading" className="brand-purpose">
    <div className="max-w-7xl mx-auto px-5 py-12 sm:py-16">
      <p className="brand-eyebrow text-sm font-bold mb-3">POR UNA LIMA MÁS CONECTADA</p>
      <div className="grid lg:grid-cols-[3fr_2fr] gap-6 items-start mb-8">
        <h2 id="brand-purpose-heading" className="text-3xl sm:text-4xl font-black max-w-2xl">La ciudad tiene mucho que ofrecer. Queremos acercártelo.</h2>
        <p className="brand-copy leading-relaxed">Detrás de cada búsqueda hay una necesidad y detrás de cada negocio, personas. En Todo Lima reunimos información, conocimiento de la ciudad y recursos digitales para facilitar ese encuentro.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {BRAND_FOUNDATIONS.map(({ title, text }) => <article className="editorial-card" key={title}>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="brand-copy leading-relaxed">{text}</p>
        </article>)}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        <Link href="/sobre-nosotros" className="editorial-chip">Conoce Todo Lima →</Link>
        <Link href="/metodologia" className="editorial-chip">Cómo trabajamos →</Link>
      </div>
    </div>
  </section>;
}
