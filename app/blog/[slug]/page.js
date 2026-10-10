import Link from 'next/link';
import {notFound} from 'next/navigation';
import Navbar from '../../../components/Navbar.js';
import Footer from '../../../components/Footer.js';
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
  return <><Navbar/><main id="contenido" className="max-w-7xl mx-auto px-5 py-5 sm:py-6 min-w-0 [overflow-wrap:anywhere]">
    <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-8"><article className="min-w-0">
      <header className="article-opening">
        <div className="article-title-hero">
          <img {...BLOG_IMAGES[p.cover]} sizes="(min-width: 1024px) 850px, 100vw" width="1440" height="810" fetchPriority="high" loading="eager" className="article-title-image" />
          <div className="article-title-shade" aria-hidden="true" />
          <div className="article-title-copy">
            <Link href={'/blog/categoria/'+p.category} className="text-sm font-semibold text-sky-200">{categoryName(p.category)}</Link>
            <h1 className="mt-3 font-black">{p.title}</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-slate-500">
          <Link href="/blog" className="underline">← Volver al blog</Link>
          <span>Por <Link href="/metodologia" className="underline">Equipo editorial de Todo Lima</Link></span>
          <time dateTime={p.published}>{formatBlogDate(p.published)}</time><span>{p.minutes} min de lectura</span>
        </div>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed mt-4">{p.description}</p>
        <details className="text-xs text-slate-500 mt-3"><summary className="cursor-pointer">Sobre la imagen de portada</summary><p className="mt-2">{BLOG_IMAGES[p.cover].alt} Ilustración editorial generada con IA; no es una fotografía documental ni de un negocio listado.</p></details>
      </header>
      <nav aria-label="Contenido del artículo" className="article-toc my-6"><h2 className="text-xl font-bold mb-4">En este artículo</h2><ol className="article-toc-list">{p.blocks.filter(b=>b.type==='h2').map((b,i)=><li key={b.id}><a href={'#'+b.id} className="article-toc-link"><span className="article-toc-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><span className="article-toc-label">{b.text.replace(/^\s*\d+(?:\.\d+)*[.)]\s*/, '')}</span></a></li>)}</ol></nav><BlogContent post={p}/>

    <section id="fuentes" className="editorial-card mt-10"><h2 className="text-xl font-bold mb-4">Fuentes y referencias</h2><ul className="list-disc pl-5 space-y-3 text-sm">{sources.map(([url,label])=><li key={url}><a href={url} className="text-sky-700 dark:text-sky-300 underline">{label}</a></li>)}</ul><p className="text-xs text-slate-500 mt-5">Consulta editorial: 10 de octubre de 2026. Los enlaces respaldan el contexto; no confirman horarios, precios ni disponibilidad actuales. <Link href="/correcciones" className="underline">Proponer una corrección</Link>.</p></section>
    <div className="flex flex-wrap gap-2 mt-8" aria-label="Etiquetas del artículo">{p.tags.map(t=><Link key={t} className="editorial-chip text-sm" href={'/blog/etiqueta/'+t}>{BLOG_TAGS.find(x=>x.slug===t)?.name}</Link>)}</div>
    {examples.length>0&&<section className="mt-10"><h2 className="text-2xl font-bold mb-3">Pon el checklist en práctica</h2><p className="text-sm text-slate-500 mb-5">Ejemplos de fichas de servicios del directorio, no recomendaciones de calidad ni un ranking. Revisa su fuente y confirma las condiciones directamente.</p><div className="grid sm:grid-cols-2 gap-5">{examples.map(x=><BusinessCard key={x.slug} business={{...x,category:x.categoryTitle,profileSlug:x.slug}}/>)}</div><Link className="editorial-chip mt-5" href="/#directorios">Explorar todas las categorías →</Link></section>}
    </article><BlogSidebar exclude={p.slug} post={p}/></div>
    <JsonLd data={breadcrumbs([['Inicio','/'],['Blog','/blog'],[p.title,'/blog/'+p.slug]])}/>
    <JsonLd data={{'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description,datePublished:p.published,dateModified:p.modified,mainEntityOfPage:SITE_URL+'/blog/'+p.slug,image:[p.cover,...p.internal].map(id=>SITE_URL+BLOG_IMAGES[id].src),author:{'@type':'Organization',name:'Equipo editorial de Todo Lima',url:SITE_URL+'/metodologia'},publisher:{'@id':SITE_URL+'/#organization'},articleSection:categoryName(p.category),keywords:p.tags.map(t=>BLOG_TAGS.find(x=>x.slug===t)?.name).join(', ')}}/>
  </main><Footer/></>;
}
