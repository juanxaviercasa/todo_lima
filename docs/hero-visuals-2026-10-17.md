# Cabeceras fotográficas — 2026-10-17

Se conserva composición, imágenes y tipografía. La protección se concentra en la zona de lectura:
- Atlas: opacidad izquierda .94 → .76; a 55 % del ancho, .58; se desvanece hasta cero a la derecha.
- Portada y cabeceras editoriales: .93 → .76 a la izquierda, .10 al 78 % y cero al borde derecho.
- Portada móvil: .68 → .58; Atlas y editoriales mantienen fotografía separada del texto, sin sombra superpuesta cuando así lo define su layout.
- Artículos: centro superior más transparente, protección inferior localizada. Sombra tipográfica suave en las zonas de lectura.

Validación visual sobre exportación final: portada, Conoce Lima, herramientas, gasfiteros, guías y blog, a 1440 y 375 px; sin desbordamiento horizontal. Revisadas capturas de portada, Conoce Lima y herramientas. El mismo gradiente se mantiene en tema oscuro. No se certifica accesibilidad integral ni contraste de todas las imágenes presentes/futuras.

Build correcto: 568 páginas. Evidencia local en `.directory-reports/ui-2026-10-17/`. Prueba reproducible: servidor `node scripts/preview-share.mjs`, luego `node scripts/smoke-hero-visuals.mjs`.

Verificación tras integrar publicaciones remotas de main: build correcto, 573 páginas; verify:seo correcto.
