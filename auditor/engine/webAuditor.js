/**
 * Motor de Auditoría Técnica y Comercial de Sitios Web para Todo Lima.
 * Evalúa rendimiento, protocolo SSL, SEO on-page, diseño responsive y arquitectura de conversión.
 */

const SOCIAL_DOMAINS = [
  { domain: 'facebook.com', name: 'Facebook' },
  { domain: 'fb.com', name: 'Facebook' },
  { domain: 'instagram.com', name: 'Instagram' },
  { domain: 'wa.me', name: 'WhatsApp Directo' },
  { domain: 'api.whatsapp.com', name: 'WhatsApp Directo' },
  { domain: 'linktr.ee', name: 'Linktree' },
  { domain: 'tiktok.com', name: 'TikTok' },
  { domain: 'linkedin.com', name: 'LinkedIn' },
  { domain: 'youtube.com', name: 'YouTube' }
];

const FREE_PLATFORMS = [
  { domain: 'sites.google.com', name: 'Google Sites' },
  { domain: 'wixsite.com', name: 'Wix (Gratuito)' },
  { domain: 'wordpress.com', name: 'WordPress.com (Básico)' },
  { domain: 'blogspot.com', name: 'Blogger' },
  { domain: 'negocio.site', name: 'Google Mi Negocio Site' }
];

/**
 * Clasifica la URL del negocio antes de realizar peticiones de red
 * @param {string|null} rawUrl
 */
export function categorizeWebsite(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim() === '' || rawUrl.trim() === 'null') {
    return {
      type: 'NO_WEBSITE',
      provider: null,
      cleanUrl: null,
      isActionable: true,
      label: 'Sin sitio web'
    };
  }

  let clean = rawUrl.trim();
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }

  let parsed;
  try {
    parsed = new URL(clean);
  } catch (err) {
    return {
      type: 'INVALID_URL',
      provider: null,
      cleanUrl: rawUrl,
      isActionable: true,
      label: 'URL no válida'
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  // 1. Redes Sociales
  for (const social of SOCIAL_DOMAINS) {
    if (hostname.includes(social.domain)) {
      return {
        type: 'SOCIAL_ONLY',
        provider: social.name,
        cleanUrl: clean,
        isActionable: true,
        label: `Solo perfil de ${social.name}`
      };
    }
  }

  // 2. Plataformas gratuitas
  for (const plat of FREE_PLATFORMS) {
    if (hostname.includes(plat.domain)) {
      return {
        type: 'FREE_PLATFORM',
        provider: plat.name,
        cleanUrl: clean,
        isActionable: true,
        label: `Página en ${plat.name}`
      };
    }
  }

  return {
    type: 'CUSTOM_WEBSITE',
    provider: 'Dominio Propio',
    cleanUrl: clean,
    isActionable: true,
    label: 'Sitio Web Propio'
  };
}

/**
 * Audita a fondo un sitio web real
 * @param {string} url
 * @param {number} timeoutMs
 */
export async function auditWebsite(url, timeoutMs = 7000) {
  const category = categorizeWebsite(url);

  // Si no es un sitio web que deba auditarse por HTTP
  if (category.type === 'NO_WEBSITE' || category.type === 'INVALID_URL') {
    return {
      tested: false,
      url: category.cleanUrl,
      type: category.type,
      provider: category.provider,
      score: 0,
      accessible: false,
      issues: ['No cuenta con un sitio web registrado.'],
      recommendations: ['Crear una landing page moderna con botón directo a WhatsApp y alta velocidad.'],
      details: null
    };
  }

  if (category.type === 'SOCIAL_ONLY') {
    return {
      tested: false,
      url: category.cleanUrl,
      type: category.type,
      provider: category.provider,
      score: 25,
      accessible: true,
      issues: [
        `Usa un perfil de ${category.provider} como sitio web oficial.`,
        'Los perfiles sociales no posicionan en Google para búsquedas de compra local directa.',
        'Las redes sociales distraen al usuario con publicidad de la competencia.'
      ],
      recommendations: [
        'Lanzar un dominio web propio o subdominio verificado de Todo Lima con catálogo de servicios y captura de leads.'
      ],
      details: null
    };
  }

  // Para sitios web (CUSTOM_WEBSITE o FREE_PLATFORM) hacemos el sondeo HTTP
  const startTime = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(category.cleanUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 (TodoLimaBot/2.0; +https://todolima.com/audit)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-PE,es;q=0.9,en;q=0.8'
      }
    });

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;
    const finalUrl = response.url;
    const isHttps = finalUrl.startsWith('https://');
    const httpStatus = response.status;
    const accessible = response.ok;

    let html = '';
    try {
      // Leemos hasta ~500 KB para análisis eficiente
      const text = await response.text();
      html = text.substring(0, 500000);
    } catch (e) {
      html = '';
    }

    // Análisis de etiquetas y estructura
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = descMatch ? descMatch[1].trim() : null;

    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
    const h1Count = h1Matches.length;

    // Análisis de conversión (WhatsApp y Teléfono)
    const hasWhatsApp = /(wa\.me|api\.whatsapp\.com|whatsapp:\/\/)/i.test(html);
    const hasPhoneLink = /href=["']tel:[^"']+["']/i.test(html);
    const hasContactForm = /<form[^>]*>/i.test(html);

    // Detección de Tecnologías
    const techStack = [];
    if (/wp-content|wordpress/i.test(html)) techStack.push('WordPress');
    if (/elementor/i.test(html)) techStack.push('Elementor');
    if (/wix\.com/i.test(html)) techStack.push('Wix');
    if (/shopify/i.test(html)) techStack.push('Shopify');
    if (/woocommerce/i.test(html)) techStack.push('WooCommerce');
    if (/webflow/i.test(html)) techStack.push('Webflow');
    if (/react|__next/i.test(html)) techStack.push('Next.js / React');
    if (/bootstrap/i.test(html)) techStack.push('Bootstrap');
    if (category.provider === 'Google Sites') techStack.push('Google Sites');

    // Detección de antigüedad en copyright
    let outdatedYear = null;
    const yearMatch = html.match(/©\s*(20[0-2][0-9])/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1], 10);
      if (year < 2024) outdatedYear = year;
    }

    // CALCULO DEL SCORE (0 a 100)
    let score = 0;
    const issues = [];
    const strengths = [];
    const recommendations = [];

    // 1. Seguridad y protocolo (25 pts)
    if (isHttps) {
      score += 15;
      strengths.push('Certificado SSL activo (HTTPS).');
    } else {
      issues.push('Sitio sin candado de seguridad SSL (HTTP no seguro).');
      recommendations.push('Instalar certificado SSL obligatorio para no espantar clientes con advertencias del navegador.');
    }

    if (httpStatus === 200) {
      score += 10;
    } else {
      issues.push(`Código de respuesta HTTP anómalo: ${httpStatus}.`);
    }

    // 2. Velocidad de respuesta (25 pts)
    if (latencyMs < 1200) {
      score += 25;
      strengths.push(`Tiempo de respuesta excelente (${latencyMs}ms).`);
    } else if (latencyMs < 2500) {
      score += 18;
      strengths.push(`Tiempo de respuesta aceptable (${latencyMs}ms).`);
    } else if (latencyMs < 4500) {
      score += 8;
      issues.push(`Tiempo de carga lento (${latencyMs}ms). En móviles el usuario abandona tras 3 segundos.`);
      recommendations.push('Optimizar servidor, imágenes y código para reducir la carga a menos de 1.5 segundos.');
    } else {
      score += 2;
      issues.push(`Tiempo de carga crítico (${latencyMs}ms). Carga demasiado lenta.`);
      recommendations.push('Migrar a una arquitectura web moderna de alta velocidad (Next.js/Edge).');
    }

    // 3. SEO y Responsive Mobile (25 pts)
    if (hasViewport) {
      score += 10;
      strengths.push('Configuración adaptada a pantallas móviles (viewport activo).');
    } else {
      issues.push('No tiene etiqueta viewport: se ve diminuto y roto en teléfonos celulares.');
      recommendations.push('Implementar diseño responsivo mobile-first urgente.');
    }

    if (title && title.length >= 15 && title.length <= 75) {
      score += 5;
      strengths.push('Título SEO bien calibrado.');
    } else if (!title) {
      issues.push('No tiene etiqueta <title>: Google no puede indexar el negocio correctamente.');
      recommendations.push('Agregar un título SEO con palabra clave + distrito de Lima.');
    } else {
      score += 2;
      issues.push(`Título SEO con longitud mejorable (${title.length} caracteres).`);
    }

    if (metaDescription && metaDescription.length >= 50) {
      score += 5;
      strengths.push('Meta-descripción presente para snippets de Google.');
    } else {
      issues.push('Carece de meta-descripción optimizada para búsquedas en Google.');
      recommendations.push('Redactar una meta-descripción persuasiva con llamada a la acción.');
    }

    if (h1Count === 1) {
      score += 5;
      strengths.push('Encabezado principal H1 único y bien estructurado.');
    } else if (h1Count === 0) {
      issues.push('Sin etiqueta de título principal H1 para posicionamiento orgánico.');
    } else {
      score += 2;
      issues.push(`Múltiples etiquetas H1 detectadas (${h1Count}), diluyendo la fuerza SEO.`);
    }

    // 4. Arquitectura de Conversión (25 pts)
    if (hasWhatsApp) {
      score += 15;
      strengths.push('Botón o enlace directo de WhatsApp integrado.');
    } else {
      issues.push('No tiene botón directo a WhatsApp (pierde hasta 60% de contactos en Lima).');
      recommendations.push('Integrar botón flotante de WhatsApp con mensaje pre-configurado para captar prospectos al instante.');
    }

    if (hasPhoneLink) {
      score += 5;
      strengths.push('Enlace de llamada telefónica directa (tel:) activo.');
    } else {
      issues.push('Teléfono en texto plano: el cliente no puede llamar con un solo toque desde el celular.');
      recommendations.push('Habilitar enlaces de llamada táctil directa (click-to-call).');
    }

    if (hasContactForm) {
      score += 5;
      strengths.push('Formulario de contacto presente.');
    }

    if (outdatedYear) {
      issues.push(`Copyright desactualizado (${outdatedYear}), transmitiendo imagen de negocio abandonado.`);
      recommendations.push('Actualizar el diseño y pie de página con información del año en curso.');
    }

    return {
      tested: true,
      url: category.cleanUrl,
      finalUrl,
      type: category.type,
      provider: category.provider,
      score: Math.min(100, Math.max(0, score)),
      accessible,
      httpStatus,
      latencyMs,
      isHttps,
      hasWhatsApp,
      hasPhoneLink,
      hasContactForm,
      hasViewport,
      title,
      metaDescription,
      h1Count,
      techStack,
      outdatedYear,
      issues,
      strengths,
      recommendations,
      details: {
        seo: { title, metaDescription, hasViewport, h1Count },
        performance: { latencyMs, status: httpStatus },
        conversion: { hasWhatsApp, hasPhoneLink, hasContactForm },
        tech: techStack
      }
    };

  } catch (error) {
    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;
    const isTimeout = error.name === 'AbortError' || error.message.includes('timeout');

    return {
      tested: true,
      url: category.cleanUrl,
      type: category.type,
      provider: category.provider,
      score: 10,
      accessible: false,
      httpStatus: isTimeout ? 408 : 500,
      latencyMs,
      issues: [
        isTimeout
          ? `El servidor tardó más de ${timeoutMs / 1000}s en responder (Timeout). El sitio está prácticamente inoperativo para usuarios móviles.`
          : `Error de conexión al cargar la página: ${error.message}. El sitio se encuentra caído o inaccesible.`
      ],
      recommendations: [
        'Restaurar o migrar el sitio a una infraestructura cloud de alta disponibilidad y carga instantánea.'
      ],
      details: { error: error.message }
    };
  }
}
