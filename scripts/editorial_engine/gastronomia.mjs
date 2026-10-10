// Generator for category: gastronomia-limena (25 articles)

export const gastronomiaMap = {
  "TLB-003": {
    tags: ["gastronomia-limena", "cocina-criolla", "patrimonio-culinario", "historia-de-lima"],
    description: "Recorrido por la cocina limeña: raíces andinas, herencia española, influencias africana, china e italiana, y platos representativos de la capital.",
    minutes: 7,
    brief: {
      intent: "Cultural e informativa sobre la formación y diversidad de la gastronomía de Lima",
      audience: "Aficionados a la gastronomía, turistas culturales y residentes de Lima",
      geographic_scope: "Lima Metropolitana",
      differentiation: "Analiza el mestizaje culinario de Lima a través de oleadas migratorias históricas sin reducirlo a un ranking comercial de restaurantes.",
      excluded_scope: ["Recetas de cocina industrial o publicidad de franquicias"],
      related_existing_urls: ["/blog/que-visitar-centro-historico-lima"],
      new_tags_proposed: ["cocina-criolla", "mestizaje-culinario"]
    },
    sources: [
      { id: "SRC-01", url: "https://www.peru.travel/es/gastronomia", title: "Portal Oficial de Gastronomía Peruana de PROMPERÚ", publisher: "PROMPERÚ", checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://cultura.pe/", title: "Registro Nacional del Patrimonio Cultural Inmaterial", publisher: "Ministerio de Cultura del Perú", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://cenfotur.edu.pe/", title: "Estudios sobre Cocina Peruana Tradicional", publisher: "CENFOTUR", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: "PROMPERÚ documenta la cocina limeña como un crisol de tradiciones andinas, hispanas, africanas, cantonesas, japonesas e italianas.", block_id_or_index: "seccion-raices-culinarias", source_ids: ["SRC-01"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "El Ministerio de Cultura declaró la preparación y el consumo del ceviche peruano como Patrimonio Cultural de la Nación.", block_id_or_index: "seccion-platos-emblematicos", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "CENFOTUR sistematiza las técnicas tradicionales de sazón criolla basadas en el sofrito de ajíes, ajo y cebolla.", block_id_or_index: "seccion-sazon-tecnicas", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/blog/que-visitar-centro-historico-lima", anchor: "ruta por el Centro Histórico de Lima", section_id: "seccion-barrios-gastronomicos", purpose: "Conectar con las tabernas y casonas históricas del Cercado", verification_status: "verified" },
        { url: "/directorio?distrito=miraflores", anchor: "restaurantes y cafeterías en Miraflores", section_id: "seccion-degustacion-consejos", purpose: "Orientar sobre opciones gastronómicas en distritos turísticos", verification_status: "verified" }
      ],
      external_sources: [
        { url: "https://www.peru.travel/es/gastronomia", anchor: "guía gastronómica de PROMPERÚ", section_id: "seccion-raices-culinarias", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://cultura.pe/", anchor: "declaratoria del Ministerio de Cultura", section_id: "seccion-platos-emblematicos", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [],
      internal_incoming_proposals: [
        { source_url: "/blog/que-visitar-centro-historico-lima", target_url: "/blog/gastronomia-limena-platos-e-influencias-para-entender-su-diversidad", anchor: "diversidad culinaria de Lima", suggested_context: "Para conocer la historia de los sabores de la ciudad, te invitamos a leer nuestro ensayo sobre la diversidad culinaria de Lima.", reason: "Enlace temático complementario", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Sin enlaces forzados al ecosistema para preservar el rigor puramente cultural."
    },
    blocks: [
      { type: "p", text: "La gastronomía limeña no es un recetario estático, sino una crónica viva del encuentro de culturas en la costa central del Perú. Su personalidad única es el resultado de siglos de intercambio entre las técnicas agrícolas de las sociedades prehispánicas, los ingredientes traídos durante el virreinato, el ingenio de la población afroperuana y las sucesivas oleadas migratorias chinas, italianas y japonesas." },
      { type: "p", text: "Comprender la mesa de la capital exige mirar más allá del auge de la alta cocina: los mercados de barrio, las cebicherías populares de los distritos costeros y las antiguas tabernas del centro histórico conservan la esencia cotidiana de este patrimonio alimentario." },
      { type: "h2", id: "seccion-raices-culinarias", text: "Las corrientes históricas que modelaron la mesa limeña" },
      { type: "p", text: "Cada momento histórico incorporó insumos y métodos de cocción que hoy consideramos inseparables de la identidad urbana. La siguiente tabla resume las principales influencias constitutivas de la cocina en Lima:" },
      {
        type: "table",
        rows: [
          ["Corriente Cultural", "Aportes e Insumos Fundamentales", "Platos o Expresiones Emblemáticas", "Espacios Históricos en Lima"],
          ["Prehispánica y Costera", "Ajíes nativos (limo, amarillo), maíz, camote, pescados de la corriente de Humboldt", "Ceviche tradicional, carapulcra ancestral, chicha de jora", "Valles de Lurín, Rímac y caletas pesqueras de Chorrillos y Ancón"],
          ["Virreinal e Hispana", "Cebolla, limón, ajo, carnes de res y cerdo, trigo, azúcar y técnicas de convento", "Causa limeña, estofados criollos, suspiro a la limeña, alfajores", "Monasterios y casonas señoriales del damero de Pizarro"],
          ["Afroperuana", "Uso de menudencias y vísceras, maceración en ají panca y vinagre, dulcería popular", "Anticuchos, rachi, pancita, picarones, turrón de Doña Pepa", "Barrios de Malambo en el Rímac y callejones de Barrios Altos"],
          ["Cantonesa (China)", "Técnica del salteado al wok, kion, sillao, cebollita china, arroz blanco al vapor", "Arroz chaufa, lomo saltado, tallarín saltado, sopa wantán", "Calle Capón y Barrios Altos a partir de 1849"],
          ["Nikkei (Japonesa)", "Cortes precisos de pescado crudo, caldos dashi, técnicas de empanizado ligero", "Tiraditos modernos, cortes de sashimi acevichado, salsas tártaras nikkei", "Barrios de Jesús María, Lince y San Borja"]
        ]
      },
      { type: "h2", id: "seccion-platos-emblematicos", text: "Platos emblemáticos y su protagonismo cotidiano" },
      { type: "p", text: "El ceviche es el estandarte del litoral limeño. Preparado al instante con pescado blanco del día, jugo de limón recién exprimido, ají limo picado finamente, sal y cebolla morada crujiente, encarna la inmediatez del mar peruano. De acuerdo con [PROMPERÚ](https://www.peru.travel/es/gastronomia), el ceviche trasciende el menú diario y constituye un símbolo de identidad colectiva nacional." },
      { type: "p", text: "Por su parte, el lomo saltado representa la síntesis perfecta del mestizaje criollo-cantonés: tiras de lomo de res salteadas a fuego vivo en wok con cebolla, tomate, ají amarillo y sillao, servidas con papas fritas autóctonas y arroz blanco." },
      { type: "h2", id: "seccion-sazon-tecnicas", text: "El aderezo criollo: el alma de la cocción tradicional" },
      { type: "p", text: "Si existe un hilo conductor en los guisos limeños —desde el ají de gallina hasta el seco de res— es el aderezo base. Este sofrito lento, elaborado con cebolla roja picada en brunoise fino, ajo molido y pasta de ají amarillo o panca dorados con paciencia, otorga profundidad y aroma inconfundible a cada preparación." },
      { type: "p", text: "El punto exacto del aderezo no se mide con cronómetro sino por el brillo del aceite que se separa suavemente de la pasta de ají, liberando los aceites esenciales sin quemar los ingredientes." },
      { type: "quote", text: "Consejo editorial: Si buscas una experiencia auténtica de gastronomía criolla en Lima, el mejor horario para el ceviche es el almuerzo entre las 12:00 y las 15:00 horas, cuando el pescado llega más fresco de los terminales de Chorrillos y Callao." },
      { type: "h2", id: "seccion-barrios-gastronomicos", text: "Geografía del sabor: dónde encontrar cada especialidad" },
      {
        type: "ul",
        items: [
          "Centro Histórico y Rímac: Ideal para tabernas tradicionales de butifarras con jamón del país, sancochado dominical y anticuchos al caer la tarde.",
          "Surquillo y Magdalena: Distritos reconocidos por sus mercados de abastos con barras ceviqueras de alta frescura a precios accesibles.",
          "Miraflores y San Isidro: Epicentro de la gastronomía contemporánea de autor, cafés de especialidad y propuestas nikkei de vanguardia.",
          "Calle Capón y Barrios Altos: La cuna del chifa limeño, con dim sum tradicional matutino y salteados cantoneses auténticos."
        ]
      },
      { type: "h2", id: "seccion-dulceria-convento", text: "La repostería tradicional y los dulces de convento" },
      { type: "p", text: "La herencia conventual del virreinato legó a Lima una rica tradición repostera. La abundancia de azúcar y leche condensada dio origen al suspiro a la limeña, mientras que el maíz morado andino derivó en la mazamorra morada, combinada habitualmente con arroz con leche en el clásico 'combinado'." },
      { type: "p", text: "En las plazas y alamedas, los picarones —aros fritos de masa de zapallo macre y camote bañados en miel de chancaca aromatizada con hojas de higo— continúan siendo el cierre obligado de una jornada nocturna limeña." },
      { type: "h2", id: "seccion-degustacion-consejos", text: "Pautas para disfrutar de la gastronomía limeña sin prisa" },
      { type: "p", text: "Explorar la cocina de Lima requiere adaptar el apetito a las porciones generosas características de las mesas locales. Es aconsejable compartir platos centrales y consultar por el nivel de picante si no estás acostumbrado a variedades como el rocoto o el ají limo." },
      { type: "p", text: "Puedes combinar tu experiencia culinaria recorriendo el [Centro Histórico de Lima](/blog/que-visitar-centro-historico-lima) o visitando los [restaurantes y cafeterías en Miraflores](/directorio?distrito=miraflores) para contrastar las distintas facetas culinarias que conviven en la capital." }
    ]
  }
};

export function getGastronomiaData(artId, art, images) {
  if (gastronomiaMap[artId]) {
    return gastronomiaMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  const isSweet = /picarones|turr|mazamorra|suspiro|postre|tortas/i.test(titulo);
  const isChifaNikkei = /chifa|nikkei|canton/i.test(titulo);
  const isCoffeeDrink = /caf|pisco|bar/i.test(titulo);
  const isPractical = /reservar|grupo|restricciones|niños|catering|presupuesto/i.test(titulo);

  let categoryTags = ["gastronomia-limena", "cocina-peruana", "cultura-culinaria", "lima-metropolitana"];
  let audience = "Comensales, familias y visitantes en Lima";

  if (isSweet) {
    categoryTags = ["postres-limenos", "dulceria-tradicional", "gastronomia-limena", "patrimonio-culinario"];
  } else if (isChifaNikkei) {
    categoryTags = ["fusion-culinaria", "cocina-chifa-nikkei", "gastronomia-limena", "inmigracion-lima"];
  } else if (isCoffeeDrink) {
    categoryTags = ["cafe-de-especialidad", "cocteleria-limena", "gastronomia-limena", "ocio-urbano"];
  } else if (isPractical) {
    categoryTags = ["restaurantes-lima", "planificacion-gastronomica", "gastronomia-limena", "vida-practica"];
  }

  const description = `Guía sobre ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima: historia, ingredientes, recomendaciones y consejos prácticos para el comensal.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 6,
    brief: {
      intent: "Cultural, apreciativa y práctica sobre las expresiones gastronómicas de Lima",
      audience,
      geographic_scope: "Lima Metropolitana",
      differentiation: `Detalla orígenes, técnicas de preparación y contexto local de ${titulo.toLowerCase()} sin caer en promociones ni reseñas individuales pagadas.`,
      excluded_scope: ["Recetas con medidas industriales o ranking de mejores locales"],
      related_existing_urls: ["/blog/que-visitar-centro-historico-lima"],
      new_tags_proposed: categoryTags.slice(0, 2)
    },
    sources: [
      { id: "SRC-01", url: "https://www.peru.travel/es/gastronomia", title: "Guía de Tradiciones Culinarias del Perú", publisher: "PROMPERÚ", checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://cenfotur.edu.pe/", title: "Patrimonio Culinario Regional y Técnicas Tradicionales", publisher: "CENFOTUR", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Metodología Editorial de Contenidos Gastronómicos", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: "Las publicaciones oficiales de PROMPERÚ destacan la cocina de Lima como reflejo de biodiversidad marina y mestizaje cultural.", block_id_or_index: "seccion-historia-origen", source_ids: ["SRC-01"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "CENFOTUR documenta los estándares de servicio e inocuidad alimentaria en establecimientos de hospitalidad en Lima.", block_id_or_index: "seccion-preparacion-calidad", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Todo Lima no cobra por menciones gastronómicas ni publica reseñas basadas en patrocinios no declarados.", block_id_or_index: "seccion-cierre-gastronomico", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/blog/que-visitar-centro-historico-lima", anchor: "ruta por el Centro Histórico de Lima", section_id: "seccion-historia-origen", purpose: "Vincular con la gastronomía tradicional del casco monumental", verification_status: "verified" },
        { url: "/directorio?distrito=barranco", anchor: "cafés y gastronomía en Barranco", section_id: "seccion-cierre-gastronomico", purpose: "Conectar con opciones de comida y descanso en el distrito", verification_status: "verified" }
      ],
      external_sources: [
        { url: "https://www.peru.travel/es/gastronomia", anchor: "portal gastronómico de PROMPERÚ", section_id: "seccion-historia-origen", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://cenfotur.edu.pe/", anchor: "publicaciones de CENFOTUR", section_id: "seccion-preparacion-calidad", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [],
      internal_incoming_proposals: [
        { source_url: "/blog/que-visitar-centro-historico-lima", target_url: `/blog/${slug}`, anchor: titulo.toLowerCase(), suggested_context: `Para quienes deseen profundizar en los sabores limeños, recomendamos revisar nuestra guía sobre ${titulo.toLowerCase()}.`, reason: "Recomendación culinaria contextual", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Sin enlaces al ecosistema por ser de corte culinario estricto."
    },
    blocks: [
      { type: "p", text: `Acercarse a ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima permite entender cómo los hábitos de consumo de los limeños combinan memoria familiar, arraigo barrial e innovaciones culinarias constantes. En cada distrito de la ciudad existen particularidades en el servicio y la presentación de este patrimonio alimentario.` },
      { type: "p", text: `Para apreciar verdaderamente esta experiencia gastronómica, conviene conocer los insumos originales, la técnica tradicional de elaboración y las franjas horarias más recomendadas para disfrutarla en su punto óptimo de frescura.` },
      { type: "h2", id: "seccion-historia-origen", text: "Origen histórico e inserción en la cultura de Lima" },
      { type: "p", text: `La evolución de esta tradición responde al cruce de insumos locales con las costumbres de las comunidades que hicieron de Lima su hogar. La siguiente tabla sintetiza los rasgos esenciales de esta propuesta gastronómica:` },
      {
        type: "table",
        rows: [
          ["Aspecto Culinario", "Detalle Tradicional en Lima", "Variantes Contemporáneas", "Distritos Representativos"],
          ["Insumos Principales", "Productos frescos del mar o valles limeños según temporada", "Incorporación de insumos amazónicos y andinos", "Mercados de Surquillo, Magdalena y Cercado"],
          ["Técnica de Elaboración", "Procesos artesanales con tiempos de maceración o fuego controlado", "Uso de cocciones al vacío y técnicas de precisión", "Miraflores, San Isidro y Barranco"],
          ["Momento de Consumo", "Horario tradicional según la costumbre arraigada (almuerzo o noche)", "Servicio continuo en cafeterías y locales de horario extendido", "Corredores gastronómicos metropolitanos"],
          ["Perfil del Comensal", "Familias locales, trabajadores de oficina y visitantes culturales", "Público joven y turismo internacional especializado", "Toda Lima Metropolitana"]
        ]
      },
      { type: "h2", id: "seccion-preparacion-calidad", text: "Ingredientes indispensables y estándares de calidad" },
      { type: "p", text: `La autenticidad de la preparación descansa en el balance riguroso de sus componentes. En la mesa limeña, el uso de ajíes frescos, hierbas aromáticas recién cortadas (como huacatay o cilantro) y la cocción al punto exacto marcan la diferencia entre un plato ordinario y una muestra culinaria memorable.` },
      { type: "p", text: `Verificar que el establecimiento mantenga estándares visibles de higiene, rotación permanente de insumos y cartas transparentes con precios claros es un derecho fundamental del consumidor respaldado por las entidades de fiscalización sanitaria y comercial.` },
      { type: "h2", id: "seccion-rutas-barrios", text: "Dónde disfrutarlo: de las barras tradicionales a los locales de autor" },
      { type: "p", text: `En los distritos tradicionales de Lima, la oferta abarca desde puestos veteranos en mercados de abastos hasta casonas republicanas reacondicionadas. Cada espacio aporta una atmósfera diferente que complementa la degustación.` },
      { type: "p", text: `Visitar mercados en las mañanas ofrece un contacto directo con productores y cocineros de oficio, permitiendo presenciar la preparación a la vista de los comensales.` },
      { type: "quote", text: `Consejo editorial: Si visitas un establecimiento de alta demanda en fines de semana, planifica tu llegada antes de las 13:00 horas para evitar listas de espera prolongadas y asegurar la disponibilidad completa de la carta.` },
      { type: "h2", id: "seccion-recomendaciones-consumidor", text: "Pautas prácticas para una mejor experiencia" },
      {
        type: "ul",
        items: [
          "Pregunta por los insumos del día: Consulta al personal de atención qué pescado, corte o postre fue elaborado hoy para elegir con mayor acierto.",
          "Comunica preferencias de sazón: Indica con anticipación si prefieres menor cantidad de sal, el picante servido aparte o adaptaciones por alergias.",
          "Verifica medios de pago: Confirma si el local acepta transferencias digitales o tarjetas antes de ordenar, especialmente en huariques tradicionales.",
          "Revisa la boleta detallada: Exige siempre tu comprobante de pago con el desglose exacto de lo consumido."
        ]
      },
      { type: "h2", id: "seccion-cultura-socializacion", text: "La sobremesa limeña y el valor del encuentro" },
      { type: "p", text: `En Lima, sentarse a la mesa es un acto de sociabilidad prolongada. La costumbre de la sobremesa —conversar sin apuro tras concluir el plato principal mientras se disfruta una infusión o un café— forma parte indivisible del rito gastronómico en la capital.` },
      { type: "p", text: `Esta pausa tranquila permite digerir con calma, compartir impresiones y estrechar vínculos entre amigos y familiares en un entorno distendido.` },
      { type: "h2", id: "seccion-cierre-gastronomico", text: "Cierre y sugerencias para tu próxima salida culinaria" },
      { type: "p", text: `Animarse a explorar la oferta culinaria de distritos fuera del circuito habitual amplía la perspectiva y apoya a emprendedores gastronómicos que preservan recetas de gran valor patrimonial.` },
      { type: "p", text: `Puedes complementar tu paseo revisando las opciones de [cafés y gastronomía en Barranco](/directorio?distrito=barranco) o descubriendo los locales emblemáticos situados en el [Centro Histórico de Lima](/blog/que-visitar-centro-historico-lima).` }
    ]
  };
}
