import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Definición de las 30 nuevas categorías de Bloque 1
export const NEW_CATEGORIES = [
  // TANDA A: Comer y comprar alimentos (12)
  {
    slug: 'restaurantes-criollos',
    query: 'restaurantes criollos en Lima',
    title: 'Restaurantes Criollos y Tradicionales en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Disfruta del auténtico sabor limeño: lomo saltado, ají de gallina y caucau en las tabernas y restaurantes criollos emblemáticos de Lima.',
    editorial: [
      'platos criollos tradicionales, guisos limeños y ambiente tradicional',
      'carta de platos criollos, porciones, tiempo de espera y si atienden con reserva'
    ],
    imageQuery: 'comida'
  },
  {
    slug: 'comida-regional',
    query: 'restaurantes de comida regional en Lima',
    title: 'Restaurantes de Comida Regional Peruana en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Sabores del norte, sur y selva sin salir de la capital: cecina con tacacho, rocoto relleno, seco de cabrito y juanes tradicionales en Lima.',
    editorial: [
      'platos típicos regionales de la costa, sierra y selva peruana',
      'región de especialidad, insumos tradicionales y disponibilidad de menú dominical'
    ],
    imageQuery: 'comida'
  },
  {
    slug: 'anticucherias',
    query: 'anticucherias en Lima',
    title: 'Anticucherías y Brasas Tradicionales en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Los mejores anticuchos de corazón a la parrilla, rachi, pancita y choclo con huancaína en las anticucherías más recomendadas de Lima.',
    editorial: [
      'anticuchos de corazón, rachi, pancita y guarniciones a las brasas',
      'corte, aderezo tradicional, punto de cocción y acompañamientos incluidos'
    ],
    imageQuery: 'anticucho'
  },
  {
    slug: 'sangucherias',
    query: 'sangucherias tradicionales en Lima',
    title: 'Sangucherías Tradicionales y Chicharronerías en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'El clásico desayuno y lonche limeño: sánguches de chicharrón, pavo a la leña, asado y lechón con salsa criolla fresca en Lima.',
    editorial: [
      'sánguches criollos, chicharrón de cerdo, pavo horneado y jugos surtidos',
      'tipo de pan, porción de carne, salsa criolla y opciones de empaque para llevar'
    ],
    imageQuery: 'sanguche'
  },
  {
    slug: 'carnes-y-parrillas',
    query: 'restaurantes de carnes y parrillas en Lima',
    title: 'Restaurantes de Carnes y Parrillas en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Cortes finos angus y wagyu, bife angosto, entraña fina y parrillas al carbón con maestros parrilleros expertos en Lima.',
    editorial: [
      'cortes de carne importada y nacional, parrillas al carbón y guarniciones',
      'origen del corte, maduración, término solicitado y guarniciones incluidas'
    ],
    imageQuery: 'parrilla'
  },
  {
    slug: 'restaurantes-vegetarianos',
    query: 'restaurantes vegetarianos y veganos en Lima',
    title: 'Restaurantes Vegetarianos y Veganos en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Propuestas plant-based, cocina vegetariana creativa, bowls saludables y opciones sin gluten en los mejores restaurantes de Lima.',
    editorial: [
      'platos basados en plantas, menús veganos y opciones sin gluten o alérgenos',
      'ingredientes declarados, certificación plant-based y trazabilidad de alérgenos'
    ],
    imageQuery: 'comida'
  },
  {
    slug: 'restaurantes-nikkei',
    query: 'restaurantes nikkei en Lima',
    title: 'Restaurantes Nikkei y Fusión Japonesa en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'La cumbre de la fusión culinaria peruano-japonesa: tiraditos, nigiris de autor, makis innovadores y platos calientes nikkei en Lima.',
    editorial: [
      'cocina fusión nikkei, sushi bar, tiraditos y especialidades calientes',
      'frescura de pescados, técnicas de corte, carta de autor y política de reservas'
    ],
    imageQuery: 'nikkei'
  },
  {
    slug: 'panaderias-artesanales',
    query: 'panaderias artesanales de masa madre en Lima',
    title: 'Panaderías Artesanales y Masa Madre en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Pan de masa madre, hogazas rústicas, croissants hojaldrados y bollería fina horneada a diario con harinas selectas en Lima.',
    editorial: [
      'panes de fermentación lenta, masa madre, baguettes y bollería europea',
      'fermentación natural, harinas utilizadas, frescura del horneado y horarios de salida'
    ],
    imageQuery: 'pan'
  },
  {
    slug: 'heladerias-artesanales',
    query: 'heladerias artesanales en Lima',
    title: 'Heladerías Artesanales y Gelaterías en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Gelato artesanal italiano, sorbetes de frutas nativas peruanas (lúcuma, maracuyá, aguaymanto) y conos recién horneados en Lima.',
    editorial: [
      'helados y gelatos artesanales, sorbetes de fruta natural y opciones sin lactosa',
      'ingredientes naturales, ausencia de saborizantes artificiales y variedad de sabores'
    ],
    imageQuery: 'dulce'
  },
  {
    slug: 'dulcerias-tradicionales',
    query: 'dulcerias tradicionales y postres limenos',
    title: 'Dulcerías Tradicionales y Postres Limeños en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'El legado dulcero virreinal y republicano: suspiro a la limeña, mazamorra morada, arroz con leche, ranfañote y alfajores de convento.',
    editorial: [
      'postres limeños de antaño, dulces de cuchara, turrones y pastelería tradicional',
      'receta tradicional, conservación, porciones individuales y pedidos especiales'
    ],
    imageQuery: 'dulce'
  },
  {
    slug: 'productos-naturales',
    query: 'tiendas de productos naturales y organicos en Lima',
    title: 'Tiendas de Productos Naturales y Orgánicos en Lima',
    niche: 'comercio',
    areaSlug: 'compras-y-comercio-local',
    heroHook: 'Superfoods andinos, frutos secos, harinas integrales, suplementos limpios y productos orgánicos certificados en Lima.',
    editorial: [
      'alimentos orgánicos, granos andinos, suplementos naturales y cosmética limpia',
      'registro sanitario, certificación orgánica visible y fecha de vencimiento'
    ],
    imageQuery: 'mercado'
  },
  {
    slug: 'restaurantes-campestres',
    query: 'restaurantes campestres en Lima',
    title: 'Restaurantes Campestres y Recreos Familiares en Lima',
    niche: 'gastronomia',
    areaSlug: 'comer-y-beber',
    heroHook: 'Espacios al aire libre, pachamanca, chancho al palo y áreas verdes en los valles de Lurín, Pachacámac, Cieneguilla y Chosica.',
    editorial: [
      'gastronomía al aire libre, chancho al palo, pachamanca y áreas recreativas',
      'capacidad, estacionamiento, juegos infantiles y si atienden con reserva previa'
    ],
    imageQuery: 'comida'
  },

  // TANDA B: Visitar y vivir Lima (10)
  {
    slug: 'agencias-de-turismo',
    query: 'agencias de turismo receptivo en Lima',
    title: 'Agencias de Turismo Receptivo y Viajes en Lima',
    niche: 'turismo',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Paquetes turísticos, excursiones seguras, traslados y asesoría para explorar la capital y el Perú con agencias autorizadas en Lima.',
    editorial: [
      'paquetes turísticos, tours guiados, reservas de pasajes y traslados seguros',
      'registro en MINCETUR/DIRCETUR, pólizas de seguro y condiciones de cancelación'
    ],
    imageQuery: 'turismo'
  },
  {
    slug: 'tours-y-experiencias',
    query: 'operadores de tours y experiencias en Lima',
    title: 'Tours Urbanos y Recorridos Guiados en Lima',
    niche: 'turismo',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Recorridos históricos por el Centro de Lima, rutas gastronómicas, paseos nocturnos y visitas arqueológicas con operadores locales.',
    editorial: [
      'walking tours, rutas gastronómicas, visitas patrimoniales y circuitos urbanos',
      'duración, tamaño del grupo, punto de encuentro e ingresos a monumentos incluidos'
    ],
    imageQuery: 'turismo'
  },
  {
    slug: 'guias-de-turismo',
    query: 'guias oficiales de turismo en Lima',
    title: 'Guías Oficiales de Turismo en Lima',
    niche: 'turismo',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Conoce la historia, arquitectura y secretos de Lima con guías profesionales bilingües certificados por AGOTUR y Dircetur.',
    editorial: [
      'guiados privados y grupales en español, inglés y otros idiomas para museos y ciudad',
      'carné oficial de guía de turismo (DIRCETUR), idiomas dominados y tarifa por horas'
    ],
    imageQuery: 'turismo'
  },
  {
    slug: 'hoteles',
    query: 'hoteles en Lima',
    title: 'Hoteles y Alojamientos Ejecutivos en Lima',
    niche: 'turismo',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Hoteles 3, 4 y 5 estrellas, hospedajes corporativos y habitaciones de lujo con vista al mar en Miraflores, San Isidro y Barranco.',
    editorial: [
      'habitaciones hoteleras, servicios corporativos, desayuno buffet y atención 24h',
      'categoría oficial, check-in/out, estacionamiento y políticas de cancelación'
    ],
    imageQuery: 'hotel'
  },
  {
    slug: 'hostales-y-alojamientos',
    query: 'hostales turisticos en Lima',
    title: 'Hostales Turísticos y Alojamientos en Lima',
    niche: 'turismo',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Hospedajes económicos, bed & breakfast y hostales para viajeros y mochileros en las zonas más céntricas y seguras de Lima.',
    editorial: [
      'habitaciones privadas y compartidas, espacios comunes y atención a viajeros',
      'seguridad, ubicación, servicios incluidos (wifi, agua caliente) y ambiente'
    ],
    imageQuery: 'hotel'
  },
  {
    slug: 'alquiler-de-bicicletas',
    query: 'alquiler de bicicletas en Lima',
    title: 'Alquiler de Bicicletas y Movilidad Sostenible en Lima',
    niche: 'turismo',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Recorre el malecón de la Costa Verde, ciclovías de Miraflores, San Isidro y Barranco con bicicletas urbanas en perfecto estado.',
    editorial: [
      'alquiler por horas o día de bicicletas urbanas, cascos y candados de seguridad',
      'mantenimiento de la unidad, accesorios de seguridad incluidos y depósito requerido'
    ],
    imageQuery: 'bici'
  },
  {
    slug: 'escuelas-de-surf',
    query: 'escuelas de surf en la Costa Verde Lima',
    title: 'Escuelas de Surf y Clases de Tabla en la Costa Verde',
    niche: 'fitness',
    areaSlug: 'deporte-y-actividad-fisica',
    heroHook: 'Aprende a correr olas en las playas Makaha, Redondo y Waikiki con instructores certificados, trajes de neopreno y tablas incluidas.',
    editorial: [
      'clases de surf para principiantes y avanzados, alquiler de tablas y wetsuits',
      'certificación de los instructores, medidas de rescate acuático y equipamiento'
    ],
    imageQuery: 'surf'
  },
  {
    slug: 'penas-criollas',
    query: 'penas criollas en Lima',
    title: 'Peñas Criollas y Centros Musicales en Lima',
    niche: 'eventos',
    areaSlug: 'turismo-y-experiencias',
    heroHook: 'Noches de cajón, guitarra, festejo, marinera y valses criollos en las peñas tradicionales más emblemáticas de Barranco y Lima.',
    editorial: [
      'espectáculos de música criolla en vivo, danzas peruanas, piqueos y tragos',
      'horario de inicio del show, consumo mínimo o cover y política de reserva de mesas'
    ],
    imageQuery: 'cultura'
  },
  {
    slug: 'talleres-de-artesania',
    query: 'talleres de artesania y ceramica en Lima',
    title: 'Talleres de Artesanía y Cerámica en Lima',
    niche: 'educacion',
    areaSlug: 'educacion-y-talleres',
    heroHook: 'Aprende cerámica al torno, modelado en barro, retablos ayacuchanos y teñido textil con maestros artesanos tradicionales en Lima.',
    editorial: [
      'talleres prácticos de cerámica, retablo, orfebrería y técnicas artesanales',
      'materiales incluidos, nivel de experiencia requerido y entrega de piezas horneadas'
    ],
    imageQuery: 'artesania'
  },
  {
    slug: 'tiendas-de-artesania',
    query: 'tiendas de artesania peruana en Lima',
    title: 'Tiendas de Artesanía Peruana y Souvenirs en Lima',
    niche: 'comercio',
    areaSlug: 'compras-y-comercio-local',
    heroHook: 'Platería fina, retablos, textiles de alpaca, toritos de Pucará y recuerdos peruanos de comercio justo en galerías de Lima.',
    editorial: [
      'artesanía tradicional de diversas regiones, platería, textilería y recuerdos',
      'autenticidad de los materiales (alpaca, plata 925), origen artesanal y comprobantes'
    ],
    imageQuery: 'artesania'
  },

  // TANDA C: Comercio de barrio (8)
  {
    slug: 'librerias',
    query: 'librerias en Lima',
    title: 'Librerías y Venta de Libros en Lima',
    niche: 'comercio',
    areaSlug: 'compras-y-comercio-local',
    heroHook: 'Literatura peruana e internacional, novedades editoriales, libros de arte, ensayo y narrativa en las librerías independientes de Lima.',
    editorial: [
      'venta de libros nuevos, clásicos, literatura infantil y novedades editoriales',
      'disponibilidad de catálogo, encargos de títulos y políticas de cambio'
    ],
    imageQuery: 'libro'
  },
  {
    slug: 'tiendas-de-mascotas',
    query: 'tiendas de mascotas y pet shops en Lima',
    title: 'Tiendas de Mascotas y Pet Shops en Lima',
    niche: 'mascotas',
    areaSlug: 'mascotas',
    heroHook: 'Alimentos balanceados premium, juguetes interactivos, camas, antipulgas y accesorios para consentir a tus perros y gatos en Lima.',
    editorial: [
      'alimentos medicados y comerciales, snacks, accesorios y productos de higiene',
      'fecha de vencimiento en empaques, variedad de marcas y asesoría básica'
    ],
    imageQuery: 'mascota'
  },
  {
    slug: 'ferreterias',
    query: 'ferreterias en Lima',
    title: 'Ferreterías y Materiales de Mantenimiento en Lima',
    niche: 'hogar',
    areaSlug: 'compras-y-comercio-local',
    heroHook: 'Herramientas, tornillería, pinturas, grifería, cables y materiales para reparaciones y remodelaciones del hogar en tu distrito.',
    editorial: [
      'herramientas manuales y eléctricas, insumos de gasfitería, electricidad y fijación',
      'asesoría técnica de mostrador, garantía de marca y servicio de corte o despacho'
    ],
    imageQuery: 'ferreteria'
  },
  {
    slug: 'tiendas-de-bicicletas',
    query: 'tiendas de bicicletas en Lima',
    title: 'Tiendas de Bicicletas y Accesorios en Lima',
    niche: 'comercio',
    areaSlug: 'compras-y-comercio-local',
    heroHook: 'Bicicletas de montaña, ruta, gravel y urbanas, cascos, luces, indumentaria ciclista y repuestos originales de marcas líderes en Lima.',
    editorial: [
      'bicicletas nuevas, componentes de transmisión, cascos e indumentaria ciclista',
      'talla adecuada del cuadro, garantía de fábrica y primer servicio técnico postventa'
    ],
    imageQuery: 'bici'
  },
  {
    slug: 'reparacion-de-bicicletas',
    query: 'talleres de reparacion de bicicletas en Lima',
    title: 'Talleres de Reparación y Mecánica de Bicicletas en Lima',
    niche: 'hogar',
    areaSlug: 'vehiculos-y-movilidad',
    heroHook: 'Mantenimiento integral, centrado de ruedas, purgado de frenos hidráulicos y afinamiento general para ciclistas urbanos y deportivos.',
    editorial: [
      'mantenimiento preventivo, ajuste de cambios, purgado de frenos y centrado',
      'diagnóstico previo, repuestos compatibles y prueba de rodaje antes de la entrega'
    ],
    imageQuery: 'bici'
  },
  {
    slug: 'zapaterias',
    query: 'zapaterias en Lima',
    title: 'Zapaterías y Venta de Calzado en Lima',
    niche: 'comercio',
    areaSlug: 'compras-y-comercio-local',
    heroHook: 'Zapatos de cuero legítimo, calzado formal, zapatillas urbanas y sandalias con confección de calidad en las zapaterías de Lima.',
    editorial: [
      'calzado para damas, caballeros y niños en cuero natural y materiales sintéticos',
      'horma, material de la suela y plantilla, y políticas de cambio por talla'
    ],
    imageQuery: 'zapato'
  },
  {
    slug: 'reparacion-de-calzado',
    query: 'talleres de reparacion de calzado en Lima',
    title: 'Talleres de Reparación de Calzado y Renovadoras en Lima',
    niche: 'hogar',
    areaSlug: 'hogar-y-reparaciones',
    heroHook: 'Cambio de tapas, suelas antideslizantes, teñido de cuero, costuras y renovación artesanal para prolongar la vida de tu calzado.',
    editorial: [
      'cambio de tapitas, suelas completas, teñido, costuras y ensanchado de calzado',
      'material de reemplazo (caucho, cuero), plazo de entrega y garantía del trabajo'
    ],
    imageQuery: 'zapato'
  },
  {
    slug: 'sastrerias',
    query: 'sastrerias y arreglos de ropa en Lima',
    title: 'Sastrerías y Arreglos de Ropa en Lima',
    niche: 'hogar',
    areaSlug: 'hogar-y-reparaciones',
    heroHook: 'Confección a medida de ternos, sacos, bastas express, entalles de camisas y vestidos con maestros sastres y modistas en Lima.',
    editorial: [
      'confección de ternos a medida, entalles, cambio de cierres y bastas de prendas',
      'toma de medidas precisa, número de pruebas intermedias y plazo de entrega'
    ],
    imageQuery: 'ropa'
  }
];
