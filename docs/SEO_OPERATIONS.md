# Operación editorial y SEO

## Publicación

1. Mantener datos originales en `data/`. Validar con `npm run verify:seo`.
2. Editar servicios y criterios específicos en `lib/categoryEditorial.js`. No atribuir estos servicios a un negocio sin confirmación.
3. Añadir guías revisadas en `lib/guides.js`; actualizar fechas editoriales cuando corresponda. Las ocho guías iniciales son checklists editoriales, no investigación de precios ni revisión profesional médica.
4. Las páginas locales iniciales requieren cinco fichas y un teléfono disponible. `lib/directory.js` limita el piloto y selecciona perfiles con nombre, dirección y teléfono. No ampliar solo para generar más URLs: revisar pertinencia, direcciones y cobertura.
5. `npm run build`, iniciar `npm start`, ejecutar `npm run test:seo`. Las capturas quedan en `.next/`, fuera de Git.
6. Commit y push a `origin main`; verificar las rutas públicas después del despliegue.

## Medición

Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID` con un ID GA4 real (`G-…`) en el entorno de despliegue y recompilar. El script se carga solo tras aceptar cookies analíticas. No se envían teléfonos ni nombres de negocios como parámetros de evento. Los eventos `contact_phone`, `contact_map`, `contact_website`, `claim_listing` y `correction_request` son clics, no ventas ni conversaciones confirmadas. Si falta el ID, no se carga Google Analytics.

Registrar/verificar la propiedad de dominio en Search Console y Bing Webmaster Tools, enviar `/sitemap.xml` y consultar canonical elegida, indexación, impresiones, consultas no marca y conversiones. Estas plataformas requieren acceso a las cuentas del titular; el código no puede crear una línea base histórica que no existe.

## IndexNow

La utilidad `node scripts/notify-indexnow.mjs /ruta-cambiada` exige `INDEXNOW_KEY` y un archivo público `/CLAVE.txt` cuyo contenido coincida. No se activa sin una clave verificada. Enviar solo altas, modificaciones o bajas reales después de que el despliegue sea accesible. Un 200/202 es recepción, no garantía de indexación. Google no es un motor participante de este flujo.

## Mantenimiento

Revisar datos y fuentes con el titular. Mantener separación entre fecha de recogida del JSON y fecha de edición de la guía. Evitar alterar `lastmod` por cada build. Conservar la misma entidad al cambiar de categoría. No convertir una llamada posible en WhatsApp confirmado, ni una valoración pública en certificación propia.

Las rutas históricas `/directorio/categoria` redirigen a `/categoria` en Next y Cloudflare Functions. Los subdominios de categoría conocidos redirigen al dominio raíz cuando reciben tráfico. Este código no configura el DNS ni garantiza que un wildcard aún no registrado resuelva.

## Verificación de esta fase

9 de octubre de 2026: 56 JSON válidos, 5.068 registros originales conservados, 56 categorías con contenido específico, 13 páginas locales elegibles, 35 fichas individuales y ocho guías. La prueba de producción comprobó 117 páginas, canonical, un H1 por página, JSON-LD parseable, sitemap, redirecciones, encabezados de indexación, listados sin JavaScript e interacción móvil. Compilación Next y exportación Cloudflare completadas; Cloudflare usa sus Functions y `_headers` porque el middleware/headers de Next no se ejecutan en un export estático.

## Próxima tanda basada en evidencia

Confirmar teléfonos, horarios y cobertura con los titulares; sumar información original y fuentes oficiales por rubro; crear más guías solo después de esa revisión. Priorizar según consultas reales y contactos. La presencia en motores e IA no está garantizada por habilitar rastreo o publicar schema.
