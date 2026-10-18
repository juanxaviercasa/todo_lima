import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const POSTS_PATH = path.join(ROOT, 'data', 'blog', 'posts.json');
const STAGING_PATH = path.join(ROOT, 'staging', 'editorial', 'all-180-posts.json');

const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'));
const staging = JSON.parse(fs.readFileSync(STAGING_PATH, 'utf8'));

// 1. Promover los 3 artículos de staging
const slugsToPromote = [
  'el-senor-de-los-milagros-historia-y-significado-de-la-tradicion',
  'turron-de-dona-pepa-historia-y-relacion-con-el-mes-morado',
  'dia-de-la-cancion-criolla-origen-y-formas-de-celebrarlo'
];

for (const slug of slugsToPromote) {
  const existingIndex = posts.findIndex(p => p.slug === slug);
  const stagingPost = staging.find(p => p.slug === slug);
  if (!stagingPost) {
    console.error(`No se encontró en staging: ${slug}`);
    continue;
  }
  
  const promotedPost = {
    ...stagingPost,
    published: '2026-10-18',
    modified: '2026-10-18'
  };

  if (existingIndex >= 0) {
    posts[existingIndex] = promotedPost;
    console.log(`Actualizado post existente: ${slug}`);
  } else {
    posts.unshift(promotedPost);
    console.log(`Promovido e insertado: ${slug}`);
  }
}

// 2. Crear los 2 nuevos artículos especializados de octubre
const newPostHalloween = {
  slug: "halloween-y-dia-de-la-cancion-criolla-en-lima-como-conviven-ambas-celebraciones",
  title: "Halloween y Día de la Canción Criolla en Lima: cómo conviven ambas celebraciones el 31 de octubre",
  category: "cultura-y-tradiciones",
  tags: [
    "cultura-y-tradiciones",
    "musica-criolla",
    "tradiciones-limenas",
    "arte-y-cultura"
  ],
  description: "Guía cultural sobre cómo conviven el Día de la Canción Criolla y Halloween en Lima cada 31 de octubre: historia, peñas tradicionales, disfraces infantiles y planes por distrito.",
  published: "2026-10-18",
  modified: "2026-10-18",
  cover: "halloween-cancion-criolla-portada",
  internal: [
    "halloween-cancion-criolla-pena",
    "halloween-cancion-criolla-disfraces"
  ],
  recommended: [
    "dia-de-la-cancion-criolla-origen-y-formas-de-celebrarlo",
    "las-penas-criollas-que-son-y-como-preparar-una-primera-visita"
  ],
  minutes: 7,
  blocks: [
    {
      type: "p",
      text: "La noche del 31 de octubre es uno de los momentos de mayor dinamismo social y contraste festivo en Lima. En una misma fecha, la metrópoli celebra dos expresiones culturales de raíces muy distintas: el tradicional Día de la Canción Criolla —consagrado oficialmente en 1944 para celebrar el vals, la marinera y la identidad costeña— y la fiesta popular de Halloween, ampliamente adoptada por niños y familias en las últimas décadas. Lejos de excluirse, ambas celebraciones han estructurado una dinámica urbana compartida que transforma plazas, centros comerciales y locales barriales."
    },
    {
      type: "h2",
      id: "seccion-origen-cancion-criolla",
      text: "El origen del 31 de octubre: la proclamación de la Canción Criolla en 1944"
    },
    {
      type: "p",
      text: "El Día de la Canción Criolla fue instaurado de forma oficial mediante una Resolución Suprema firmada el 18 de octubre de 1944 por el presidente Manuel Prado Ugarteche. Su promulgación fue impulsada por compositores, intérpretes y periodistas que buscaban otorgar reconocimiento estatal y visibilidad pública a los géneros musicales populares de la costa frente a la creciente difusión de ritmos internacionales en la radio."
    },
    {
      type: "p",
      text: "La primera celebración formal se llevó a cabo la mañana del 31 de octubre de 1944 con el izamiento del pabellón nacional en el Centro Musical Unión en la plaza de Armas, seguido por un concurrido concierto en la plaza Buenos Aires de Barrios Altos. Figuras como Felipe Pinglo Alva, Chabuca Granda y Manuel Acosta Ojeda consolidaron este patrimonio sonoro, que hoy sigue vivo en las tradicionales [peñas criollas de Lima](/blog/dia-de-la-cancion-criolla-origen-y-formas-de-celebrarlo)."
    },
    {
      type: "h2",
      id: "seccion-llegada-halloween",
      text: "La llegada y adaptación urbana de Halloween en los barrios limeños"
    },
    {
      type: "p",
      text: "La celebración de Halloween comenzó a difundirse en Lima hacia finales de la década de 1980 y principios de los 90, inicialmente en colegios bilingües y distritos de clase media, para luego expandirse a toda el área metropolitana como una festividad eminentemente infantil y comercial. Las familias limeñas adoptaron la costumbre del 'dulce o truco' adaptándola al entorno urbano local, recorriendo calles residenciales con vigilancia vecinal o paseando por galerías comerciales acondicionadas."
    },
    {
      type: "p",
      text: "Hoy en día, emporios comerciales como el Mercado Central y Mesa Redonda registran durante todo octubre una intensa actividad en la venta mayorista de disfraces, máscaras, calabazas plásticas y golosinas, dinamizando el empleo temporal de confeccionistas locales en Gamarra y distritos periféricos."
    },
    {
      type: "table",
      rows: [
        [
          "Distrito / Zona",
          "Enfoque Principal del 31 de Octubre",
          "Espacios Representativos",
          "Público y Ambiente Habitual"
        ],
        [
          "Barranco",
          "Bohemia y espectáculos de música criolla en vivo",
          "Peñas históricas, tabernas y locales alrededor del Puente de los Suspiros",
          "Jóvenes adultos, melómanos y aficionados a la música tradicional"
        ],
        [
          "Cercado y Breña",
          "Jaranas barriales y centros musicales históricos",
          "Centro Musical Unión, callejón del Buque y peñas vecinales",
          "Cultores criollos de trayectoria, familias locales y vecinos"
        ],
        [
          "Miraflores y San Isidro",
          "Recorridos de disfraces infantiles y vida nocturna",
          "Parque Kennedy, pasajes peatonales y centros comerciales",
          "Familias en la tarde; turismo y fiestas temáticas en la noche"
        ],
        [
          "San Miguel y Los Olivos",
          "Activaciones comerciales y ferias vecinales",
          "Plazas distritales, centros comerciales y parques zonales",
          "Público infantil durante el día; reuniones juveniles por la noche"
        ]
      ]
    },
    {
      type: "h2",
      id: "seccion-horarios-escalonados",
      text: "Horarios escalonados: la fórmula limeña para disfrutar ambas fiestas"
    },
    {
      type: "p",
      text: "Una de las características más singulares de Lima es que ambas festividades no compiten por el mismo horario ni por el mismo espacio público. La jornada se organiza naturalmente de manera escalonada:"
    },
    {
      type: "ul",
      items: [
        "Tarde familiar (16:00 a 19:30): Dominada por los niños disfrazados que visitan tiendas, parques vecinales y centros comerciales para pedir dulces o participar en concursos de disfraces.",
        "Transición gastronómica (19:30 a 21:00): Cena temprana donde se degustan anticuchos, picarones o el tradicional [Turrón de Doña Pepa](/blog/turron-de-dona-pepa-historia-y-relacion-con-el-mes-morado) antes del inicio de los espectáculos nocturnos.",
        "Noche criolla y bohemia (21:00 en adelante): Apertura de peñas, restaurantes turísticos y eventos donde el cajón, la guitarra y las voces criollas toman el protagonismo absoluto hasta la madrugada del feriado de Todos los Santos."
      ]
    },
    {
      type: "quote",
      text: "Consejo editorial: La noche del 31 de octubre tiene una de las mayores demandas del año en transporte y gastronomía. Reserva con anticipación en peñas o restaurantes criollos y prevé tus retornos antes de la medianoche para evitar congestión vial."
    },
    {
      type: "h2",
      id: "seccion-recomendaciones-seguridad",
      text: "Recomendaciones prácticas para una celebración segura"
    },
    {
      type: "ul",
      items: [
        "Seguridad infantil: En paseos de disfraces, mantener a los menores siempre a la vista, vestir ropa con elementos reflectantes y revisar que todas las golosinas recolectadas mantengan su envoltura original de fábrica intacta.",
        "Elección de locales: Verificar que peñas y locales de eventos cuenten con certificado de Defensa Civil y aforo señalizado, evitando fiestas clandestinas o eventos masivos sin autorización distrital.",
        "Transporte: Considerar que avenidas principales de Barranco, Miraflores y el Centro Histórico presentan alta congestión vehicular; planificar desplazamientos mediante taxis por aplicación formal o transporte público integrado."
      ]
    },
    {
      type: "p",
      text: "Para conocer el impacto de estas fechas en el cronograma oficial de la ciudad, te invitamos a consultar el [Atlas Conoce Lima: Calendario Cívico, Festividades y Feriados](/conoce-lima/calendario-festivo-y-feriados) y explorar opciones gastronómicas en nuestro [directorio local de Lima](/directorio)."
    }
  ]
};

const newPostAngamos = {
  slug: "combate-de-angamos-feriado-8-octubre-visitas-historicas-lima-callao",
  title: "Combate de Angamos y Feriado del 8 de Octubre: visitas históricas, museos navales y memoria cívica en Lima y Callao",
  category: "lugares-y-patrimonio",
  tags: [
    "lugares-y-patrimonio",
    "patrimonio-historico",
    "recorridos-culturales",
    "arte-y-cultura"
  ],
  description: "Guía para aprovechar el feriado nacional del 8 de octubre en Lima y Callao: conmemoración del Combate de Angamos, homenajes al Almirante Grau, museos navales y Cripta de los Héroes.",
  published: "2026-10-18",
  modified: "2026-10-18",
  cover: "combate-angamos-feriado-portada",
  internal: [
    "combate-angamos-cripta-heroes",
    "combate-angamos-puerto-callao"
  ],
  recommended: [
    "museos-de-lima-como-elegir-una-visita-segun-tus-intereses",
    "que-visitar-centro-historico-lima"
  ],
  minutes: 6,
  blocks: [
    {
      type: "p",
      text: "Cada 8 de octubre, el Perú conmemora el Combate Naval de Angamos, librado en 1879 durante la Guerra del Pacífico, y el Día de la Marina de Guerra del Perú. Establecido como feriado nacional no laborable según el Decreto Legislativo N° 713 publicado en El Peruano, esta fecha recuerda la hazaña y el sacrificio heroico del Gran Almirante Don Miguel Grau Seminario a bordo del monitor Huáscar. En Lima y el Callao, la efeméride se traduce en una jornada cívica cargada de homenajes solemnes, apertura extraordinaria de recintos históricos y rutas patrimoniales junto al mar."
    },
    {
      type: "h2",
      id: "seccion-significado-civico-grau",
      text: "El significado cívico del 8 de octubre y el minuto de silencio nacional"
    },
    {
      type: "p",
      text: "El Gran Almirante Miguel Grau, conocido universalmente como 'El Caballero de los Mares' por su hidalguía y respeto a la vida de los prisioneros y náufragos vencidos, fue proclamado formalmente en el año 2000 como 'El Peruano del Milenio'. Cada 8 de octubre, a las 09:50 horas —el instante exacto en que impactó el proyectil enemigo en la torre de mando del monitor Huáscar cegando su vida—, todo el país guarda un solemne minuto de silencio con toque de corneta y sirenas en puertos y plazas cívicas."
    },
    {
      type: "p",
      text: "La ceremonia central metropolitana se desarrolla con la colocación de ofrendas florales ante el monumento al Almirante en la Plaza Grau del Callao y de Lima, con presencia de autoridades de Estado, delegaciones navales y escoltas escolares."
    },
    {
      type: "h2",
      id: "seccion-museo-naval-callao",
      text: "Circuito de memoria naval en el Callao y La Punta"
    },
    {
      type: "p",
      text: "Para quienes desean conectar vivencialmente con la historia marítima nacional, la Provincia Constitucional del Callao es el destino idóneo durante este feriado. A pocas cuadras del puerto histórico, el Museo Naval del Callao 'Capitán de Navío Julio J. Elías Murguía' (Av. Jorge Chávez 123) abre sus puertas con salas consagradas a la historia marítima prehispánica, virreinal y republicana."
    },
    {
      type: "p",
      text: "Entre sus piezas más valiosas se encuentran la mascarona de proa de la corbeta Unión, instrumental de navegación del siglo XIX, uniformes de época y maquetas a escala de la escuadra peruana durante la campaña marítima de 1879. Tras la visita al museo, el circuito se prolonga naturalmente por el malecón de La Punta y los torreones de la Fortaleza del Real Felipe."
    },
    {
      type: "table",
      rows: [
        [
          "Espacio Patrimonial",
          "Ubicación y Distrito",
          "Atractivo Central / Qué Ver",
          "Acceso Habitual en Feriado"
        ],
        [
          "Museo Naval del Callao",
          "Av. Jorge Chávez 123, Callao Histórico",
          "Reliquias navales del Huáscar, maquetas históricas y salas de la Guerra del Pacífico",
          "Atención en feriado cívico (habitualmente 09:00 a 16:00 horas)"
        ],
        [
          "Cripta de los Héroes",
          "Cementerio Presbítero Maestro, Barrios Altos (Cercado de Lima)",
          "Mausoleo de mármol con los restos de Miguel Grau, Bolognesi y combatientes de la República",
          "Visitas guiadas cívicas organizadas por la Beneficencia de Lima"
        ],
        [
          "Plaza Grau del Callao",
          "Malecón Figueredo, puerto del Callao",
          "Monumento monumental a Grau frente a la bahía y muelle de pescadores",
          "Espacio público abierto de acceso libre permanente"
        ],
        [
          "Fortaleza del Real Felipe",
          "Plaza Independencia s/n, Callao",
          "Museo del Ejército Peruano, torreones virreinales y casamatas defensivas",
          "Recorridos guiados por turnos programados"
        ]
      ]
    },
    {
      type: "h2",
      id: "seccion-cripta-heroes-lima",
      text: "La Cripta de los Héroes en el Cementerio Presbítero Maestro"
    },
    {
      type: "p",
      text: "En el Cercado de Lima, el Cementerio Museo General Presbítero Matías Maestro resguarda el principal santuario cívico de la nación: la Cripta de los Héroes, inaugurada en 1908 durante el gobierno de José Pardo y Barreda. En este imponente recinto de estilo neoclásico reposan en sarcófagos de mármol de Carrara los restos mortales de los defensores de la patria durante la Guerra del Pacífico."
    },
    {
      type: "p",
      text: "En el nivel superior destaca el sarcófago del Almirante Miguel Grau, junto a los de Francisco Bolognesi y Alfonso Ugarte, rodeados de placas conmemorativas y coronas de bronce donadas por diversas naciones."
    },
    {
      type: "quote",
      text: "Consejo editorial: Aprovecha el feriado para realizar una visita matutina a la Cripta de los Héroes o al Museo Naval del Callao y culminar el mediodía degustando la tradicional gastronomía marina en los restaurantes del litoral chalaco o Chorrillos."
    },
    {
      type: "h2",
      id: "seccion-recomendaciones-feriado",
      text: "Recomendaciones operativas para el feriado del 8 de octubre"
    },
    {
      type: "ul",
      items: [
        "Transporte público: El Metropolitano y la Línea 1 operan bajo horarios de domingo y feriado. La ATU programa refuerzos especiales en rutas alimentadoras y corredores cercanos a zonas turísticas.",
        "Horarios de llegada: Al ser un feriado cívico de alta concurrencia familiar, se aconseja llegar a los museos navales y a la Fortaleza del Real Felipe antes de las 10:30 horas para evitar colas en boletería.",
        "Gastronomía marina: En los malecones de La Punta y Chucuito, los restaurantes suelen colmar su aforo al mediodía; acudir temprano o realizar reserva previa garantiza una experiencia cómoda."
      ]
    },
    {
      type: "p",
      text: "Consulta más detalles sobre todos los feriados oficiales en nuestro [Atlas Conoce Lima: Calendario Cívico, Festividades y Feriados](/conoce-lima/calendario-festivo-y-feriados) y planifica tus salidas culturales con nuestras [guías patrimoniales de Lima](/guias)."
    }
  ]
};

// Insertar los 2 artículos nuevos si no existen
const idxH = posts.findIndex(p => p.slug === newPostHalloween.slug);
if (idxH >= 0) {
  posts[idxH] = newPostHalloween;
  console.log(`Actualizado post Halloween existente.`);
} else {
  posts.unshift(newPostHalloween);
  console.log(`Insertado nuevo post Halloween.`);
}

const idxA = posts.findIndex(p => p.slug === newPostAngamos.slug);
if (idxA >= 0) {
  posts[idxA] = newPostAngamos;
  console.log(`Actualizado post Angamos existente.`);
} else {
  posts.unshift(newPostAngamos);
  console.log(`Insertado nuevo post Angamos.`);
}

fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2), 'utf8');
console.log(`data/blog/posts.json actualizado exitosamente. Total artículos publicados: ${posts.length}`);
