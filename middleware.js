import { NextResponse } from 'next/server';

/**
 * Middleware para:
 * 1. Protección estricta de rutas de administración (/admin/*)
 * 2. Arquitectura Multi-Inquilino basada en subdominios comodín (*.todolima.com)
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

  // 1. SEGURIDAD PRIVADA: Proteger rutas de administración (/admin/*)
  if (url.pathname.startsWith('/admin')) {
    const adminToken = req.cookies.get('admin_token')?.value;
    const queryKey = url.searchParams.get('key');
    const expectedKey = process.env.ADMIN_SECRET_KEY || 'todolima2026';

    // Acceso inicial con clave por URL: /admin?key=todolima2026
    if (queryKey === expectedKey) {
      const cleanUrl = new URL(url.pathname, req.url);
      const response = NextResponse.redirect(cleanUrl);
      response.cookies.set('admin_token', expectedKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 días de persistencia de sesión
      });
      return response;
    }

    // Si no cuenta con token válido, responder 404 para ocultar la existencia del panel
    if (adminToken !== expectedKey) {
      return new NextResponse('Página no encontrada', { status: 404 });
    }

    return NextResponse.next();
  }

  // 2. DETECCIÓN DE SUBDOMINIOS
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

  // Si se detecta un subdominio válido (distinto de www) y no es ruta de admin
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
