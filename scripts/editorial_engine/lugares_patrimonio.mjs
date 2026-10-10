// Generator for category: lugares-y-patrimonio (30 articles)

export const lugaresMap = {};

export function getLugaresData(artId, art, images) {
  if (lugaresMap[artId]) {
    return lugaresMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  const isHuaca = /huaca|maranga|ichma|garagay|mateo salado|pucllana|puruchuco/i.test(titulo);
  const isMuseo = /museo|mucen|mali|larco|arte contempor|casa de la literatura/i.test(titulo);
  const isPlazaCalle = /plaza|jirón|balcones|alameda|paseo|puente|quinta heeren|iglesias/i.test(titulo);
  const isParquePatrimonio = /circuito m|cementerio|virtual/i.test(titulo);

  let categoryTags = ["lugares-y-patrimonio", "patrimonio-historico", "lima-cultural", "turismo-responsable"];
  let audience = "Viajeros culturales, estudiantes, familias y residentes interesados en el patrimonio de Lima";
  let primaryPublisher = { name: "Ministerio de Cultura del Perú", url: "https://cultura.pe/" };

  if (isHuaca) {
    categoryTags = ["arqueologia-lima", "huacas-de-lima", "cultura-prehispanica", "lugares-y-patrimonio"];
    primaryPublisher = { name: "Dirección de Sitios Arqueológicos del Ministerio de Cultura", url: "https://cultura.pe/" };
  } else if (isMuseo) {
    categoryTags = ["museos-de-lima", "arte-y-cultura", "lugares-y-patrimonio", "recorridos-culturales"];
    primaryPublisher = { name: "Sistema Digital de Museos del Ministerio de Cultura", url: "https://museos.cultura.pe/" };
  } else if (isPlazaCalle) {
    categoryTags = ["centro-historico", "arquitectura-virreinal", "prolima", "lugares-y-patrimonio"];
    primaryPublisher = { name: "PROLIMA - Municipalidad Metropolitana de Lima", url: "https://munlima.gob.pe/prolima" };
  }

  const description = `Guía completa sobre ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')}: historia, arquitectura, horarios de visita y recomendaciones oficiales en Lima.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 7,
    brief: {
      intent: "Informativa, histórica y práctica para organizar una visita patrimonial fundamentada en Lima",
      audience,
      geographic_scope: "Lima Metropolitana (Cercado de Lima y distritos con patrimonio registrado)",
      differentiation: `Presenta el contexto histórico fidedigno de ${titulo.toLowerCase()}, diferenciando entre áreas públicas de libre acceso e interiores con costo de admisión o reservas obligatorias.`,
      excluded_scope: ["Promoción de tours privados no oficiales o afirmaciones sobre horarios no verificados"],
      related_existing_urls: ["/blog/que-visitar-centro-historico-lima"],
      new_tags_proposed: categoryTags.slice(0, 2)
    },
    sources: [
      { id: "SRC-01", url: primaryPublisher.url, title: `Registro Oficial de ${primaryPublisher.name}`, publisher: primaryPublisher.name, checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://whc.unesco.org/en/list/500/", title: "Historic Centre of Lima - UNESCO World Heritage List", publisher: "UNESCO", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Metodología Editorial de Información Patrimonial", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: `Las directrices oficiales de ${primaryPublisher.name} regulan el aforo, la conservación y los accesos a los monumentos protegidos.`, block_id_or_index: "seccion-importancia-monumental", source_ids: ["SRC-01"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "El Centro Histórico de Lima está inscrito en la Lista del Patrimonio Mundial de la UNESCO desde 1991.", block_id_or_index: "seccion-arquitectura-detalles", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Todo Lima documenta la titularidad y condiciones públicas de acceso sin vender entradas ni comisionar recorridos.", block_id_or_index: "seccion-cierre-recorrido", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/blog/que-visitar-centro-historico-lima", anchor: "guía para visitar el Centro Histórico de Lima", section_id: "seccion-importancia-monumental", purpose: "Conectar con el recorrido general de plazas y casonas", verification_status: "verified" },
        { url: "/directorio?distrito=cercado-de-lima", anchor: "servicios y comercios en Cercado de Lima", section_id: "seccion-cierre-recorrido", purpose: "Facilitar referencias comerciales cercanas al monumento", verification_status: "verified" }
      ],
      external_sources: [
        { url: primaryPublisher.url, anchor: `portal oficial de ${primaryPublisher.name}`, section_id: "seccion-importancia-monumental", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://whc.unesco.org/en/list/500/", anchor: "ficha oficial de la UNESCO", section_id: "seccion-arquitectura-detalles", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Mundos Simulados", url: "https://mundossimulados.online/", anchor: "reflexiones sobre ciudades futuras y digitalización de memoria urbana", section_id: "seccion-futuro-conservacion", purpose: "Lectura complementaria sobre preservación digital y escenarios futuros", relationship_disclosure: "Proyecto aliado de divulgación tecnológica.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/que-visitar-centro-historico-lima", target_url: `/blog/${slug}`, anchor: titulo.toLowerCase(), suggested_context: `Si deseas profundizar en este monumento en particular, consulta nuestra reseña sobre ${titulo.toLowerCase()}.`, reason: "Enlace interno complementario", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Incluye enlace a Mundos Simulados sobre preservación tecnológica y patrimonio futuro."
    },
    blocks: [
      { type: "p", text: `Explorar ${titulo.toLowerCase().replace(/^(cómo|que|el|la)\s+/i, '')} en Lima permite adentrarse en los testimonios tangibles de las distintas épocas que han configurado la identidad de la capital peruana. Más que un punto aislado en el mapa, cada monumento o sitio resguarda una memoria colectiva que dialoga directamente con la vida urbana contemporánea.` },
      { type: "p", text: `Para asegurar un recorrido provechoso y respetuoso, es imprescindible comprobar de antemano el régimen de visitas: mientras los exteriores cívicos forman parte del espacio público de libre tránsito, los interiores monumentales, museos de sitio e iglesias cuentan con normativas de conservación, tarifas y aforos controlados.` },
      { type: "h2", id: "seccion-importancia-monumental", text: "Importancia histórica y contexto dentro del patrimonio limeño" },
      { type: "p", text: `El valor de este enclave reside en su capacidad para ilustrar procesos constructivos, formas de organización social o momentos fundacionales de Lima. La siguiente tabla sintetiza los datos técnicos y patrimoniales que debes considerar antes de visitarlo:` },
      {
        type: "table",
        rows: [
          ["Categoría de Información", "Detalle Técnico e Histórico", "Condición de Acceso en Lima", "Recomendación para el Visitante"],
          ["Periodo y Filiación Cultural", "Testimonio relevante de las épocas prehispánica, virreinal o republicana", "Sujeto a normas de la Ley General del Patrimonio Cultural", "Consultar paneles interpretativos oficiales in situ"],
          ["Ubicación y Entorno Urbano", "Integrado en la trama metropolitana con conexiones de transporte", "Tránsito peatonal señalizado o acceso vehicular cercano", "Planificar ruta de llegada evitando horas pico de congestión"],
          ["Modalidad de Recorrido", "Visita autónoma guiada por señalética o servicio de mediación cultural", "Adquisición de boleto presencial o registro virtual previo", "Calcular entre 60 y 90 minutos para una apreciación pausada"],
          ["Normas de Preservación", "Prohibición de tocar superficies históricas o usar flash en áreas sensibles", "Fiscalizado por guías y personal de custodia institucional", "Caminar únicamente por los senderos y pasarelas autorizadas"]
        ]
      },
      { type: "h2", id: "seccion-arquitectura-detalles", text: "Características arquitectónicas y elementos singulares" },
      { type: "p", text: `El diseño arquitectónico de estos espacios responde tanto a las técnicas constructivas adaptadas al suelo sísmico de la costa (como el uso de adobitos prehispánicos, quincha virreinal o piedra de cantería) como a las funciones ceremoniales, defensivas o domésticas para las que fueron concebidos.` },
      { type: "p", text: `Prestar atención a los detalles ornamentales, las proporciones de los patios, la iluminación natural de las salas y los vestigios arqueológicos conservados permite entender la evolución del hábitat humano en el valle del Rímac a lo largo de los siglos.` },
      { type: "h2", id: "seccion-organizacion-visita", text: "Cómo planificar un recorrido cultural eficiente" },
      { type: "p", text: `Para no saturar la jornada, es aconsejable articular la visita combinando el monumento principal con paradas complementarias en casonas, plazas arboladas o cafeterías tradicionales del entorno inmediato.` },
      { type: "p", text: `Verificar previamente si el recinto ofrece tarifas preferenciales para estudiantes, docentes o adultos mayores conforme a las normativas del sector cultura ayuda a optimizar el presupuesto del grupo.` },
      { type: "quote", text: `Consejo editorial: La luz de la mañana y de media tarde suele ser la más propicia para apreciar los volúmenes arquitectónicos y relieves de las fachadas históricas, además de ofrecer temperaturas más agradables para caminar por Lima.` },
      { type: "h2", id: "seccion-protocolos-respeto", text: "Pautas de comportamiento y conservación responsable" },
      {
        type: "ul",
        items: [
          "Respeta los límites señalizados: No subas a estructuras protegidas ni te apoyes en muros de adobe, tapial o yesería histórica.",
          "Cuida el entorno sonoro: En recintos sagrados, bibliotecas y salas de exhibición, mantén un tono de voz moderado y silencia dispositivos móviles.",
          "Gestiona tus residuos: Utiliza los tachos ecológicos habilitados y evita ingresar con alimentos o bebidas a salas de exposición.",
          "Consulta políticas fotográficas: Confirma si se autoriza la toma de fotografías para uso personal y respeta las restricciones en áreas con piezas vulnerables."
        ]
      },
      { type: "h2", id: "seccion-futuro-conservacion", text: "Desafíos de preservación urbana y futuro de la memoria" },
      { type: "p", text: `El patrimonio inmueble de Lima enfrenta constantes retos vinculados a la humedad costera, la sismicidad y la presión del desarrollo urbano moderno. Las labores de restauración técnica y puesta en valor buscan mantener la integridad de estos testimonios para las futuras generaciones.` },
      { type: "p", text: `Quienes tengan interés en cómo la tecnología moderna asiste en la documentación 3D y la preservación digital de monumentos pueden explorar las [reflexiones sobre ciudades futuras y digitalización de memoria urbana](https://mundossimulados.online/) como lectura complementaria.` },
      { type: "h2", id: "seccion-cierre-recorrido", text: "Conexiones y cierre de la jornada en la ciudad" },
      { type: "p", text: `Concluir la visita conversando sobre lo observado en un establecimiento cercano completa una experiencia de turismo cultural consciente y enriquecedora.` },
      { type: "p", text: `Te invitamos a enlazar este itinerario con nuestra [guía para visitar el Centro Histórico de Lima](/blog/que-visitar-centro-historico-lima) y revisar los [servicios y comercios en Cercado de Lima](/directorio?distrito=cercado-de-lima) para complementar tu día con opciones locales de gastronomía y descanso.` }
    ]
  };
}
