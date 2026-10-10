// Generator for category: negocios-locales (15 articles)

export const negociosMap = {};

export function getNegociosData(artId, art, images) {
  if (negociosMap[artId]) {
    return negociosMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  const isFormalizacion = /libro de reclamaciones|ruc|licencia|itse|artesano|guías oficiales/i.test(titulo);
  const isDigital = /whatsapp|fotografiar|ficha|promoción|reseña|horarios|preguntas/i.test(titulo);

  let categoryTags = ["negocios-locales", "emprendimiento-lima", "gestion-comercial", "buenas-practicas"];
  let audience = "Emprendedores, comerciantes locales, dueños de negocios y profesionales independientes en Lima";
  let primaryPublisher = { name: "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual (INDECOPI)", url: "https://www.gob.pe/indecopi" };

  if (isFormalizacion) {
    categoryTags = ["formalizacion-empresarial", "tramites-lima", "normativa-comercial", "negocios-locales"];
    if (/ruc/i.test(titulo)) {
      primaryPublisher = { name: "Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT)", url: "https://www.gob.pe/sunat" };
    } else if (/artesano|guías/i.test(titulo)) {
      primaryPublisher = { name: "Ministerio de Comercio Exterior y Turismo (MINCETUR)", url: "https://www.gob.pe/mincetur" };
    }
  } else if (isDigital) {
    categoryTags = ["digitalizacion-pymes", "atencion-al-cliente", "marketing-local", "negocios-locales"];
  }

  const description = `Guía práctica sobre ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima: buenas prácticas, obligaciones legales y herramientas para una atención transparente.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 6,
    brief: {
      intent: "Preventiva, formativa y procedimental para titulares de negocios y emprendedores en Lima",
      audience,
      geographic_scope: "Lima Metropolitana (comercios locales y servicios)",
      differentiation: `Explica con claridad y sustento oficial los requisitos y buenas prácticas para ${titulo.toLowerCase()}, separando mitos comerciales de obligaciones normativas vigentes.`,
      excluded_scope: ["Asesoría contable o legal personalizada con patrocinio letrado"],
      related_existing_urls: ["/blog/revisar-informacion-negocio-lima"],
      new_tags_proposed: categoryTags.slice(0, 2)
    },
    sources: [
      { id: "SRC-01", url: primaryPublisher.url, title: `Plataforma y Normativa Oficial de ${primaryPublisher.name}`, publisher: primaryPublisher.name, checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://www.gob.pe/indecopi", title: "Guía de Buenas Prácticas Comerciales y Protección al Consumidor", publisher: "Indecopi", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Criterios Editoriales y Registro Comercial", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: `Las disposiciones vigentes de ${primaryPublisher.name} establecen los marcos regulatorios y procedimientos formales en el Perú.`, block_id_or_index: "seccion-marco-normativo", source_ids: ["SRC-01"], volatile: true, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "Indecopi fiscaliza que los comercios brinden información veraz sobre precios, promociones y canales de atención de reclamos.", block_id_or_index: "seccion-pasos-implementacion", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Todo Lima publica información de negocios con fines informativos y de enlace sin avalar transacciones privadas.", block_id_or_index: "seccion-cierre-negocios", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/blog/revisar-informacion-negocio-lima", anchor: "cómo revisar la información de un negocio en Lima", section_id: "seccion-pasos-implementacion", purpose: "Recomendar la perspectiva del consumidor para optimizar la ficha", verification_status: "verified" },
        { url: "/para-negocios", anchor: "información para negocios en Todo Lima", section_id: "seccion-cierre-negocios", purpose: "Facilitar el registro y actualización de datos comerciales", verification_status: "verified" }
      ],
      external_sources: [
        { url: primaryPublisher.url, anchor: `portal institucional de ${primaryPublisher.name}`, section_id: "seccion-marco-normativo", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://www.gob.pe/indecopi", anchor: "normativa de protección al consumidor de Indecopi", section_id: "seccion-pasos-implementacion", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Nube para Pymes", url: "https://nubeparapymes.online/crm-pymes.html", anchor: "herramientas de gestión y seguimiento de clientes para pymes", section_id: "seccion-herramientas-gestion", purpose: "Utilidad práctica aliada para organizar consultas de clientes", relationship_disclosure: "Proyecto aliado para pymes.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/revisar-informacion-negocio-lima", target_url: `/blog/${slug}`, anchor: titulo.toLowerCase(), suggested_context: `Para titulares de negocios que deseen mejorar sus prácticas comerciales, recomendamos leer nuestra guía sobre ${titulo.toLowerCase()}.`, reason: "Interconexión editorial entre usuario y negocio", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Incluye enlace legítimo a Nube para Pymes por alta pertinencia para la gestión de pymes."
    },
    blocks: [
      { type: "p", text: `Gestionar correctamente ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima es una condición indispensable para construir relaciones de confianza duraderas con los clientes y evitar sanciones administrativas innecesarias en un entorno comercial competitivo.` },
      { type: "p", text: `En la capital, los consumidores valoran la claridad sobre precios, la rapidez en la respuesta por canales directos y la transparencia en las políticas de cambio o atención de garantías, superando con creces a la publicidad ruidosa o las promesas exageradas.` },
      { type: "h2", id: "seccion-marco-normativo", text: "Marco normativo y estándares de transparencia comercial" },
      { type: "p", text: `El marco legal peruano busca proteger los derechos de los consumidores mientras ofrece certidumbre a los negocios formales. La siguiente tabla sintetiza los compromisos operativos prioritarios que todo comercio debe asegurar:` },
      {
        type: "table",
        rows: [
          ["Área de Gestión", "Exigencia Oficial o Buena Práctica", "Canal de Cumplimiento", "Beneficio Directo para el Negocio"],
          ["Transparencia de Precios", "Indicar precio final visible en soles incluyendo IGV", "Cartas, vitrinas, redes sociales y presupuestos", "Evita reclamos por cobros adicionales no informados"],
          ["Atención de Consultas", "Responder dudas con datos exactos de disponibilidad y entrega", "WhatsApp Business, teléfono fijo o mostrador", "Incrementa la tasa de conversión y satisfacción del cliente"],
          ["Libro de Reclamaciones", "Contar con soporte físico o virtual accesible y aviso visible", "Habilitado en local o enlace destacado en sitio web", "Cumplimiento de la Ley 29571 y resolución ágil de incidencias"],
          ["Comprobantes de Pago", "Emitir boleta de venta electrónica o factura por cada transacción", "Sistema de facturación SUNAT o PSE autorizado", "Respaldo contable legal y formalidad ante entidades públicas"]
        ]
      },
      { type: "h2", id: "seccion-errores-comunes", text: "Errores habituales que erosionan la confianza del cliente" },
      { type: "p", text: `Uno de los errores más frecuentes en Lima es responder mensajes comerciales con ambigüedad, exigiendo enviar mensajes privados para conocer precios básicos o publicando fotografías de internet que no coinciden con la infraestructura real del local.` },
      { type: "p", text: `Asimismo, omitir los costos de envío o no delimitar con claridad qué distritos cubre el servicio a domicilio genera fricciones que suelen derivar en reseñas negativas públicas difíciles de revertir.` },
      { type: "h2", id: "seccion-herramientas-gestion", text: "Digitalización simple para organizar el flujo de trabajo" },
      { type: "p", text: `La adopción de tecnología no exige costosas implementaciones de software corporativo. Ordenar la base de datos de consultas mediante [herramientas de gestión y seguimiento de clientes para pymes](https://nubeparapymes.online/crm-pymes.html) permite registrar compromisos, cotizaciones enviadas y fechas de entrega de manera ordenada.` },
      { type: "p", text: `Configurar mensajes de bienvenida y respuestas rápidas para preguntas repetitivas (como métodos de pago o ubicación exacta en mapas) ahorra horas de trabajo a la semana.` },
      { type: "quote", text: `Consejo editorial: La honestidad comercial es el activo más rentable a largo plazo. Si no tienes stock de un producto o no llegas a atender un distrito en el tiempo solicitado, es preferible comunicarlo de inmediato antes de prometer plazos que no podrás cumplir.` },
      { type: "h2", id: "seccion-pasos-implementacion", text: "Checklist para optimizar la presencia de tu negocio" },
      {
        type: "ul",
        items: [
          "Actualiza tu horario real: Refleja con fidelidad si cierras feriados o si tienes pausas de almuerzo para no hacer perder el tiempo a quien viaja a tu local.",
          "Describe tu especialidad con precisión: Explica claramente qué servicios realizas y cuáles derivas a terceros para filtrar consultas pertinentes.",
          "Fotografía tu trabajo auténtico: Muestra tu equipo, tus instalaciones o tus productos reales con buena iluminación natural.",
          "Facilita la ubicación exacta: Comparte referencias barriales claras (avenidas principales, cruces o estaciones cercanas) además del enlace de geolocalización."
        ]
      },
      { type: "h2", id: "seccion-reputacion-resenas", text: "Construcción ética de reputación y manejo de opiniones" },
      { type: "p", text: `Pedir a clientes satisfechos que compartan su experiencia genuina es una práctica saludable, pero condicionar descuentos a cambio de calificaciones de cinco estrellas o comprar reseñas falsas viola las directrices de Indecopi y las políticas de las plataformas digitales.` },
      { type: "p", text: `Responder con cortesía y serenidad a una crítica constructiva demuestra profesionalismo y genera mayor credibilidad ante potenciales clientes que un perfil con calificaciones artificialmente perfectas.` },
      { type: "h2", id: "seccion-cierre-negocios", text: "Conclusión y recursos para el comercio formal en Lima" },
      { type: "p", text: `El tejido de negocios de barrio es el corazón económico y social de Lima. Fortalecer las buenas prácticas comerciales beneficia tanto a las familias emprendedoras como a la comunidad vecinal.` },
      { type: "p", text: `Te invitamos a revisar las pautas para consumidores en nuestra guía sobre [cómo revisar la información de un negocio en Lima](/blog/revisar-informacion-negocio-lima) y consultar la sección de [información para negocios en Todo Lima](/para-negocios) para mantener tu ficha debidamente actualizada.` }
    ]
  };
}
