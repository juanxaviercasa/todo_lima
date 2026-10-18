import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PILARES_PATH = path.join(ROOT, 'data', 'atlas', 'pilares.json');
const pilares = JSON.parse(fs.readFileSync(PILARES_PATH, 'utf8'));

const nuevoPilar = {
  order: 8,
  slug: "calendario-festivo-y-feriados",
  title: "Calendario Cívico, Festividades Tradicionales y Feriados de Lima",
  shortTitle: "Calendario y Feriados",
  icon: "Calendar",
  metaDescription: "Guía oficial y canónica del calendario cívico, feriados nacionales y festividades tradicionales de Lima Metropolitana. Normas de El Peruano, impacto en transporte público y tradiciones de enero a diciembre.",
  canonicalDefinition: "El calendario cívico y festivo de Lima Metropolitana articula los descansos remunerados del Decreto Legislativo N° 713 y los días no laborables oficiales publicados en El Peruano con las mayores expresiones de religiosidad e identidad popular del país, desde el Mes Morado del Señor de los Milagros hasta las Fiestas Patrias y el Día de la Canción Criolla.",
  wikidataEntities: [
    {
      name: "Feriados en el Perú",
      wikidataId: "Q14456",
      description: "Días festivos oficiales y descansos remunerados del Perú regulados por ley"
    },
    {
      name: "Señor de los Milagros",
      wikidataId: "Q2089",
      description: "Manifestación católica y tradición cultural emblemática de Lima"
    },
    {
      name: "Día de la Canción Criolla",
      wikidataId: "Q5312061",
      description: "Festividad oficial instituida en 1944 en homenaje a la música criolla"
    },
    {
      name: "Combate de Angamos",
      wikidataId: "Q1032994",
      description: "Efeméride cívico-militar en honor a Miguel Grau y la Marina de Guerra del Perú"
    }
  ],
  images: {
    hero: "calendario-hero",
    interiorA: "calendario-interiorA",
    interiorB: "calendario-interiorB"
  },
  table: {
    headers: [
      "Fecha / Periodo",
      "Efeméride o Festividad",
      "Marco Legal Oficial (El Peruano)",
      "Dinámica Urbana, Transporte y Tradición en Lima"
    ],
    rows: [
      [
        "18 de Enero",
        "Aniversario de la Fundación de Lima",
        "Resolución de Alcaldía MML / Efeméride local oficial",
        "Serenata en la Plaza Mayor, pasacalles folclóricos de todas las sangres, ferias gastronómicas y desvíos vehiculares peatonales en el Damero de Pizarro."
      ],
      [
        "Marzo / Abril (Móvil)",
        "Semana Santa (Jueves Santo y Viernes Santo)",
        "Decreto Legislativo N° 713 (Feriados Nacionales)",
        "Tradición del Recorrido de las 7 Iglesias en el Cercado de Lima, alta afluencia en terminales pesqueros de Chorrillos y Ventanilla, operación dominical de ATU."
      ],
      [
        "1 de Mayo",
        "Día Internacional de los Trabajadores",
        "Decreto Legislativo N° 713 (Feriado Nacional no laborable)",
        "Comercio minorista cerrado en mañanas, masiva concurrencia familiar a los clubes metropolitanos de SERPAR y parques zonales en distritos periféricos."
      ],
      [
        "7 de Junio",
        "Batalla de Arica y Día de la Bandera",
        "Ley N° 31788 (Feriado Nacional incorporado en 2023)",
        "Ceremonia cívico-militar solemne en la Plaza Bolognesi (límite entre Breña y Cercado), juramento de fidelidad a la bandera y desfiles institucionales."
      ],
      [
        "29 de Junio",
        "San Pedro y San Pablo / Día del Pescador",
        "Decreto Legislativo N° 713 (Feriado Nacional)",
        "Procesión marítima de imágenes religiosas en lanchas artesanales en caletas de Chorrillos, Ancón y Callao; rutas gastronómicas ceviqueras."
      ],
      [
        "23 de Julio",
        "Día de la Fuerza Aérea del Perú",
        "Ley N° 31822 (Feriado Nacional por José Abelardo Quiñones)",
        "Actos protocolares en la Base Aérea de Las Palmas (Surco) y despliegue aéreo conmemorativo sobre el litoral limeño."
      ],
      [
        "28 y 29 de Julio",
        "Fiestas Patrias de la República del Perú",
        "Decreto Legislativo N° 713 (Feriados Nacionales oficiales)",
        "Misa Te Deum en la Catedral, Mensaje a la Nación en el Congreso, Gran Parada Cívico-Militar en la Av. Brasil, ferias criollas y éxodo turístico hacia provincias."
      ],
      [
        "6 de Agosto",
        "Batalla de Junín",
        "Ley N° 31530 (Feriado Nacional incorporado en 2022)",
        "Conmemoración histórica de la independencia; operación con horarios de feriado en los servicios del Metropolitano y la Línea 1 del Metro de Lima."
      ],
      [
        "30 de Agosto",
        "Santa Rosa de Lima",
        "Decreto Legislativo N° 713 (Feriado Nacional)",
        "Peregrinación masiva al Santuario de Santa Rosa en la Av. Tacna, colas multitudinarias para el Pozo de los Deseos y cierre de carriles mixtos en el Centro Histórico."
      ],
      [
        "8 de Octubre",
        "Combate de Angamos y Día de la Marina",
        "Decreto Legislativo N° 713 (Feriado Nacional)",
        "Homenaje nacional al Gran Almirante Miguel Grau en Plaza Grau de Lima y Callao; visitas gratuitas al Museo Naval, el BAP Almirante Grau y la Cripta de los Héroes."
      ],
      [
        "Octubre (Mes Morado)",
        "Procesión del Señor de los Milagros",
        "Ley N° 29602 / Patrimonio Cultural de la Nación",
        "Cinco recorridos procesionales multitudinarios en el Cercado, Breña y La Victoria; cortes viales y desvíos integrales de la ATU en corredores Tacna y Alfonso Ugarte; temporada del Turrón de Doña Pepa."
      ],
      [
        "31 de Octubre",
        "Día de la Canción Criolla y Noche de Halloween",
        "R.S. de 1944 (Canción Criolla) / Fiesta Urbana Popular",
        "Noche de peñas, jaranas criollas y valses en Barranco, Breña y Rímac, en convivencia con fiestas de disfraces infantiles y juveniles en centros comerciales y distritos residenciales."
      ],
      [
        "1 de Noviembre",
        "Día de Todos los Santos",
        "Decreto Legislativo N° 713 (Feriado Nacional)",
        "Visitas masivas a cementerios patrimoniales (Presbítero Maestro, El Ángel) y populares (Virgen de Lourdes / Nueva Esperanza en VMT, el segundo más extenso del mundo)."
      ],
      [
        "8 y 9 de Diciembre",
        "Inmaculada Concepción y Batalla de Ayacucho",
        "D.L. 713 y Ley N° 31381 (Feriados Nacionales)",
        "Puente festivo habitual de fin de año; inicio del pico más alto de abastecimiento y compras navideñas en Mesa Redonda y Mercado Central."
      ],
      [
        "25 de Diciembre y 1 de Enero",
        "Navidad y Año Nuevo",
        "Decreto Legislativo N° 713 (Feriados Nacionales)",
        "Nochebuena y celebraciones de bienvenida al nuevo año; tráfico matutino despejado, paseos a playas de la Costa Verde y visitas a nacimientos tradicionales en conventos virreinales."
      ]
    ]
  },
  sections: [
    {
      id: "seccion-marco-legal-el-peruano",
      title: "El Régimen Legal de Feriados y Días No Laborables en El Peruano",
      paragraphs: [
        "En el Perú, el régimen de feriados oficiales y descansos remunerados para los trabajadores se encuentra cimentado jurídicamente en el [Decreto Legislativo N° 713](https://busquedas.elperuano.pe/dispositivo/NL/48492-1), consolidado y actualizado de manera continua mediante leyes aprobadas por el Congreso de la República y publicadas en el Diario Oficial El Peruano. A diferencia de otros países de la región donde los feriados se trasladan a los días lunes para fomentar fines de semana largos (puentes), en el marco normativo peruano los feriados cívico-religiosos se conmemoran de forma estricta en su fecha calendario exacta, otorgando derecho a descanso remunerado o al pago de sobretasa legal en caso de laborar.",
        "Asimismo, el Poder Ejecutivo emite de manera periódica decretos supremos que declaran días no laborables de naturaleza compensable para el sector público (y facultativos para el sector privado). Estos decretos —publicados con anticipación en las Normas Legales de El Peruano— tienen como objetivo estratégico dinamizar el turismo interno, incentivar el comercio de servicios en los 43 distritos metropolitanos y regular los periodos de alta afluencia ciudadana durante las Fiestas Patrias, las conmemoraciones de fin de año o las cumbres internacionales que se desarrollan en la capital."
      ]
    },
    {
      id: "seccion-octubre-morado-y-fe-popular",
      title: "El Mes Morado: Procesiones del Señor de los Milagros y Dinámica Urbana",
      paragraphs: [
        "El mes de octubre en Lima está dominado por la mayor manifestación de fe católica multitudinaria al aire libre de todo el continente: el culto al Señor de los Milagros, también denominado el Cristo Moreno o Señor de los Temblores. Pintada originariamente a mediados del siglo XVII por un esclavo angoleño sobre un muro de adobe en el barrio de Pachacamilla, la imagen sobrevivió intacta a los destructivos terremotos de 1655, 1687 y 1746, transformándose en el símbolo supremo de protección comunitaria frente a las amenazas telúricas de la cuenca del Rímac.",
        "Durante sus salidas procesionales oficiales —habitualmente distribuidas a lo largo del mes en cinco fechas fijadas por la Hermandad del Señor de los Milagros de Nazarenas (HSMN) y el Arzobispado de Lima—, las andas de plata y oro de más de dos toneladas son trasladadas a hombros por miles de cargadores organizados en 20 cuadrillas especializadas. El avance de la procesión transforma la morfología del Centro Histórico: las vías principales de la avenida Tacna, jirón Huancavelica, avenida Alfonso Ugarte y jirón Junín se cierran al tráfico motorizado, mientras sahumadoras vestidas con túnicas moradas y cantoras impregnan el aire con aromas de incienso y copal. En torno a este epicentro religioso florece una industria gastronómica centenaria encabezada por las fábricas de [Turrón de Doña Pepa](/blog/turron-de-dona-pepa-historia-y-relacion-con-el-mes-morado) y carretillas tradicionales de anticuchos y picarones."
      ]
    },
    {
      id: "seccion-31-octubre-criollo-y-halloween",
      title: "31 de Octubre: La Convivencia Urbana entre la Canción Criolla y Halloween",
      paragraphs: [
        "El 31 de octubre representa uno de los fenómenos socioculturales más ricos y dinámicos del calendario metropolitano, marcado por la coexistencia de dos festividades de origen dispar que han encontrado un equilibrio urbano complementario: el Día de la Canción Criolla y la Noche de Halloween.",
        "Instituido formalmente mediante Resolución Suprema firmada por el presidente Manuel Prado Ugarteche el 18 de octubre de 1944, el Día de la Canción Criolla nació como un acto de afirmación de la identidad mestiza costeña frente a la penetración de ritmos foráneos. Su celebración convoca anualmente a miles de limeños en peñas tradicionales, centros musicales vecinales y tabernas históricas de Barranco, Breña, el Rímac y Barrios Altos, donde se interpretan valses de Pinglo, marinera limeña y polcas criollas al compás del cajón peruano y las guitarras de cedro.",
        "En simultáneo, a partir del crepúsculo, las calles residenciales de distritos como Miraflores, San Borja, Surco, San Miguel y Jesús María se colman de niños y familias que practican el recorrido festivo de recolección de dulces disfrazados, mientras los centros comerciales y emporios de la ciudad dinamizan intensamente el comercio de indumentaria, accesorios y repostería temática. Lejos de anularse, ambas celebraciones conviven en horarios escalonados: una tarde familiar cosmopolita seguida de una noche bohemia de jarana criolla que se extiende hasta la madrugada del feriado de Todos los Santos."
      ]
    },
    {
      id: "seccion-efemerides-civicas-angamos-y-patrias",
      title: "Efemérides Cívicas y Militares: Fiestas Patrias y el Combate de Angamos",
      paragraphs: [
        "La memoria republicana y la soberanía naval tienen sus hitos culminantes en dos momentos de máxima solemnidad cívica: las Fiestas Patrias de julio y el feriado nacional del 8 de octubre en homenaje al Combate de Angamos.",
        "Los días 28 y 29 de julio conmemoran la proclamación de la independencia efectuada por el Libertador Don José de San Martín en las cuatro plazas históricas de Lima en 1821. La capital se viste de rojo y blanco con la obligación cívica de embanderamiento metropolitano en cada inmueble. Las ceremonias oficiales abarcan el solemne Te Deum en la Basílica Catedral con asistencia del Jefe de Estado y el cuerpo diplomático, el Mensaje a la Nación ante el Parlamento y la multitudinaria Gran Parada Cívico-Militar, evento que congrega a cientos de miles de ciudadanos a lo largo de las tribunas de la avenida Brasil para presenciar el paso marcial de las Fuerzas Armadas, la Policía Nacional y delegaciones comunales.",
        "Por su parte, el 8 de octubre rinde homenaje al sacrificio del Gran Almirante Don Miguel Grau Seminario a bordo del monitor Huáscar en 1879 y a la Marina de Guerra del Perú. En Lima y el Callao, la fecha se conmemora con ofrendas florales ante el monumento cívico de la Plaza Grau, el minuto de silencio nacional a las 09:50 horas (momento exacto del estallido del proyectil en la torre de mando del Huáscar) y recorridos históricos guiados en la Cripta de los Héroes del Cementerio Presbítero Maestro y las salas del Museo Naval de la Provincia Constitucional del Callao."
      ]
    },
    {
      id: "seccion-impacto-transporte-y-servicios",
      title: "Impacto Operativo en Lima: Transporte ATU, Hospitales y Mercados",
      paragraphs: [
        "La declaración de un feriado nacional en Lima no solo implica la suspensión de actividades laborales y educativas ordinarias; activa un protocolo de contingencia urbana integral diseñado por la [Autoridad de Transporte Urbano para Lima y Callao (ATU)](https://www.gob.pe/atu) y las gerencias metropolitanas.",
        "Durante los días feriados, el Sistema Integrado de Transporte opera bajo cronogramas diferenciados: los servicios regulares del Metropolitano (rutas A, B y C) circulan con intervalos de domingo (de 05:00 a 22:00 horas), mientras que los servicios expresos de hora punta quedan suspendidos. La Línea 1 del Metro de Lima mantiene su operación ferroviaria regular pero con intervalos de trenes de 8 a 12 minutos. En fechas procesionales de alta densidad (como el Señor de los Milagros), la ATU ejecuta desvíos escalonados de los Corredores Complementarios (Corredor Azul por jirón Huancavelica y avenida Garcilaso de la Vega, y Corredor Morado por vías auxiliares de Abancay), garantizando la conectividad peatonal con el cuadrante procesional.",
        "Asimismo, los servicios de emergencia de los hospitales nacionales (como el Hospital Loayza, Rebagliati y Dos de Mayo) y los cuerpos de bomberos voluntarios permanecen en alerta operativa permanente, en tanto que los grandes nodos de abasto mayorista —el Gran Mercado Mayorista de Lima en Santa Anita y el Mercado de Productores de Caquetá— inician sus descargas en horarios de madrugada para abastecer a los mercados distritales antes de las festividades familiares."
      ]
    },
    {
      id: "seccion-tradiciones-vivas-calendario-barrial",
      title: "Fiestas Patronales y Regionales en los Barrios de Lima",
      paragraphs: [
        "Debido a su condición de metrópoli receptora de migraciones de todas las regiones andinas y amazónicas del Perú a partir de la década de 1940, el calendario festivo de Lima incluye celebraciones patronales descentralizadas que reproducen fielmente los ritos de origen de sus comunidades.",
        "En febrero, las asociaciones provincianas de Lima Norte y Lima Este conmemoran la Festividad de la Virgen de la Candelaria con pasacalles de caporales, morenadas y diabladas en locales comunales de Los Olivos y San Juan de Lurigancho. En junio, la Fiesta de San Juan moviliza a los migrantes de la selva en clubes campestres de Chosica, Ate y Puente Piedra con consumo masivo de juanes, música de cumbia amazónica y danzas típicas. Estas expresiones demuestran que el calendario limeño contemporáneo es una polifonía cultural donde conviven las solemnidades virreinales con la vigorosa vitalidad de las tradiciones andinas y amazónicas integradas en el tejido urbano."
      ]
    }
  ],
  faq: [
    {
      q: "¿Cuáles son los feriados oficiales no laborables en Lima según la ley peruana?",
      a: "Los feriados nacionales de descanso remunerado obligatorio en todo el Perú (incluida Lima) están regulados por el Decreto Legislativo N° 713 y leyes complementarias publicadas en El Peruano: 1 de enero (Año Nuevo), Jueves y Viernes Santo (marzo/abril), 1 de mayo (Día del Trabajo), 7 de junio (Batalla de Arica y Día de la Bandera), 29 de junio (San Pedro y San Pablo), 23 de julio (Día de la FAP), 28 y 29 de julio (Fiestas Patrias), 6 de agosto (Batalla de Junín), 30 de agosto (Santa Rosa de Lima), 8 de octubre (Combate de Angamos), 1 de noviembre (Todos los Santos), 8 de diciembre (Inmaculada Concepción), 9 de diciembre (Batalla de Ayacucho) y 25 de diciembre (Navidad)."
    },
    {
      q: "¿Qué días sale la procesión del Señor de los Milagros y cómo afecta el transporte en Lima?",
      a: "La procesión del Señor de los Milagros se realiza tradicionalmente durante el mes de octubre en cinco fechas programadas: el primer sábado de octubre (traslado inicial), 18 y 19 de octubre (recorridos centrales con pernocta en la Iglesia del Carmen), 28 de octubre y 1 de noviembre (retorno al Monasterio de Las Nazarenas). Durante estas jornadas, la ATU implementa planes especiales de desvío vehicular en las avenidas Tacna, Emancipación, Abancay y Alfonso Ugarte, alterando temporalmente los trayectos de los Corredores Azul y Morado."
    },
    {
      q: "¿Cómo se celebra el 31 de octubre en Lima entre el Día de la Canción Criolla y Halloween?",
      a: "El 31 de octubre en Lima se caracteriza por una convivencia armónica de ambas festividades: durante la tarde, las familias y niños recorren calles y centros comerciales disfrazados pidiendo dulces en distritos como Miraflores, San Borja y San Miguel (Halloween), mientras que a partir de las 20:00 horas, las peñas criollas, centros musicales vecinales y restaurantes de Barranco, Breña, Cercado y el Rímac concentran la mayor afluencia de público con espectáculos en vivo de valses peruanos, marineras y cajón en honor a la música criolla."
    }
  ],
  crossLinks: {
    districts: [
      {
        name: "Cercado de Lima",
        desc: "epicentro histórico de las procesiones del Señor de los Milagros y ceremonias de Fiestas Patrias",
        slug: "cercado-de-lima",
        url: "/directorio?distrito=cercado-de-lima"
      },
      {
        name: "Barranco",
        desc: "corazón bohemio y sede de las principales peñas del Día de la Canción Criolla",
        slug: "barranco",
        url: "/directorio?distrito=barranco"
      },
      {
        name: "Callao",
        desc: "puerto histórico y escenario de las conmemoraciones del Combate de Angamos y San Pedro",
        slug: "callao",
        url: "/directorio?distrito=callao"
      },
      {
        name: "Breña",
        desc: "bastión del criollismo tradicional y centro de la procesión de octubre",
        slug: "brena",
        url: "/directorio?distrito=brena"
      }
    ],
    categories: [
      { name: "Peñas y Espectáculos de Música Criolla" },
      { name: "Pastelerías y Fabricación Tradicional de Turrones" },
      { name: "Tiendas de Disfraces, Cotillón y Artículos para Eventos" },
      { name: "Agencias de Turismo Receptivo y Recorridos Históricos" }
    ]
  },
  sources: [
    {
      publisher: "Diario Oficial El Peruano / Ministerio de Trabajo",
      detail: "Decreto Legislativo N° 713, Ley que consolida la legislación sobre descansos remunerados de los trabajadores sujetos al régimen laboral de la actividad privada.",
      url: "https://busquedas.elperuano.pe/dispositivo/NL/48492-1"
    },
    {
      publisher: "Congreso de la República / El Peruano",
      detail: "Leyes N° 31530 (Batalla de Junín), N° 31788 (Día de la Bandera), N° 31822 (Día de la FAP) y N° 31381 (Batalla de Ayacucho) que incorporan feriados nacionales.",
      url: "https://busquedas.elperuano.pe/"
    },
    {
      publisher: "Autoridad de Transporte Urbano para Lima y Callao (ATU)",
      detail: "Resoluciones y comunicados oficiales sobre desvíos vehiculares y planes de operación de transporte público en feriados y procesiones.",
      url: "https://www.gob.pe/atu"
    },
    {
      publisher: "Ministerio de Cultura (MINCUL)",
      detail: "Registro Nacional del Patrimonio Cultural Inmaterial: La Festividad del Señor de los Milagros y la Música Criolla en Lima.",
      url: "https://www.gob.pe/cultura"
    },
    {
      publisher: "Municipalidad Metropolitana de Lima (MML)",
      detail: "Gerencia de Cultura: Calendario oficial de actividades cívicas y pasacalles del Centro Histórico de Lima.",
      url: "https://www.munlima.gob.pe"
    }
  ]
};

// Verificar si ya existe o actualizar
const idx = pilares.findIndex(p => p.slug === nuevoPilar.slug);
if (idx >= 0) {
  pilares[idx] = nuevoPilar;
  console.log('Pilar calendario actualizado en posición', idx);
} else {
  pilares.push(nuevoPilar);
  console.log('Nuevo pilar calendario agregado exitosamente.');
}

fs.writeFileSync(PILARES_PATH, JSON.stringify(pilares, null, 2), 'utf8');
console.log('data/atlas/pilares.json guardado con éxito. Total pilares:', pilares.length);
