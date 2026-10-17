export const OPERACIONES_TOOLS = [
  {
    slug: 'generador-codigos-qr',
    name: 'Generador de Códigos QR para Negocios',
    appTitle: 'QR Directo · Enlaces y Códigos QR para WhatsApp con Rastreo UTM',
    categoryId: 'operaciones',
    categoryTitle: 'Operaciones, Ventas y Logística',
    badge: 'Ventas / Atención',
    url: 'https://nubeparapymes.online/herramientas/ventas/generador-codigos-qr/',
    shortDesc: 'Crea códigos QR de alta resolución listos para imprimir en mostradores, cartas digitales, empaques de delivery o enlaces directos a WhatsApp Business.',
    heroSubtitle: 'Tutorial paso a paso para usar QR Directo: configuración de código de país (PE +51), mensaje predefinido con contador (0/600), parámetros de rastreo UTM, simulador de burbuja de WhatsApp y estilos de QR (Clásico, Moderno e Icono de chat).',
    purpose: 'Cada vez que un cliente en Lima tiene que agendar manualmente tu número de celular para recién escribirte por WhatsApp, pierdes hasta el 60% de las consultas por fricción. Esta herramienta (QR Directo) genera simultáneamente tu enlace directo `wa.me/51...` con un mensaje comercial pre-escrito, le concatena etiquetas de seguimiento UTM (`utm_source`, `utm_medium`, `utm_campaign`), te muestra en tiempo real cómo se verá la burbuja de chat en el teléfono del cliente y renderiza un código QR personalizable en PNG listo para mostradores, flyers, bolsas de delivery o redes sociales.',
    interfaceMap: [
      {
        zone: 'Panel de Número de WhatsApp y Selector Internacional de País',
        controls: ['Selector desplegable: Código de país (PE +51, AR +54, CL +56, CO +57, MX +52, US +1, ES +34, etc.)', 'Campo: Número de WhatsApp (6 a 15 dígitos sin repetir el prefijo de país)'],
        description: 'Formatea el número bajo el estándar internacional E.164 eliminando espacios, guiones o signos "+" duplicados que suelen romper los enlaces `wa.me`.'
      },
      {
        zone: 'Editor de "Mensaje predefinido" con Medidor de Longitud Óptima',
        controls: ['Área de texto: Mensaje predefinido (placeholder: "Hola, me gustaría recibir más información sobre...")', 'Contador en vivo: Longitud óptima (0 / 600 caracteres)', 'Alertas automáticas: Longitud óptima · Acercándote al límite · Mensaje muy largo'],
        description: 'Controla la extensión del mensaje inicial para que sea claro al abrirse en WhatsApp y no genere un código QR excesivamente denso de escanear en impresiones pequeñas.'
      },
      {
        zone: 'Acordeón desplegable "Parámetros de rastreo (UTM)" (UtmPanel)',
        controls: ['Botón desplegable: Parámetros de rastreo (UTM)', 'Campo: utm_source (ej. instagram, flyer_miraflores)', 'Campo: utm_medium (ej. social, impreso, qr_mostrador)', 'Campo: utm_campaign (ej. lanzamiento_2026)'],
        description: 'Concatena automáticamente parámetros de atribución al final del enlace generado para que sepas desde qué pieza impresa, empaque o campaña llegó cada conversación.'
      },
      {
        zone: 'Simulador "Vista previa del mensaje" en Tiempo Real',
        controls: ['Cabecera simulada de WhatsApp (+51 · en línea)', 'Burbuja de chat en vivo con hora (00:26)', 'Indicador: "Así verá tu contacto el mensaje al abrir el enlace"'],
        description: 'Muestra exactamente cómo aparecerá redactado tu mensaje en la pantalla del teléfono del cliente antes de que pulse enviar.'
      },
      {
        zone: 'Generador Visual "Estilo del QR" y Barra de Enlace `wa.me/...`',
        controls: ['Lienzo QR en vivo (QrPreview)', 'Botones de Estilo del QR: Clásico · Moderno', 'Casilla: Icono de chat al centro', 'Barra de salida: Tu enlace generado (wa.me/...)', 'Botones: Copiar · Compartir · Descargar QR (PNG)'],
        description: 'Permite alternar entre módulos cuadrados clásicos o puntos redondeados modernos, incrustar el ícono de chat en el centro del QR, copiar el link corto o descargar el PNG en alta resolución.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Selecciona "PE +51" e ingresa tu número de WhatsApp Business',
        uiTarget: 'Selector de país → Opción "PE +51" → Campo "Número de WhatsApp"',
        instruction: 'Despliega la lista de países, elige "PE +51" (Perú) y escribe los 9 dígitos de tu celular en el campo "Número de WhatsApp" (por ejemplo, 987654321) sin volver a escribir el 51 ni agregar espacios.',
        whatHappens: 'El lienzo de la derecha se activa de inmediato y reemplaza el aviso "Ingresa un número válido" por tu código QR generado en vivo.'
      },
      {
        stepTitle: 'Redacta tu "Mensaje predefinido" cuidando el contador 0 / 600',
        uiTarget: 'Campo "Mensaje predefinido" + Contador "Longitud óptima (0 / 600)"',
        instruction: 'Escribe el texto exacto que quieres recibir cuando el cliente escanee el QR (ej. "Hola, vi el QR en su local de Miraflores y deseo consultar el catálogo y precios"). Mantén el texto por debajo de los 180 caracteres para máxima velocidad de lectura del escáner.',
        whatHappens: 'La "Vista previa del mensaje" actualiza la burbuja verde de WhatsApp en tiempo real y el enlace `wa.me/...` codifica automáticamente espacios y tildes en formato URL (`%20`, `%C3%A1`).'
      },
      {
        stepTitle: 'Agrega etiquetas de origen en "Parámetros de rastreo (UTM)"',
        uiTarget: 'Botón "Parámetros de rastreo (UTM)" → Campos utm_source, utm_medium y utm_campaign',
        instruction: 'Haz clic en el botón "Parámetros de rastreo (UTM)" para desplegar los campos avanzados. Completa por ejemplo `utm_source = empaque_delivery`, `utm_medium = qr` y `utm_campaign = recompra_octubre`.',
        whatHappens: 'Las etiquetas UTM se concatenan automáticamente al enlace de WhatsApp para que tu equipo de ventas identifique al instante qué canal físico o digital originó el contacto.'
      },
      {
        stepTitle: 'Personaliza el "Estilo del QR" y activa el "Icono de chat al centro"',
        uiTarget: 'Sección "Estilo del QR" → Botones "Clásico" / "Moderno" + "Icono de chat al centro"',
        instruction: 'Elige entre el acabado "Clásico" (módulos rectos de alto contraste para impresoras térmicas o stickers pequeños) o "Moderno" (puntos estilizados para acrílicos de mostrador y cartas), y activa el botón "Icono de chat al centro".',
        whatHappens: 'El generador aplica corrección de errores Reed-Solomon para reservar el área central e incrusta el emblema de chat sin que el QR pierda legibilidad.'
      },
      {
        stepTitle: 'Copia tu enlace `wa.me` y descarga el archivo PNG para imprenta',
        uiTarget: 'Botones "Copiar", "Compartir" y "Descargar QR (PNG)"',
        instruction: 'Haz clic en "Copiar" para pegar el enlace `wa.me/...` en tu biografía de Instagram, TikTok o Google Maps, y pulsa "Descargar QR (PNG)" para guardar la matriz gráfica lista para impresión.',
        whatHappens: 'Obtienes tanto el link directo como el archivo gráfico PNG procesado 100% en tu navegador, sin intermediarios ni caducidad.'
      }
    ],
    formulas: [
      {
        title: '1. Construcción Estándar del Enlace Directo WhatsApp (RFC 3986 + E.164)',
        expression: 'URL Final = https://wa.me/{PrefijoPaís}{Número}?text={Mensaje_URL_Encoded}',
        variables: [
          'PrefijoPaís: Código numérico internacional sin "+" ni ceros iniciales (51 para Perú).',
          'Número: 9 dígitos del móvil sin espacios ni guiones.',
          'Mensaje_URL_Encoded: Cadena codificada en UTF-8 donde el espacio es %20.'
        ],
        explanation: 'Cualquier carácter especial sin codificar (espacios, signos de interrogación o tildes) trunca el parámetro `text=` en navegadores móviles; la herramienta aplica `encodeURIComponent` automáticamente.'
      },
      {
        title: '2. Tamaño Mínimo de Impresión según Distancia de Escaneo',
        expression: 'Lado Mínimo del QR (cm) = Distancia Máxima de Escaneo (cm) ÷ 10   (con Zona Silenciosa ≥ 4 módulos)',
        variables: [
          'Lado Mínimo del QR: Ancho y alto del código impreso en centímetros (mínimo absoluto recomendado: 2.5 cm × 2.5 cm).',
          'Distancia Máxima de Escaneo: Distancia desde la cual el cliente apunta con la cámara de su teléfono.'
        ],
        explanation: 'Si colocas el QR en una mesa o empaque (lectura a 25 cm), mide al menos 2.5 × 2.5 cm; si lo colocas en un letrero de fachada o vitrina para escanear a 1.5 metros (150 cm), debe medir como mínimo 15 × 15 cm.'
      },
      {
        title: '3. Capacidad de Recuperación Reed-Solomon con Icono Central',
        expression: 'Tolerancia de Daño Nivel H = hasta 30% de los módulos restaurables matemáticamente',
        variables: [
          'Nivel L (7%), Nivel M (15%), Nivel Q (25%), Nivel H (30%).'
        ],
        explanation: 'Cuando activas el botón "Icono de chat al centro", el algoritmo eleva la redundancia matemática para que los lectores de iOS y Android reconstruyan sin error la zona central cubierta por el ícono.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Creación de QR con mensaje predefinido y UTM para bolsas de delivery de un restaurante en Miraflores',
      context: 'Una sanguchería en Miraflores quiere imprimir un código QR en sus bolsas de papel para que los clientes que pidieron por aplicativos hagan su siguiente pedido directamente por WhatsApp con un 10% de descuento.',
      inputs: [
        { field: 'Código de país / Número de WhatsApp', value: 'PE +51 / 987654321' },
        { field: 'Mensaje predefinido', value: 'Hola, escaneé el QR de mi bolsa de delivery y quiero pedir con 10% de descuento' },
        { field: 'Parámetros UTM (source / medium / campaign)', value: 'bolsa_kraft / qr_impreso / recompra_directa' },
        { field: 'Estilo del QR', value: 'Moderno + Icono de chat al centro' }
      ],
      calculationSteps: [
        'Paso 1 (Formateo E.164): Prefijo PE (+51) + 987654321 → 51987654321.',
        'Paso 2 (Longitud del mensaje): 79 caracteres de 600 ("Longitud óptima", matriz QR limpia y de baja densidad).',
        'Paso 3 (Concatenación URL + UTM): Se genera la cadena wa.me/51987654321?text=Hola%2C%20escane%C3%A9... junto con el bloque de rastreo.',
        'Paso 4 (Dimensionado para imprenta): Para lectura en mano a 25 cm de distancia, se define un recuadro de 3.0 cm × 3.0 cm con borde blanco libre.'
      ],
      outputs: [
        { label: 'Tu enlace generado', value: 'https://wa.me/51987654321?text=Hola%2C%20escane%C3%A9...', note: 'Listo para copiar y pegar en redes o botones web' },
        { label: 'Diagnóstico de longitud', value: '79 / 600 (Longitud óptima)', note: 'Escaneo instantáneo incluso en cámaras de gama de entrada' },
        { label: 'Archivo descargable', value: 'PNG con estilo Moderno + Icono central', note: 'Código estático permanente que nunca caduca' }
      ],
      decision: 'Al diferenciar el mensaje predefinido y los parámetros UTM de la bolsa frente al QR del mostrador, el restaurante mide exactamente cuántos pedidos directos semanales provienen del empaque.'
    },
    dailyUseCases: [
      {
        title: 'Acrílicos de mostrador para pedidos, catálogo o reservas',
        role: 'Restaurantes, cafeterías, barberías, clínicas dentales y spas',
        workflow: 'Crea un QR con estilo "Moderno" e "Icono de chat al centro" cuyo mensaje diga "Hola, estoy en el local y deseo ver la carta / reservar turno", descárgalo en PNG e imprímelo en habladores de mesa.'
      },
      {
        title: 'Stickers de recompra y soporte técnico en productos o equipos',
        role: 'Servicios técnicos de refrigeración, aire acondicionado, laptops e imprentas',
        workflow: 'Pega en cada equipo reparado o entregado un sticker QR con el mensaje "Hola, necesito mantenimiento / reposición para mi equipo" para asegurarte de que el cliente te vuelva a llamar a ti.'
      },
      {
        title: 'Medición de volantes y paneles publicitarios por distrito',
        role: 'Academias, gimnasios, inmobiliarias y talleres locales',
        workflow: 'Genera un QR distinto para cada lote de volantes cambiando `utm_campaign` (ej. `volante_lince` vs `volante_jesus_maria`) para saber qué esquina o distrito genera clientes reales.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Escribir el "+51" dentro del campo "Número de WhatsApp" cuando ya elegiste "PE +51" en el selector de país.',
        correction: 'Eso duplicaría el prefijo (`5151987...`) e impediría que WhatsApp encuentre tu cuenta. Selecciona "PE +51" en la lista e ingresa únicamente los 9 dígitos de tu celular.'
      },
      {
        mistake: 'Escribir un testamento de 500 caracteres en "Mensaje predefinido" para un QR que irá impreso en una tarjeta pequeña de 2 cm.',
        correction: 'Cuanto más largo es el texto, más pequeños se vuelven los puntos del QR. Para impresiones pequeñas mantén el contador por debajo de 120–150 caracteres.'
      },
      {
        mistake: 'Imprimir mil folletos sin haber probado antes el código descargado con al menos dos celulares distintos (Android y iPhone).',
        correction: 'Antes de enviar el PNG a la imprenta, escanéalo desde la pantalla y en una prueba impresa a tamaño real para confirmar que abre tu chat con el mensaje correcto.'
      }
    ],
    faqs: [
      {
        q: '¿Los códigos QR creados en esta herramienta caducan o tienen límite de escaneos?',
        a: 'Nunca caducan ni tienen límite de escaneos. Son códigos QR directos (estáticos) que codifican directamente tu enlace `wa.me`, sin pasar por acortadores de terceros que luego cobran suscripción.'
      },
      {
        q: '¿Qué pasa si cambio el texto del mensaje después de haber impreso mi código QR?',
        a: 'En un código QR directo la información está grabada en el propio dibujo de puntos. Si deseas cambiar el número o el mensaje predefinido para futuras impresiones, debes generar y descargar un nuevo PNG.'
      },
      {
        q: '¿Funciona igual con WhatsApp normal y con WhatsApp Business?',
        a: 'Sí. El protocolo oficial `wa.me` abre automáticamente la aplicación de WhatsApp que tenga instalada el cliente y dirige el mensaje a tu cuenta (sea WhatsApp personal o WhatsApp Business).'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'imprentas', label: 'Imprentas en Lima', reason: 'Para imprimir tus códigos QR en tarjetas de presentación, stickers adhesivos, cajas y flyers promocionales.' },
      { slug: 'impresion-gran-formato', label: 'Impresión en Gran Formato en Lima', reason: 'Para gigantografías, banners roll-screen y vinilos de vitrina con QR escaneables a distancia.' },
      { slug: 'letreros-y-senaletica', label: 'Letreros y Señalética en Lima', reason: 'Para fabricar habladores de mesa en acrílico o PVC con tu código QR de WhatsApp y pagos.' },
      { slug: 'envases-y-embalajes', label: 'Envases y Embalajes en Lima', reason: 'Para personalizar tus bolsas kraft y cajas de delivery con el QR de recompra directa.' }
    ],
    relatedToolSlugs: ['creador-facturas-proforma', 'generador-cotizaciones', 'crm-pymes']
  },
  {
    slug: 'calculadora-flete-envio-local',
    name: 'Calculadora de Flete y Envío Local',
    appTitle: 'Calculadora de Flete y Envío Local · Cotización y Manifiesto de Despacho',
    categoryId: 'operaciones',
    categoryTitle: 'Operaciones, Ventas y Logística',
    badge: 'Logística / Delivery',
    url: 'https://nubeparapymes.online/herramientas/operaciones/calculadora-flete-envio-local/',
    shortDesc: 'Estima costos de reparto urbano en Lima Metropolitana según distancia, peso volumétrico, paradas y consumo de combustible para tu flota o motorizados.',
    heroSubtitle: 'Tutorial paso a paso para cotizar despachos urbanos: cálculo de peso volumétrico vs. peso real, sugerencia de vehículo (Moto, Van o Camión), rutas de hasta 5 paradas con mapa zonal y emisión de etiqueta térmica con QR.',
    purpose: 'Cobrar una tarifa plana de delivery al ojo en Lima suele hacer que el comercio pierda dinero cuando el paquete es voluminoso o cuando la ruta incluye múltiples distritos. Esta aplicación calcula simultáneamente el peso real y el peso volumétrico de la carga, sugiere automáticamente el vehículo adecuado (`Moto`, `Van` o `Camión`), permite armar rutas de hasta 5 paradas seleccionando zonas en un mapa interactivo (`Centro`, `Zona Norte`, `Zona Sur`, `Periferia`), compara el costo de `Envío Estándar` frente a `Envío Express` aplicando descuento multiparada y genera un `Manifiesto de envío` optimizado para impresoras térmicas con código QR.',
    interfaceMap: [
      {
        zone: 'Panel Superior de Estadísticas Operativas',
        controls: ['Indicador: Total cotizado (y número de cotizaciones)', 'Indicador: Zona más usada', 'Indicador: Ticket promedio (Base tarifa estándar)'],
        description: 'Resume métricas históricas de los despachos que has guardado en tu navegador para conocer tu costo medio por ruta y la zona de mayor demanda.'
      },
      {
        zone: 'Bloque "Datos del paquete" y Selector "Vehículo sugerido"',
        controls: ['Campos dimensionales: Largo (cm) · Ancho (cm) · Alto (cm)', 'Campo: Peso real (kg)', 'Tarjetas de Vehículo sugerido: Moto (Hasta 5 kg · Base) · Van (Hasta 150 kg · recargo base) · Camión (Cargas pesadas)'],
        description: 'Al ingresar las medidas y el peso en báscula, la herramienta calcula el peso volumétrico, determina el "Peso cobrable" (avisando si se cobra por volumen) y resalta el vehículo necesario.'
      },
      {
        zone: 'Planificador "Paradas de la ruta (1/5)" y Mapa Zonal Interactivo',
        controls: ['Contador de ruta: 1/5 paradas', 'Botón: Agregar parada (hasta 5 destinos) / Eliminar parada', 'Mapa interactivo por zonas: Centro (factor ×1) · Zona Norte · Zona Sur · Periferia', 'Campo por parada: Dirección parada'],
        description: 'Permite seleccionar cada parada de la lista y tocar su zona de destino directamente en el mapa para aplicar el multiplicador de distancia correspondiente y calcular el ahorro por ruta multiparada.'
      },
      {
        zone: 'Panel "Cotización de ruta": Estándar vs. Express y Ahorro Multiparada',
        controls: ['Resumen: Medidas · Peso volumétrico · Peso cobrable · Vehículo', 'Tarjetas comparativas: Envío Estándar vs. Envío Express', 'Indicador: Ahorro multiparada incluido', 'Botón: Guardar cotización'],
        description: 'Desglosa el costo final del despacho comparando el servicio regular contra el urgente y muestra cuánto ahorras al consolidar varias entregas en un solo viaje.'
      },
      {
        zone: 'Generador de "Manifiesto de envío" (Etiqueta Térmica con QR) e Historial',
        controls: ['Selector: Parada a etiquetar · Servicio (Estándar / Express)', 'Campos de origen: Nombre del comercio · Dirección de origen', 'Campos de destinatario: Nombre del cliente · Teléfono · Dirección de entrega', 'Vista previa de etiqueta térmica con QR de seguimiento + Botón de impresión', 'Sección: Historial de cotizaciones (con botón Vaciar)'],
        description: 'Genera la etiqueta logística lista para pegar en la caja o entregar al motorizado en formato de impresora térmica con datos de remitente, destinatario, zona, peso cobrable y QR.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Ingresa las dimensiones (Largo, Ancho, Alto) y el Peso real del paquete',
        uiTarget: 'Sección "Datos del paquete" → Campos "Largo", "Ancho", "Alto" y "Peso real"',
        instruction: 'Mide el empaque en centímetros e introduce el "Largo", "Ancho" y "Alto" junto con el "Peso real" en kilogramos sin mezclar unidades.',
        whatHappens: 'La calculadora computa al instante el "Peso volumétrico", lo compara contra el "Peso real" para fijar el "Peso cobrable" y marca automáticamente el "Vehículo sugerido" (`Moto` hasta 5 kg, `Van` hasta 150 kg o `Camión` para carga pesada).'
      },
      {
        stepTitle: 'Configura las paradas de tu ruta (hasta 5) y asigna su zona en el mapa',
        uiTarget: 'Sección "Paradas de la ruta (1/5)" → Botón "Agregar parada" + Mapa de zonas',
        instruction: 'Haz clic en la Parada 1 y toca en el mapa interactivo su zona de destino (`Centro`, `Zona Norte`, `Zona Sur` o `Periferia`). Si el motorizado o van entregará varios pedidos en el mismo viaje, pulsa "Agregar parada" (hasta 5 paradas) y selecciona la zona y dirección de cada una.',
        whatHappens: 'Cada parada adopta el factor multiplicador de su zona geográfica y el motor activa automáticamente el descuento por ruta consolidada ("Ahorro multiparada").'
      },
      {
        stepTitle: 'Compara "Envío Estándar" vs. "Envío Express" y guarda la cotización',
        uiTarget: 'Panel "Cotización de ruta" → Botón "Guardar cotización"',
        instruction: 'Revisa en el panel de resultados si la tarifa se está calculando por peso real o por "Peso volumétrico", compara el total de "Envío Estándar" frente a "Envío Express" y pulsa "Guardar cotización".',
        whatHappens: 'La cotización queda almacenada en el "Historial de cotizaciones" inferior y actualiza las 3 tarjetas superiores ("Total cotizado", "Zona más usada" y "Ticket promedio").'
      },
      {
        stepTitle: 'Completa los datos del cliente y genera el "Manifiesto de envío" térmico',
        uiTarget: 'Sección "Manifiesto de envío" → Campos de comercio y destinatario',
        instruction: 'Elige la "Parada a etiquetar" y el tipo de "Servicio", escribe el "Nombre del comercio" y "Dirección de origen", y completa el "Nombre del cliente", "Teléfono" y "Dirección de entrega".',
        whatHappens: 'Se renderiza en vivo la etiqueta en formato optimizado para impresoras térmicas (con zona, peso cobrable y código QR de seguimiento) lista para imprimir y pegar en el paquete.'
      }
    ],
    formulas: [
      {
        title: '1. Peso Volumétrico y Determinación del Peso Cobrable',
        expression: 'Peso Volumétrico (kg) = (Largo cm × Ancho cm × Alto cm) ÷ 5,000   |   Peso Cobrable = máx(Peso Real, Peso Volumétrico)',
        variables: [
          'Largo, Ancho, Alto: Dimensiones externas de la caja o bulto en centímetros.',
          '5,000: Factor divisor estándar de mensajería y courier terrestre/urbano.',
          'Peso Cobrable: El mayor valor entre lo que marca la balanza y el volumen que ocupa en la maletera o furgón.'
        ],
        explanation: 'Una caja grande de envases plásticos o arreglos florales puede pesar solo 2 kg en balanza pero ocupar 12 kg de espacio volumétrico en la moto; cobrar por Peso Cobrable evita subsidiar fletes voluminosos.'
      },
      {
        title: '2. Selección Automática de Vehículo por Capacidad',
        expression: 'Peso Cobrable ≤ 5 kg → Moto (Base)   |   5 kg < Peso Cobrable ≤ 150 kg → Van (+Recargo)   |   Peso Cobrable > 150 kg → Camión (+Recargo)',
        variables: [
          'Moto: Paquetería ligera y sobres hasta 5 kg cobrables.',
          'Van: Cajas medianas, equipamiento o pedidos consolidados hasta 150 kg.',
          'Camión: Mercadería paletizada, mobiliario o cargas mayores a 150 kg.'
        ],
        explanation: 'Evita asignar a un motorizado un bulto que excede las dimensiones o peso seguro de una caja de reparto estándar.'
      },
      {
        title: '3. Costo de Ruta con Factor Zonal y Descuento Multiparada',
        expression: 'Total Ruta = [ Tarifa Base Vehículo + (Peso Cobrable × Costo/kg) + Σ (Tarifa Parada_i × Factor Zona_i) ] − Descuento Multiparada',
        variables: [
          'Factor Zona_i: Multiplicador según distancia (Centro ×1, Zona Norte, Zona Sur, Periferia).',
          'Descuento Multiparada: Reducción progresiva aplicada a partir de la 2.ª parada consolidada en el mismo despacho.'
        ],
        explanation: 'Agrupar entre 2 y 5 entregas hacia un mismo eje de Lima diluye el costo fijo de salida del vehículo y reduce el costo logístico unitario por pedido.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Despacho de una caja voluminosa con 2 paradas en Lima (Centro y Zona Sur)',
      context: 'Una tienda de artículos de decoración envía una caja de lámparas de 50 cm × 40 cm × 30 cm que pesa 4.0 kg en balanza, en una ruta con 2 paradas (Parada 1 en Centro y Parada 2 en Zona Sur).',
      inputs: [
        { field: 'Largo × Ancho × Alto', value: '50 cm × 40 cm × 30 cm' },
        { field: 'Peso real en balanza', value: '4.0 kg' },
        { field: 'Paradas configuradas', value: '2 paradas (Parada 1: Centro · Parada 2: Zona Sur)' }
      ],
      calculationSteps: [
        'Paso 1 (Cálculo de Peso Volumétrico): (50 × 40 × 30) ÷ 5,000 = 60,000 ÷ 5,000 = 12.0 kg volumétricos.',
        'Paso 2 (Determinación de Peso Cobrable): máx(4.0 kg real, 12.0 kg volumétrico) = 12.0 kg ("Se cobra por peso volumétrico").',
        'Paso 3 (Vehículo sugerido): Al superar los 5 kg de capacidad de Moto, el sistema sugiere pasar a "Van (Hasta 150 kg)".',
        'Paso 4 (Cálculo de ruta y ahorro multiparada): Se suman los tramos de Centro y Zona Sur aplicando el "Ahorro multiparada" y se emite el Manifiesto de envío para cada destinatario.'
      ],
      outputs: [
        { label: 'Peso volumétrico vs. Peso cobrable', value: '12.0 kg cobrables', note: 'Supera los 4.0 kg de peso real por tamaño de la caja' },
        { label: 'Vehículo sugerido', value: 'Van (Hasta 150 kg)', note: 'Por exceder el tope volumétrico de 5 kg de Moto' },
        { label: 'Manifiesto de envío', value: 'Etiqueta térmica con QR', note: 'Lista para imprimir por cada una de las 2 paradas' }
      ],
      decision: 'Si el comercio hubiera cotizado el envío guiándose solo por los 4 kg de peso real como tarifa de moto, habría tenido que asumir de su bolsillo la diferencia por enviar una caja de 60 litros en furgoneta.'
    },
    dailyUseCases: [
      {
        title: 'Cotización inmediata de delivery antes de cerrar la venta por WhatsApp',
        role: 'Tiendas online, pastelerías, florerías y comercios de equipamiento',
        workflow: 'Introduce las medidas de la caja mientras conversas con el cliente, verifica en 5 segundos el costo de "Envío Estándar" vs "Envío Express" según su zona y comunícale el flete exacto antes de emitir la proforma.'
      },
      {
        title: 'Consolidación de rutas de reparto matutinas y vespertinas (hasta 5 paradas)',
        role: 'Distribuidoras, imprentas, ferreterías y dark kitchens',
        workflow: 'Agrupa hasta 5 pedidos del mismo cono de Lima usando el botón "Agregar parada" para aprovechar el "Ahorro multiparada" y reducir el flete promedio por cliente.'
      },
      {
        title: 'Impresión de etiquetas térmicas estandarizadas para motorizados',
        role: 'Almacenes de despacho y encargados de logística',
        workflow: 'Completa el bloque "Manifiesto de envío" para cada parada e imprime la etiqueta térmica con QR evitando pérdidas de paquetes por direcciones escritas a mano.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Ingresar las medidas del producto suelto en lugar de las medidas externas de la caja embalada.',
        correction: 'Mide siempre la caja final con protección o burbuja incluida, ya que unos centímetros adicionales pueden hacer que el "Peso volumétrico" supere el umbral de Moto (5 kg) a Van.'
      },
      {
        mistake: 'Olvidar hacer clic sobre la zona del mapa para cada nueva parada agregada.',
        correction: 'Cuando pulses "Agregar parada", selecciona la nueva parada en la lista y toca su zona correspondiente en el mapa (`Centro`, `Zona Norte`, `Zona Sur` o `Periferia`) para que tome el factor correcto.'
      },
      {
        mistake: 'No guardar las cotizaciones confirmadas con el botón "Guardar cotización".',
        correction: 'Guardar cada despacho alimenta los indicadores superiores ("Total cotizado", "Zona más usada" y "Ticket promedio"), lo que te permite negociar mejores tarifas fijas con tu empresa de courier.'
      }
    ],
    faqs: [
      {
        q: '¿Por qué la calculadora me dice "Se cobra por peso volumétrico" si mi paquete pesa poco?',
        a: 'En logística urbana el espacio del vehículo es tan limitado como el peso que soporta. Si el resultado de (Largo × Ancho × Alto) ÷ 5,000 es mayor que el peso en balanza, rige el peso volumétrico como "Peso cobrable".'
      },
      {
        q: '¿Cuántas paradas puedo incluir como máximo en una misma simulación?',
        a: 'El planificador admite hasta 5 paradas por ruta ("1/5"), permitiéndote asignar una zona y dirección distinta a cada parada y emitir su etiqueta individual en el "Manifiesto de envío".'
      },
      {
        q: '¿Necesito una impresora especial para usar el Manifiesto de envío?',
        a: 'El diseño está optimizado para impresoras térmicas de etiquetas (4×6 pulgadas o 80 mm), pero también puedes imprimirlo en cualquier impresora láser o de tinta convencional en papel común o adhesivo.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'courier-y-mensajeria', label: 'Courier y Mensajería en Lima', reason: 'Para contratar operadores de última milla y flotas de motorizados cuando tus envíos superen tu capacidad propia.' },
      { slug: 'mudanzas', label: 'Empresas de Mudanzas y Transporte en Lima', reason: 'Cuando el "Vehículo sugerido" de la calculadora sea Van o Camión por superar los 150 kg de peso cobrable.' },
      { slug: 'envases-y-embalajes', label: 'Envases y Embalajes en Lima', reason: 'Para adquirir cajas troqueladas a la medida exacta de tus productos y reducir el peso volumétrico facturado.' },
      { slug: 'florerias', label: 'Florerías y Regalos en Lima', reason: 'Rubro donde la optimización de rutas multiparada y el control de envíos Express determinan la rentabilidad diaria.' }
    ],
    relatedToolSlugs: ['calculadora-precios-venta-igv', 'creador-facturas-proforma', 'generador-codigos-qr']
  },
  {
    slug: 'creador-facturas-proforma',
    name: 'Creador de Facturas Proforma',
    appTitle: 'Creador de Facturas Proforma · Recibo No Fiscal · CRM · Catálogo',
    categoryId: 'operaciones',
    categoryTitle: 'Operaciones, Ventas y Logística',
    badge: 'Facturación / Ventas',
    url: 'https://nubeparapymes.online/herramientas/ventas/creador-facturas-proforma/',
    shortDesc: 'Emite proformas comerciales limpias y detalladas en segundos para enviar por correo o WhatsApp antes de emitir el comprobante electrónico en SUNAT.',
    heroSubtitle: 'Tutorial paso a paso para usar el Creador de Facturas Proforma: catálogo autocompletable, conversor bimoneda en vivo, código QR de pago rápido (Yape, Plin o PayPal), marca de agua y descarga en PDF.',
    purpose: 'Emitir una Factura Electrónica en SUNAT antes de que el cliente confirme el pago te obliga a declarar y pagar el IGV aunque el cliente nunca cancele o pida cambios. El Creador de Facturas Proforma te permite generar una pre-factura comercial impecable ("Documento no fiscal · Proforma sin valor tributario") con tu logotipo, base local de clientes frecuentes, catálogo de productos pre-guardados, conversión simultánea a una segunda moneda, código QR de pago rápido (`Yape`, `Plín` o `PayPal`) incrustado en el documento y exportación instantánea a PDF.',
    interfaceMap: [
      {
        zone: 'Barra Superior de Gestión (CRM, Catálogo, Historial y Respaldo)',
        controls: ['Botón: Nueva (limpia el documento actual)', 'Botón: Guardar (registra la proforma en el historial)', 'Botón: Historial (métricas de proformas y tasa de éxito)', 'Botón: Clientes (base local de clientes frecuentes)', 'Botón: Catálogo (productos pre-guardados con precio)', 'Botón: Respaldo (exporta o restaura todo en JSON)'],
        description: 'Convierte la herramienta en un sistema completo de pre-facturación donde no tienes que volver a digitar los datos de tus clientes ni los precios de tus productos en cada venta.'
      },
      {
        zone: 'Paneles "Datos del Emisor" y "Datos del Cliente"',
        controls: ['Emisor: Botón "Subir Logotipo" · Nombre / Empresa · RUC / Identificación · Teléfono · Correo · Dirección', 'Cliente: Buscador "Cliente (busca en frecuentes)" · Botón "Guardar" · RUC / Identificación · Dirección'],
        description: 'Configura por única vez los datos y el logo de tu empresa y permite autocompletar en un clic los datos de cualquier cliente recurrente.'
      },
      {
        zone: 'Paneles "Detalles del Documento" y "Conversor de Divisas"',
        controls: ['Detalles: N.º de Proforma (ej. 0001) · Fecha · Moneda ($ Dólar, € Euro, S/ Sol) · Impuesto (%)', 'Conversor de Divisas: Segunda moneda (Sin conversión, $ Dólar, € Euro, S/ Sol) · Tipo de cambio (1 $ = ?)'],
        description: 'Define la moneda principal de la proforma y, si lo deseas, muestra al pie del documento la equivalencia exacta del total en una segunda moneda según el tipo de cambio del día.'
      },
      {
        zone: 'Tabla "Elementos" con Autocompletado de Catálogo',
        controls: ['Columnas: Concepto (busca en catálogo) · Cantidad · P. Unitario · Total parcial', 'Acciones por fila: Botón "Guardar en catálogo" · Eliminar ítem', 'Botón inferior: Agregar fila'],
        description: 'Calcula los subtotales de cada línea en tiempo real y te permite guardar cualquier ítem nuevo en tu "Catálogo" con un clic para reutilizarlo en futuras proformas.'
      },
      {
        zone: 'Módulo "Pago rápido (Código QR)", "Diseño de Plantilla" y Vista Previa A4',
        controls: ['Selector Método de pago: PayPal · Yape · Plín · Otro', 'Campo: Enlace de PayPal o número (Yape/Plin)', 'Selector Diseño de Plantilla: Minimalista (Cabecera azul oscuro) · Corporativo (Tabla de dos colores)', 'Control: Marca de agua (semitransparente en el PDF) → Botón "Subir imagen"', 'Campo: Notas', 'Botones finales: Descargar PDF · Descargar'],
        description: 'Incrusta un código QR escaneable de Yape, Plin o PayPal dentro del PDF, aplica tu marca de agua corporativa y genera el documento final listo para enviar por WhatsApp.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Configura los "Datos del Emisor", sube tu logotipo y selecciona al cliente',
        uiTarget: 'Sección "Datos del Emisor" → "Subir Logotipo" + Sección "Datos del Cliente"',
        instruction: 'Haz clic en "Subir Logotipo" para cargar el emblema de tu negocio y completa tu Nombre/Empresa, RUC, Teléfono, Correo y Dirección. Luego escribe los datos del comprador en "Datos del Cliente" y pulsa el botón "Guardar" de esa sección para que quede registrado en tus clientes frecuentes.',
        whatHappens: 'La vista previa del documento a la derecha incorpora tu logotipo y datos fiscales, y el cliente queda disponible en el autocompletado para próximas ventas.'
      },
      {
        stepTitle: 'Elige la moneda ("S/ Sol"), el impuesto (18%) y activa el "Conversor de Divisas" si vendes bimoneda',
        uiTarget: 'Sección "Detalles del Documento" → Selector "Moneda" + Sección "Conversor de Divisas"',
        instruction: 'En "Detalles del Documento", verifica el "N.º de Proforma", selecciona "S/ Sol" (o "$ Dólar") en "Moneda" y coloca 18 en "Impuesto (%)". Si tu cliente necesita ver el equivalente en otra divisa, elige la "Segunda moneda" en "Conversor de Divisas" e ingresa el "Tipo de cambio".',
        whatHappens: 'Todos los importes de la tabla adoptan tu moneda principal y la hoja añade una línea informativa con el TOTAL convertido a la segunda moneda.'
      },
      {
        stepTitle: 'Agrega los productos en "Elementos" y guárdalos en tu Catálogo local',
        uiTarget: 'Sección "Elementos" → "Concepto", "Cantidad", "P. Unitario" → Botón "Agregar fila"',
        instruction: 'Escribe el nombre del producto o servicio en "Concepto" (si ya lo tenías guardado, selecciónalo del autocompletado), define la "Cantidad" (mayor a cero) y el "P. Unitario". Pulsa el ícono de guardar en la fila para sumarlo a tu "Catálogo" y usa "Agregar fila" para añadir más ítems.',
        whatHappens: 'La tabla calcula el "Total parcial" de cada fila, suma la base imponible, aplica el porcentaje de impuesto configurado y actualiza el "Total de la factura".'
      },
      {
        stepTitle: 'Activa el "Pago rápido (Código QR)" con Yape, Plin o PayPal',
        uiTarget: 'Sección "Pago rápido (Código QR)" → Selector "Método de pago" → Campo de número/enlace',
        instruction: 'Despliega "Método de pago", elige "Yape", "Plín" o "PayPal" e introduce tu número de celular afiliado o tu enlace de cobro.',
        whatHappens: 'La herramienta genera e incrusta automáticamente un código QR de pago dentro de la proforma para que el cliente pueda abonar apenas abra el documento.'
      },
      {
        stepTitle: 'Elige la plantilla ("Minimalista" o "Corporativo"), guarda en Historial y descarga el PDF',
        uiTarget: 'Sección "Diseño de Plantilla" → Botones "Guardar", "Descargar PDF" y "Respaldo"',
        instruction: 'Selecciona el estilo "Minimalista" (cabecera azul oscuro) o "Corporativo" (tabla de dos colores), sube opcionalmente una "Marca de agua (semitransparente en el PDF)", escribe las condiciones en "Notas", pulsa "Guardar" en la barra superior y haz clic en "Descargar PDF".',
        whatHappens: 'Se descarga el archivo `Proforma-0001.pdf` con leyenda no fiscal y la operación queda registrada en tu botón "Historial" para medir tu tasa de cierre.'
      }
    ],
    formulas: [
      {
        title: '1. Cálculo de Subtotales por Línea, Impuesto y Total de la Proforma',
        expression: 'Total Parcial_i = Cantidad_i × P. Unitario_i   |   Subtotal = Σ Total Parcial_i   |   Impuesto = Subtotal × (Tasa% ÷ 100)   |   Total = Subtotal + Impuesto',
        variables: [
          'Cantidad_i: Unidades cotizadas del ítem i (debe ser > 0).',
          'P. Unitario_i: Valor unitario sin impuesto.',
          'Tasa%: Porcentaje ingresado en el campo "Impuesto (%)" (18% para IGV en Perú).'
        ],
        explanation: 'Al separar el Subtotal (Total parcial acumulado) del Impuesto, las empresas clientes que tributan en Régimen MYPE o General conocen de antemano cuánto será su costo neto y cuánto su crédito fiscal.'
      },
      {
        title: '2. Conversión Simultánea a Segunda Moneda (Conversor de Divisas)',
        expression: 'Si Moneda Base = $ y 2.ª Moneda = S/ → Total (S/) = Total ($) × TC   |   Si Moneda Base = S/ y 2.ª Moneda = $ → Total ($) = Total (S/) ÷ TC',
        variables: [
          'TC: Valor ingresado en el campo "Tipo de cambio (1 $ = ?)".',
          'Total (Segunda Moneda): Importe informativo impreso al pie de la proforma.'
        ],
        explanation: 'Muy útil en Lima para importadores de tecnología, maquinaria o insumos que fijan precios base en dólares pero reciben transferencias o Yape/Plin en soles.'
      },
      {
        title: '3. Tasa de Éxito Comercial en el Módulo "Historial"',
        expression: 'Tasa de Éxito (%) = (Proformas Aprobadas / Pagadas ÷ Total de Proformas Guardadas) × 100',
        variables: [
          'Proformas Guardadas: Documentos almacenados con el botón "Guardar" de la barra superior.'
        ],
        explanation: 'Te permite medir qué porcentaje de los pedidos pre-liquidados se convierten efectivamente en ventas cobradas y facturadas en SUNAT.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Emisión de Proforma N.º 0042 en Soles con equivalente en Dólares y QR de Yape para una tienda de cómputo',
      context: 'Un negocio de soporte y venta de equipos en Wilson (Cercado de Lima) prepara una proforma para un estudio contable por 2 monitores profesionales y 1 servicio de instalación, incluyendo su QR de pago por Yape.',
      inputs: [
        { field: 'N.º de Proforma / Moneda / Impuesto (%)', value: '0042 / S/ Sol / 18 %' },
        { field: 'Conversor de Divisas (Segunda moneda / TC)', value: '$ Dólar / TC: 3.75' },
        { field: 'Ítem 1 (Cantidad × P. Unitario)', value: '2 × Monitor IPS 27" a S/ 650.00 c/u = S/ 1,300.00' },
        { field: 'Ítem 2 (Cantidad × P. Unitario)', value: '1 × Instalación y cableado en oficina = S/ 200.00' },
        { field: 'Pago rápido (Código QR) / Plantilla', value: 'Yape (999888777) / Diseño Corporativo' }
      ],
      calculationSteps: [
        'Paso 1 (Total parcial / Subtotal sin IGV): S/ 1,300.00 + S/ 200.00 = S/ 1,500.00.',
        'Paso 2 (Impuesto 18%): S/ 1,500.00 × 0.18 = S/ 270.00.',
        'Paso 3 (Total de la proforma en Soles): S/ 1,500.00 + S/ 270.00 = S/ 1,770.00.',
        'Paso 4 (Conversión automática a 2.ª moneda): S/ 1,770.00 ÷ 3.75 = $ 472.00 exhibidos como referencia bimoneda.'
      ],
      outputs: [
        { label: 'Total parcial (Subtotal)', value: 'S/ 1,500.00', note: 'Suma de los 2 elementos del catálogo' },
        { label: 'Impuesto (18%)', value: 'S/ 270.00', note: 'IGV calculado sobre el total parcial' },
        { label: 'Total de la factura proforma', value: 'S/ 1,770.00 (Ref: $ 472.00)', note: 'Con QR de Yape incrustado en el PDF descargado' }
      ],
      decision: 'El cliente aprueba el desglose, escanea el QR de Yape en el mismo PDF para abonar el adelanto y recién con el dinero en cuenta el comercio emite la Factura Electrónica definitiva en SUNAT.'
    },
    dailyUseCases: [
      {
        title: 'Pre-liquidación de pedidos por WhatsApp antes de emitir comprobante SUNAT',
        role: 'Comercios de tecnología, repuestos, ferreterías e imprentas',
        workflow: 'Busca al comprador en "Clientes", selecciona los productos desde "Catálogo", activa tu QR de Yape o Plin y envíale el PDF para que valide cantidades y RUC antes de facturar.'
      },
      {
        title: 'Ventas en dólares con cobro en soles al tipo de cambio del día',
        role: 'Importadores, agencias de viajes y proveedores de equipamiento',
        workflow: 'Configura "$ Dólar" como moneda principal y "S/ Sol" como "Segunda moneda" en el "Conversor de Divisas" para que el cliente vea ambos montos sin usar calculadoras externas.'
      },
      {
        title: 'Respaldo portable de tu cartera de clientes y lista de precios',
        role: 'Vendedores de mostrador y ejecutivos comerciales',
        workflow: 'Usa el botón "Respaldo" de la barra superior para exportar un único archivo JSON que contiene tus "Clientes", tu "Catálogo" y tu "Historial" de proformas.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Entregar la proforma como si reemplazara a una Boleta o Factura Electrónica una vez cobrado el dinero.',
        correction: 'Como indica el pie del documento ("Documento no fiscal · Proforma sin valor tributario"), la proforma sirve para confirmar el pedido y gestionar el cobro; recibido el pago debes emitir tu comprobante electrónico oficial.'
      },
      {
        mistake: 'Escribir manualmente los mismos productos todos los días sin pulsar el botón de guardar en el Catálogo.',
        correction: 'En la tabla "Elementos", haz clic en el botón "Guardar en catálogo" al lado de cada ítem nuevo; así en la siguiente venta se autocompletará con su precio unitario exacto.'
      },
      {
        mistake: 'Subir un logotipo o marca de agua extremadamente pesado o con bordes vacíos gigantes.',
        correction: 'Optimiza primero tu logo en formato PNG o WebP para que el PDF se genere al instante y la cabecera de la plantilla "Minimalista" o "Corporativo" luzca nítida.'
      }
    ],
    faqs: [
      {
        q: '¿Qué diferencia hay entre el "Creador de Facturas Proforma" y el "Generador de Cotizaciones"?',
        a: 'La Factura Proforma es una pre-liquidación de cobro inmediato para un pedido ya definido: incluye conversor a segunda moneda, código QR de pago directo (Yape, Plin, PayPal) y marca de agua. El Generador de Cotizaciones está enfocado en propuestas comerciales formales con fecha de vencimiento, descuentos por ítem, cálculo de Detracciones SUNAT y botón de aprobación por WhatsApp.'
      },
      {
        q: '¿Cómo funciona el botón "Respaldo" de la barra superior?',
        a: 'Permite descargar en un archivo JSON toda tu base local (clientes frecuentes, catálogo de productos con precios e historial de proformas) o restaurarla en otro navegador con un clic.'
      },
      {
        q: '¿Qué pasa si intento generar el PDF con cantidad 0 o sin concepto?',
        a: 'La herramienta valida automáticamente que exista al menos un ítem con concepto escrito y cantidad mayor a cero antes de exportar el PDF para evitar que envíes documentos en blanco por error.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'reparacion-laptops', label: 'Reparación de Laptops y Cómputo en Lima', reason: 'Para entregar pre-liquidaciones detalladas de repuestos y mano de obra con QR de pago antes de intervenir el equipo.' },
      { slug: 'imprentas', label: 'Imprentas en Lima', reason: 'Para confirmar tirajes, acabados y adelantos del 50% mediante proforma antes de entrar a prensa.' },
      { slug: 'equipos-gastronomicos', label: 'Equipos Gastronómicos en Lima', reason: 'Rubro que cotiza equipamiento en dólares y cierra cobros en soles usando el Conversor de Divisas integrado.' },
      { slug: 'contadores', label: 'Estudios Contables en Lima', reason: 'Para alinear tu flujo de proformas previas con la emisión oportuna de comprobantes electrónicos en el SEE-SOL o OSE.' }
    ],
    relatedToolSlugs: ['generador-cotizaciones', 'calculadora-precios-venta-igv', 'flujo-caja-pymes']
  },
  {
    slug: 'generador-cotizaciones',
    name: 'Generador de Cotizaciones Comerciales',
    appTitle: 'Generador de Cotizaciones · Multimoneda · IGV · Detracciones',
    categoryId: 'operaciones',
    categoryTitle: 'Operaciones, Ventas y Logística',
    badge: 'Ventas B2B / Cierre',
    url: 'https://nubeparapymes.online/herramientas/ventas/generador-cotizaciones/',
    shortDesc: 'Estructura propuestas económicas profesionales y listas para descargar en PDF con tus datos comerciales, desglose de ítems, plazos y condiciones de validez.',
    heroSubtitle: 'Tutorial paso a paso para crear cotizaciones B2B en Soles o Dólares con descuentos por ítem, cálculo de IGV (18%), retención por Detracción SUNAT (SPOT), plantillas Clásica/Moderna y aprobación por WhatsApp.',
    purpose: 'Cuando un cliente corporativo en Lima pide una cotización formal, necesita ver claramente la razón social, el RUC, la fecha de vencimiento de la oferta, los descuentos por volumen de cada partida, el desglose del IGV (18%) y —si es un servicio afecto al SPOT de SUNAT— cuánto corresponde depositar en la cuenta de detracciones del Banco de la Nación. Este Generador de Cotizaciones resuelve todo ese flujo en el navegador, incluye catálogo de ítems, historial y exportación/importación de base de datos.',
    interfaceMap: [
      {
        zone: 'Panel "Datos de la Cotización" (Emisor, Cliente, Vigencia y Moneda)',
        controls: ['Campos del Emisor: Nombre de la Empresa Emisora · RUC / Identificador · Teléfono / WhatsApp · Botón "Subir logotipo"', 'Campos del Cliente: Nombre del Cliente (con botón "Guardar") · Correo del Cliente', 'Metadatos: N.° de Cotización · Fecha de Emisión · Fecha de Vencimiento', 'Divisa: Selector Moneda (Soles S/ · Dólares $) · Tipo de Cambio (S/ por $)', 'Textos comerciales: Condiciones de Pago · Notas al Pie'],
        description: 'Estructura el encabezado formal de la propuesta comercial estableciendo un plazo de vigencia claro ("Emisión / Vencimiento") para protegerte ante variaciones de precios o tipo de cambio.'
      },
      {
        zone: 'Tabla "Ítems / Servicios" con Descuento Porcentual por Fila',
        controls: ['Botón: Agregar Ítem', 'Columnas: Descripción · Cant. · P. Unit. · Desc. % · Total parcial', 'Acciones por ítem: Botón "Guardar en catálogo" · Botón "Eliminar ítem"'],
        description: 'Permite detallar cada producto o servicio aplicando un porcentaje de descuento individual (`Desc. %`) sobre esa línea específica y guardando los servicios frecuentes en tu catálogo local.'
      },
      {
        zone: 'Bloque de Totales, IGV (18%) y Casilla "Aplicar Detracción"',
        controls: ['Indicador: Subtotal general', 'Indicador: IGV (18%)', 'Indicador: Total', 'Casilla interactiva: Aplicar Detracción (con porcentaje SPOT configurable)'],
        description: 'Calcula automáticamente el subtotal neto tras descuentos, suma el 18% de IGV y, al activar "Aplicar Detracción", desglosa el monto exacto que el cliente debe depositar en el Banco de la Nación.'
      },
      {
        zone: 'Selector de Plantilla de PDF, Previsualización en Vivo y Aprobación WhatsApp',
        controls: ['Selector de diseño: Plantilla Clásica · Plantilla Moderna', 'Lienzo: Previsualización en tiempo real de la hoja COTIZACIÓN', 'Acciones de cierre: Descargar PDF · Aprobar vía WhatsApp'],
        description: 'Muestra el documento final en vivo y permite que el cliente o vendedor dispare el mensaje de confirmación ("Hola, quiero aprobar la cotización N.°...") directamente por WhatsApp.'
      },
      {
        zone: 'Paneles "Historial de Cotizaciones" y "Ajustes · Copia de Seguridad"',
        controls: ['Lista: Historial de Cotizaciones generadas', 'Contadores de base local: Clientes · Productos · Cotizaciones', 'Botones de respaldo: Exportar Base de Datos · Importar Base de Datos'],
        description: 'Mantiene el registro de todas las propuestas emitidas y permite respaldar en un archivo tu cartera completa de Clientes, Productos y Cotizaciones.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Completa los datos de tu empresa, RUC, cliente y fechas de vigencia',
        uiTarget: 'Sección "Datos de la Cotización" → Campos Emisor, Cliente, Emisión y Vencimiento',
        instruction: 'Escribe el "Nombre de la Empresa Emisora", tu "RUC / Identificador", tu "Teléfono / WhatsApp" y sube tu logotipo (procesado localmente). Ingresa el "Nombre del Cliente" (pulsa "Guardar" para registrarlo), define el "N.° de Cotización" y establece la "Fecha de Emisión" y la "Fecha de Vencimiento" (ej. 15 días de validez).',
        whatHappens: 'La "Previsualización" de la derecha actualiza al instante el membrete corporativo, el RUC y el rango de validez de la propuesta.'
      },
      {
        stepTitle: 'Configura la moneda ("Soles S/" o "Dólares $") y las Condiciones de Pago',
        uiTarget: 'Selector "Moneda" + Campos "Condiciones de Pago" y "Notas al Pie"',
        instruction: 'Elige "Soles (S/)" o "Dólares ($)" (indicando el "Tipo de Cambio (S/ por $)" si trabajas en moneda extranjera). En "Condiciones de Pago", detalla la forma de abono (ej. "50% de adelanto a la aprobación y 50% contra conformidad del servicio") y en "Notas al Pie" aclara plazos de entrega o garantías.',
        whatHappens: 'Todo el documento adopta la moneda elegida y fija las reglas comerciales al pie de la página para evitar malentendidos.'
      },
      {
        stepTitle: 'Añade las partidas en "Ítems / Servicios" y aplica descuentos por línea si corresponde',
        uiTarget: 'Sección "Ítems / Servicios" → Botón "Agregar Ítem" → Columnas Cant., P. Unit. y Desc. %',
        instruction: 'Haz clic en "Agregar Ítem", describe el servicio o producto, ingresa la cantidad ("Cant."), el precio unitario sin IGV ("P. Unit.") y, si otorgas una rebaja comercial en esa partida, escribe el porcentaje en la columna "Desc. %". Pulsa el ícono de catálogo si deseas dejar ese servicio pre-guardado.',
        whatHappens: 'El motor calcula `Cant. × P. Unit. × (1 − Desc.%/100)` en la columna "Total parcial" y suma todas las filas en "Subtotal general".'
      },
      {
        stepTitle: 'Activa "Aplicar Detracción" cuando cotices servicios sujetos al SPOT de SUNAT',
        uiTarget: 'Casilla "Aplicar Detracción" debajo del Total',
        instruction: 'Si estás cotizando un servicio en Lima cuyo importe total supera los S/ 700.00 (como mantenimiento, fabricación, asesoría, arquitectura, diseño, transporte o limpieza), marca la casilla "Aplicar Detracción" y verifica el porcentaje aplicable (ej. 10% o 12%).',
        whatHappens: 'La cotización muestra de forma transparente cuánto es el IGV (18%), cuál es el Total facturado y cuánto deberá retener y depositar tu cliente en tu cuenta de detracciones del Banco de la Nación.'
      },
      {
        stepTitle: 'Elige "Plantilla Clásica" o "Plantilla Moderna", descarga el PDF y respalda tu base',
        uiTarget: 'Botones "Plantilla Clásica / Plantilla Moderna" → "Descargar PDF" → "Exportar Base de Datos"',
        instruction: 'Alterna entre "Plantilla Clásica" y "Plantilla Moderna" para elegir el acabado visual, descarga el PDF para enviarlo al cliente y, al finalizar tu jornada, pulsa "Exportar Base de Datos" en la sección "Ajustes · Copia de Seguridad".',
        whatHappens: 'La propuesta se archiva en el "Historial de Cotizaciones" y conservas una copia externa de tus clientes, productos y cotizaciones.'
      }
    ],
    formulas: [
      {
        title: '1. Total Parcial por Ítem con Descuento Porcentual y Subtotal General',
        expression: 'Total Parcial_i = Cantidad_i × P. Unitario_i × [ 1 − (Desc.%_i ÷ 100) ]   |   Subtotal General = Σ Total Parcial_i',
        variables: [
          'P. Unitario_i: Valor unitario antes de impuestos.',
          'Desc.%_i: Porcentaje de descuento comercial concedido en la fila i.'
        ],
        explanation: 'Mostrar el precio de lista junto con la columna `Desc. %` hace visible ante el comprador el ahorro que le estás otorgando sin devaluar tu tarifa base.'
      },
      {
        title: '2. Cálculo de IGV (18%) e Importe Total de la Propuesta',
        expression: 'IGV = Subtotal General × 0.18   |   Total Cotizado = Subtotal General + IGV',
        variables: [
          'Subtotal General: Base imponible neta acumulada.',
          'Total Cotizado: Monto total por el cual se emitirá la Factura Electrónica.'
        ],
        explanation: 'En cotizaciones B2B entre empresas es indispensable desglosar el Subtotal y el IGV, ya que el cliente corporativo evalúa el costo por el Subtotal y utiliza el IGV como crédito fiscal.'
      },
      {
        title: '3. Desglose de Detracción SPOT SUNAT y Abono Neto en Cuenta Comercial',
        expression: 'Monto Detracción (Banco de la Nación) = Total Cotizado × (Tasa Detracción % ÷ 100)   |   Abono Neto Comercial = Total Cotizado − Monto Detracción',
        variables: [
          'Tasa Detracción %: Porcentaje SPOT según anexo SUNAT (ej. 12% para intermediación/mantenimiento/otros servicios empresariales, 10% para arrendamiento/construcción, 4% transporte).',
          'Abono Neto Comercial: Efectivo de libre disposición que ingresa a tu cuenta corriente bancaria.'
        ],
        explanation: 'Incluir el cálculo de la detracción desde la cotización evita reclamos al momento del pago cuando el cliente corporativo te transfiere el 88% a tu banco comercial y el 12% al Banco de la Nación.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Cotización B2B de fabricación e instalación de estructuras metálicas con 12% de Detracción',
      context: 'Un taller de estructuras metálicas en Ate cotiza a un almacén logístico la fabricación e instalación de un techo parabólico y portón corredizo, otorgando 5% de descuento en la estructura y aplicando detracción del 12%.',
      inputs: [
        { field: 'Moneda / Vigencia', value: 'Soles (S/) / 15 días calendario' },
        { field: 'Ítem 1 (Cant. × P. Unit. − Desc.%)', value: '1 × Estructura metálica 120 m² a S/ 12,000.00 con Desc. 5% = S/ 11,400.00' },
        { field: 'Ítem 2 (Cant. × P. Unit. − Desc.%)', value: '1 × Portón industrial motorizado a S/ 3,600.00 con Desc. 0% = S/ 3,600.00' },
        { field: 'Aplicar Detracción', value: 'Activada (12%)' }
      ],
      calculationSteps: [
        'Paso 1 (Subtotal general neto sin IGV): S/ 11,400.00 + S/ 3,600.00 = S/ 15,000.00.',
        'Paso 2 (IGV 18%): S/ 15,000.00 × 0.18 = S/ 2,700.00.',
        'Paso 3 (Total de la Cotización): S/ 15,000.00 + S/ 2,700.00 = S/ 17,700.00.',
        'Paso 4 (Cálculo de Detracción 12% sobre el Total): S/ 17,700.00 × 0.12 = S/ 2,124.00 (a depositar en Banco de la Nación) y S/ 15,576.00 (abono directo a cuenta comercial del taller).'
      ],
      outputs: [
        { label: 'Subtotal general', value: 'S/ 15,000.00', note: 'Ya incluye el ahorro del 5% (S/ 600) en el Ítem 1' },
        { label: 'IGV (18%) / Total', value: 'S/ 2,700.00 / S/ 17,700.00', note: 'Importe total a facturar' },
        { label: 'Desglose con Detracción (12%)', value: 'S/ 2,124.00 (BN) + S/ 15,576.00 (Neto)', note: 'Claridad total para el área de tesorería del cliente' }
      ],
      decision: 'El taller sabe de antemano que de los S/ 17,700.00 facturados recibirá S/ 15,576.00 líquidos para comprar acero y pagar soldadores, mientras que los S/ 2,124.00 en el Banco de la Nación cubrirán casi todo el IGV de la operación (S/ 2,700.00).'
    },
    dailyUseCases: [
      {
        title: 'Respuesta formal en menos de 5 minutos a licitaciones y pedidos corporativos',
        role: 'Contratistas de mantenimiento, arquitectura, estructuras metálicas y climatización',
        workflow: 'Selecciona al cliente guardado, jala tus partidas frecuentes desde el catálogo, activa "Aplicar Detracción" y envía el PDF con "Plantilla Moderna" antes que tus competidores.'
      },
      {
        title: 'Cierre rápido con botón de confirmación por WhatsApp',
        role: 'Proveedores de eventos, catering, fotografía, imprentas y agencias',
        workflow: 'Comparte la cotización y utiliza el flujo de "Aprobar vía WhatsApp" para que quede constancia escrita del número de cotización y monto total aceptado por el cliente.'
      },
      {
        title: 'Protección de márgenes ante volatilidad del dólar o insumos',
        role: 'Distribuidores de equipos, ferreterías industriales y vidrierías',
        workflow: 'Fija una "Fecha de Vencimiento" corta (7 a 10 días) y aclara en "Notas al Pie" que los precios de materiales importados están sujetos a stock y tipo de cambio vigente.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Olvidar activar "Aplicar Detracción" al cotizar servicios mayores a S/ 700 a empresas formales.',
        correction: 'Si no lo adviertes en la cotización y pides el 50% de adelanto para comprar materiales, cuando el cliente te retenga el 10% o 12% para el Banco de la Nación te faltará liquidez operativa.'
      },
      {
        mistake: 'Dejar vacío el campo "Fecha de Vencimiento" o "Condiciones de Pago".',
        correction: 'Una cotización sin fecha de vencimiento abierta permite que un cliente reclame el mismo precio tres meses después cuando tus costos ya subieron.'
      },
      {
        mistake: 'No usar el botón "Exportar Base de Datos" en la sección "Ajustes · Copia de Seguridad".',
        correction: 'Exporta periódicamente tu base local para tener resguardados tus contadores de "Clientes", "Productos" y "Cotizaciones" fuera del navegador.'
      }
    ],
    faqs: [
      {
        q: '¿La detracción se calcula sobre el Subtotal sin IGV o sobre el Total con IGV?',
        a: 'Por normativa del SPOT de SUNAT, el porcentaje de detracción se aplica siempre sobre el "Importe de la Operación", es decir, sobre el Total con IGV incluido. Así lo calcula exactamente la herramienta.'
      },
      {
        q: '¿Mi logotipo se sube a algún servidor cuando lo cargo en la cotización?',
        a: 'No. Como indica el botón "Subir logotipo (procesado localmente)", la imagen se lee directamente en la memoria de tu navegador para incrustarla en la vista previa y en el PDF.'
      },
      {
        q: '¿Puedo cambiar entre Soles (S/) y Dólares ($) sin volver a escribir los ítems?',
        a: 'Sí, desde el selector "Moneda" y el campo "Tipo de Cambio (S/ por $)" en "Datos de la Cotización" puedes gestionar tus propuestas en ambas divisas.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'estructuras-metalicas', label: 'Estructuras Metálicas en Lima', reason: 'Rubro B2B donde cada presupuesto requiere desglosar partidas, descuentos, plazos de entrega y detracción SUNAT.' },
      { slug: 'aire-acondicionado', label: 'Aire Acondicionado y Climatización en Lima', reason: 'Para cotizar equipos en dólares o soles separando el suministro de equipos de la mano de obra de instalación.' },
      { slug: 'arquitectura', label: 'Estudios de Arquitectura en Lima', reason: 'Para presentar propuestas de diseño y remodelación por etapas con condiciones de pago por entregables.' },
      { slug: 'catering', label: 'Servicios de Catering Corporativo en Lima', reason: 'Para cotizar eventos empresariales por número de comensales ("Cant.") con vigencia y condiciones de reserva claras.' }
    ],
    relatedToolSlugs: ['crm-pymes', 'creador-facturas-proforma', 'generador-contratos-servicios']
  },
  {
    slug: 'crm-pymes',
    name: 'CRM Ligero para Pymes',
    appTitle: 'CRM y Pipeline Comercial · Centro Operativo Local',
    categoryId: 'operaciones',
    categoryTitle: 'Operaciones, Ventas y Logística',
    badge: 'Gestión Comercial',
    url: 'https://nubeparapymes.online/herramientas/ventas/crm-pymes/',
    shortDesc: 'Organiza tu cartera de prospectos, registra el estado de tus cotizaciones enviadas y haz seguimiento ordenado para cerrar más ventas sin perder contactos.',
    heroSubtitle: 'Tutorial paso a paso para dominar el CRM y Pipeline Comercial: registro de contactos, creación de oportunidades con valor y probabilidad, cálculo de pipeline ponderado, control de seguimientos vencidos y respaldo JSON.',
    purpose: 'La mayoría de pymes en Lima pierde ventas no por falta de interesados, sino porque las conversaciones quedan enterradas en chats de WhatsApp o notas sueltas sin fecha de próximo contacto. Este CRM y Pipeline Comercial centraliza tu directorio de empresas/contactos y tus oportunidades de venta en 5 etapas (`Prospecto`, `Calificado`, `Propuesta`, `Ganado`, `Perdido`), calcula automáticamente tu **Pipeline Ponderado** ($\text{Valor} \times \text{Probabilidad}$) y enciende una alerta en el KPI `Seguimientos vencidos` cada vez que una oportunidad pasa su fecha de acción sin ser atendida.',
    interfaceMap: [
      {
        zone: 'Cabecera del Centro Operativo Local y Respaldo JSON',
        controls: ['Botón: Respaldo JSON (exportación e importación con firma de integridad v2)', 'Botón: Guía de uso', 'Barra de conexión con suite: Portal · Cotizaciones · CRM · Caja · Inventario · Tareas'],
        description: 'Almacena toda tu cartera comercial en el navegador con máxima privacidad y permite exportar copias de seguridad en formato JSON para no perder jamás tu base de clientes.'
      },
      {
        zone: 'Panel de 4 KPIs Comerciales en Vivo',
        controls: ['Tarjeta 1: Contactos (empresas y personas)', 'Tarjeta 2: Oportunidades abiertas (en seguimiento)', 'Tarjeta 3: Pipeline ponderado (valor × probabilidad)', 'Tarjeta 4: Seguimientos vencidos (requieren atención)'],
        description: 'Te muestra al instante cuántos clientes tienes registrados, cuántos negocios están abiertos, cuánto dinero real puedes proyectar cobrar según la probabilidad de cierre y cuántos seguimientos tienes atrasados hoy.'
      },
      {
        zone: 'Formulario "Nuevo contacto" (#contact-form)',
        controls: ['Campo: Nombre o empresa *', 'Campo: Persona de contacto', 'Campo: Teléfono', 'Campo: Correo', 'Campo: Notas', 'Botones: Guardar contacto · Limpiar'],
        description: 'Crea la ficha maestra de cada prospecto o empresa cliente con los datos clave del decisor de compra.'
      },
      {
        zone: 'Formulario "Nueva oportunidad" (#opportunity-form)',
        controls: ['Campo: Oportunidad * (nombre del negocio o pedido)', 'Selector: Contacto (vincula con un contacto registrado o "Sin asignar")', 'Campo: Valor estimado (S/)', 'Selector: Etapa (Prospecto · Calificado · Propuesta · Ganado · Perdido)', 'Campo: Probabilidad (%)', 'Campo de fecha: Próxima acción', 'Campo: Qué sigue (compromiso concreto de seguimiento)', 'Botones: Agregar oportunidad · Limpiar'],
        description: 'Registra cada venta potencial vinculándola a su contacto, le asigna un monto en soles, una etapa del embudo, un porcentaje de probabilidad y una fecha obligatoria de próxima acción.'
      },
      {
        zone: 'Tablero "Pipeline comercial" (#pipeline) y Directorio "Contactos"',
        controls: ['Tarjetas interactivas de oportunidades con selector directo de Etapa', 'Lista inferior: Contactos (Base local de clientes y prospectos)', 'Botón: Eliminar todos'],
        description: 'Permite mover cada oportunidad de una etapa a otra directamente desde su tarjeta y revisar qué acción toca ejecutar hoy.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Registra primero al cliente o empresa en el formulario "Nuevo contacto"',
        uiTarget: 'Formulario "Nuevo contacto" → Campos "Nombre o empresa *", "Persona de contacto", "Teléfono", "Correo" y "Notas"',
        instruction: 'Escribe el nombre de la empresa o cliente en "Nombre o empresa *", anota quién toma la decisión en "Persona de contacto", su WhatsApp en "Teléfono", su "Correo" y cualquier detalle clave en "Notas" (ej. distrito, rubro, horario en que prefiere que lo llamen). Haz clic en "Guardar contacto".',
        whatHappens: 'El contador de la primera tarjeta ("Contactos") sube en 1 y ese cliente aparece disponible dentro del selector desplegable "Contacto" del formulario de oportunidades.'
      },
      {
        stepTitle: 'Crea el negocio potencial en "Nueva oportunidad" y vincúlalo al contacto',
        uiTarget: 'Formulario "Nueva oportunidad" → Campos "Oportunidad *", "Contacto" y "Valor estimado"',
        instruction: 'Escribe un título claro en "Oportunidad *" (ej. "Mantenimiento trimestral de 8 equipos" o "Pedido 150 uniformes bordados"), selecciona al cliente en el desplegable "Contacto" e ingresa el monto total esperado en "Valor estimado".',
        whatHappens: 'La oportunidad queda asociada a los datos de teléfono y correo del contacto para que no tengas que buscarlos fuera del CRM.'
      },
      {
        stepTitle: 'Asigna la "Etapa", la "Probabilidad (%)" y programa la fecha de "Próxima acción"',
        uiTarget: 'Selector "Etapa" + Campo "Probabilidad (%)" + "Próxima acción" + "Qué sigue"',
        instruction: 'Elige la "Etapa" actual (`Prospecto` ~15%, `Calificado` ~35%, `Propuesta` ~65%, `Ganado` 100%, `Perdido` 0%), escribe la "Probabilidad (%)", selecciona la fecha en "Próxima acción" y anota en "Qué sigue" la tarea exacta (ej. "Llamar el jueves a las 10 am para revisar cotización N.° 0042"). Pulsa "Agregar oportunidad".',
        whatHappens: 'La herramienta multiplica `Valor estimado × (Probabilidad / 100)` y suma ese importe a la tarjeta "Pipeline ponderado", incrementando también "Oportunidades abiertas".'
      },
      {
        stepTitle: 'Revisa cada mañana el KPI "Seguimientos vencidos" y mueve las etapas en el Pipeline',
        uiTarget: 'Tarjeta "Seguimientos vencidos" + Sección "Pipeline comercial"',
        instruction: 'Al iniciar el día, mira la cuarta tarjeta ("Seguimientos vencidos"). Atiende primero las tarjetas cuya fecha de "Próxima acción" ya venció o vence hoy. Conforme avances con el cliente, actualiza la "Etapa" directamente en la tarjeta del "Pipeline comercial" (`Prospecto` → `Calificado` → `Propuesta` → `Ganado`).',
        whatHappens: 'Cuando pasas una oportunidad a `Ganado` o `Perdido`, se actualiza tu cartera activa y mantienes tu embudo limpio y predecible.'
      },
      {
        stepTitle: 'Exporta semanalmente tu cartera con el botón "Respaldo JSON"',
        uiTarget: 'Cabecera "Centro operativo local" → Botón "Respaldo JSON"',
        instruction: 'Haz clic en "Respaldo JSON" para guardar una copia local de todos tus contactos, notas y oportunidades.',
        whatHappens: 'Se descarga un archivo JSON verificado que protege tu activo comercial más valioso: tu base de prospectos y clientes.'
      }
    ],
    formulas: [
      {
        title: '1. Valor del Pipeline Ponderado (Pronóstico Realista de Ventas)',
        expression: 'Pipeline Ponderado = Σ [ Valor Estimado_i × (Probabilidad_i ÷ 100) ]',
        variables: [
          'Valor Estimado_i: Monto en soles de cada oportunidad abierta i.',
          'Probabilidad_i: Porcentaje de probabilidad de cierre asignado según la etapa del embudo.'
        ],
        explanation: 'Si tienes 5 cotizaciones enviadas que suman S/ 50,000 brutos, sería un error asumir que cobrarás los S/ 50,000. El Pipeline Ponderado pondera cada oportunidad por su probabilidad real para darte la facturación esperada.'
      },
      {
        title: '2. Tasa de Cierre Comercial (Win Rate)',
        expression: 'Tasa de Cierre (%) = [ Oportunidades en Etapa "Ganado" ÷ (Oportunidades "Ganado" + Oportunidades "Perdido") ] × 100',
        variables: [
          'Ganado: Oportunidades cerradas exitosamente.',
          'Perdido: Oportunidades descartadas o ganadas por la competencia.'
        ],
        explanation: 'Conocer tu tasa histórica de cierre por etapa te permite calibrar qué porcentaje exacto debes escribir en el campo "Probabilidad (%)" al crear nuevas oportunidades.'
      },
      {
        title: '3. Índice de Disciplina de Seguimiento (Control de Vencidos)',
        expression: 'Salud de Seguimiento (%) = [ 1 − (Seguimientos Vencidos ÷ Oportunidades Abiertas) ] × 100',
        variables: [
          'Seguimientos Vencidos: Oportunidades abiertas cuya fecha de "Próxima acción" es anterior a hoy.',
          'Oportunidades Abiertas: Total de negocios en etapas Prospecto, Calificado o Propuesta.'
        ],
        explanation: 'La meta operativa de cualquier equipo comercial es mantener el KPI "Seguimientos vencidos" en 0 al cierre de cada tarde.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Cálculo del Pipeline Ponderado en una empresa de cámaras de seguridad e instalaciones en Lima',
      context: 'Un integrador de cámaras de seguridad en Lince registra 3 oportunidades activas en su CRM para proyectar cuánto facturará en las próximas dos semanas.',
      inputs: [
        { field: 'Oportunidad 1 (Etapa: Prospecto · Probabilidad: 20%)', value: 'Condominio Miraflores — Valor estimado: S/ 6,000.00' },
        { field: 'Oportunidad 2 (Etapa: Calificado · Probabilidad: 50%)', value: 'Almacén Santa Anita — Valor estimado: S/ 10,000.00' },
        { field: 'Oportunidad 3 (Etapa: Propuesta · Probabilidad: 75%)', value: 'Clínica Dental San Borja — Valor estimado: S/ 4,000.00' }
      ],
      calculationSteps: [
        'Paso 1 (Aporte ponderado Oportunidad 1): S/ 6,000.00 × 0.20 = S/ 1,200.00.',
        'Paso 2 (Aporte ponderado Oportunidad 2): S/ 10,000.00 × 0.50 = S/ 5,000.00.',
        'Paso 3 (Aporte ponderado Oportunidad 3): S/ 4,000.00 × 0.75 = S/ 3,000.00.',
        'Paso 4 (Pipeline ponderado total): S/ 1,200.00 + S/ 5,000.00 + S/ 3,000.00 = S/ 9,200.00 (sobre una cartera bruta abierta de S/ 20,000.00).'
      ],
      outputs: [
        { label: 'Oportunidades abiertas', value: '3 en seguimiento', note: 'Cartera bruta acumulada: S/ 20,000.00' },
        { label: 'Pipeline ponderado', value: 'S/ 9,200.00', note: 'Suma de valor × probabilidad de las 3 oportunidades' },
        { label: 'Seguimientos vencidos', value: '0 requieren atención', note: 'Todas las oportunidades tienen próxima acción vigente' }
      ],
      decision: 'En lugar de confiarse en los S/ 20,000 brutos, el gerente sabe que su ingreso esperado realista es S/ 9,200.00 y prioriza hoy la llamada a la Clínica Dental (75%) y la visita técnica al Almacén (50%).'
    },
    dailyUseCases: [
      {
        title: 'Seguimiento sistemático de cotizaciones enviadas por WhatsApp o correo',
        role: 'Empresas de servicios técnicos, remodelaciones, imprentas y proveedores B2B',
        workflow: 'Cada vez que descargues un PDF en el Generador de Cotizaciones, registra inmediatamente la oportunidad en etapa "Propuesta" con una "Próxima acción" a 48 horas para que no se enfríe.'
      },
      {
        title: 'Reactivación de clientes antiguos y contratos de mantenimiento periódico',
        role: 'Climatización, fumigación, limpieza de cisternas y extintores',
        workflow: 'Cuando cierres una oportunidad como "Ganado", crea de inmediato una nueva oportunidad en etapa "Prospecto" con fecha de "Próxima acción" dentro de 6 meses (cuando vence su certificado o mantenimiento).'
      },
      {
        title: 'Revisión comercial de 10 minutos cada lunes con el equipo de ventas',
        role: 'Dueños de negocio y coordinadores comerciales',
        workflow: 'Abre el CRM los lunes a las 9:00 a.m., revisa que "Seguimientos vencidos" esté en cero y audita qué oportunidades en "Propuesta" se cerrarán esa semana.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Crear una oportunidad en "Nueva oportunidad" dejando vacío el campo "Próxima acción" o "Qué sigue".',
        correction: 'Una oportunidad sin fecha ni siguiente paso concreto nunca activa la alerta de "Seguimientos vencidos" y termina olvidada.'
      },
      {
        mistake: 'Poner 90% de "Probabilidad (%)" a un contacto que recién acaba de preguntar el precio por WhatsApp.',
        correction: 'Sé conservador: usa 10%–20% en "Prospecto", 35%–50% en "Calificado" (cuando ya confirmaste presupuesto y necesidad) y 65%–80% en "Propuesta" (cuando ya revisaron tu cotización formal).'
      },
      {
        mistake: 'Borrar oportunidades que no salieron en lugar de marcarlas en etapa "Perdido".',
        correction: 'Cambia su etapa a "Perdido" y anota en el contacto por qué no compró (precio, tiempo de entrega, stock); esa información vale oro para ajustar tus precios.'
      }
    ],
    faqs: [
      {
        q: '¿Qué significa exactamente la tarjeta "Pipeline ponderado (valor × probabilidad)"?',
        a: 'Es la suma del valor estimado de cada oportunidad multiplicado por su porcentaje de probabilidad de cierre. Te ofrece una proyección financiera mucho más certera que sumar el total bruto de todas las cotizaciones.'
      },
      {
        q: '¿Cómo paso una oportunidad ganada del CRM al control de pagos?',
        a: 'Cuando cambies la etapa de una oportunidad a "Ganado", usa el enlace superior hacia "Caja" (Flujo de Caja y Cobranzas) para registrar el adelanto como ingreso cobrado y el saldo como cuenta por cobrar pendiente.'
      },
      {
        q: '¿Puedo usar este CRM sin conexión a servidores externos ni pago de licencias por usuario?',
        a: 'Sí. Toda la base de contactos y el tablero de oportunidades funcionan de forma 100% gratuita y local en tu navegador, con exportación e importación mediante el botón "Respaldo JSON".'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'camaras-de-seguridad', label: 'Cámaras de Seguridad en Lima', reason: 'Rubro donde la visita técnica y el seguimiento a las 48 horas de enviada la propuesta duplican la tasa de cierre.' },
      { slug: 'fumigacion', label: 'Empresas de Fumigación en Lima', reason: 'Los certificados de saneamiento ambiental vencen cada 3 o 6 meses; programar la "Próxima acción" asegura la renovación automática.' },
      { slug: 'agentes-inmobiliarios', label: 'Agentes Inmobiliarios en Lima', reason: 'Ciclos comerciales largos donde clasificar prospectos calificados y propuestas evita perder comisiones.' },
      { slug: 'decoracion-de-eventos', label: 'Decoración de Eventos en Lima', reason: 'Para controlar decenas de novios o clientes corporativos que cotizan con meses de anticipación.' }
    ],
    relatedToolSlugs: ['generador-cotizaciones', 'flujo-caja-pymes', 'generador-codigos-qr']
  }
];
