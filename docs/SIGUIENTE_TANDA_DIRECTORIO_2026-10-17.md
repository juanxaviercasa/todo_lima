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

Esta revisión no incorpora negocios ni modifica la base remota. El siguiente trabajo es verificar y completar la tanda de 12; después se puede ampliar la taxonomía con los nuevos candidatos.
