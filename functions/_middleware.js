import { CATEGORIES } from '../scraper/config/categories.js';
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const category = CATEGORIES.find(c => url.hostname === `${c.slug}.todolima.com`);
  if (url.hostname === 'www.todolima.com' || category) {
    url.hostname = 'todolima.com'; url.protocol = 'https:';
    if (category && url.pathname === '/') url.pathname = `/${category.slug}`;
    return Response.redirect(url.toString(), 308);
  }
  const legacy = url.pathname.match(/^\/directorio\/([^/]+)\/?$/);
  if (legacy && CATEGORIES.some(c => c.slug === legacy[1])) {
    url.pathname = `/${legacy[1]}`;
    return Response.redirect(url.toString(), 308);
  }
  const response = await context.next();
  if (/^\/(admin|sign-in|sign-up|demo)(\/|$)/.test(url.pathname) || url.searchParams.has('distrito') || url.searchParams.has('q')) {
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', /^\/(admin|sign-in|sign-up|demo)(\/|$)/.test(url.pathname) ? 'noindex, nofollow' : 'noindex, follow');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  return response;
}
