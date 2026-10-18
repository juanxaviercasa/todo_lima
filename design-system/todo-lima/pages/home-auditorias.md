# Portada, identidad y auditorías

- Conservar Next.js 14, React 18, tipografías y azul de marca existentes.
- Portada: mostrar propósito, misión y visión después del hero; mantener su acceso directo al directorio. Reutilizar `lib/brand.js` en «Sobre nosotros».
- Expresar la visión como aspiración, sin atribuir certificaciones, liderazgo ni resultados comerciales no demostrados.
- La consulta UX de contraste recomienda 4.5:1 para texto normal. La consulta `marketplace-directory` recomienda conservar categorías y búsqueda como acciones principales.
- Las tarjetas editoriales usan CSS sin capa que prevalece sobre utilidades. Para el CTA oscuro compartido por todas las auditorías, usar `editorial-card-inverse` con fondo y texto explícitos en ambos temas, en lugar de combinar fondo blanco editorial y texto claro.
- Botón principal del CTA: azul #0369a1 y texto blanco; foco visible también en controles de entrada.
- Evidencias y comprobación reproducible: `artifacts/visual-qa/check-brand-audits.mjs`. El ancho de 720 CSS px aproxima el reflujo de escritorio a 200%; no sustituye una comprobación manual de zoom del navegador.
