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

const BUILT_IMAGES = {};
for (const [id, item] of Object.entries(imagesData)) {
  // Keep the catalog's verified paths. Local artwork must not depend on a CDN.
  const url = item.src;
  const responsive = url.startsWith('/images/editorial/') || id.startsWith('museos-lima-');
  BUILT_IMAGES[id] = {
    src: url,
    alt: item.alt,
    srcSet: responsive
      ? `${url.replace('.webp', '-480.webp')} 480w, ${url.replace('.webp', '-768.webp')} 768w, ${url} 1440w`
      : undefined,
  };
}

export const BLOG_IMAGES = BUILT_IMAGES;

export const BLOG_HERO = {
  src: '/images/editorial/blog-lima-portada.webp',
  alt: 'Interpretación editorial de la costa, los barrios y la vida local de Lima, Perú.',
  srcSet: '/images/editorial/blog-lima-portada-480.webp 480w, /images/editorial/blog-lima-portada-768.webp 768w, /images/editorial/blog-lima-portada.webp 1440w'
};
