import {notFound} from 'next/navigation';
import EditorialShell from '../../../../components/EditorialShell.js';
import BlogIndex from '../../../../components/BlogIndex.js';
import BlogSidebar from '../../../../components/BlogSidebar.js';
import {BLOG_TAGS,BLOG_POSTS,summarizePosts} from '../../../../lib/blog.js';
import {pageMetadata} from '../../../../lib/seo.js';
export const dynamicParams=false;
export function generateStaticParams(){return BLOG_TAGS.map(t=>({slug:t.slug}));}
export function generateMetadata({params}){const t=BLOG_TAGS.find(t=>t.slug===params.slug);return t?{...pageMetadata(t.name+' | Blog Todo Lima','Lecturas relacionadas con '+t.name+'.','/blog/etiqueta/'+t.slug),robots:{index:false,follow:true}}:{};}
export default function TagPage({params}){const t=BLOG_TAGS.find(t=>t.slug===params.slug);if(!t)notFound();return <EditorialShell title={t.name} intro="Lecturas conectadas por un interés común." trail={[['Blog','/blog']]}><div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-8"><BlogIndex posts={summarizePosts(BLOG_POSTS.filter(p=>p.tags.includes(t.slug)))} initialTag={t.slug}/><BlogSidebar/></div></EditorialShell>;}
