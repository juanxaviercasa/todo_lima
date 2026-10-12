# Sistema de diseño — todo-lima

## Alcance y autoridad
Integración de UI UX Pro Max, commit 67803eac81607188194aea9842a723b89326d90d. Este documento registra criterios de
trabajo; no afirma que la interfaz existente ya los cumpla. No sustituye sistemas,
tokens ni decisiones de marca existentes en otras carpetas. Leerlos primero.

Stack observado: Next.js + React; comprobar versiones en package.json.
Referencia inicial existente: `app/globals.css`. Revisar componentes y estilos reales
antes de extraer tokens. Conservar colores, tipografías y componentes actuales;
no adoptar automáticamente una paleta genérica del catálogo.

## Objetivo
Búsqueda, filtros, fichas, contenido local y navegación móvil.

## Flujo de trabajo
1. Leer este MASTER.md y pages/<pagina>.md si existe, junto con instrucciones locales.
2. Consultar la skill solo para decisiones visuales o de interacción. Una búsqueda
   concreta por problema; detectar tecnología y versión antes de consultar --stack.
3. Para nuevas páginas, obtener una propuesta con --design-system y contrastarla
   con la identidad existente. No persistir resultados sin revisar ni usar --force.
4. Registrar decisiones aceptadas y excepciones por página, con su justificación.
5. Implementar y verificar en navegador antes de declarar terminada una interfaz.

## Criterios de aceptación
- Comprobar móvil, escritorio, zoom, textos largos en español y ausencia de recortes.
- Probar teclado, foco visible, nombres accesibles y errores junto a sus campos.
- Medir contraste sobre colores realmente renderizados; no confiar en etiquetas del catálogo.
- Revisar estados vacío, carga, error, éxito y permisos; respetar movimiento reducido.
- Conservar estado y foco al cancelar operaciones o interrumpir animaciones.
- Ejecutar build y verificaciones pertinentes del proyecto cuando cambie código.
- Adjuntar evidencia visual de pantallas cambiadas y declarar pruebas pendientes.
- No afirmar cumplimiento integral de accesibilidad ni mejora de conversión sin evidencia.

## Datos y mantenimiento
Las consultas no deben incluir datos privados. La skill es una herramienta local
de desarrollo; no añade servicios, dependencias del producto ni despliegues VPS.
Actualizar solo tras revisar diferencias y conservar trazabilidad del commit.
