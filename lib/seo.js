export const SITE_URL = 'https://todolima.com';
export const EDITORIAL_DATE = '2026-10-09';

export function pageMetadata(title, description, pathname, image) {
  const url = `${SITE_URL}${pathname}`;
  const imgUrl = image?.src
    ? (image.src.startsWith('http') ? image.src : `${SITE_URL}${image.src}`)
    : `${SITE_URL}/images/todo_lima.jpg`;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Todo Lima', locale: 'es_PE', type: 'website', images: [{ url: imgUrl, alt: image?.alt || 'Todo Lima, directorio local' }] },
    twitter: { card: 'summary_large_image', title, description, images: [imgUrl] },
  };
}

export function serializeSchema(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function slugify(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function breadcrumbs(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, pathname], index) => ({ '@type': 'ListItem', position: index + 1, name, item: `${SITE_URL}${pathname}` })) };
}
