# Primera tanda para aprobación

Dos borradores correspondientes a la semana 1 del plan: artículos 25 y 54. No están conectados a rutas públicas, al sitemap ni a una automatización.

- 01-centro-historico-lima.md: contenido de descubrimiento local y patrimonio.
- 02-revisar-negocio-antes-contactar.md: contenido práctico que ayuda a utilizar el directorio.

La ficha editorial al comienzo de cada archivo incluye categoría, etiquetas, URL, metadatos e indicación de imagen pendiente. No se ha inventado un autor personal ni una visita del equipo. Las fechas de publicación se asignarán cuando se publiquen, no al redactar el borrador.

## Puerta de publicación propuesta para la siguiente fase

La solicitud de publicar 2–3 artículos diarios aumenta la cadencia del plan inicial. El calendario debe distribuir únicamente contenido aprobado; no generar y publicar textos sin revisión para llenar cupos.

GitHub Actions se implementará después de aprobar estos ejemplos y el flujo editorial. Propuesta: cola con estado draft → reviewed → approved → scheduled → published; fecha explícita en America/Lima; conversión a UTC para ejecución; validación de fuentes, enlaces, slug único, imágenes y metadatos; bloqueo de concurrencia; publicación idempotente para evitar duplicados; build y validación de datos obligatorios; historial y aviso de fallos.

Preferir horarios fijos inicialmente. El cron de Actions puede retrasarse y no constituye una garantía de publicación al minuto. Un rango aleatorio, si se solicita, se decide y registra por adelantado; no altera autores ni fechas para simular un equipo. No publicar si la cola aprobada está vacía.

No se ha creado ningún workflow ni cambiado el sitio público. La aprobación del estilo no equivale a aprobación individual de todos los artículos futuros.
