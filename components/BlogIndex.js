'use client';
import {useState,useEffect} from 'react';
import BlogCard from './BlogCard.js';
import Link from 'next/link';
import {BLOG_CATEGORIES,BLOG_TAGS} from '../lib/blogTaxonomy.js';
import {filterPosts,paginatePosts} from '../lib/blogUtils.js';
export default function BlogIndex({posts,initialCategory='',initialTag='',initialPage=1}) {
  const [query,setQuery]=useState(''),[category,setCategory]=useState(initialCategory),[tag,setTag]=useState(initialTag),[page,setPage]=useState(initialPage);
  useEffect(()=>{setPage(initialPage);},[initialPage]);
  const filtered=filterPosts(posts,{query,category,tag}), pagination=paginatePosts(filtered,page);
  const update=(setter,value)=>{setter(value);setPage(1);};
  return <div className="min-w-0"><form onSubmit={e=>e.preventDefault()} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 grid sm:grid-cols-2 gap-4 mb-6" role="search" aria-label="Buscar artículos"><label className="sm:col-span-2 text-sm font-semibold">Buscar en el blog<input type="search" value={query} onChange={e=>update(setQuery,e.target.value)} placeholder="Historia, lugares, negocios…" className="block w-full min-w-0 border rounded-xl bg-transparent p-3 mt-2"/></label><label className="text-sm font-semibold">Categoría<select aria-label="Categoría" value={category} onChange={e=>update(setCategory,e.target.value)} className="block w-full min-w-0 border rounded-xl bg-white dark:bg-slate-900 p-3 mt-2"><option value="">Todas las categorías</option>{BLOG_CATEGORIES.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label><label className="text-sm font-semibold">Etiqueta<select aria-label="Etiqueta" value={tag} onChange={e=>update(setTag,e.target.value)} className="block w-full min-w-0 border rounded-xl bg-white dark:bg-slate-900 p-3 mt-2"><option value="">Todas las etiquetas</option>{BLOG_TAGS.map(t=><option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label><button className="text-sm text-sky-600 underline justify-self-start" type="button" onClick={()=>{setQuery('');setCategory(initialCategory);setTag(initialTag);setPage(1);}}>Limpiar filtros</button></form>
    <p role="status" aria-live="polite" className="text-sm text-slate-500 mb-5">{filtered.length} artículos · Página {pagination.current} de {pagination.count}</p>
    {filtered.length?<div className="grid sm:grid-cols-2 gap-5">{pagination.items.map(p=><BlogCard key={p.slug} post={p}/>)}</div>:<div className="editorial-card"><h2 className="font-bold">Aún no hay artículos para esta selección</h2><p className="text-sm mt-2">Prueba otro tema o limpia los filtros.</p></div>}
    <nav aria-label="Paginación del blog" className="flex flex-wrap gap-2 mt-8">{Array.from({length:pagination.count},(_,i)=>i+1).map(n=>!query&&!category&&!tag?<Link key={n} href={n===1?'/blog':'/blog/pagina/'+n} aria-current={n===pagination.current?'page':undefined} aria-label={'Página '+n} className={'rounded-xl border px-4 py-2 '+(n===pagination.current?'bg-sky-600 text-white':'bg-white dark:bg-slate-900')}>{n}</Link>:<button key={n} type="button" aria-current={n===pagination.current?'page':undefined} aria-label={'Página '+n} onClick={()=>setPage(n)} className={'rounded-xl border px-4 py-2 '+(n===pagination.current?'bg-sky-600 text-white':'bg-white dark:bg-slate-900')}>{n}</button>)}</nav>
  </div>;
}
