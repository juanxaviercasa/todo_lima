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

const CDN_BASE = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CDN_URL) || 'https://cdn.todolima.com';

const BUILT_IMAGES = {};
for (const [id, item] of Object.entries(imagesData)) {
  const url = item.src.startsWith('http') ? item.src : `${CDN_BASE}${item.src}`;
  BUILT_IMAGES[id] = {
    src: url,
    alt: item.alt,
    srcSet: `${url} 1440w`,
  };
}

export const BLOG_IMAGES = new Proxy(BUILT_IMAGES, {
  get(target, prop) {
    if (prop in target) return target[prop];
    if (typeof prop === 'string' && prop !== 'then') {
      const fallbackUrl = `${CDN_BASE}/editorial/${prop}.webp`;
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
  src: `${CDN_BASE}/images/editorial/blog-lima-portada.webp`,
  alt: 'Interpretación editorial de la costa, los barrios y la vida local de Lima, Perú.',
  srcSet: `${CDN_BASE}/images/editorial/blog-lima-portada.webp 1440w`
};
