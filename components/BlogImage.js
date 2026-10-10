import { BLOG_IMAGES } from '../lib/blogTaxonomy.js';
export default function BlogImage({id, priority=false, caption=true, cover=false, sizes='(min-width: 1024px) 850px, 100vw'}) {
  const image = BLOG_IMAGES[id];
  return <figure><img {...image} sizes={sizes} width="1440" height="810" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} decoding="async" className={cover ? 'blog-article-cover w-full rounded-2xl' : 'w-full aspect-video object-cover rounded-2xl'}/>{caption && <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-3">{image.alt} Ilustración editorial generada con IA; no es una fotografía documental ni de un negocio listado.</figcaption>}</figure>;
}
