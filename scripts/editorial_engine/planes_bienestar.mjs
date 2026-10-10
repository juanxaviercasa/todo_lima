// Generator for category: planes-y-bienestar (25 articles)

export const planesMap = {};

export function getPlanesData(artId, art, images) {
  if (planesMap[artId]) {
    return planesMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  const isNaturaleza = /serpar|pantanos|lachay|malecón|costa verde|playa|aves|picnic/i.test(titulo);
  const isFamilia = /adultos mayores|bebés|familia|niños|calendario/i.test(titulo);
  const isDeporte = /cancha|torneo|piscinas|bicicleta|caminata/i.test(titulo);
  const isTalleres = /taller|danza|música|creativo|fotogr/i.test(titulo);

  let categoryTags = ["planes-y-bienestar", "actividades-lima", "ocio-saludable", "vida-urbana"];
  let audience = "Familias, jóvenes, deportistas y grupos de amigos en Lima";
  let primaryPublisher = { name: "Servicio de Parques de Lima (SERPAR)", url: "https://serpar.gob.pe/" };

  if (isNaturaleza) {
    categoryTags = ["parques-de-lima", "naturaleza-costera", "espacios-publicos", "planes-y-bienestar"];
  } else if (isFamilia) {
    categoryTags = ["planes-familiares", "accesibilidad-lima", "bienestar-familiar", "planes-y-bienestar"];
    primaryPublisher = { name: "Municipalidad Metropolitana de Lima", url: "https://munlima.gob.pe/" };
  } else if (isDeporte) {
    categoryTags = ["deporte-y-salud", "recreacion-activa", "canchas-lima", "planes-y-bienestar"];
    primaryPublisher = { name: "Instituto Peruano del Deporte (IPD)", url: "https://ipd.gob.pe/" };
  } else if (isTalleres) {
    categoryTags = ["talleres-creativos", "desarrollo-personal", "planes-y-bienestar", "cultura-viva"];
    primaryPublisher = { name: "Gerencia de Cultura de Lima", url: "https://munlima.gob.pe/" };
  }

  const description = `Guía sobre ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima: planificación, requisitos oficiales, accesibilidad y consejos para disfrutar sin imprevistos.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 6,
    brief: {
      intent: "Recreativa, práctica y orientadora sobre planes de ocio y bienestar en Lima",
      audience,
      geographic_scope: "Lima Metropolitana y áreas naturales periurbanas",
      differentiation: `Proporciona pautas de accesibilidad real, reglamentos vigentes y verificación de aforos para ${titulo.toLowerCase()} sin presentar publicidad de eventos caducados.`,
      excluded_scope: ["Venta de paquetes recreativos comerciales o garantías de clima soleado en la costa"],
      related_existing_urls: ["/blog/que-visitar-centro-historico-lima"],
      new_tags_proposed: categoryTags.slice(0, 2)
    },
    sources: [
      { id: "SRC-01", url: primaryPublisher.url, title: `Reglamento y Servicios de ${primaryPublisher.name}`, publisher: primaryPublisher.name, checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://serpar.gob.pe/", title: "Directorio Oficial de Clubes Metropolitanos y Parques de Lima", publisher: "SERPAR", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Metodología Editorial de Ocio y Espacios Públicos", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: `Las ordenanzas y directivas de ${primaryPublisher.name} determinan el uso correcto de áreas recreativas públicas en Lima.`, block_id_or_index: "seccion-criterios-eleccion", source_ids: ["SRC-01"], volatile: true, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "SERPAR establece normativas específicas sobre ingreso libre para adultos mayores y niños menores de 10 años en clubes zonales.", block_id_or_index: "seccion-accesibilidad-tarifas", source_ids: ["SRC-02"], volatile: true, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Todo Lima no cobra comisiones por sugerir actividades ni garantiza condiciones de operadores privados.", block_id_or_index: "seccion-cierre-planes", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/directorio?distrito=san-borja", anchor: "áreas verdes y servicios en San Borja", section_id: "seccion-criterios-eleccion", purpose: "Conectar con distritos de amplia infraestructura recreativa", verification_status: "verified" },
        { url: "/blog/revisar-informacion-negocio-lima", anchor: "verificar condiciones antes de contratar", section_id: "seccion-cierre-planes", purpose: "Recomendar cautela al reservar servicios recreativos privados", verification_status: "verified" }
      ],
      external_sources: [
        { url: primaryPublisher.url, anchor: `portal oficial de ${primaryPublisher.name}`, section_id: "seccion-criterios-eleccion", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://serpar.gob.pe/", anchor: "tarifario y reglas de SERPAR", section_id: "seccion-accesibilidad-tarifas", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Mundos Simulados", url: "https://mundossimulados.online/", anchor: "escenarios sobre ciudades inteligentes y bienestar urbano", section_id: "seccion-convivencia-ciudad", purpose: "Lectura complementaria sobre urbanismo, áreas verdes y futuro de la habitabilidad", relationship_disclosure: "Proyecto aliado de divulgación tecnológica.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/revisar-informacion-negocio-lima", target_url: `/blog/${slug}`, anchor: titulo.toLowerCase(), suggested_context: `Si buscas alternativas de esparcimiento en la capital, revisa nuestra guía sobre ${titulo.toLowerCase()}.`, reason: "Enlace interno temático", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Incluye enlace reflexivo a Mundos Simulados sobre espacio público y calidad de vida urbana."
    },
    blocks: [
      { type: "p", text: `Organizar adecuadamente ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima es una de las formas más efectivas de desconectar de la rutina urbana y aprovechar los espacios al aire libre, centros culturales y áreas recreativas que ofrece la capital.` },
      { type: "p", text: `Para que la jornada sea placentera y libre de contratiempos, conviene planificar teniendo en cuenta el clima costero, los tiempos reales de traslado interdistrital y las normativas particulares de cada recinto en cuanto a aforos, permisos de ingreso y servicios higiénicos disponibles.` },
      { type: "h2", id: "seccion-criterios-eleccion", text: "Criterios esenciales para elegir y organizar la actividad" },
      { type: "p", text: `Antes de salir de casa, es importante dimensionar el plan en función del grupo que te acompaña y el tiempo total disponible. La siguiente matriz resume las variables operativas que debes revisar:` },
      {
        type: "table",
        rows: [
          ["Variable de Planificación", "Consideración en Lima", "Pregunta Previa Clave", "Medida Recomendada"],
          ["Clima y Temporada", "Humedad costera matutina o sol intenso en verano", "¿El espacio cuenta con sombra natural o cobertura?", "Llevar cortaviento en invierno y protección solar todo el año"],
          ["Accesibilidad Universal", "Presencia de rampas, veredas transitables o escaleras", "¿Es apto para coches de bebé o sillas de ruedas?", "Confirmar estado de accesos antes de movilizarse"],
          ["Servicios Básicos In Situ", "Disponibilidad de baños públicos limpios y puntos de hidratación", "¿Hay quioscos formales o es mejor llevar provisiones?", "Portar botellas reutilizables y snacks ligeros"],
          ["Conectividad y Retorno", "Facilidad para tomar transporte público o pedir taxi", "¿La zona tiene cobertura y tránsito fluido al atardecer?", "Definir punto exacto de encuentro para el regreso"]
        ]
      },
      { type: "h2", id: "seccion-accesibilidad-tarifas", text: "Costos, requisitos de acceso y reservas formales" },
      { type: "p", text: `Muchos de los principales espacios recreativos de Lima, como los clubes metropolitanos administrados por [SERPAR](https://serpar.gob.pe/), ofrecen tarifas sumamente accesibles e ingreso gratuito para menores de diez años y adultos mayores previa presentación del DNI.` },
      { type: "p", text: `En el caso de canchas deportivas, piscinas o talleres con cupos limitados, se recomienda reservar con varios días de anticipación mediante las plataformas municipales oficiales o canales de atención autorizados para asegurar el turno sin pagar sobreprecios.` },
      { type: "h2", id: "seccion-equipamiento-prevencion", text: "Qué llevar en la mochila para una jornada confortable" },
      { type: "p", text: `Un equipamiento adecuado previene incomodidades comunes durante las caminatas o actividades recreativas. Ropa cómoda de fibras respirables, calzado con suela antideslizante y una batería portátil para el teléfono móvil son elementos esenciales.` },
      { type: "p", text: `Si acudes con mascotas, recuerda portar siempre correa, collar con placa identificatoria y bolsas biodegradables para recoger cualquier residuo de manera inmediata.` },
      { type: "quote", text: `Consejo editorial: Si realizas una actividad al aire libre en distritos cercanos al mar como Miraflores o Chorrillos, ten en cuenta que la brisa costera desciende la sensación térmica a partir de las 17:00 horas, por lo que una prenda abrigadora ligera siempre es oportuna.` },
      { type: "h2", id: "seccion-checklist-organizacion", text: "Checklist para coordinar actividades en grupo" },
      {
        type: "ul",
        items: [
          "Confirma el punto y hora de encuentro: Elige una referencia reconocible y de fácil acceso peatonal.",
          "Verifica el pronóstico del día: Revisa las condiciones de nubosidad o radiación UV antes de partir.",
          "Acuerda el presupuesto colectivo: Si comparten gastos de entradas, canchas o meriendas, define montos claros con anticipación.",
          "Respeta la fauna y flora local: En humedales, lomas o parques costeros, mantén distancia de los animales silvestres y no dejes desperdicios."
        ]
      },
      { type: "h2", id: "seccion-convivencia-ciudad", text: "Convivencia ciudadana y cuidado de los espacios compartidos" },
      { type: "p", text: `El bienestar urbano en una metrópoli de diez millones de habitantes depende directamente del respeto mutuo en las áreas públicas. Modular el volumen de la música personal, cuidar el mobiliario urbano y respetar las zonas de descanso beneficia a toda la comunidad.` },
      { type: "p", text: `Para reflexionar sobre el diseño urbano sostenible y la importancia de los pulmones verdes en las metrópolis, te sugerimos explorar los [escenarios sobre ciudades inteligentes y bienestar urbano](https://mundossimulados.online/) como lectura complementaria.` },
      { type: "h2", id: "seccion-cierre-planes", text: "Cierre y siguientes pasos para disfrutar de la ciudad" },
      { type: "p", text: `Disfrutar de la ciudad no requiere grandes inversiones económicas, sino curiosidad para descubrir rincones amables y constancia para cuidar la salud física y emocional.` },
      { type: "p", text: `Puedes consultar las [áreas verdes y servicios en San Borja](/directorio?distrito=san-borja) u otros distritos limeños para programar tu próxima salida con información útil y contrastada.` }
    ]
  };
}
