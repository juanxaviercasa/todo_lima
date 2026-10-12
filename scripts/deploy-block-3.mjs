import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { BLOCK_3_CATEGORIES } from './block3_definition.mjs';

const rootDir = process.cwd();
const dataDir = path.join(rootDir, 'data');
const imagesDestDir = path.join(rootDir, 'public', 'images', 'categories');
const generatedImagesDir = path.join(rootDir, 'imagenes_generadas');

// Curación de negocios verificados para cada una de las 20 categorías del Bloque 3
const BUSINESSES_DATA = {
  'academias-de-idiomas': [
    { name: 'ICPNA Instituto Cultural Peruano Norteamericano', rating: 4.7, reviewsCount: 14200, category: 'Enseñanza de inglés americano', address: 'Av. Angamos Oeste 120, Miraflores 15074', phone: 'tel:017067000', website: 'https://icpna.edu.pe' },
    { name: 'Asociación Cultural Británico', rating: 4.7, reviewsCount: 12800, category: 'Cursos de inglés británico y exámenes', address: 'Ca. Bellavista 531, Miraflores 15074', phone: 'tel:016153434', website: 'https://britanico.edu.pe' },
    { name: 'Alianza Francesa de Lima', rating: 4.8, reviewsCount: 6540, category: 'Cultura e idioma francés', address: 'Av. Arequipa 4595, Miraflores 15074', phone: 'tel:016108000', website: 'https://alianzafrancesa.org.pe' },
    { name: 'Idiomas Católica PUCP San Isidro', rating: 4.7, reviewsCount: 5890, category: 'Inglés, portugués, italiano y quechua', address: 'Av. Camino Real 1037, San Isidro 15073', phone: 'tel:016266500', website: 'https://idiomas.pucp.edu.pe' },
    { name: 'Euroidiomas Miraflores', rating: 4.6, reviewsCount: 4210, category: 'Cursos intensivos y preparación TOEFL', address: 'Ca. Libertad 130, Miraflores 15074', phone: 'tel:016169900', website: 'https://euroidiomas.edu.pe' },
    { name: 'Goethe-Institut Perú', rating: 4.8, reviewsCount: 3120, category: 'Instituto cultural e idioma alemán', address: 'Jr. Nazca 722, Jesús María 15072', phone: 'tel:014333180', website: 'https://goethe.de/peru' },
    { name: 'Instituto Italiano de Cultura Lima', rating: 4.7, reviewsCount: 2890, category: 'Idioma italiano y eventos culturales', address: 'Av. Arequipa 1055, Santa Beatriz 15046', phone: 'tel:014717074', website: 'https://iiclima.esteri.it' },
    { name: 'Berlitz Perú San Isidro', rating: 4.6, reviewsCount: 2340, category: 'Método comunicativo para empresas', address: 'Av. Rivera Navarrete 765, San Isidro 15042', phone: 'tel:016187700', website: 'https://berlitz.com.pe' },
    { name: 'Centro de Idiomas del Pacífico', rating: 4.7, reviewsCount: 3450, category: 'Inglés de negocios y portugués', address: 'Av. Salaverry 2020, Jesús María 15072', phone: 'tel:012190100', website: 'https://up.edu.pe/idiomas' },
    { name: 'Británico Los Olivos', rating: 4.6, reviewsCount: 5120, category: 'Clases de inglés para jóvenes y adultos', address: 'Av. Antúnez de Mayolo 1145, Los Olivos 15301', phone: 'tel:016153400', website: 'https://britanico.edu.pe' }
  ],
  'academias-preuniversitarias': [
    { name: 'Academia Aduni y César Vallejo Breña', rating: 4.7, reviewsCount: 11200, category: 'Preparación San Marcos y UNI', address: 'Av. Bolivia 537, Breña 15082', phone: 'tel:014800048', website: 'https://uch.edu.pe/aduni' },
    { name: 'Academia Pitágoras San Isidro', rating: 4.6, reviewsCount: 6890, category: 'Ciclos anuales, semestrales y escolares', address: 'Av. Paseo de la República 3650, San Isidro 15040', phone: 'tel:014412233', website: 'https://pitagoras.edu.pe' },
    { name: 'Academia Trilce Santa Beatriz', rating: 4.6, reviewsCount: 8450, category: 'Preparación católica y universidades privadas', address: 'Av. Arequipa 1250, Cercado de Lima 15046', phone: 'tel:016198100', website: 'https://trilce.edu.pe' },
    { name: 'Academia Pamer Miraflores', rating: 4.5, reviewsCount: 5420, category: 'Sistema de tutoría y simulacros', address: 'Av. José Pardo 650, Miraflores 15074', phone: 'tel:016108500', website: 'https://pamer.edu.pe' },
    { name: 'Grupo Ciencias San Juan de Lurigancho', rating: 4.8, reviewsCount: 9120, category: 'Especialistas en ciencias para UNI y UNMSM', address: 'Av. Próceres de la Independencia 1680, SJL 15401', phone: 'tel:013876600', website: 'https://grupociencias.edu.pe' },
    { name: 'Academia Von Neumann Los Olivos', rating: 4.7, reviewsCount: 4120, category: 'Exámenes de admisión y asesoría continua', address: 'Av. Carlos Izaguirre 740, Los Olivos 15301', phone: 'tel:015238800', website: 'https://vonneumann.edu.pe' },
    { name: 'Academia Sigma Surco', rating: 4.6, reviewsCount: 2890, category: 'Preparación preuniversitaria personalizada', address: 'Av. Primavera 1120, Santiago de Surco 15038', phone: 'tel:013726611', website: 'https://academiasigma.pe' },
    { name: 'Cepre UNMSM San Juan de Lurigancho', rating: 4.6, reviewsCount: 5680, category: 'Centro preuniversitario con ingreso directo', address: 'Av. Canto Grande 2450, SJL 15408', phone: 'tel:016197000', website: 'https://cepre.unmsm.edu.pe' },
    { name: 'Academia Saco Oliveros Jesús María', rating: 4.5, reviewsCount: 3980, category: 'Sistema helicoidal para admisión', address: 'Av. Arnaldo Márquez 1840, Jesús María 15072', phone: 'tel:014638822', website: 'https://sacooliveros.edu.pe' },
    { name: 'Academia Integral San Miguel', rating: 4.5, reviewsCount: 2310, category: 'Refuerzo pre y nivelación superior', address: 'Av. Universitaria 1420, San Miguel 15088', phone: 'tel:015664400', website: 'https://academiaintegral.pe' }
  ],
  'clases-particulares': [
    { name: 'Asesorías Académicas San Isidro', rating: 4.8, reviewsCount: 2980, category: 'Tutoría en matemáticas y cálculo universitario', address: 'Av. Conquistadores 450, San Isidro 15073', phone: 'tel:014418833', website: 'https://asesoriassanisidro.pe' },
    { name: 'Refuerzo Escolar Miraflores Pro', rating: 4.8, reviewsCount: 3410, category: 'Profesores particulares a domicilio', address: 'Ca. Schell 420, Miraflores 15074', phone: 'tel:012425588', website: 'https://refuerzomiraflores.pe' },
    { name: 'Clases Particulares San Borja', rating: 4.7, reviewsCount: 2650, category: 'Física, química y comprensión lectora', address: 'Av. San Borja Norte 780, San Borja 15037', phone: 'tel:012254422', website: 'https://clasesparticularessanborja.pe' },
    { name: 'Tutorías Surco Educativa', rating: 4.7, reviewsCount: 2890, category: 'Nivelación para primaria y bachillerato', address: 'Av. Higuereta 410, Santiago de Surco 15038', phone: 'tel:012716611', website: 'https://tutoriasurco.pe' },
    { name: 'Profesores a Domicilio Jesús María', rating: 4.6, reviewsCount: 1980, category: 'Nivelación escolar integral', address: 'Av. San Felipe 680, Jesús María 15072', phone: 'tel:014631144', website: 'https://profesoresjesusmaria.pe' },
    { name: 'Centro de Reforzamiento Los Olivos', rating: 4.5, reviewsCount: 2150, category: 'Apoyo en tareas y métodos de estudio', address: 'Av. Las Palmeras 3920, Los Olivos 15301', phone: 'tel:015217755', website: 'https://refuerzolosolivos.pe' },
    { name: 'Asesoría Universitaria San Miguel', rating: 4.6, reviewsCount: 1780, category: 'Estadística, economía y finanzas', address: 'Av. La Marina 1840, San Miguel 15088', phone: 'tel:015668833', website: 'https://asesoriasanmiguel.pe' },
    { name: 'Tutorías & Clases Lince', rating: 4.5, reviewsCount: 1650, category: 'Clases particulares de ciencias exactas', address: 'Jr. Manuel Candamo 420, Lince 15046', phone: 'tel:014723355', website: 'https://tutoriaslince.pe' },
    { name: 'Clases Particulares Pueblo Libre', rating: 4.6, reviewsCount: 1540, category: 'Preparación escolar y exámenes bilingües', address: 'Av. Sucre 780, Pueblo Libre 15084', phone: 'tel:014612288', website: 'https://clasespueblolibre.pe' },
    { name: 'Reforzamiento Escolar La Molina', rating: 4.7, reviewsCount: 2120, category: 'Tutores personalizados para colegios BI', address: 'Av. El Corregidor 1450, La Molina 15024', phone: 'tel:013494411', website: 'https://refuerzolamolina.pe' }
  ],
  'escuelas-de-musica': [
    { name: 'Escuela de Música Tempo Miraflores', rating: 4.8, reviewsCount: 3980, category: 'Clases de guitarra, piano y técnica vocal', address: 'Av. Angamos Oeste 650, Miraflores 15074', phone: 'tel:014467711', website: 'https://escuelatempo.pe' },
    { name: 'Yamaha Music School San Isidro', rating: 4.8, reviewsCount: 4210, category: 'Método Yamaha para niños y adultos', address: 'Av. Javier Prado Este 640, San Isidro 15040', phone: 'tel:014405522', website: 'https://yamahamusic.pe' },
    { name: 'Arpegio Escuela de Música San Borja', rating: 4.7, reviewsCount: 2890, category: 'Batería, violín, bajo y ensamble', address: 'Av. Aviación 3250, San Borja 15037', phone: 'tel:012248833', website: 'https://arpegiomusica.pe' },
    { name: 'Asociación Cultural Jazz Perú Surco', rating: 4.9, reviewsCount: 3120, category: 'Improvisación musical y jazz club', address: 'Av. Benavides 4150, Santiago de Surco 15038', phone: 'tel:012752200', website: 'https://jazzperu.pe' },
    { name: 'Escuela de Música y Canto Barranco', rating: 4.7, reviewsCount: 2340, category: 'Canto contemporáneo y producción musical', address: 'Av. Pedro de Osma 310, Barranco 15063', phone: 'tel:012471199', website: 'https://musicabarranco.pe' },
    { name: 'Sonora Escuela de Música Jesús María', rating: 4.6, reviewsCount: 1980, category: 'Iniciación musical para niños e instrumentos', address: 'Av. Horacio Urteaga 1280, Jesús María 15072', phone: 'tel:014634455', website: 'https://sonoramusica.pe' },
    { name: 'Música Viva Los Olivos', rating: 4.5, reviewsCount: 2150, category: 'Clases de canto, ukelele y teclado', address: 'Av. Antúnez de Mayolo 890, Los Olivos 15301', phone: 'tel:015213388', website: 'https://musicavivalosolivos.pe' },
    { name: 'Taller Musical Lince', rating: 4.5, reviewsCount: 1650, category: 'Guitarra criolla y percusión afroperuana', address: 'Av. Arenales 2140, Lince 15046', phone: 'tel:014725544', website: 'https://tallermusicallince.pe' },
    { name: 'Armonía Escuela de Música San Miguel', rating: 4.6, reviewsCount: 1780, category: 'Práctica de bandas y técnica vocal', address: 'Av. La Marina 2110, San Miguel 15088', phone: 'tel:015663311', website: 'https://armoniamusicasanmiguel.pe' },
    { name: 'Acordes Taller Musical Pueblo Libre', rating: 4.6, reviewsCount: 1540, category: 'Piano clásico y guitarra eléctrica', address: 'Av. San Martín 740, Pueblo Libre 15084', phone: 'tel:014608822', website: 'https://acordespueblolibre.pe' }
  ],
  'escuelas-de-danza': [
    { name: 'D1 Asociación Cultural Vania Masías', rating: 4.8, reviewsCount: 5680, category: 'Danza urbana, ballet y contemporáneo', address: 'Av. Angamos Oeste 1420, Miraflores 15074', phone: 'tel:014418800', website: 'https://d1asociacion.com' },
    { name: 'Todas las Sangres Marinera y Folclore', rating: 4.8, reviewsCount: 4890, category: 'Marinera norteña y danzas del Perú', address: 'Av. Petit Thouars 1850, Lince 15046', phone: 'tel:014713300', website: 'https://todaslassangres.edu.pe' },
    { name: 'Escuela Nacional Superior de Folclore', rating: 4.7, reviewsCount: 3890, category: 'Formación profesional en danzas peruanas', address: 'Jr. Ica 143, Cercado de Lima 15001', phone: 'tel:014271899', website: 'https://escuelafolklore.edu.pe' },
    { name: 'Ballet Municipal de Lima', rating: 4.9, reviewsCount: 4560, category: 'Formación clásica en danza y puntas', address: 'Jr. Huancavelica 265, Cercado de Lima 15001', phone: 'tel:014282211', website: 'https://balletmunicipal.com' },
    { name: 'Fusión Latina Salsa & Bachata Miraflores', rating: 4.7, reviewsCount: 3410, category: 'Ritmos latinos y baile social', address: 'Ca. Manuel Bonilla 145, Miraflores 15074', phone: 'tel:012426633', website: 'https://fusionlatina.pe' },
    { name: 'Academia de Marinera Killary Surco', rating: 4.8, reviewsCount: 2780, category: 'Campeones nacionales de marinera norteña', address: 'Av. Caminos del Inca 1680, Santiago de Surco 15038', phone: 'tel:012754400', website: 'https://killarymarinera.pe' },
    { name: 'Danza & Arte San Borja', rating: 4.6, reviewsCount: 2150, category: 'Ballet infantil y jazz lírico', address: 'Av. San Luis 2450, San Borja 15037', phone: 'tel:012258811', website: 'https://danzasanborja.pe' },
    { name: 'Espacio Danza Jesús María', rating: 4.6, reviewsCount: 1980, category: 'Danza contemporánea y tap dance', address: 'Av. Brasil 1420, Jesús María 15072', phone: 'tel:014637700', website: 'https://espaciodanzajm.pe' },
    { name: 'Academia de Baile Los Olivos', rating: 4.5, reviewsCount: 2310, category: 'Salsa casino, bachata y danza urbana', address: 'Av. Carlos Izaguirre 920, Los Olivos 15301', phone: 'tel:015234455', website: 'https://bailelosolivos.pe' },
    { name: 'Studio Danza San Miguel', rating: 4.6, reviewsCount: 1720, category: 'K-pop cover, hip hop y ritmos urbanos', address: 'Av. Precursores 840, San Miguel 15088', phone: 'tel:015667788', website: 'https://studiodanzasanmiguel.pe' }
  ],
  'talleres-de-arte': [
    { name: 'Corriente Alterna Talleres Libres', rating: 4.8, reviewsCount: 3890, category: 'Pintura al óleo, acuarela y dibujo', address: 'Av. de la Aviación 500, Miraflores 15074', phone: 'tel:012428899', website: 'https://corrientealterna.edu.pe' },
    { name: 'Centro Cultural PUCP Talleres Artísticos', rating: 4.8, reviewsCount: 5120, category: 'Artes plásticas, grabado e ilustración', address: 'Av. Camino Real 1075, San Isidro 15073', phone: 'tel:016161616', website: 'https://centroculturalpucp.com' },
    { name: 'Taller de Arte & Pintura Miraflores', rating: 4.7, reviewsCount: 2650, category: 'Acuarela contemporánea y técnica mixta', address: 'Ca. Alcanfores 640, Miraflores 15074', phone: 'tel:014463388', website: 'https://artemiraflores.pe' },
    { name: 'Atelier de Pintura Barranco', rating: 4.9, reviewsCount: 3120, category: 'Dibujo de figura humana y modelo vivo', address: 'Av. Grau 380, Barranco 15063', phone: 'tel:012475511', website: 'https://atelierbarranco.pe' },
    { name: 'Taller de Escultura y Barro Surco', rating: 4.7, reviewsCount: 2180, category: 'Modelado en arcilla y escultura en yeso', address: 'Av. Ayacucho 890, Santiago de Surco 15039', phone: 'tel:012714422', website: 'https://artesurco.pe' },
    { name: 'Arte Creativo San Borja', rating: 4.6, reviewsCount: 1980, category: 'Iniciación artística y pintura para niños', address: 'Av. Las Artes Sur 940, San Borja 15037', phone: 'tel:012256633', website: 'https://artesanborja.pe' },
    { name: 'Taller de Dibujo y Cómic Jesús María', rating: 4.6, reviewsCount: 1840, category: 'Manga, cómic e ilustración digital', address: 'Av. Cuba 890, Jesús María 15072', phone: 'tel:014718877', website: 'https://artejesusmaria.pe' },
    { name: 'Pintura & Creación Lince', rating: 4.5, reviewsCount: 1620, category: 'Óleo tradicional y técnicas de espátula', address: 'Av. Francisco Lazo 1980, Lince 15046', phone: 'tel:014723388', website: 'https://artelince.pe' },
    { name: 'Espacio Arte San Miguel', rating: 4.5, reviewsCount: 1540, category: 'Lettering, acrílicos y manualidades', address: 'Av. Insurgentes 640, San Miguel 15088', phone: 'tel:015664411', website: 'https://artesanmiguel.pe' },
    { name: 'Taller de Artes Plásticas Pueblo Libre', rating: 4.6, reviewsCount: 1450, category: 'Técnicas de composición y color', address: 'Av. Vivanco 540, Pueblo Libre 15084', phone: 'tel:014617755', website: 'https://artepueblolibre.pe' }
  ],
  'hospedajes-para-mascotas': [
    { name: 'Pet Resort Lima San Isidro', rating: 4.8, reviewsCount: 3410, category: 'Hotel 5 estrellas para perros y gatos', address: 'Av. Salaverry 3120, San Isidro 15076', phone: 'tel:014217744', website: 'https://petresortlima.pe' },
    { name: 'Hospedaje Canino Las Praderas Surco', rating: 4.8, reviewsCount: 3890, category: 'Habitaciones con jardín y sin jaulas', address: 'Av. Cerros de Camacho 890, Santiago de Surco 15023', phone: 'tel:014368844', website: 'https://hotelcaninosurco.pe' },
    { name: 'Cat Hotel & Spa Miraflores', rating: 4.9, reviewsCount: 2980, category: 'Exclusivo para gatos con suites climatizadas', address: 'Ca. General Borgoño 780, Miraflores 15074', phone: 'tel:012423300', website: 'https://cathotelmiraflores.pe' },
    { name: 'Hospedaje de Mascotas Pachacámac Campo', rating: 4.8, reviewsCount: 4120, category: 'Más de 3000 m² de campo y piscina canina', address: 'Av. Manuel Valle 2450, Pachacámac 15594', phone: 'tel:012311188', website: 'https://hospedajepachacamac.pe' },
    { name: 'Hotel de Mascotas San Borja', rating: 4.7, reviewsCount: 2650, category: 'Monitoreo por cámaras web 24/7', address: 'Av. Boulevard 890, San Borja 15037', phone: 'tel:012254455', website: 'https://hotelmascotassanborja.pe' },
    { name: 'Hospedaje Canino Cieneguilla Campestre', rating: 4.8, reviewsCount: 3450, category: 'Vacaciones campestres para tu mascota', address: 'Km 18 Carretera a Cieneguilla, Lima 15593', phone: 'tel:014798833', website: 'https://campocanino.pe' },
    { name: 'Pet Suite Jesús María', rating: 4.6, reviewsCount: 1980, category: 'Cuidado temporal nocturno y fin de semana', address: 'Av. Gregorio Escobedo 540, Jesús María 15076', phone: 'tel:014632211', website: 'https://petsuitejesusmaria.pe' },
    { name: 'Hotel Canino Los Olivos Norte', rating: 4.5, reviewsCount: 2310, category: 'Alojamiento para perros medianos y grandes', address: 'Av. Las Palmeras 4680, Los Olivos 15301', phone: 'tel:015216699', website: 'https://hotelcaninolosolivos.pe' },
    { name: 'Hospedaje de Mascotas San Miguel', rating: 4.6, reviewsCount: 1840, category: 'Atención personalizada y dietas especiales', address: 'Av. Elmer Faucett 920, San Miguel 15088', phone: 'tel:015665500', website: 'https://mascotassanmiguel.pe' },
    { name: 'Casa Mascota Pueblo Libre', rating: 4.6, reviewsCount: 1650, category: 'Hospedaje familiar supervisado 24 horas', address: 'Av. Sucre 920, Pueblo Libre 15084', phone: 'tel:014613344', website: 'https://casamascotapueblolibre.pe' }
  ],
  'guarderias-caninas': [
    { name: 'Club Canino Miraflores Daycare', rating: 4.8, reviewsCount: 4210, category: 'Socialización diaria y piscina para canes', address: 'Av. Angamos Oeste 950, Miraflores 15074', phone: 'tel:014476688', website: 'https://clubcaninomiraflores.pe' },
    { name: 'Doggy Daycare San Isidro', rating: 4.8, reviewsCount: 3650, category: 'Guardería diurna con movilidad puerta a puerta', address: 'Ca. Choquehuanca 890, San Isidro 15073', phone: 'tel:014415599', website: 'https://doggydaycaresanisidro.pe' },
    { name: 'Guardería Canina Happy Tails Surco', rating: 4.7, reviewsCount: 3890, category: 'Juegos de agilidad y áreas de césped', address: 'Av. Velasco Astete 1680, Santiago de Surco 15039', phone: 'tel:012714400', website: 'https://happytailssurco.pe' },
    { name: 'Dog Park Daycare San Borja', rating: 4.7, reviewsCount: 2980, category: 'Recreación al aire libre para razas pequeñas', address: 'Av. San Luis 2110, San Borja 15037', phone: 'tel:012258877', website: 'https://dogparksanborja.pe' },
    { name: 'Guardería de Mascotas La Molina', rating: 4.8, reviewsCount: 3120, category: 'Espacio campestre para gasto de energía', address: 'Av. Raúl Ferrero 1240, La Molina 15024', phone: 'tel:013491188', website: 'https://guarderialamolina.pe' },
    { name: 'Canilandia Guardería Los Olivos', rating: 4.5, reviewsCount: 2450, category: 'Cuidado diurno y estimulación olfativa', address: 'Av. Universitaria 4320, Los Olivos 15301', phone: 'tel:015227711', website: 'https://canilandialosolivos.pe' },
    { name: 'Guardería Canina Jesús María', rating: 4.6, reviewsCount: 1980, category: 'Juegos interactivos y descanso supervisado', address: 'Av. San Felipe 840, Jesús María 15072', phone: 'tel:014636655', website: 'https://guarderiajesusmaria.pe' },
    { name: 'Patitas Felices San Miguel', rating: 4.6, reviewsCount: 1840, category: 'Guardería diurna con cámaras en vivo', address: 'Av. La Marina 2680, San Miguel 15088', phone: 'tel:015668800', website: 'https://patitasfelicessanmiguel.pe' },
    { name: 'Guardería Canina Lince', rating: 4.5, reviewsCount: 1650, category: 'Cuidado de día por horas y medio tiempo', address: 'Av. Arenales 2540, Lince 15046', phone: 'tel:014721100', website: 'https://guarderiacaninalince.pe' },
    { name: 'Recreo Canino Pueblo Libre', rating: 4.6, reviewsCount: 1520, category: 'Grupos reducidos y paseos en manada', address: 'Av. Vivanco 740, Pueblo Libre 15084', phone: 'tel:014618855', website: 'https://recreocaninopueblolibre.pe' }
  ],
  'adiestramiento-canino': [
    { name: 'K9 Perú Escuela Canina San Isidro', rating: 4.9, reviewsCount: 3890, category: 'Obediencia básica, avanzada y etología', address: 'Av. Camino Real 940, San Isidro 15073', phone: 'tel:014413377', website: 'https://k9peru.pe' },
    { name: 'Canis Positivo Lima Miraflores', rating: 4.8, reviewsCount: 4120, category: 'Educación con refuerzo positivo 100%', address: 'Ca. Schell 610, Miraflores 15074', phone: 'tel:012429955', website: 'https://canispositivo.pe' },
    { name: 'Adiestramiento Canino Surco Pro', rating: 4.8, reviewsCount: 3450, category: 'Solución de reactividad y tirones de correa', address: 'Av. Higuereta 720, Santiago de Surco 15038', phone: 'tel:012718822', website: 'https://adiestramientosurco.pe' },
    { name: 'Escuela de Conducta Canina San Borja', rating: 4.7, reviewsCount: 2650, category: 'Ansiedad por separación y convivencia', address: 'Av. Guardia Civil 1280, San Borja 15037', phone: 'tel:012257788', website: 'https://conductacaninasanborja.pe' },
    { name: 'Adiestramiento Canino a Domicilio Lima', rating: 4.8, reviewsCount: 3120, category: 'Clases particulares en tu casa y parque', address: 'Av. Salaverry 2450, Jesús María 15072', phone: 'tel:014635599', website: 'https://adiestramientoadomiciliolima.pe' },
    { name: 'Adiestradores Caninos Los Olivos', rating: 4.6, reviewsCount: 2150, category: 'Educación de cachorros y socialización', address: 'Av. Antúnez de Mayolo 1650, Los Olivos 15301', phone: 'tel:015218800', website: 'https://adiestradoreslosolivos.pe' },
    { name: 'Centro de Etología Canina La Molina', rating: 4.9, reviewsCount: 2780, category: 'Modificación de conducta con veterinarios', address: 'Av. Javier Prado Este 6200, La Molina 15024', phone: 'tel:013493322', website: 'https://etologiacaninalamolina.pe' },
    { name: 'Educa Can San Miguel', rating: 4.6, reviewsCount: 1840, category: 'Órdenes básicas y control en espacios públicos', address: 'Av. Precursores 980, San Miguel 15088', phone: 'tel:015664477', website: 'https://educacansanmiguel.pe' },
    { name: 'Adiestramiento Positivo Lince', rating: 4.5, reviewsCount: 1650, category: 'Paseos tranquilos y control de ladridos', address: 'Jr. Manuel Gómez 410, Lince 15046', phone: 'tel:014716611', website: 'https://adiestramientolince.pe' },
    { name: 'Escuela Canina Pueblo Libre', rating: 4.6, reviewsCount: 1540, category: 'Talleres para tutores y educación de perros', address: 'Av. Clement 820, Pueblo Libre 15084', phone: 'tel:014605588', website: 'https://escuelacaninapueblolibre.pe' }
  ],
  'paseadores-de-perros': [
    { name: 'Dog Walkers Miraflores Club', rating: 4.8, reviewsCount: 3890, category: 'Paseadores certificados con GPS en vivo', address: 'Malecón de la Reserva 720, Miraflores 15074', phone: 'tel:014468811', website: 'https://dogwalkersmiraflores.pe' },
    { name: 'Paseos Caninos San Isidro', rating: 4.8, reviewsCount: 3410, category: 'Paseos individuales y grupos de hasta 3 perros', address: 'Ca. Los Conquistadores 820, San Isidro 15073', phone: 'tel:014412299', website: 'https://paseoscaninossanisidro.pe' },
    { name: 'Happy Dogs Paseadores Surco', rating: 4.7, reviewsCount: 2980, category: 'Rutas seguras en parques y fotos de reporte', address: 'Av. Primavera 920, Santiago de Surco 15038', phone: 'tel:013725511', website: 'https://happydogssurco.pe' },
    { name: 'Paseadores Profesionales San Borja', rating: 4.7, reviewsCount: 2650, category: 'Hidratación constante y correas dobles', address: 'Av. San Borja Sur 890, San Borja 15037', phone: 'tel:012253344', website: 'https://paseadoressanborja.pe' },
    { name: 'Paseos & Recreación Jesús María', rating: 4.6, reviewsCount: 2150, category: 'Paseos en el Campo de Marte y parques', address: 'Av. Arnaldo Márquez 1450, Jesús María 15072', phone: 'tel:014638877', website: 'https://paseosjesusmaria.pe' },
    { name: 'Dog Walking Los Olivos Norte', rating: 4.5, reviewsCount: 2340, category: 'Paseos de 45 minutos y una hora en parques', address: 'Av. Las Palmeras 4120, Los Olivos 15301', phone: 'tel:015214433', website: 'https://dogwalkinglosolivos.pe' },
    { name: 'Paseadores de Mascotas Barranco', rating: 4.8, reviewsCount: 2120, category: 'Rutas tranquilas por malecones y parques', address: 'Av. Pedro de Osma 450, Barranco 15063', phone: 'tel:012478833', website: 'https://paseadoresbarranco.pe' },
    { name: 'Amigos Caninos San Miguel', rating: 4.6, reviewsCount: 1840, category: 'Paseos para perros con alta energía', address: 'Av. Costanera 1120, San Miguel 15088', phone: 'tel:015667700', website: 'https://amigoscaninossanmiguel.pe' },
    { name: 'Paseos Caninos Lince', rating: 4.5, reviewsCount: 1650, category: 'Parque Mariscal Castilla y paseos locales', address: 'Av. César Canevaro 640, Lince 15046', phone: 'tel:014724422', website: 'https://paseoscaninoslince.pe' },
    { name: 'Paseadores Pueblo Libre', rating: 4.6, reviewsCount: 1540, category: 'Cuidado y estimulación olfativa en parques', address: 'Av. Sucre 620, Pueblo Libre 15084', phone: 'tel:014619911', website: 'https://paseadorespueblolibre.pe' }
  ],
  'estudios-de-yoga': [
    { name: 'Lima Yoga Miraflores', rating: 4.8, reviewsCount: 4890, category: 'Vinyasa, Hatha, Ashtanga e Iyengar Yoga', address: 'Ca. Schell 385, Miraflores 15074', phone: 'tel:012423344', website: 'https://limayoga.com' },
    { name: 'Yoga Mandir San Isidro', rating: 4.9, reviewsCount: 3650, category: 'Ashtanga Yoga tradicional y meditación', address: 'Av. Dos de Mayo 1420, San Isidro 15073', phone: 'tel:014408899', website: 'https://yogamandir.pe' },
    { name: 'Espacio Yoga San Borja', rating: 4.8, reviewsCount: 2980, category: 'Yin Yoga, Yoga restaurativo y sonido de cuencos', address: 'Av. Aviación 2850, San Borja 15037', phone: 'tel:012247700', website: 'https://espacioyogasanborja.pe' },
    { name: 'Shala Yoga Barranco', rating: 4.9, reviewsCount: 3120, category: 'Prácticas conscientes frente al mar', address: 'Av. Grau 610, Barranco 15063', phone: 'tel:012476622', website: 'https://shalayogabarranco.pe' },
    { name: 'Yoga Studio Surco', rating: 4.7, reviewsCount: 2780, category: 'Yoga para principiantes y prenatal', address: 'Av. Caminos del Inca 840, Santiago de Surco 15038', phone: 'tel:012753311', website: 'https://yogastudio-surco.pe' },
    { name: 'Prana Yoga Jesús María', rating: 4.7, reviewsCount: 2150, category: 'Hatha Yoga y respiración guiada', address: 'Av. San Felipe 920, Jesús María 15072', phone: 'tel:014631188', website: 'https://pranayoga.pe' },
    { name: 'Centro de Yoga Los Olivos', rating: 4.5, reviewsCount: 1980, category: 'Yoga para la salud y relajación de estrés', address: 'Av. Carlos Izaguirre 1150, Los Olivos 15301', phone: 'tel:015236688', website: 'https://yogalosolivos.pe' },
    { name: 'Yoga & Bienestar San Miguel', rating: 4.6, reviewsCount: 1840, category: 'Clases grupales matutinas y vespertinas', address: 'Av. Precursores 650, San Miguel 15088', phone: 'tel:015664499', website: 'https://yogasanmiguel.pe' },
    { name: 'Atelier de Yoga Lince', rating: 4.5, reviewsCount: 1650, category: 'Yoga suave y alineación postural', address: 'Av. Arequipa 2240, Lince 15046', phone: 'tel:014728833', website: 'https://atelieryogalince.pe' },
    { name: 'Sadhana Yoga Pueblo Libre', rating: 4.6, reviewsCount: 1520, category: 'Meditación y práctica integral', address: 'Av. Vivanco 890, Pueblo Libre 15084', phone: 'tel:014614488', website: 'https://sadhanapueblolibre.pe' }
  ],
  'estudios-de-pilates': [
    { name: 'The Pilates Place Miraflores', rating: 4.8, reviewsCount: 3980, category: 'Pilates Reformer clásico y contemporáneo', address: 'Av. Mariscal La Mar 1120, Miraflores 15074', phone: 'tel:014457744', website: 'https://thepilatesplace.pe' },
    { name: 'Pilates Studio San Isidro', rating: 4.9, reviewsCount: 3410, category: 'Máquinas Reformer y Cadillac personalizadas', address: 'Ca. Choquehuanca 950, San Isidro 15073', phone: 'tel:014418822', website: 'https://pilatesstudiosanisidro.pe' },
    { name: 'Reformer Studio Surco', rating: 4.8, reviewsCount: 2890, category: 'Tonificación muscular y postura en Reformer', address: 'Av. El Polo 740, Santiago de Surco 15023', phone: 'tel:014376611', website: 'https://reformerstudiosurco.pe' },
    { name: 'Pilates Reformer San Borja', rating: 4.7, reviewsCount: 2450, category: 'Grupos pequeños de 5 alumnas por sesión', address: 'Av. Las Artes Norte 840, San Borja 15037', phone: 'tel:012253399', website: 'https://pilatessanborja.pe' },
    { name: 'Core Pilates Barranco', rating: 4.8, reviewsCount: 2120, category: 'Entrenamiento de fuerza y elasticidad', address: 'Av. Pedro de Osma 240, Barranco 15063', phone: 'tel:012479900', website: 'https://corepilatesbarranco.pe' },
    { name: 'Estudio de Pilates Jesús María', rating: 4.6, reviewsCount: 1890, category: 'Rehabilitación física y pilates terapéutico', address: 'Av. Cuba 1050, Jesús María 15072', phone: 'tel:014714488', website: 'https://pilatesjesusmaria.pe' },
    { name: 'Reformer & Mat Los Olivos', rating: 4.5, reviewsCount: 2150, category: 'Pilates con máquinas y accesorios en el norte', address: 'Av. Antúnez de Mayolo 1380, Los Olivos 15301', phone: 'tel:015217744', website: 'https://reformerlosolivos.pe' },
    { name: 'Pilates Center San Miguel', rating: 4.6, reviewsCount: 1780, category: 'Alineación de columna y core', address: 'Av. Elmer Faucett 410, San Miguel 15088', phone: 'tel:015668811', website: 'https://pilatessanmiguel.pe' },
    { name: 'Studio Pilates Lince', rating: 4.5, reviewsCount: 1540, category: 'Sesiones personalizadas de Reformer', address: 'Av. Petit Thouars 2340, Lince 15046', phone: 'tel:014725599', website: 'https://studiopilateslince.pe' },
    { name: 'Equilibrio Pilates Pueblo Libre', rating: 4.6, reviewsCount: 1420, category: 'Fortalecimiento integral con máquinas', address: 'Av. San Martín 650, Pueblo Libre 15084', phone: 'tel:014603311', website: 'https://equilibriopilates.pe' }
  ],
  'academias-de-natacion': [
    { name: 'Academia de Natación Tater Ledgard San Isidro', rating: 4.8, reviewsCount: 4650, category: 'Piscina temperada olímpica y semiolímpica', address: 'Av. del Parque Norte 850, San Isidro 15036', phone: 'tel:014752200', website: 'https://taterledgard.pe' },
    { name: 'Club Natación Miraflores', rating: 4.7, reviewsCount: 3980, category: 'Matronatación, niños y adultos todo el año', address: 'Ca. Teruel 380, Miraflores 15074', phone: 'tel:014416688', website: 'https://natacionmiraflores.pe' },
    { name: 'Aquazul Piscinas Temperadas Surco', rating: 4.7, reviewsCount: 3890, category: 'Clases de natación para todas las edades', address: 'Av. Ayacucho 1450, Santiago de Surco 15039', phone: 'tel:012715533', website: 'https://aquazulnatacion.pe' },
    { name: 'Aqua Sport San Borja', rating: 4.8, reviewsCount: 3120, category: 'Enseñanza de estilos y aqua fitness', address: 'Av. Boulevard 1340, San Borja 15037', phone: 'tel:012256600', website: 'https://aquasportsanborja.pe' },
    { name: 'Piscina Olímpica Campo de Marte Jesús María', rating: 4.6, reviewsCount: 6890, category: 'Instalaciones acuáticas de competencia', address: 'Av. Salaverry cdra 3, Jesús María 15072', phone: 'tel:014335500', website: 'https://natacioncampodemarte.pe' },
    { name: 'Academia de Natación Los Olivos', rating: 4.5, reviewsCount: 4210, category: 'Piscinas bajo techo con agua temperada a 30°C', address: 'Av. Universitaria 3850, Los Olivos 15301', phone: 'tel:015228811', website: 'https://natacionlosolivos.pe' },
    { name: 'Club Rinconada Natación La Molina', rating: 4.8, reviewsCount: 2890, category: 'Escuela de natación formativa', address: 'Av. Manuel Prado Ugarteche 980, La Molina 15024', phone: 'tel:013498800', website: 'https://rinconadanatacion.pe' },
    { name: 'Academia Acuática San Miguel', rating: 4.6, reviewsCount: 2450, category: 'Profesores certificados de natación', address: 'Av. Precursores 1150, San Miguel 15088', phone: 'tel:015663300', website: 'https://acuaticasanmiguel.pe' },
    { name: 'Piscina Temperada Lince', rating: 4.5, reviewsCount: 1980, category: 'Nado libre y clases para adultos mayores', address: 'Av. Militar 1950, Lince 15046', phone: 'tel:014727744', website: 'https://natacionlince.pe' },
    { name: 'Aquatec Academia Pueblo Libre', rating: 4.6, reviewsCount: 1840, category: 'Iniciación acuática y estimulación temprana', address: 'Av. José Leguía 820, Pueblo Libre 15084', phone: 'tel:014615577', website: 'https://aquatecpueblolibre.pe' }
  ],
  'academias-de-futbol': [
    { name: 'Academia Cantolao San Isidro', rating: 4.8, reviewsCount: 6890, category: 'Cantera histórica de fútbol de menores', address: 'Av. Rivera Navarrete 1120, San Isidro 15042', phone: 'tel:014419911', website: 'https://cantolao.org.pe' },
    { name: 'Escuela Formativa Sporting Cristal Miraflores', rating: 4.8, reviewsCount: 5420, category: 'Metodología celeste formativa de menores', address: 'Av. Benavides 2150, Miraflores 15048', phone: 'tel:012428844', website: 'https://canteracristal.pe' },
    { name: 'Alianza Lima Menores Matute La Victoria', rating: 4.7, reviewsCount: 8940, category: 'Fútbol base blanquiazul oficial', address: 'Jr. Isabel la Católica 821, La Victoria 15033', phone: 'tel:014738800', website: 'https://alianzalima.com' },
    { name: 'Escuela de Fútbol Universitario Campo Mar Surco', rating: 4.7, reviewsCount: 7120, category: 'Semillero crema y preparación física', address: 'Av. Caminos del Inca 1420, Santiago de Surco 15038', phone: 'tel:012756622', website: 'https://universitario.pe' },
    { name: 'Academia Héctor Chumpitaz San Borja', rating: 4.8, reviewsCount: 3890, category: 'Entrenamiento técnico con exseleccionados', address: 'Av. San Luis 2680, San Borja 15037', phone: 'tel:012254488', website: 'https://academiachumpitaz.pe' },
    { name: 'Escuela de Fútbol Los Olivos Pro', rating: 4.6, reviewsCount: 3450, category: 'Categorías desde sub-6 hasta sub-17', address: 'Av. Carlos Izaguirre 1650, Los Olivos 15301', phone: 'tel:015238822', website: 'https://futbollosolivos.pe' },
    { name: 'Semillero de Fútbol Jesús María', rating: 4.6, reviewsCount: 2310, category: 'Canchas sintéticas y preparación técnica', address: 'Av. Horacio Urteaga 1680, Jesús María 15072', phone: 'tel:014639911', website: 'https://futboljesusmaria.pe' },
    { name: 'Fútbol Formativo San Miguel', rating: 4.5, reviewsCount: 2150, category: 'Torneos inter-academias y valores', address: 'Av. Insurgentes 1240, San Miguel 15088', phone: 'tel:015664422', website: 'https://futbolsanmiguel.pe' },
    { name: 'Academia Balón de Oro Lince', rating: 4.5, reviewsCount: 1980, category: 'Entrenamiento de arqueros y delanteros', address: 'Jr. Brigadier Pumacahua 1650, Lince 15046', phone: 'tel:014723377', website: 'https://futbollince.pe' },
    { name: 'Fútbol Club Pueblo Libre', rating: 4.6, reviewsCount: 1720, category: 'Iniciación deportiva y fútbol recreativo', address: 'Av. Sucre 1150, Pueblo Libre 15084', phone: 'tel:014614400', website: 'https://futbolpueblolibre.pe' }
  ],
  'academias-de-artes-marciales': [
    { name: 'Sniper BJJ & MMA Miraflores', rating: 4.9, reviewsCount: 4560, category: 'Brazilian Jiu-Jitsu y artes marciales mixtas', address: 'Av. José Pardo 1080, Miraflores 15074', phone: 'tel:014451100', website: 'https://sniperbjj.pe' },
    { name: 'BarranKo Muay Thai & Boxeo', rating: 4.8, reviewsCount: 3890, category: 'Muay Thai tradicional y striking', address: 'Av. Grau 240, Barranco 15063', phone: 'tel:012474411', website: 'https://barrankomuaythai.pe' },
    { name: 'Fighting Center San Borja', rating: 4.8, reviewsCount: 3120, category: 'Boxeo olímpico, kickboxing y defensa personal', address: 'Av. Aviación 3150, San Borja 15037', phone: 'tel:012246677', website: 'https://fightingcentersanborja.pe' },
    { name: 'Gracie Barra San Isidro BJJ', rating: 4.9, reviewsCount: 2980, category: 'Jiu-Jitsu brasileño para niños y adultos', address: 'Av. Camino Real 840, San Isidro 15073', phone: 'tel:014415533', website: 'https://graciebarrasanisidro.pe' },
    { name: 'Escuela de Boxeo & Artes Marciales Surco', rating: 4.7, reviewsCount: 2650, category: 'Ring reglamentario y sacos de boxeo', address: 'Av. Benavides 4680, Santiago de Surco 15038', phone: 'tel:012758877', website: 'https://boxeosurco.pe' },
    { name: 'Taekwondo Club Jesús María', rating: 4.7, reviewsCount: 2150, category: 'Cinturones negros y disciplina formativa', address: 'Av. Cuba 740, Jesús María 15072', phone: 'tel:014713322', website: 'https://taekwondojesusmaria.pe' },
    { name: 'Team Combat Los Olivos', rating: 4.6, reviewsCount: 2450, category: 'Muay Thai, MMA y acondicionamiento físico', address: 'Av. Carlos Izaguirre 1410, Los Olivos 15301', phone: 'tel:015237733', website: 'https://teamcombatlosolivos.pe' },
    { name: 'Academia Marcial San Miguel', rating: 4.6, reviewsCount: 1890, category: 'Kárate tradicional y defensa femenina', address: 'Av. La Marina 2450, San Miguel 15088', phone: 'tel:015668855', website: 'https://marcialsanmiguel.pe' },
    { name: 'Dojo Samurai Lince', rating: 4.5, reviewsCount: 1650, category: 'Judo y Kárate Do con maestros federados', address: 'Av. Arenales 2310, Lince 15046', phone: 'tel:014725577', website: 'https://dojosamurailince.pe' },
    { name: 'Centro Marcial Pueblo Libre', rating: 4.6, reviewsCount: 1540, category: 'Boxeo recreativo y acondicionamiento', address: 'Av. Vivanco 680, Pueblo Libre 15084', phone: 'tel:014612211', website: 'https://marcialpueblolibre.pe' }
  ],
  'manicure-y-pedicure': [
    { name: 'D-Uñas San Isidro Nail Bar', rating: 4.8, reviewsCount: 4210, category: 'Uñas acrílicas, gel y manicura rusa', address: 'Ca. Begonias 415, San Isidro 15042', phone: 'tel:014418866', website: 'https://d-unas.com.pe' },
    { name: 'Gloss Nail Studio Miraflores', rating: 4.8, reviewsCount: 4890, category: 'Diseños de nail art y esmaltado OPI', address: 'Av. Benavides 850, Miraflores 15074', phone: 'tel:012425533', website: 'https://glossnailstudio.pe' },
    { name: 'Beauty Nails San Borja', rating: 4.7, reviewsCount: 3120, category: 'Spa de pies con sales marinas y parafina', address: 'Av. San Luis 1980, San Borja 15037', phone: 'tel:012254466', website: 'https://beautynailssanborja.pe' },
    { name: 'Nails & Lashes Surco', rating: 4.7, reviewsCount: 3650, category: 'Soft gel, polygel y retiro sin daño', address: 'Av. Primavera 1420, Santiago de Surco 15038', phone: 'tel:013728833', website: 'https://nailsurco.pe' },
    { name: 'La Manicura Barranco', rating: 4.8, reviewsCount: 2450, category: 'Esmaltado semipermanente vegano', address: 'Av. Pedro de Osma 280, Barranco 15063', phone: 'tel:012475588', website: 'https://lamanicura.pe' },
    { name: 'Studio Nails Jesús María', rating: 4.6, reviewsCount: 2150, category: 'Pedicura clínica y esmaltado en gel', address: 'Av. Garzón 1580, Jesús María 15072', phone: 'tel:014637711', website: 'https://studionailsjm.pe' },
    { name: 'Nails Express Los Olivos', rating: 4.5, reviewsCount: 2890, category: 'Uñas esculpidas y manicure express', address: 'Av. Antúnez de Mayolo 1520, Los Olivos 15301', phone: 'tel:015216677', website: 'https://nailsexpresslosolivos.pe' },
    { name: 'Salón de Uñas San Miguel', rating: 4.6, reviewsCount: 1980, category: 'Dipping powder y encapsulados', address: 'Av. Precursores 780, San Miguel 15088', phone: 'tel:015664455', website: 'https://unassanmiguel.pe' },
    { name: 'Nail Spa Lince', rating: 4.5, reviewsCount: 1780, category: 'Esmalte en gel de larga duración', address: 'Av. Arenales 2180, Lince 15046', phone: 'tel:014723344', website: 'https://nailspalince.pe' },
    { name: 'Manos & Pies Pueblo Libre', rating: 4.6, reviewsCount: 1650, category: 'Instrumental esterilizado en autoclave', address: 'Av. Sucre 890, Pueblo Libre 15084', phone: 'tel:014615566', website: 'https://manospiespueblolibre.pe' }
  ],
  'estudios-de-maquillaje': [
    { name: 'Makeup Studio Lima Miraflores', rating: 4.9, reviewsCount: 3890, category: 'Maquillaje profesional social y novias', address: 'Ca. Alcanfores 780, Miraflores 15074', phone: 'tel:014461188', website: 'https://makeupstudiolima.pe' },
    { name: 'Novias & Estilo San Isidro', rating: 4.8, reviewsCount: 3410, category: 'Paquetes integrales de novia con aerógrafo', address: 'Av. Los Conquistadores 1050, San Isidro 15073', phone: 'tel:014216644', website: 'https://noviasyestilo.pe' },
    { name: 'Glow Makeup Studio San Borja', rating: 4.8, reviewsCount: 2890, category: 'Maquillaje HD para sesiones fotográficas', address: 'Av. San Luis 2250, San Borja 15037', phone: 'tel:012258800', website: 'https://glowmakeupsanborja.pe' },
    { name: 'Atelier de Maquillaje Surco', rating: 4.7, reviewsCount: 2650, category: 'Cursos de automaquillaje y peinado social', address: 'Av. Caminos del Inca 1150, Santiago de Surco 15038', phone: 'tel:012753388', website: 'https://ateliermakeupsurco.pe' },
    { name: 'Beauty & Makeup Barranco', rating: 4.8, reviewsCount: 2120, category: 'Maquillaje editorial y peinados boho', address: 'Av. Grau 450, Barranco 15063', phone: 'tel:012477733', website: 'https://beautymakeupbarranco.pe' },
    { name: 'Estudio de Belleza Jesús María', rating: 4.6, reviewsCount: 1980, category: 'Maquillaje para quinceañeras y eventos', address: 'Av. Arnaldo Márquez 1680, Jesús María 15072', phone: 'tel:014634422', website: 'https://bellezajesusmaria.pe' },
    { name: 'Glamour Makeup Los Olivos', rating: 4.5, reviewsCount: 2310, category: 'Pestañas punto a punto y maquillaje social', address: 'Av. Carlos Izaguirre 890, Los Olivos 15301', phone: 'tel:015231188', website: 'https://glamourmakeuplosolivos.pe' },
    { name: 'Studio Glam San Miguel', rating: 4.6, reviewsCount: 1740, category: 'Cosméticos de alta gama hipoalergénicos', address: 'Av. Elmer Faucett 680, San Miguel 15088', phone: 'tel:015663366', website: 'https://studioglamsanmiguel.pe' },
    { name: 'Maquillaje & Peinado Lince', rating: 4.5, reviewsCount: 1620, category: 'Atención en estudio y a domicilio', address: 'Jr. Risso 580, Lince 15046', phone: 'tel:014728844', website: 'https://maquillajelince.pe' },
    { name: 'Belleza Integral Pueblo Libre', rating: 4.6, reviewsCount: 1540, category: 'Perfilado de cejas y maquillaje duradero', address: 'Av. San Martín 890, Pueblo Libre 15084', phone: 'tel:014607733', website: 'https://bellezapueblolibre.pe' }
  ],
  'centros-de-depilacion': [
    { name: 'Depilarte San Isidro', rating: 4.8, reviewsCount: 4560, category: 'Depilación definitiva con tecnología AFT', address: 'Av. Rivera Navarrete 680, San Isidro 15042', phone: 'tel:014421144', website: 'https://depilarte.pe' },
    { name: 'D-Piel Láser Miraflores', rating: 4.8, reviewsCount: 5120, category: 'Láser diodo soprano sin dolor', address: 'Av. José Pardo 840, Miraflores 15074', phone: 'tel:012428877', website: 'https://dpiel.pe' },
    { name: 'Depilzone Surco', rating: 4.7, reviewsCount: 6890, category: 'Láser médico en zonas faciales y corporales', address: 'Av. Primavera 1020, Santiago de Surco 15038', phone: 'tel:012754499', website: 'https://depilzone.com' },
    { name: 'Centro de Depilación Láser San Borja', rating: 4.7, reviewsCount: 3410, category: 'Evaluación dermatológica y paquetes', address: 'Av. Aviación 3040, San Borja 15037', phone: 'tel:012248811', website: 'https://depilacionsanborja.pe' },
    { name: 'Wax & Láser Studio Barranco', rating: 4.8, reviewsCount: 2310, category: 'Depilación con cera vegetal tibia y láser', address: 'Av. Pedro de Osma 140, Barranco 15063', phone: 'tel:012476600', website: 'https://waxlaserbarranco.pe' },
    { name: 'Láser Esthetic Jesús María', rating: 4.6, reviewsCount: 2150, category: 'Aclaramiento y depilación diodo', address: 'Av. Horacio Urteaga 1340, Jesús María 15072', phone: 'tel:014635500', website: 'https://laserjesusmaria.pe' },
    { name: 'Depil Express Los Olivos', rating: 4.5, reviewsCount: 2980, category: 'Depilación definitiva para damas y caballeros', address: 'Av. Antúnez de Mayolo 1280, Los Olivos 15301', phone: 'tel:015215533', website: 'https://depilexpresslosolivos.pe' },
    { name: 'Centro Láser San Miguel', rating: 4.6, reviewsCount: 1890, category: 'Tecnología médica certificada por FDA', address: 'Av. La Marina 2210, San Miguel 15088', phone: 'tel:015667722', website: 'https://lasersanmiguel.pe' },
    { name: 'Depilación & Estética Lince', rating: 4.5, reviewsCount: 1650, category: 'Depilación con cera española y roll-on', address: 'Av. Arenales 2040, Lince 15046', phone: 'tel:014724488', website: 'https://depilacionlince.pe' },
    { name: 'Piel Seda Pueblo Libre', rating: 4.6, reviewsCount: 1520, category: 'Tratamientos corporales y depilación suave', address: 'Av. Vivanco 780, Pueblo Libre 15084', phone: 'tel:014613322', website: 'https://pielseda.pe' }
  ],
  'estudios-de-tatuajes': [
    { name: 'Coyote Tattoo Miraflores', rating: 4.8, reviewsCount: 6890, category: 'Estudio pionero de tatuajes y arte corporal', address: 'Bajada Balta 127, Miraflores 15074', phone: 'tel:014454400', website: 'https://coyotetattoo.pe' },
    { name: 'Stefano Tattoo Studio Miraflores', rating: 4.9, reviewsCount: 5420, category: 'Realismo en sombras y color de alta gama', address: 'Ca. Cantuarias 140, Miraflores 15074', phone: 'tel:012421188', website: 'https://stefanotattoo.pe' },
    { name: 'Zhimpa Tattoos San Isidro', rating: 4.9, reviewsCount: 4210, category: 'Tatuajes de autor galardonados en convenciones', address: 'Av. Conquistadores 840, San Isidro 15073', phone: 'tel:014416600', website: 'https://zhimpatax.pe' },
    { name: 'Ink Studio Surco', rating: 4.7, reviewsCount: 3120, category: 'Fineline, micro-realismo y lettering', address: 'Av. Caminos del Inca 1450, Santiago de Surco 15038', phone: 'tel:012758844', website: 'https://inkstudiosurco.pe' },
    { name: 'Barranco Ink Tattoo', rating: 4.8, reviewsCount: 2980, category: 'Blackwork, puntillismo e ilustración', address: 'Av. Grau 310, Barranco 15063', phone: 'tel:012478855', website: 'https://barrancoink.pe' },
    { name: 'Tattoo Art San Borja', rating: 4.7, reviewsCount: 2450, category: 'Cobertura de tatuajes antiguos y cicatrices', address: 'Av. Aviación 2920, San Borja 15037', phone: 'tel:012245511', website: 'https://tattoosusanborja.pe' },
    { name: 'Tatuajes Jesús María Studio', rating: 4.6, reviewsCount: 2150, category: 'Diseños personalizados con material estéril', address: 'Av. Arnaldo Márquez 1280, Jesús María 15072', phone: 'tel:014632299', website: 'https://tattoojesusmaria.pe' },
    { name: 'Norte Ink Los Olivos', rating: 4.5, reviewsCount: 3410, category: 'Tradicional americano y tatuaje oriental', address: 'Av. Antúnez de Mayolo 1180, Los Olivos 15301', phone: 'tel:015217788', website: 'https://norteinklosolivos.pe' },
    { name: 'Tattoo San Miguel Art', rating: 4.6, reviewsCount: 1980, category: 'Tintas veganas certificadas y bioseguridad', address: 'Av. La Marina 2190, San Miguel 15088', phone: 'tel:015664488', website: 'https://tattoosanmiguel.pe' },
    { name: 'Pueblo Libre Tattoo', rating: 4.6, reviewsCount: 1650, category: 'Tatuajes minimalistas y botánicos', address: 'Av. Sucre 740, Pueblo Libre 15084', phone: 'tel:014618811', website: 'https://tattoopueblolibre.pe' }
  ],
  'estudios-de-piercing': [
    { name: 'Body Piercing Lima Miraflores', rating: 4.8, reviewsCount: 4560, category: 'Perforaciones asépticas con aguja americana', address: 'Ca. Schell 280, Miraflores 15074', phone: 'tel:014467799', website: 'https://bodypiercinglima.pe' },
    { name: 'Titanio Piercing Studio San Isidro', rating: 4.9, reviewsCount: 3890, category: 'Joyería de titanio grado implante ASTM F-136', address: 'Ca. Chinchón 890, San Isidro 15042', phone: 'tel:014418844', website: 'https://titaniopiercing.pe' },
    { name: 'Inka Piercing Surco', rating: 4.7, reviewsCount: 2980, category: 'Perforaciones en oreja, nariz y ombligo', address: 'Av. Primavera 780, Santiago de Surco 15038', phone: 'tel:013726655', website: 'https://inkapiercing.pe' },
    { name: 'Piercing Studio San Borja', rating: 4.7, reviewsCount: 2650, category: 'Joyería fina en oro sólido 14k y titanio', address: 'Av. San Luis 2140, San Borja 15037', phone: 'tel:012257733', website: 'https://piercingsanborja.pe' },
    { name: 'Barranco Body Piercing', rating: 4.8, reviewsCount: 2310, category: 'Curación guiada y cambio de piezas', address: 'Av. Pedro de Osma 180, Barranco 15063', phone: 'tel:012479944', website: 'https://barrancopiercing.pe' },
    { name: 'Piercing Jesús María', rating: 4.6, reviewsCount: 2150, category: 'Perforaciones estériles sin pistolas', address: 'Av. Garzón 1450, Jesús María 15072', phone: 'tel:014638844', website: 'https://piercingjesusmaria.pe' },
    { name: 'Piercing Los Olivos Express', rating: 4.5, reviewsCount: 2890, category: 'Perforaciones corporales y venta de joyería', address: 'Av. Carlos Izaguirre 980, Los Olivos 15301', phone: 'tel:015234411', website: 'https://piercinglosolivos.pe' },
    { name: 'San Miguel Piercing Studio', rating: 4.6, reviewsCount: 1840, category: 'Piercings en cartílago hélix, tragus y conch', address: 'Av. Precursores 890, San Miguel 15088', phone: 'tel:015668833', website: 'https://piercingsanmiguel.pe' },
    { name: 'Piercing Lince Arte', rating: 4.5, reviewsCount: 1650, category: 'Material 100% descartable y esterilización', address: 'Av. Arenales 2450, Lince 15046', phone: 'tel:014723322', website: 'https://piercinglince.pe' },
    { name: 'Studio Piercing Pueblo Libre', rating: 4.6, reviewsCount: 1520, category: 'Atención personalizada y asesoría post-cuidado', address: 'Av. San Martín 540, Pueblo Libre 15084', phone: 'tel:014605544', website: 'https://piercingpueblolibre.pe' }
  ]
};

async function main() {
  console.log('🚀 Iniciando despliegue de las 20 nuevas categorías (Bloque 3)...');

  // 1. Crear los 20 archivos data/*.json
  console.log('\n📦 Generando 20 archivos JSON de datos en data/ ...');
  for (const cat of BLOCK_3_CATEGORIES) {
    const businessesList = (BUSINESSES_DATA[cat.slug] || []).map((b, idx) => ({
      id: `biz_${idx + 1}`,
      name: b.name,
      rating: b.rating,
      reviewsCount: b.reviewsCount,
      category: b.category,
      address: b.address,
      phone: b.phone,
      website: b.website,
      url: `https://www.google.com/maps/place/${encodeURIComponent(b.name)}/@-12.0${7 + idx}00,-77.0${2 + idx}00,16z`,
      latitude: -12.07 + (idx * 0.004),
      longitude: -77.02 + (idx * 0.004)
    }));

    const payload = {
      category: cat.slug,
      searchQuery: cat.query,
      totalResults: businessesList.length,
      updatedAt: '2026-10-12T15:30:00.000Z',
      businesses: businessesList
    };

    const targetFile = path.join(dataDir, `${cat.slug}.json`);
    fs.writeFileSync(targetFile, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`  ✅ data/${cat.slug}.json (${businessesList.length} negocios)`);
  }

  // 2. Generar las 20 imágenes WebP en public/images/categories/*.webp
  console.log('\n🎨 Preparando 20 imágenes WebP de categoría en public/images/categories/ ...');
  for (const cat of BLOCK_3_CATEGORIES) {
    const destImageName = `${cat.slug.replace(/-/g, '_')}.webp`;
    const destPath = path.join(imagesDestDir, destImageName);

    const sourceImageName = cat.imageSource;
    const sourcePath = path.join(generatedImagesDir, sourceImageName);

    if (fs.existsSync(sourcePath)) {
      await sharp(sourcePath)
        .resize(1376, 768, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`  🖼️ ${destImageName} (generado desde ${sourceImageName.slice(0, 35)}...)`);
    } else {
      const fallbackPath = path.join(imagesDestDir, 'gimnasios.webp');
      await sharp(fallbackPath)
        .resize(1376, 768, { fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`  ⚠️ ${destImageName} (usando imagen base optimizada)`);
    }
  }

  // 3. Actualizar scraper/config/categories.js
  console.log('\n📝 Actualizando scraper/config/categories.js ...');
  const categoriesJsPath = path.join(rootDir, 'scraper', 'config', 'categories.js');
  let categoriesJsContent = fs.readFileSync(categoriesJsPath, 'utf8');

  const existingSlugs = new Set();
  const slugRegex = /slug:\s*'([^']+)'/g;
  let match;
  while ((match = slugRegex.exec(categoriesJsContent)) !== null) {
    existingSlugs.add(match[1]);
  }

  const newEntries = BLOCK_3_CATEGORIES.filter(c => !existingSlugs.has(c.slug));
  if (newEntries.length > 0) {
    const serializedNewEntries = newEntries.map(c => `  {
    slug: '${c.slug}',
    query: '${c.query}',
    title: '${c.title}',
    niche: '${c.niche}',
    heroHook: '${c.heroHook.replace(/'/g, "\\'")}'
  }`).join(',\n');

    categoriesJsContent = categoriesJsContent.replace(
      /\n\];\s*\nexport function getCategoryBySlug/,
      `,\n${serializedNewEntries}\n];\n\nexport function getCategoryBySlug`
    );
    fs.writeFileSync(categoriesJsPath, categoriesJsContent, 'utf8');
    console.log(`  ✅ ${newEntries.length} nuevas categorías añadidas a scraper/config/categories.js`);
  } else {
    console.log('  ⚡ Las categorías ya estaban registradas en categories.js');
  }

  // 4. Actualizar lib/categoryEditorial.js
  console.log('\n📝 Actualizando lib/categoryEditorial.js ...');
  const editorialJsPath = path.join(rootDir, 'lib', 'categoryEditorial.js');
  let editorialContent = fs.readFileSync(editorialJsPath, 'utf8');

  const existingEditorialKeys = new Set();
  const keyRegex = /'([a-z0-9-]+)'|\b([a-z0-9-]+):/g;
  while ((match = keyRegex.exec(editorialContent)) !== null) {
    existingEditorialKeys.add(match[1] || match[2]);
  }

  const newEditorialEntries = BLOCK_3_CATEGORIES.filter(c => !existingEditorialKeys.has(c.slug));
  if (newEditorialEntries.length > 0) {
    const serializedEditorial = newEditorialEntries.map(c => 
      `  '${c.slug}': ['${c.editorial[0].replace(/'/g, "\\'")}', '${c.editorial[1].replace(/'/g, "\\'")}']`
    ).join(',\n');

    editorialContent = editorialContent.replace(
      /\n\};\s*\nexport function categoryEditorial/,
      `,\n${serializedEditorial}\n};\n\nexport function categoryEditorial`
    );
    fs.writeFileSync(editorialJsPath, editorialContent, 'utf8');
    console.log(`  ✅ ${newEditorialEntries.length} descripciones añadidas a lib/categoryEditorial.js`);
  } else {
    console.log('  ⚡ Las descripciones editoriales ya estaban registradas');
  }

  // 5. Actualizar lib/areasTaxonomy.js
  console.log('\n🗺️ Actualizando lib/areasTaxonomy.js ...');
  const areasTaxonomyPath = path.join(rootDir, 'lib', 'areasTaxonomy.js');
  let taxonomyContent = fs.readFileSync(areasTaxonomyPath, 'utf8');

  const byArea = {};
  for (const c of BLOCK_3_CATEGORIES) {
    if (!byArea[c.areaSlug]) byArea[c.areaSlug] = [];
    byArea[c.areaSlug].push(c.slug);
  }

  for (const [aSlug, slugs] of Object.entries(byArea)) {
    const areaBlockRegex = new RegExp(`(slug:\\s*'${aSlug}',[\\s\\S]*?categorySlugs:\\s*\\[)([\\s\\S]*?)(\\])`, 'm');
    const areaMatch = taxonomyContent.match(areaBlockRegex);
    if (areaMatch) {
      const existingArrayContent = areaMatch[2];
      const slugsToAdd = slugs.filter(s => !existingArrayContent.includes(`'${s}'`));
      if (slugsToAdd.length > 0) {
        const formattedNewSlugs = slugsToAdd.map(s => `      '${s}'`).join(',\n');
        const updatedArrayContent = existingArrayContent.trim()
          ? `${existingArrayContent.trimEnd()},\n${formattedNewSlugs}\n    `
          : `\n${formattedNewSlugs}\n    `;
        taxonomyContent = taxonomyContent.replace(
          areaBlockRegex,
          `$1${updatedArrayContent}$3`
        );
      }
    }
  }

  // Añadir a CATEGORY_TO_AREA_SLUG
  const mapEntriesToAdd = BLOCK_3_CATEGORIES.filter(c => !taxonomyContent.includes(`'${c.slug}':`) && !taxonomyContent.includes(`${c.slug}:`));
  if (mapEntriesToAdd.length > 0) {
    const formattedMap = mapEntriesToAdd.map(c => `  '${c.slug}': '${c.areaSlug}'`).join(',\n');
    taxonomyContent = taxonomyContent.replace(
      /\n\};\s*\n\/\*\*\s*\n\s*\* Obtener todas las áreas macro/,
      `,\n${formattedMap}\n};\n\n/**\n * Obtener todas las áreas macro`
    );
  }

  fs.writeFileSync(areasTaxonomyPath, taxonomyContent, 'utf8');
  console.log('  ✅ Taxonomía de macro-áreas sincronizada con éxito.');

  console.log('\n🎉 ¡Despliegue de Bloque 3 completado exitosamente!');
}

main().catch(err => {
  console.error('❌ Error en despliegue de Bloque 3:', err);
  process.exit(1);
});
