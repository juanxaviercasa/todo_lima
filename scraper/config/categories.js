/**
 * Matriz maestra de categorías para todolima.com
 * Cada entrada define:
 * - slug: subdominio en Next.js (ej. doctores.todolima.com)
 * - query: consulta para Google Maps
 * - title: título amigable para SEO
 * - niche: agrupación temática
 * - heroHook: copy persuasivo estilo Go High Level
 */
export const CATEGORIES = [
  // SALUD Y BIENESTAR
  {
    slug: 'doctores',
    query: 'doctores en Lima',
    title: 'Doctores y Médicos Especialistas en Lima',
    niche: 'salud',
    heroHook: 'Encuentra en minutos a los médicos mejor calificados de Lima para cuidar de ti y tu familia con atención de primera.'
  },
  {
    slug: 'dentistas',
    query: 'clinicas dentales en Lima',
    title: 'Dentistas y Clínicas Odontológicas en Lima',
    niche: 'salud',
    heroHook: 'Recupera tu sonrisa con los mejores odontólogos y clínicas dentales valoradas por cientos de pacientes en Lima.'
  },
  {
    slug: 'psicologos',
    query: 'psicologos en Lima',
    title: 'Psicólogos y Terapeutas en Lima',
    niche: 'salud',
    heroHook: 'Tu bienestar mental es prioridad. Conecta con psicólogos especialistas en terapia presencial y virtual en Lima.'
  },
  {
    slug: 'pediatras',
    query: 'pediatras en Lima',
    title: 'Pediatras y Especialistas Infantiles en Lima',
    niche: 'salud',
    heroHook: 'La salud de tus pequeños en manos de los pediatras más recomendados y con mayor vocación de Lima.'
  },
  {
    slug: 'dermatologos',
    query: 'dermatologos en Lima',
    title: 'Dermatólogos y Clínicas de la Piel en Lima',
    niche: 'salud',
    heroHook: 'Luce una piel sana y radiante con los mejores especialistas en dermatología clínica y estética de Lima.'
  },
  {
    slug: 'veterinarias',
    query: 'veterinarias 24 horas en Lima',
    title: 'Veterinarias y Clínicas de Mascotas en Lima',
    niche: 'salud',
    heroHook: 'Atención de urgencia y preventiva para tu engreído con las veterinarias mejor valoradas de Lima.'
  },
  {
    slug: 'fisioterapia',
    query: 'centros de fisioterapia y rehabilitacion en Lima',
    title: 'Centros de Fisioterapia y Rehabilitación en Lima',
    niche: 'salud',
    heroHook: 'Alivia el dolor y recupera tu movilidad con fisioterapeutas certificados en Lima.'
  },
  {
    slug: 'nutricionistas',
    query: 'nutricionistas en Lima',
    title: 'Nutricionistas y Asesoría Dietética en Lima',
    niche: 'salud',
    heroHook: 'Alcanza tu peso ideal y mejora tus hábitos con planes nutricionales personalizados en Lima.'
  },
  {
    slug: 'oftalmologos',
    query: 'oftalmologos y clinicas de ojos en Lima',
    title: 'Oftalmólogos y Clínicas de Ojos en Lima',
    niche: 'salud',
    heroHook: 'Protege tu visión con los mejores especialistas en salud ocular y cirugía láser de Lima.'
  },
  {
    slug: 'ginecologos',
    query: 'ginecologos en Lima',
    title: 'Ginecólogos y Salud de la Mujer en Lima',
    niche: 'salud',
    heroHook: 'Atención médica integral, segura y confidencial para la mujer en las mejores clínicas de Lima.'
  },

  // HOGAR Y REPARACIONES
  {
    slug: 'cerrajeros',
    query: 'cerrajeros 24 horas en Lima',
    title: 'Cerrajeros y Servicios de Cerrajería en Lima',
    niche: 'hogar',
    heroHook: '¿Te quedaste fuera de casa o tu auto? Cerrajeros de confianza listos para ayudarte en tiempo récord las 24 horas.'
  },
  {
    slug: 'gasfiteros',
    query: 'gasfiteros a domicilio en Lima',
    title: 'Gasfiteros y Plomeros Profesionales en Lima',
    niche: 'hogar',
    heroHook: 'Repara fugas, desatoros e instalaciones sanitarias con gasfiteros expertos y garantizados en todo Lima.'
  },
  {
    slug: 'electricistas',
    query: 'electricistas a domicilio en Lima',
    title: 'Electricistas e Instalaciones Eléctricas en Lima',
    niche: 'hogar',
    heroHook: 'Soluciona cortocircuitos e instalaciones eléctricas con técnicos matriculados y seguros en Lima.'
  },
  {
    slug: 'pintores',
    query: 'pintores de casas y departamentos en Lima',
    title: 'Pintores de Casas y Edificios en Lima',
    niche: 'hogar',
    heroHook: 'Renueva tus ambientes con acabados impecables y cotizaciones justas de los mejores pintores de Lima.'
  },
  {
    slug: 'fumigacion',
    query: 'empresas de fumigacion en Lima',
    title: 'Empresas de Fumigación y Control de Plagas en Lima',
    niche: 'hogar',
    heroHook: 'Elimina cucarachas, roedores y plagas con servicios de fumigación certificados y seguros para tu familia.'
  },
  {
    slug: 'mudanzas',
    query: 'servicios de mudanza en Lima',
    title: 'Empresas de Mudanzas y Fletes en Lima',
    niche: 'hogar',
    heroHook: 'Múdate sin estrés con empresas de transporte seguras, puntuales y con servicio de embalaje en Lima.'
  },
  {
    slug: 'aire-acondicionado',
    query: 'mantenimiento de aire acondicionado en Lima',
    title: 'Técnicos de Aire Acondicionado y Climatización en Lima',
    niche: 'hogar',
    heroHook: 'Venta, instalación y mantenimiento preventivo para climatizar tu hogar u oficina en Lima.'
  },
  {
    slug: 'reparacion-lavadoras',
    query: 'reparacion de lavadoras a domicilio en Lima',
    title: 'Técnicos de Reparación de Lavadoras en Lima',
    niche: 'hogar',
    heroHook: 'Tu lavadora como nueva hoy mismo con técnicos a domicilio de todas las marcas en Lima.'
  },
  {
    slug: 'reparacion-refrigeradoras',
    query: 'reparacion de refrigeradoras a domicilio en Lima',
    title: 'Reparación de Refrigeradoras y Neveras en Lima',
    niche: 'hogar',
    heroHook: 'Servicio técnico urgente a domicilio con repuestos originales y garantía para tu refrigeradora.'
  },
  {
    slug: 'vidrierias',
    query: 'vidrierias en Lima',
    title: 'Vidrierías y Mamparas de Vidrio en Lima',
    niche: 'hogar',
    heroHook: 'Instalación de vidrio templado, espejos, ventanas y mamparas con los mejores talleres de Lima.'
  },
  {
    slug: 'carpinteros',
    query: 'carpinteros a domicilio en Lima',
    title: 'Carpinteros y Muebles de Melamina en Lima',
    niche: 'hogar',
    heroHook: 'Fabricación y reparación de muebles a medida, clósets y reposteros de cocina en Lima.'
  },

  // LEGAL Y FINANZAS
  {
    slug: 'abogados',
    query: 'estudios de abogados en Lima',
    title: 'Estudios de Abogados y Asesoría Legal en Lima',
    niche: 'legal',
    heroHook: 'Protege tus derechos e intereses con los estudios jurídicos y abogados más experimentados de Lima.'
  },
  {
    slug: 'notarias',
    query: 'notarias en Lima',
    title: 'Notarías Públicas en Lima',
    niche: 'legal',
    heroHook: 'Realiza tus trámites notariales, escrituras y poderes de forma rápida y segura en las mejores notarías de Lima.'
  },
  {
    slug: 'contadores',
    query: 'estudios contables en Lima',
    title: 'Contadores Públicos y Asesoría Tributaria en Lima',
    niche: 'legal',
    heroHook: 'Evita contingencias con SUNAT y optimiza tus finanzas con estudios contables de alto nivel en Lima.'
  },
  {
    slug: 'agentes-inmobiliarios',
    query: 'agentes inmobiliarios en Lima',
    title: 'Agentes Inmobiliarios y Venta de Propiedades en Lima',
    niche: 'legal',
    heroHook: 'Vende, compra o alquila tu propiedad al mejor precio de mercado con agentes expertos de Lima.'
  },

  // AUTOMOTRIZ
  {
    slug: 'talleres-mecanicos',
    query: 'talleres mecanicos automotriz en Lima',
    title: 'Talleres Mecánicos y Servicio Automotriz en Lima',
    niche: 'automotriz',
    heroHook: 'Mantenimiento preventivo, escaneo y reparación para tu vehículo en los talleres mecánicos más confiables de Lima.'
  },
  {
    slug: 'car-wash',
    query: 'car wash y car detailing en Lima',
    title: 'Car Wash y Detallado Automotriz en Lima',
    niche: 'automotriz',
    heroHook: 'Lavado de salón, tratamiento cerámico y pulido para dejar tu auto reluciente como de fábrica.'
  },
  {
    slug: 'llanterias',
    query: 'llanterias y vulcanizadoras en Lima',
    title: 'Llanterías y Venta de Neumáticos en Lima',
    niche: 'automotriz',
    heroHook: 'Cambio de llantas, alineación, balanceo y parchado de emergencia en Lima.'
  },
  {
    slug: 'auxilio-mecanico',
    query: 'auxilio mecanico y gruas en Lima',
    title: 'Grúas y Auxilio Mecánico en Lima',
    niche: 'automotriz',
    heroHook: '¿Te quedaste botado en la pista? Servicio de remolque con grúa y auxilio mecánico rápido en Lima.'
  },

  // EVENTOS Y FIESTAS
  {
    slug: 'catering',
    query: 'servicios de catering y banquetes en Lima',
    title: 'Empresas de Catering y Buffet en Lima',
    niche: 'eventos',
    heroHook: 'Haz inolvidable tu celebración con exquisita gastronomía y atención de primer nivel en Lima.'
  },
  {
    slug: 'tortas-personalizadas',
    query: 'tortas personalizadas en Lima',
    title: 'Pastelerías y Tortas Temáticas en Lima',
    niche: 'eventos',
    heroHook: 'Diseños espectaculares y sabores deliciosos para cumpleaños, bodas y aniversarios en Lima.'
  },
  {
    slug: 'fotografia-eventos',
    query: 'fotografos para eventos y bodas en Lima',
    title: 'Fotógrafos Profesionales y Cobertura de Eventos en Lima',
    niche: 'eventos',
    heroHook: 'Inmortaliza tus mejores momentos con fotógrafos galardonados en Lima.'
  },

  // BELLEZA Y ESTILO
  {
    slug: 'barberias',
    query: 'barberias en Lima',
    title: 'Barberías y Cortes de Cabello para Hombres en Lima',
    niche: 'belleza',
    heroHook: 'Cortes clásicos, degradados modernos y afeitado tradicional en las mejores barberías de Lima.'
  },
  {
    slug: 'salones-de-belleza',
    query: 'salones de belleza y peluquerias en Lima',
    title: 'Salones de Belleza y Peluquerías en Lima',
    niche: 'belleza',
    heroHook: 'Tintes, balayage, laceados y peinados de vanguardia con estilistas reconocidos en Lima.'
  },
  {
    slug: 'spas',
    query: 'spas y masajes relajantes en Lima',
    title: 'Spas y Centros de Masajes en Lima',
    niche: 'belleza',
    heroHook: 'Desconecta del estrés con masajes relajantes, faciales y circuitos de spa de lujo en Lima.'
  },

  // TECNOLOGÍA Y SEGURIDAD
  {
    slug: 'reparacion-celulares',
    query: 'servicio tecnico de celulares en Lima',
    title: 'Reparación de Celulares y Tablets en Lima',
    niche: 'tecnologia',
    heroHook: 'Cambio de pantalla, batería y solución a problemas de placa con repuestos originales al instante.'
  },
  {
    slug: 'reparacion-laptops',
    query: 'reparacion de laptops y computadoras en Lima',
    title: 'Servicio Técnico de Laptops y Computadoras en Lima',
    niche: 'tecnologia',
    heroHook: 'Mantenimiento, formateo y reparación exprés de computadoras y portátiles en Lima.'
  },
  {
    slug: 'camaras-de-seguridad',
    query: 'instalacion de camaras de seguridad en Lima',
    title: 'Instalación de Cámaras de Seguridad y Alarmas en Lima',
    niche: 'tecnologia',
    heroHook: 'Protege tu hogar y negocio con sistemas de videovigilancia y alarmas monitoreadas 24/7 en Lima.'
  },

  // GASTRONOMÍA & RESTAURANTES
  {
    slug: 'cevicherias',
    query: 'cevicherias en Lima',
    title: 'Cevicherías y Marisquerías en Lima',
    niche: 'gastronomia',
    heroHook: 'Disfruta del mejor ceviche y pescados frescos de Lima en las cevicherías y marisquerías mejor valoradas.'
  },
  {
    slug: 'pollerias',
    query: 'pollerias en Lima',
    title: 'Pollerías y Pollos a la Brasa en Lima',
    niche: 'gastronomia',
    heroHook: 'El auténtico sabor del pollo a la brasa limeño con crujientes papas y salsas caseras con delivery inmediato.'
  },
  {
    slug: 'chifas',
    query: 'chifas en Lima',
    title: 'Chifas y Restaurantes Orientales en Lima',
    niche: 'gastronomia',
    heroHook: 'Saborea lo mejor de la fusión peruano-china con los chifas tradicionales mejor calificados de Lima.'
  },
  {
    slug: 'pizzerias',
    query: 'pizzerias en Lima',
    title: 'Pizzerías Artesanales y Tradicionales en Lima',
    niche: 'gastronomia',
    heroHook: 'Pizzas a la leña, masa madre e ingredientes premium con los mejores maestros pizzeros de Lima.'
  },
  {
    slug: 'cafeterias',
    query: 'cafeterias de especialidad en Lima',
    title: 'Cafeterías de Especialidad y Brunch en Lima',
    niche: 'gastronomia',
    heroHook: 'Descubre los mejores cafés de especialidad, postres artesanales y brunch en los espacios más acogedores de Lima.'
  },

  // SERVICIOS ESENCIALES & COMERCIO
  {
    slug: 'florerias',
    query: 'florerias en Lima',
    title: 'Florerías y Delivery de Regalos en Lima',
    niche: 'comercio',
    heroHook: 'Sorprende en cualquier ocasión con arreglos florales exclusivos, rosas frescas y delivery puntual en todo Lima.'
  },
  {
    slug: 'opticas',
    query: 'opticas en Lima',
    title: 'Ópticas y Salud Visual en Lima',
    niche: 'salud',
    heroHook: 'Cuida tu vista con exámenes computarizados, lunas antirreflejo y las mejores monturas de marca en Lima.'
  },
  {
    slug: 'lavanderias',
    query: 'lavanderias en Lima',
    title: 'Lavanderías y Tintorerías en Lima',
    niche: 'hogar',
    heroHook: 'Prendas impecables, lavado en seco y servicio de recojo a domicilio rápido y confiable en Lima.'
  },
  {
    slug: 'escuelas-de-manejo',
    query: 'escuelas de conductores en Lima',
    title: 'Escuelas de Conductores y Brevetes en Lima',
    niche: 'educacion',
    heroHook: 'Aprende a manejar con seguridad y aprueba tu brevete A-1 con instructores certificados en todo Lima.'
  },
  {
    slug: 'casas-de-cambio',
    query: 'casas de cambio en Lima',
    title: 'Casas de Cambio y Compra/Venta de Dólares en Lima',
    niche: 'finanzas',
    heroHook: 'Cambia dólares y euros con el mejor tipo de cambio del mercado, total seguridad y garantía en Lima.'
  },

  // SALUD ESPECIALIZADA & MASCOTAS
  {
    slug: 'podologos',
    query: 'podologos en Lima',
    title: 'Podólogos y Clínicas del Pie en Lima',
    niche: 'salud',
    heroHook: 'Salud y bienestar para tus pies con podólogos especialistas en pie diabético, uñas encarnadas y tratamientos integrales.'
  },
  {
    slug: 'laboratorios-clinicos',
    query: 'laboratorios clinicos en Lima',
    title: 'Laboratorios de Análisis Clínicos en Lima',
    niche: 'salud',
    heroHook: 'Resultados rápidos, seguros y confiables en análisis de sangre, perfiles médicos y pruebas especiales en Lima.'
  },
  {
    slug: 'traumatologos',
    query: 'traumatologos en Lima',
    title: 'Traumatólogos y Especialistas de Columna en Lima',
    niche: 'salud',
    heroHook: 'Alivia dolores articulares y lesiones deportivas con los médicos traumatólogos más recomendados de Lima.'
  },
  {
    slug: 'grooming-canino',
    query: 'peluqueria canina y grooming en Lima',
    title: 'Peluquería Canina y Spa de Mascotas en Lima',
    niche: 'mascotas',
    heroHook: 'El mejor cuidado, baño medicado y corte de pelo para tu engreído con especialistas en estética canina en Lima.'
  },

  // FITNESS & EVENTOS
  {
    slug: 'gimnasios',
    query: 'gimnasios en Lima',
    title: 'Gimnasios y Centros Fitness en Lima',
    niche: 'fitness',
    heroHook: 'Transforma tu salud y alcanza tus metas con las mejores máquinas, entrenadores y clases grupales en Lima.'
  },
  {
    slug: 'locales-de-eventos',
    query: 'locales para eventos en Lima',
    title: 'Salones y Locales de Eventos en Lima',
    niche: 'eventos',
    heroHook: 'Celebra bodas, quinceañeros y eventos corporativos en los salones y casas de campo más exclusivos de Lima.'
  },
  {
    slug: 'decoracion-de-eventos',
    query: 'decoracion de fiestas y eventos en Lima',
    title: 'Decoración de Fiestas y Eventos en Lima',
    niche: 'eventos',
    heroHook: 'Transforma tus celebraciones con temáticas mágicas, ambientación personalizada y tendencias exclusivas en Lima.'
  },
  {
    slug: 'alquiler-de-canchas',
    query: 'canchas de grass sintetico en Lima',
    title: 'Alquiler de Canchas Sintéticas en Lima',
    niche: 'fitness',
    heroHook: 'Reserva al instante las mejores canchas de grass sintético con iluminación led para tus pichangas en Lima.'
  },
  {
    slug: 'restaurantes-criollos',
    query: 'restaurantes criollos en Lima',
    title: 'Restaurantes Criollos y Tradicionales en Lima',
    niche: 'gastronomia',
    heroHook: 'Disfruta del auténtico sabor limeño: lomo saltado, ají de gallina y caucau en las tabernas y restaurantes criollos emblemáticos de Lima.'
  },
  {
    slug: 'comida-regional',
    query: 'restaurantes de comida regional en Lima',
    title: 'Restaurantes de Comida Regional Peruana en Lima',
    niche: 'gastronomia',
    heroHook: 'Sabores del norte, sur y selva sin salir de la capital: cecina con tacacho, rocoto relleno, seco de cabrito y juanes tradicionales en Lima.'
  },
  {
    slug: 'anticucherias',
    query: 'anticucherias en Lima',
    title: 'Anticucherías y Brasas Tradicionales en Lima',
    niche: 'gastronomia',
    heroHook: 'Los mejores anticuchos de corazón a la parrilla, rachi, pancita y choclo con huancaína en las anticucherías más recomendadas de Lima.'
  },
  {
    slug: 'sangucherias',
    query: 'sangucherias tradicionales en Lima',
    title: 'Sangucherías Tradicionales y Chicharronerías en Lima',
    niche: 'gastronomia',
    heroHook: 'El clásico desayuno y lonche limeño: sánguches de chicharrón, pavo a la leña, asado y lechón con salsa criolla fresca en Lima.'
  },
  {
    slug: 'carnes-y-parrillas',
    query: 'restaurantes de carnes y parrillas en Lima',
    title: 'Restaurantes de Carnes y Parrillas en Lima',
    niche: 'gastronomia',
    heroHook: 'Cortes finos angus y wagyu, bife angosto, entraña fina y parrillas al carbón con maestros parrilleros expertos en Lima.'
  },
  {
    slug: 'restaurantes-vegetarianos',
    query: 'restaurantes vegetarianos y veganos en Lima',
    title: 'Restaurantes Vegetarianos y Veganos en Lima',
    niche: 'gastronomia',
    heroHook: 'Propuestas plant-based, cocina vegetariana creativa, bowls saludables y opciones sin gluten en los mejores restaurantes de Lima.'
  },
  {
    slug: 'restaurantes-nikkei',
    query: 'restaurantes nikkei en Lima',
    title: 'Restaurantes Nikkei y Fusión Japonesa en Lima',
    niche: 'gastronomia',
    heroHook: 'La cumbre de la fusión culinaria peruano-japonesa: tiraditos, nigiris de autor, makis innovadores y platos calientes nikkei en Lima.'
  },
  {
    slug: 'panaderias-artesanales',
    query: 'panaderias artesanales de masa madre en Lima',
    title: 'Panaderías Artesanales y Masa Madre en Lima',
    niche: 'gastronomia',
    heroHook: 'Pan de masa madre, hogazas rústicas, croissants hojaldrados y bollería fina horneada a diario con harinas selectas en Lima.'
  },
  {
    slug: 'heladerias-artesanales',
    query: 'heladerias artesanales en Lima',
    title: 'Heladerías Artesanales y Gelaterías en Lima',
    niche: 'gastronomia',
    heroHook: 'Gelato artesanal italiano, sorbetes de frutas nativas peruanas (lúcuma, maracuyá, aguaymanto) y conos recién horneados en Lima.'
  },
  {
    slug: 'dulcerias-tradicionales',
    query: 'dulcerias tradicionales y postres limenos',
    title: 'Dulcerías Tradicionales y Postres Limeños en Lima',
    niche: 'gastronomia',
    heroHook: 'El legado dulcero virreinal y republicano: suspiro a la limeña, mazamorra morada, arroz con leche, ranfañote y alfajores de convento.'
  },
  {
    slug: 'productos-naturales',
    query: 'tiendas de productos naturales y organicos en Lima',
    title: 'Tiendas de Productos Naturales y Orgánicos en Lima',
    niche: 'comercio',
    heroHook: 'Superfoods andinos, frutos secos, harinas integrales, suplementos limpios y productos orgánicos certificados en Lima.'
  },
  {
    slug: 'restaurantes-campestres',
    query: 'restaurantes campestres en Lima',
    title: 'Restaurantes Campestres y Recreos Familiares en Lima',
    niche: 'gastronomia',
    heroHook: 'Espacios al aire libre, pachamanca, chancho al palo y áreas verdes en los valles de Lurín, Pachacámac, Cieneguilla y Chosica.'
  },
  {
    slug: 'agencias-de-turismo',
    query: 'agencias de turismo receptivo en Lima',
    title: 'Agencias de Turismo Receptivo y Viajes en Lima',
    niche: 'turismo',
    heroHook: 'Paquetes turísticos, excursiones seguras, traslados y asesoría para explorar la capital y el Perú con agencias autorizadas en Lima.'
  },
  {
    slug: 'tours-y-experiencias',
    query: 'operadores de tours y experiencias en Lima',
    title: 'Tours Urbanos y Recorridos Guiados en Lima',
    niche: 'turismo',
    heroHook: 'Recorridos históricos por el Centro de Lima, rutas gastronómicas, paseos nocturnos y visitas arqueológicas con operadores locales.'
  },
  {
    slug: 'guias-de-turismo',
    query: 'guias oficiales de turismo en Lima',
    title: 'Guías Oficiales de Turismo en Lima',
    niche: 'turismo',
    heroHook: 'Conoce la historia, arquitectura y secretos de Lima con guías profesionales bilingües certificados por AGOTUR y Dircetur.'
  },
  {
    slug: 'hoteles',
    query: 'hoteles en Lima',
    title: 'Hoteles y Alojamientos Ejecutivos en Lima',
    niche: 'turismo',
    heroHook: 'Hoteles 3, 4 y 5 estrellas, hospedajes corporativos y habitaciones de lujo con vista al mar en Miraflores, San Isidro y Barranco.'
  },
  {
    slug: 'hostales-y-alojamientos',
    query: 'hostales turisticos en Lima',
    title: 'Hostales Turísticos y Alojamientos en Lima',
    niche: 'turismo',
    heroHook: 'Hospedajes económicos, bed & breakfast y hostales para viajeros y mochileros en las zonas más céntricas y seguras de Lima.'
  },
  {
    slug: 'alquiler-de-bicicletas',
    query: 'alquiler de bicicletas en Lima',
    title: 'Alquiler de Bicicletas y Movilidad Sostenible en Lima',
    niche: 'turismo',
    heroHook: 'Recorre el malecón de la Costa Verde, ciclovías de Miraflores, San Isidro y Barranco con bicicletas urbanas en perfecto estado.'
  },
  {
    slug: 'escuelas-de-surf',
    query: 'escuelas de surf en la Costa Verde Lima',
    title: 'Escuelas de Surf y Clases de Tabla en la Costa Verde',
    niche: 'fitness',
    heroHook: 'Aprende a correr olas en las playas Makaha, Redondo y Waikiki con instructores certificados, trajes de neopreno y tablas incluidas.'
  },
  {
    slug: 'penas-criollas',
    query: 'penas criollas en Lima',
    title: 'Peñas Criollas y Centros Musicales en Lima',
    niche: 'eventos',
    heroHook: 'Noches de cajón, guitarra, festejo, marinera y valses criollos en las peñas tradicionales más emblemáticas de Barranco y Lima.'
  },
  {
    slug: 'talleres-de-artesania',
    query: 'talleres de artesania y ceramica en Lima',
    title: 'Talleres de Artesanía y Cerámica en Lima',
    niche: 'educacion',
    heroHook: 'Aprende cerámica al torno, modelado en barro, retablos ayacuchanos y teñido textil con maestros artesanos tradicionales en Lima.'
  },
  {
    slug: 'tiendas-de-artesania',
    query: 'tiendas de artesania peruana en Lima',
    title: 'Tiendas de Artesanía Peruana y Souvenirs en Lima',
    niche: 'comercio',
    heroHook: 'Platería fina, retablos, textiles de alpaca, toritos de Pucará y recuerdos peruanos de comercio justo en galerías de Lima.'
  },
  {
    slug: 'librerias',
    query: 'librerias en Lima',
    title: 'Librerías y Venta de Libros en Lima',
    niche: 'comercio',
    heroHook: 'Literatura peruana e internacional, novedades editoriales, libros de arte, ensayo y narrativa en las librerías independientes de Lima.'
  },
  {
    slug: 'tiendas-de-mascotas',
    query: 'tiendas de mascotas y pet shops en Lima',
    title: 'Tiendas de Mascotas y Pet Shops en Lima',
    niche: 'mascotas',
    heroHook: 'Alimentos balanceados premium, juguetes interactivos, camas, antipulgas y accesorios para consentir a tus perros y gatos en Lima.'
  },
  {
    slug: 'ferreterias',
    query: 'ferreterias en Lima',
    title: 'Ferreterías y Materiales de Mantenimiento en Lima',
    niche: 'hogar',
    heroHook: 'Herramientas, tornillería, pinturas, grifería, cables y materiales para reparaciones y remodelaciones del hogar en tu distrito.'
  },
  {
    slug: 'tiendas-de-bicicletas',
    query: 'tiendas de bicicletas en Lima',
    title: 'Tiendas de Bicicletas y Accesorios en Lima',
    niche: 'comercio',
    heroHook: 'Bicicletas de montaña, ruta, gravel y urbanas, cascos, luces, indumentaria ciclista y repuestos originales de marcas líderes en Lima.'
  },
  {
    slug: 'reparacion-de-bicicletas',
    query: 'talleres de reparacion de bicicletas en Lima',
    title: 'Talleres de Reparación y Mecánica de Bicicletas en Lima',
    niche: 'hogar',
    heroHook: 'Mantenimiento integral, centrado de ruedas, purgado de frenos hidráulicos y afinamiento general para ciclistas urbanos y deportivos.'
  },
  {
    slug: 'zapaterias',
    query: 'zapaterias en Lima',
    title: 'Zapaterías y Venta de Calzado en Lima',
    niche: 'comercio',
    heroHook: 'Zapatos de cuero legítimo, calzado formal, zapatillas urbanas y sandalias con confección de calidad en las zapaterías de Lima.'
  },
  {
    slug: 'reparacion-de-calzado',
    query: 'talleres de reparacion de calzado en Lima',
    title: 'Talleres de Reparación de Calzado y Renovadoras en Lima',
    niche: 'hogar',
    heroHook: 'Cambio de tapas, suelas antideslizantes, teñido de cuero, costuras y renovación artesanal para prolongar la vida de tu calzado.'
  },
  {
    slug: 'sastrerias',
    query: 'sastrerias y arreglos de ropa en Lima',
    title: 'Sastrerías y Arreglos de Ropa en Lima',
    niche: 'hogar',
    heroHook: 'Confección a medida de ternos, sacos, bastas express, entalles de camisas y vestidos con maestros sastres y modistas en Lima.'
  }
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(cat => cat.slug === slug);
}
