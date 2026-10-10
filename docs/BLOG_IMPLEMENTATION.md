# Blog de Todo Lima — primera publicación

Fecha: 10 de octubre de 2026, America/Lima.

Dos artículos publicados, derivados de los borradores revisados. Fuente de contenido estructurado: data/blog/posts.json. Taxonomía e imágenes: lib/blog.js. Los borradores se conservan como historial; no alimentan automáticamente el contenido publicado.

## Funciones

- Índice /blog con búsqueda sin distinción de tildes, categorías y etiquetas combinables, estado vacío y limpieza de filtros.
- Ocho categorías previstas: dos activas, seis señaladas como próximas, sin URLs de contenido vacío.
- Archivos de categorías y etiquetas con canonical propio y noindex/follow inicial para no indexar listados de una sola entrada.
- Paginación de seis entradas por página. Con dos publicaciones aparece solo la página 1. Las páginas siguientes del índice se generan en /blog/pagina/N cuando existen artículos suficientes; no se inventan páginas 2 o 3.
- Paginación interna de resultados filtrados; los filtros no generan URLs indexables.
- Barras laterales de últimas entradas, lecturas seleccionadas, temas y etiquetas. Se apilan en pantallas pequeñas y no ocultan artículos.
- Artículos con respuesta inicial, índice enlazado, tablas, fuentes, autoría institucional, fecha real, tiempo estimado de lectura y tres imágenes únicas.
- El ejemplo práctico enlaza fichas reales de gasfitería y cerrajería, presentadas como ejemplos, no evaluación de calidad.
- El artículo cultural no recomienda servicios no documentados. No confundir una conexión editorial con una recomendación de proveedor.
- Enlaces desde portada, navegación y footer; sitemap de artículos e imágenes; BlogPosting y breadcrumbs; Open Graph por artículo.

## Imágenes

Seis escenas nuevas generadas con la herramienta integrada, prompts guardados en BLOG_IMAGE_PROMPTS.json. Tres versiones WebP de cada una (18 archivos) en public/images/editorial/blog-*.webp.

Las imágenes de patrimonio son interpretaciones artísticas, no documentación arquitectónica ni fotos auténticas. Todos los artículos muestran una identificación de IA. Las imágenes del artículo práctico no representan negocios reales ni testimonios.

## Validación

- npm run verify:seo
- npm run build
- BLOG_TEST_ORIGIN=http://localhost:3003 node scripts/test-blog.mjs (usar sintaxis de variables de PowerShell en Windows).

Pruebas: JSON, slugs, tres imágenes únicas por artículo, formatos y resoluciones, búsquedas con tildes, categorías, etiquetas, resultados vacíos, anclas, tablas, canonical, JSON-LD, lectura sin JavaScript, sitemap y desbordamiento en 320, 390, 768, 1024 y 1440 px. Paginación de tres páginas probada con datos sintéticos solo en pruebas, nunca publicados.

GitHub Actions de publicación periódica no se activa en esta fase. Primero validar el resultado editorial y construir una cola aprobada. No fabricar autores, visitas ni fechas.
