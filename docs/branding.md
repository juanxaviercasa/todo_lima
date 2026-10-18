# Identidad Todo Lima — octubre 2026

Dirección aprobada: monograma local TL con marcador de ubicación, sin ola,
relieves ni degradados. Azul `#0284C7`, nombre `#0F172A`, blanco inverso.
Outfit 800 para el nombre y Plus Jakarta Sans para «Tu guía local».

## Archivos

- `public/brand/logo-symbol.svg`: maestro del símbolo; versiones blanca y negra.
- `public/brand/logo-horizontal.svg`: composición horizontal portable (Outfit con
  respaldo Arial si el receptor no tiene la fuente); PNG transparente de respaldo.
- `components/BrandLogo.js`: composición web con las fuentes reales del sitio,
  texto accesible y símbolo decorativo; usada en navegación y pie de página.
- `public/favicon.svg` y `public/favicon.ico`: TL sin marcador, para conservar
  espacios y trazos a 16/32/48 px. No reducir el símbolo completo a estos tamaños.
- `public/apple-touch-icon.png`: 180 px; iconos de 192/512 px en `public/brand`.
- `public/site.webmanifest`: identidad para accesos guardados; no añade modo offline.
- `public/brand/logo-organization.png`: versión de fondo claro para datos estructurados.

Regenerar exportaciones con `node scripts/generate-brand-assets.mjs` (usa sharp).
Mantener proporciones, dejar al menos un sexto del ancho como espacio libre alrededor
del símbolo y usar el microicono por debajo de 32 px. El logo JPG anterior se
conserva para compatibilidad con enlaces existentes; ya no aparece en la navegación.

La lámina generada fue una referencia conceptual: los activos de producción se
reconstruyeron como geometría SVG, sin recortar imágenes de la presentación.
La búsqueda local de iconos no encontró una coincidencia para marca/logotipo;
las decisiones siguen el concepto aprobado y los criterios generales de legibilidad.
