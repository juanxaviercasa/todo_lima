import {notFound} from 'next/navigation';
import EditorialShell from '../../../../components/EditorialShell.js';
import BlogIndex from '../../../../components/BlogIndex.js';
import BlogSidebar from '../../../../components/BlogSidebar.js';
import {BLOG_POSTS,paginatePosts,summarizePosts} from '../../../../lib/blog.js';
import {pageMetadata} from '../../../../lib/seo.js';
export const dynamicParams=false;
export function generateStaticParams(){return Array.from({length:paginatePosts(BLOG_POSTS).count},(_,i)=>({page:String(i+1)}));}
export function generateMetadata({params}){const page=Number(params.page);return pageMetadata('Blog de Lima · Página '+page+' | Todo Lima','Más lecturas sobre Lima y su vida local.',page===1?'/blog':'/blog/pagina/'+page);}
export default function PagedBlog({params}){const page=Number(params.page);if(!Number.isInteger(page)||page<1||page>paginatePosts(BLOG_POSTS).count)notFound();return <EditorialShell title={'Descubre Lima · Página '+page} intro="Continúa explorando nuestros artículos." trail={[['Blog','/blog']]}><div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-8"><BlogIndex posts={summarizePosts(BLOG_POSTS)} initialPage={page}/><BlogSidebar/></div></EditorialShell>;}
