import { EDITORIAL_IMAGES } from '../lib/editorialImages.js';
export default function EditorialImage({ id, caption, className = '', sizes = '(min-width: 1024px) 768px, 100vw', priority = false }) {
  const asset = EDITORIAL_IMAGES[id];
  return <figure className={className}><img src={asset.src} srcSet={asset.srcSet} sizes={sizes} alt={asset.alt} width="1440" height="810" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" className="w-full aspect-video object-cover rounded-2xl" />{caption && <figcaption className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{caption}</figcaption>}</figure>;
}
