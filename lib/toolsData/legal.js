export const LEGAL_TOOLS = [
  {
    slug: 'generador-contratos-servicios',
    name: 'Generador de Contratos de Prestación de Servicios',
    appTitle: 'Generador de Contratos de Servicios Profesionales y Acuerdos NDA',
    categoryId: 'legal',
    categoryTitle: 'Legal y Formalización',
    badge: 'Legal / Contratos',
    url: 'https://nubeparapymes.online/herramientas/legal/generador-contratos-servicios/',
    shortDesc: 'Redacta acuerdos de servicios profesionales, locación de servicios o acuerdos de confidencialidad (NDA) con cláusulas claras, hitos de pago y firma digital.',
    heroSubtitle: 'Tutorial paso a paso para redactar contratos de servicios y acuerdos NDA en formato A4: configuración de partes (Contratista y Cliente), cláusulas de entregables, pagos y confidencialidad, firma digital dibujada y exportación en PDF.',
    purpose: 'Iniciar un trabajo o encargo profesional en Lima sin un contrato por escrito expone al contratista a que el cliente agregue tareas fuera de alcance sin pagar más, a retrasos indefinidos en los pagos o a disputas sobre derechos de autor. Esta aplicación redacta contratos formales de locación de servicios profesionales y Acuerdos de Confidencialidad (NDA) con previsualización en tiempo real en formato A4, permite añadir cláusulas personalizadas (penalidades, exclusividad, propiedad intelectual), incorpora un lienzo para dibujar la firma digital a mano con el mouse o el dedo y exporta un PDF listo para suscribir.',
    interfaceMap: [
      {
        zone: 'Selector de Tipo de Documento y Acciones de Cabecera',
        controls: ['Selector de plantilla: Contrato de Servicios · Acuerdo NDA', 'Botones de control: Nuevo documento · Restaurar borrador', 'Pestañas principales: Datos (formulario guiado) · Vista previa (hoja A4 en vivo)'],
        description: 'Permite alternar entre un contrato de prestación de servicios remunerado o un acuerdo de confidencialidad y no divulgación (NDA), con guardado automático del borrador en el navegador.'
      },
      {
        zone: 'Sección "Datos de las Partes" (Contratista y Cliente)',
        controls: ['EL CONTRATISTA: Nombre completo o razón social · Documento / RUC / NIF · Teléfono · Correo electrónico', 'EL CLIENTE: Nombre completo o razón social · Documento / RUC / NIF · Teléfono · Correo electrónico', 'Metadatos: Lugar de firma (ej. Lima) · Fecha de entrada en vigor'],
        description: 'Identifica con precisión jurídica a ambas partes contratantes y fija la jurisdicción y fecha de suscripción del acuerdo.'
      },
      {
        zone: 'Sección "Detalles del Servicio / Acuerdo"',
        controls: ['Modo Servicios: Descripción del servicio (alcance y entregables) · Monto total · Moneda (USD / PEN) · Fecha de entrega · Condiciones de pago', 'Modo NDA: Finalidad / propósito · Información confidencial cubierta · Vigencia en meses'],
        description: 'En contratos de servicios regula el objeto, el precio y los hitos de desembolso; en acuerdos NDA detalla qué información técnica o comercial está protegida y por cuánto tiempo.'
      },
      {
        zone: 'Módulo "Cláusulas personalizadas"',
        controls: ['Botón: Añadir cláusula personalizada', 'Campos por cláusula: Título de la cláusula (ej. Penalizaciones, No competencia) · Contenido de la regla específica', 'Botón: Eliminar cláusula'],
        description: 'Permite incorporar cláusulas adicionales (Séptima, Octava, etc.) adaptadas a las particularidades de tu rubro o requerimientos de tu cliente.'
      },
      {
        zone: 'Lienzo de "Firma digital" y Exportación A4 a PDF',
        controls: ['Lienzo interactivo: Dibuja tu firma con el mouse o el dedo (Firma digital)', 'Botones de firma: Limpiar firma', 'Acción final: Exportar profesional a PDF con un solo clic (descarga directa)'],
        description: 'Permite plasmar tu rúbrica directamente sobre la pantalla táctil o con el cursor del mouse, incrustándola en alta definición en el pie del documento PDF antes de la descarga.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Selecciona la plantilla ("Contrato de Servicios" o "Acuerdo NDA")',
        uiTarget: 'Selector "Tipo de documento" → Botones "Contrato de Servicios" / "Acuerdo NDA"',
        instruction: 'Elige "Contrato de Servicios" si vas a prestar un servicio profesional remunerado (diseño, programación, consultoría, remodelación, asesoría) o "Acuerdo NDA" si vas a intercambiar información confidencial antes de cerrar una alianza.',
        whatHappens: 'El formulario y la vista previa A4 adaptan al instante todas las cláusulas base legales correspondientes al tipo de documento seleccionado.'
      },
      {
        stepTitle: 'Completa los datos de "EL CONTRATISTA" y "EL CLIENTE"',
        uiTarget: 'Pestaña "Datos" → Secciones EL CONTRATISTA y EL CLIENTE',
        instruction: 'Ingresa tu nombre o razón social, tu RUC o DNI, teléfono y correo en el bloque de EL CONTRATISTA. Luego completa los datos equivalentes de EL CLIENTE, indicando "Lima" en el campo "Lugar de firma".',
        whatHappens: 'El encabezado formal del contrato sustituye automáticamente los marcadores de ejemplo por los datos reales de ambas partes.'
      },
      {
        stepTitle: 'Detalla el alcance en "Descripción del servicio" y fija las Condiciones de pago',
        uiTarget: 'Campos "Descripción del servicio", "Monto total", "Moneda", "Fecha de entrega" y "Condiciones de pago"',
        instruction: 'En "Descripción del servicio", redacta los entregables específicos (ej. "Desarrollo de página web corporativa con 5 secciones y catálogo de productos"). Indica el monto total en soles o dólares, la fecha límite y especifica las condiciones (ej. "50% de anticipo al inicio y 50% contra entrega final de entregables aprobados").',
        whatHappens: 'Se redactan automáticamente la Cláusula Primera (Objeto del contrato), Segunda (Contraprestación) y Tercera (Plazo de entrega).'
      },
      {
        stepTitle: 'Agrega cláusulas específicas con "Añadir cláusula personalizada"',
        uiTarget: 'Botón "Añadir cláusula personalizada" → Título y Contenido de la regla',
        instruction: 'Si tu servicio requiere limitar rondas de cambios o definir penalidades por retrasos no imputables al contratista, haz clic en "Añadir cláusula personalizada", escribe el título (ej. "Ajustes y Revisiones") y redacta la condición.',
        whatHappens: 'La nueva cláusula se numera secuencialmente y se integra a la estructura legal del contrato antes de las firmas.'
      },
      {
        stepTitle: 'Dibuja tu firma en el lienzo digital y descarga el PDF en formato A4',
        uiTarget: 'Lienzo "Firma digital" → Botón "Exportar profesional a PDF con un solo clic"',
        instruction: 'Baja al recuadro "Firma digital", dibuja tu rúbrica con el mouse o tu dedo en pantalla táctil, revisa la pestaña "Vista previa" y haz clic en el botón de exportar a PDF.',
        whatHappens: 'La aplicación renderiza un PDF limpio en tamaño A4 con membrete, cuerpo legal completo y la firma gráfica incrustada en el pie de página, listo para remitir al cliente.'
      }
    ],
    formulas: [
      {
        title: '1. Estructura de Contraprestación e Hitos de Desembolso Seguro',
        expression: 'Anticipo Inicial (50%) + Hito Intermedio (Opcional 25%) + Saldo Contra Entrega (25% o 50%) = 100% Importe Total',
        variables: [
          'Anticipo Inicial: Pago mínimo indispensable antes de iniciar horas de trabajo o compra de insumos.',
          'Saldo Contra Entrega: Liquidación final sujeta a la firma del acta de conformidad.'
        ],
        explanation: 'Fijar el 50% de anticipo en la Cláusula Segunda protege el flujo de caja del profesional y cubre los costos iniciales si el cliente abandona el proyecto.'
      },
      {
        title: '2. Retención de Renta de 4ta Categoría en Honorarios Profesionales (Perú)',
        expression: 'Si Recibo por Honorarios > S/ 1,500 y no tiene suspensión → Retención 8% = Monto Total × 0.08   |   Neto a Recibir = Monto Total × 0.92',
        variables: [
          'Monto Total: Importe pactado en el contrato de locación de servicios.',
          'Retención 8%: Descuento que la empresa cliente efectúa y declara a SUNAT mediante PDT 616 / PLAME.'
        ],
        explanation: 'Indicar en el contrato si el monto pactado es "neto" o "bruto antes de retenciones de ley" evita desacuerdos al emitir el Recibo por Honorarios electrónico.'
      },
      {
        title: '3. Penalidad Moratoria Diaria Proporcional',
        expression: 'Penalidad Diaria = (Importe Total × Factor de Penalidad %) ÷ Plazo en Días (Tope máximo habitual: 10% del total)',
        variables: [
          'Factor de Penalidad %: Porcentaje diario acordado (típicamente 0.1% a 0.5% por día de retraso injustificado).'
        ],
        explanation: 'Al usar "Añadir cláusula personalizada", una regla de penalidad recíproca desincentiva tanto el retraso del proveedor como la demora del cliente en entregar insumos necesarios.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Contrato de servicios profesionales de desarrollo y diseño web para una empresa en San Borja',
      context: 'Un desarrollador independiente en Lima celebra un contrato de servicios con una empresa comercial para crear su portal web por un monto de S/ 4,000.00 con entrega en 30 días.',
      inputs: [
        { field: 'Tipo de documento / Lugar de firma', value: 'Contrato de Servicios / Lima' },
        { field: 'EL CONTRATISTA', value: 'Carlos Mendoza Ramos — DNI/RUC 10456789012' },
        { field: 'EL CLIENTE', value: 'Inversiones San Borja S.A.C. — RUC 20601234567' },
        { field: 'Monto total / Moneda / Plazo', value: 'S/ 4,000.00 / PEN / 30 días calendario' },
        { field: 'Condiciones de pago', value: '50% (S/ 2,000) a la firma del contrato y 50% (S/ 2,000) contra entrega y conformidad final' }
      ],
      calculationSteps: [
        'Paso 1 (Desembolso inicial): 50% de S/ 4,000.00 = S/ 2,000.00 a transferir previo al inicio.',
        'Paso 2 (Retención estimada si aplica 4ta categoría): S/ 2,000.00 × 0.08 = S/ 160.00 de retención SUNAT (neto percibido S/ 1,840.00 por hito).',
        'Paso 3 (Cláusula de propiedad intelectual): Los derechos patrimoniales se transfieren formalmente una vez cancelado el 100% de la contraprestación.',
        'Paso 4 (Generación de documento): El motor estructura las 6 cláusulas base, añade la firma digital dibujada y compila el archivo PDF.'
      ],
      outputs: [
        { label: 'Documento generado', value: 'Contrato de Prestación de Servicios Profesionales (A4)', note: '6 cláusulas numeradas completas' },
        { label: 'Condición de propiedad intelectual', value: 'Cláusula Sexta activa', note: 'Código y diseños protegidos hasta el pago final' },
        { label: 'Firma digital', value: 'Rúbrica gráfica incrustada en PDF', note: 'Con fecha y lugar de suscripción en Lima' }
      ],
      decision: 'Con este contrato firmado, si el cliente solicita funciones adicionales no contempladas en el anexo, el contratista tiene base contractual para cotizarlas por separado como adenda.'
    },
    dailyUseCases: [
      {
        title: 'Formalización previa a todo encargo freelance o de consultoría',
        role: 'Diseñadores, programadores, redactores, fotógrafos y consultores',
        workflow: 'Completa los datos de las partes, especifica entregables y fechas, firma en el lienzo digital y envía el PDF al cliente para su firma antes de empezar a trabajar.'
      },
      {
        title: 'Protección de fórmulas, planes comerciales y bases de datos con NDA',
        role: 'Startups, agencias y proveedores B2B en fase de cotización',
        workflow: 'Selecciona "Acuerdo NDA", describe en "Información confidencial cubierta" los datos del proyecto y fírmalo antes de revelar información técnica sensible a un prospecto.'
      },
      {
        title: 'Regulación de pagos por entregables en servicios técnicos',
        role: 'Contratistas de remodelaciones, instalaciones y mantenimiento',
        workflow: 'Fija en "Condiciones de pago" un cronograma contra actas de conformidad parciales para asegurar el financiamiento continuo de la mano de obra y materiales.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Empezar a trabajar con un simple acuerdo verbal o mensajes informales de WhatsApp.',
        correction: 'Generar este borrador en PDF toma menos de 4 minutos y te respalda documentalmente en caso de retrasos de pago, cancelaciones imprevistas o exigencias desmedidas.'
      },
      {
        mistake: 'Dejar el campo "Descripción del servicio" con frases ambiguas como "mantenimiento web general".',
        correction: 'Enumera siempre los entregables específicos, cantidad de páginas, horas de soporte o informes incluidos; la claridad del alcance es lo que evita malentendidos.'
      },
      {
        mistake: 'No estipular expresamente que la propiedad intelectual se transfiere solo tras el pago total.',
        correction: 'Verifica que la Cláusula Sexta mantenga la reserva de derechos hasta la liquidación del 100% de los honorarios pactados.'
      }
    ],
    faqs: [
      {
        q: '¿Qué validez legal tiene en el Perú un contrato de locación de servicios firmado digitalmente?',
        a: 'El Código Civil peruano (artículos 141 y 141-A) reconoce el principio de libertad de forma y la validez de los contratos celebrados por medios electrónicos y firmas electrónicas, siempre que se pueda identificar a las partes y probar su consentimiento.'
      },
      {
        q: '¿Un contrato de servicios puede generar contingencias laborales si no se redacta bien?',
        a: 'Sí. Para evitar la desnaturalización hacia un contrato de trabajo encubierto, el contrato de locación de servicios debe enfatizar la autonomía técnica del contratista, la no sujeción a horario fijo y el pago contra entregables específicos, sin subordinación laboral.'
      },
      {
        q: '¿Mis datos o firmas se quedan guardados en servidores de la aplicación?',
        a: 'No. El procesamiento de texto, dibujo de firma y generación del PDF ocurre íntegramente en la memoria local de tu navegador.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'abogados', label: 'Estudios de Abogados en Lima', reason: 'Para revisar adendas complejas, contratos marco corporativos o resolver controversias contractuales.' },
      { slug: 'notarias', label: 'Notarías en Lima', reason: 'Para legalizar las firmas de las partes cuando se requiera fecha cierta o mayor formalidad probatoria.' },
      { slug: 'diseno-de-interiores', label: 'Diseño de Interiores y Arquitectura en Lima', reason: 'Para delimitar alcances de proyectos creativos y condiciones de aprobación de planos y maquetas.' },
      { slug: 'fotografia-eventos', label: 'Fotógrafos y Productoras en Lima', reason: 'Para estipular tiempos de cobertura, entregables en alta resolución y cesión de derechos de imagen.' }
    ],
    relatedToolSlugs: ['generador-cotizaciones', 'generador-politicas-terminos', 'creador-facturas-proforma']
  },
  {
    slug: 'generador-politicas-devolucion',
    name: 'Generador de Políticas de Devolución',
    appTitle: 'Generador de Políticas de Devolución, Cambios y Garantías',
    categoryId: 'legal',
    categoryTitle: 'Legal y Formalización',
    badge: 'Comercio / Consumidor',
    url: 'https://nubeparapymes.online/herramientas/legal/generador-politicas-devolucion/',
    shortDesc: 'Genera textos transparentes sobre cambios, garantías y reembolsos adaptados a ropa, tecnología, servicios o alimentos, cumpliendo las normas de protección al consumidor.',
    heroSubtitle: 'Tutorial paso a paso para configurar tu política de devoluciones: selección por rubro comercial (Moda, Electrónica, Servicios o Alimentos), plazos en días, condiciones de empaque, garantías de fábrica y sello de validación.',
    purpose: 'En el comercio digital y físico de Lima, carecer de una política de devoluciones clara es una de las principales causas de reclamos ante INDECOPI, disputas en pasarelas de pago y fricción al momento de vender. Este generador redacta en segundos un reglamento claro sobre plazos de cambio, estado del empaque original, garantías de fábrica, causales de exclusión y métodos de reembolso, adaptando las cláusulas al sector de tu negocio (`Ropa y Moda`, `Electrónica`, `Servicios Digitales` o `Alimentos`) con un identificador de validación y sello de autenticidad.',
    interfaceMap: [
      {
        zone: 'Paso 01 — ¿Qué vendes? (Selector de Perfil Comercial)',
        controls: ['Botón 1: Ropa y Moda (Tallas, prendas y accesorios)', 'Botón 2: Electrónica (Gadgets, tecnología y dispositivos)', 'Botón 3: Servicios Digitales (Software, cursos, licencias)', 'Botón 4: Alimentos (Productos perecederos y consumo)'],
        description: 'Aplica reglas predeterminadas según la naturaleza del producto (ej. higiene en prendas íntimas, garantías técnicas en tecnología o exclusión por caducidad en alimentos).'
      },
      {
        zone: 'Paso 02 — Condiciones del Negocio y Parámetros Operativos',
        controls: ['Campo: Nombre del comercio o tienda online', 'Campo: URL del sitio web (opcional)', 'Campo: Plazo de devolución en días (ej. 7, 15, 30 días)', 'Campo: Condición del empaque requerida', 'Opciones de logística inversa: Costos de envío en cambios por talla/color', 'Canales de atención: Correo o WhatsApp para solicitudes'],
        description: 'Permite personalizar los plazos reales que tu logística puede soportar y definir quién asume los fletes de retorno en cambios voluntarios.'
      },
      {
        zone: 'Panel de Generación y Estructura de Cláusulas Base',
        controls: ['Botón: Generar política', 'Sección 1: Plazo de devolución', 'Sección 2: Condiciones del producto', 'Sección 3: Reembolsos y modalidades de pago', 'Sección 4: Cómo solicitar una devolución'],
        description: 'Compila el texto normativo estructurado en 4 capítulos claros para que el consumidor entienda con precisión qué pasos seguir.'
      },
      {
        zone: 'Previsualización y Sellos de Confianza',
        controls: ['Selector de vista: Escritorio · Móvil', 'Insignia: ID DE VALIDACIÓN único', 'Sello gráfico: Sello de autenticidad comercial', 'Botones de acción: Copiar texto · Descargar documento'],
        description: 'Permite leer el texto como lo verá el cliente en su celular antes de publicarlo en tu web, checkout, catálogo de WhatsApp o mostrador.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Elige la categoría de productos que comercializa tu negocio',
        uiTarget: 'Paso "01 — ¿Qué vendes?" → Botones Ropa y Moda / Electrónica / Servicios Digitales / Alimentos',
        instruction: 'Haz clic en el sector que corresponda a tu catálogo. Si vendes celulares o accesorios de cómputo, elige "Electrónica"; si vendes calzado o confecciones, pulsa "Ropa y Moda".',
        whatHappens: 'El asistente precarga cláusulas específicas: garantía técnica de fabricante para tecnología, cambio por talla para moda o exclusión de perecibles para alimentos.'
      },
      {
        stepTitle: 'Configura el nombre de tu tienda y el plazo en días',
        uiTarget: 'Paso "02 — Condiciones" → Campos "Nombre de la tienda" y "Plazo de devolución"',
        instruction: 'Escribe la marca comercial de tu tienda e introduce el número de días corridos que otorgas al cliente para solicitar un cambio o devolución (por ejemplo, 7 días para compras web o 15 días en tienda física).',
        whatHappens: 'El texto redacta automáticamente la frase legal: "Dispones de X días a partir de la recepción de tu pedido para solicitar un cambio o devolución...".'
      },
      {
        stepTitle: 'Establece los requisitos del empaque y los costos de envío',
        uiTarget: 'Campos de condiciones de empaque y gastos de logística inversa',
        instruction: 'Indica la condición física mínima requerida (ej. "Envoltura original intacta, etiquetas colocadas y sin señales de uso") y aclara si los fletes por cambio de talla corren por cuenta del comprador.',
        whatHappens: 'Se formula la Cláusula 2 de Condiciones del Producto protegiendo tu inventario de recibir artículos manipulados o deteriorados.'
      },
      {
        stepTitle: 'Pulsa "Generar política" y revisa la previsualización en móvil',
        uiTarget: 'Botón "Generar política" → Conmutador de vista "Móvil"',
        instruction: 'Haz clic en "Generar política" y cambia a la vista "Móvil" para revisar la legibilidad de las 4 secciones desde la perspectiva de un usuario de smartphone.',
        whatHappens: 'Aparece el texto formateado junto con el "ID DE VALIDACIÓN" y el "Sello de autenticidad" listos para validar su vigencia.'
      },
      {
        stepTitle: 'Copia el texto para tu web o descárgalo para tu Libro de Reclamaciones',
        uiTarget: 'Botones "Copiar texto" o "Descargar documento"',
        instruction: 'Pulsa "Copiar texto" para pegarlo en la sección de Devoluciones de tu tienda online o descárgalo para imprimirlo y colocarlo visible junto a tu Libro de Reclamaciones en tu local físico.',
        whatHappens: 'Obtienes un documento institucional claro que minimiza reclamos infundados y brinda total transparencia a tus clientes.'
      }
    ],
    formulas: [
      {
        title: '1. Tasa de Devoluciones del Negocio (Return Rate)',
        expression: 'Tasa de Devolución (%) = (Unidades Devueltas ÷ Unidades Totales Vendidas) × 100',
        variables: [
          'Unidades Devueltas: Pedidos retornados por talla, falla técnica o desistimiento.',
          'Unidades Totales Vendidas: Volumen total despachado en el periodo evaluado.'
        ],
        explanation: 'En ecommerce de moda en Lima suele oscilar entre 8% y 15%; en electrónica debe mantenerse por debajo del 3%–5% para no erosionar el margen.'
      },
      {
        title: '2. Impacto de la Logística Inversa en el Margen Operativo',
        expression: 'Costo Neto de Devolución = Flete de Retorno + Costo de Reinspección/Reacondicionamiento + Depreciación por Caja Abierta',
        variables: [
          'Flete de Retorno: Costo del courier o motorizado para recoger el paquete.',
          'Depreciación por Caja Abierta: Descuento comercial si el producto no puede revenderse como 100% nuevo.'
        ],
        explanation: 'Estipular en la política que el cliente asume el flete en cambios voluntarios por preferencia personal protege tu rentabilidad.'
      },
      {
        title: '3. Plazo de Reembolso Financiero según Medio de Pago',
        expression: 'Billetera Digital / Transferencia: 24 a 48 horas   |   Tarjeta de Crédito / Débito: 15 a 30 días hábiles (según procesador y banco emisor)',
        variables: [
          'Medio de Pago: Pasarela de pagos (Niubiz, Izipay, Culqi, Mercado Pago, Yape/Plin).'
        ],
        explanation: 'Aclarar que los extornos a tarjetas de crédito dependen del ciclo bancario del emisor evita que el cliente te acuse de retención indebida del dinero.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Redacción de política de cambios y garantías para una tienda online de ropa en Gamarra/Miraflores',
      context: 'Una marca de ropa femenina con tienda web y showroom en Lima necesita una política de cambios que permita cambios por talla en 7 días sin asumir los fletes del courier.',
      inputs: [
        { field: 'Categoría seleccionada', value: '01 — Ropa y Moda (Tallas, prendas y accesorios)' },
        { field: 'Nombre del comercio', value: 'Boutique Urbana Lima' },
        { field: 'Plazo para cambios', value: '7 días calendario desde la entrega' },
        { field: 'Condición del empaque', value: 'Prenda sin lavar, sin olores, con etiquetas intactas y boleta de compra' },
        { field: 'Costos de flete', value: 'El flete de retorno por cambio de talla corre por cuenta del cliente; cambios por falla de fábrica son 100% gratis' }
      ],
      calculationSteps: [
        'Paso 1 (Plazo legal): Se fija un plazo de 7 días, cumpliendo con la expectativa de compra informada.',
        'Paso 2 (Condición física): Se establece la inspección previa de higiene y etiquetas antes de aprobar el cambio.',
        'Paso 3 (Logística inversa): Se separa el costo de envío voluntario del costo por falla técnica de confección.',
        'Paso 4 (Emisión): Se genera el documento con su ID de validación único para publicarlo en el pie de página web.'
      ],
      outputs: [
        { label: 'Capítulo 1 (Plazos)', value: '7 días calendario para cambios', note: 'Notificación previa por WhatsApp' },
        { label: 'Capítulo 2 (Condición)', value: 'Etiquetas adheridas y sin uso', note: 'Prendas íntimas y liquidaciones excluidas' },
        { label: 'Capítulo 3 (Logística)', value: 'Flete de recojo a cargo del comprador en cambios de talla', note: 'Gratis solo por defecto comprobado' }
      ],
      decision: 'La boutique publica esta política en su página web y la comparte en el mensaje de confirmación de pedido por WhatsApp, reduciendo las quejas por cambios en un 80%.'
    },
    dailyUseCases: [
      {
        title: 'Publicación obligatoria en el pie de página de tu tienda online o catálogo',
        role: 'Marcas de ecommerce, tiendas de moda y distribuidores de tecnología',
        workflow: 'Copia el texto generado e insértalo en la página `/politica-de-devoluciones` de tu tienda para generar confianza antes de que el cliente ingrese su tarjeta.'
      },
      {
        title: 'Cartel informativo junto a la caja y Libro de Reclamaciones',
        role: 'Tiendas físicas, galerías comerciales y showrooms',
        workflow: 'Imprime la política en una hoja visible indicando claramente los requisitos de boleta y empaque para agilizar las atenciones en mostrador.'
      },
      {
        title: 'Respuesta estandarizada ante solicitudes de cambio por WhatsApp',
        role: 'Encargados de atención al cliente y soporte postventa',
        workflow: 'Envía el enlace o extracto de los 4 pasos cuando un cliente pida cambio de producto, asegurando que cumpla los requisitos antes de coordinar el courier.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Colocar "No se aceptan cambios ni devoluciones bajo ninguna circunstancia" en todo el local.',
        correction: 'Bajo el Código de Protección al Consumidor en Perú (Ley N.° 29571), si el producto presenta fallas de fábrica o no coincide con lo ofrecido, el consumidor tiene derecho irrenunciable a reparación, cambio o devolución.'
      },
      {
        mistake: 'No especificar quién cubre los costos de envío en los cambios por gusto personal o error de talla del cliente.',
        correction: 'Deja sentado en la Cláusula 2 que los fletes de retorno voluntario corren por cuenta del cliente, evitando pagar dos veces el transporte de un mismo pedido.'
      },
      {
        mistake: 'No fijar un plazo perentorio en días contados desde la recepción del producto.',
        correction: 'Establece un plazo claro (ej. 7 o 15 días); no poner plazo permite que un cliente solicite cambios meses después de adquirido el producto.'
      }
    ],
    faqs: [
      {
        q: '¿Qué exige INDECOPI sobre las políticas de devolución en compras por internet?',
        a: 'El Código de Protección y Defensa del Consumidor exige que las condiciones de cambio, garantía y reembolso se informen de manera previa, clara y accesible al consumidor antes de la compra, respetando las garantías legales mínimas por defectos del producto.'
      },
      {
        q: '¿Puedo excluir ciertos productos como ropa interior o alimentos de las devoluciones?',
        a: 'Sí. Por razones de salubridad e higiene pública, la normativa permite excluir de cambios voluntarios prendas íntimas, cosméticos abiertos, alimentos perecibles y productos personalizados, siempre que se informe antes de la venta.'
      },
      {
        q: '¿Para qué sirve el "ID DE VALIDACIÓN" que aparece en la cabecera?',
        a: 'Es un identificador único que genera la herramienta para asociar el texto con la versión exacta de tus condiciones comerciales ante cualquier consulta de tus clientes.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'abogados', label: 'Abogados especialistas en INDECOPI en Lima', reason: 'Para auditar tus términos comerciales y garantizar estricto cumplimiento del Código de Protección al Consumidor.' },
      { slug: 'courier-y-mensajeria', label: 'Courier y Logística Inversa en Lima', reason: 'Para establecer acuerdos de recojo y retorno de paquetes devueltos con tarifas preferenciales.' },
      { slug: 'envases-y-embalajes', label: 'Empaques y Cintas de Seguridad en Lima', reason: 'Para aplicar precintos que evidencien si la caja del producto fue abierta o manipulada.' },
      { slug: 'zapaterias', label: 'Zapaterías y Tiendas de Calzado en Lima', reason: 'Sector con alta tasa de recambio por tallaje que requiere reglas precisas de suela limpia y empaque intacto.' }
    ],
    relatedToolSlugs: ['generador-politicas-terminos', 'generador-contratos-servicios', 'creador-facturas-proforma']
  },
  {
    slug: 'generador-politicas-terminos',
    name: 'Generador de Políticas de Privacidad y Términos',
    appTitle: 'LegalForge · Generador de Políticas de Privacidad, Términos y Aviso Legal',
    categoryId: 'legal',
    categoryTitle: 'Legal y Formalización',
    badge: 'Cumplimiento / Web',
    url: 'https://nubeparapymes.online/herramientas/legal/generador-politicas-terminos/',
    shortDesc: 'Construye los textos obligatorios de Política de Privacidad, Términos y Condiciones, Política de Cookies y Aviso Legal para tu web corporativa o tienda virtual.',
    heroSubtitle: 'Tutorial paso a paso para usar LegalForge: asistente guiado en 4 pasos (Empresa, Cumplimiento, Tus datos y Documentos), conmutador entre web corporativa y ecommerce, y generación completa de Privacidad, Términos y Aviso Legal.',
    purpose: 'Cualquier página web o tienda online en Lima que recopile nombres, correos o números de WhatsApp a través de formularios o pasarelas de pago está obligada por la Ley de Protección de Datos Personales (Ley N.° 29733) a contar con una Política de Privacidad y Términos de Uso debidamente redactados. LegalForge automatiza la creación de estos 3 documentos esenciales mediante un flujo guiado en 4 pasos, permitiendo alternar entre sitios informativos corporativos y tiendas de comercio electrónico con pasarela de pagos.',
    interfaceMap: [
      {
        zone: 'Barra de Progreso en 4 Pasos y Conmutador de Vistas',
        controls: ['Pasos: 1. Empresa · 2. Cumplimiento · 3. Tus datos · 4. Documentos', 'Conmutador superior: Formulario (edición) · Vista previa (lectura del texto generado)', 'Botón: Limpiar formulario'],
        description: 'Guía al propietario paso a paso para recopilar solo la información estrictamente necesaria y verificar en tiempo real el resultado de los documentos legales.'
      },
      {
        zone: 'Paso 1: Datos de tu Empresa y Tipo de Sitio Web',
        controls: ['Campos: Nombre de la empresa · URL del sitio web · País · Identificación fiscal (RUC opcional) · Domicilio fiscal (opcional)', 'Selector: Tipo de sitio web → Corporativo (Información web) · Tienda online (Comercio electrónico)', 'Botón: Continuar'],
        description: 'Identifica al titular del banco de datos personales y adapta las cláusulas a una web de servicios o a una tienda con pagos online, envíos y cancelaciones.'
      },
      {
        zone: 'Pestañas de Documentos en "Vista previa en vivo"',
        controls: ['Pestaña 1: Privacidad (11 cláusulas completas)', 'Pestaña 2: Términos (Términos y Condiciones de uso y contratación)', 'Pestaña 3: Aviso Legal (Datos registrales y propiedad intelectual)', 'Selector de formato: Copiar texto · Descargar'],
        description: 'Permite alternar entre los tres textos fundamentales y exportarlos en texto plano o descargarlos para su inmediata integración en el pie de página de tu web.'
      },
      {
        zone: 'Estructura Normativa de la Política de Privacidad',
        controls: ['1. Responsable del Tratamiento', '2. Datos que Recopilamos', '3. Uso de Cookies', '4. Finalidad del Tratamiento', '5. Base Legal', '6. Conservación y Cesión de Datos', '7. Derechos del Usuario (ARCO)', '8. Usuarios del EEE (RGPD)', '9. Seguridad', '10. Cambios', '11. Contacto'],
        description: 'Cumple punto por punto con los requisitos formales de la Autoridad Nacional de Protección de Datos Personales (ANPD / MINJUSDH) en el Perú.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Ingresa la razón social, URL de tu sitio web y país',
        uiTarget: 'Paso 1 "Datos de tu empresa" → Campos Nombre de la empresa, URL y País',
        instruction: 'Escribe el nombre de tu empresa o marca registrada, la dirección web completa (ej. `https://miempresa.pe`) y coloca "Perú" en el campo País.',
        whatHappens: 'LegalForge asigna a tu empresa como Responsable del Tratamiento y reemplaza las menciones genéricas en todo el articulado legal.'
      },
      {
        stepTitle: 'Añade tu RUC y domicilio fiscal para mayor solidez jurídica',
        uiTarget: 'Campos "Identificación fiscal (opcional)" y "Domicilio fiscal (opcional)"',
        instruction: 'Escribe tu número de RUC de 11 dígitos y la dirección de tu oficina o local en Lima. Aunque la herramienta los marca como opcionales, en Perú la ley exige identificar formalmente al titular del sitio.',
        whatHappens: 'El bloque "Aviso Legal" y la "Cláusula Primera" de Privacidad quedan con validez formal plena para auditorías o quejas.'
      },
      {
        stepTitle: 'Selecciona "Corporativo" o "Tienda online" según tu modelo',
        uiTarget: 'Botones de Tipo de sitio web: "Corporativo" vs. "Tienda online"',
        instruction: 'Elige "Corporativo" si tu web solo muestra información y formularios de contacto; elige "Tienda online" si vendes productos con carrito, pasarela de pago y entregas a domicilio.',
        whatHappens: 'Si eliges "Tienda online", los Términos y Condiciones incorporan automáticamente las cláusulas especiales de compras, confirmación de precios, pasarelas de pago y envíos.'
      },
      {
        stepTitle: 'Revisa en la "Vista previa" los 3 documentos generados',
        uiTarget: 'Botón superior "Vista previa" → Pestañas "Privacidad", "Términos" y "Aviso Legal"',
        instruction: 'Pasa a la pestaña "Vista previa" y navega entre "Privacidad", "Términos" y "Aviso Legal" para leer el texto redactado adaptado a tu negocio.',
        whatHappens: 'Visualizas el documento completo con cláusulas de Derechos ARCO, cookies, cesión de datos a proveedores de hosting y seguridad de la información.'
      },
      {
        stepTitle: 'Copia y publica cada documento en los enlaces de tu pie de página',
        uiTarget: 'Botón "Copiar" o "Descargar"',
        instruction: 'Copia el contenido de cada pestaña y pégalo en las rutas `/privacidad`, `/terminos` y `/aviso-legal` de tu sitio web, enlazándolas de forma permanente en el footer.',
        whatHappens: 'Tu plataforma web queda blindada frente a inspecciones de la Dirección de Protección de Datos Personales y transmite confianza a tus usuarios.'
      }
    ],
    formulas: [
      {
        title: '1. Matriz de Derechos ARCO bajo Ley N.° 29733 (Perú)',
        expression: 'Acceso (20 días de plazo) + Rectificación / Cancelación / Oposición (10 días de plazo para responder)',
        variables: [
          'Acceso: Derecho del usuario a conocer qué datos almacenas en tus bases de datos.',
          'Rectificación: Corrección de datos desactualizados o inexactos.',
          'Cancelación / Supresión: Eliminación del registro cuando ya no sea necesario para la finalidad contratada.',
          'Oposición: Negativa a que sus datos se usen para fines de marketing o prospección masiva.'
        ],
        explanation: 'La Cláusula Séptima generada establece el canal de correo para que los titulares de datos ejerzan sus derechos ARCO dentro de los plazos de ley.'
      },
      {
        title: '2. Cómputo de Plazos de Conservación y Tratamiento',
        expression: 'Periodo de Tratamiento = Duración de la Relación Contractual + Plazo de Prescripción Tributaria/Legal (5 a 10 años)',
        variables: [
          'Relación Contractual: Tiempo durante el cual el cliente utiliza tu servicio.',
          'Prescripción Legal: Exigencia de SUNAT y Código de Comercio de resguardar comprobantes y operaciones contables por 5 años.'
        ],
        explanation: 'Explicar la finalidad y el tiempo de conservación en la Cláusula 6 evita multas por retención arbitraria de bases de datos.'
      },
      {
        title: '3. Nivel de Consentimiento Previo, Informado, Expreso e Inequívoco',
        expression: 'Consentimiento Válido = Checkbox Desmarcado por Defecto + Enlace Directo a la Política de Privacidad',
        variables: [
          'Obligación legal: No se admiten casillas pre-marcadas en formularios web.'
        ],
        explanation: 'LegalForge genera la redacción exacta que debes colocar junto a tu casilla de verificación: "He leído y acepto la Política de Privacidad".'
      }
    ],
    workedExample: {
      scenarioTitle: 'Generación de políticas para una tienda online de cosmética natural en Miraflores',
      context: 'Un ecommerce de productos orgánicos en Lima necesita publicar sus términos y privacidad antes de activar la pasarela de pagos con tarjeta de crédito.',
      inputs: [
        { field: 'Nombre de la empresa', value: 'Botanika Orgánica S.A.C.' },
        { field: 'URL del sitio web', value: 'https://botanika.pe' },
        { field: 'País / Identificación fiscal', value: 'Perú / RUC 20609876543' },
        { field: 'Tipo de sitio web', value: 'Tienda online (Comercio electrónico)' }
      ],
      calculationSteps: [
        'Paso 1 (Configuración de titularidad): Se asigna a Botanika Orgánica S.A.C. como responsable legal del banco de datos.',
        'Paso 2 (Finalidad de datos): Se activan las cláusulas de procesamiento de pagos, facturación y despacho de compras.',
        'Paso 3 (Términos de venta online): Se generan las reglas de confirmación de stock, precios con IGV y anulaciones de pedido.',
        'Paso 4 (Exportación): Se compilan los textos de Privacidad, Términos y Aviso Legal listos para publicar.'
      ],
      outputs: [
        { label: 'Política de Privacidad', value: '11 cláusulas conforme a Ley 29733 y RGPD', note: 'Canal de derechos ARCO habilitado' },
        { label: 'Términos y Condiciones', value: 'Capítulos de pasarelas de pago y envíos activos', note: 'Obligatorio para afiliar pasarelas Visa/Mastercard' },
        { label: 'Aviso Legal', value: 'Membrete formal con RUC y domicilio en Lima', note: 'Transparencia corporativa ante el consumidor' }
      ],
      decision: 'Con los tres documentos publicados en su footer, la tienda aprueba la revisión de cumplimiento de su pasarela de pagos en menos de 24 horas y puede empezar a cobrar online.'
    },
    dailyUseCases: [
      {
        title: 'Requisito previo para afiliar pasarelas de pago en Perú (Niubiz, Izipay, Culqi)',
        role: 'Tiendas online, academias y venta de cursos digitales',
        workflow: 'Completa los 4 pasos de LegalForge, publica los enlaces en tu footer y envía las URLs a tu pasarela para superar la homologación bancaria.'
      },
      {
        title: 'Cumplimiento de formularios de contacto y captación de leads (Landing Pages)',
        role: 'Agencias, empresas de servicios, constructoras e inmobiliarias',
        workflow: 'Genera la Política de Privacidad y coloca el enlace junto a la casilla de consentimiento de tu formulario para cumplir con la Autoridad de Protección de Datos.'
      },
      {
        title: 'Actualización anual de políticas web de empresas formales',
        role: 'Gerentes de marketing y administradores de páginas corporativas',
        workflow: 'Revisa anualmente las herramientas que recopilan datos en tu web (analítica, píxeles de Facebook, chat de WhatsApp) y actualiza tu política con LegalForge.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Copiar y pegar las políticas de una página extranjera con referencias a leyes de España o México.',
        correction: 'En Perú rige la Ley de Protección de Datos Personales N.° 29733 y el Código de Protección al Consumidor; LegalForge adapta la terminología a la normativa peruana.'
      },
      {
        mistake: 'No enlazar las políticas de forma fija y visible en el pie de página del sitio web.',
        correction: 'Las URLs deben estar disponibles en todas las páginas de tu sitio para que el usuario pueda consultarlas en cualquier momento antes o después de registrar sus datos.'
      },
      {
        mistake: 'Colocar casillas de "Acepto los términos" pre-marcadas en los formularios web.',
        correction: 'La casilla debe estar desmarcada para que el usuario haga clic voluntariamente, cumpliendo el principio de consentimiento expreso e inequívoco.'
      }
    ],
    faqs: [
      {
        q: '¿Por qué la pasarela de pagos me pide tener publicados estos documentos para activarme la cuenta?',
        a: 'Las marcas de tarjetas (Visa, Mastercard, Amex) y procesadores de pago exigen que el comercio informe claramente su razón social, RUC, políticas de privacidad y condiciones de cancelación para prevenir fraudes y contracargos.'
      },
      {
        q: '¿Qué son los derechos ARCO mencionados en la Cláusula 7?',
        a: 'Son los derechos de Acceso, Rectificación, Cancelación y Oposición que tiene cualquier ciudadano sobre sus datos personales según la legislación peruana e internacional.'
      },
      {
        q: '¿El texto generado requiere trámite ante la ANPD (Ministerio de Justicia)?',
        a: 'La política es el documento público informativo para tus usuarios. Si tu empresa maneja bancos de datos con información de clientes en Perú, la ley además exige inscribir dicho banco de datos ante el Registro Nacional de Protección de Datos Personales.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'abogados', label: 'Abogados especialistas en Nuevas Tecnologías en Lima', reason: 'Para auditorías integrales de bancos de datos personales y trámites ante la ANPD.' },
      { slug: 'notarias', label: 'Notarías en Lima', reason: 'Para legalización de libros societarios y trámites de constitución formal de empresas.' },
      { slug: 'contadores', label: 'Estudios Contables en Lima', reason: 'Para alinear tus condiciones de facturación web con los requisitos del comprobante de pago electrónico de SUNAT.' },
      { slug: 'agencias-de-turismo', label: 'Agencias de Turismo en Lima', reason: 'Sector obligado a publicar términos estrictos de reservas, penalidades por cancelación y seguros de viaje.' }
    ],
    relatedToolSlugs: ['generador-politicas-devolucion', 'generador-contratos-servicios', 'auditor-seo-basico']
  }
];
