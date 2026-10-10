import {notFound} from 'next/navigation';
import EditorialShell from '../../../../components/EditorialShell.js';
import BlogIndex from '../../../../components/BlogIndex.js';
import BlogSidebar from '../../../../components/BlogSidebar.js';
import {BLOG_CATEGORIES,BLOG_POSTS,summarizePosts} from '../../../../lib/blog.js';
import {pageMetadata} from '../../../../lib/seo.js';
const active=BLOG_CATEGORIES.filter(c=>BLOG_POSTS.some(p=>p.category===c.slug));
export const dynamicParams=false;
export function generateStaticParams(){return active.map(c=>({slug:c.slug}));}
export function generateMetadata({params}){const c=active.find(c=>c.slug===params.slug);return c?{...pageMetadata(c.name+' | Blog Todo Lima','Artículos para explorar '+c.name.toLowerCase()+' con contexto e información local.','/blog/categoria/'+c.slug),robots:{index:false,follow:true}}:{};}
export default function CategoryPage({params}){const c=active.find(c=>c.slug===params.slug);if(!c)notFound();return <EditorialShell title={c.name} intro="Explora los artículos de este tema. Nuestra colección crece con contenido revisado, no con páginas vacías." trail={[['Blog','/blog']]}><div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-8"><BlogIndex posts={summarizePosts(BLOG_POSTS.filter(p=>p.category===c.slug))} initialCategory={c.slug}/><BlogSidebar/></div></EditorialShell>;}
