const definitions = [
  ['calculadora-precios-venta-igv', 'igv', 'Comerciante calcula precios y revisa comprobantes en su negocio.'],
  ['calculadora-sobrecostos-laborales', 'costos-laborales', 'Empresario y asesora revisan la planificación de personal.'],
  ['calculadora-prestamos-amortizaciones', 'prestamos', 'Emprendedor compara un cronograma de financiamiento con un asesor.'],
  ['flujo-caja-pymes', 'flujo-caja', 'Escritorio con registros de ingresos, gastos y gráficos de flujo de caja.'],
  ['generador-codigos-qr', 'qr', 'Cliente utiliza su teléfono para escanear un código QR ilustrativo en una cafetería.'],
  ['calculadora-flete-envio-local', 'flete', 'Repartidor organiza entregas junto a una camioneta y paquetes.'],
  ['creador-facturas-proforma', 'proforma', 'Administradora prepara documentos proforma y muestras de productos.'],
  ['generador-cotizaciones', 'cotizaciones', 'Carpintero y cliente revisan un presupuesto en el taller.'],
  ['crm-pymes', 'crm', 'Equipo comercial organiza el seguimiento de clientes.'],
  ['generador-contratos-servicios', 'contratos', 'Profesionales revisan y firman un acuerdo de servicios.'],
  ['generador-politicas-devolucion', 'devoluciones', 'Vendedora atiende una devolución de producto en una tienda.'],
  ['generador-politicas-terminos', 'terminos-web', 'Emprendedor y asesora revisan documentos para su sitio web.'],
  ['auditor-seo-basico', 'seo', 'Consultor analiza la presencia digital de un negocio con su propietario.'],
  ['conversor-optimizador-imagenes', 'webp', 'Fotógrafa prepara imágenes de productos para una tienda digital.'],
  ['analizador-titulares', 'titulares', 'Redactora compara propuestas de titulares para contenido comercial.'],
  ['generador-paletas-corporativas', 'paletas', 'Diseñadora selecciona muestras de color para una identidad visual.']
];

function asset(id, alt) {
  const base = `/images/herramientas/${id}`;
  return {src: `${base}.webp`, srcSet: `${base}-480.webp 480w, ${base}-768.webp 768w, ${base}.webp 1440w`, alt};
}
export const TOOL_IMAGES = Object.fromEntries(definitions.map(([slug, id, alt]) => [`/${slug}.html`, asset(id, alt)]));
export const TOOLS_HERO = asset('herramientas-portada', 'Emprendedores organizan la gestión digital de un pequeño negocio en Lima.');
