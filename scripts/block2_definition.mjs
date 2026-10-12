// Definición de las 20 nuevas categorías de Bloque 2: Hogar, mantenimiento y proveedores para pymes
export const BLOCK_2_CATEGORIES = [
  // GRUPO 1: Hogar y construcción (10 categorías)
  {
    slug: 'empresas-de-limpieza',
    query: 'empresas de limpieza y mantenimiento en Lima',
    title: 'Empresas de Limpieza y Mantenimiento en Lima',
    niche: 'hogar',
    areaSlug: 'hogar-y-reparaciones',
    heroHook: 'Limpieza integral para casas, departamentos, oficinas y condominios con personal calificado, productos industriales y protocolos de seguridad.',
    editorial: [
      'servicios de limpieza profunda, mantenimiento preventivo de oficinas y fin de obra',
      'experiencia del personal, pólizas de seguro, productos utilizados y frecuencia de contratación'
    ],
    imageSource: 'como-organizar-una-limpieza-despues-de-una-obra-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'limpieza-de-muebles',
    query: 'limpieza y lavado de muebles y colchones en Lima',
    title: 'Limpieza y Lavado de Muebles y Colchones en Lima',
    niche: 'hogar',
    areaSlug: 'hogar-y-reparaciones',
    heroHook: 'Eliminación profunda de manchas, ácaros y olores en sofás, sillas, colchones y alfombras con máquinas de inyección y extracción en tu domicilio.',
    editorial: [
      'lavado y desinfección de tapices, muebles de tela y cuero, colchones y alfombras',
      'sistema de secado rápido, tipo de químicos biodegradables y garantía post-lavado'
    ],
    imageSource: 'como-comparar-propuestas-de-cortinas-y-estores-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'limpieza-de-cisternas',
    query: 'limpieza y desinfeccion de cisternas y tanques en Lima',
    title: 'Limpieza y Desinfección de Cisternas y Tanques en Lima',
    niche: 'hogar',
    areaSlug: 'hogar-y-reparaciones',
    heroHook: 'Mantenimiento sanitario de reservorios de agua potable para viviendas y edificios, con certificado de salubridad y desinfección según normas de DIGESA.',
    editorial: [
      'lavado, desinfección y certificación de cisternas subterráneas y tanques elevados',
      'emisión de certificado formal de salubridad, bombas sumergibles y tiempo de parada de agua'
    ],
    imageSource: 'como-organizar-el-mantenimiento-de-areas-comunes-con-la-administracion-portada-administracion-edificio.webp'
  },
  {
    slug: 'desatoros',
    query: 'servicios de desatoros con maquina electrica en Lima',
    title: 'Servicios de Desatoros y Máquinas Eléctricas en Lima',
    niche: 'hogar',
    areaSlug: 'hogar-y-reparaciones',
    heroHook: 'Atención de emergencias en desagües, inodoros, lavaderos y tuberías principales con sondas eléctricas y cámaras de inspección sin romper pisos.',
    editorial: [
      'desobstrucción de redes sanitarias, tuberías y trampas de grasa con máquina rotativa',
      'diagnóstico con cámara previa, presupuesto cerrado y costo de atención nocturna o de emergencia'
    ],
    imageSource: 'como-describir-una-incidencia-del-hogar-sin-intentar-diagnosticarla-checklist-mantenimiento-tecnico.webp'
  },
  {
    slug: 'impermeabilizacion',
    query: 'impermeabilizacion de techos y terrazas en Lima',
    title: 'Impermeabilización de Techos y Terrazas en Lima',
    niche: 'construccion',
    areaSlug: 'construccion-y-remodelacion',
    heroHook: 'Protege tu vivienda de la humedad, garúa limeña y filtraciones con mantos asfálticos, membranas líquidas y poliuretano aplicados por expertos.',
    editorial: [
      'aplicación de mantos asfálticos, membranas líquidas y sellado de juntas en techos',
      'garantía por escrito contra filtraciones, preparación de la superficie y pendiente de desagüe'
    ],
    imageSource: 'como-coordinar-trabajos-de-pintura-y-proteger-muebles-y-espacios-checklist-mantenimiento-tecnico.webp'
  },
  {
    slug: 'albanileria-y-remodelaciones',
    query: 'albanileria acabados y remodelaciones en Lima',
    title: 'Albañilería, Acabados y Remodelaciones en Lima',
    niche: 'construccion',
    areaSlug: 'construccion-y-remodelacion',
    heroHook: 'Ampliaciones, levantamiento de muros, enlucidos, pisos porcelanatos y remodelaciones de baños y cocinas con maestros de obra de confianza.',
    editorial: [
      'construcción tradicional, tarrajeo, asentado de ladrillo, pisos y remodelaciones completas',
      'cronograma de trabajo, contrato formal con hitos de pago y manejo de desmonte'
    ],
    imageSource: 'como-organizar-una-limpieza-despues-de-una-obra-presupuesto-desglosado-garantia.webp'
  },
  {
    slug: 'arquitectura',
    query: 'estudios de arquitectura y diseno en Lima',
    title: 'Estudios de Arquitectura y Planos en Lima',
    niche: 'construccion',
    areaSlug: 'construccion-y-remodelacion',
    heroHook: 'Diseño arquitectónico integral, anteproyectos, expedientes para licencia municipal, independizaciones y supervisión técnica de obra en Lima.',
    editorial: [
      'anteproyectos residenciales y comerciales, planos de obra y gestión de licencias municipales',
      'registro en el Colegio de Arquitectos del Perú (CAP), portafolio de obras y entregables bim/3d'
    ],
    imageSource: 'balcones-limenos-arquitectura-y-formas-de-observarlos-portada-balcones-centro.webp'
  },
  {
    slug: 'diseno-de-interiores',
    query: 'diseno de interiores y decoracion en Lima',
    title: 'Diseño de Interiores y Decoración en Lima',
    niche: 'construccion',
    areaSlug: 'construccion-y-remodelacion',
    heroHook: 'Optimización de espacios, diseño de mobiliario a medida, iluminación, paletas de color y renderizado 3D para hogares y locales comerciales.',
    editorial: [
      'distribución espacial, diseño de muebles a medida, selección de materiales y estilismo',
      'renders realistas, presupuesto detallado de fabricación y supervisión de montaje'
    ],
    imageSource: 'como-comparar-propuestas-de-cortinas-y-estores-entrega-servicio-conformidad.webp'
  },
  {
    slug: 'jardineria',
    query: 'servicios de jardineria y paisajismo en Lima',
    title: 'Jardinería, Paisajismo y Áreas Verdes en Lima',
    niche: 'hogar',
    areaSlug: 'construccion-y-remodelacion',
    heroHook: 'Cuidado y diseño de jardines, corte de césped, poda de árboles, sistemas de riego tecnificado y plantas ornamentales adaptadas al clima de Lima.',
    editorial: [
      'mantenimiento de césped, diseño de áreas verdes, riego tecnificado y control de plagas botánicas',
      'frecuencia de visitas, abono orgánico incluido y conocimiento de especies de bajo consumo hídrico'
    ],
    imageSource: 'como-organizar-un-paseo-con-adultos-mayores-sin-asumir-accesibilidad-adultos-mayores-bancas-jardin.webp'
  },
  {
    slug: 'estructuras-metalicas',
    query: 'estructuras metalicas techos y soldadura en Lima',
    title: 'Estructuras Metálicas y Soldadura en Lima',
    niche: 'construccion',
    areaSlug: 'construccion-y-remodelacion',
    heroHook: 'Fabricación e instalación de techos ligeros, tijerales, rejas de seguridad, portones levadizos, escaleras caracol y barandas de acero inoxidable.',
    editorial: [
      'carpintería metálica, techos de policarbonato, soldadura calificada y estructuras de acero',
      'calibre de perfiles, tipo de pintura anticorrosiva o galvanizado y garantía estructural'
    ],
    imageSource: 'como-documentar-un-trabajo-contratado-y-registrar-acuerdos-presupuesto-desglosado-garantia.webp'
  },

  // GRUPO 2: Proveedores para pymes (10 categorías)
  {
    slug: 'imprentas',
    query: 'imprentas comerciales y offset en Lima',
    title: 'Imprentas Comerciales y Gráficas en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Impresión offset y digital de alta calidad: folletos, catálogos, tarjetas de presentación, facturas, carpetas corporativas y volantes en Lima.',
    editorial: [
      'impresión offset y digital, papelería institucional, catálogos y acabados especiales',
      'prueba de color previa, tipos de papel/gramajes, tirajes mínimos y plazos de entrega'
    ],
    imageSource: 'como-mantener-horarios-y-contactos-del-negocio-actualizados-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'impresion-gran-formato',
    query: 'impresion de gran formato y gigantografias en Lima',
    title: 'Impresión de Gran Formato y Gigantografías en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Banners en lona vinílica, viniles adhesivos troquelados, paneles publicitarios, displays para ferias y decoración vehicular en Lima.',
    editorial: [
      'banners publicitarios, viniles troquelados, vallas y gráfica publicitaria de gran escala',
      'resolución de impresión, resistencia a rayos UV exterior, tipo de ojalillos y acabado'
    ],
    imageSource: 'arte-urbano-en-lima-como-observarlo-sin-confundir-autorias-portada-mural-arte-urbano.webp'
  },
  {
    slug: 'letreros-y-senaletica',
    query: 'fabricacion de letreros publicitarios y senaletica en Lima',
    title: 'Letreros Publicitarios y Señalética en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Letras en acrílico 3D con luz LED, cajas de luz, señalética de seguridad INDECI y letreros exteriores duraderos para locales comerciales.',
    editorial: [
      'cajas de luz, letras volumétricas retroiluminadas y señalética de evacuación bajo norma INDECI',
      'materiales resistentes a intemperie, transformadores con garantía e instalación certificada'
    ],
    imageSource: 'como-coordinar-el-ingreso-de-proveedores-en-un-edificio-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'envases-y-embalajes',
    query: 'proveedores de envases y cajas de carton en Lima',
    title: 'Proveedores de Envases, Cajas y Embalajes en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Cajas de cartón corrugado para envíos y mudanzas, empaques ecológicos para delivery gastronómico, bolsas biodegradables y film stretch.',
    editorial: [
      'cajas de cartón a medida, empaques compostables para alimentos y materiales de embalaje industrial',
      'resistencia del cartón (onda C/BC), personalización con logo y pedido mínimo por escala'
    ],
    imageSource: 'como-comparar-cotizaciones-sin-perder-condiciones-importantes-portada-vivienda-servicios-hogar.webp'
  },
  {
    slug: 'uniformes-empresariales',
    query: 'confeccion de uniformes empresariales e industriales en Lima',
    title: 'Uniformes Empresariales e Industriales en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Confección de camisas corporativas, pantalones drill, chalecos de seguridad reflectivos, mandiles y ropa de trabajo para empresas en Lima.',
    editorial: [
      'ropa de trabajo industrial, camisas de oficina, uniformes médicos y prendas reflectivas',
      'calidad de la tela (drill, popelina, algodón), tallaje estándar y bordado de logotipo institucional'
    ],
    imageSource: 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-feria-artesanias-textiles.webp'
  },
  {
    slug: 'bordados-y-estampados',
    query: 'bordados computarizados y estampados textiles en Lima',
    title: 'Bordados Computarizados y Estampados en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Matricería y bordado industrial para gorros, polos y camisas; serigrafía de alta densidad, sublimación y DTF textil en talleres de Lima.',
    editorial: [
      'bordado computarizado de insignias, serigrafía al agua o plastisol, DTF y vinil textil',
      'nitidez de puntadas, durabilidad al lavado, entrega de muestra física y tiempo de producción'
    ],
    imageSource: 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-artesano-retablo-taller.webp'
  },
  {
    slug: 'reparacion-de-impresoras',
    query: 'servicio tecnico de impresoras y fotocopiadoras en Lima',
    title: 'Servicio Técnico de Impresoras y Fotocopiadoras en Lima',
    niche: 'tecnologia',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Mantenimiento preventivo y correctivo de impresoras multifuncionales, sistemas continuos, atascos de papel y cabezales de impresión en Lima.',
    editorial: [
      'reparación de marcas líderes (Epson, HP, Canon, Brother), cambio de almohadillas y tóner',
      'diagnóstico en laboratorio o en sitio, repuestos originales y garantía del servicio'
    ],
    imageSource: 'como-describir-una-incidencia-del-hogar-sin-intentar-diagnosticarla-portada-administracion-edificio.webp'
  },
  {
    slug: 'refrigeracion-comercial',
    query: 'refrigeracion comercial e industrial en Lima',
    title: 'Refrigeración Comercial e Industrial en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Mantenimiento y reparación de cámaras frigoríficas, visicoolers para bodegas, congeladoras y mesas refrigeradas para negocios gastronómicos.',
    editorial: [
      'servicio técnico de compresores, recarga de gas refrigerante ecológico y control térmico',
      'disponibilidad de atención inmediata ante corte de cadena de frío y garantía de repuestos'
    ],
    imageSource: 'como-organizar-el-mantenimiento-de-areas-comunes-con-la-administracion-checklist-mantenimiento-tecnico.webp'
  },
  {
    slug: 'equipos-gastronomicos',
    query: 'equipos gastronomicos y cocinas industriales en Lima',
    title: 'Equipamiento Gastronómico y Cocinas Industriales en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Venta y mantenimiento de cocinas industriales en acero inoxidable, hornos pizzeros, freidoras automáticas y campanas extractoras en Lima.',
    editorial: [
      'maquinaria para restaurantes, panaderías y cafeterías en acero inoxidable quirúrgico',
      'certificación técnica del sistema a gas/eléctrico, manual de uso y servicio técnico postventa'
    ],
    imageSource: 'catering-para-reuniones-en-lima-como-definir-el-servicio-que-necesitas-portada-restaurante-limeno.webp'
  },
  {
    slug: 'courier-y-mensajeria',
    query: 'courier local y mensajeria express en Lima',
    title: 'Courier Local y Mensajería Express Corporativa en Lima',
    niche: 'negocios',
    areaSlug: 'proveedores-para-negocios',
    heroHook: 'Envíos motorizados en el mismo día, mensajería de documentos legales, trámites notariales y reparto de paquetería e-commerce en Lima.',
    editorial: [
      'envíos express punto a punto en Lima Metropolitana y Callao, gestión de cobranza contraentrega',
      'seguimiento GPS en tiempo real, seguro de carga declarada y confirmación digital de entrega'
    ],
    imageSource: 'como-comunicar-la-ubicacion-del-local-y-la-cobertura-a-domicilio-presupuesto-desglosado-garantia.webp'
  }
];
