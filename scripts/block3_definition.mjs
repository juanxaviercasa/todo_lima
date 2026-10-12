// Definición de las 20 categorías de Bloque 3: Educación, Mascotas, Deporte y Cuidado Personal
export const BLOCK_3_CATEGORIES = [
  // GRUPO 1: Educación (6 categorías)
  {
    slug: 'academias-de-idiomas',
    query: 'institutos y academias de idiomas en Lima',
    title: 'Institutos y Academias de Idiomas en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Aprende inglés, portugués, francés, italiano y alemán con profesores nativos, certificación internacional (TOEFL, IELTS) y metodología comunicativa.',
    editorial: [
      'cursos de idiomas para niños, jóvenes y adultos en modalidad presencial y virtual',
      'certificaciones internacionales otorgadas, tamaño de grupos y nivelación previa sin costo'
    ],
    imageSource: 'bibliotecas-publicas-de-lima-como-encontrar-una-y-consultar-sus-servicios-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'academias-preuniversitarias',
    query: 'academias preuniversitarias en Lima',
    title: 'Academias Preuniversitarias en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Preparación integral para exámenes de admisión de San Marcos, UNI, Católica (PUCP) y Cayetano Heredia con ciclos anuales y semestrales.',
    editorial: [
      'ciclos de preparación preuniversitaria, simulacros de examen y asesoría vocacional',
      'historial de ingresantes, material didáctico propio y seguimiento de rendimiento del alumno'
    ],
    imageSource: 'casa-de-la-literatura-peruana-espacios-y-programacion-para-visitantes-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'clases-particulares',
    query: 'clases particulares y reforzamiento escolar en Lima',
    title: 'Clases Particulares y Reforzamiento Académico en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Docentes particulares a domicilio y virtual para matemáticas, física, química, comprensión lectora e idiomas para primaria, secundaria y universidad.',
    editorial: [
      'clases personalizadas de nivelación, resolución de guías escolares y técnicas de estudio',
      'formación pedagógica del tutor, metodología de refuerzo y flexibilidad de horarios a domicilio'
    ],
    imageSource: 'bibliotecas-publicas-de-lima-como-encontrar-una-y-consultar-sus-servicios-presupuesto-desglosado-garantia.webp'
  },
  {
    slug: 'escuelas-de-musica',
    query: 'escuelas de musica y clases de canto en Lima',
    title: 'Escuelas de Música y Clases de Canto en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Aprende guitarra acústica y eléctrica, piano, batería, violín, ukelele y técnica vocal con métodos prácticos y ensambles en vivo en Lima.',
    editorial: [
      'formación musical instrumental, técnica vocal y solfeo para todas las edades',
      'instrumentos disponibles en sala, salas acústicas de práctica y recitales de fin de curso'
    ],
    imageSource: 'clases-de-musica-en-lima-como-comparar-formatos-y-objetivos-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'escuelas-de-danza',
    query: 'academias de danza marinera y baile en Lima',
    title: 'Academias de Danza, Marinera y Baile en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Marinera norteña, ballet clásico, danza folclórica, salsa, bachata y danza urbana con profesores galardonados en academias de Lima.',
    editorial: [
      'clases de danzas tradicionales peruanas, bailes de salón, ritmos latinos y danza clásica',
      'nivelación por edades, piso de madera amortiguado y presentaciones en festivales'
    ],
    imageSource: 'cultura-limena-tradiciones-e-influencias-que-conviven-en-la-capital-instrumentos-artesanias-muestra.webp'
  },
  {
    slug: 'talleres-de-arte',
    query: 'talleres de arte dibujo y pintura en Lima',
    title: 'Talleres de Arte, Dibujo y Pintura en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Desarrolla tu creatividad con clases de óleo, acuarela, dibujo anatómico, ilustración digital, escultura y grabado con artistas plásticos en Lima.',
    editorial: [
      'talleres libres de dibujo y pintura, acuarela contemporánea e iniciación artística para niños',
      'materiales incluidos en la matrícula, espacio iluminado y orientación personalizada del docente'
    ],
    imageSource: 'como-elegir-un-taller-creativo-para-una-actividad-de-fin-de-semana-portada-fin-semana-parque.webp'
  },

  // GRUPO 2: Mascotas (4 categorías)
  {
    slug: 'hospedajes-para-mascotas',
    query: 'hospedajes y hoteles para mascotas en Lima',
    title: 'Hospedajes y Hoteles para Mascotas en Lima',
    niche: 'mascotas',
    areaSlug: 'mascotas',
    heroHook: 'Alojamiento seguro y sin jaulas para perros y gatos, con supervisión veterinaria 24 horas, áreas verdes de recreo y reportes diarios por video.',
    editorial: [
      'hospedaje temporal con habitaciones climatizadas, paseos diarios y atención de dietas especiales',
      'requisito de carné de vacunación al día, desparasitación externa vigente y cámaras de monitoreo'
    ],
    imageSource: 'guarderia-de-mascotas-que-preguntar-sobre-alojamiento-y-comunicacion-portada-clinica-veterinaria-lima.webp'
  },
  {
    slug: 'guarderias-caninas',
    query: 'guarderias caninas y recreacion de dia en Lima',
    title: 'Guarderías Caninas y Recreación de Día en Lima',
    niche: 'mascotas',
    areaSlug: 'mascotas',
    heroHook: 'Diversión, socialización y juego supervisado para tu perro durante el día, con movilidad puerta a puerta, piscina canina y zonas de descanso.',
    editorial: [
      'cuidado diurno con actividades de estimulación mental, socialización en manada y áreas de sombra',
      'evaluación previa de temperamento, protocolos de movilidad segura y supervisores por número de canes'
    ],
    imageSource: 'veterinarias-de-urgencia-como-reconocer-senales-y-preparar-el-traslado-portada-clinica-veterinaria-lima.webp'
  },
  {
    slug: 'adiestramiento-canino',
    query: 'adiestramiento canino y educacion positiva en Lima',
    title: 'Adiestramiento Canino y Educación Positiva en Lima',
    niche: 'mascotas',
    areaSlug: 'mascotas',
    heroHook: 'Obediencia básica y avanzada, control de ansiedad por separación, paseos sin tirones y modificación de conducta con refuerzo positivo en Lima.',
    editorial: [
      'educación canina respetuosa, clases particulares a domicilio y solución de reactividad',
      'metodología sin castigo físico, certificación del educador canino y participación activa del tutor'
    ],
    imageSource: 'guarderia-de-mascotas-que-preguntar-sobre-alojamiento-y-comunicacion-portada-clinica-veterinaria-lima.webp'
  },
  {
    slug: 'paseadores-de-perros',
    query: 'paseadores de perros profesionales en Lima',
    title: 'Paseadores de Perros Profesionales en Lima',
    niche: 'mascotas',
    areaSlug: 'mascotas',
    heroHook: 'Paseos diarios enriquecedores y seguros en parques de tu distrito con paseadores certificados, correas dobles, hidratación y grupos reducidos.',
    editorial: [
      'paseos individuales o en grupos pequeños de 3 a 4 perros compatibles, con tracking GPS y fotos',
      'experiencia en manejo de correa, primeros auxilios veterinarios y acuerdos sobre horarios de paseo'
    ],
    imageSource: 'como-organizar-un-paseo-en-bicicleta-y-revisar-la-ruta-previamente-portada-fin-semana-parque.webp'
  },

  // GRUPO 3: Deporte y actividad física (5 categorías)
  {
    slug: 'estudios-de-yoga',
    query: 'estudios de yoga y meditacion en Lima',
    title: 'Estudios de Yoga y Meditación en Lima',
    niche: 'fitness',
    areaSlug: 'deporte-y-actividad-fisica',
    heroHook: 'Hatha, Vinyasa, Ashtanga, Yin Yoga y meditación guiada en salas armoniosas con instructores certificados para mejorar tu flexibilidad y calma.',
    editorial: [
      'clases de yoga para todos los niveles, respiración pranayama y talleres de bienestar integral',
      'estilo de yoga impartido, disponibilidad de mats y accesorios, y pases de clases flexibles'
    ],
    imageSource: 'barranco-a-pie-patrimonio-arte-y-pausas-para-comer-portada-patrimonio-arquitectura.webp'
  },
  {
    slug: 'estudios-de-pilates',
    query: 'estudios de pilates reformer en Lima',
    title: 'Estudios de Pilates Reformer en Lima',
    niche: 'fitness',
    areaSlug: 'deporte-y-actividad-fisica',
    heroHook: 'Fortalecimiento de core, corrección postural y tonificación muscular con máquinas Reformer, Cadillac y suelo bajo supervisión personalizada.',
    editorial: [
      'entrenamiento de pilates reformer en grupos reducidos de 4 a 6 personas y sesiones privadas',
      'calidad de los equipos reformer, certificación de los instructores y adaptación para rehabilitación'
    ],
    imageSource: 'cafeterias-para-trabajar-en-lima-conectividad-consumo-y-condiciones-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'academias-de-natacion',
    query: 'academias de natacion y piscinas temperadas en Lima',
    title: 'Academias de Natación y Clases Acuáticas en Lima',
    niche: 'fitness',
    areaSlug: 'deporte-y-actividad-fisica',
    heroHook: 'Clases de natación para bebés (matronatación), niños, adultos y preparación competitiva en piscinas temperadas bajo techo todo el año en Lima.',
    editorial: [
      'enseñanza de estilos (crol, espalda, pecho, mariposa), aqua gym y nado libre supervisado',
      'tratamiento y temperatura del agua, certificación de salvavidas y distribución por carriles'
    ],
    imageSource: 'costa-verde-diferencias-entre-paseo-por-el-malecon-y-visita-a-la-playa-portada-fin-semana-parque.webp'
  },
  {
    slug: 'academias-de-futbol',
    query: 'academias formativas de futbol en Lima',
    title: 'Academias Formativas de Fútbol en Lima',
    niche: 'fitness',
    areaSlug: 'deporte-y-actividad-fisica',
    heroHook: 'Desarrollo técnico, táctico y valores deportivos para niños y jóvenes con directores técnicos federados y canchas reglamentarias en Lima.',
    editorial: [
      'entrenamiento formativo por categorías de edad, preparación física y torneos inter-academias',
      'acreditación técnica de los entrenadores (FPF), infraestructura deportiva y botiquín de primeros auxilios'
    ],
    imageSource: 'como-organizar-un-torneo-deportivo-entre-amigos-presupuesto-desglosado-garantia.webp'
  },
  {
    slug: 'academias-de-artes-marciales',
    query: 'academias de artes marciales boxeo y jiu jitsu en Lima',
    title: 'Academias de Artes Marciales, Boxeo y Jiu-Jitsu en Lima',
    niche: 'fitness',
    areaSlug: 'deporte-y-actividad-fisica',
    heroHook: 'Entrenamiento de Muay Thai, Brazilian Jiu-Jitsu (BJJ), Boxeo profesional, Taekwondo y defensa personal para todas las edades y niveles en Lima.',
    editorial: [
      'artes marciales mixtas, defensa personal urbana, acondicionamiento funcional y sparring seguro',
      'linaje y graduación de cinturón negro de los profesores, tatamis higienizados y equipo de protección'
    ],
    imageSource: 'como-organizar-un-torneo-deportivo-entre-amigos-presupuesto-desglosado-garantia.webp'
  },

  // GRUPO 4: Cuidado personal (5 categorías)
  {
    slug: 'manicure-y-pedicure',
    query: 'salones de manicure pedicure y nail art en Lima',
    title: 'Salones de Manicure, Pedicure y Nail Art en Lima',
    niche: 'belleza',
    areaSlug: 'belleza-y-cuidado-personal',
    heroHook: 'Esmaltado en gel semipermanente, uñas acrílicas, dipping powder, manicura rusa, spa de pies y diseños personalizados de nail art en Lima.',
    editorial: [
      'cuidado estético de manos y pies, uñas esculpidas en gel/acrílico y tratamientos de parafina',
      'esterilización de instrumental en autoclave, marcas de esmaltes profesionales y bioseguridad'
    ],
    imageSource: 'como-comparar-propuestas-de-cortinas-y-estores-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'estudios-de-maquillaje',
    query: 'estudios de maquillaje profesional y novias en Lima',
    title: 'Estudios de Maquillaje Profesional y Novias en Lima',
    niche: 'belleza',
    areaSlug: 'belleza-y-cuidado-personal',
    heroHook: 'Maquillaje social de larga duración, novias, quinceañeras, sesiones fotográficas y cursos de automaquillaje con artistas reconocidos en Lima.',
    editorial: [
      'maquillaje social y editorial con aerógrafo o técnicas HD, peinados de fiesta y preparación de piel',
      'prueba previa de maquillaje para novias, productos de alta gama hipoalergénicos y atención a domicilio'
    ],
    imageSource: 'barranco-a-pie-patrimonio-arte-y-pausas-para-comer-portada-patrimonio-arquitectura.webp'
  },
  {
    slug: 'centros-de-depilacion',
    query: 'centros de depilacion laser y cera en Lima',
    title: 'Centros de Depilación Láser y Cera en Lima',
    niche: 'belleza',
    areaSlug: 'belleza-y-cuidado-personal',
    heroHook: 'Depilación láser diodo y soprano definitiva, depilación con cera vegetal tibia y perfilado de cejas con hilo hindú en centros especializados.',
    editorial: [
      'tratamientos de depilación médica láser en zonas faciales y corporales, con enfriamiento indoloro',
      'tecnología láser certificada (aprobada por FDA), evaluación dermatológica previa y paquetes por sesiones'
    ],
    imageSource: 'como-organizar-el-mantenimiento-de-areas-comunes-con-la-administracion-portada-administracion-edificio.webp'
  },
  {
    slug: 'estudios-de-tatuajes',
    query: 'estudios de tatuajes y tattoo artists en Lima',
    title: 'Estudios de Tatuajes y Tattoo Artists en Lima',
    niche: 'belleza',
    areaSlug: 'belleza-y-cuidado-personal',
    heroHook: 'Tatuajes realistas, blackwork, fineline, tradicional japonés y acuarela con tatuadores premiados y material 100% estéril y descartable en Lima.',
    editorial: [
      'tatuajes personalizados de autor, cobertura de cicatrices (cover-up) y asesoría en diseño previo',
      'autorización de salubridad visible (DIRIS/MINSA), tintas veganas certificadas y agujas descartables'
    ],
    imageSource: 'arte-urbano-en-lima-como-observarlo-sin-confundir-autorias-muralista-pintura-calle.webp'
  },
  {
    slug: 'estudios-de-piercing',
    query: 'estudios de piercing y perforaciones corporales en Lima',
    title: 'Estudios de Piercing y Perforaciones Corporales en Lima',
    niche: 'belleza',
    areaSlug: 'belleza-y-cuidado-personal',
    heroHook: 'Perforaciones en oreja (hélix, tragus, conch), nariz, ombligo y lengua con agujas americanas estériles y joyería de titanio grado implante en Lima.',
    editorial: [
      'colocación de piercings con técnica aséptica, curación guiada y joyería fina en oro 14k y titanio',
      'calidad de la joyería (rosca interna o sin rosca, titanio ASTM F-136) e instrucciones post-perforación'
    ],
    imageSource: 'arte-urbano-en-lima-como-observarlo-sin-confundir-autorias-pasaje-peatonal-murales.webp'
  }
];
