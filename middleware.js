import { NextResponse } from 'next/server';
import { CATEGORIES } from './scraper/config/categories.js';
export default function middleware(req) {
  const url = req.nextUrl.clone();
  const host = (req.headers.get('host') || '').replace(/:\d+$/, '').toLowerCase();
  const category = CATEGORIES.find(c => host === `${c.slug}.todolima.com`);
  if (host === 'www.todolima.com' || category) {
    url.protocol = 'https:'; url.hostname = 'todolima.com'; url.port = '';
    if (category && url.pathname === '/') url.pathname = `/${category.slug}`;
    return NextResponse.redirect(url, 308);
  }
  const legacy = url.pathname.match(/^\/directorio\/([^/]+)\/?$/);
  if (legacy && CATEGORIES.some(c => c.slug === legacy[1])) {
    url.pathname = `/${legacy[1]}`;
    return NextResponse.redirect(url, 308);
  }
  const response = NextResponse.next();
  if (/^\/(admin|sign-in|sign-up|demo)(\/|$)/.test(url.pathname)) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  // Filters remain usable, but are not independent landing pages.
  if (url.searchParams.has('distrito') || url.searchParams.has('q')) response.headers.set('X-Robots-Tag', 'noindex, follow');
  return response;
}
export const config = { matcher: ['/((?!_next|api|images|.*\\.[^/]+$).*)'] };
