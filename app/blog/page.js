import EditorialShell from '../../components/EditorialShell.js';
import BlogIndex from '../../components/BlogIndex.js';
import BlogSidebar from '../../components/BlogSidebar.js';
import {BLOG_POSTS,summarizePosts} from '../../lib/blog.js';
import {pageMetadata} from '../../lib/seo.js';
export const metadata=pageMetadata('Blog de Lima: lugares, cultura y vida local | Todo Lima','Descubre Lima y prepara tus decisiones con artículos de patrimonio, vida local y negocios. Explora por categoría y etiqueta.','/blog');
export default function BlogPage(){return <EditorialShell title="Lima tiene mucho por descubrir" intro="Historias, lugares y decisiones cotidianas. Una mirada local para explorar la ciudad y elegir con información."><div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-8"><BlogIndex posts={summarizePosts(BLOG_POSTS)}/><BlogSidebar/></div></EditorialShell>;}
