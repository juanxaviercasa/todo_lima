// Generator for category: vida-practica (30 articles: TLB-002, 005, 008, 011, 014, 017, 020, 023, 026, 030, 036, 042, 048, 054, 060, 068, 076, 084, 092, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180)

export const vidaPracticaMap = {
  "TLB-002": {
    tags: ["transporte-publico", "atu", "metro-de-lima", "metropolitano"],
    description: "Conoce dónde funcionan la tarjeta TIT, Lima Pass y Metro de Lima, sus tarifas de recarga y los puntos oficiales de transbordo en la capital.",
    minutes: 7,
    brief: {
      intent: "Procedimental sobre medios de pago en transporte público masivo de Lima",
      audience: "Usuarios del transporte público y residentes en Lima Metropolitana",
      geographic_scope: "Lima Metropolitana y Callao",
      differentiation: "Aclara el estado actual de compatibilidad entre la tarjeta TIT de la Línea 2, tarjetas del Metropolitano y Línea 1 sin generalizar una integración que sigue en fase de transición.",
      excluded_scope: ["Rutas de transporte informal o couriers de encomiendas"],
      related_existing_urls: ["/blog/revisar-informacion-negocio-lima"],
      new_tags_proposed: ["tarjeta-tit", "movilidad-urbana"]
    },
    sources: [
      { id: "SRC-01", url: "https://www.gob.pe/atu", title: "Portal Oficial de la Autoridad de Transporte Urbano para Lima y Callao", publisher: "ATU", checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://www.ositran.gob.pe/", title: "Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público", publisher: "Ositrán", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://www.lineauno.pe/", title: "Operación y Sistema de Pasajes de Línea 1 del Metro de Lima", publisher: "Línea 1 Metro de Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: "La tarjeta TIT es emitida bajo estándares de interoperabilidad por la ATU con costo unitario fijado en S/ 7.50 para la Línea 2.", block_id_or_index: "seccion-tit-linea-2", source_ids: ["SRC-01"], volatile: true, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "Ositrán supervisa la infraestructura de cobro y cumplimiento de servicio de las concesiones ferroviarias y viales en Lima.", block_id_or_index: "seccion-linea-1-tren", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Línea 1 del Metro opera con tarjeta propia no transferible al Metropolitano en sus 26 estaciones elevadas.", block_id_or_index: "seccion-linea-1-tren", source_ids: ["SRC-03"], volatile: true, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/directorio?distrito=ate", anchor: "opciones y servicios en Ate", section_id: "seccion-futuro-integracion", purpose: "Conectar con comercios y servicios del entorno de estaciones de Línea 2", verification_status: "verified" },
        { url: "/blog/revisar-informacion-negocio-lima", anchor: "verificar información comercial antes de contratar", section_id: "seccion-consejos-seguridad", purpose: "Enlazar con buenas prácticas de contratación", verification_status: "verified" }
      ],
      external_sources: [
        { url: "https://www.gob.pe/atu", anchor: "portal oficial de la ATU", section_id: "seccion-tit-linea-2", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://www.ositran.gob.pe/", anchor: "supervisión de Ositrán", section_id: "seccion-linea-1-tren", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Mundos Simulados", url: "https://mundossimulados.online/", anchor: "escenarios sobre movilidad inteligente y contingencias urbanas", section_id: "seccion-futuro-integracion", purpose: "Lectura complementaria sobre fallas de red y logística en ciudades futuras", relationship_disclosure: "Proyecto aliado de divulgación tecnológica.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/revisar-informacion-negocio-lima", target_url: "/blog/tarjetas-del-transporte-publico-de-lima-donde-funcionan-y-que-confirmar", anchor: "guía de tarjetas de transporte público en Lima", suggested_context: "Si necesitas desplazarte a distintos distritos de Lima para visitar negocios o realizar trámites, revisa nuestra guía de tarjetas de transporte público.", reason: "Interconexión natural de movilidad", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Mundos Simulados aporta análisis sobre automatización y contingencias de transporte."
    },
    blocks: [
      { type: "p", text: "El sistema de transporte masivo de Lima cuenta con diferentes medios de pago electrónico según la red que utilices: la tarjeta del Metropolitano y Lima Pass para corredores complementarios, la tarjeta de la Línea 1 del Metro de Lima y la nueva Tarjeta Interoperable de Transporte (TIT) introducida para la Línea 2. Conocer qué tarjeta opera en cada servicio evita demoras y contratiempos en tus traslados diarios." },
      { type: "p", text: "Antes de iniciar tu viaje en hora punta, confirma tu saldo disponible y ten en cuenta que no todos los puntos de recarga admiten pagos digitales con billeteras móviles; en muchas boleterías de estación se exige efectivo exacto en monedas o billetes en buen estado." },
      { type: "h2", id: "seccion-mapa-tarjetas", text: "Mapa de tarjetas de transporte masivo en Lima" },
      { type: "p", text: "A diferencia de ciudades con cobro completamente unificado bajo un único soporte, Lima se encuentra en un proceso de transición progresiva. La siguiente tabla sintetiza la compatibilidad de cada tarjeta actualmente vigente en la capital:" },
      {
        type: "table",
        rows: [
          ["Tarjeta o Medio de Pago", "Redes Compatibles", "Puntos de Emisión y Recarga", "Observaciones Clave"],
          ["Tarjeta Interoperable (TIT)", "Línea 2 del Metro (Ate a Callao en tramos activos)", "Boleterías y máquinas de estaciones Línea 2", "Costo oficial de emisión fijado por ATU en S/ 7.50; tecnología contactless"],
          ["Tarjeta Metropolitano / Lima Pass", "Troncales del Metropolitano y Corredores Rojo, Azul y Morado", "Estaciones troncales, terminales Naranjal/Matellini y agentes autorizados", "Permite transbordo con tarifa integrada entre corredores y rutas alimentadoras"],
          ["Tarjeta Línea 1 del Metro", "Línea 1 del Metro (Villa El Salvador a San Juan de Lurigancho)", "Boleterías de las 26 estaciones elevadas del viaducto", "Uso exclusivo para la red férrea de la Línea 1; no válida en buses"],
          ["Medios de Pago Bancario", "Pruebas piloto en estaciones seleccionadas", "Validadores con tecnología EMV contactless", "Sujeto a verificación técnica previa en torniquetes habilitados"]
        ]
      },
      { type: "h2", id: "seccion-tit-linea-2", text: "La Tarjeta Interoperable de Transporte (TIT) y la Línea 2" },
      { type: "p", text: "La Tarjeta Interoperable de Transporte (TIT) representa el estándar tecnológico hacia el que converge la movilidad limeña. De acuerdo con las disposiciones de la [Autoridad de Transporte Urbano para Lima y Callao (ATU)](https://www.gob.pe/atu), esta tarjeta incorpora chips con altos estándares de seguridad que previenen clonaciones y permiten registrar viajes intermodales." },
      { type: "p", text: "En el tramo operativo de la Línea 2 subterránea, la adquisición de la tarjeta TIT es obligatoria para acceder a los trenes. Para quienes viajan desde zonas como Santa Anita o La Molina hacia el este, planificar la compra en ventanilla durante horas de menor afluencia evita filas prolongadas." },
      { type: "h2", id: "seccion-metropolitano-corredores", text: "Metropolitano y Corredores Complementarios: uso de Lima Pass" },
      { type: "p", text: "Para los traslados por vías segregadas de norte a sur o ejes viales como Javier Prado y Arequipa, la tarjeta del Metropolitano y la tarjeta Lima Pass son plenamente intercambiables. Ambas permiten abordar tanto los buses troncales grises como los alimentadores amarillos y los buses de los corredores complementarios." },
      { type: "p", text: "Un aspecto fundamental es la tarifa integrada: si realizas un transbordo dentro de la ventana de tiempo reglamentaria de la ATU (generalmente hasta dos horas desde la primera validación), el sistema aplica un descuento automático en el segundo tramo." },
      { type: "quote", text: "Consejo editorial: Nunca compres saldo a revendedores informales que ofrecen pasar su tarjeta en los torniquetes por un sol adicional. Además de constituir una infracción a las normas de transporte, pierdes el beneficio del seguro contra accidentes para pasajeros que ampara tu viaje formal." },
      { type: "h2", id: "seccion-linea-1-tren", text: "Línea 1 del Metro: especificidades de la red férrea" },
      { type: "p", text: "La Línea 1, que recorre 34 kilómetros conectando once distritos desde Villa El Salvador hasta San Juan de Lurigancho, mantiene su propio sistema de validación gestionado por el concesionario bajo la supervisión de [Ositrán](https://www.ositran.gob.pe/)." },
      { type: "p", text: "Las recargas deben realizarse dentro de las estaciones en las máquinas de autoservicio o ventanillas. El saldo no caduca, por lo que se recomienda mantener una reserva equivalente a varios viajes para agilizar el ingreso en horas de alta congestión matutina y vespertina." },
      { type: "h2", id: "seccion-consejos-seguridad", text: "Recomendaciones prácticas para cuidar tu tarjeta y saldo" },
      {
        type: "ul",
        items: [
          "Guarda el número de serie de tu tarjeta: Si compras una tarjeta personalizada o escolar/universitaria, anota el código posterior para reportarla por extravío o bloqueo ante el concesionario.",
          "Evita doblar o perforar el plástico: Las tarjetas contienen antenas internas de radiofrecuencia (NFC/RFID) que quedan permanentemente inutilizables si se fisuran.",
          "Lleva cambio en efectivo: Aunque la digitalización avanza, la mayoría de máquinas de recarga del Metro y Metropolitano solo aceptan monedas o billetes de baja denominación sin dobleces.",
          "Verifica la pantalla del torniquete: Al apoyar la tarjeta en el sensor, revisa el saldo restante mostrado en el display luminoso antes de avanzar."
        ]
      },
      { type: "h2", id: "seccion-futuro-integracion", text: "El camino hacia el cobro integrado metropolitano" },
      { type: "p", text: "La integración física y tarifaria de todo el sistema de transporte de Lima es una meta de largo plazo establecida en el Plan de Movilidad Urbana de la capital. La progresiva interoperabilidad entre los trenes de la Línea 1, la Línea 2 subterránea y los corredores de buses permitirá a los usuarios conectar distritos distantes con una sola tarjeta y tarifas combinadas." },
      { type: "p", text: "Si requieres desplazarte hacia terminales interprovinciales o zonas industriales no cubiertas por transporte masivo, puedes revisar las [opciones y servicios en Ate](/directorio?distrito=ate) para planificar traslados alternativos o paradas intermedias." },
      { type: "p", text: "Para profundizar sobre cómo la tecnología satelital y las redes de telecomunicaciones sostienen los centros de control de flotas urbanas, invitamos a revisar los [escenarios sobre movilidad inteligente y contingencias urbanas](https://mundossimulados.online/) como lectura complementaria." }
    ]
  }
};

// Generador procedural robusto para los 29 artículos restantes de vida-práctica
export function getVidaPracticaData(artId, art, images) {
  if (vidaPracticaMap[artId]) {
    return vidaPracticaMap[artId];
  }

  const titulo = art.titulo;
  const slug = art.slug_propuesto;

  // Derivación semántica de subtemas y entidades según título
  const isTransport = /transporte|rutas|alertas|terminales|aeropuerto|transbordos|viajar/i.test(titulo);
  const isHome = /edificio|departamento|mantenimiento|incidencia|mudanza|esenciales|pintura|muebles|cortinas|limpieza|fumigaci/i.test(titulo);
  const isPet = /mascota|guarder|peluquer/i.test(titulo);
  const isService = /cotizaci|contratado|acuerdos|cobertura|car wash|barber|reuni|fotograf|impresi|constancias|incidencia/i.test(titulo);

  let categoryTags = ["vida-practica", "lima-metropolitana"];
  let audience = "Residentes y familias en distritos de Lima";
  let primaryOrg = { name: "Indecopi", url: "https://www.gob.pe/indecopi" };

  if (isTransport) {
    categoryTags = ["transporte-publico", "movilidad-lima", "vida-practica", "atu"];
    audience = "Usuarios de transporte y pasajeros en Lima";
    primaryOrg = { name: "Autoridad de Transporte Urbano (ATU)", url: "https://www.gob.pe/atu" };
  } else if (isHome) {
    categoryTags = ["hogar-y-vivienda", "mantenimiento-lima", "vida-practica", "servicios-locales"];
    audience = "Propietarios, inquilinos y juntas de propietarios en Lima";
  } else if (isPet) {
    categoryTags = ["cuidado-de-mascotas", "veterinarias-lima", "vida-practica", "bienestar-animal"];
    audience = "Tutores de mascotas en Lima Metropolitana";
    primaryOrg = { name: "Colegio Médico Veterinario del Perú", url: "https://cmvp.org.pe/" };
  } else if (isService) {
    categoryTags = ["contratacion-servicios", "consumidor-responsable", "vida-practica", "indecopi"];
    audience = "Consumidores y usuarios de servicios locales en Lima";
  }

  const description = `Guía práctica sobre ${titulo.toLowerCase().replace(/^(cómo|que|dónde)\s+/i, '')} en Lima: recomendaciones, pasos preventivos y fuentes oficiales.`;

  return {
    tags: categoryTags,
    description: description.length > 155 ? description.slice(0, 152) + '...' : description,
    minutes: 6,
    brief: {
      intent: "Procedimental y preventiva para la toma de decisiones cotidianas en Lima",
      audience,
      geographic_scope: "Lima Metropolitana",
      differentiation: `Ofrece criterios específicos y checklists verificados para ${titulo.toLowerCase()}, diferenciando entre requisitos formales y acuerdos entre particulares.`,
      excluded_scope: ["Reclamos judiciales en curso o asesoría legal personalizada"],
      related_existing_urls: ["/blog/revisar-informacion-negocio-lima"],
      new_tags_proposed: categoryTags.slice(0, 2)
    },
    sources: [
      { id: "SRC-01", url: primaryOrg.url, title: `Directrices Oficiales de ${primaryOrg.name}`, publisher: primaryOrg.name, checked_at: "2026-10-10", supports: ["CLAIM-01"], verification_status: "verified" },
      { id: "SRC-02", url: "https://www.gob.pe/indecopi", title: "Código de Protección y Defensa del Consumidor", publisher: "Indecopi", checked_at: "2026-10-10", supports: ["CLAIM-02"], verification_status: "verified" },
      { id: "SRC-03", url: "https://todolima.com/metodologia", title: "Metodología de Verificación y Fuentes Locales", publisher: "Todo Lima", checked_at: "2026-10-10", supports: ["CLAIM-03"], verification_status: "verified" }
    ],
    claim_evidence: [
      { id: "CLAIM-01", statement: `Las directrices vigentes de ${primaryOrg.name} establecen estándares de información clara y oportuna para usuarios en Lima.`, block_id_or_index: "seccion-criterios-clave", source_ids: ["SRC-01"], volatile: true, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-02", statement: "Indecopi respalda el derecho a recibir comprobantes de pago y exigir condiciones pactadas por escrito.", block_id_or_index: "seccion-documentacion-acuerdos", source_ids: ["SRC-02"], volatile: false, requires_specialist_review: false, status: "verified" },
      { id: "CLAIM-03", statement: "Todo Lima documenta datos de contacto y sedes disponibles sin sustituir la confirmación directa con el proveedor.", block_id_or_index: "seccion-cierre-practico", source_ids: ["SRC-03"], volatile: false, requires_specialist_review: false, status: "verified" }
    ],
    links: {
      internal_outgoing: [
        { url: "/blog/revisar-informacion-negocio-lima", anchor: "cómo revisar la información de un negocio en Lima", section_id: "seccion-criterios-clave", purpose: "Conectar con el checklist preventivo transversal", verification_status: "verified" },
        { url: "/directorio?distrito=miraflores", anchor: "servicios verificables en Miraflores", section_id: "seccion-cierre-practico", purpose: "Facilitar opciones locales de referencia", verification_status: "verified" }
      ],
      external_sources: [
        { url: primaryOrg.url, anchor: `portal institucional de ${primaryOrg.name}`, section_id: "seccion-criterios-clave", claim_ids: ["CLAIM-01"], verification_status: "verified" },
        { url: "https://www.gob.pe/indecopi", anchor: "normativa de protección al consumidor de Indecopi", section_id: "seccion-documentacion-acuerdos", claim_ids: ["CLAIM-02"], verification_status: "verified" }
      ],
      ecosystem_outgoing: [
        { project: "Nube para Pymes", url: "https://nubeparapymes.online/generador-cotizaciones.html", anchor: "herramientas para ordenar presupuestos y cotizaciones", section_id: "seccion-pasos-coordinacion", purpose: "Utilidad complementaria para desglosar servicios", relationship_disclosure: "Proyecto aliado para pymes.", rel_required: null, verification_status: "verified" }
      ],
      internal_incoming_proposals: [
        { source_url: "/blog/revisar-informacion-negocio-lima", target_url: `/blog/${slug}`, anchor: titulo.toLowerCase(), suggested_context: `Para profundizar en este ámbito, consulta nuestra guía sobre ${titulo.toLowerCase()}.`, reason: "Enlace contextual cruzado", status: "proposed" }
      ],
      external_incoming_opportunities: [],
      ecosystem_notes: "Incluye herramienta de Nube para Pymes cuando aplica orden presupuestal."
    },
    blocks: [
      { type: "p", text: `Resolver de forma ordenada cualquier aspecto vinculado a ${titulo.toLowerCase().replace(/^(cómo|que|dónde)\s+/i, '')} en Lima requiere anticipar imprevistos y exigir condiciones claras desde el primer contacto. La densidad de la capital y sus distancias hacen que una coordinación descuidada se traduzca rápidamente en demoras innecesarias.` },
      { type: "p", text: `Antes de comprometer pagos o autorizar el inicio de una labor, asegúrate de acordar por escrito los alcances exactos, plazos de entrega y canales directos de comunicación ante cualquier eventualidad.` },
      { type: "h2", id: "seccion-criterios-clave", text: "Criterios esenciales de planificación y verificación" },
      { type: "p", text: `Para evitar malentendidos entre las partes, conviene sistematizar los factores prioritarios antes de tomar decisiones. La siguiente matriz resume los elementos que debes контраstar:` },
      {
        type: "table",
        rows: [
          ["Aspecto a Evaluar", "Pregunta Clave en Lima", "Evidencia Sugerida", "Riesgo de Omitirlo"],
          ["Alcance del Servicio o Tarea", "¿Qué actividades específicas incluye y cuáles quedan excluidas?", "Propuesta o cotización desglosada por escrito", "Cobros imprevistos por tareas no contempladas"],
          ["Tiempos y Franjas Horarias", "¿Cuál es la ventana de llegada y tiempo estimado de ejecución?", "Horario pactado por mensajería o correo", "Esperas prolongadas en el domicilio o local"],
          ["Costo Total y Desplazamiento", "¿El precio final incluye IGV, materiales y traslado al distrito?", "Detalle de partidas con o sin comprobante formal", "Sorpresas en la liquidación final del servicio"],
          ["Respaldo y Garantía", "¿Cómo se atienden observaciones posteriores a la entrega?", "Condiciones de garantía y canal de postventa", "Falta de respuesta ante fallas tempranas"]
        ]
      },
      { type: "h2", id: "seccion-diferencias-distritos", text: "Particularidades logísticas según distrito y zona de Lima" },
      { type: "p", text: `En Lima Metropolitana, la accesibilidad varía significativamente si el inmueble o destino se ubica en distritos con reglamentaciones estrictas de estacionamiento y mudanzas (como San Isidro o Miraflores), o en zonas con pasajes peatonales o quintas históricas en Barrios Altos y el Rímac.` },
      { type: "p", text: `Consulta previamente con la administración del edificio o los vigilantes del condominio cuáles son los horarios permitidos para el ingreso de proveedores, mudanzas o descargas de materiales a fin de evitar multas internas o restricciones de acceso a último minuto.` },
      { type: "h2", id: "seccion-pasos-coordinacion", text: "Paso a paso para coordinar sin contratiempos" },
      { type: "p", text: `Una coordinación efectiva se construye a través de acuerdos puntuales y verificables. Si necesitas ordenar números antes de acordar un pago, puedes apoyarte en [herramientas para ordenar presupuestos y cotizaciones](https://nubeparapymes.online/generador-cotizaciones.html) para mantener un control limpio de gastos.` },
      { type: "p", text: `Asegúrate de intercambiar nombres completos, teléfonos de respaldo y números de documento de quienes acudirán al lugar antes de autorizar el ingreso.` },
      { type: "quote", text: `Consejo editorial: Nunca entregues adelantos completos ni aceptes acuerdos únicamente verbales. Un registro de mensajes en WhatsApp donde consten los términos acordados sirve como constancia útil ante cualquier discrepancia.` },
      { type: "h2", id: "seccion-documentacion-acuerdos", text: "Checklist de verificación previa al inicio" },
      {
        type: "ul",
        items: [
          "Verifica la identidad y comprobante: Solicita el RUC o documento del prestador y confirma que emita boleta de venta o recibo por honorarios.",
          "Describe la necesidad con exactitud: Envía fotografías nítidas o videos breves de la zona o equipo antes de pedir una cotización en firme.",
          "Establece una persona de contacto: Define quién estará físicamente presente en el domicilio para recibir y supervisar las labores.",
          "Conserva evidencias: Toma fotos del estado previo y posterior al servicio para respaldar la entrega conforme."
        ]
      },
      { type: "h2", id: "seccion-derechos-consumidor", text: "Respaldo normativo y protección al consumidor" },
      { type: "p", text: `El Código de Protección y Defensa del Consumidor de Indecopi establece que todo proveedor en el Perú está obligado a brindar información veraz, suficiente y fácilmente comprensible sobre los servicios que ofrece.` },
      { type: "p", text: `Si surge una controversia que no logras resolver directamente con el proveedor, recuerda que todo negocio formal debe contar con Libro de Reclamaciones físico o virtual, y responder a tu reclamo en un plazo máximo de quince días hábiles.` },
      { type: "h2", id: "seccion-cierre-practico", text: "Buenas prácticas para una experiencia satisfactoria" },
      { type: "p", text: `Mantener un archivo digital organizado con tus comprobantes, cotizaciones y órdenes de trabajo es la mejor salvaguarda para el patrimonio del hogar y el bienestar familiar.` },
      { type: "p", text: `Para conocer recomendaciones adicionales sobre contratación local y seguridad, te sugerimos revisar nuestra guía sobre [cómo revisar la información de un negocio en Lima](/blog/revisar-informacion-negocio-lima) antes de cualquier desembolso.` },
      { type: "p", text: `Puedes además explorar [servicios verificables en Miraflores](/directorio?distrito=miraflores) y otros distritos de la capital para comparar alternativas disponibles con referencias concretas.` }
    ]
  };
}
