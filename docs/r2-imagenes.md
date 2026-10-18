# Imágenes editoriales en Cloudflare R2

El blog conserva `https://media.todolima.com/editorial/` como origen público.
Los originales en el repositorio son fuentes de trabajo y respaldo, no el origen
que consume el navegador para estas imágenes.

Antes de publicar artículos nuevos o cambiar imágenes:

1. Ejecutar `node scripts/upload_to_r2.mjs` con las credenciales R2 del proyecto.
   Sincroniza originales y variantes WebP de `imagenes_generadas/`; omite objetos
   cuyo tamaño coincide. Para reemplazos del mismo tamaño, usar un nombre nuevo:
   la comprobación de tamaño no detecta diferencias de contenido y la caché es immutable.
2. Ejecutar `node scripts/verify-blog-r2.mjs --all` para verificar las URL públicas
   del catálogo. Sin `--all`, comprueba portadas e imágenes internas de publicaciones.
3. Comprobar el artículo y tarjetas en navegador. Un 404 previo puede permanecer
   brevemente en caché del CDN aunque el objeto ya exista.

El flujo editorial diario verifica R2 antes de compilar y confirmar publicaciones;
si falta alguna imagen, falla y evita publicar referencias rotas.

Reparación del 18 de octubre de 2026: sincronizados 564 archivos, 27 subidos y 537
ya presentes, sin errores. Catálogo público: 546 URL de imágenes válidas. Los tres
objetos de Angamos devolvían 404 y ahora responden 200. No fue necesario regenerarlos.
