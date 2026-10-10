# Colección editorial — Todo Lima

27 escenas originales generadas con IA a partir de los prompts de EDITORIAL_IMAGE_PROMPTS.json y EDITORIAL_IMAGE_PROMPTS_DISTINCT.json. Son ilustraciones de situaciones, no fotografías de proveedores reales ni testimonios. Las dos escenas adicionales distinguen revisión de solicitudes y preparación de datos, conservando las imágenes originales de fuentes y presencia digital en sus secciones correspondientes.

- 8 portadas de guías y 8 imágenes de apoyo.
- 1 cabecera del índice de guías.
- 5 escenas de cómo funciona: cabecera, búsqueda, comparación, contacto y fuentes.
- 5 escenas de negocios: cabecera, preparación de ficha, revisión de solicitud, completar datos y presencia digital.

Los archivos públicos están en public/images/editorial: 1440 × 810, 768 × 432 y 480 × 270, formato WebP, 81 archivos en total (~4,3 MB). La versión adecuada se selecciona mediante srcset y sizes. Las cabeceras tienen prioridad de carga; las imágenes de contenido utilizan carga diferida y dimensiones explícitas.

Los nombres descriptivos, textos alternativos, imágenes de Article y Open Graph, y public/image-sitemap.xml proporcionan contexto y descubrimiento a los buscadores. No garantizan posicionamiento. El sitemap de imágenes está anunciado en robots.txt.

Comprobaciones:

- npm run verify:seo
- npm run build
- node scripts/test-editorial-images.mjs (servidor local en puerto 3000; SEO_TEST_ORIGIN permite otro origen)

La prueba comprueba formato, dimensiones, presupuesto de 300 KB por archivo, utilización de las 27 escenas sin duplicados dentro de una página, imágenes cargadas y alt, vista previa social y ausencia de desbordamiento horizontal en 11 páginas a 390, 768 y 1440 px.

Para regenerar variantes a partir de nuevos originales, pasar a scripts/prepare-editorial-images.mjs un JSON con objetos id y source. Los prompts son nuevos, sin imágenes de referencia. No se sustituyen las fotografías existentes de categorías.
