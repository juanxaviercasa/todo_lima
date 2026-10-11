import imagesData from '../data/blog/images.json';
import tagsData from '../data/blog/tags.json';

export const BLOG_CATEGORIES = [
  ['historia-de-lima', 'Historia de Lima'],
  ['cultura-y-tradiciones', 'Cultura y tradiciones'],
  ['gastronomia-limena', 'Gastronomía limeña'],
  ['lugares-y-patrimonio', 'Lugares y patrimonio'],
  ['planes-y-bienestar', 'Planes y bienestar'],
  ['barrios-y-distritos', 'Barrios y distritos'],
  ['vida-practica', 'Vida práctica en Lima'],
  ['negocios-locales', 'Negocios e historias locales']
].map(([slug, name]) => ({ slug, name }));

export const BLOG_TAGS = tagsData;

export function categoryName(slug) {
  return BLOG_CATEGORIES.find(c => c.slug === slug)?.name;
}

// Dominio oficial de Cloudflare R2 para medios: media.todolima.com
const MEDIA_BASE = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_MEDIA_URL) || (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CDN_URL) || 'https://media.todolima.com';

const BUILT_IMAGES = {};
for (const [id, item] of Object.entries(imagesData)) {
  let url = item.src;
  // Rutas del catálogo editorial alojadas en Cloudflare R2
  if (url.startsWith('/editorial/')) {
    url = `${MEDIA_BASE}${url}`;
  }
  const isLocal = item.src.startsWith('/images/editorial/');
  BUILT_IMAGES[id] = {
    src: url,
    alt: item.alt,
    srcSet: isLocal
      ? `${url.replace('.webp', '-480.webp')} 480w, ${url.replace('.webp', '-768.webp')} 768w, ${url} 1440w`
      : `${url} 1440w`,
  };
}

export const BLOG_IMAGES = new Proxy(BUILT_IMAGES, {
  get(target, prop) {
    if (prop in target) return target[prop];
    if (typeof prop === 'string' && prop !== 'then') {
      const fallbackUrl = `${MEDIA_BASE}/editorial/${prop}.webp`;
      return {
        src: fallbackUrl,
        alt: 'Ilustración editorial para Todo Lima, Perú',
        srcSet: `${fallbackUrl} 1440w`,
      };
    }
    return undefined;
  }
});

export const BLOG_HERO = {
  src: '/images/editorial/blog-lima-portada-v2.webp',
  alt: 'Interpretación editorial de la costa, los barrios y la vida local de Lima, Perú.',
  srcSet: '/images/editorial/blog-lima-portada-v2-480.webp 480w, /images/editorial/blog-lima-portada-v2-768.webp 768w, /images/editorial/blog-lima-portada-v2.webp 1440w'
};
