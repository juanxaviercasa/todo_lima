# Tema y compartir — 2026-10-17

- Claro por defecto, incluso con preferencia oscura del dispositivo; se respeta la elección guardada. Los controles del encabezado y pie se sincronizan.
- Compartir en navegación: página actual o portada, apps nativas, WhatsApp, Facebook, Telegram, X y copiar enlace. Escape devuelve el foco; si se deniega el portapapeles se ofrece el enlace seleccionable.
- Contactos de tarjetas/fichas incluyen su URL pública (portada cuando no hay ficha publicada).
- Open Graph y Twitter usan una tarjeta JPEG 1200×630 con logo; se conservan las imágenes específicas de los artículos.
- Prueba: ejecutar `node scripts/preview-share.mjs` tras el build y `node scripts/smoke-sharing.mjs` en otra terminal.
- Validado: preferencia del dispositivo oscura, persistencia de ambos temas, enlaces, metadatos, portapapeles denegado, Escape/foco, 375/812/1280 px y texto al 200 %. JSON de data: 134 válidos; verify:seo correcto; build: 568 páginas.
- Avisos del entorno: descarga de Google Fonts no disponible; exportación estática conserva el aviso preexistente de middleware/API. No se verificó el selector nativo de apps ni la caché de previews de redes externas.
- Referencias: https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata y https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
