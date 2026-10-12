# Reconciliación web estática → Supabase → web

DIR-02, 12 de octubre de 2026. Encargo autorizado: reconciliar archivos de Todo Lima y su pipeline con Supabase. Reutiliza taxonomía DIR-01, resolución de distritos y componentes existentes. Aceptación: coincidencia por identidad fuerte, campos poblados preservados, respaldo y recuperación, trazabilidad privada, copia pública íntegra, repetición sin escrituras y build/QA real. No se realizó scraping nuevo, inferencia ni contacto.

## Resultado aplicado

- Fuente: 5.768 registros en 126 archivos de categorías; destino existente: 5.068 registros Supabase.
- 5.032 coincidencias por categoría e identidad Maps CID/place ID. Ninguna inserción necesaria.
- 2.059 distritos antes ambiguos completados con la observación local resuelta. Ningún cambio en nombre, dirección, teléfono, web, valoración, reseñas, verificación o campos de prospección.
- 47 ubicaciones permanecen sin distrito normalizado.
- 5.032 observaciones públicas de procedencia guardadas en tabla privada; 2.008 coincidencias conservan diferencias de los campos comparados como conflictos, sin reemplazo automático.
- 718 casos/grupos en revisión: 700 entradas sin identidad fuerte y 18 grupos de observaciones locales contradictorias. No son 718 nuevas empresas demostradas. Los archivos originales se conservan.
- La copia web exportada contiene exactamente los 5.068 registros del destino. Surquillo tiene 193 registros de categoría / 182 negocios distintos; Los Olivos, 156 / 154. La deduplicación entre categorías solo afecta al listado distrital, no elimina filas de Supabase.

SHA-256 canónico de la copia: 366e0bdd1b1635f591817b5479aa16f023e2e6925fcfcd1240847c6d656a7535. Una consulta posterior y una segunda aplicación confirmaron cero inserciones y cero actualizaciones. La segunda aplicación dejó 5.032 observaciones y 718 revisiones, sin duplicados.

## Pipeline único para el inventario público

scripts/reconcile-directory.mjs del backend lee getSourceDirectory(): archivos raw y resolución vigente de distritos. Usa identidad Maps fuerte y categoría. No compara negocios por nombre ni confía en biz_N como identidad global. Una identidad local contradictoria o varias filas remotas con la misma identidad detienen ese grupo y crean revisión.

Los campos remotos poblados prevalecen. Solo rellena vacíos reales; district=Lima es explícitamente no resuelto y puede completarse cuando coincide la identidad fuerte. No incrementa verificación, no interpreta contacto como consentimiento ni usa el resumen privado de auditorías como fuente pública. Una ficha nueva usa ID determinista, rating desconocido nulo e is_verified=false.

El importador adquiere exclusión transaccional, respalda, aplica lotes, verifica campos protegidos y replay y confirma antes de exportar. Un archivo temporal y rename publican data/directory.snapshot.json; ante fallo se conserva la copia anterior y el comando falla. Si la base se confirmó pero falló la exportación, directory:export permite recuperarla sin reimportar.

lib/directory.js ahora usa exclusivamente el snapshot para directorio público, áreas, categorías, páginas distritales, perfiles y sitemap. Ausencia, corrupción, categoría ajena, ID duplicado o campo privado impiden el build; no se sustituye silenciosamente por raw. El lector raw se conserva separado para ingesta. La copia lleva IDs Supabase, campos públicos permitidos y hash; no contiene credenciales, leads, pitches, observaciones de conflicto o consentimientos.

npm run db:sync, scripts/pipeline.js y scripts/batch-expand.js usan el reconciliador público. prebuild/predev comprueban integridad sin credenciales; el host estático puede construir desde la copia versionada. Las auditorías y los prototipos internos mantienen sus fuentes propias. Los scripts heredados de migración privada se conservan fuera del recorrido público predeterminado y no se ejecutaron.

## Operación

En Todo Lima:

```text
npm run directory:plan
npm run directory:reconcile -- --apply
npm run directory:export
npm run test:directory
npm run build
npm run verify:seo
```

Conexión administrativa solo en el entorno backend que ejecuta la ingesta; .env.local o variables del proceso, TLS verificado y destino contrastado con el proyecto. Timeout de conexión 10 s y consultas 30 s. Ningún secreto se exporta a la web o al paquete. El worker Oracle conserva su lector limitado; los campos de sus consultas por ID ya reflejan las ubicaciones reconciliadas, sin cambiar imagen ni reconstruir casos antiguos.

directory_source_observations y directory_reconciliation_reviews tienen RLS, sin SELECT de anon/authenticated/lector de agentes; service_role solo SELECT/INSERT. La observación conserva el payload permitido, identidad, hash, fecha de fuente y conflictos. La revisión guarda razón e identidad/hash; los candidatos sin identidad permanecen en raw para investigación, no se asignan a un negocio inventado.

## Pruebas y reversión

Nueve pruebas Node cubren CID equivalente, dominios falsos, ausencia de identidad, no unión por nombre, preservación/relleno, replay, conflictos locales/remotos, allowlist, corrupción y escapes inválidos. Build y comprobación SEO aprobados: 126 categorías, 14 áreas, 19 landings locales, 35 perfiles y ocho guías. El verificador de JSON se corrigió para recorrer categorías explícitas; anteriormente confundía district-profiles.json con un archivo de negocios.

Chromium sobre export estático: tres rutas distritales a 375/768/1440, teclado, zoom 200 %, sin overflow ni errores JavaScript, sitemap y 404. Capturas/recibo en pilot/output/district-qa. Comprobación DB en nueva conexión: 5.068 negocios, 47 sin resolver, 5.032 observaciones, 718 revisiones y cero campos protegidos cambiados contra el respaldo original. No acredita conversión, accesibilidad integral o contacto real.

Respaldo inicial privado: directory_reconciliation_backup_20261012.businesses, anterior a las 2.059 correcciones. Ejecuciones posteriores crean una tabla privada fechada por ejecución antes de escribir. Último ensayo: businesses_20261012183610441, con restauración de 5.068 filas en tabla temporal. Las copias públicas anteriores se guardan localmente en .directory-backups; recibos en .directory-reports (ambos excluidos de Git). La retención de respaldos requiere mantenimiento; no se borran automáticamente.

Reversión rutinaria: recuperar snapshot y código de la versión anterior y reconstruir. Para revertir enriquecimientos DB, restaurar únicamente campos distritales de los IDs afectados desde el respaldo, contrastando escrituras posteriores; no sobrescribir toda la tabla ni borrar observaciones inmutables. No eliminar businesses, leads o casos para revertir una vista estática.

La web recompilada queda validada localmente. La publicación remota de Todo Lima/GitHub sigue pendiente de autorización explícita de publicación; no se presenta como desplegada. Los 718 casos de revisión y 47 ubicaciones restantes requieren evidencia adicional.
