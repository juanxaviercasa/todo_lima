import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Middleware de seguridad y multi-inquilino de Todo Lima:
 * 1. Autenticación con Clerk para proteger /admin/*
 * 2. Redirección y reescritura para subdominios comodín (*.todolima.com)
 */

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  // 1. Proteger panel privado /admin con Clerk
  if (isAdminRoute(req)) {
    auth().protect();
  }

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

  // 2. Detección y enrutamiento de subdominios
  let currentHost = hostname.replace(/:[0-9]+$/, ''); // remover puerto local si existe
  const rootDomains = ['todolima.com', 'www.todolima.com', 'localhost', '127.0.0.1'];
  
  let subdomain = null;
  if (!rootDomains.includes(currentHost)) {
    if (currentHost.endsWith('.todolima.com')) {
      subdomain = currentHost.replace('.todolima.com', '');
    } else if (currentHost.endsWith('.localhost')) {
      subdomain = currentHost.replace('.localhost', '');
    }
  }

  // Si se detecta subdominio válido (y no es ruta de admin ni login)
  if (
    subdomain && 
    subdomain !== 'www' && 
    !url.pathname.startsWith('/admin') && 
    !url.pathname.startsWith('/sign-in')
  ) {
    const rewritePath = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Excluir archivos estáticos internos y recursos multimedia
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Rutas de API
    '/(api|trpc)(.*)',
  ],
};
