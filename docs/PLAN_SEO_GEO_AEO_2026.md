# Todo Lima: plan maestro de visibilidad orgánica y conversión

Fecha: 9 de octubre de 2026. Fase: investigación, auditoría y planificación. No se han implementado cambios de contenido, arquitectura, robots ni publicación.

## 1. Decisión estratégica

Todo Lima debe convertirse en una guía local para elegir y contactar negocios: directorio con información comprobable, páginas útiles por servicio y ubicación, y artículos que ayuden a tomar decisiones. Cada categoría merece contenido propio, pero ese contenido debe responder a necesidades de contratación y comparación, no limitarse a una descripción genérica del rubro.

Propuesta editorial: «Encuentra, compara y contacta negocios de Lima con información local clara y actualizada». La diferenciación vendrá de datos propios, cobertura explicada, metodología transparente y facilidad para contactar. Las expresiones «oficial», «líder», «mayor», «verificado» o «mejores» requieren evidencia específica; sustituirlas cuando no exista.

Hay dos públicos y dos embudos: personas que buscan un proveedor (B2C) y dueños que quieren administrar su ficha o mejorar su presencia digital (B2B). El directorio y las guías deben resolver primero la necesidad del visitante. La auditoría digital y otros servicios B2B tendrán páginas y llamadas a la acción propias.

Objetivo de negocio: aumentar contactos útiles hacia negocios y reclamaciones de fichas cualificadas. Las visitas e impresiones serán indicadores intermedios.

## 2. Auditoría comprobada y límites

Se revisaron el repositorio, todos los JSON de `data`, la configuración de categorías, rutas, componentes y respuestas HTTP públicas de una muestra.

| Evidencia | Resultado | Implicación |
|---|---|---|
| Archivos JSON parseables | 56 | Base consistente a nivel sintáctico; falta validación semántica y de vigencia |
| Registros de fichas | 5.068 | No equivale a 5.068 negocios únicos ni verificados |
| URLs de Maps distintas | 4.949 | Hay coincidencias entre registros; deduplicar entidades sin perder categorías legítimas |
| Registros con teléfono | 2.009, aproximadamente 40% | La promesa de WhatsApp inmediato no puede aplicarse a todos |
| Registros con dirección | 4.951 | Normalizar y comprobar distrito, coordenadas y cobertura |
| Registros con sitio web | 1.143 | Oportunidad B2B; ausencia de web no implica ausencia de presencia digital |
| Registros con rating | 4.689 | No demuestra experiencia propia ni habilitación profesional |
| Categorías sin `pageContent` | 18 | Priorizar contenido estable, específico y útil |
| Electricistas | 3 registros | Completar oferta antes de expandir páginas por distrito |
| Home, robots y sitemap públicos | HTTP 200 | El dominio raíz está accesible desde la comprobación de red externa |
| `/dentistas` y `/directorio/dentistas` | Ambas HTTP 200; sin canonical encontrado | Consolidar rutas y señales de indexación |
| `dentistas.todolima.com` | No resolvió en la prueba | Revisar DNS si se conserva; no asumir que todo el wildcard falla |

Los errores iniciales de acceso fueron del entorno de red restringido; no constituyen prueba de caída del dominio. La búsqueda realizada no ofreció resultados fiables de TodoLima.com; tampoco permite afirmar que Google no tenga ninguna URL indexada. La fuente definitiva será Search Console.

Hallazgos de código:

- `app/[subdomain]/page.js` genera títulos por categoría, pero carece de canonical explícito y usa un año fijo.
- `app/directorio/[categoria]/page.jsx` muestra otra versión del listado sin metadatos específicos.
- `app/sitemap.js` incluye categorías en raíz y asigna fecha actual a todas las URLs, sin representar modificaciones reales.
- `middleware.js` contempla subdominios: hay que alinear dominio, rutas, enlaces, canonical y sitemap.
- `CategoryDirectorioClient` filtra por parámetro y botones; no existen páginas editoriales dedicadas por categoría y distrito.
- `BusinessCard` muestra rankings y verificación sin una metodología pública comprobada en esta revisión. El orden y las medallas cambian al filtrar u ordenar.
- `RandomHero` y el contenido alternativo producen mensajes variables. En la muestra de dentistas aparece «en menos de 15 minutos», afirmación sin evidencia revisada.
- La home contiene FAQ en JSON-LD que debe contrastarse con preguntas y respuestas visibles.
- `public/llms.txt` incluye categorías y slugs que no coinciden íntegramente con el inventario real.
- `public/robots.txt` tiene grupos específicos de bots con restricciones diferentes. Las reglas del grupo general no se heredan automáticamente por cada grupo específico.

Pendiente para una auditoría operativa completa: Search Console, Bing Webmaster Tools, analítica, logs de CDN, URL Inspection, cobertura de sitemap, enlaces externos, Core Web Vitals de usuarios reales y muestreo de fichas por distrito. No se han inventado volúmenes de búsqueda, posiciones, tráfico ni tasas de conversión.

## 3. Investigación de mercado y competencia

La búsqueda pública mostró tres modelos relevantes:

| Modelo | Ejemplos investigados | Qué compiten por resolver | Diferenciación para Todo Lima |
|---|---|---|---|
| Directorios generales | PeruYello, Todos.com.pe, Directorio Perú, PlanetaPeru | Descubrir empresas y contactos | Información local comprobable y guía para elegir |
| Servicios y presupuestos | HALPII | Encontrar proveedores para un trabajo concreto | Servicio, distrito, condiciones de atención y contacto claro |
| Guías y agregadores gastronómicos | Restaurant Guru, Guía de Lima, CTXplorer | Elegir dónde ir según ocasión | Curación local, contexto y atributos confirmados |

Estos son ejemplos encontrados, no un ranking exhaustivo de competidores ni posiciones garantizadas de Google. Las SERPs cambian por ubicación, dispositivo, fecha y personalización.

Validación siguiente: investigar 60–100 consultas en Perú/Lima, registrar resultados orgánicos, mapas, preguntas relacionadas, vídeos, anuncios y respuestas de IA. Incluir Miraflores, Surco, Los Olivos, San Juan de Lurigancho, San Miguel y Cercado; añadir distritos según oferta real. Completar volúmenes con Keyword Planner u otra fuente disponible, registrando fecha, geografía y límites del dato.

Patrones de intención:

- Transaccional local: «gasfitero en Los Olivos», «reparación de lavadoras a domicilio en Surco».
- Comparación: «cómo elegir una empresa de mudanzas en Lima», «qué incluye una cotización de catering».
- Precio: «cuánto cuesta reparar una refrigeradora en Lima». Publicar rangos solo con muestra documentada y fecha.
- Disponibilidad: «veterinaria 24 horas», «cerrajero domingo». Requiere horarios y disponibilidad confirmados.
- Problema o situación: «qué revisar antes de contratar una fumigación», «qué pedir antes de reparar una laptop».
- Navegacional: nombre del negocio, dirección, teléfono, sede y especialidad.
- B2B: «cómo registrar mi negocio en un directorio», «cómo mejorar mi ficha y recibir consultas».

Cada intención tendrá una URL principal. Variantes y sinónimos se integrarán en esa página; no crear una URL para cada variante léxica.

## 4. Arquitectura propuesta

Conservar las rutas de categoría en el dominio raíz como arquitectura principal, tras revisar canonical elegida e historial en Search Console. Es la opción que coincide con el sitemap actual y permite reunir categorías, guías y fichas bajo la misma estructura editorial.

| Tipo | Ejemplo propuesto | Intención principal |
|---|---|---|
| Categoría | `/gasfiteros` | Encontrar proveedores en Lima |
| Categoría y distrito | `/gasfiteros/los-olivos` | Encontrar oferta local concreta |
| Ficha | `/negocios/nombre-negocio-id` | Consultar y contactar una entidad |
| Guía | `/guias/como-elegir-gasfitero-lima` | Comparar y preparar contratación |
| Hub temático | `/hogar` | Explorar servicios relacionados |
| Hub geográfico | `/distritos/los-olivos` | Descubrir oferta del distrito |
| B2B | `/para-negocios` | Reclamar ficha y conocer servicios |
| Confianza | `/metodologia`, `/equipo`, `/correcciones` | Entender fuentes y proceso editorial |

Consolidar `/directorio/categoria` mediante redirección permanente si no tiene una función diferenciada. Evaluar equivalentes de subdominios antes de migrar: inventario, enlaces entrantes, indexación, redirecciones y monitorización. No cambiar URLs de forma masiva sin esa comprobación.

Evitar la multiplicación automática de 56 categorías por 43 distritos. Una página local se publicará cuando tenga oferta y valor propio. Umbral editorial inicial propuesto: al menos cinco opciones pertinentes y comprobables, salvo categorías donde un número menor resuelva bien la necesidad. Se exige además contacto o forma de acceso útil, distrito validado, contenido específico y fecha de revisión. Es un criterio interno, no una regla de Google.

Separar ubicación de atención: estar en Miraflores no demuestra prestar servicio en toda Lima. Callao debe identificarse como ámbito propio y no mezclarse con los 43 distritos de la provincia de Lima.

## 5. Plan para las 56 categorías

Primero se fijará un estándar básico para todas: título único, descripción útil, selección visible, datos con fuente, actualización y enlaces. Después se profundizará por tandas. La prioridad inicial es una hipótesis comercial basada en intención, oferta y esfuerzo; se reajustará con datos de búsqueda y conversiones.

| Grupo y categorías actuales | Contenido que debe resolver | Tanda |
|---|---|---|
| Hogar: gasfiteros, cerrajeros, mudanzas, reparación-lavadoras, reparación-refrigeradoras, electricistas, fumigación, aire-acondicionado, vidrierías, carpinteros, pintores, lavanderías | Cobertura, visita, presupuesto, materiales, garantía, seguridad y preguntas para contratar | A; electricistas condicionado a completar oferta |
| Tecnología: reparación-celulares, reparación-laptops, cámaras-de-seguridad | Diagnóstico, repuestos, respaldo de datos, garantía, marcas y alcance de instalación | A |
| Mascotas: veterinarias, grooming-canino | Horarios confirmados, servicios, sede, condiciones de atención y preparación de visita | A/B |
| Automotriz: talleres-mecánicos, car-wash, llanterías, auxilio-mecánico | Especialización, ubicación, recepción del vehículo, cotización y disponibilidad | B |
| Eventos: catering, tortas-personalizadas, fotografía-eventos, locales-de-eventos, decoración-de-eventos | Capacidad, presupuesto, anticipación, entregables, permisos y contratos | B |
| Gastronomía: cevicherías, pollerías, chifas, pizzerías, cafeterías | Ubicación, horarios, tipo de comida, ocasión, carta y atributos comprobados | B |
| Legal/inmobiliario: abogados, notarías, contadores, agentes-inmobiliarios | Especialidad, credenciales, alcance de servicio y documentos para consultar | B/C; revisión especializada |
| Salud: doctores, dentistas, psicólogos, pediatras, dermatólogos, fisioterapia, nutricionistas, oftalmólogos, ginecólogos, ópticas, podólogos, laboratorios-clínicos, traumatólogos | Cómo elegir y verificar profesionales, modalidad, ubicación, preparación administrativa y acceso | C para artículos especializados; fichas y categorías pueden empezar antes |
| Belleza: barberías, salones-de-belleza, spas | Servicios, citas, presupuesto, duración y cuidados respaldados por especialistas | B/C |
| Otros: florerías, escuelas-de-manejo, casas-de-cambio, gimnasios, alquiler-de-canchas | Entrega/reserva, requisitos, horarios, condiciones y comparación | B/C; información financiera y requisitos oficiales con revisión |

Piloto recomendado de ocho categorías: gasfiteros, cerrajeros, mudanzas, reparación de lavadoras, reparación de refrigeradoras, reparación de laptops, cámaras de seguridad y veterinarias. Veterinarias necesita revisión profesional para contenido médico y confirmación rigurosa de emergencias. El piloto combina intención de contacto, datos disponibles y diversidad suficiente para probar plantillas.

## 6. Plantillas editoriales

### Página de categoría

Orden: H1 claro; introducción breve; selector/listado; criterios para comparar; servicios habituales; presupuesto y variables; cobertura real; preguntas frecuentes específicas; fuentes, metodología y revisión; enlaces a distritos y guías.

Ejemplo de título: «Gasfiteros en Lima: servicios a domicilio y contacto | Todo Lima». Si no está confirmado el servicio a domicilio, eliminar esa promesa. Meta description: explicar qué se encuentra y cómo comparar; evitar superlativos universales.

Extensión orientativa: 500–900 palabras editoriales, además del listado, cuando la intención lo justifique. No es un requisito de posicionamiento. Priorizar claridad y colocar opciones y contacto pronto en móvil.

### Página de categoría y distrito

Debe aportar oferta local, ubicación o cobertura confirmada, servicios concretos, contexto de contratación pertinente y alternativas cercanas claramente etiquetadas. No sustituir únicamente el nombre del distrito en un texto genérico. No afirmar disponibilidad, tiempo de llegada ni precios sin confirmación.

### Ficha de negocio

Identidad estable; nombre y sede; categoría y servicios; dirección; distrito normalizado; contacto y canales confirmados; horarios con fuente; web oficial; mapa; información enviada por el dueño; fecha de revisión; correcciones; estado de reclamación; fuente de valoración si se muestra.

Definir estados distintos: «datos procedentes de fuente pública», «contacto comprobado», «ficha reclamada por el titular» y «credenciales comprobadas», cuando corresponda. Cada etiqueta describe un control real. Un rating de Google no sustituye estos controles.

Una entidad puede pertenecer a varias categorías sin crear varias fichas idénticas. Conservar un ID de entidad y un ID de sede. Las páginas demo no sustituyen a las fichas públicas del directorio.

### Artículo o guía

Pregunta principal; respuesta inicial directa; contexto de Lima; pasos y criterios; tabla o checklist útil; evidencia propia; limitaciones; autor y revisor cuando corresponda; fecha de revisión; fuentes primarias; enlaces a categoría y proveedores pertinentes; CTA contextual.

La IA puede asistir en investigación y borrador. La publicación exige revisión factual, adaptación local, evidencia y aportación original. No generar artículos médicos, legales o financieros como recomendaciones personalizadas sin el proceso especializado adecuado.

## 7. Backlog inicial de 24 artículos

Los títulos son briefs propuestos, no demanda cuantificada. Cada uno enlaza a la categoría que resuelve la contratación.

| Categoría | Artículo 1 | Artículo 2 | Evidencia a obtener |
|---|---|---|---|
| Gasfiteros | Cómo comparar presupuestos de gasfitería en Lima | Qué preguntar antes de contratar un desatoro a domicilio | Entrevistas y cotizaciones anonimizadas |
| Cerrajeros | Cómo elegir un cerrajero y confirmar el costo de la visita | Cambio de cerradura: qué debe incluir una cotización | Servicios y condiciones confirmadas |
| Mudanzas | Checklist para una mudanza entre distritos de Lima | Cómo comparar empresas de mudanzas y sus condiciones | Embalaje, seguros, accesos y exclusiones |
| Lavadoras | Qué datos enviar al técnico antes de solicitar una visita | Cómo evaluar diagnóstico, repuestos y garantía | Entrevistas a técnicos |
| Refrigeradoras | Qué incluye una revisión técnica a domicilio | Reparar o reemplazar: preguntas para decidir con un técnico | Costos documentados y vida útil sin generalizaciones |
| Laptops | Checklist para entregar una laptop a reparación | Cómo comparar garantías y presupuestos de servicio técnico | Respaldo, diagnóstico y condiciones |
| Cámaras | Qué debe incluir una cotización de videovigilancia | Preguntas para contratar instalación de cámaras en un negocio | Alcance, instalación y privacidad con fuentes |
| Veterinarias | Cómo confirmar la atención de una veterinaria fuera de horario | Qué información preparar para una primera consulta veterinaria | Horarios y revisión veterinaria |
| Catering | Qué incluye un presupuesto de catering en Lima | Cómo comparar proveedores de catering para un evento | Muestra de propuestas y condiciones |
| Talleres | Qué revisar en una cotización de mantenimiento vehicular | Cómo elegir un taller según el servicio que necesita tu auto | Entrevistas y alcance de servicios |
| Cafeterías | Cómo elegir una cafetería para trabajar en Lima | Cafeterías por distrito: guía de atributos comprobados | Visitas, horarios y permiso de uso de imágenes |
| Negocios/B2B | Cómo reclamar y completar tu ficha en Todo Lima | Qué información ayuda a que un cliente contacte tu negocio | Proceso propio y ejemplos reales |

Después del piloto: briefs para cada categoría restante con una guía de elección y una guía de contratación/presupuesto, evitando artículos redundantes. Los artículos de precios requieren muestra suficiente, moneda, fecha, alcance, metodología y advertencia de que el presupuesto final depende del proveedor.

## 8. SEO técnico y rastreo: backlog

P0, antes de escalar:

1. Elegir URL principal por tipo de página; canonical, redirecciones y enlaces coherentes. Revisar raíz, www, protocolo, rutas duplicadas y subdominios.
2. Verificar Googlebot/Bingbot y bots de búsqueda de IA en hosting y CDN; comprobar 200, contenido textual y ausencia de desafíos que impidan acceso.
3. Metadatos y H1 específicos, estables y veraces. Quitar promesas de tiempo y calificación que no provengan de evidencia aplicable.
4. Sitemap con URLs indexables principales y `lastmod` de modificaciones reales. No usar fecha actual para simular actualización.
5. Controlar búsqueda interna, filtros, ordenamientos, demos y autenticación. Usar `noindex` donde proceda y permitir rastreo para que sea leído; robots no elimina una URL ya indexada.
6. Verificar renderizado inicial del listado y texto editorial; no deducir que un componente cliente es invisible sin inspeccionar HTML y renderizado de Google.
7. Política consistente de robots por grupo: repetir restricciones pertinentes en grupos específicos; la seguridad del admin depende de autenticación, no de robots.
8. Verificar Search Console como propiedad de dominio, Bing Webmaster Tools y sitemap; establecer línea base y alertas.

P1, durante el piloto:

- Schema alineado con contenido visible: Organization/WebSite para la plataforma, BreadcrumbList, CollectionPage/ItemList para listados, LocalBusiness o subtipo apropiado para fichas, Article para guías. Los tipos semánticos no garantizan resultados enriquecidos.
- No marcar ratings importados de Google como `AggregateRating` para conseguir estrellas. Google exige reseñas directamente obtenidas de usuarios y prohíbe agregar valoraciones de otros sitios para esa función.
- FAQ útil y visible; comprobar elegibilidad vigente antes de invertir en marcado. No usar FAQPage como mecanismo garantizado de AEO.
- Enlaces HTML rastreables, breadcrumbs y paginación si se necesita; evitar artículos y fichas huérfanos.
- Rendimiento móvil medido con datos reales cuando existan y pruebas de laboratorio: LCP, INP, CLS; optimización de imágenes, fuentes, scripts y tamaño del HTML.
- Eventos de contacto y reclamación; trazabilidad de origen sin datos personales en URLs de analítica.
- IndexNow para notificar cambios a motores participantes. Confirmación de recepción no equivale a indexación.

P2: mejoras de navegación por hubs, búsqueda, herramientas de comparación y automatización de mantenimiento. Expandir solo tras evaluar rendimiento del piloto.

## 9. GEO y AEO con fundamentos comprobables

Google indica que las bases de SEO siguen aplicándose a sus respuestas de IA y que no se requieren archivos ni schema especiales. La estrategia se centrará en páginas accesibles, información original, entidades claras y datos que permitan verificar una afirmación.

Acciones: respuestas directas a preguntas reales; servicios y lugares identificados sin ambigüedad; fuentes junto a afirmaciones; autores y revisores reales; tablas comparables; metodología de precios y selección; actualización real; contactos y navegación comprensibles.

Permitir robots de búsqueda pertinentes también en CDN. Perplexity distingue su bot de búsqueda de los accesos solicitados por usuarios. Google-Extended controla usos específicos de Gemini y no determina inclusión ni ranking en Google Search. La política de uso para entrenamiento se debe separar de la decisión de aparecer en búsquedas.

`llms.txt` puede mantenerse como índice auxiliar veraz de páginas existentes, pero tendrá prioridad baja: no es un requisito de Google ni una garantía de citación. Corregir sus slugs y afirmaciones para que no contradiga el sitio.

Medir citación con un panel de 30–50 preguntas por servicio y distrito: misma metodología, fecha, motor, consulta, respuesta, cita y URL. Repetir mensualmente y reconocer variación entre respuestas. Los resultados sirven para diagnosticar; no prueban una cuota universal de visibilidad.

## 10. Embudos y conversión

| Público | Descubrimiento | Evaluación | Acción | Indicador |
|---|---|---|---|---|
| Persona que busca un servicio | Artículo o consulta local | Categoría, distrito y ficha | Llamada, WhatsApp, web, mapa o reserva confirmada | Clic de contacto; contacto confirmado solo si existe integración |
| Dueño de negocio | Ficha, guía B2B o mención de marca | Proceso de reclamación y beneficios | Reclamar ficha y solicitar servicio | Reclamación completada, lead cualificado y venta atribuible |

CTA principal por intención. En categorías urgentes: opciones pertinentes y contacto pronto. En artículos comparativos: checklist y enlace a proveedores. En fichas: canal disponible, sin presentar números fijos como WhatsApp confirmado.

Etiquetar contactos salientes como microconversiones: hacer clic no demuestra que haya conversación ni venta. Medir reclamaciones con etapas de formulario y confirmación. Solicitar marketing por separado cuando corresponda y usar el mínimo dato necesario.

No interrumpir a quien busca un técnico con una oferta extensa de automatización o auditoría digital. Mantener enlace discreto para dueños y desarrollar el embudo comercial en `/para-negocios`.

## 11. Autoridad, datos propios y mantenimiento

Publicar metodología de selección, significado de etiquetas, relación comercial, correcciones, equipo y fuentes. Separar patrocinio de ranking editorial; ninguna venta debe comprar un distintivo de comprobación inexistente.

Obtener información original mediante formularios de reclamación, entrevistas, visitas, fotografías autorizadas y encuestas de presupuestos. Documentar fuente, fecha y permiso cuando aplique. Revisar procedencia y condiciones de reutilización de datos existentes antes de escalar la publicación; no asumir que la información pública habilita cualquier reutilización.

En temas de salud, legal y finanzas, priorizar fuentes oficiales y revisión profesional identificada. Comprobar credenciales en registros oficiales aplicables, sin confundir rating con habilitación. No certificar profesionales sin proceso real.

Mantenimiento propuesto: disponibilidad y contactos de urgencia cada 30 días; datos generales de fichas cada 90 días; precios según cambios y como máximo revisión trimestral; requisitos oficiales con seguimiento de fuentes; guías generales cada seis meses. Son frecuencias operativas iniciales, ajustables según riesgo y recursos.

Conseguir menciones mediante colaboraciones reales con negocios, asociaciones, especialistas y medios locales. Ofrecer recursos útiles y datos originales; evitar compra de enlaces y redes de menciones artificiales.

## 12. Ejecución propuesta en 90 días

| Periodo | Trabajo | Entregable y criterio de salida |
|---|---|---|
| Semanas 1–2 | Línea base, auditoría de Search Console, canonicals, robots, sitemap, datos y medición | Inventario de URLs; cero duplicación técnica crítica en muestra; eventos verificados |
| Semanas 3–4 | Piloto de ocho categorías y confianza editorial | Ocho páginas completas y estables; metodología pública; datos revisados |
| Semanas 5–6 | Ocho guías y primeras fichas enriquecidas | Guías revisadas y enlazadas; 40–80 fichas completas según capacidad |
| Semanas 7–8 | Páginas categoría/distrito elegibles y ocho guías más | 12–20 páginas locales con oferta útil; ninguna página vacía o de sustitución de nombres |
| Semanas 9–10 | Siguiente tanda según consultas y conversiones | 8–12 categorías adicionales; ajustes de títulos, CTA y enlaces |
| Semanas 11–13 | Ocho guías restantes, evaluación y expansión | 24 guías acumuladas si cumplen revisión; informe por cluster y plan de siguiente trimestre |

Cadencia orientativa: dos artículos revisados por semana; dos a cuatro categorías enriquecidas por semana después del piloto; mantenimiento de datos en paralelo. Publicar menos si falta evidencia o revisión. No esperar tráfico inmediato ni prometer posiciones en 90 días.

Equipo funcional: responsable SEO/arquitectura; editor e investigador local; responsable de datos; desarrollador; analista de conversión; especialistas revisores según tema. Una misma persona puede cubrir varios roles, pero el control editorial debe permanecer explícito.

Priorizar mediante puntuación documentada: intención de contacto 25%, demanda comprobada 20%, oferta y calidad de datos 20%, diferenciación 15%, valor comercial 10%, viabilidad editorial/técnica 10%. Registrar puntuación y razones; actualizar tras seis semanas. La puntuación todavía no puede calcularse rigurosamente sin datos de demanda.

## 13. Medición y decisiones de expansión

Línea base: URLs enviadas e indexadas, canonical elegida, impresiones/clics/CTR no marca por cluster, consultas por distrito, páginas de entrada, microconversiones, reclamaciones y leads B2B cualificados.

Metas controlables de fase: todas las páginas piloto con canonical y metadata propias; JSON con esquema validado; ninguna etiqueta de verificación sin evidencia; todos los CTA instrumentados; cero fichas piloto huérfanas; fuentes y fechas editoriales presentes; ningún cambio publicado con build fallido.

Metas de tráfico y leads: fijarlas después de obtener línea base y demanda real. Evaluar crecimiento contra periodos comparables y estacionalidad, separando marca de no marca. No usar porcentaje de indexación como objetivo aislado: una página indexada puede no aportar valor.

Reglas de decisión: si hay impresiones y bajo CTR, revisar intención y snippet; si hay visitas y pocos contactos, revisar oferta, datos y CTA; si hay exclusión por duplicación, corregir arquitectura; si una guía recibe búsquedas fuera de su alcance, ajustarla o crear contenido pertinente; si falta oferta local, enriquecer datos antes de crear más páginas.

## 14. Fuentes y alcance de sus aportaciones

- [Google: optimización para funciones de IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): fundamento común entre SEO y búsqueda con IA; valor original; ausencia de requisitos especiales de archivos de IA.
- [Google: funciones de IA y sitios web](https://developers.google.com/search/docs/appearance/ai-features): elegibilidad técnica, acceso al contenido y correspondencia del marcado con el texto visible.
- [Google: contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): calidad, fuentes, autoría y valor para personas.
- [Google: contenido generado con IA](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content): revisión de exactitud y riesgo de publicación a escala sin valor.
- [Google: canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): consolidación mediante redirecciones, canonical y sitemap.
- [Google: navegación con filtros](https://developers.google.com/crawling/docs/faceted-navigation): control del espacio de URLs y rastreo.
- [Google: reseñas y estrellas](https://developers.google.com/search/docs/appearance/structured-data/review-snippet): restricciones para valoraciones agregadas de otros sitios.
- [Google: negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business): datos y tipos apropiados para entidades locales.
- [Google: crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers): alcance de Google-Extended.
- [Google: cambios en FAQ](https://developers.google.com/search/blog/2023/08/howto-faq-changes): límites de visibilidad de resultados enriquecidos; comprobar documentación vigente antes de implementar.
- [IndexNow](https://www.indexnow.org/documentation): notificaciones de altas, cambios y bajas; recepción no garantiza indexación.
- [Perplexity: crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers): acceso de búsqueda, peticiones de usuarios y configuración de WAF.
- Competidores: [PeruYello](https://www.peruyello.com/), [Todos.com.pe](https://region-lima.todos.com.pe/directorio/servicios-profesionales), [Directorio Perú](https://directorioperu.com/), [PlanetaPeru](https://www.planetaperu.pe/), [HALPII](https://portal.halpii.com/servicios/gasfitero/lima), [Restaurant Guru](https://es.restaurantguru.com/Lima), [Guía de Lima](https://www.guiadelima.pe/restaurantes/los-10-mejores-restaurantes-de-lima/), [CTXplorer](https://ctxplorer.com/pe/lima/restaurantes). Se usaron para identificar modelos de oferta y contenido; sus afirmaciones promocionales no se adoptan como hechos independientes.

El plan queda preparado para revisión. El siguiente paso de implementación será la fase técnica y de medición, seguida por el piloto editorial. No se ha iniciado publicación, migración de rutas, scraping ni sincronización de cambios a `main`.
