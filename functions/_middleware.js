/**
 * Cloudflare Pages Functions - Edge Middleware
 * Gestiona el enrutamiento Multi-Inquilino de subdominios (*.todolima.com)
 * directamente en la red de borde de Cloudflare con 0ms de latencia.
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  // Excluir activos estáticos internos, bundles de Next.js e imágenes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/images') ||
    url.pathname.includes('.')
  ) {
    return context.next();
  }

  // Dominios raíz que no deben ser tratados como subdominios
  const rootDomains = [
    'todolima.com',
    'www.todolima.com',
    'localhost',
    '127.0.0.1'
  ];

  // Identificar si la petición proviene de un subdominio de todolima.com o local
  let subdomain = null;
  if (!rootDomains.includes(hostname)) {
    if (hostname.endsWith('.todolima.com')) {
      subdomain = hostname.replace('.todolima.com', '');
    } else if (hostname.endsWith('.localhost')) {
      subdomain = hostname.replace('.localhost', '');
    }
  }

  // Si existe un subdominio válido (diferente de www)
  if (subdomain && subdomain !== 'www') {
    // Evitar bucles de reescritura si la URL ya tiene el prefijo
    if (!url.pathname.startsWith(`/${subdomain}`)) {
      url.pathname = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
      const newRequest = new Request(url.toString(), request);
      return env.ASSETS.fetch(newRequest);
    }
  }

  return context.next();
}
