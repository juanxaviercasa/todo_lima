# Revisión de la siguiente tanda del directorio

Fecha: 17 de octubre de 2026. Alcance: configuración y datos que utiliza el código local de la web; no se acredita que el despliegue público esté en esta misma revisión.

## Hallazgos comprobados

- 126 categorías configuradas; 56 con negocios en `data/directory.snapshot.json` y 70 sin negocios en ese snapshot.
- 5.068 registros públicos en total. Son registros por categoría, no necesariamente empresas únicas.
- Las 70 categorías vacías tienen 700 registros de origen (diez por categoría). Ninguno tiene una identidad fuerte de Maps reconocida por `mapsIdentity`: CID o Place ID. El reconciliador los deriva a revisión por `missing_strong_identity`. No basta con volver a ejecutar la sincronización.
- Electricistas tiene solo tres registros públicos y requiere refuerzo.
- Turismo, construcción y servicios para negocios tienen categorías configuradas, pero cero registros públicos. Por tanto, su cobertura efectiva está pendiente.
- Los 134 archivos JSON bajo `data/` se pudieron parsear; el control del snapshot se ejecuta también en prebuild. La validez estructural no certifica exactitud de teléfonos, reseñas, coordenadas o negocios.

## Tanda inmediata recomendada: 12 categorías existentes

La prioridad es una decisión editorial basada en utilidad cotidiana, complementariedad y facilidad de acotar el servicio. No representa volúmenes de búsqueda ni conversiones medidos.

| Orden | Categoría | Situación y trabajo |
|---|---|---|
| 1 | Electricistas | Reforzar los tres registros actuales |
| 2 | Empresas de limpieza | Verificar los diez candidatos de origen |
| 3 | Limpieza de muebles | Separar servicio a domicilio de venta de muebles |
| 4 | Desatoros | Confirmar cobertura y canales; comprobar cualquier anuncio de 24 horas |
| 5 | Ferreterías | Identificar sedes y distritos reales |
| 6 | Albañilería y remodelaciones | Precisar especialidad y cobertura |
| 7 | Arquitectura | Diferenciar estudio, profesional y constructor |
| 8 | Reparación de impresoras | Confirmar equipos y marcas atendidos |
| 9 | Courier y mensajería | Diferenciar mensajería urbana de transporte de carga |
| 10 | Academias de idiomas | Verificar sedes, modalidades y contacto |
| 11 | Hospedajes para mascotas | Diferenciar alojamiento de guardería diurna |
| 12 | Agencias de turismo | Verificar operador y servicios realmente ofrecidos |

Objetivo operativo propuesto: al menos cinco opciones comprobables por categoría, salvo una excepción editorial documentada. La tanda necesita investigación y validación antes de publicar; los 700 registros previos son candidatos, no fichas verificadas.

## Categorías realmente nuevas para la tanda posterior

No existen como slugs dedicados en la configuración actual. Su ausencia como categoría no implica que ningún negocio actual ofrezca esos servicios.

| Prioridad | Categoría propuesta | Slug propuesto | Delimitación |
|---|---|---|---|
| A | Traductores e intérpretes | traductores-e-interpretes | Distinguir traducción simple, certificada y pública juramentada |
| A | Mantenimiento y recarga de extintores | mantenimiento-de-extintores | Separar venta, recarga e instalaciones contra incendios |
| A | Pozos a tierra | pozos-a-tierra | Instalación y mantenimiento; puede compartir proveedores con electricistas |
| A | Terapia de lenguaje | terapia-de-lenguaje | Servicio específico frente a fisioterapia y psicología |
| A | Terapia ocupacional | terapia-ocupacional | Especialidad y población atendida comprobables |
| B | Administración de edificios y condominios | administracion-de-edificios | Diferenciar de intermediación inmobiliaria |
| B | Mantenimiento de bombas de agua | mantenimiento-de-bombas-de-agua | Diferenciar de gasfitería y limpieza de cisternas |
| B | Electricidad automotriz | electricidad-automotriz | Talleres con esa especialidad explícita |
| B | Reparación de motos | talleres-de-motos | No asumir que un taller de autos atiende motos |
| B | Agentes de aduana | agentes-de-aduana | Definir Lima y Callao por separado al registrar sedes |

Los primeros cinco candidatos tienen fuentes iniciales consultadas; los de prioridad B son hipótesis para investigar antes de aprobar su incorporación. No crear todavía rutas vacías ni subdividir especialidades médicas, legales o restaurantes sin suficiente oferta comprobada.

## Fuentes iniciales consultadas

- [Directorio del Ministerio de Relaciones Exteriores](https://www.gob.pe/institucion/rree/colecciones/60818-directorio-de-traductores-publicos-del-peru) y [Colegio de Traductores](https://www.colegiodetraductores.org.pe/traductores/): puntos de partida para verificar traductores; filtrar por Lima.
- [GROUPMEN](https://www.groupmen.pe/): publica servicios de extintores y pozos a tierra; es evidencia de oferta, no una recomendación del proveedor.
- [ARIE Santa Anita](https://santaanita.arie.org.pe/): publica servicios de lenguaje y terapia ocupacional.
- [CENDA](https://cendaperu.com/): publica ambas terapias en Lima.

## Secuencia de implementación

1. Revisar los candidatos de las 12 categorías iniciales contra fuentes primarias actuales; conservar fuente y fecha de cada dato.
2. Obtener identidad estable de sede y contacto. No fabricar CID, Place ID, calificaciones, reseñas ni coordenadas para superar controles.
3. Deduplicar por sede y categoría; registrar discrepancias sin sobrescribir automáticamente datos existentes.
4. Ejecutar el plan de reconciliación, resolver revisiones y exportar el snapshot público mediante el flujo existente.
5. Validar JSON, integridad del snapshot, compilación y presencia de los registros en las rutas correspondientes antes de considerar publicada la tanda.

## Resultado ejecutado (17 de octubre de 2026)

- **117 registros verificados** en las 12 categorías de la tanda inmediata (3 registros previos conservados en `electricistas` + **114 inserciones nuevas** en Supabase con identidad fuerte de Google Maps `cid:` y coordenadas reales `!3d...!4d...`).
- **67 categorías con negocios públicos** en `data/directory.snapshot.json` (frente a 56 previas) y **5.182 registros públicos** totales (frente a 5.068 previos).
- Las 11 categorías antes vacías redujeron en 110 los casos `missing_strong_identity` pendientes de revisión (de 700 a 590).
- **Respaldo automático en Supabase**: `directory_reconciliation_backup_20261012.businesses_20261017203051315` (5.068 filas previas verificadas).
- **SHA-256 canónico del snapshot exportado**: `6b0543583c6da563e49016758f5f24ee333696eb22a1af708bf652fec37ca822` (`replay_inserts: 0`, `replay_updates: 0`, `existing_populated_fields_preserved: true`).

| Orden | Categoría (`slug`) | Antes | Después | Distritos cubiertos |
|---|---|---:|---:|---|
| 1 | `electricistas` | 3 | 10 | Cercado de Lima, Jesús María, Ate, Lurigancho-Chosica, Lince, Miraflores |
| 2 | `empresas-de-limpieza` | 0 | 10 | Barranco, Santiago de Surco, San Isidro, Jesús María, Surquillo, Miraflores, Pueblo Libre |
| 3 | `limpieza-de-muebles` | 0 | 10 | Ate, Lince, La Molina, San Borja, San Isidro, Santiago de Surco, Los Olivos, Surquillo |
| 4 | `desatoros` | 0 | 8 | Bellavista, San Juan de Lurigancho, Surquillo, Independencia, Miraflores, Ate, San Borja, Lince |
| 5 | `ferreterias` | 0 | 10 | Lurín, Jesús María, San Isidro, Surquillo, Lince |
| 6 | `albanileria-y-remodelaciones` | 0 | 10 | Ate, Chaclacayo, Surquillo, Breña, San Miguel, Cercado de Lima, Miraflores, Santiago de Surco |
| 7 | `arquitectura` | 0 | 10 | Santiago de Surco, Lurigancho-Chosica, Miraflores, Barranco |
| 8 | `reparacion-de-impresoras` | 0 | 10 | Surquillo, Cercado de Lima, San Isidro, Lince, Los Olivos, Chorrillos |
| 9 | `courier-y-mensajeria` | 0 | 10 | Santiago de Surco, San Isidro, Miraflores, Surquillo |
| 10 | `academias-de-idiomas` | 0 | 9 | Miraflores, San Borja, Jesús María, Pueblo Libre, Cercado de Lima, La Molina |
| 11 | `hospedajes-para-mascotas` | 0 | 10 | Barranco, Santiago de Surco, Lince, Lurigancho-Chosica, Pachacámac, San Juan de Lurigancho, Lurín, Cieneguilla |
| 12 | `agencias-de-turismo` | 0 | 10 | San Isidro, Miraflores, Jesús María, Los Olivos, Santiago de Surco |
