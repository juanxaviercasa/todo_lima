const definitions = [
  ['/herramientas/finanzas/calculadora-precios-venta-igv/', 'calculadora-precios-venta-igv', 'igv', 'Comerciante calcula precios y revisa comprobantes en su negocio.'],
  ['/herramientas/finanzas/calculadora-sobrecostos-laborales/', 'calculadora-sobrecostos-laborales', 'costos-laborales', 'Empresario y asesora revisan la planificación de personal.'],
  ['/herramientas/finanzas/calculadora-prestamos-amortizaciones/', 'calculadora-prestamos-amortizaciones', 'prestamos', 'Emprendedor compara un cronograma de financiamiento con un asesor.'],
  ['/herramientas/finanzas/flujo-caja-pymes/', 'flujo-caja-pymes', 'flujo-caja', 'Escritorio con registros de ingresos, gastos y gráficos de flujo de caja.'],
  ['/herramientas/ventas/generador-codigos-qr/', 'generador-codigos-qr', 'qr', 'Cliente utiliza su teléfono para escanear un código QR ilustrativo en una cafetería.'],
  ['/herramientas/operaciones/calculadora-flete-envio-local/', 'calculadora-flete-envio-local', 'flete', 'Repartidor organiza entregas junto a una camioneta y paquetes.'],
  ['/herramientas/ventas/creador-facturas-proforma/', 'creador-facturas-proforma', 'proforma', 'Administradora prepara documentos proforma y muestras de productos.'],
  ['/herramientas/ventas/generador-cotizaciones/', 'generador-cotizaciones', 'cotizaciones', 'Carpintero y cliente revisan un presupuesto en el taller.'],
  ['/herramientas/ventas/crm-pymes/', 'crm-pymes', 'crm', 'Equipo comercial organiza el seguimiento de clientes.'],
  ['/herramientas/legal/generador-contratos-servicios/', 'generador-contratos-servicios', 'contratos', 'Profesionales revisan y firman un acuerdo de servicios.'],
  ['/herramientas/legal/generador-politicas-devolucion/', 'generador-politicas-devolucion', 'devoluciones', 'Vendedora atiende una devolución de producto en una tienda.'],
  ['/herramientas/legal/generador-politicas-terminos/', 'generador-politicas-terminos', 'terminos-web', 'Emprendedor y asesora revisan documentos para su sitio web.'],
  ['/herramientas/marketing/auditor-seo-basico/', 'auditor-seo-basico', 'seo', 'Consultor analiza la presencia digital de un negocio con su propietario.'],
  ['/herramientas/productividad/conversor-optimizador-imagenes/', 'conversor-optimizador-imagenes', 'webp', 'Fotógrafa prepara imágenes de productos para una tienda digital.'],
  ['/herramientas/marketing/analizador-titulares/', 'analizador-titulares', 'titulares', 'Redactora compara propuestas de titulares para contenido comercial.'],
  ['/herramientas/productividad/generador-paletas-corporativas/', 'generador-paletas-corporativas', 'paletas', 'Diseñadora selecciona muestras de color para una identidad visual.']
];

function asset(id, alt) {
  const base = `/images/herramientas/${id}`;
  return { src: `${base}.webp`, srcSet: `${base}-480.webp 480w, ${base}-768.webp 768w, ${base}.webp 1440w`, alt };
}

export const TOOL_IMAGES = Object.fromEntries(
  definitions.map(([pathname, , id, alt]) => [pathname, asset(id, alt)])
);

for (const [pathname, slug] of definitions) {
  const value = TOOL_IMAGES[pathname];
  for (const alias of [pathname.replace(/\/$/, ''), slug, `/${slug}`, `/${slug}.html`]) {
    if (!(alias in TOOL_IMAGES)) {
      Object.defineProperty(TOOL_IMAGES, alias, { value, enumerable: false });
    }
  }
}

export function getToolImage(urlOrPath) {
  if (!urlOrPath) return undefined;
  if (TOOL_IMAGES[urlOrPath]) return TOOL_IMAGES[urlOrPath];
  try {
    const pathname = urlOrPath.startsWith('http') ? new URL(urlOrPath).pathname : urlOrPath.split('?')[0];
    if (TOOL_IMAGES[pathname]) return TOOL_IMAGES[pathname];
    const slug = pathname.replace(/\/+$/, '').split('/').pop()?.replace(/\.html$/, '');
    return slug ? TOOL_IMAGES[slug] : undefined;
  } catch {
    return undefined;
  }
}

export const TOOLS_HERO = asset('herramientas-portada', 'Emprendedores organizan la gestión digital de un pequeño negocio en Lima.');
