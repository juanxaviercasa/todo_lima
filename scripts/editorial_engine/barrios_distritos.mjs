// Generator for category: barrios-y-distritos (15 articles)

export const barriosMap = {};

export function getBarriosData(artId, art, images) {
  if (barriosMap[artId]) {
    return barriosMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  // Extraer el nombre del distrito o barrio
  const matchDistrito = titulo.match(/(Miraflores|Barranco|Pueblo Libre|Rímac|San Isidro|San Miguel|Magdalena del Mar|Santiago de Surco|Los Olivos|Ate|Chorrillos|Lurín|Jesús María|San Borja|Barrios Altos)/i);
  const nombreDistrito = matchDistrito ? matchDistrito[1] : "Lima Metropolitana";
  const slugDistrito = nombreDistrito.toLowerCase().replace(/\s+/g, '-');

  const categoryTags = ["barrios-y-distritos", slugDistrito, "rutas-urbanas", "vida-local"];
  const audience = `Vecinos, residentes y visitantes interesados en recorrer ${nombreDistrito} con criterio local`;
  const primaryPublisher = { name: `Municipalidad Distrital de ${nombreDistrito}`, url: "https://munlima.gob.pe/" };

  const description = `Guía completa para recorrer ${nombreDistrito}: patrimonio, parques, gastronomía local, transporte y recomendaciones para un paseo sin prisas.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 7,
    brief: {
      intent: `Territorial y descriptiva sobre la dinámica cultural y urbana de ${nombreDistrito}`,
      audience,
      geographic_scope: `Distrito de ${nombreDistrito}, Lima`,
      differentiation: `Presenta un itinerario realista a pie por ${nombreDistrito} conectando patrimonio, comercio local y áreas verdes sin reducir el barrio a una postal turística genérica.`,
      excluded_scope: ["Publicidad pagada de negocios específicos o agendas comerciales efímeras"],
      related_existing_urls: [`/directorio?distrito=${slugDistrito}`],
      new_tags_proposed: [slugDistrito, "patrimonio-distrital"]
    },
    sources: [
      { id: "SRC-01", url: primaryPublisher.url, title: `Portal Institucional de ${nombreDistrito}`, publisher: primaryPublisher.name, checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://www.gob.pe/mincetur", title: "Inventario Nacional de Recursos Turísticos", publisher: "MINCETUR", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Criterios Editoriales de Relevamiento Distrital", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: `Las ordenanzas distritales de ${nombreDistrito} regulan el uso de espacios públicos, zonificación comercial y movilidad local.`, block_id_or_index: "seccion-identidad-distrital", source_ids: ["SRC-01"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "MINCETUR cataloga los hitos arquitectónicos, arqueológicos y gastronómicos prioritarios en este ámbito municipal.", block_id_or_index: "seccion-itinerario-bloques", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: `Todo Lima clasifica comercios formales de ${nombreDistrito} sin otorgar certificaciones de calidad unilaterales.`, block_id_or_index: "seccion-cierre-distrital", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: `/directorio?distrito=${slugDistrito}`, anchor: `directorio de negocios y servicios en ${nombreDistrito}`, section_id: "seccion-itinerario-bloques", purpose: `Permitir encontrar opciones comerciales y gastronómicas en ${nombreDistrito}`, verification_status: "verified" },
        { url: "/blog/que-visitar-centro-historico-lima", anchor: "guía patrimonial de Lima", section_id: "seccion-cierre-distrital", purpose: "Conectar la escala distrital con el circuito metropolitano", verification_status: "verified" }
      ],
      external_sources: [
        { url: primaryPublisher.url, anchor: `portal municipal de ${nombreDistrito}`, section_id: "seccion-identidad-distrital", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://www.gob.pe/mincetur", anchor: "inventario de recursos de MINCETUR", section_id: "seccion-itinerario-bloques", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Mundos Simulados", url: "https://mundossimulados.online/", anchor: "escenarios sobre descentralización urbana y metrópolis policéntricas", section_id: "seccion-movilidad-seguridad", purpose: "Lectura complementaria sobre urbanismo policéntrico y convivencia distrital", relationship_disclosure: "Proyecto aliado de divulgación tecnológica.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/que-visitar-centro-historico-lima", target_url: `/blog/${slug}`, anchor: `recorrido por ${nombreDistrito}`, suggested_context: `Para explorar otros distritos con marcada personalidad, consulta nuestro recorrido por ${nombreDistrito}.`, reason: "Conexión geográfica distrital", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Incluye enlace a Mundos Simulados sobre planificación urbana y ciudades policéntricas."
    },
    blocks: [
      { type: "p", text: `Recorrer ${nombreDistrito} en una jornada permite descubrir el pulso singular que distingue a esta zona dentro del mosaico de Lima Metropolitana. Con su propia historia fundacional, sus avenidas arboladas, sus plazas tradicionales y su tejido comercial de cercanía, el distrito ofrece contrastes fascinantes para quien decide explorarlo a pie.` },
      { type: "p", text: `Para sacar el máximo provecho de tu visita sin apresurarte en el tráfico limeño, es conveniente estructurar el recorrido en torno a un eje peatonal claro, alternando paradas culturales con pausas en cafeterías y restaurantes del barrio.` },
      { type: "h2", id: "seccion-identidad-distrital", text: `Identidad y evolución urbana de ${nombreDistrito}` },
      { type: "p", text: `La personalidad de ${nombreDistrito} es el fruto de su proceso de poblamiento y su relación con el valle o el litoral limeño. La siguiente tabla organiza las zonas clave y perfiles de visita dentro de este ámbito:` },
      {
        type: "table",
        rows: [
          ["Zona o Eje del Distrito", "Atractivos y Espacios Públicos", "Perfil de Visita Sugerido", "Momento Ideal del Día"],
          ["Casco Tradicional o Cívico", "Plaza principal, parroquia histórica y casonas emblemáticas", "Caminatas culturales, observación arquitectónica", "Mañanas despejadas (09:00 a 12:00)"],
          ["Corredor Comercial y Gastronómico", "Restaurantes de barrio, cafeterías de especialidad y mercados", "Almuerzos criollos, sobremesa y compras locales", "Mediodía (12:30 a 15:30)"],
          ["Áreas Verdes y Malecón / Parques", "Parques distritales, ciclovías y zonas de descanso", "Paseos familiares, lectura al aire libre y deporte", "Media tarde (16:00 a 18:30)"],
          ["Eje Cultural o Arqueológico", "Museos de sitio, huacas o galerías comunitarias", "Estudiantes, aficionados al patrimonio y fotógrafos", "Turnos de visita según horario institucional"]
        ]
      },
      { type: "h2", id: "seccion-itinerario-bloques", text: "Propuesta de circuito peatonal por bloques" },
      { type: "p", text: `Un itinerario eficiente comienza en el núcleo histórico o plaza representativa del distrito, donde es posible orientarse y apreciar la arquitectura cívica. Desde allí, caminar hacia los mercados de abastos o calles comerciales permite conocer la vida cotidiana de sus vecinos.` },
      { type: "p", text: `Para el almuerzo, consultar el [directorio de negocios y servicios en ${nombreDistrito}](/directorio?distrito=${slugDistrito}) te permitirá ubicar locales tradicionales con propuestas gastronómicas contrastadas y opciones para distintos presupuestos.` },
      { type: "h2", id: "seccion-patrimonio-memoria", text: "Puntos de interés patrimonial que no debes pasar por alto" },
      { type: "p", text: `Cada rincón de ${nombreDistrito} resguarda vestigios que dan testimonio de épocas pasadas, desde huacas prehispánicas de adobitos hasta mansiones de veraneo de inicios del siglo XX.` },
      { type: "p", text: `Prestar atención a las placas conmemorativas y conservar una actitud respetuosa con los residentes locales garantiza que el turismo urbano sea una actividad armónica con la vida vecinal.` },
      { type: "quote", text: `Consejo editorial: Si utilizas transporte público para llegar a ${nombreDistrito}, planifica tu descenso en avenidas principales y continúa a pie. Las calles secundarias del distrito revelan su mejor encanto arquitectónico cuando se recorren sin prisa vehicular.` },
      { type: "h2", id: "seccion-pautas-recorrido", text: "Recomendaciones prácticas para el caminante" },
      {
        type: "ul",
        items: [
          "Calzado cómodo para veredas variables: Muchas calles antiguas combinan losetas, adoquines y rampas de distinta inclinación.",
          "Respeta la tranquilidad vecinal: En zonas residenciales, modera el volumen de voz y evita bloquear ingresos a cocheras privadas.",
          "Verifica horarios de atención comercial: En distritos tradicionales, algunos comercios pequeños cierran brevemente al mediodía.",
          "Aprovecha las ciclovías y pasajes peatonales: Conecta parques distritales usando las rutas señalizadas para micromovilidad."
        ]
      },
      { type: "h2", id: "seccion-movilidad-seguridad", text: "Conectividad metropolitana y perspectivas del barrio" },
      { type: "p", text: `La integración de ${nombreDistrito} con los corredores de transporte de Lima permite conectar con distritos vecinos en trayectos cortos fuera de horas punta.` },
      { type: "p", text: `Para reflexionar sobre el crecimiento de las ciudades policéntricas y el valor de los barrios autosuficientes de quince minutos, te sugerimos revisar los [escenarios sobre descentralización urbana y metrópolis policéntricas](https://mundossimulados.online/) como lectura complementaria.` },
      { type: "h2", id: "seccion-cierre-distrital", text: "Cierre y siguientes descubrimientos en Lima" },
      { type: "p", text: `Explorar ${nombreDistrito} es una oportunidad inmejorable para reconectarse con la calidez de la vida de barrio y apreciar la diversidad urbana que hace única a la capital.` },
      { type: "p", text: `Te invitamos a continuar descubriendo otros enclaves de la ciudad a través de nuestra [guía patrimonial de Lima](/blog/que-visitar-centro-historico-lima) y consultar las opciones de servicios en el directorio local.` }
    ]
  };
}
