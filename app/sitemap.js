import { getDirectory, getLocalPages, getProfiles } from '../lib/directory.js';
import { GUIDES } from '../lib/guides.js';
import { SITE_URL, EDITORIAL_DATE } from '../lib/seo.js';
export default function sitemap() {
  const route = (pathname, modified = EDITORIAL_DATE) => ({ url: `${SITE_URL}${pathname}`, lastModified: modified });
  const pages = ['', '/guias', '/metodologia', '/correcciones', '/para-negocios', '/privacidad', '/terminos', '/cookies', '/aviso-legal', '/derechos-arco', '/politica-anti-spam', '/descargo-de-responsabilidad', '/reembolsos-y-garantias', '/baja', '/libro-de-reclamaciones'];
  // Legal pages have no invented update date. Editorial dates are maintained
  // explicitly when the corresponding content changes.
  return [
    ...pages.map(p => p === '' || ['/guias', '/metodologia', '/correcciones', '/para-negocios'].includes(p) ? route(p) : { url: `${SITE_URL}${p}` }),
    ...getDirectory().map(c => route(`/${c.meta.slug}`, new Date(Math.max(Date.parse(c.updatedAt) || 0, Date.parse(c.contentModified))).toISOString())),
    ...getLocalPages().map(p => route(`/${p.category}/${p.slug}`)),
    ...getProfiles().map(p => route(`/negocios/${p.slug}`)),
    ...GUIDES.map(g => route(`/guias/${g.slug}`)),
  ];
}
