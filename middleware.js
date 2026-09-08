import { NextResponse } from 'next/server';

/**
 * Middleware para arquitectura Multi-Inquilino basada en subdominios comodín (*.todolima.com)
 */
export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Excluir archivos estáticos internos de Next.js y APIs
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Detectar subdominio
  // Producción: doctores.todolima.com
  // Desarrollo: doctores.localhost:3000 o doctores.localhost
  let currentHost = hostname.replace(/:[0-9]+$/, ''); // remover puerto si existe
  
  // Lista de dominios raíz que no son subdominios
  const rootDomains = ['todolima.com', 'www.todolima.com', 'localhost', '127.0.0.1'];
  
  let subdomain = null;
  if (!rootDomains.includes(currentHost)) {
    if (currentHost.endsWith('.todolima.com')) {
      subdomain = currentHost.replace('.todolima.com', '');
    } else if (currentHost.endsWith('.localhost')) {
      subdomain = currentHost.replace('.localhost', '');
    }
  }

  // Si se detecta un subdominio válido (distinto de www)
  if (subdomain && subdomain !== 'www') {
    // Reescribe la petición internamente a /[subdomain]/...
    const rewritePath = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
