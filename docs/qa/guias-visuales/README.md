# Revisión de guías y tutoriales — 17 de octubre de 2026

Resultado: 56 guías en 12 temas y 16 tutoriales con 79 capturas reales de Nube para Pymes. Los pasos tienen enlaces estables y sus imágenes se pueden ampliar o recorrer a tamaño original.

Verificación completada:

- `npm run build`: exportación de 918 páginas, sin errores. Advertencias del entorno al descargar hojas de Google Fonts y las advertencias existentes de exportación estática de Next.js.
- Integridad: 134 JSON de `data/` analizados y reconciliación del directorio aprobada por el prebuild.
- `node scripts/verify-tools-pages.mjs`: 16 rutas estáticas con secciones, canonical, JSON-LD y acceso a la herramienta correspondiente.
- `node scripts/test-visual-guides.mjs`: títulos y slugs únicos de las 56 guías, agrupación temática, búsqueda con resultados y sin resultados, filtros y restablecimiento; imágenes de las tarjetas cargadas.
- Navegador Chromium en 390, 768 y 1440 px: sin desbordamiento horizontal. Apertura con Enter, navegación del diálogo por Tab, tamaño original, Escape y recuperación del foco. Comprobación a zoom CSS de 200% y revisión visual del modo oscuro.
- 79 capturas WebP con dimensiones reales y un control identificado por paso; 4,66 MB en total, carga diferida. Se revisaron encuadres de cálculo, documentos, editor de imágenes y paletas. El contorno azul es una anotación para localizar el control.

Evidencia: `guias-*.png`, `tutorial-*.png`. Las capturas de producción están en `public/images/tutoriales/`.

La herramienta de devoluciones restringe la vista y pide un correo para desbloquear copia y descarga. Se documenta el requisito sin completar ese envío. El conversor se probó con una imagen sintética en memoria y toda petición de red bloqueada durante la interacción. No se cargaron archivos privados.

Las pruebas verifican navegación y presentación; no certifican accesibilidad integral ni validan jurídicamente las plantillas de terceros. La incorporación de un botón de regreso desde Nube para Pymes se documenta en `docs/tutoriales-nube-integracion.md` y dispone de un índice público listo para consumir.
