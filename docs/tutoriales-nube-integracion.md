# Tutoriales compartidos con Nube para Pymes

Todo Lima mantiene los tutoriales en `/herramientas/<slug>`. Cada paso tiene un enlace estable `#tutorial-paso-N` y una captura de la herramienta correspondiente.

El índice público `/tutoriales-herramientas.json` contiene `toolUrl`, `tutorialUrl` y los títulos, enlaces y capturas de cada paso. Nube para Pymes puede utilizar estos datos para añadir «Ver tutorial ilustrado en Todo Lima» en cada herramienta, sin duplicar el contenido editorial. Las imágenes y enlaces del índice son URLs absolutas de Todo Lima.

El cambio en este repositorio enlaza cada tutorial con la aplicación de Nube. El botón de regreso dentro de Nube requiere implementar el consumo del índice en el repositorio de ese proyecto; este repositorio no modifica su despliegue remoto.

Para actualizar capturas: `node scripts/capture-tool-tutorials.mjs`. Se puede limitar a uno o varios slugs como argumentos. El script usa contextos aislados, bloquea la red tras cargar la aplicación y trabaja con entradas ficticias; el conversor recibe una imagen sintética generada en memoria. No se usan archivos privados ni se envían correos de desbloqueo.

`npm run build` regenera el índice y exige una captura con control verificado para cada paso. Ejecutar después `node scripts/test-visual-guides.mjs` y revisar las imágenes de evidencia; la coincidencia de un texto por sí sola no valida la calidad del encuadre.
