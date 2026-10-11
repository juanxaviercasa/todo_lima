export default function AtlasContents({pillar}) {
  const entries=[];
  if(pillar.table?.rows?.length)entries.push(['matriz-estructural','Datos de un vistazo']);
  entries.push(...pillar.sections.map(section=>[section.id,section.title]));
  if(pillar.crossLinks?.districts?.length || pillar.crossLinks?.categories?.length)entries.push(['distritos-relacionados','Distritos y negocios relacionados']);
  if(pillar.sources?.length)entries.push(['fuentes-verificadas','Fuentes y referencias']);
  return <nav aria-label="Tabla de contenidos del artículo" className="atlas-contents rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-5 sm:p-6"><details><summary className="cursor-pointer font-bold text-slate-900 dark:text-white">En esta guía <span className="font-normal text-sm text-slate-500">· {entries.length} secciones</span></summary><ol className="mt-4 space-y-1">{entries.map(([id,label],index)=><li key={id}><a href={`#${id}`} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 items-start rounded-lg p-2 hover:bg-sky-50 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-300"><span className="rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-center font-semibold py-0.5">{index+1}</span><span className="min-w-0 leading-relaxed">{label}</span></a></li>)}</ol></details></nav>;
}
