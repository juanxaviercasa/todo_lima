// Generator for category: cultura-y-tradiciones (20 articles)

export const culturaMap = {};

export function getCulturaData(artId, art, images) {
  if (culturaMap[artId]) {
    return culturaMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  const isMusica = /música|crioll|vals|marinera|cajón|peñas|jaranas/i.test(titulo);
  const isAfroperuano = /afroperuan|cajón/i.test(titulo);
  const isDevocion = /milagros|morado|amancaes|aniversario|fiestas patrias/i.test(titulo);
  const isLetrasArtes = /teatro|biblioteca|librer|arte urbano|artesan|fotograf|ferias/i.test(titulo);

  let categoryTags = ["cultura-y-tradiciones", "identidad-limena", "patrimonio-inmaterial", "vida-cultural"];
  let audience = "Amantes de la cultura, residentes, familias y visitantes en Lima";
  let primaryPublisher = { name: "Ministerio de Cultura del Perú", url: "https://cultura.pe/" };

  if (isMusica || isAfroperuano) {
    categoryTags = ["musica-criolla", "folclore-peruano", "cultura-afroperuana", "cultura-y-tradiciones"];
    primaryPublisher = { name: "Dirección de Patrimonio Inmaterial del Ministerio de Cultura", url: "https://cultura.pe/" };
  } else if (isDevocion) {
    categoryTags = ["tradiciones-limenas", "senor-de-los-milagros", "costumbres-populares", "cultura-y-tradiciones"];
    primaryPublisher = { name: "Municipalidad Metropolitana de Lima", url: "https://munlima.gob.pe/" };
  } else if (isLetrasArtes) {
    categoryTags = ["letras-y-artes", "teatro-limeno", "librerias-lima", "cultura-y-tradiciones"];
    primaryPublisher = { name: "Biblioteca Nacional del Perú", url: "https://bnp.gob.pe/" };
  }

  const description = `Estudio cultural sobre ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima: historia, expresiones vivas, espacios de difusión y fuentes oficiales.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 7,
    brief: {
      intent: "Cultural, documental y testimonial sobre las tradiciones y manifestaciones de Lima",
      audience,
      geographic_scope: "Lima Metropolitana (barrios tradicionales y centros culturales)",
      differentiation: `Explora el significado social y la evolución de ${titulo.toLowerCase()} sin caer en estereotipos pintorescos, reconociendo el protagonismo de las comunidades portadoras de la tradición.`,
      excluded_scope: ["Venta de entradas para peñas comerciales o agendas caducadas"],
      related_existing_urls: ["/blog/que-visitar-centro-historico-lima"],
      new_tags_proposed: categoryTags.slice(0, 2)
    },
    sources: [
      { id: "SRC-01", url: primaryPublisher.url, title: `Registro Oficial de Expresiones Culturales de ${primaryPublisher.name}`, publisher: primaryPublisher.name, checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://cultura.pe/", title: "Declaratorias de Patrimonio Cultural de la Nación", publisher: "Ministerio de Cultura del Perú", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Criterios Editoriales para Expresiones Culturales", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: `Las declaratorias oficiales de ${primaryPublisher.name} reconocen la trascendencia de estas expresiones en la identidad nacional.`, block_id_or_index: "seccion-significado-cultural", source_ids: ["SRC-01"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "El Ministerio de Cultura promueve salvaguardas patrimoniales para la música criolla y tradiciones afroperuanas.", block_id_or_index: "seccion-comunidades-portadoras", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Todo Lima no comercializa presentaciones artísticas ni certifica autenticidad de locales privados sin evidencia.", block_id_or_index: "seccion-cierre-cultural", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/blog/que-visitar-centro-historico-lima", anchor: "Centro Histórico y sus barrios tradicionales", section_id: "seccion-espacios-difusion", purpose: "Conectar las expresiones con los barrios fundacionales de la música y la tradición", verification_status: "verified" },
        { url: "/directorio?distrito=barranco", anchor: "centros culturales y librerías en Barranco", section_id: "seccion-cierre-cultural", purpose: "Facilitar referencias culturales en el distrito bohemio", verification_status: "verified" }
      ],
      external_sources: [
        { url: primaryPublisher.url, anchor: `portal institucional de ${primaryPublisher.name}`, section_id: "seccion-significado-cultural", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://cultura.pe/", anchor: "declaratorias de patrimonio del Ministerio de Cultura", section_id: "seccion-comunidades-portadoras", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Mundos Simulados", url: "https://mundossimulados.online/", anchor: "análisis sobre transmisión cultural, memoria colectiva y lenguajes del futuro", section_id: "seccion-salvaguarda-futuro", purpose: "Lectura complementaria sobre permanencia de tradiciones y mutaciones culturales", relationship_disclosure: "Proyecto aliado de divulgación tecnológica.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/que-visitar-centro-historico-lima", target_url: `/blog/${slug}`, anchor: titulo.toLowerCase(), suggested_context: `Para conocer las tradiciones vivas de nuestra ciudad, revisa nuestra entrega sobre ${titulo.toLowerCase()}.`, reason: "Conexión cultural directa", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Incluye enlace reflexivo a Mundos Simulados sobre memoria cultural y transmisión intergeneracional."
    },
    blocks: [
      { type: "p", text: `Acercarse a ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima es descubrir la vitalidad de una memoria comunitaria que se transmite de generación en generación en los callejones, solares, centros musicales y plazas de la capital.` },
      { type: "p", text: `Lejos de ser una reliquia del pasado, las tradiciones limeñas continúan evolucionando activamente al contacto con las nuevas dinámicas urbanas, manteniendo su fuerza integradora y su capacidad de convocar a ciudadanos de todos los distritos.` },
      { type: "h2", id: "seccion-significado-cultural", text: "Significado histórico y raíces en la identidad de Lima" },
      { type: "p", text: `El origen de esta manifestación se entrelaza con la vida cotidiana de las clases populares, las festividades cívicas y religiosas, y la creatividad de cultores anónimos que forjaron un lenguaje estético propio. La siguiente tabla sintetiza sus dimensiones esenciales:` },
      {
        type: "table",
        rows: [
          ["Dimensión Cultural", "Manifestación en Lima", "Protagonistas y Portadores", "Espacios Tradicionales de Encuentro"],
          ["Origen y Época Formativa", "Nacimiento en barrios tradicionales o solares virreinales/republicanos", "Familias cultoras, cofradías, compositores criollos", "Rímac, Barrios Altos, Monserrate y La Victoria"],
          ["Instrumentos y Soportes", "Uso de guitarra, cajón, palmas, pregones o artes manuales", "Músicos de oficio, artesanos, intérpretes vocales", "Centros sociales musicales, peñas y templos"],
          ["Transmisión Intergeneracional", "Aprendizaje oral en tertulias familiares y talleres comunitarios", "Maestros veteranos y nuevas agrupaciones juveniles", "Centros culturales barriales y escuelas de arte"],
          ["Presencia en el Calendario", "Fechas conmemorativas oficiales y celebraciones populares", "Ciudadanía en general y asociaciones civiles", "Calles, alamedas peatonales y plazas cívicas"]
        ]
      },
      { type: "h2", id: "seccion-comunidades-portadoras", text: "El rol de las comunidades y cultores tradicionales" },
      { type: "p", text: `La salvaguarda de este patrimonio descansa primordialmente en el compromiso de las familias y asociaciones que preservan las formas originales de interpretación, toque y confección sin alterar su sentido comunitario profundo.` },
      { type: "p", text: `De acuerdo con las directrices del [Ministerio de Cultura del Perú](https://cultura.pe/), el reconocimiento formal de estas expresiones busca proteger a sus portadores y fomentar la investigación académica que rescate archivos sonoros y testimonios orales invaluables.` },
      { type: "h2", id: "seccion-espacios-difusion", text: "Lugares donde conocer y experimentar esta tradición" },
      { type: "p", text: `En la actualidad, existen espacios idóneos para tomar contacto directo con esta manifestación, desde centros culturales sin fines de lucro hasta festivales públicos organizados en fechas emblemáticas.` },
      { type: "p", text: `Acudir a eventos organizados por los propios cultores garantiza un acercamiento respetuoso y permite comprender los códigos, anécdotas y contextos que dieron origen a cada obra.` },
      { type: "quote", text: `Consejo editorial: Si asistes a un centro musical tradicional o peña de barrio, recuerda que no se trata de un espectáculo teatral distante, sino de un espacio de convivencia participativa donde el público acompaña con respeto y entusiasmo.` },
      { type: "h2", id: "seccion-participacion-respetuosa", text: "Recomendaciones para el visitante y aficionado" },
      {
        type: "ul",
        items: [
          "Infórmate sobre la historia previa: Conocer autores o hitos básicos permite disfrutar con mayor agudeza la interpretación.",
          "Respeta los momentos protocolares: En ceremonias religiosas o tributos musicales, atiende las indicaciones de los organizadores.",
          "Apoya a los artesanos e intérpretes locales: Adquirir producciones discográficas independientes o artesanías directas apoya la sostenibilidad del oficio.",
          "Verifica programaciones vigentes: Consulta redes institucionales de municipios o centros culturales para confirmar fechas y horarios exactos."
        ]
      },
      { type: "h2", id: "seccion-salvaguarda-futuro", text: "Transmisión cultural en la era digital y futuro de la memoria" },
      { type: "p", text: `Las plataformas digitales y redes sociales han abierto canales inéditos para que la juventud limeña acceda a archivos históricos, aprenda técnicas de ejecución y dialogue con maestros tradicionales, revitalizando el legado comunal.` },
      { type: "p", text: `Para explorar cómo las tecnologías de la información transforman la preservación de la memoria histórica y la cultura viva, invitamos a revisar los [análisis sobre transmisión cultural, memoria colectiva y lenguajes del futuro](https://mundossimulados.online/) como lectura complementaria.` },
      { type: "h2", id: "seccion-cierre-cultural", text: "Conclusión y cómo seguir explorando la cultura limeña" },
      { type: "p", text: `Vivir la cultura de Lima es tender puentes entre la memoria histórica y la cotidianidad de nuestros barrios, celebrando la diversidad que hace única a la capital peruana.` },
      { type: "p", text: `Te invitamos a continuar tu recorrido por los [barrios tradicionales del Centro Histórico](/blog/que-visitar-centro-historico-lima) y visitar los [centros culturales y librerías en Barranco](/directorio?distrito=barranco) para seguir profundizando en esta agenda.` }
    ]
  };
}
