const descriptions = {
  'sobre-nosotros': 'Escena ilustrativa de comercios y vida cotidiana en un barrio de Lima.',
  contacto: 'Escritorio preparado para atender consultas digitales, con una vista urbana de Lima.',
  'preguntas-frecuentes': 'Escena ilustrativa de una consulta entre un cliente y un comerciante local.',
  'equipo-editorial': 'Espacio de trabajo ilustrativo de un editor independiente; no muestra al autor.',
  'mapa-del-sitio': 'Escritorio con mapa y recursos para organizar un recorrido por Lima.'
};
export const INSTITUTIONAL_IMAGES = Object.fromEntries(Object.entries(descriptions).map(([id, alt]) => {
  const base = `/images/institucional/${id}`;
  return [id, {src: `${base}.webp`, srcSet: `${base}-480.webp 480w, ${base}-768.webp 768w, ${base}.webp 1440w`, alt}];
}));
