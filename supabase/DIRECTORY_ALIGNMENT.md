# Alineación del directorio — 2026-10-12

Supabase existente: 14 áreas, 126 categorías, 50 distritos (43 Lima + 7 Callao), 5068 negocios conservados. categories.area_slug es el área principal; directory_area_recommendations contiene recomendaciones secundarias sin duplicar categorías. businesses.district conserva el dato original; district_slug se resuelve solo por alias explícito y district_assignment identifica su procedencia. 2962 resueltos y 2106 Lima ambiguos. El trigger actualiza la proyección cuando un escritor anterior modifica district.

business_service_districts representa cobertura confirmada y permanece vacío: no se deduce de ubicación. Campos de trazabilidad obligatorios y sin acceso público. directory_district_profiles guarda las dos fichas depuradas; directory_taxonomy_releases conserva catálogo privado inmutable para agentes. Las zonas son agrupaciones editoriales, no divisiones administrativas. UBIGEO queda nulo hasta verificación específica.

La migración de esta carpeta se aplicó con el importador scripts/align-todolima-db.mjs del workspace Sistema_Automatizado, después del lector sectorial. No ejecutar como seed genérico en un proyecto vacío: requiere las tablas originales, catálogo y role sector_catalog_reader_v1. El release JSON es evidencia de la semilla, no un nuevo catálogo maestro independiente.

El sistema autónomo en Oracle congela catálogo/contexto de directorio antes de encolar y mantiene buyer personas separados de hechos. La vista privada directory_agent_business_context expone solo campos públicos y admite consulta de ID exacto. El lector no tiene acceso directo a businesses ni a leads. Importaciones antiguas conservan compatibilidad con district y category_slug.

El frontend estático continúa usando data/*.json. Este cambio no declara sincronización automática de todos los negocios entre esos archivos y Supabase. No sustituir registros remotos por datos locales sin reconciliar identidad y procedencia.

El importador bulk-migration ahora carga DATABASE_URL del entorno/backend, verifica TLS con CA pública y no marca automáticamente como verificados los registros nuevos. Una credencial incrustada preexistente fue retirada del archivo vigente; su historial requiere rotación administrada sin interrumpir clientes existentes.

Respaldo DB privado: directory_backup_20261012_v1; tablas originales businesses y categories. Restauración ensayada en tablas temporales. Reversión operativa: volver a imagen previa y conservar esquema aditivo; no borrar negocios ni reiniciar importaciones. Evidencia y despliegue en operations/DIRECTORY_ALIGNMENT.md de Sistema_Automatizado.
