import Link from 'next/link';
import {notFound} from 'next/navigation';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
import BlogImage from '../../../components/BlogImage.js';
import BlogContent from '../../../components/BlogContent.js';
import BlogSidebar from '../../../components/BlogSidebar.js';
import BusinessCard from '../../../components/BusinessCard.js';
import JsonLd from '../../../components/JsonLd.js';
import {BLOG_POSTS,BLOG_IMAGES,BLOG_TAGS,categoryName} from '../../../lib/blog.js';
import {formatBlogDate} from '../../../lib/blogUtils.js';
import {getProfiles} from '../../../lib/directory.js';
import {pageMetadata,breadcrumbs,SITE_URL} from '../../../lib/seo.js';
export const dynamicParams=false;
export function generateStaticParams(){return BLOG_POSTS.map(p=>({slug:p.slug}));}
export function generateMetadata({params}){const p=BLOG_POSTS.find(p=>p.slug===params.slug);if(!p)return{};const m=pageMetadata(p.title+' | Todo Lima',p.description,'/blog/'+p.slug,BLOG_IMAGES[p.cover]);return {...m,openGraph:{...m.openGraph,type:'article',publishedTime:p.published,modifiedTime:p.modified}};}
export default function BlogArticle({params}){
  const p=BLOG_POSTS.find(p=>p.slug===params.slug);if(!p)notFound();
  const examples=p.category==='vida-practica'?['gasfiteros','cerrajeros'].map(category=>getProfiles().find(x=>x.category===category)).filter(Boolean):[];
  const sources=[...new Map(p.blocks.flatMap(b=>[b.text||'',...(b.items||[])]).flatMap(t=>[...t.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)]).filter(m=>!m[2].startsWith(SITE_URL)).map(m=>[m[2],m[1]])).entries()];
  return <><Navbar/><main id="contenido" className="max-w-7xl mx-auto px-5 py-10 min-w-0 [overflow-wrap:anywhere]"><nav aria-label="Ruta de navegación" className="text-sm text-slate-500 mb-7"><Link href="/">Inicio</Link> / <Link href="/blog">Blog</Link> / <Link href={'/blog/categoria/'+p.category}>{categoryName(p.category)}</Link></nav>

    <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-10"><article className="min-w-0"><BlogImage id={p.cover} priority cover/>    <header className="max-w-4xl mt-7 mb-8"><p className="text-sm font-semibold text-sky-600 mb-4">{categoryName(p.category)}</p><h1 className="text-3xl sm:text-5xl font-black leading-tight">{p.title}</h1><p className="text-lg text-slate-500 leading-relaxed mt-5">{p.description}</p><p className="text-sm text-slate-500 mt-5">Por <Link href="/metodologia" className="underline">Equipo editorial de Todo Lima</Link> · <time dateTime={p.published}>{formatBlogDate(p.published)}</time> · {p.minutes} min de lectura</p></header><nav aria-label="Contenido del artículo" className="editorial-card my-8"><h2 className="text-xl font-bold mb-4">En este artículo</h2><ol className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">{p.blocks.filter(b=>b.type==='h2').map((b,i)=><li key={b.id}><a href={'#'+b.id} className="text-sky-700 dark:text-sky-300 underline">{i+1}. {b.text}</a></li>)}</ol></nav><BlogContent post={p}/>
    <section id="fuentes" className="editorial-card mt-10"><h2 className="text-xl font-bold mb-4">Fuentes y referencias</h2><ul className="list-disc pl-5 space-y-3 text-sm">{sources.map(([url,label])=><li key={url}><a href={url} className="text-sky-700 dark:text-sky-300 underline">{label}</a></li>)}</ul><p className="text-xs text-slate-500 mt-5">Consulta editorial: 10 de octubre de 2026. Los enlaces respaldan el contexto; no confirman horarios, precios ni disponibilidad actuales. <Link href="/correcciones" className="underline">Proponer una corrección</Link>.</p></section>
    <div className="flex flex-wrap gap-2 mt-8" aria-label="Etiquetas del artículo">{p.tags.map(t=><Link key={t} className="editorial-chip text-sm" href={'/blog/etiqueta/'+t}>{BLOG_TAGS.find(x=>x.slug===t)?.name}</Link>)}</div>
    {examples.length>0&&<section className="mt-10"><h2 className="text-2xl font-bold mb-3">Pon el checklist en práctica</h2><p className="text-sm text-slate-500 mb-5">Ejemplos de fichas de servicios del directorio, no recomendaciones de calidad ni un ranking. Revisa su fuente y confirma las condiciones directamente.</p><div className="grid sm:grid-cols-2 gap-5">{examples.map(x=><BusinessCard key={x.slug} business={{...x,category:x.categoryTitle,profileSlug:x.slug}}/>)}</div><Link className="editorial-chip mt-5" href="/#directorios">Explorar todas las categorías →</Link></section>}
    </article><BlogSidebar exclude={p.slug} post={p}/></div>
    <JsonLd data={breadcrumbs([['Inicio','/'],['Blog','/blog'],[p.title,'/blog/'+p.slug]])}/>
    <JsonLd data={{'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description,datePublished:p.published,dateModified:p.modified,mainEntityOfPage:SITE_URL+'/blog/'+p.slug,image:[p.cover,...p.internal].map(id=>SITE_URL+BLOG_IMAGES[id].src),author:{'@type':'Organization',name:'Equipo editorial de Todo Lima',url:SITE_URL+'/metodologia'},publisher:{'@id':SITE_URL+'/#organization'},articleSection:categoryName(p.category),keywords:p.tags.map(t=>BLOG_TAGS.find(x=>x.slug===t)?.name).join(', ')}}/>
  </main><Footer/></>;
}
