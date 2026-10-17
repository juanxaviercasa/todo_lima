export const FINANZAS_TOOLS = [
  {
    slug: 'calculadora-precios-venta-igv',
    name: 'Calculadora de Precios de Venta con IGV',
    appTitle: 'Suite de Precios Profesional · Calculadora de Precios de Venta con IGV',
    categoryId: 'finanzas',
    categoryTitle: 'Finanzas y Rentabilidad',
    badge: 'Tributación / Finanzas',
    url: 'https://nubeparapymes.online/herramientas/finanzas/calculadora-precios-venta-igv/',
    shortDesc: 'Calcula márgenes de ganancia reales, desglosa el 18% del IGV sin afectar tu rentabilidad neta y simula precios de venta óptimos para tus productos o servicios.',
    heroSubtitle: 'Tutorial paso a paso para usar las 5 pestañas de la suite (Calculadora, Margen Inverso, Comparador con Inflación, Kits e Historial) y dominar las fórmulas reales de margen neto más IGV (18%).',
    purpose: 'Esta aplicación resuelve el error financiero más frecuente en comercios y pymes de Lima: confundir el recargo sobre el costo (markup) con el margen real sobre el precio de venta, o absorber accidentalmente el 18% del IGV dentro de la utilidad. La herramienta opera con 5 módulos integrados en el navegador que permiten calcular precios unitarios, despejar qué margen real te queda cuando debes igualar el precio de un competidor (Goal Seek), proyectar el impacto de la inflación en tu catálogo completo y armar combos promocionales (Kits) sin perder rentabilidad.',
    interfaceMap: [
      {
        zone: 'Barra superior de divisa y navegación de módulos',
        controls: ['Botones de moneda: S/ · $ · €', 'Pestaña: Calculadora', 'Pestaña: Margen Inverso', 'Pestaña: Comparador', 'Pestaña: Kits', 'Pestaña: Historial'],
        description: 'Permite alternar en tiempo real el símbolo monetario de toda la suite (Soles, Dólares o Euros) y cambiar entre los 5 motores de cálculo sin perder los datos ingresados.'
      },
      {
        zone: 'Pestaña 1 · Calculadora (Modo Directo)',
        controls: ['Campo: Costo del producto', 'Campo: Margen de ganancia deseado (%)', 'Campo: Impuesto aplicable (IGV/IVA) — por defecto 18%', 'Selectores rápidos: IGV General (18%) · IGV Reducido', 'Tarjetas de salida: Precio de venta final · Ganancia neta · Precio neto · Impuesto a pagar', 'Botones: Guardar en historial · Descargar PDF'],
        description: 'Calcula el precio final de venta al público partiendo de tu costo unitario de adquisición o producción y protegiendo tu porcentaje de margen neto sobre el valor de venta sin IGV.'
      },
      {
        zone: 'Pestaña 2 · Margen Inverso (Goal Seek)',
        controls: ['Campo: Precio de venta final competitivo (con impuesto incluido)', 'Campo: Costo del producto', 'Campo: Impuesto aplicable (%)', 'Salidas: Margen real resultante (%) · Precio neto · Impuesto incluido · Ganancia neta', 'Semáforo de viabilidad: Rentable · Margen ajustado · No rentable'],
        description: 'Realiza el cálculo inverso cuando el mercado te obliga a fijar un precio tope (por ejemplo S/ 99.90): primero extrae el IGV para hallar el valor de venta neto y luego revela qué porcentaje real de margen te queda.'
      },
      {
        zone: 'Pestaña 3 · Comparador y Simulador de Inflación',
        controls: ['Control: Simulador de inflación / Aumento de costos proyectado (%)', 'Tabla maestra de productos: Nombre · Costo · Margen % · IGV % · Meta uds/mes', 'Columnas calculadas: Costo ajust. · Precio final · P. equilibrio · Utilidad/uds · Utilidad mensual · Margen real', 'Gráficos: Margen real proyectado por producto · Aporte a la utilidad mensual'],
        description: 'Permite cargar varios productos de tu catálogo (ej. Polo algodón, Zapatillas, Gorra), definir metas de unidades vendidas al mes y simular qué ocurre con tu utilidad total si tus proveedores suben sus costos en un porcentaje determinado.'
      },
      {
        zone: 'Pestaña 4 · Kits (Armado de Combos)',
        controls: ['Selector: Selecciona productos del catálogo', 'Control: Descuento global del kit (%)', 'Salidas: Precio final del kit · Costo combinado · Precio neto (c/desc.) · IGV consolidado'],
        description: 'Agrupa dos o más productos cargados en tu catálogo, aplica un porcentaje de descuento por compra en paquete y verifica que el combo siga dejando ganancia neta positiva antes de lanzar una promoción.'
      },
      {
        zone: 'Pestaña 5 · Historial Local',
        controls: ['Tabla de simulaciones guardadas: Fecha · Costo · Margen · IGV · Precio neto · Impuesto · Ganancia · Precio final'],
        description: 'Almacena localmente en tu navegador cada escenario que guardes desde la pestaña principal para comparar listas de precios históricas sin necesidad de crear cuentas.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Selecciona la moneda e ingresa el costo unitario real',
        uiTarget: 'Botón "PEN" → Pestaña "Calculadora" → Campo "Costo del producto"',
        instruction: 'Haz clic en PEN en el selector de moneda para trabajar en soles. En el campo "Costo del producto", escribe lo que te cuesta adquirir o producir una unidad sin IGV (incluyendo empaque, etiquetas y flete de entrada por unidad).',
        whatHappens: 'La herramienta toma este valor como base de costo puro (C) y actualiza al instante las tres tarjetas de resultados inferiores.'
      },
      {
        stepTitle: 'Define tu margen de ganancia neto sobre la venta',
        uiTarget: 'Campo "Margen de ganancia deseado" + "Impuesto aplicable (IGV/IVA)"',
        instruction: 'Introduce el porcentaje de utilidad que deseas que represente tu ganancia respecto al precio neto de venta (por ejemplo, 30%). Verifica que el campo "Impuesto aplicable" esté en 18% (IGV General en Perú). No ingreses 100% o más, ya que el margen sobre ventas nunca puede igualar o superar el 100% del precio neto.',
        whatHappens: 'El motor divide el costo entre (1 − Margen/100) para obtener el "Precio neto", calcula tu "Ganancia neta" en soles y suma aparte el 18% en la tarjeta "Impuesto a pagar" para mostrarte el "Precio de venta final".'
      },
      {
        stepTitle: 'Evalúa precios de la competencia con Margen Inverso (Goal Seek)',
        uiTarget: 'Pestaña "Margen Inverso" → Campo "Precio de venta final competitivo"',
        instruction: 'Si tus competidores en Lima venden el mismo artículo a un precio cerrado (ej. S/ 150.00 con IGV incluido), abre la pestaña "Margen Inverso", escribe 150 en "Precio de venta final competitivo" y coloca tu costo unitario.',
        whatHappens: 'La calculadora divide primero S/ 150.00 entre 1.18 para separar los S/ 22.88 de IGV que pertenecen a SUNAT, obtiene el precio neto de S/ 127.12 y te muestra el porcentaje exacto de "Margen real resultante" junto con la etiqueta "Rentable", "Margen ajustado" o "No rentable".'
      },
      {
        stepTitle: 'Carga tu catálogo y simula alzas de proveedores en Comparador',
        uiTarget: 'Pestaña "Comparador" → "Tabla maestra de productos" y "Simulador de inflación"',
        instruction: 'Cambia a la pestaña "Comparador", agrega tus productos principales indicando su costo, margen objetivo y tu "Meta uds/mes". Luego mueve el control "Aumento de costos proyectado" (por ejemplo +8%) para simular un incremento de precios de tu proveedor o mayorista.',
        whatHappens: 'La tabla recalcula el "Costo ajust.", tu nuevo "Margen real" si mantienes el precio, el "P. equilibrio" y grafica qué producto aporta más dinero a tu "Utilidad mensual proyectada".'
      },
      {
        stepTitle: 'Arma un paquete promocional en Kits y exporta tu hoja de precios',
        uiTarget: 'Pestaña "Kits" → "Descuento global del kit" → Botones "Guardar en historial" y "Descargar PDF"',
        instruction: 'En la pestaña "Kits", marca dos o más productos de tu tabla maestra y define un "Descuento global del kit" (ej. 10%). Finalmente, vuelve a la pestaña "Calculadora", pulsa "Guardar en historial" para conservar tus precios y haz clic en "Descargar PDF".',
        whatHappens: 'Obtienes el "Precio final del kit" con el "IGV consolidado" desglosado y descargas un reporte PDF limpio con todos los parámetros de entrada y resultados.'
      }
    ],
    formulas: [
      {
        title: '1. Precio Neto de Venta (Valor de Venta sin IGV)',
        expression: 'Precio Neto = Costo ÷ (1 − Margen / 100)',
        variables: [
          'Costo: Costo unitario de adquisición o fabricación (sin IGV).',
          'Margen: Porcentaje de utilidad neta deseado sobre la venta (debe ser menor a 100%).',
          'Precio Neto: Valor de venta base antes de aplicar el impuesto.'
        ],
        explanation: 'A diferencia del recargo simple (Costo × 1.30), dividir entre (1 − 0.30) garantiza que cuando mires tu estado de resultados, tu ganancia represente exactamente el 30% de la facturación neta.'
      },
      {
        title: '2. Desglose de Ganancia Neta, IGV (18%) y Precio de Venta Final',
        expression: 'Ganancia Neta = Precio Neto − Costo   |   IGV = Precio Neto × (Tasa IGV / 100)   |   Precio Final = Precio Neto + IGV',
        variables: [
          'Ganancia Neta: Utilidad bruta unitaria que queda para tu negocio.',
          'IGV: Impuesto General a las Ventas (18% en Perú = 16% IGV + 2% IPM).',
          'Precio Final: Monto total en soles que paga el cliente en boleta o factura.'
        ],
        explanation: 'El IGV se calcula siempre sobre el Precio Neto y se añade por encima. De ese modo, el impuesto trasladado al comprador nunca recorta un solo céntimo de tu Ganancia Neta.'
      },
      {
        title: '3. Fórmula de Margen Inverso (Goal Seek desde Precio con IGV)',
        expression: 'Precio Neto = Precio Final Competitivo ÷ (1 + Tasa IGV / 100)   |   Margen Real (%) = [(Precio Neto − Costo) ÷ Precio Neto] × 100',
        variables: [
          'Precio Final Competitivo: Precio con IGV incluido que deseas cobrar en tienda.',
          'Margen Real (%): Porcentaje real de utilidad neta que te deja ese precio tras descontar el IGV y tu costo.'
        ],
        explanation: 'Nunca restes 18% directamente al precio final (S/ 100 × 0.82 = S/ 82 es incorrecto). La fórmula divide entre 1.18 (S/ 100 ÷ 1.18 = S/ 84.75) para extraer con exactitud matemática la base imponible.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Cálculo de precio en pestaña "Calculadora" para una distribuidora de calzado en Lima',
      context: 'Un comercio adquiere un lote de calzado cuyo costo unitario puesto en almacén es de S/ 100.00 (sin IGV). El propietario requiere asegurar un margen neto real del 30% sobre el valor de venta y facturar con el 18% de IGV.',
      inputs: [
        { field: 'Moneda seleccionada', value: 'S/ (Soles)' },
        { field: 'Costo del producto', value: 'S/ 100.00' },
        { field: 'Margen de ganancia deseado', value: '30 %' },
        { field: 'Impuesto aplicable (IGV/IVA)', value: '18 %' }
      ],
      calculationSteps: [
        'Paso 1 (Precio Neto): S/ 100.00 ÷ (1 − 0.30) = S/ 100.00 ÷ 0.70 = S/ 142.86.',
        'Paso 2 (Ganancia Neta): S/ 142.86 − S/ 100.00 = S/ 42.86 (comprobación: 42.86 ÷ 142.86 = 30.0% exacto).',
        'Paso 3 (IGV 18% sobre el neto): S/ 142.86 × 0.18 = S/ 25.71.',
        'Paso 4 (Precio de venta final): S/ 142.86 + S/ 25.71 = S/ 168.57.'
      ],
      outputs: [
        { label: 'Precio de venta final', value: 'S/ 168.57', note: 'Incluye tu ganancia y el impuesto a pagar' },
        { label: 'Ganancia neta', value: 'S/ 42.86', note: 'Precio neto: S/ 142.86 (30% de margen real)' },
        { label: 'Impuesto a pagar', value: 'S/ 25.71', note: 'IGV 18% calculado sobre el precio neto' }
      ],
      decision: 'Si el comerciante hubiera sumado erróneamente 30% + 18% sobre S/ 100 (cobrando S/ 148.00), su precio neto sin IGV habría sido S/ 125.42 y su margen real habría caído a solo 20.27%, perdiendo S/ 17.44 de ganancia por cada par vendido.'
    },
    dailyUseCases: [
      {
        title: 'Actualización de listas de precios ante subidas de proveedores',
        role: 'Comercios minoristas, ferreterías y distribuidores en Lima',
        workflow: 'Carga tus 10 productos de mayor rotación en la pestaña "Comparador" y desliza el "Simulador de inflación" cuando un mayorista anuncie un reajuste de precios para saber exactamente qué ítems deben subir de tarifa y cuáles pueden absorber parte del costo.'
      },
      {
        title: 'Negociación de descuentos por volumen sin entrar en pérdida',
        role: 'Ejecutivos de ventas B2B y mayoristas',
        workflow: 'Antes de aceptar el precio objetivo que pide un cliente corporativo, digítalo en la pestaña "Margen Inverso" para verificar en 3 segundos si el "Margen real resultante" cubre tus comisiones y gastos operativos.'
      },
      {
        title: 'Diseño de campañas 2x1 o packs promocionales por campaña',
        role: 'Tiendas de ropa, cosmética, regalos y gastronomía',
        workflow: 'Usa la pestaña "Kits" para combinar un producto de alta rotación con uno de baja rotación, aplica un "Descuento global del kit" del 12% y confirma cuál será el "Costo combinado" y el "Precio final del kit" con IGV incluido.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Ingresar el costo del proveedor con IGV incluido en el campo "Costo del producto" cuando estás en Régimen MYPE Tributario o General.',
        correction: 'Si emites factura y usas el IGV de tus compras como crédito fiscal, ingresa siempre tu costo neto sin IGV (divide la factura de tu proveedor entre 1.18). Solo ingresa el costo bruto si perteneces al Nuevo RUS y no tienes derecho a crédito fiscal.'
      },
      {
        mistake: 'Restar 18% directamente al precio de venta al público para calcular cuánto te queda sin IGV.',
        correction: 'El IGV se agrega multiplicando por 1.18, por lo que para quitarlo debes dividir entre 1.18 en la pestaña "Margen Inverso". Multiplicar por 0.82 distorsiona la base imponible y reduce tu utilidad.'
      },
      {
        mistake: 'Intentar escribir 100% o más en "Margen de ganancia deseado" pensando que significa duplicar el costo.',
        correction: 'Duplicar tu costo (vender a S/ 200 lo que costó S/ 100) equivale a un 50% de margen sobre el precio de venta. Por eso la herramienta bloquea valores de 100% o superiores para evitar una división entre cero.'
      }
    ],
    faqs: [
      {
        q: '¿Por qué la calculadora me da S/ 142.86 de precio neto cuando pongo costo S/ 100 y margen 30%, en lugar de S/ 130?',
        a: 'Porque S/ 130 sería un recargo (markup) del 30% sobre el costo, donde tu ganancia (S/ 30) solo representa el 23.08% del precio neto (30 ÷ 130). Al dividir S/ 100 ÷ (1 − 0.30) = S/ 142.86, tu ganancia de S/ 42.86 es exactamente el 30% del precio neto de venta.'
      },
      {
        q: '¿Cómo uso la herramienta si mi negocio está en la Ley de Promoción de Restaurantes y Hoteles (IGV reducido)?',
        a: 'En la pestaña "Calculadora" puedes editar manualmente el campo "Impuesto aplicable (IGV/IVA)" o usar los botones rápidos de tasa para ajustarlo al porcentaje vigente de tu régimen especial (por ejemplo 10% para mypes de restaurantes y hoteles acogidas al régimen especial).'
      },
      {
        q: '¿Dónde se guardan los cálculos cuando pulso "Guardar en historial"?',
        a: 'Se guardan localmente en el almacenamiento de tu propio navegador (localStorage) y puedes revisarlos en la pestaña "Historial" o exportarlos en cualquier momento con el botón "Descargar PDF".'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'contadores', label: 'Estudios Contables en Lima', reason: 'Para validar tu régimen tributario (MYPE Tributario, Régimen Especial o General) y el uso correcto del crédito fiscal del IGV.' },
      { slug: 'ferreterias', label: 'Ferreterías en Lima', reason: 'Rubro con miles de SKUs donde el Comparador y el Simulador de Inflación evitan vender reposiciones a pérdida.' },
      { slug: 'imprentas', label: 'Imprentas en Lima', reason: 'Para cotizar tirajes y paquetes corporativos combinando costos unitarios variables y márgenes por escala.' },
      { slug: 'envases-y-embalajes', label: 'Envases y Embalajes en Lima', reason: 'Para incorporar el costo exacto de cajas, bolsas y etiquetas dentro del costo unitario antes de fijar tu precio.' }
    ],
    relatedToolSlugs: ['generador-cotizaciones', 'creador-facturas-proforma', 'flujo-caja-pymes']
  },
  {
    slug: 'calculadora-sobrecostos-laborales',
    name: 'Calculadora de Sobrecostos Laborales',
    appTitle: 'Dashboard de Simulación de Planillas · Ley Laboral Perú',
    categoryId: 'finanzas',
    categoryTitle: 'Finanzas y Rentabilidad',
    badge: 'Planillas / RR.HH.',
    url: 'https://nubeparapymes.online/herramientas/finanzas/calculadora-sobrecostos-laborales/',
    shortDesc: 'Estima el costo real de contratar personal en Perú contemplando EsSalud, CTS, gratificaciones, vacaciones y regímenes laborales vigentes.',
    heroSubtitle: 'Tutorial completo para usar el Dashboard de Simulación de Planillas: carga individual o por CSV, filtro por departamentos, cálculo de EsSalud/EPS, ONP/AFP, Renta de 5ta Categoría y reportes mensuales/anuales en PDF.',
    purpose: 'Contratar a un trabajador en planilla en Perú implica asumir aportes del empleador y provisiones de beneficios sociales que incrementan el desembolso real por encima del sueldo bruto pactado. Este Dashboard de Simulación de Planillas te permite registrar a todo tu equipo por departamento (Ventas, Marketing, Operaciones, Administración y TI), alternar entre vista mensual y anual, trabajar en Soles o Dólares, calcular retenciones (ONP, AFP y Renta de 5ta Categoría) y conocer con precisión cuánto le cuesta cada puesto a la empresa y cuánto recibe líquido el trabajador.',
    interfaceMap: [
      {
        zone: 'Barra de control superior: Periodo, Moneda y Exportación',
        controls: ['Botón: Descargar Reporte en PDF', 'Conmutador de periodo: Vista Mensual · Vista Anual', 'Conmutador de moneda: Soles · $ Dólares', 'Campo: TC $1 = (Tipo de cambio del día en Soles por Dólar)'],
        description: 'Cambia instantáneamente todas las tarjetas, tablas y gráficos entre el desembolso mensual y el presupuesto anualizado (12 meses), o convierte toda la planilla a dólares según el tipo de cambio ingresado.'
      },
      {
        zone: 'Panel de 5 KPIs Ejecutivos de Planilla',
        controls: ['Tarjeta: Costo Total Empleador', 'Tarjeta: Total Sueldos Netos', 'Tarjeta: Provisión total', 'Indicador: Costo promedio por empleado', 'Indicador: Renta total 5ta'],
        description: 'Resume en la parte superior cuánto desembolsa realmente la empresa en total, cuánto dinero líquido llega al bolsillo de los trabajadores, cuánto debes separar cada mes para beneficios sociales y cuánto se retiene por impuesto a la renta.'
      },
      {
        zone: 'Gráficos de Distribución y Costo por Departamento',
        controls: ['Gráfico 1: Distribución del costo total (Sueldos Netos vs. Descuentos Pensión+Renta vs. Costo Empleador)', 'Gráfico 2: Costo por departamento (Comparativo del Costo Total Empleador por área)'],
        description: 'Visualiza qué proporción del presupuesto se va en sueldos líquidos frente a cargas sociales e identifica qué área (Ventas, Operaciones, TI, etc.) concentra el mayor peso financiero.'
      },
      {
        zone: 'Formulario "Agregar empleado"',
        controls: ['Campos: Nombre del empleado · Cargo', 'Selector: Departamento (Ventas, Marketing, Operaciones, Administración, TI)', 'Campo: Sueldo Bruto', 'Selector: Tipo de Seguro (EsSalud · EPS)', 'Selector: Tipo de Pensión (ONP · AFP)', 'Campo: Horas Extras (mensuales)', 'Casilla: Asignación familiar (tiene hijos · S/ 113.00)', 'Botón: Agregar'],
        description: 'Permite dar de alta a cada colaborador configurando sus condiciones laborales individuales según la legislación peruana.'
      },
      {
        zone: 'Gestión de Plantilla, Filtro por Área e Importación Masiva CSV',
        controls: ['Selector de filtro: Todos los departamentos (Ventas, Marketing, Operaciones, Administración, TI)', 'Botón: Plantilla (descarga formato CSV base)', 'Botón: Importar CSV (carga masiva de planilla)'],
        description: 'Si tienes más de 5 trabajadores, puedes descargar la plantilla CSV, llenarla en Excel y subirla con "Importar CSV" para poblar todo el dashboard en un segundo.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Configura la moneda, el tipo de cambio y el horizonte (Mensual o Anual)',
        uiTarget: 'Botones "Vista Mensual / Vista Anual" y "Soles / $ Dólares"',
        instruction: 'Al abrir el dashboard, selecciona "Soles" (o "$ Dólares" ingresando el tipo de cambio del día en el campo "TC $1 =") y mantén activa la "Vista Mensual" para revisar primero el flujo de caja de cada mes.',
        whatHappens: 'El sistema prepara las tarjetas de KPIs y ajusta los tramos referenciales de RMV, UIT y Renta de 5ta Categoría en la moneda elegida.'
      },
      {
        stepTitle: 'Registra a un trabajador en el formulario "Agregar empleado"',
        uiTarget: 'Sección "Agregar empleado" → Campos Nombre, Cargo, Departamento y Sueldo Bruto',
        instruction: 'Escribe el nombre y cargo del colaborador, elige su "Departamento" (por ejemplo, Operaciones o Ventas) e introduce su "Sueldo Bruto" mensual en soles.',
        whatHappens: 'El formulario habilita el cálculo individual de aportes del empleador y retenciones del trabajador sobre esa remuneración base.'
      },
      {
        stepTitle: 'Configura seguro de salud, sistema de pensiones, horas extras y asignación familiar',
        uiTarget: 'Selectores "Tipo de Seguro", "Tipo de Pensión", "Horas Extras" y casilla "Asignación familiar"',
        instruction: 'Elige "EsSalud" (9%) o "EPS" en Tipo de Seguro; selecciona "ONP" (13%) o "AFP" en Tipo de Pensión; ingresa la cantidad de "Horas Extras (mensuales)" si aplica y marca la casilla "Asignación familiar (tiene hijos · S/ 113.00)" cuando el trabajador acredite hijos menores de edad o en estudios superiores.',
        whatHappens: 'Si marcas Asignación Familiar, los S/ 113.00 (10% de la RMV referencial de S/ 1,130) se suman automáticamente a la remuneración computable para calcular EsSalud, Gratificaciones, CTS y retenciones.'
      },
      {
        stepTitle: 'Pulsa "Agregar" o utiliza "Importar CSV" para cargar toda tu empresa',
        uiTarget: 'Botón "Agregar" o botones "Plantilla" / "Importar CSV"',
        instruction: 'Haz clic en "Agregar" para incorporar al trabajador a la tabla. Si deseas cargar toda tu empresa de golpe, haz clic en "Plantilla", completa los datos de tu equipo en el archivo CSV y súbelo con el botón "Importar CSV".',
        whatHappens: 'Los 5 KPIs superiores ("Costo Total Empleador", "Total Sueldos Netos", "Provisión total", "Costo promedio por empleado" y "Renta total 5ta") y los dos gráficos se actualizan al instante.'
      },
      {
        stepTitle: 'Compara el presupuesto anual por departamento y descarga el reporte en PDF',
        uiTarget: 'Filtro "Todos los departamentos" → Botón "Vista Anual" → "Descargar Reporte en PDF"',
        instruction: 'Usa el selector de departamentos para aislar el costo de un área específica (ej. "Ventas"), conmuta al botón "Vista Anual" para ver el desembolso acumulado de los 12 meses y pulsa "Descargar Reporte en PDF".',
        whatHappens: 'Generas un informe gerencial en PDF con el desglose completo por colaborador, departamento, provisiones sociales y sueldos netos listo para directorio o contabilidad.'
      }
    ],
    formulas: [
      {
        title: '1. Remuneración Computable Mensual (Base Bruta)',
        expression: 'Remuneración Computable (RC) = Sueldo Bruto + Asignación Familiar (S/ 113.00 si aplica) + Monto Horas Extras',
        variables: [
          'Sueldo Bruto: Remuneración básica mensual pactada en contrato.',
          'Asignación Familiar: 10% de la RMV vigente (S/ 113.00 sobre RMV de S/ 1,130).',
          'Monto Horas Extras: Valor de las horas adicionales trabajadas en el mes.'
        ],
        explanation: 'La Asignación Familiar tiene carácter remunerativo en Perú, por lo que forma parte de la base sobre la cual se calculan tanto EsSalud como las provisiones de Gratificaciones, CTS y Vacaciones.'
      },
      {
        title: '2. Provisión Mensual de Beneficios y Costo Total Empleador (Régimen General)',
        expression: 'EsSalud = 9% × RC   |   Gratif. + Bono 9% = (RC ÷ 6) × 1.09   |   CTS = [RC + (RC ÷ 6)] ÷ 12   |   Vacaciones = RC ÷ 12   |   Costo Total Empleador = RC + EsSalud + Provisiones',
        variables: [
          'EsSalud (9%): Aporte obligatorio a cargo exclusivo del empleador.',
          'Gratificación + Bono Ley 30334: Equivalente a 1/6 de RC por mes más el 9% de bonificación extraordinaria (~18.17% mensualizado).',
          'CTS: Doceava parte de la remuneración más un sexto de gratificación (~9.72% mensualizado).'
        ],
        explanation: 'Aunque las gratificaciones se pagan en julio y diciembre y la CTS en mayo y noviembre, la calculadora provisiona su equivalente mes a mes para que conozcas el costo real devengado de cada puesto.'
      },
      {
        title: '3. Descuentos al Trabajador y Sueldo Neto Líquido',
        expression: 'Sueldo Neto = Remuneración Computable − Retención Pensión (ONP 13% o AFP) − Retención Renta 5ta Categoría',
        variables: [
          'Retención Pensión: 13% si está en ONP, o ~11.7%–13% en AFP (10% fondo + prima de seguro + comisión).',
          'Renta 5ta Categoría: (Ingresos Anuales Proyectados − 7 UIT) × Tasa por tramos (8%, 14%, 17%, 20%, 30%) ÷ 12.'
        ],
        explanation: 'Los descuentos de pensión y Renta de 5ta no aumentan el costo del empleador: se descuentan del Sueldo Bruto del trabajador y la empresa los declara y transfiere a la SUNAT / AFP.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Simulación de contratación de un Analista de Operaciones en Lima con hijo a cargo',
      context: 'Una pyme en San Isidro evalúa incorporar en planilla a un Analista de Operaciones con un sueldo básico de S/ 2,500.00 mensuales, afiliado a EsSalud y ONP, con derecho a Asignación Familiar (S/ 113.00) y sin horas extras.',
      inputs: [
        { field: 'Departamento / Cargo', value: 'Operaciones / Analista' },
        { field: 'Sueldo Bruto', value: 'S/ 2,500.00' },
        { field: 'Asignación familiar (S/ 113.00)', value: 'Activada (Sí)' },
        { field: 'Tipo de Seguro / Tipo de Pensión', value: 'EsSalud (9%) / ONP (13%)' }
      ],
      calculationSteps: [
        'Paso 1 (Remuneración Computable RC): S/ 2,500.00 + S/ 113.00 = S/ 2,613.00.',
        'Paso 2 (Aporte EsSalud 9% empleador): S/ 2,613.00 × 0.09 = S/ 235.17.',
        'Paso 3 (Provisiones mensuales de beneficios — Gratif. con Bono 9% + CTS + Vacaciones): S/ 474.69 (Gratif.+Bono) + S/ 254.04 (CTS) + S/ 217.75 (Vacaciones) = S/ 946.48.',
        'Paso 4 (Costo Total Empleador mensualizado): S/ 2,613.00 + S/ 235.17 + S/ 946.48 = S/ 3,794.65 (sobrecosto de +45.2% sobre la base computable).',
        'Paso 5 (Sueldo Neto del trabajador): S/ 2,613.00 − S/ 339.69 (ONP 13%) − S/ 0.00 (exonerado de 5ta por no superar 7 UIT anuales) = S/ 2,273.31.'
      ],
      outputs: [
        { label: 'Costo Total Empleador (Mensual)', value: 'S/ 3,794.65', note: 'Incluye sueldo bruto, asignación familiar, EsSalud y provisiones' },
        { label: 'Provisión total mensual', value: 'S/ 1,181.65', note: 'Aportes y beneficios devengados sobre la base computable' },
        { label: 'Sueldo Neto del trabajador', value: 'S/ 2,273.31', note: 'Tras descontar S/ 339.69 de ONP (Renta 5ta: S/ 0.00)' }
      ],
      decision: 'La empresa debe presupuestar S/ 3,794.65 mensuales en su flujo de caja (S/ 45,535.80 al año en la Vista Anual) y separar en una cuenta de reserva los S/ 946.48 de provisiones cada mes para cubrir sin sobresaltos los pagos de mayo, julio, noviembre y diciembre.'
    },
    dailyUseCases: [
      {
        title: 'Presupuesto anual de áreas antes de abrir nuevas vacantes',
        role: 'Gerentes generales y jefes de administración',
        workflow: 'Carga la planilla actual mediante "Importar CSV", agrega el puesto nuevo que deseas abrir y activa la "Vista Anual" para comprobar cuánto subirá el gasto fijo de ese departamento en los próximos 12 meses.'
      },
      {
        title: 'Cálculo de tarifa hora-hombre real en empresas de servicios',
        role: 'Agencias, contratistas de mantenimiento, seguridad y limpieza',
        workflow: 'Usa el indicador "Costo Total Empleador" de cada técnico u operario y divídelo entre las 192 horas laborales del mes para cotizar servicios a clientes corporativos cubriendo el 100% de las cargas laborales.'
      },
      {
        title: 'Explicación transparente del sueldo bruto vs. sueldo neto al candidato',
        role: 'Responsables de selección y RR.HH.',
        workflow: 'Durante la oferta salarial, ingresa el sueldo bruto propuesto, marca si el candidato está en ONP o AFP y muéstrale el monto exacto de "Total Sueldos Netos" y "Renta total 5ta" que recibirá en su cuenta bancaria.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Presupuestar en caja únicamente el Sueldo Bruto más el 9% de EsSalud y olvidar provisionar mes a mes la CTS y las Gratificaciones.',
        correction: 'Observa siempre la tarjeta "Provisión total" del dashboard y transfiere ese importe cada fin de mes a una subcuenta intangible; así evitarás recurrir a préstamos caros en julio y diciembre.'
      },
      {
        mistake: 'No marcar la casilla "Asignación familiar (S/ 113.00)" cuando el trabajador tiene hijos menores de 18 años (o hasta 24 años cursando estudios superiores).',
        correction: 'La Asignación Familiar en Perú no es proporcional a los días trabajados ni depende de la cantidad de hijos: basta con tener un hijo acreditado para que corresponda el 10% íntegro de la RMV.'
      },
      {
        mistake: 'Subir un archivo CSV con columnas distintas al estándar de la herramienta.',
        correction: 'Descarga siempre primero el archivo base pulsando el botón "Plantilla", respeta los nombres exactos de los departamentos (Ventas, Marketing, Operaciones, Administración, TI) y vuelve a cargarlo con "Importar CSV".'
      }
    ],
    faqs: [
      {
        q: '¿Cómo funciona la retención de Renta de 5ta Categoría que muestra el dashboard?',
        a: 'La herramienta proyecta los ingresos anuales del trabajador (12 sueldos + 2 gratificaciones + otros ingresos gravados) y le resta el tramo inafecto de ley (7 UIT). Si el resultado es mayor a cero, aplica las tasas progresivas acumulativas (8%, 14%, 17%, 20% y 30%) y divide el impuesto anual entre 12 para mostrar la retención mensual.'
      },
      {
        q: '¿Qué diferencia hay entre elegir EsSalud o EPS en el selector "Tipo de Seguro"?',
        a: 'Con EsSalud el empleador aporta íntegramente el 9% a EsSalud. Cuando la empresa cuenta con Plan EPS, una parte del aporte cuenta como crédito (hasta el 2.25% con topes de ley) y se combina con el costo del plan privado.'
      },
      {
        q: '¿Puedo presentar el PDF descargado como declaración ante SUNAT (PLAME)?',
        a: 'No. El reporte PDF es una herramienta gerencial de simulación financiera y control presupuestario interno. La declaración oficial de planillas debe realizarse en el PDT PLAME de SUNAT y el registro en T-Registro.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'contadores', label: 'Estudios Contables en Lima', reason: 'Para gestionar el alta en REMYPE, T-Registro y la declaración mensual del PDT PLAME ante SUNAT.' },
      { slug: 'abogados', label: 'Abogados Laboralistas en Lima', reason: 'Para redactar contratos sujetos a modalidad, reglamentos internos y liquidaciones de beneficios sociales.' },
      { slug: 'uniformes-empresariales', label: 'Uniformes Empresariales en Lima', reason: 'Para presupuestar la dotación de indumentaria y EPPs del personal operativo recién contratado.' },
      { slug: 'empresas-de-limpieza', label: 'Empresas de Limpieza en Lima', reason: 'Para comparar el costo de contratar personal propio frente a tercerizar servicios auxiliares con intermediación formal.' }
    ],
    relatedToolSlugs: ['flujo-caja-pymes', 'generador-contratos-servicios', 'calculadora-precios-venta-igv']
  },
  {
    slug: 'calculadora-prestamos-amortizaciones',
    name: 'Calculadora de Préstamos y Amortizaciones',
    appTitle: 'Calculadora de Préstamos y Amortizaciones · Sistema Francés',
    categoryId: 'finanzas',
    categoryTitle: 'Finanzas y Rentabilidad',
    badge: 'Crédito / Finanzas',
    url: 'https://nubeparapymes.online/herramientas/finanzas/calculadora-prestamos-amortizaciones/',
    shortDesc: 'Genera cronogramas de pagos detallados, compara tasas efectivas (TEA/TEM) y evalúa el impacto real del financiamiento bancario en la liquidez de tu negocio.',
    heroSubtitle: 'Tutorial paso a paso para configurar préstamos bajo el Sistema Francés, simular Periodos de Gracia, comparar bancos (Escenario A vs. B), evaluar tu capacidad de endeudamiento y probar abonos anticipados a capital.',
    purpose: 'Antes de firmar un pagaré o préstamo de capital de trabajo con un banco, caja municipal o financiera en Lima, necesitas saber exactamente cuánto pagarás en intereses totales, qué ocurrirá si pides meses de gracia y cuánto dinero ahorrarás si realizas pagos anticipados a capital. Esta calculadora genera la tabla de amortización mes a mes bajo el Sistema Francés (cuotas constantes), incluye un comparador lado a lado (Escenario A vs. B), un perfilador de riesgo financiero según tu flujo libre y una columna interactiva de "Abono extra" en cada mes.',
    interfaceMap: [
      {
        zone: 'Panel "Configura tu crédito" y Periodo de Gracia',
        controls: ['Slider/Campo: Monto a solicitar ($1,000 a $10,000,000)', 'Slider/Campo: Tasa de interés anual (%)', 'Slider/Campo: Plazo en meses (1 a 120 meses)', 'Botones de Periodo de gracia: Ninguno · Solo intereses · Capitalización'],
        description: 'Define las condiciones base del préstamo comercial o hipotecario y permite simular qué pasa durante los meses de gracia cuando solo pagas intereses o cuando los intereses no pagados se suman (capitalizan) a la deuda.'
      },
      {
        zone: 'Módulo "Comparar escenarios" (Guardar A vs. Guardar B)',
        controls: ['Botón: Guardar A', 'Botón: Guardar B', 'Panel comparativo: A · Interés vs. B · Interés'],
        description: 'Permite congelar la oferta del Banco A (ej. 18% anual a 24 meses) y compararla visualmente contra la oferta de la Caja B (ej. 15.5% anual a 36 meses) para ver cuál cobra menos intereses acumulados.'
      },
      {
        zone: 'Tarjetas de Resumen y Gráfico "Total pagado: capital vs. intereses"',
        controls: ['Tarjeta: Cuota mensual', 'Tarjeta: Total a pagar', 'Tarjeta: Intereses totales', 'Barra de proporción: Capital (%) vs. Intereses (%)', 'Gráfico de área: Evolución capital vs. intereses'],
        description: 'Muestra al instante el impacto total del financiamiento y qué porcentaje de todo lo que desembolsarás corresponde realmente al dinero prestado frente al costo financiero.'
      },
      {
        zone: 'Módulo "Perfilador de capacidad de pago"',
        controls: ['Campo: Ingresos mensuales', 'Campo: Gastos fijos', 'Campo: Deudas actuales', ' Termómetro de riesgo: 30% (Saludable) · 45% (Alerta) · 60%+ (Crítico)'],
        description: 'Calcula tu flujo de caja libre mensual (Ingresos − Gastos fijos − Deudas actuales) y verifica si la nueva cuota del préstamo supera el umbral prudencial del 30% de tus ingresos libres.'
      },
      {
        zone: 'Tabla de Amortización Interactiva con "Abono extra" y Exportación',
        controls: ['Columnas por mes: Mes · Cuota · Capital · Interés · Abono extra (campo editable) · Saldo', 'Botones de exportación: Descargar PDF · Descargar CSV · Imprimir'],
        description: 'Muestra el desglose exacto desde el Mes 1 hasta el final del plazo y permite escribir un monto de prepago en la casilla "Abono extra" de cualquier mes para recalcular instantáneamente el saldo restante y el ahorro de intereses.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Ingresa el monto del crédito, la tasa anual y el plazo en meses',
        uiTarget: 'Panel "Configura tu crédito" → Campos "Monto a solicitar", "Tasa de interés anual" y "Plazo"',
        instruction: 'Desliza o escribe el "Monto a solicitar" (por ejemplo 50,000), ingresa la "Tasa de interés anual" que te cotizó la entidad financiera (ej. 18%) y define el "Plazo" en meses (ej. 24 meses).',
        whatHappens: 'Las tarjetas superiores calculan inmediatamente la "Cuota mensual", el "Total a pagar" y los "Intereses totales", mientras se genera la tabla de amortización completa abajo.'
      },
      {
        stepTitle: 'Prueba el impacto del Periodo de Gracia antes de aceptarlo en el banco',
        uiTarget: 'Botones "Periodo de gracia": Ninguno · Solo intereses · Capitalización',
        instruction: 'Alterna entre "Ninguno", "Solo intereses" y "Capitalización". Observa cómo cambia la tarjeta "Intereses totales" cuando eliges "Capitalización" (gracia total donde no pagas nada al inicio pero los intereses se suman al capital).',
        whatHappens: 'La herramienta recalcula el saldo inicial post-gracia y te demuestra cuánto encarece la cuota mensual y el costo total aceptar meses de gracia con capitalización.'
      },
      {
        stepTitle: 'Compara dos propuestas bancarias con "Guardar A" y "Guardar B"',
        uiTarget: 'Sección "Comparar escenarios" → Botones "Guardar A" y "Guardar B"',
        instruction: 'Con los datos de la primera entidad en pantalla, haz clic en "Guardar A". Luego modifica la tasa y el plazo con los datos de la segunda entidad financiera y pulsa "Guardar B".',
        whatHappens: 'Se despliega el panel de comparación directa mostrando la diferencia exacta de cuota mensual e intereses totales entre la opción A y la opción B.'
      },
      {
        stepTitle: 'Valida si tu negocio puede pagar la cuota en el "Perfilador de capacidad de pago"',
        uiTarget: 'Sección "Perfilador de capacidad de pago" → Ingresos mensuales, Gastos fijos y Deudas actuales',
        instruction: 'Escribe los "Ingresos mensuales" promedio de tu empresa, tus "Gastos fijos" operativos (alquiler, planilla, servicios) y las cuotas de tus "Deudas actuales".',
        whatHappens: 'El indicador evalúa qué porcentaje de tu liquidez libre absorberá la nueva cuota y emite el diagnóstico: "La cuota está dentro de un rango saludable" (< 30%), supera el 30% o compromete más del 60%.'
      },
      {
        stepTitle: 'Simula prepagos en la columna "Abono extra" y descarga el cronograma en PDF o CSV',
        uiTarget: 'Sección "Tabla de amortización" → Columna "Abono extra" → Botones "Descargar PDF" / "Descargar CSV"',
        instruction: 'Baja a la "Tabla de amortización", ubica el mes en que tu negocio recibe mayor liquidez (por ejemplo, el Mes 6 o Mes 12 por campaña navideña) y escribe un monto en la casilla "Abono extra". Finalmente, haz clic en "Descargar PDF" o "Descargar CSV".',
        whatHappens: 'El abono extraordinario se resta directamente del saldo de capital de ese mes, reduciendo los intereses de todos los meses siguientes, y puedes descargar el cronograma completo para tu contabilidad.'
      }
    ],
    formulas: [
      {
        title: '1. Tasa Mensual Periódica y Cuota Fija del Sistema Francés',
        expression: 'i = Tasa Anual ÷ 12   (o desde TEA: TEM = (1 + TEA)^(1/12) − 1)   |   Cuota (C) = P × [ i × (1 + i)^n ] ÷ [ (1 + i)^n − 1 ]',
        variables: [
          'P: Monto principal del préstamo solicitado.',
          'i: Tasa de interés mensual en tanto por uno.',
          'n: Plazo total de amortización en meses.'
        ],
        explanation: 'En el Sistema Francés la cuota mensual (C) permanece constante, pero al inicio pagas mayor proporción de intereses y menor de capital; conforme baja el saldo, la proporción se invierte.'
      },
      {
        title: '2. Descomposición Mensual de Interés, Capital y Efecto del Abono Extra',
        expression: 'Interés Mes k (I_k) = Saldo_{k-1} × i   |   Amortización Normal (A_k) = Cuota − I_k   |   Nuevo Saldo_k = Saldo_{k-1} − A_k − Abono_Extra_k',
        variables: [
          'Saldo_{k-1}: Capital vivo pendiente al cierre del mes anterior.',
          'Abono_Extra_k: Prepago voluntario ingresado en la columna "Abono extra" del mes k.'
        ],
        explanation: 'Como el interés del mes siguiente (I_{k+1}) se calcula multiplicando la tasa i por el Nuevo Saldo_k, cada sol que metes en "Abono extra" deja de generar intereses por el resto de la vida del préstamo.'
      },
      {
        title: '3. Ratio de Compromiso de Liquidez Libre (Perfilador de Capacidad de Pago)',
        expression: 'Ingreso Libre = Ingresos Mensuales − Gastos Fijos − Deudas Actuales   |   Ratio de Carga (%) = (Cuota Mensual ÷ Ingreso Libre) × 100',
        variables: [
          'Ingreso Libre: Flujo neto disponible antes de tomar el nuevo préstamo.',
          'Ratio de Carga (%): Saludable hasta 30%, precaución entre 30% y 45%, alto riesgo sobre 45%–60%.'
        ],
        explanation: 'Un crédito comercial nunca debe evaluarse sobre las ventas brutas, sino sobre el flujo operativo libre después de cubrir costos fijos y obligaciones previas.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Préstamo de capital de trabajo por S/ 50,000 a 24 meses y simulación de abono extra en el mes 6',
      context: 'Una imprenta en Breña solicita S/ 50,000 para comprar una guillotina industrial a 24 meses con una tasa anual del 18% (1.5% mensual). Sus ingresos mensuales son S/ 28,000, sus gastos fijos S/ 16,000 y sus deudas actuales S/ 2,000.',
      inputs: [
        { field: 'Monto a solicitar', value: '50,000' },
        { field: 'Tasa de interés anual / Plazo', value: '18 % anual (1.5 % mensual) / 24 meses' },
        { field: 'Periodo de gracia', value: 'Ninguno' },
        { field: 'Perfilador (Ingresos / Gastos / Deudas)', value: '28,000 / 16,000 / 2,000' }
      ],
      calculationSteps: [
        'Paso 1 (Cuota mensual constante): C = 50,000 × [0.015 × (1.015)^24] ÷ [(1.015)^24 − 1] = 50,000 × 0.049924 = 2,496.21.',
        'Paso 2 (Total a pagar e Intereses totales sin prepagos): 2,496.21 × 24 = 59,908.93 → Intereses totales = 9,908.93 (83.5% capital vs. 16.5% intereses).',
        'Paso 3 (Mes 1 en la tabla): Interés = 50,000 × 0.015 = 750.00 | Capital amortizado = 2,496.21 − 750.00 = 1,746.21 | Saldo fin Mes 1 = 48,253.79.',
        'Paso 4 (Perfilador de capacidad de pago): Ingreso libre = 28,000 − 16,000 − 2,000 = 10,000 → Ratio = 2,496.21 ÷ 10,000 = 24.96% (< 30%, Rango Saludable).'
      ],
      outputs: [
        { label: 'Cuota mensual', value: '2,496.21', note: 'Cuota fija en los 24 periodos del cronograma' },
        { label: 'Total a pagar', value: '59,908.93', note: 'Capital: 50,000.00 (83.5%) + Intereses: 9,908.93 (16.5%)' },
        { label: 'Diagnóstico del Perfilador', value: '25.0% de carga (< 30%)', note: 'La cuota está dentro de un rango saludable sobre tu ingreso libre' }
      ],
      decision: 'El crédito es financieramente viable porque compromete menos del 30% del flujo libre. Además, si en el Mes 6 la imprenta ingresa un "Abono extra" de 5,000 en la tabla interactiva, recorta drásticamente el saldo vivo y ahorra más de 1,450 en intereses futuros.'
    },
    dailyUseCases: [
      {
        title: 'Auditoría de propuestas de bancos vs. cajas municipales',
        role: 'Dueños de pymes y gerentes financieros',
        workflow: 'Guarda la cotización del banco tradicional con "Guardar A" (menor tasa pero plazo más largo) y la de la caja municipal con "Guardar B" (mayor tasa pero plazo corto) para ver en qué escenario desembolsas menos intereses totales.'
      },
      {
        title: 'Planificación de amortizaciones anticipadas tras campañas fuertes',
        role: 'Comercios con estacionalidad (Campaña Escolar, Fiestas Patrias, Navidad)',
        workflow: 'Introduce en la columna "Abono extra" de los meses de marzo, agosto y diciembre el excedente de caja que planeas prepagar al banco para proyectar cuántos meses antes terminarás de cancelar el préstamo.'
      },
      {
        title: 'Evaluación del costo oculto del "Periodo de Gracia"',
        role: 'Empresas que adquieren maquinaria o remodelan locales',
        workflow: 'Activa el botón "Capitalización" en "Periodo de gracia" antes de aceptar los "2 o 3 meses sin pagar" que ofrece el ejecutivo bancario y comprueba cuánto sube tu deuda principal.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mirar únicamente si la "Cuota mensual" es baja sin revisar la tarjeta "Intereses totales".',
        correction: 'Alargar un crédito de 24 a 60 meses reduce la cuota mensual, pero puede más que duplicar los intereses totales pagados. Revisa siempre la barra "Total pagado: capital vs. intereses".'
      },
      {
        mistake: 'Hacer abonos extraordinarios en los últimos 3 meses del préstamo esperando un gran ahorro.',
        correction: 'Como muestra el gráfico "Evolución: capital vs. intereses", en el Sistema Francés la mayor carga de intereses se cobra en el primer tercio del plazo. Los abonos extra en la tabla generan su máximo ahorro durante los primeros meses.'
      },
      {
        mistake: 'No incluir el seguro de desgravamen y portes bancarios al evaluar la tasa anual.',
        correction: 'En Perú, pide siempre la TCEA (Tasa de Costo Efectivo Anual) en la hoja resumen del banco e introdúcela en el campo "Tasa de interés anual" para reflejar el costo real con seguros incluidos.'
      }
    ],
    faqs: [
      {
        q: '¿Qué diferencia hay entre los botones "Solo intereses" y "Capitalización" en el Periodo de Gracia?',
        a: 'En "Solo intereses" (gracia parcial), durante los meses de gracia pagas únicamente el interés mensual y tu deuda original no sube. En "Capitalización" (gracia total), no desembolsas nada durante esos meses, pero los intereses no pagados se suman al capital prestado, encareciendo todas las cuotas posteriores.'
      },
      {
        q: '¿Cómo uso la columna "Abono extra" de la tabla de amortización?',
        a: 'Haz clic directamente sobre el recuadro de la columna "Abono extra" en la fila del mes en que planeas realizar una amortización anticipada y escribe el monto. La tabla recalculará en tiempo real el interés y el saldo de todos los meses siguientes.'
      },
      {
        q: '¿En Perú los bancos pueden cobrar penalidad por hacer un "Abono extra" (prepago)?',
        a: 'Para créditos bajo normas de protección al consumidor y MYPE supervisados por la SBS, tienes derecho a realizar pagos anticipados (reduciendo cuota o plazo) sin penalidades ni comisiones por prepago.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'contadores', label: 'Estudios Contables en Lima', reason: 'Para registrar correctamente el escudo fiscal de los intereses financieros y el cronograma de devengos en tu contabilidad.' },
      { slug: 'equipos-gastronomicos', label: 'Equipos Gastronómicos en Lima', reason: 'Uno de los rubros donde más se financian hornos, cámaras de frío y cocinas industriales mediante pagarés o leasing.' },
      { slug: 'agentes-inmobiliarios', label: 'Agentes Inmobiliarios en Lima', reason: 'Para evaluar financiamiento hipotecario comercial o adquisición de locales y almacenes.' },
      { slug: 'casas-de-cambio', label: 'Casas de Cambio en Lima', reason: 'Si tu préstamo está denominado en dólares y tus ingresos son en soles, necesitas optimizar el tipo de cambio en cada vencimiento.' }
    ],
    relatedToolSlugs: ['flujo-caja-pymes', 'calculadora-precios-venta-igv', 'calculadora-sobrecostos-laborales']
  },
  {
    slug: 'flujo-caja-pymes',
    name: 'Flujo de Caja para Pymes',
    appTitle: 'Flujo de Caja y Cobranzas · Centro Operativo Local',
    categoryId: 'finanzas',
    categoryTitle: 'Finanzas y Rentabilidad',
    badge: 'Tesorería / Finanzas',
    url: 'https://nubeparapymes.online/herramientas/finanzas/flujo-caja-pymes/',
    shortDesc: 'Proyecta tus ingresos y egresos semanales o mensuales para anticipar déficits de liquidez, programar pagos a proveedores y evitar quiebres de caja.',
    heroSubtitle: 'Tutorial paso a paso para operar el Centro de Flujo de Caja y Cobranzas: registro de ingresos y egresos, control de vencimientos pendientes vs. cobrados, resumen por categoría y copias de seguridad en JSON.',
    purpose: 'Un negocio en Lima puede tener excelentes ventas en papel y aun así quedarse sin efectivo el día 30 para pagar planillas, alquiler o SUNAT porque sus clientes le pagan a 30 o 60 días. Esta aplicación actúa como tu libro de tesorería y cobranzas en el navegador: separa el dinero que ya entró o salió ("Pagado / cobrado") de las cuentas por cobrar y por pagar ("Pendiente"), agrupa tus flujos en 8 categorías operativas y guarda todo con respaldo JSON verificable.',
    interfaceMap: [
      {
        zone: 'Cabecera del Centro Operativo Local y Respaldo JSON',
        controls: ['Botón: Respaldo JSON (exportación e importación con firma de integridad v2)', 'Botón: Guía de uso', 'Barra de conexión con suite: Portal · Cotizaciones · CRM · Caja · Inventario · Tareas'],
        description: 'Garantiza que todos los movimientos registrados en tu navegador puedan descargarse en un archivo JSON seguro para respaldar tu tesorería semanalmente o restaurarla en otra computadora.'
      },
      {
        zone: 'Panel de 4 KPIs de Liquidez en Vivo (#cash-kpis)',
        controls: ['Tarjeta 1: Saldo registrado (ingresos − egresos)', 'Tarjeta 2: Ingresos (todos los movimientos)', 'Tarjeta 3: Egresos (todos los movimientos)', 'Tarjeta 4: Pendiente (por cobrar o pagar)'],
        description: 'Muestra de un vistazo tu posición neta de caja, el volumen total de entradas y salidas registradas y el monto acumulado que aún está en estado "Pendiente" de cobro o pago.'
      },
      {
        zone: 'Formulario "Nuevo movimiento" (#cash-form)',
        controls: ['Selector: Tipo (Ingreso · Egreso)', 'Selector: Estado (Pendiente · Pagado / cobrado)', 'Campo: Descripción *', 'Campo: Monto *', 'Selector: Categoría (Ventas, Servicios, Compras, Personal, Impuestos, Operación, Financiamiento, Otros)', 'Campo: Fecha de vencimiento', 'Campo: Cliente o proveedor', 'Campo: Notas', 'Botones: Guardar movimiento · Limpiar'],
        description: 'Permite registrar tanto cobros y pagos ya ejecutados como facturas por cobrar o compromisos por vencer, vinculándolos a su cliente/proveedor y fecha límite.'
      },
      {
        zone: 'Panel "Resumen por categoría" y Tabla "Movimientos y vencimientos" (#cash-table)',
        controls: ['Desglose automático: Resumen por categoría', 'Selector de filtro rápido: Todos · Ingresos · Egresos · Pendientes · Pagados / cobrados', 'Acciones en fila: Cambiar estado (Pendiente ↔ Pagado/cobrado) · Eliminar', 'Botón: Eliminar todos'],
        description: 'Permite auditar en qué rubro se va el dinero (Compras, Personal, Impuestos, etc.), filtrar únicamente las cuentas "Pendientes" para gestionar cobranzas del día y marcar con un clic cuando el dinero ya ingresó al banco.'
      }
    ],
    tutorialSteps: [
      {
        stepTitle: 'Registra tus cobros y ventas ejecutadas como "Ingreso" + "Pagado / cobrado"',
        uiTarget: 'Formulario "Nuevo movimiento" → Tipo: "Ingreso" → Estado: "Pagado / cobrado"',
        instruction: 'En el bloque "Nuevo movimiento", elige Tipo "Ingreso" y Estado "Pagado / cobrado". Escribe la "Descripción *" (ej. Venta lote de mercadería), el "Monto *", selecciona la Categoría ("Ventas" o "Servicios"), indica el nombre en "Cliente o proveedor" y haz clic en "Guardar movimiento".',
        whatHappens: 'El importe se suma de inmediato a las tarjetas "Ingresos" y "Saldo registrado" en la parte superior del centro operativo.'
      },
      {
        stepTitle: 'Carga las facturas al crédito como "Ingreso" + "Pendiente" con fecha de vencimiento',
        uiTarget: 'Formulario "Nuevo movimiento" → Tipo: "Ingreso" → Estado: "Pendiente" → "Fecha de vencimiento"',
        instruction: 'Cuando entregues un pedido o servicio con pago a 15 o 30 días, selecciona Tipo "Ingreso", cambia el Estado a "Pendiente", coloca el monto, asigna la "Fecha de vencimiento" pactada y escribe el nombre del cliente y su teléfono en "Notas". Pulsa "Guardar movimiento".',
        whatHappens: 'El registro alimenta el indicador "Pendiente (por cobrar o pagar)" y queda programado en la tabla de vencimientos para tu seguimiento de cobranza.'
      },
      {
        stepTitle: 'Programa tus costos fijos, proveedores y tributos como "Egreso"',
        uiTarget: 'Formulario "Nuevo movimiento" → Tipo: "Egreso" → Selector "Categoría"',
        instruction: 'Registra todas tus salidas del mes eligiendo Tipo "Egreso": usa la categoría "Compras" para proveedores de mercadería, "Personal" para sueldos y EsSalud, "Impuestos" para IGV/Renta SUNAT, "Operación" para alquiler, luz e internet, y "Financiamiento" para cuotas bancarias. Marca "Pendiente" si aún no los pagas o "Pagado / cobrado" si ya salieron de tu cuenta.',
        whatHappens: 'El panel "Resumen por categoría" agrupa automáticamente cuánto peso tiene cada centro de costo dentro de la estructura de egresos de tu negocio.'
      },
      {
        stepTitle: 'Filtra tus "Pendientes" cada mañana y actualiza el estado al cobrar o pagar',
        uiTarget: 'Sección "Movimientos y vencimientos" → Selector de filtro "Pendientes"',
        instruction: 'En la tabla "Movimientos y vencimientos", despliega el filtro y selecciona "Pendientes". Revisa las fechas de vencimiento de tus clientes y proveedores; conforme un cliente te transfiera o canceles un recibo, cámbialo en la propia tabla a "Pagado / cobrado".',
        whatHappens: 'El monto sale de la bolsa "Pendiente" y queda conciliado como flujo real ejecutado.'
      },
      {
        stepTitle: 'Descarga tu copia de seguridad con "Respaldo JSON"',
        uiTarget: 'Cabecera "Centro operativo local" → Botón "Respaldo JSON"',
        instruction: 'Al cerrar tu jornada o cada viernes, pulsa el botón "Respaldo JSON" en la parte superior de la interfaz para descargar tu archivo de seguridad.',
        whatHappens: 'La herramienta genera un archivo JSON con esquema v2 y firma de integridad criptográfica para que puedas restaurar todo tu historial incluso si cambias de computadora o limpias el navegador.'
      }
    ],
    formulas: [
      {
        title: '1. Saldo Registrado y Flujo Neto del Periodo',
        expression: 'Saldo Registrado = Σ Ingresos − Σ Egresos',
        variables: [
          'Σ Ingresos: Suma de las entradas registradas en las categorías Ventas, Servicios, Financiamiento u Otros.',
          'Σ Egresos: Suma de las salidas por Compras, Personal, Impuestos, Operación y Financiamiento.'
        ],
        explanation: 'Es la métrica central de la primera tarjeta KPI: si es positiva, tu operación genera superávit neto; si es negativa, estás consumiendo capital de trabajo acumulado.'
      },
      {
        title: '2. Liquidez Disponible Real vs. Bolsa Pendiente (Por Cobrar / Por Pagar)',
        expression: 'Caja Ejecutada = Σ Ingresos (Cobrados) − Σ Egresos (Pagados)   |   Brecha de Vencimientos = Σ Ingresos (Pendientes) − Σ Egresos (Pendientes)',
        variables: [
          'Caja Ejecutada: Dinero real que ya ingresó y salió de tus cuentas bancarias o caja chica.',
          'Brecha de Vencimientos: Diferencia entre lo que tus clientes te deben a corto plazo y lo que debes pagar en los próximos vencimientos.'
        ],
        explanation: 'Separar los movimientos en estado "Pagado / cobrado" de los "Pendientes" evita el error fatal de gastar hoy el dinero de una factura que el cliente recién pagará dentro de 30 días.'
      },
      {
        title: '3. Peso Porcentual por Categoría de Egreso',
        expression: 'Participación Categoría (%) = (Egreso de la Categoría ÷ Total Egresos) × 100',
        variables: [
          'Categorías de la herramienta: Ventas, Servicios, Compras, Personal, Impuestos, Operación, Financiamiento, Otros.'
        ],
        explanation: 'Te permite detectar de inmediato en el panel "Resumen por categoría" si los costos fijos de "Operación" o "Personal" están absorbiendo una proporción excesiva de tus ingresos.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Control semanal de tesorería y cobranzas en una empresa de servicios técnicos en Lima',
      context: 'Una empresa de mantenimiento de aire acondicionado en Surco registra en la herramienta sus movimientos de la quincena para saber si podrá cubrir su planilla y sus compras de repuestos.',
      inputs: [
        { field: 'Movimiento 1 (Ingreso · Pagado/cobrado · Servicios)', value: 'Mantenimiento clínica — S/ 8,500.00' },
        { field: 'Movimiento 2 (Ingreso · Pendiente · Servicios)', value: 'Factura oficina corporativa (vence el 28) — S/ 4,200.00' },
        { field: 'Movimiento 3 (Egreso · Pagado/cobrado · Compras)', value: 'Compra de gas refrigerante y repuestos — S/ 3,100.00' },
        { field: 'Movimiento 4 (Egreso · Pendiente · Personal)', value: 'Quincena de técnicos (vence el 30) — S/ 3,800.00' }
      ],
      calculationSteps: [
        'Paso 1 (Total Ingresos registrados): S/ 8,500.00 + S/ 4,200.00 = S/ 12,700.00.',
        'Paso 2 (Total Egresos registrados): S/ 3,100.00 + S/ 3,800.00 = S/ 6,900.00.',
        'Paso 3 (Saldo registrado global): S/ 12,700.00 − S/ 6,900.00 = S/ 5,800.00.',
        'Paso 4 (Bolsa Pendiente total y liquidez efectiva hoy): En caja real hoy hay S/ 8,500 − S/ 3,100 = S/ 5,400.00 en banco, suficiente para cubrir los S/ 3,800.00 de "Personal" el día 30 incluso si el cliente de S/ 4,200.00 se retrasa unos días.'
      ],
      outputs: [
        { label: 'Saldo registrado', value: 'S/ 5,800.00', note: 'Diferencia total ingresos − egresos' },
        { label: 'Ingresos / Egresos', value: 'S/ 12,700.00 / S/ 6,900.00', note: 'Desglosados en Servicios, Compras y Personal' },
        { label: 'Pendiente (por cobrar o pagar)', value: 'S/ 8,000.00', note: 'S/ 4,200 por cobrar + S/ 3,800 por pagar en seguimiento' }
      ],
      decision: 'Gracias al filtro "Pendientes", el administrador visualiza que la factura de S/ 4,200 vence el día 28 (dos días antes de la planilla) y programa el recordatorio de cobranza con anticipación.'
    },
    dailyUseCases: [
      {
        title: 'Rutina de cobranza preventiva de facturas por vencer',
        role: 'Proveedores B2B, imprentas, talleres y distribuidoras',
        workflow: 'Filtra cada lunes la tabla por "Pendientes" + "Ingresos", ordena por "Fecha de vencimiento" y contacta por WhatsApp a los clientes cuyas facturas vencen en los próximos 3 días.'
      },
      {
        title: 'Separación del dinero de Impuestos (IGV y Renta) antes de gastarlo',
        role: 'Comercios y negocios de servicios en Régimen MYPE o General',
        workflow: 'Cada fin de semana crea un movimiento Tipo "Egreso", Estado "Pendiente" y Categoría "Impuestos" con la fecha del cronograma SUNAT del mes siguiente para que ese monto ya aparezca comprometido en tu flujo.'
      },
      {
        title: 'Conciliación rápida de caja chica y cuentas bancarias sin software complejo',
        role: 'Restaurantes, cafeterías, salones y consultorios',
        workflow: 'Registra al cierre del día el total de ventas cobradas ("Ventas") y los pagos a proveedores de insumos ("Compras"), y exporta el archivo con "Respaldo JSON" cada fin de semana.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Registrar una venta al crédito directamente como "Pagado / cobrado" solo porque ya emitiste la factura electrónica.',
        correction: 'En flujo de caja manda el movimiento del dinero (percibido), no la fecha de emisión de la factura (devengado). Regístrala siempre como "Pendiente" hasta que el dinero esté acreditado en tu banco.'
      },
      {
        mistake: 'Mezclar gastos personales o familiares del dueño dentro de la categoría "Operación" o "Otros".',
        correction: 'Asigna al propietario una remuneración o retiro fijo mensual programado; mezclar gastos personales distorsiona el "Resumen por categoría" y oculta la rentabilidad real del negocio.'
      },
      {
        mistake: 'Borrar el historial o caché del navegador sin haber descargado antes el "Respaldo JSON".',
        correction: 'Como la aplicación es 100% privada y guarda tus datos localmente en tu navegador, acostúmbrate a pulsar "Respaldo JSON" al terminar cada semana.'
      }
    ],
    faqs: [
      {
        q: '¿Mis datos financieros se suben a algún servidor o nube externa?',
        a: 'No. Toda la información que registras en "Flujo de Caja y Cobranzas" se almacena exclusivamente en el almacenamiento local de tu propio navegador y en los archivos de "Respaldo JSON" que descargues en tu equipo.'
      },
      {
        q: '¿Qué pasa si intento restaurar un respaldo JSON antiguo o dañado?',
        a: 'El sistema cuenta con validación de integridad de esquema v2: migra automáticamente respaldos legados v1, verifica la firma de integridad antes de sobrescribir y guarda una copia preventiva del estado actual antes de restaurar.'
      },
      {
        q: '¿Cómo se conecta esta herramienta con el CRM y el Generador de Cotizaciones?',
        a: 'Desde la barra superior ("Portal · Cotizaciones · CRM · Caja · Inventario · Tareas") puedes pasar de una oportunidad ganada en el CRM o una cotización aprobada al registro inmediato de su cobro pendiente en Caja.'
      }
    ],
    relatedCategorySlugs: [
      { slug: 'contadores', label: 'Estudios Contables en Lima', reason: 'Para conciliar tu control gerencial de flujo de caja con tus declaraciones mensuales de IGV-Renta y libros electrónicos.' },
      { slug: 'casas-de-cambio', label: 'Casas de Cambio en Lima', reason: 'Para cubrir obligaciones en dólares (alquileres o importaciones) cuando tus cobros ingresan en soles.' },
      { slug: 'catering', label: 'Servicios de Catering en Lima', reason: 'Rubro que trabaja con adelantos del 50% ("Pagado/cobrado") y saldos contra entrega ("Pendiente") que requieren control estricto por evento.' },
      { slug: 'albanileria-y-remodelaciones', label: 'Albañilería y Remodelaciones en Lima', reason: 'Para controlar valorizaciones de obra por cobrar frente a compras semanales de materiales y pago de cuadrillas.' }
    ],
    relatedToolSlugs: ['crm-pymes', 'generador-cotizaciones', 'calculadora-prestamos-amortizaciones']
  }
];
