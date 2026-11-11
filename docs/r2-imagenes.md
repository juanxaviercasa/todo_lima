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

## Imágenes adaptables (noviembre de 2026)

El proyecto es un Next.js con `output: export` y no depende del optimizador de imágenes del servidor de Next.js. En `predev` y `prebuild`, `scripts/prepare-responsive-images.mjs` genera versiones WebP adecuadas para las tarjetas (360/480/640/768/960 según uso), portadas (1200 px) y el hero principal (WebP a resolución nativa cuando aporta ahorro). Se validan las dimensiones y la existencia de los archivos con `scripts/test-responsive-images.mjs`.

**Origen y entrega:** los originales editoriales continúan apuntando a `media.todolima.com/editorial/` (R2). Las variantes editoriales se publican de forma estática bajo `/editorial/` en el propio despliegue de la web y quedan accesibles por Cloudflare Pages o el alojamiento del dominio. Esto evita enlaces rotos a variantes que no se han subido todavía a R2 y no requiere cuota de Cloudflare Images. Las tarjetas de categorías y la portada usan variantes de `/images/` generadas durante la compilación.

Los archivos generados quedan en `public/` y los manifiestos `data/blog/responsive-manifest.json` y `data/responsive-site-images.json` se regeneran antes de compilar. El HTML utiliza `srcset` + `sizes` con anchuras reales; las imágenes fuera del primer pantallazo mantienen carga diferida. Una imagen que cambie bajo la misma URL de R2 con caché `immutable` debe publicarse preferentemente con un nombre nuevo.

Para comprobarlo, ejecutar `npm run test:images` y `npm run build`, y medir solicitudes, LCP y CLS en móvil con DevTools o PageSpeed Insights. No dar por comprobada la mejora de tiempos sin mediciones antes/después.
