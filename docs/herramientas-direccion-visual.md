# Imágenes de herramientas de Todo Lima

Generadas con la herramienta integrada de imágenes. 17 escenas nuevas: una portada y 16 herramientas. Además, se amplió la ilustración existente del blog a 16:9, sin recortar su composición.

Los prompts individuales y los archivos originales generados están identificados en `herramientas-imagenes-prompts.json`. Cada prompt de herramienta se combina con estas instrucciones:

> Use case: photorealistic-natural. Asset: Todo Lima website image. Hyperrealistic editorial photography in contemporary Lima Peru, natural skin texture, anatomically realistic hands, gentle daylight, professional restrained colors, 35mm lens. Exact 16:9 landscape 1536x864, full frame, no borders, collage, watermarks, logos or readable text. Fictional business scene.

Para la portada: protagonistas a la derecha y espacio visual tranquilo a la izquierda para el titular HTML. El QR es ilustrativo, no una dirección de pago real. Ninguna escena identifica un negocio real ni acredita el uso de una herramienta.

## Archivos finales

- `public/images/herramientas/`: 17 escenas, cada una en WebP de 1440×810, 768×432 y 480×270.
- `public/images/editorial/blog-lima-portada-v2*.webp`: portada ampliada del blog en las mismas tres resoluciones.
- `lib/toolImages.js`: correspondencia explícita entre cada herramienta, imagen y texto alternativo.

La versión original del blog se conserva. Los WebP finales están versionados y no necesitan generación durante el despliegue. `scripts/prepare-tools-artwork.mjs` permite reconstruirlos desde los originales locales, pero no se ejecuta automáticamente en CI.
