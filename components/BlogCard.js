import Link from 'next/link';
import BlogImage from './BlogImage.js';
import { categoryName } from '../lib/blogTaxonomy.js';
import { formatBlogDate } from '../lib/blogUtils.js';
export default function BlogCard({post}) {
  return <article className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"><Link href={'/blog/'+post.slug} tabIndex={-1} aria-hidden="true"><BlogImage id={post.cover} caption={false} sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"/></Link><div className="p-6"><p className="text-xs font-semibold text-sky-600 mb-3">{categoryName(post.category)} · {post.minutes} min de lectura</p><h2 className="text-xl font-bold leading-snug"><Link href={'/blog/'+post.slug}>{post.title}</Link></h2><p className="text-sm leading-relaxed text-slate-500 mt-3">{post.description}</p><p className="text-xs text-slate-500 mt-4"><time dateTime={post.published}>{formatBlogDate(post.published)}</time></p><Link className="inline-block font-semibold text-sky-600 mt-4" href={'/blog/'+post.slug}>Leer artículo →</Link></div></article>;
}
