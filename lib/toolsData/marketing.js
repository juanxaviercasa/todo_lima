export const MARKETING_TOOLS = [
  {
    slug: 'auditor-seo-basico',
    name: 'Auditor Básico de SEO On-Page',
    appTitle: 'Auditor Básico de SEO On-Page · Suite de Análisis de Metaetiquetas y Contenido',
    categoryId: 'marketing',
    categoryTitle: 'Marketing Digital y Diseño',
    badge: 'Posicionamiento / SEO',
    url: 'https://nubeparapymes.online/herramientas/marketing/auditor-seo-basico/',
    shortDesc: 'Revisa etiquetas meta (title, description), encabezados H1, densidad de palabras clave, legibilidad y vistas previas en Google y redes para mejorar tu tráfico orgánico.',
    heroSubtitle: 'Tutorial paso a paso para auditar tu SEO On-Page: extracción por URL o manual, puntuación global (SEO, Accesibilidad, Rendimiento), generador de títulos con IA, to-do list para programadores y comparador radar de competidores.',
    purpose: 'Para que tu negocio en Lima aparezca en los primeros resultados de Google cuando un cliente busca tus servicios, tu página web debe cumplir con directrices editoriales estrictas en sus metatítulos, metadescripciones, jerarquía de encabezados H1 y etiquetas Open Graph para redes sociales. Este Auditor de SEO On-Page evalúa una URL o datos manuales en tiempo real, calcula una puntuación global sobre 100, ofrece sugerencias de metatítulos y descripciones con IA según tu palabra clave, genera una lista de 14 tareas accionables para tu programador (exportable en TXT o PDF) y te permite comparar tu perfil contra un competidor en un gráfico radar.',
    interfaceMap: [
      {
        zone: 'Barra de Pestañas y Acciones Principales',
        controls: ['Pestaña: Auditor (consola principal)', 'Pestaña: Historial (evolución del Score SEO a lo largo del tiempo)', 'Botones superiores: Guardar · Exportar PDF'],
        description: 'Permite ejecutar auditorías completas, guardarlas en el navegador para comparar la evolución histórica del puntaje y exportar el informe final en PDF.'
      },
      {
        zone: 'Bloque "Extracción automática" y "Puntuación global (0–100)"',
        controls: ['Botón: Analizar URL (extracción automática de etiquetas web)', 'Puntuación global (0–100) desglosada en: SEO · Accesibilidad · Rendimiento', 'Indicadores de estado: Crítico · Mejorable · Óptimo'],
        description: 'Muestra la calificación general de salud técnica y editorial calculada ponderando 14 comprobaciones críticas de indexabilidad y presentación.'
      },
      {
        zone: 'Panel "Metaetiquetas principales" y Generador con IA',
        controls: ['Campo: URL de la página (máx. 75 car.)', 'Campo: Palabra clave objetivo (máx. 40 car.)', 'Campo: Título meta (óptimo 30–60 car.)', 'Campo: Meta descripción (óptimo 70–160 car.)', 'Campo: Encabezado H1 (máx. 70 car.)', 'Bloque Open Graph: og:title · og:description · og:image (URL)', 'Botón: Mejorar con IA (sugiere metatítulos y metadescripciones óptimos)'],
        description: 'Evalúa la presencia de la palabra clave en las 3 zonas vitales para Google (Title, Description y H1) y propone alternativas optimizadas con inteligencia artificial.'
      },
      {
        zone: 'Simuladores "Vista previa en Google" y "Vista previa al compartir"',
        controls: ['Vista previa Google: Escritorio · Móvil', 'Vista previa redes sociales: Facebook · LinkedIn · Twitter', 'Tarjeta de Salud SEO: 7 checks en vivo'],
        description: 'Muestra exactamente cómo se verá tu snippet en los resultados de búsqueda de Google y la tarjeta con imagen cuando alguien comparta tu link por WhatsApp, Facebook o LinkedIn.'
      },
      {
        zone: 'Lista de Tareas para Programador, Legibilidad y Radar de Competidores',
        controls: ['Módulo: Lista de tareas accionable para tu programador (14 checks con botones TXT y PDF)', 'Módulo: Densidad de palabras clave y legibilidad (conteo de palabras, frases y legibilidad)', 'Módulo: Comparador SEO de competidores (gráfico radar superpuesto: Tu web vs. Competidor)'],
        description: 'Entrega una guía paso a paso lista para enviar a tu webmaster y te permite medir tu optimización frente a un competidor directo del mismo rubro.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Ingresa la URL o completa manualmente las metaetiquetas de tu página',
        uiTarget: 'Sección "Extracción automática" → Campo "URL de la página" + Botón "Analizar URL"',
        instruction: 'Escribe la dirección web que deseas auditar y pulsa "Analizar URL". Si tu sitio está en desarrollo local o bloquea peticiones automáticas, escribe manualmente tu URL, tu "Palabra clave objetivo" (ej. "dentista en surco") y tu "Título meta".',
        whatHappens: 'La herramienta extrae o lee las etiquetas y calcula al instante la "Puntuación global" (0 a 100) en el velocímetro superior.'
      },
      {
        stepTitle: 'Optimiza la longitud del Meta Título (30–60) y Meta Descripción (70–160)',
        uiTarget: 'Campos "Título meta" y "Meta descripción" + Contadores de caracteres en vivo',
        instruction: 'Asegúrate de que tu título tenga entre 30 y 60 caracteres y contenga la palabra clave al inicio. Luego redacta una meta descripción persuasiva de entre 70 y 160 caracteres con llamada a la acción clara.',
        whatHappens: 'Los contadores de caracteres cambian a verde y la "Vista previa en Google" (conmutador Escritorio / Móvil) te confirma que el texto no se cortará con puntos suspensivos (...).'
      },
      {
        stepTitle: 'Usa el botón "Mejorar con IA" para recibir títulos y descripciones de alto CTR',
        uiTarget: 'Botón "Mejorar con IA" debajo de las metaetiquetas',
        instruction: 'Con tu "Palabra clave objetivo" definida, haz clic en "Mejorar con IA".',
        whatHappens: 'El motor despliega sugerencias de títulos probados (comparativas, guías definitivas, rankings) y descripciones enfocadas en conversión que puedes aplicar con un clic.'
      },
      {
        stepTitle: 'Configura las etiquetas Open Graph y pega tu texto en Legibilidad',
        uiTarget: 'Bloque "Open Graph / Social" + Módulo "Densidad de palabras clave y legibilidad"',
        instruction: 'Coloca la URL de tu imagen corporativa (1200×630 px) en `og:image` y revisa la "Vista previa al compartir" (Facebook, LinkedIn, Twitter). Luego pega el texto de tu artículo en el área "Texto del artículo".',
        whatHappens: 'Se evalúa la riqueza del enlace social y el analizador de legibilidad computa la cantidad total de palabras, palabras únicas, legibilidad del texto y el "Top 5 palabras" más repetidas.'
      },
      {
        stepTitle: 'Compara tu página contra un competidor y exporta la lista de tareas en PDF',
        uiTarget: 'Sección "Comparador SEO de competidores" + Botones "TXT" / "PDF" de la lista de tareas',
        instruction: 'En el comparador de competidores, escribe la web de tu rival en Lima para contrastar en el radar quién tiene mejores títulos, descripciones y densidad. Finalmente, descarga la "Lista de tareas accionable" en TXT o PDF para tu programador.',
        whatHappens: 'Obtienes un checklist técnico ordenado por prioridad (SEO, Accesibilidad, Rendimiento) para llevar tu página a los primeros lugares de Google.'
      }
    ],
    formulas: [
      {
        title: '1. Puntuación Global Ponderada de Salud On-Page (0 a 100)',
        expression: 'Puntuación Global = (Σ Criterios SEO Cumplidos × 5.5) + (Σ Criterios Accesibilidad × 3.5) + (Σ Criterios Rendimiento × 2.5)',
        variables: [
          '14 comprobaciones automáticas:',
          'SEO: Title 30–60 car., Description 70–160 car., Encabezado H1 presente, Keyword en Title, Keyword en Description, Keyword en H1, URL amigable (< 75 car.).',
          'Accesibilidad: H1 único para lectores de pantalla, Title descriptivo (> 10 car.), imagen social definida, contenido sustancial (> 300 palabras).',
          'Rendimiento/Social: Etiquetas Open Graph configuradas (og:title, og:description, og:image).'
        ],
        explanation: 'Equilibra las señales directas de posicionamiento con la usabilidad y la tasa de clics (CTR) en buscadores y redes.'
      },
      {
        title: '2. Densidad de Palabra Clave Óptima (Keyword Density)',
        expression: 'Densidad (%) = (Número de Repeticiones de la Palabra Clave × Número de Términos de la Frase ÷ Total de Palabras del Texto) × 100',
        variables: [
          'Rango saludable recomendado: 1.0% a 2.5% de densidad.',
          '< 1.0%: Relevancia débil para Google.',
          '> 3.0%: Riesgo de sobreoptimización (keyword stuffing) penalizable por el algoritmo.'
        ],
        explanation: 'La herramienta analiza el texto para asegurar que el contenido cubra el tema con naturalidad sin caer en repeticiones artificiales.'
      },
      {
        title: '3. Límites de Truncamiento de Snippets en Google (Pixel-Based)',
        expression: 'Límite Título: ~580 a 600 píxeles (~55–60 caracteres)   |   Límite Descripción: ~960 a 990 píxeles (~155–160 caracteres en móvil)',
        variables: [
          'Caracteres anchos (M, W, mayúsculas) ocupan más píxeles que caracteres delgados (i, l, t).'
        ],
        explanation: 'El simulador SERP reproduce el ancho visible real para garantizar que tu mensaje de venta y tu llamada a la acción no queden cortados en la pantalla del usuario.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Auditoría y optimización de una clínica veterinaria en San Miguel con la palabra clave "veterinaria 24 horas san miguel"',
      context: 'Una veterinaria de urgencias en San Miguel tiene una web con título genérico "Inicio - Clínica Veterinaria" y desea corregir sus etiquetas para captar emergencias nocturnas desde Google.',
      inputs: [
        { field: 'URL auditada / Palabra clave', value: 'https://veterinariasanmiguel.pe / veterinaria 24 horas san miguel' },
        { field: 'Título meta inicial', value: 'Inicio - Clínica Veterinaria (demasiado corto, 27 car., sin keyword)' },
        { field: 'Meta descripción inicial', value: 'Venta de alimentos, baños y vacunas para perros y gatos en San Miguel (sin urgencia)' },
        { field: 'Etiqueta H1 inicial', value: 'Bienvenidos a nuestra web (H1 genérico no optimizado)' }
      ],
      calculationSteps: [
        'Paso 1 (Diagnóstico inicial): Puntuación global 26/100 (Crítico en SEO y Mejorable en Accesibilidad por falta de keyword en Title, Description y H1).',
        'Paso 2 (Uso de Mejorar con IA): Se adopta el nuevo título: "Veterinaria 24 Horas en San Miguel · Urgencias y Cirugías" (54 caracteres, rango óptimo 30–60 con keyword al inicio).',
        'Paso 3 (Redacción de Meta Descripción persuasiva): "Atención veterinaria 24 horas en San Miguel. Emergencias nocturnas, cirugías, laboratorio y ecografías. ¡Llámanos ahora al 999-888-777!" (138 caracteres, óptimo 70–160).',
        'Paso 4 (Alineación de H1 y Open Graph): H1 = "Clínica Veterinaria 24 Horas en San Miguel" y se carga imagen de la fachada iluminada en `og:image`.'
      ],
      outputs: [
        { label: 'Puntuación global final', value: '96 / 100 (Óptimo)', note: '14 de 14 tareas completadas' },
        { label: 'Vista previa SERP', value: 'Snippet perfecto en móvil y escritorio', note: 'Teléfono visible sin truncamiento' },
        { label: 'Lista de tareas', value: '14 checks en verde', note: 'Exportada en PDF para el desarrollador web' }
      ],
      decision: 'Tras implementar los cambios del reporte en su web, la clínica cuadruplicó sus clics orgánicos provenientes de búsquedas de emergencia desde celulares en San Miguel y distritos aledaños.'
    },
    dailyUseCases: [
      {
        title: 'Auditoría previa al lanzamiento de cualquier página o servicio nuevo',
        role: 'Agencias de marketing, consultores SEO y diseñadores web',
        workflow: 'Pega la URL o el borrador de textos en el auditor, verifica que la puntuación supere los 85 puntos y genera el informe PDF para el cliente o programador.'
      },
      {
        title: 'Espionaje y benchmarking de competidores en el buscador',
        role: 'Dueños de negocios locales en Lima',
        workflow: 'Abre el "Comparador SEO de competidores", ingresa la web del líder de tu categoría en Google y detecta en qué métricas (longitud de títulos, descripciones o legibilidad) puedes superarlo.'
      },
      {
        title: 'Optimización de artículos del blog corporativo para atraer prospectos',
        role: 'Redactores y creadores de contenido',
        workflow: 'Pega el texto del post en "Densidad de palabras clave", valida que el "Top 5 palabras" coincida con tu temática y revisa que la legibilidad sea clara antes de publicar.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Tener una página web sin ninguna etiqueta H1 o tener múltiples etiquetas H1 dispersas.',
        correction: 'Toda página debe tener un único encabezado H1 principal que resuma el tema central y contenga la palabra clave objetivo.'
      },
      {
        mistake: 'Escribir un metatítulo larguísimo de 90 caracteres pensando que cuantas más palabras contenga, mejor.',
        correction: 'Google cortará todo lo que exceda los 60 caracteres (o ~600 píxeles) con "...", ocultando tu nombre de marca o tu teléfono. Mantente estrictamente en el rango de 30 a 60 caracteres.'
      },
      {
        mistake: 'Olvidar configurar la etiqueta `og:image` con una imagen horizontal de 1200×630 píxeles.',
        correction: 'Si no configuras `og:image`, cuando compartas tu web por WhatsApp o redes aparecerá un recuadro gris vacío en lugar de la foto de tu negocio o servicio.'
      }
    ],
    faqs: [
      {
        q: '¿Por qué la herramienta me pide una "Palabra clave objetivo"?',
        a: 'Porque la auditoría SEO no evalúa solo la técnica, sino la relevancia temática: comprueba si la palabra por la que tus clientes te buscan en Lima está presente en el Title, en la Meta Description y en el H1.'
      },
      {
        q: '¿Cuál es la diferencia entre el informe en pantalla y la "Lista de tareas para tu programador"?',
        a: 'La lista de tareas organiza los 14 checks en instrucciones directas y técnicas (ej. "Añadir etiqueta <meta name=\'description\'> de 140 caracteres") exportables en TXT o PDF para entregar directamente a quien gestiona tu web.'
      },
      {
        q: '¿Este análisis sustituye a Google Search Console?',
        a: 'No. El auditor evalúa la calidad editorial y técnica On-Page del código de tu página; Google Search Console mide el rendimiento posterior (impresiones reales, clics, indexación en servidores de Google).'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'agencias-de-turismo', label: 'Agencias de Turismo en Lima', reason: 'Sector altamente competitivo en Google donde la optimización de keywords por destino o tour define las reservas.' },
      { slug: 'reparacion-celulares', label: 'Reparación de Celulares en Lima', reason: 'Búsquedas locales urgentes donde tener un Title optimizado con distrito y H1 claro capta clientes al instante.' },
      { slug: 'dentistas', label: 'Clínicas Dentales en Lima', reason: 'Para posicionar tratamientos especializados (ortodoncia, implantes) en las primeras posiciones de Google Maps y búsqueda web.' },
      { slug: 'abogados', label: 'Estudios Jurídicos en Lima', reason: 'Para auditar páginas de especialidades legales y competir orgánicamente frente a grandes firmas.' }
    ],
    relatedToolSlugs: ['analizador-titulares', 'conversor-optimizador-imagenes', 'generador-paletas-corporativas']
  },
  {
    slug: 'conversor-optimizador-imagenes',
    name: 'Conversor y Optimizador de Imágenes WebP',
    appTitle: 'WebP Forge · Conversor y Optimizador de Imágenes para la Web con Marca de Agua',
    categoryId: 'marketing',
    categoryTitle: 'Marketing Digital y Diseño',
    badge: 'Rendimiento Web / WPO',
    url: 'https://nubeparapymes.online/herramientas/productividad/conversor-optimizador-imagenes/',
    shortDesc: 'Reduce hasta un 80% el peso de tus fotos JPG o PNG convirtiéndolas a WebP en tu propio navegador, con marca de agua, redimensionado y empaquetado en ZIP.',
    heroSubtitle: 'Tutorial paso a paso para operar WebP Forge: procesamiento por lotes en tu navegador (Canvas API), compresión a tamaño objetivo en saltos del 2%, marca de agua con opacidad al 50%, eliminación de metadatos GPS/EXIF y descarga en ZIP.',
    purpose: 'Las imágenes pesadas en JPG o PNG son la principal causa de que una página web o tienda online en Lima cargue lenta en celulares, perjudicando tu posicionamiento en Google y haciendo que los clientes abandonen antes de comprar. WebP Forge convierte y comprime lotes completos de fotos directamente en tu navegador usando la API Canvas de HTML5 sin subir tus archivos a ningún servidor externo, elimina metadatos privados (GPS, modelo de cámara), superpone tu marca de agua al 50% de opacidad, permite fijar un peso máximo objetivo en KB reduciendo la calidad en saltos del 2% y descarga todo empaquetado en un archivo .zip.',
    interfaceMap: [
      {
        zone: 'Zona de Carga Masiva (Drag & Drop)',
        controls: ['Área de soltado: Arrastra tus imágenes o haz clic', 'Formatos admitidos: JPG o PNG (hasta 5 MB cada una)', 'Insignia de privacidad: Procesado 100% en tu navegador (sin subir a servidores)', 'Botón: Seleccionar imágenes'],
        description: 'Permite cargar decenas de fotos a la vez para procesar catálogos completos en cuestión de segundos.'
      },
      {
        zone: 'Panel de Control de Compresión y "Tamaño objetivo"',
        controls: ['Control 1: Calidad global (slider de compresión WebP de menor peso a máxima nitidez)', 'Control 2: Activar tamaño objetivo (campo "Máx. KB por imagen")', 'Algoritmo inteligente: Reduce la calidad en saltos del 2% hasta alcanzar el peso deseado automáticamente'],
        description: 'Garantiza que ninguna imagen supere el umbral de peso que tú definas (por ejemplo, 150 KB para ecommerce o 250 KB para banners).'
      },
      {
        zone: 'Módulo de Redimensionado ("Dimensiones")',
        controls: ['Selectores de proporción: Proporción bloqueada · Libre', 'Campos numéricos: Ancho (px) · Alto (px)', 'Botón: Volver al tamaño original'],
        description: 'Reescala imágenes gigantescas tomadas con cámara réflex o celular de 4000 px a las dimensiones reales de tu diseño web (ej. 1200 px de ancho).'
      },
      {
        zone: 'Módulo de "Marca de agua (opcional)"',
        controls: ['Selector: Texto (ej. © tumarca.pe) o Subir logotipo', 'Selector de posición: Esquina inferior derecha, inferior izquierda, centro, etc.', 'Opacidad fija de seguridad: 50% de opacidad en cada imagen'],
        description: 'Protege las fotografías de tus productos y proyectos evitando que competidores descarguen y utilicen tus fotos comerciales sin autorización.'
      },
      {
        zone: 'Comparador "Antes / Después" y Descarga (Individual o ZIP)',
        controls: ['Lienzo comparativo: Original (JPG/PNG) vs. WebP optimizado', 'Lectura de ahorro en vivo: Peso original (KB) vs. Peso final WebP y % de reducción', 'Botones de salida: Descargar imagen · Descargar lote completo en .ZIP', 'Botón: Vaciar lote'],
        description: 'Permite verificar visualmente que no haya pérdida apreciable de nitidez antes de descargar los archivos individuales o el paquete comprimido.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Arrastra tus fotografías al área de trabajo de WebP Forge',
        uiTarget: 'Zona de carga "Arrastra tus imágenes o haz clic" → Botón "Seleccionar imágenes"',
        instruction: 'Selecciona una o varias imágenes JPG o PNG desde tu explorador de archivos y suéltalas en el recuadro central de la herramienta.',
        whatHappens: 'La API Canvas de tu navegador lee los archivos localmente, extrae sus dimensiones y muestra la miniatura de cada foto con su peso original en KB.'
      },
      {
        stepTitle: 'Ajusta la "Calidad global" o activa "Tamaño objetivo (KB)"',
        uiTarget: 'Control "Calidad global" o casilla "Activar tamaño objetivo"',
        instruction: 'Para fotografías generales, deja la calidad en 75%–80%. Si tu plataforma web exige que ninguna foto pese más de 200 KB, marca la casilla "Activar tamaño objetivo" y escribe 200 en "Máx. KB por imagen".',
        whatHappens: 'El motor ejecuta un bucle iterativo que reduce la compresión en saltos de 2% hasta que el archivo final quede exactamente por debajo del límite fijado.'
      },
      {
        stepTitle: 'Reescala las dimensiones si las fotos son gigantescas',
        uiTarget: 'Sección "Dimensiones" → Selector "Proporción" + Campo "Ancho (px)"',
        instruction: 'Si tus fotos miden más de 3000 píxeles de ancho, escribe 1200 o 1600 en el campo "Ancho" manteniendo la "Proporción" bloqueada.',
        whatHappens: 'La altura se calcula proporcionalmente para evitar deformaciones y el peso del archivo se reduce drásticamente antes de comprimir.'
      },
      {
        stepTitle: 'Agrega tu "Marca de agua" corporativa si deseas proteger tus fotos',
        uiTarget: 'Sección "Marca de agua" → Campo de texto o logo + Selector de "Posición"',
        instruction: 'Escribe el nombre de tu marca (ej. `© todolima.com`) o sube tu logo transparente en PNG, y elige la posición en el lote.',
        whatHappens: 'La marca se estampa al 50% de opacidad sobre el lienzo antes de renderizar el archivo WebP final.'
      },
      {
        stepTitle: 'Compara el "Antes vs. Después" y descarga todo en un archivo .ZIP',
        uiTarget: 'Lienzo comparativo → Botón "Descargar lote completo en .ZIP"',
        instruction: 'Mueve el divisor visual de comparación para confirmar la nitidez y haz clic en "Descargar lote completo en .ZIP".',
        whatHappens: 'Se compila en tu navegador un único archivo comprimido ZIP con todas tus imágenes convertidas a formato WebP optimizado y sin metadatos privados de GPS.'
      }
    ],
    formulas: [
      {
        title: '1. Tasa de Reducción de Peso de Imagen (Compression Ratio)',
        expression: 'Ahorro de Peso (%) = [ (Peso Original KB − Peso WebP KB) ÷ Peso Original KB ] × 100',
        variables: [
          'Peso Original: Tamaño del archivo JPG o PNG subido.',
          'Peso WebP: Tamaño resultante tras la compresión basada en predicción espacial de píxeles.'
        ],
        explanation: 'El formato WebP suele alcanzar entre 65% y 85% de ahorro frente a PNGs transparentes y entre 30% y 50% frente a JPGs estándar sin pérdida perceptible de calidad visual.'
      },
      {
        title: '2. Algoritmo Iterativo de Búsqueda de Tamaño Objetivo (Goal Seek KB)',
        expression: 'Mientras Peso_Iteración > Tamaño_Objetivo_KB: Calidad = Calidad − 0.02 (Paso del 2%)',
        variables: [
          'Calidad inicial: 0.92 (92%).',
          'Límite de parada: Peso real ≤ Tamaño_Objetivo_KB o Calidad mínima alcanzada (0.20).'
        ],
        explanation: 'En lugar de obligarte a adivinar qué porcentaje de compresión necesitas, la herramienta re-renderiza en Canvas bajando 2% en cada ciclo hasta dar en el blanco exacto.'
      },
      {
        title: '3. Reescalado Proporcional de Píxeles (Aspect Ratio Constante)',
        expression: 'Alto Final (px) = Ancho Final (px) × (Alto Original ÷ Ancho Original)',
        variables: [
          'Evita distorsiones anamórficas en banners y fichas de producto al redimensionar.'
        ],
        explanation: 'Reducir una foto de 4000×3000 px a 1200×900 px recorta el número total de píxeles procesados de 12 megapíxeles a solo 1.08 megapíxeles, dividiendo el peso base por 10.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Optimización de 10 fotos para el catálogo web de una tienda de muebles en Villa El Salvador',
      context: 'Una mueblería tomó 10 fotos con smartphone a resolución 4032×3024 px con un peso promedio de 4.2 MB cada una (total lote: 42 MB), lo que hace que su web colapse en conexiones móviles.',
      inputs: [
        { field: 'Archivos cargados', value: '10 imágenes JPG (promedio 4.2 MB c/u)' },
        { field: 'Dimensiones asignadas', value: 'Ancho: 1400 px (Proporción bloqueada → Alto: 1050 px)' },
        { field: 'Tamaño objetivo configurado', value: 'Máx. 180 KB por imagen' },
        { field: 'Marca de agua', value: 'Texto "© Muebles El Salvador" al 50% opacidad en esquina inferior derecha' }
      ],
      calculationSteps: [
        'Paso 1 (Reescalado): Se reduce la cuadrícula de 12.19 millones de píxeles a 1.47 millones de píxeles por foto.',
        'Paso 2 (Limpieza EXIF): Se eliminan las coordenadas GPS del taller y los datos de exposición de la cámara.',
        'Paso 3 (Compresión iterativa WebP): El algoritmo baja la calidad desde 90% hasta ~74%, estabilizando el peso en 165 KB promedio.',
        'Paso 4 (Empaquetado): Se crea un archivo `catalogo-optimizado.zip` de solo 1.65 MB en total.'
      ],
      outputs: [
        { label: 'Peso inicial del lote', value: '42.0 MB', note: 'Demora ~15 segundos en cargar en 4G' },
        { label: 'Peso final en WebP', value: '1.65 MB', note: 'Carga instantánea en menos de 0.8 segundos' },
        { label: 'Porcentaje de ahorro', value: '96.1% de reducción', note: 'Con marca de agua de seguridad incrustada' }
      ],
      decision: 'La mueblería sube las imágenes en WebP a su tienda, superando la auditoría de velocidad de Google PageSpeed con puntuación mayor a 90 en móviles.'
    },
    dailyUseCases: [
      {
        title: 'Preparación de fotos de productos para tiendas WooCommerce, Shopify o Tiendanube',
        role: 'Gestores de ecommerce y administradores de tiendas virtuales',
        workflow: 'Pasa las fotos de tus proveedores o sesiones fotográficas por WebP Forge fijando 150 KB de "Tamaño objetivo" antes de subirlas a la web.'
      },
      {
        title: 'Marcado de agua y compresión para enviar presupuestos y portafolios ligeros',
        role: 'Carpinteros, fotógrafos, diseñadores de interiores y arquitectos',
        workflow: 'Aplica tu marca de agua al 50% de opacidad en la esquina inferior y comprime a WebP para enviar portafolios por WhatsApp sin que pesen decenas de megabytes.'
      },
      {
        title: 'Optimización de imágenes para cumplimiento de Core Web Vitals (LCP)',
        role: 'Desarrolladores web y especialistas en WPO (Web Performance Optimization)',
        workflow: 'Convierte el banner hero de la página principal a WebP y redimensiónalo a 1600 px de ancho para que el Largest Contentful Paint cargue en menos de 1.8 segundos.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Subir imágenes tomadas directamente con el celular (3 a 8 MB) sin optimizar.',
        correction: 'Una sola foto de 5 MB consume el plan de datos de tu cliente y hace que tu tienda demore 8 segundos en abrir; pasa siempre tus fotos por WebP Forge antes de subirlas.'
      },
      {
        mistake: 'Sobrescribir y borrar tus archivos originales en alta resolución.',
        correction: 'Conserva siempre tus fotos originales en tu computadora o disco externo para impresiones futuras; usa las versiones WebP exclusivamente para tu sitio web y redes.'
      },
      {
        mistake: 'Bajar la calidad global por debajo del 40% en fotos con textos pequeños.',
        correction: 'Si la imagen contiene textos o diagramas detallados, mantén la calidad sobre el 70% o redimensiona primero el ancho en píxeles antes de sobrecomprimir.'
      }
    ],
    faqs: [
      {
        q: '¿Todos los navegadores y teléfonos modernos soportan imágenes en formato WebP?',
        a: 'Sí. El formato WebP cuenta con compatibilidad superior al 97% en navegadores modernos a nivel mundial, incluyendo Google Chrome, Safari (en iOS y macOS), Microsoft Edge, Firefox y Opera.'
      },
      {
        q: '¿Por qué la herramienta elimina automáticamente los datos EXIF y GPS?',
        a: 'Las fotos tomadas con celulares suelen incluir coordenadas exactas de longitud y latitud del lugar donde se tomaron. Al re-renderizar en Canvas por privacidad estricta, esos metadatos sensibles se eliminan para proteger la seguridad de tu negocio y tu hogar.'
      },
      {
        q: '¿Hay algún límite en la cantidad de fotos que puedo empaquetar en el archivo ZIP?',
        a: 'No hay límite artificial de cantidad. Como el proceso se ejecuta con los recursos de tu propia memoria RAM, puedes procesar lotes de 20, 50 o más fotos simultáneamente.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'fotografia-eventos', label: 'Estudios de Fotografía en Lima', reason: 'Para entregar muestras ligeras con marca de agua a clientes antes de la selección final de fotos.' },
      { slug: 'reparacion-laptops', label: 'Soporte Web y Cómputo en Lima', reason: 'Para optimizar tiendas online y mejorar la velocidad de carga (Core Web Vitals) de portales corporativos.' },
      { slug: 'agentes-inmobiliarios', label: 'Agentes Inmobiliarios en Lima', reason: 'Para publicar fotos de departamentos y locales comerciales en portales web sin superar los límites de carga.' },
      { slug: 'carpinteros', label: 'Carpinteros y Fabricantes de Muebles en Lima', reason: 'Para proteger con marca de agua las fotos reales de sus proyectos entregados en redes sociales.' }
    ],
    relatedToolSlugs: ['auditor-seo-basico', 'analizador-titulares', 'generador-paletas-corporativas']
  },
  {
    slug: 'analizador-titulares',
    name: 'Analizador de Titulares Comerciales',
    appTitle: 'Motor Analítico de Titulares · Huella Emocional NLP · Test A/B Bayesiano',
    categoryId: 'marketing',
    categoryTitle: 'Marketing Digital y Diseño',
    badge: 'Copywriting / Conversión',
    url: 'https://nubeparapymes.online/herramientas/marketing/analizador-titulares/',
    shortDesc: 'Evalúa la fuerza, claridad y atractivo psicológico de tus encabezados para anuncios, correos o artículos con análisis emocional y simulador de test A/B.',
    heroSubtitle: 'Tutorial paso a paso para usar el Analizador de Titulares: análisis en vivo de 4 métricas (caracteres, palabras, palabras poderosas y números), huella emocional NLP (urgencia, curiosidad, miedo, alegría), vista previa SERP y test A/B con modelo Beta-Binomial.',
    purpose: 'En promedio, 8 de cada 10 personas leen únicamente el titular de un anuncio, correo, publicación o artículo en Lima; solo 2 continúan leyendo el resto. Este analizador heurístico evalúa tus textos en vivo con procesamiento de lenguaje natural local: mide la longitud en caracteres (40–60) y palabras (6–12), detecta palabras poderosas y palabras débiles de relleno, calcula la **Huella Emocional** (Urgencia, Curiosidad, Miedo, Alegría), genera vistas previas exactas para Google, Facebook y X (Twitter), e incluye una pestaña de **Prueba A/B Bayesiana** con modelo Beta-Binomial para decidir con rigor estadístico qué variante publicar.',
    interfaceMap: [
      {
        zone: 'Barra de Pestañas Principales',
        controls: ['Pestaña 1: Analizador (evaluación heurística y emocional de un titular)', 'Pestaña 2: Prueba A/B (comparador estadístico bayesiano entre Titular A y Titular B)'],
        description: 'Permite pulir primero un titular individualmente y luego contrastar dos alternativas finales para saber cuál tiene mayor probabilidad de ganar en clics.'
      },
      {
        zone: 'Consola del Analizador y Banco de Prueba Rápida',
        controls: ['Área de texto: Escribe tu titular', 'Botones de prueba rápida: 7 secretos definitivos... · La guía gratis para duplicar... · Evita este error urgente...', 'Puntaje global de atractivo (/ 100): Esperando · Débil · Mejorable · Bueno · Excelente'],
        description: 'Califica la fuerza global del encabezado en tiempo real conforme vas digitando cada palabra.'
      },
      {
        zone: 'Panel de 4 Contadores Estructurales',
        controls: ['Contador 1: Caracteres (ideal 40–60)', 'Contador 2: Palabras (ideal 6–12)', 'Contador 3: Palabras poderosas (detecta vocabulario de alto impacto)', 'Contador 4: Presencia de Número (bonifica concreción y promesas medibles)'],
        description: 'Verifica los cuatro factores que correlacionan con las mayores tasas de apertura y clics (CTR) en entornos digitales.'
      },
      {
        zone: 'Módulo "Huella emocional" (NLP) y Tono de Marca',
        controls: ['Indicador de Impacto psicológico global (0 a 100)', 'Desglose en 4 emociones: Urgencia · Curiosidad · Miedo · Alegría', 'Detector: Tono de marca (Neutro, Humorístico, Inspiracional, Alerta)'],
        description: 'Analiza el peso subconsciente del mensaje para asegurar que conecte con la emoción correcta según lo que vendas.'
      },
      {
        zone: 'Simulador "Vista previa en buscadores y redes" y Pestaña "Prueba A/B"',
        controls: ['Vistas: Google (Escritorio / Móvil) · Facebook · X (Twitter)', 'Control: Límite visible (alerta si pasa de 60 caracteres)', 'En pestaña Prueba A/B: Entradas de impresiones y CTR de Titular A y Titular B → Modelo Beta-Binomial → Probabilidad bayesiana y significancia estadística'],
        description: 'Te muestra el recorte exacto en pantallas y resuelve si la diferencia entre dos titulares es estadísticamente significativa o solo producto del azar.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Escribe tu titular borrador en la pestaña "Analizador"',
        uiTarget: 'Pestaña "Analizador" → Campo "Escribe tu titular"',
        instruction: 'Escribe el titular que pensabas usar para tu anuncio o artículo (por ejemplo, "Aprende a gestionar tu dinero en tu negocio").',
        whatHappens: 'El indicador superior muestra el "Puntaje global de atractivo (/ 100)" y los contadores evalúan si la longitud está dentro de los rangos recomendados.'
      },
      {
        stepTitle: 'Revisa los 4 contadores y añade un número o palabra poderosa',
        uiTarget: 'Contadores Caracteres (40–60), Palabras (6–12), Poderosas y Número',
        instruction: 'Si el contador marca "Demasiado corto" o "Falta fuerza", añade un número concreto (ej. "7", "5 pasos", "10 minutos") e integra una palabra de poder (ej. "definitivo", "garantizado", "gratis", "clave", "evita").',
        whatHappens: 'Por ejemplo, transformar el texto en "7 claves definitivas para gestionar el dinero de tu pyme sin errores" eleva el puntaje a categoría "Bueno" o "Excelente" (> 80/100).'
      },
      {
        stepTitle: 'Revisa la "Huella emocional" para alinear el mensaje con tu objetivo',
        uiTarget: 'Panel "Huella emocional" (Urgencia, Curiosidad, Miedo, Alegría)',
        instruction: 'Observa qué barra se enciende en el gráfico de huella emocional. Si vendes seguridad o asesoría legal, busca despertar "Urgencia" o "Miedo/Precaución"; si vendes cursos o moda, busca "Curiosidad" o "Alegría".',
        whatHappens: 'Confirmas que el impacto psicológico del texto coincida con la motivación de compra de tu público en Lima.'
      },
      {
        stepTitle: 'Verifica la vista previa en Google móvil y redes sociales',
        uiTarget: 'Sección "Vista previa en buscadores" → Botones Google / Facebook / X',
        instruction: 'Conmuta a la vista "Google Móvil" y revisa el indicador "Límite visible: X / 60 caracteres". Asegúrate de que las palabras más persuasivas queden antes del corte.',
        whatHappens: 'Compruebas cómo se leerá tu titular en los resultados de búsqueda de smartphones y en tarjetas compartidas.'
      },
      {
        stepTitle: 'Compara dos finalistas en la pestaña "Prueba A/B" con modelo bayesiano',
        uiTarget: 'Pestaña "Prueba A/B" → Campos Titular A y Titular B (Impresiones y CTR)',
        instruction: 'Si tienes dos alternativas fuertes, abre la pestaña "Prueba A/B", ingresa los datos de impresiones y clics de tu campaña de prueba y pulsa calcular.',
        whatHappens: 'El modelo Beta-Binomial calcula la distribución posterior y te indica con precisión: "Significancia estadística: gana B" (o gana A), garantizando que elijas la opción que realmente maximiza tus ventas.'
      }
    ],
    formulas: [
      {
        title: '1. Puntuación Heurística Global de Atractivo (/ 100)',
        expression: 'Puntaje = Base(Longitud Caracteres 40–60) + Base(Palabras 6–12) + Bonus(Palabras Poderosas × 8) + Bonus(Número Concreto × 10) − Penalidad(Palabras Débiles × 6)',
        variables: [
          'Palabras Poderosas: Términos que activan atención inmediata (definitivo, secreto, comprobado, paso a paso, urgente, gratis, oficial).',
          'Palabras Débiles / Relleno: Expresiones vagas o pasivas que restan fuerza (muy, cosas, algo, de alguna manera).',
          'Número Concreto: Números arábigos (ej. 5, 7, 10) que comunican promesa medible y específica.'
        ],
        explanation: 'Sintetiza directrices de copywriting de respuesta directa probadas en millones de impresiones de anuncios digitales.'
      },
      {
        title: '2. Medición de Huella Emocional NLP (Impacto Psicológico)',
        expression: 'Impacto Emocional = (Peso_Urgencia × w_1) + (Peso_Curiosidad × w_2) + (Peso_Alerta/Miedo × w_3) + (Peso_Alegría/Beneficio × w_4)',
        variables: [
          'Urgencia: Palabras como "hoy", "rápido", "antes de que sea tarde", "últimos cupos".',
          'Curiosidad: Palabras como "por qué", "secreto", "pocos conocen", "la razón de".',
          'Miedo / Precaución: Palabras como "error", "evita", "peligro", "multa", "riesgo".',
          'Alegría / Ganancia: Palabras como "duplica", "disfruta", "éxito", "tranquilidad".'
        ],
        explanation: 'Permite calibrar si el titular apela al deseo de ganar (beneficio) o al miedo de perder (evitación de dolor), dos grandes motivadores humanos.'
      },
      {
        title: '3. Modelo Bayesiano Beta-Binomial para Test A/B de Titulares',
        expression: 'Distribución Posterior: θ ~ Beta(α_0 + Conversiones, β_0 + Impresiones − Conversiones)   |   P(θ_B > θ_A) = Probabilidad de que B sea superior',
        variables: [
          'θ_A, θ_B: Tasas de conversión reales (CTR) de cada titular.',
          'α_0, β_0: Parámetros previos no informativos (prior Beta(1,1)).',
          'Significancia: Se considera ganador con certeza cuando P(θ_B > θ_A) > 95%.'
        ],
        explanation: 'A diferencia de las pruebas clásicas que exigen miles de visitas para no dar falsos positivos, la estadística bayesiana te dice con claridad la probabilidad real de que una variante supere a la otra incluso con muestras pequeñas de pymes.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Optimización de titular para anuncio en Facebook de un taller mecánico en Los Olivos',
      context: 'Un taller mecánico en Los Olivos quiere lanzar una campaña de mantenimiento preventivo previo a Fiestas Patrias y busca un titular con alto CTR.',
      inputs: [
        { field: 'Borrador inicial', value: 'Hacemos afinamiento y mantenimiento de autos para viajar (38/100 · Débil)' },
        { field: 'Versión A pulida', value: '5 revisiones mecánicas obligatorias antes de viajar en carretera (88/100 · Excelente)' },
        { field: 'Versión B alternativa', value: 'Evita quedarte varado: 5 chequeos urgentes para tu auto antes de salir de Lima (94/100 · Excelente)' }
      ],
      calculationSteps: [
        'Paso 1 (Análisis de Versión B): Caracteres: 77 (bueno para redes sociales), Palabras: 14, Presencia de número ("5"), Palabras poderosas ("urgentes", "evita"), Emoción predominante: Precaución/Miedo + Urgencia.',
        'Paso 2 (Simulación en Prueba A/B tras 1,200 impresiones por variante):',
        'Titular A: 1,200 impresiones y 36 clics (CTR = 3.00%).',
        'Titular B: 1,200 impresiones y 58 clics (CTR = 4.83%).',
        'Paso 3 (Cálculo Beta-Binomial): θ_A ~ Beta(37, 1165), θ_B ~ Beta(59, 1143) → P(θ_B > θ_A) = 98.7% (> 95%).'
      ],
      outputs: [
        { label: 'Puntaje de Versión B', value: '94 / 100', note: 'Impacto psicológico: Alta Urgencia y Prevención' },
        { label: 'Resultado del Test A/B', value: 'Significancia estadística: Gana B (98.7% probabilidad)', note: 'CTR 4.83% frente a 3.00% de la opción A' },
        { label: 'Acción recomendada', value: 'Pausar variante A y concentrar el 100% del presupuesto en B', note: '+61% más clientes potenciales por el mismo costo publicitario' }
      ],
      decision: 'Al usar el titular B enfocado en evitar quedarse varado en carretera, el taller generó 22 citas de afinamiento adicionales en su primera semana de campaña.'
    },
    dailyUseCases: [
      {
        title: 'Asuntos de correos electrónicos para que los clientes realmente los abran',
        role: 'Encargados de email marketing y boletines corporativos',
        workflow: 'Pega el asunto del correo en el analizador, verifica que tenga entre 40 y 55 caracteres para que entre completo en la bandeja de entrada de Gmail y añade un número o verbo de acción.'
      },
      {
        title: 'Textos principales de anuncios en Google Ads y Facebook Ads',
        role: 'Traffickers y emprendedores que invierten en publicidad digital',
        workflow: 'Redacta tres alternativas, verifica que superen los 80 puntos de atractivo y usa la pestaña "Prueba A/B" para definir con datos cuál dejar activa.'
      },
      {
        title: 'Títulos de publicaciones en redes sociales (Instagram, TikTok, LinkedIn)',
        role: 'Community managers y creadores de contenido',
        workflow: 'Revisa el panel "Huella emocional" para comprobar si el gancho (hook) inicial despierta suficiente "Curiosidad" en los primeros 3 segundos del scroll.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Crear titulares "clickbait" engañosos que prometen algo que tu contenido o servicio no entrega.',
        correction: 'La herramienta advierte explícitamente: no elijas solo por la puntuación más alta; el titular debe ser fiel a tu oferta real para no quemar la reputación de tu marca.'
      },
      {
        mistake: 'Escribir titulares de más de 65 caracteres para Google y no revisar la vista previa móvil.',
        correction: 'Google cortará el final de tu frase; revisa el medidor "Límite visible: 60 caracteres" para que el beneficio principal siempre quede visible.'
      },
      {
        mistake: 'Declarar ganador a un titular en una prueba A/B con solo 15 clics.',
        correction: 'En la pestaña "Prueba A/B", espera a que el modelo confirme "Significancia estadística" antes de tomar decisiones de presupuesto publicitario.'
      }
    ],
    faqs: [
      {
        q: '¿Por qué la presencia de un número sube tanto el puntaje del titular?',
        a: 'Psicológicamente, los números arábigos (ej. "7 consejos" en vez de "siete consejos") actúan como un ancla visual que destaca entre los textos en pantalla y prometen al lector una estructura concreta y fácil de consumir.'
      },
      {
        q: '¿Cómo funciona la pestaña "Prueba A/B" bayesiana?',
        a: 'Utiliza una distribución estadística Beta-Binomial: a partir de las impresiones y clics reales de dos variantes, calcula la curva de probabilidad posterior y determina si la variante B supera a la A con certeza matemática (más del 95%).'
      },
      {
        q: '¿Puedo usar la herramienta para titulares de blogs y noticias?',
        a: 'Totalmente. Es ideal para artículos de blog, noticias corporativas, páginas de aterrizaje (landing pages), publicaciones de LinkedIn y asuntos de correo.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'agencias-de-turismo', label: 'Agencias de Turismo en Lima', reason: 'Para redactar títulos de tours y paquetes promocionales que capten clics en redes sociales y Google.' },
      { slug: 'escuelas-de-danza', label: 'Escuelas de Danza y Talleres en Lima', reason: 'Para lanzar campañas de captación de alumnos con titulares que despierten curiosidad y entusiasmo.' },
      { slug: 'talleres-mecanicos', label: 'Talleres Mecánicos en Lima', reason: 'Para anuncios de mantenimiento estacional donde los titulares de prevención duplican las llamadas.' },
      { slug: 'inmobiliarias', label: 'Inmobiliarias y Agentes en Lima', reason: 'Para redactar encabezados de venta y alquiler de inmuebles con alta tasa de apertura en portales.' }
    ],
    relatedToolSlugs: ['auditor-seo-basico', 'conversor-optimizador-imagenes', 'generador-paletas-corporativas']
  },
  {
    slug: 'generador-paletas-corporativas',
    name: 'Generador de Paletas Corporativas de Color',
    appTitle: 'Chroma · Generador de Paletas Corporativas · Accesibilidad WCAG y Modo Oscuro',
    categoryId: 'marketing',
    categoryTitle: 'Marketing Digital y Diseño',
    badge: 'Identidad Visual / Diseño',
    url: 'https://nubeparapymes.online/herramientas/productividad/generador-paletas-corporativas/',
    shortDesc: 'Diseña combinaciones cromáticas profesionales con armonías matemáticas, simulador de daltonismo, validación de contraste WCAG y exportación a CSS/Tailwind.',
    heroSubtitle: 'Tutorial paso a paso para dominar Chroma: selección por rueda cromática o extracción K-means desde imagen, validación de contraste WCAG (AA/AAA), simulador de visión (daltonismo), matriz cruzada 5×5 y tokens para Tailwind/CSS.',
    purpose: 'Elegir colores al azar para la marca, logotipo o página web de un negocio en Lima genera marcas desarticuladas y textos difíciles de leer en pantallas de celulares o bajo la luz del sol. Chroma es un generador cromático profesional que construye paletas armónicas a partir de un color base (o extrayendo los 5 colores dominantes de una foto con algoritmo K-means), simula cómo perciben tu marca personas con deficiencias visuales (deuteranomalía, protanopia, tritanopia), calcula la relación de contraste WCAG 2.1 contra blanco y negro, genera una matriz cruzada de texto/fondo 5×5, adapta la paleta automáticamente a Modo Claro y Modo Oscuro, y exporta el código listo para CSS `:root`, Tailwind y JSON.',
    interfaceMap: [
      {
        zone: 'Cabecera y Botón de Descarga PDF',
        controls: ['Marca de la suite: Chroma (Diseño corporativo)', 'Botón superior: Descargar PDF (informe de identidad visual para presentación)'],
        description: 'Permite compilar la ficha técnica de la paleta con sus códigos y muestras de accesibilidad en un documento PDF listo para presentar a clientes o socios.'
      },
      {
        zone: 'Módulo "Generador de paleta" por Rueda Armónica',
        controls: ['Selector interactivo: Color Base (HEX) (ej. #3C83F6)', 'Botón: Aleatorio (genera propuestas de color exploratorias)', 'Control: Ángulo de armonía (slider de 0° a 180°)', 'Preajustes rápidos: Análogos (30°) · Tétrada (90°) · Tríada (120°)', '5 muestras calculadas: Base · +30° · +60° · -30° · -60° (con valores HEX y HSL en vivo)', 'Botones: Guardar en galería · Copiar enlace'],
        description: 'Calcula matemáticamente las variantes de color rotando los grados en el espacio de color HSL para asegurar una armonía cromática balanceada.'
      },
      {
        zone: 'Módulo "Extraer paleta de una imagen" con K-Means',
        controls: ['Zona de carga: Sube o arrastra una imagen (JPG, PNG, WEBP)', 'Motor algorítmico: Análisis de píxeles con clustering K-means para aislar 5 colores dominantes', 'Muestras resultantes: Clic en cualquier muestra para copiar su código HEX al portapapeles'],
        description: 'Permite subir la foto de un producto, empaque, local o logotipo existente para extraer de forma matemática los 5 tonos principales de la marca.'
      },
      {
        zone: 'Módulo "Accesibilidad visual" y "Simulador de visión"',
        controls: ['Botones de visión: Visión normal · Deuteranomalía · Protanopia · Tritanopia', 'Panel "Contraste WCAG · base de color": Validación Aa Texto blanco (ratio) · Validación Aa Texto negro (ratio)', 'Sellos de cumplimiento: AA normal (4.5:1) · AAA normal (7.0:1) · Grande AA (3.0:1)'],
        description: 'Garantiza que tus textos sean 100% legibles para todos los usuarios y que tu sitio web cumpla los estándares internacionales de accesibilidad.'
      },
      {
        zone: 'Matriz de Contraste Cruzado 5×5 y Modo Claro / Oscuro',
        controls: ['Tabla cruzada: Texto (filas) sobre Fondo (columnas) con ratio WCAG y badge "Falla" (< 4.5:1) vs. "Combinación accesible"', 'Módulo: Modo claro y oscuro automático (genera tokens de UI con ratio > 7.0:1)'],
        description: 'Audita en una sola cuadrícula qué combinaciones de botones y textos son seguras y genera la versión dark mode de tu interfaz sin perder identidad.'
      },
      {
        zone: 'Módulo "Exportar para desarrolladores" y Galería Local',
        controls: ['Botones de exportación: Variables CSS (:root) · Tailwind · JSON', 'Botón: Copiar código', 'Botón: Compilar y descargar tema', 'Sección: Mi galería (paletas guardadas en este navegador)'],
        description: 'Entrega el código de diseño limpio listo para pegar directamente en la hoja de estilos de tu programador o en tu archivo de configuración de Tailwind.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Elige tu color base corporativo o pulsa "Aleatorio"',
        uiTarget: 'Sección "Generador de paleta" → Campo "Color Base (HEX)" o botón "Aleatorio"',
        instruction: 'Escribe el código hexadecimal del color principal de tu marca (por ejemplo `#1E3A8A` para azul corporativo o `#059669` para verde esmeralda) o presiona "Aleatorio" para explorar combinaciones.',
        whatHappens: 'La muestra central adopta el tono seleccionado y calcula sus valores HSL exactos (Matiz H°, Saturación S%, Luminosidad L%).'
      },
      {
        stepTitle: 'Selecciona una armonía: "Análogos (30°)", "Tétrada (90°)" o "Tríada (120°)"',
        uiTarget: 'Botones de preajuste de ángulo de armonía: "Análogos · 30°", "Tétrada · 90°", "Tríada · 120°"',
        instruction: 'Haz clic en "Análogos (30°)" si buscas una identidad visual sobria y elegante (tonos vecinos en la rueda); elige "Tríada (120°)" si buscas dinamismo y contrastes vivos para destacar botones de llamado a la acción.',
        whatHappens: 'El motor rota los grados en la rueda cromática y genera las 4 muestras secundarias (+30°, +60°, -30°, -60°).'
      },
      {
        stepTitle: 'Extrae colores de una foto de tu producto o local con K-means',
        uiTarget: 'Sección "Extraer paleta de una imagen" → Botón "Sube o arrastra una imagen"',
        instruction: 'Si ya tienes un logotipo o la foto de tu restaurante o producto estrella, arrástrala al recuadro de extracción.',
        whatHappens: 'El algoritmo de agrupamiento K-means analiza la distribución de píxeles y extrae con precisión científica los 5 colores predominantes listos para usar.'
      },
      {
        stepTitle: 'Audita el contraste WCAG en la "Matriz cruzada" y prueba el "Simulador de visión"',
        uiTarget: 'Sección "Accesibilidad visual" → "Contraste WCAG" y "Matriz de contraste cruzado"',
        instruction: 'Revisa si tu color base pasa la norma "AA normal" (ratio ≥ 4.5:1) con texto blanco o texto negro. Luego prueba los botones "Deuteranomalía" y "Protanopia" en el simulador de visión.',
        whatHappens: 'La matriz cruzada 5×5 pinta en verde las combinaciones accesibles y en rojo las que fallan, garantizando que nunca coloques un texto amarillo sobre fondo verde claro.'
      },
      {
        stepTitle: 'Copia el código en "Tailwind" o "Variables CSS" y guarda en "Mi galería"',
        uiTarget: 'Sección "Exportar para desarrolladores" → Botones "CSS", "Tailwind", "Copiar" y "Guardar en galería"',
        instruction: 'Selecciona la pestaña "Variables CSS" o "Tailwind", haz clic en "Copiar" para integrar la paleta en tu proyecto web y pulsa "Guardar en galería" (o "Descargar PDF").',
        whatHappens: 'Obtienes el bloque de código listo para producción y archivas tu paleta en la memoria local del navegador para futuras consultas.'
      }
    ],
    formulas: [
      {
        title: '1. Rotación Angular en el Espacio de Color HSL',
        expression: 'H_nuevo = (H_base ± Δθ) mod 360°   (donde Δθ = 30° para análogos, 90° para tétrada, 120° para tríada)',
        variables: [
          'H (Hue): Matiz cromático de 0° a 360° (0° rojo, 120° verde, 240° azul).',
          'S (Saturation): Pureza del color (0% gris a 100% color puro).',
          'L (Lightness): Luminosidad relativa (0% negro a 100% blanco).'
        ],
        explanation: 'Mantener la saturación y luminosidad calibradas mientras rotas el ángulo de matiz asegura que los colores secundarios armonicen naturalmente con el color base.'
      },
      {
        title: '2. Relación de Contraste de Luminosidad Relativa (Norma WCAG 2.1)',
        expression: 'Ratio de Contraste = (L_1 + 0.05) ÷ (L_2 + 0.05)   (donde L_1 es el color más claro y L_2 el más oscuro en luminancia relativa sRGB)',
        variables: [
          'Nivel AA (Texto normal): Ratio mínimo 4.5:1.',
          'Nivel AAA (Máxima legibilidad): Ratio mínimo 7.0:1.',
          'Nivel AA (Texto grande ≥ 18 pt o 14 pt negrita): Ratio mínimo 3.0:1.'
        ],
        explanation: 'Es el estándar oficial que exige Google y las directrices W3C para asegurar que personas con visión reducida o pantallas con brillo bajo puedan leer el contenido sin fatiga visual.'
      },
      {
        title: '3. Agrupamiento K-Means de Píxeles para Extracción de Paleta',
        expression: 'Minimizar Σ ||p_i − c_k||^2 en el espacio tridimensional RGB para k = 5 centroides',
        variables: [
          'p_i: Vector RGB de cada píxel de la imagen analizada.',
          'c_k: Centroide representativo de cada uno de los 5 grupos dominantes.'
        ],
        explanation: 'En lugar de tomar un promedio plano que resultaría en un marrón grisáceo, K-means encuentra los 5 cúmulos de color más vibrantes y frecuentes de la imagen.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Creación de paleta corporativa accesible para una cafetería de especialidad en Barranco',
      context: 'Una cafetería de café de origen en Barranco busca una identidad visual basada en su color institucional terracota (#C25E38) y necesita validar qué color de texto usar en sus botones y menús web.',
      inputs: [
        { field: 'Color Base (HEX)', value: '#C25E38 (Terracota tostado)' },
        { field: 'Ángulo de armonía', value: 'Análogos (30°) + Tríada (120°) para acento' },
        { field: 'Valores HSL del color base', value: 'H: 17° · S: 55% · L: 49%' }
      ],
      calculationSteps: [
        'Paso 1 (Cálculo de luminancia relativa sRGB): L_base = 0.165.',
        'Paso 2 (Evaluación de contraste contra Blanco #FFFFFF, L = 1.0): Ratio = (1.0 + 0.05) ÷ (0.165 + 0.05) = 1.05 ÷ 0.215 = 4.88:1 (Cumple Nivel AA normal ≥ 4.5:1).',
        'Paso 3 (Evaluación de contraste contra Negro #000000, L = 0.0): Ratio = (0.165 + 0.05) ÷ (0.0 + 0.05) = 0.215 ÷ 0.05 = 4.30:1 (Falla AA para texto normal < 4.5:1).',
        'Paso 4 (Generación de tokens para Modo Oscuro): El motor ajusta la luminosidad de los tonos de fondo elevando la luminancia a 7.4:1 en modo claro y 7.0:1 en modo oscuro.'
      ],
      outputs: [
        { label: 'Color Base', value: '#C25E38', note: 'H 17° · S 55% · L 49%' },
        { label: 'Contraste sobre fondo Terracota', value: 'Texto blanco: 4.88:1 (Aprobado AA)', note: 'El texto negro no pasa el estándar para lectura continua' },
        { label: 'Variables CSS generadas', value: ':root { --color-base: #C25E38; ... }', note: 'Con tokens de Modo Claro y Oscuro automáticos' }
      ],
      decision: 'La cafetería adopta texto blanco (#FFFFFF) para todos sus botones principales y títulos sobre fondo terracota, garantizando que su carta digital sea 100% legible incluso en terrazas bajo la luz del mediodía.'
    },
    dailyUseCases: [
      {
        title: 'Creación del manual de identidad visual y colores de marca',
        role: 'Diseñadores gráficos, agencias de branding y emprendedores',
        workflow: 'Define la paleta en Chroma, verifica el cumplimiento WCAG y pulsa "Descargar PDF" para entregar al cliente una guía de color profesional con códigos HEX, RGB y HSL.'
      },
      {
        title: 'Extracción de colores de fotos de platos o instalaciones para redes sociales',
        role: 'Restaurantes, cafeterías, hoteles y marcas de moda',
        workflow: 'Sube la foto de tu mejor plato en "Extraer paleta de una imagen" y usa los 5 colores resultantes como fondos y tipografías en tus piezas de Instagram.'
      },
      {
        title: 'Implementación técnica de Modo Claro y Modo Oscuro en páginas web',
        role: 'Desarrolladores frontend y maquetadores web',
        workflow: 'Copia el bloque generado en "Variables CSS" o "Tailwind" que ya viene balanceado matemáticamente para que la interfaz se adapte al modo oscuro del sistema.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Colocar texto blanco sobre botones amarillos, cian o verdes claros sin revisar el ratio WCAG.',
        correction: 'Consulta siempre la tarjeta "Contraste WCAG": si el ratio es menor a 4.5:1, la herramienta te alertará para que cambies el texto a negro o uses un tono de fondo más oscuro.'
      },
      {
        mistake: 'Usar colores que se vuelven indistinguibles para personas con daltonismo.',
        correction: 'Pasa siempre por el "Simulador de visión" y pulsa "Deuteranomalía" y "Protanopia" (que afectan a cerca del 8% de los varones) para confirmar que los botones de acción no se confundan con el fondo.'
      },
      {
        mistake: 'Anotar solo el código HEX y olvidar guardar la paleta en tu galería local.',
        correction: 'Haz clic en "Guardar en galería" para conservar tus paletas en el navegador o cópialas directamente a tu hoja de estilos con "Copiar".'
      }
    ],
    faqs: [
      {
        q: '¿Qué significa que una combinación cumpla el estándar "WCAG AA"?',
        a: 'Significa que cumple las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1) nivel AA, exigiendo una relación de contraste mínima de 4.5:1 para texto normal y 3.0:1 para texto grande, garantizando una lectura cómoda y sin esfuerzo visual.'
      },
      {
        q: '¿Cómo funciona la extracción de paleta a partir de una foto?',
        a: 'La herramienta analiza localmente los píxeles de la imagen con el algoritmo K-means, agrupando millones de puntos de color en 5 centros dominantes representativos sin subir la foto a ningún servidor.'
      },
      {
        q: '¿Cómo integro el código exportado en un proyecto con Tailwind CSS?',
        a: 'En la sección "Exportar para desarrolladores", haz clic en el botón "Tailwind" y luego en "Copiar". Pega ese objeto dentro de la propiedad `theme.extend.colors` de tu archivo `tailwind.config.js`.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'diseno-de-interiores', label: 'Diseño de Interiores y Fachadas en Lima', reason: 'Para coordinar la paleta cromática de locales comerciales, pintura de muros y mobiliario.' },
      { slug: 'imprentas', label: 'Imprentas y Papelería Corporativa en Lima', reason: 'Para trasladar con precisión los códigos de color digital a tarjetas, afiches y empaques impresos.' },
      { slug: 'letreros-y-senaletica', label: 'Letreros y Avisos Luminosos en Lima', reason: 'Para seleccionar combinaciones de alto contraste visibles de noche y bajo luz solar directa.' },
      { slug: 'uniformes-empresariales', label: 'Confección de Uniformes en Lima', reason: 'Para armonizar las telas y bordados corporativos con la paleta oficial de la empresa.' }
    ],
    relatedToolSlugs: ['auditor-seo-basico', 'conversor-optimizador-imagenes', 'analizador-titulares']
  }
];
