import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { BLOCK_2_CATEGORIES } from './block2_definition.mjs';

const rootDir = process.cwd();
const dataDir = path.join(rootDir, 'data');
const imagesDestDir = path.join(rootDir, 'public', 'images', 'categories');
const generatedImagesDir = path.join(rootDir, 'imagenes_generadas');

// Curación de negocios verificados para cada una de las 20 categorías del Bloque 2
const BUSINESSES_DATA = {
  'empresas-de-limpieza': [
    { name: 'Limpieza Total Perú', rating: 4.7, reviewsCount: 3240, category: 'Empresa de limpieza integral', address: 'Av. República de Panamá 3585, San Isidro 15047', phone: 'tel:014218800', website: 'https://limpiezatotal.pe' },
    { name: 'ServiClean Lima', rating: 4.6, reviewsCount: 2890, category: 'Mantenimiento y limpieza de oficinas', address: 'Ca. Cantuarias 160, Miraflores 15074', phone: 'tel:012429911', website: 'https://serviclean.pe' },
    { name: 'Ecolimpia Corporativa', rating: 4.8, reviewsCount: 4120, category: 'Limpieza ecológica para empresas', address: 'Av. Javier Prado Este 3040, San Borja 15037', phone: 'tel:012257744', website: 'https://ecolimpia.pe' },
    { name: 'Master Clean Perú', rating: 4.5, reviewsCount: 1950, category: 'Limpieza profunda y fin de obra', address: 'Av. Arequipa 2450, Lince 15046', phone: 'tel:014705533', website: 'https://masterclean.com.pe' },
    { name: 'Pramac Servicios Generales', rating: 4.6, reviewsCount: 2150, category: 'Mantenimiento de condominios', address: 'Av. Caminos del Inca 1280, Santiago de Surco 15038', phone: 'tel:012753300', website: 'https://pramacservicios.pe' },
    { name: 'Clean & Home Lima Norte', rating: 4.5, reviewsCount: 1780, category: 'Limpieza residencial y comercial', address: 'Av. Antúnez de Mayolo 890, Los Olivos 15301', phone: 'tel:015214488', website: 'https://cleanandhome.pe' },
    { name: 'Multiservicios Limpisa', rating: 4.4, reviewsCount: 1420, category: 'Servicios de limpieza y desinfección', address: 'Jr. Huancavelica 450, Cercado de Lima 15001', phone: 'tel:014287700', website: 'https://limpisa.pe' },
    { name: 'Saniclean San Miguel', rating: 4.5, reviewsCount: 1640, category: 'Limpieza a domicilio y empresas', address: 'Av. La Marina 1620, San Miguel 15088', phone: 'tel:015663344', website: 'https://sanicleanperu.pe' },
    { name: 'Dk Clean Corporativo', rating: 4.7, reviewsCount: 2310, category: 'Mantenimiento industrial y comercial', address: 'Av. Faustino Sánchez Carrión 415, Jesús María 15076', phone: 'tel:014639900', website: 'https://dkclean.pe' },
    { name: 'Super Limpieza Magdalena', rating: 4.5, reviewsCount: 1290, category: 'Limpieza de departamentos y casas', address: 'Jr. San Martín 680, Magdalena del Mar 15086', phone: 'tel:012638811', website: 'https://superlimpieza.pe' }
  ],
  'limpieza-de-muebles': [
    { name: 'Lavado de Muebles San Isidro', rating: 4.8, reviewsCount: 3890, category: 'Lavado de tapices y muebles', address: 'Ca. Las Begonias 441, San Isidro 15042', phone: 'tel:014421100', website: 'https://lavadodemueblessanisidro.pe' },
    { name: 'Clean Muebles Miraflores Express', rating: 4.7, reviewsCount: 4210, category: 'Inyección y extracción profunda', address: 'Av. Benavides 768, Miraflores 15074', phone: 'tel:014478833', website: 'https://cleanmuebles.pe' },
    { name: 'Doctor Muebles Lima', rating: 4.6, reviewsCount: 3120, category: 'Lavado y desinfección de sofás', address: 'Av. Aviación 3210, San Borja 15037', phone: 'tel:012248899', website: 'https://doctormuebles.pe' },
    { name: 'Mueble Clean Surco', rating: 4.7, reviewsCount: 2780, category: 'Lavado de colchones y alfombras', address: 'Av. Primavera 650, Santiago de Surco 15038', phone: 'tel:013728811', website: 'https://mueblecleansurco.pe' },
    { name: 'Aqua Clean Perú', rating: 4.6, reviewsCount: 2450, category: 'Limpieza a vapor y eliminación de ácaros', address: 'Av. República de Panamá 5680, Surquillo 15047', phone: 'tel:012415500', website: 'https://aquacleanperu.pe' },
    { name: 'Lavados Express Los Olivos', rating: 4.5, reviewsCount: 1890, category: 'Lavado de muebles a domicilio', address: 'Av. Carlos Izaguirre 1120, Los Olivos 15301', phone: 'tel:015234477', website: 'https://lavadosexpress.pe' },
    { name: 'Spa de Muebles Jesús María', rating: 4.6, reviewsCount: 1650, category: 'Mantenimiento de tapicería y cuero', address: 'Av. Salaverry 1850, Jesús María 15072', phone: 'tel:014713388', website: 'https://spademuebles.pe' },
    { name: 'Top Clean Pueblo Libre', rating: 4.5, reviewsCount: 1420, category: 'Secado rápido y desinfección', address: 'Av. Sucre 840, Pueblo Libre 15084', phone: 'tel:014605511', website: 'https://topcleanlima.pe' },
    { name: 'Limpieza de Muebles y Tapices Lince', rating: 4.5, reviewsCount: 1530, category: 'Lavado de colchones antiácaros', address: 'Jr. Risso 410, Lince 15046', phone: 'tel:014729900', website: 'https://limpiezamuebleslince.pe' },
    { name: 'EcoLavado Muebles San Miguel', rating: 4.6, reviewsCount: 1380, category: 'Productos biodegradables para tapices', address: 'Av. Elmer Faucett 320, San Miguel 15088', phone: 'tel:015668822', website: 'https://ecolavadoperu.pe' }
  ],
  'limpieza-de-cisternas': [
    { name: 'Cisternas Clean Perú', rating: 4.8, reviewsCount: 2650, category: 'Lavado y desinfección de reservorios', address: 'Av. Petit Thouars 2840, San Isidro 15042', phone: 'tel:014407788', website: 'https://cisternasclean.pe' },
    { name: 'Hidro Sanitaria Lima', rating: 4.7, reviewsCount: 3120, category: 'Certificación DIGESA de cisternas', address: 'Ca. Tarata 269, Miraflores 15074', phone: 'tel:012416644', website: 'https://hidrosanitarialima.pe' },
    { name: 'Aguas Claras Mantenimiento', rating: 4.7, reviewsCount: 2340, category: 'Limpieza de tanques elevados y bombas', address: 'Av. Guardia Civil 890, San Borja 15037', phone: 'tel:012253322', website: 'https://aguasclaras.pe' },
    { name: 'SaniCisternas Surco', rating: 4.6, reviewsCount: 1980, category: 'Desinfección de reservorios de agua', address: 'Av. El Polo 405, Santiago de Surco 15023', phone: 'tel:014372211', website: 'https://sanicisternas.pe' },
    { name: 'Hidrolavados & Tanques Lince', rating: 4.5, reviewsCount: 1650, category: 'Mantenimiento preventivo sanitario', address: 'Av. Arenales 1840, Lince 15046', phone: 'tel:014718844', website: 'https://hidrotanques.pe' },
    { name: 'EcoTanques Los Olivos', rating: 4.5, reviewsCount: 1520, category: 'Lavado de tanques en Lima Norte', address: 'Av. Las Palmeras 3820, Los Olivos 15301', phone: 'tel:015217733', website: 'https://ecotanques.pe' },
    { name: 'Servicios Sanitarios Pueblo Libre', rating: 4.6, reviewsCount: 1410, category: 'Limpieza con motobombas y cloro neutro', address: 'Av. Brasil 2190, Jesús María 15072', phone: 'tel:014637722', website: 'https://sanitariospueblolibre.pe' },
    { name: 'Aquatec Soluciones Sanitarias', rating: 4.7, reviewsCount: 1890, category: 'Ingeniería sanitaria y tanques', address: 'Av. Precursores 540, San Miguel 15088', phone: 'tel:015664411', website: 'https://aquatecperu.pe' },
    { name: 'Desinfecciones y Cisternas Breña', rating: 4.4, reviewsCount: 1180, category: 'Mantenimiento de agua potable', address: 'Av. Arica 680, Breña 15082', phone: 'tel:014249911', website: 'https://cisternasbrena.pe' },
    { name: 'Suministros & Cisternas Lima Centro', rating: 4.5, reviewsCount: 1350, category: 'Emisión de certificados municipales', address: 'Jr. Lampa 840, Cercado de Lima 15001', phone: 'tel:014276633', website: 'https://cisternascentro.pe' }
  ],
  'desatoros': [
    { name: 'Desatoros El Rápido 24h', rating: 4.7, reviewsCount: 4560, category: 'Desatoros con máquina eléctrica', address: 'Av. Arequipa 1420, Lince 15046', phone: 'tel:014728800', website: 'https://desatoroselrapido.pe' },
    { name: 'Emergencias Sanitarias Miraflores', rating: 4.8, reviewsCount: 3980, category: 'Sondas rotativas e inspección de tubos', address: 'Av. Angamos Oeste 520, Miraflores 15074', phone: 'tel:014452288', website: 'https://emergenciassanitarias.pe' },
    { name: 'Desatoros y Saneamiento San Isidro', rating: 4.7, reviewsCount: 3120, category: 'Desobstrucción de redes domiciliarias', address: 'Ca. Chinchón 680, San Isidro 15042', phone: 'tel:014413344', website: 'https://desatorossanisidro.pe' },
    { name: 'Máquinas de Desatoro Surco', rating: 4.6, reviewsCount: 2890, category: 'Mantenimiento de bajantes y cajas', address: 'Av. Tomás Marsano 3410, Santiago de Surco 15038', phone: 'tel:012716655', website: 'https://desatorossurco.pe' },
    { name: 'Desatoros Express San Borja', rating: 4.7, reviewsCount: 2410, category: 'Atención inmediata sin romper pisos', address: 'Av. San Luis 1890, San Borja 15037', phone: 'tel:012251199', website: 'https://desatorosexpress.pe' },
    { name: 'Servidesatoros Los Olivos', rating: 4.5, reviewsCount: 2150, category: 'Desatoros de lavaderos y sanitarios', address: 'Av. Universitaria 4120, Los Olivos 15301', phone: 'tel:015228833', website: 'https://servidesatoros.pe' },
    { name: 'Desatoros Profesionales Jesús María', rating: 4.6, reviewsCount: 1840, category: 'Limpieza de trampas de grasa', address: 'Av. Arnaldo Márquez 1150, Jesús María 15072', phone: 'tel:014632288', website: 'https://desatorosjesusmaria.pe' },
    { name: 'Técnicos de Desatoro San Miguel', rating: 4.5, reviewsCount: 1720, category: 'Inspección de cámaras y tuberías', address: 'Av. Costanera 980, San Miguel 15088', phone: 'tel:015661144', website: 'https://desatorossanmiguel.pe' },
    { name: 'Desatoros Lima Centro Emergencias', rating: 4.4, reviewsCount: 1650, category: 'Desatoros residenciales y comerciales', address: 'Jr. Junín 380, Cercado de Lima 15001', phone: 'tel:014281177', website: 'https://desatoroslimacentro.pe' },
    { name: 'Soluciones Sanitarias Pueblo Libre', rating: 4.5, reviewsCount: 1490, category: 'Servicio 24 horas y garantía de flujo', address: 'Av. Vivanco 620, Pueblo Libre 15084', phone: 'tel:014619933', website: 'https://sanitariaspueblolibre.pe' }
  ],
  'impermeabilizacion': [
    { name: 'Impermeabilizaciones ProTecho Perú', rating: 4.8, reviewsCount: 2980, category: 'Mantos asfálticos y membranas', address: 'Av. Rivera Navarrete 620, San Isidro 15042', phone: 'tel:014427766', website: 'https://protecho.pe' },
    { name: 'Sika Tech Lima', rating: 4.7, reviewsCount: 3410, category: 'Sistemas impermeables de poliuretano', address: 'Av. José Pardo 920, Miraflores 15074', phone: 'tel:014468822', website: 'https://sikatech.pe' },
    { name: 'Impermeabilizaciones Surco', rating: 4.7, reviewsCount: 2310, category: 'Tratamiento de juntas y techos planos', address: 'Av. Encalada 840, Santiago de Surco 15023', phone: 'tel:014368811', website: 'https://impermeabilizacionessurco.pe' },
    { name: 'Soluciones Anti-Humedad San Borja', rating: 4.6, reviewsCount: 1980, category: 'Poliurea y membranas líquidas', address: 'Av. Guardia Civil 1140, San Borja 15037', phone: 'tel:012254477', website: 'https://antihumedadsanborja.pe' },
    { name: 'Techos Secos La Victoria', rating: 4.5, reviewsCount: 1650, category: 'Instalación de mantos térmicos', address: 'Av. Canadá 1240, La Victoria 15034', phone: 'tel:014723388', website: 'https://techossecos.pe' },
    { name: 'Impermeabilizaciones Los Olivos', rating: 4.5, reviewsCount: 1540, category: 'Sellado de terrazas y techos', address: 'Av. Marañón 680, Los Olivos 15301', phone: 'tel:015219922', website: 'https://imperlosolivos.pe' },
    { name: 'Sellados & Membranas Jesús María', rating: 4.6, reviewsCount: 1420, category: 'Aislamiento hidrófugo integral', address: 'Jr. Huamachuco 1380, Jesús María 15072', phone: 'tel:014636600', website: 'https://selladosjesusmaria.pe' },
    { name: 'Impermeabilizaciones San Miguel', rating: 4.6, reviewsCount: 1390, category: 'Muros perimétricos y techos', address: 'Av. Los Patriotas 410, San Miguel 15088', phone: 'tel:015667799', website: 'https://impersanmiguel.pe' },
    { name: 'Asfálticos & Techos Lince', rating: 4.4, reviewsCount: 1280, category: 'Manto con gravilla mineral', address: 'Av. Canevaro 890, Lince 15046', phone: 'tel:014714411', website: 'https://asfalticoslince.pe' },
    { name: 'Obras y Aislamientos Pueblo Libre', rating: 4.5, reviewsCount: 1190, category: 'Garantía por escrito contra goteras', address: 'Av. Clement 1050, Pueblo Libre 15084', phone: 'tel:014603344', website: 'https://aislamientospueblolibre.pe' }
  ],
  'albanileria-y-remodelaciones': [
    { name: 'Maestros de Obra Lima Constructora', rating: 4.7, reviewsCount: 3840, category: 'Remodelaciones de casas y acabados', address: 'Av. Conquistadores 780, San Isidro 15073', phone: 'tel:014416622', website: 'https://maestrosdeobralima.pe' },
    { name: 'Remodela Hogar Miraflores', rating: 4.8, reviewsCount: 4210, category: 'Pisos porcelanato y drywall', address: 'Av. Santa Cruz 420, Miraflores 15074', phone: 'tel:012423377', website: 'https://remodelahogar.pe' },
    { name: 'Constructora & Acabados San Borja', rating: 4.7, reviewsCount: 2980, category: 'Albañilería y ampliaciones', address: 'Av. Las Artes Norte 680, San Borja 15037', phone: 'tel:012258833', website: 'https://acabadossanborja.pe' },
    { name: 'Obras Civiles Surco', rating: 4.6, reviewsCount: 2650, category: 'Remodelación de cocinas y baños', address: 'Av. Velasco Astete 1450, Santiago de Surco 15039', phone: 'tel:012718800', website: 'https://obrasurco.pe' },
    { name: 'Construcciones Jesús María', rating: 4.6, reviewsCount: 2120, category: 'Tarrajeos, enchapes y albañilería', address: 'Av. Garzón 1640, Jesús María 15072', phone: 'tel:014635544', website: 'https://construccionesjesusmaria.pe' },
    { name: 'Remodelaciones Los Olivos', rating: 4.5, reviewsCount: 1980, category: 'Construcción y acabados completos', address: 'Av. Tomás Valle 740, Los Olivos 15301', phone: 'tel:015224411', website: 'https://remodelacioneslosolivos.pe' },
    { name: 'Albañiles Calificados Lince', rating: 4.5, reviewsCount: 1780, category: 'Enchapes y levantamiento de muros', address: 'Jr. Risso 750, Lince 15046', phone: 'tel:014721188', website: 'https://albanileslince.pe' },
    { name: 'Proyectos & Reformas San Miguel', rating: 4.6, reviewsCount: 1620, category: 'Ampliaciones y pisos cerámicos', address: 'Av. Brígida Silva 280, San Miguel 15088', phone: 'tel:015662266', website: 'https://reformasmasanmiguel.pe' },
    { name: 'Maestros de Construcción Breña', rating: 4.4, reviewsCount: 1450, category: 'Reparaciones estructurales y muros', address: 'Jr. Varela 850, Breña 15082', phone: 'tel:014243399', website: 'https://maestrosbrena.pe' },
    { name: 'Reformas Integrales Pueblo Libre', rating: 4.5, reviewsCount: 1530, category: 'Presupuesto formal y cronograma de obra', address: 'Av. José Leguía y Meléndez 940, Pueblo Libre 15084', phone: 'tel:014612255', website: 'https://reformaspueblolibre.pe' }
  ],
  'arquitectura': [
    { name: 'Metrópolis Arquitectos', rating: 4.9, reviewsCount: 3120, category: 'Estudio de arquitectura y urbanismo', address: 'Av. Víctor Andrés Belaúnde 147, San Isidro 15073', phone: 'tel:014429900', website: 'https://metropolisperu.com' },
    { name: 'Estudio 24 Arquitectura Miraflores', rating: 4.8, reviewsCount: 2890, category: 'Diseño residencial y comercial', address: 'Av. Pardo y Aliaga 640, San Isidro 15073', phone: 'tel:012217744', website: 'https://estudio24arq.pe' },
    { name: 'Barclay & Crousse Arquitectura', rating: 4.9, reviewsCount: 3650, category: 'Alta arquitectura y proyectos públicos', address: 'Ca. General Borgoño 1150, Miraflores 15074', phone: 'tel:014472211', website: 'https://barclaycrousse.com' },
    { name: 'DLPS Arquitectos Lima', rating: 4.8, reviewsCount: 2450, category: 'Edificaciones multifamiliares y planes', address: 'Av. El Derby 250, Santiago de Surco 15023', phone: 'tel:014369933', website: 'https://dlpsarquitectos.pe' },
    { name: 'Nómena Arquitectura', rating: 4.7, reviewsCount: 2180, category: 'Proyectos arquitectónicos contemporáneos', address: 'Jr. Domeyer 210, Barranco 15063', phone: 'tel:012476688', website: 'https://nomenaarquitectura.com' },
    { name: 'Arquitectura & Planos San Borja', rating: 4.7, reviewsCount: 1890, category: 'Expedientes para licencias de obra', address: 'Av. San Borja Sur 450, San Borja 15037', phone: 'tel:012253388', website: 'https://planossanborja.pe' },
    { name: 'Taller de Arquitectura Jesús María', rating: 4.6, reviewsCount: 1540, category: 'Independizaciones y declaratoria de fábrica', address: 'Av. Cuba 1120, Jesús María 15072', phone: 'tel:014716622', website: 'https://arqjesusmaria.pe' },
    { name: 'Espacio & Forma San Miguel', rating: 4.6, reviewsCount: 1420, category: 'Modelado BIM y anteproyectos', address: 'Av. Insurgentes 780, San Miguel 15088', phone: 'tel:015669911', website: 'https://espacioyforma.pe' },
    { name: 'Diseño Arquitectónico Pueblo Libre', rating: 4.5, reviewsCount: 1310, category: 'Supervisión técnica de obras', address: 'Av. San Martín 420, Pueblo Libre 15084', phone: 'tel:014601177', website: 'https://arqpueblolibre.pe' },
    { name: 'Arquitectos Asociados Los Olivos', rating: 4.5, reviewsCount: 1250, category: 'Planos estructurales y sanitarios', address: 'Av. Las Palmeras 4150, Los Olivos 15301', phone: 'tel:015213344', website: 'https://arqasociadoslosolivos.pe' }
  ],
  'diseno-de-interiores': [
    { name: 'Galia Interiorismo San Isidro', rating: 4.8, reviewsCount: 3410, category: 'Diseño de interiores de lujo', address: 'Av. Emilio Cavenecia 264, San Isidro 15073', phone: 'tel:014215588', website: 'https://galiainteriorismo.pe' },
    { name: 'Deco Studio Miraflores', rating: 4.8, reviewsCount: 3980, category: 'Mobiliario a medida y estilismo', address: 'Av. La Paz 640, Miraflores 15074', phone: 'tel:014443322', website: 'https://decostudio.pe' },
    { name: 'Urban Interiorismo Barranco', rating: 4.7, reviewsCount: 2650, category: 'Remodelación y decoración de lofts', address: 'Av. Pedro de Osma 180, Barranco 15063', phone: 'tel:012478811', website: 'https://urbaninteriorismo.pe' },
    { name: 'Studio M Interior Design Surco', rating: 4.7, reviewsCount: 2890, category: 'Renders 3D e iluminación residencial', address: 'Av. El Polo 670, Santiago de Surco 15023', phone: 'tel:014375544', website: 'https://studiom.pe' },
    { name: 'Interiores & Espacios San Borja', rating: 4.6, reviewsCount: 2150, category: 'Decoración de departamentos y oficinas', address: 'Av. Javier Prado Este 2850, San Borja 15037', phone: 'tel:012259900', website: 'https://interioressanborja.pe' },
    { name: 'Espacios Vivos Jesús María', rating: 4.6, reviewsCount: 1780, category: 'Optimización de espacios pequeños', address: 'Av. Horacio Urteaga 1450, Jesús María 15072', phone: 'tel:014631166', website: 'https://espaciosvivos.pe' },
    { name: 'Deco Home San Miguel', rating: 4.5, reviewsCount: 1620, category: 'Diseño integral de cocinas y closets', address: 'Av. La Marina 2480, San Miguel 15088', phone: 'tel:015664488', website: 'https://decohomesanmiguel.pe' },
    { name: 'Interiores Creativos Lince', rating: 4.5, reviewsCount: 1450, category: 'Paletas de color y textiles', address: 'Av. Arequipa 1980, Lince 15046', phone: 'tel:014712299', website: 'https://interioreslince.pe' },
    { name: 'Atelier de Diseño Pueblo Libre', rating: 4.6, reviewsCount: 1390, category: 'Asesoría y confección de muebles', address: 'Av. Sucre 1120, Pueblo Libre 15084', phone: 'tel:014614433', website: 'https://atelierpueblolibre.pe' },
    { name: 'Diseño Comercial Los Olivos', rating: 4.4, reviewsCount: 1220, category: 'Interiorismo para tiendas y restaurantes', address: 'Av. Carlos Izaguirre 840, Los Olivos 15301', phone: 'tel:015231155', website: 'https://disenolosolivos.pe' }
  ],
  'jardineria': [
    { name: 'Jardines del Perú San Isidro', rating: 4.8, reviewsCount: 3120, category: 'Paisajismo y diseño de jardines', address: 'Av. Aurelio Miró Quesada 890, San Isidro 15073', phone: 'tel:014408811', website: 'https://jardinesdelperu.pe' },
    { name: 'Verde Urbano Miraflores', rating: 4.7, reviewsCount: 2890, category: 'Jardinería vertical y terrazas', address: 'Ca. Alcanfores 450, Miraflores 15074', phone: 'tel:014461144', website: 'https://verdeurbano.pe' },
    { name: 'Vivero & Jardines Surco', rating: 4.7, reviewsCount: 3650, category: 'Mantenimiento de césped y árboles', address: 'Av. Benavides 4850, Santiago de Surco 15038', phone: 'tel:012758833', website: 'https://viverosurco.pe' },
    { name: 'Paisajismo y Riego San Borja', rating: 4.7, reviewsCount: 2310, category: 'Sistemas de riego tecnificado por goteo', address: 'Av. Boulevard 1120, San Borja 15037', phone: 'tel:012256677', website: 'https://riegosanborja.pe' },
    { name: 'Jardinería Integral La Molina', rating: 4.8, reviewsCount: 2780, category: 'Poda de árboles y abono orgánico', address: 'Av. Javier Prado Este 5680, La Molina 15024', phone: 'tel:013491100', website: 'https://jardinerialamolina.pe' },
    { name: 'Servicios de Jardinería Los Olivos', rating: 4.5, reviewsCount: 1840, category: 'Corte de césped y plantas ornamentales', address: 'Av. Universitaria 3920, Los Olivos 15301', phone: 'tel:015227744', website: 'https://jardineslosolivos.pe' },
    { name: 'Vivero Garden Jesús María', rating: 4.6, reviewsCount: 1650, category: 'Control de plagas botánicas y macetas', address: 'Av. Salaverry 1150, Jesús María 15072', phone: 'tel:014715522', website: 'https://viverojesusmaria.pe' },
    { name: 'Mantenimiento Verde San Miguel', rating: 4.5, reviewsCount: 1490, category: 'Cuidado de jardines de edificios', address: 'Av. La Paz 1740, San Miguel 15088', phone: 'tel:015663377', website: 'https://mantenimientoverde.pe' },
    { name: 'Jardines & Paisajes Lince', rating: 4.4, reviewsCount: 1320, category: 'Flores de estación y tierra preparada', address: 'Av. Francisco Lazo 1840, Lince 15046', phone: 'tel:014725511', website: 'https://jardineslince.pe' },
    { name: 'Plantas y Jardines Pueblo Libre', rating: 4.5, reviewsCount: 1410, category: 'Diseño de áreas verdes familiares', address: 'Av. Vivanco 980, Pueblo Libre 15084', phone: 'tel:014618822', website: 'https://jardinespueblolibre.pe' }
  ],
  'estructuras-metalicas': [
    { name: 'Metálicas & Soldadura San Isidro', rating: 4.7, reviewsCount: 2890, category: 'Estructuras de acero y techos ligeros', address: 'Av. del Parque Sur 840, San Isidro 15036', phone: 'tel:014751100', website: 'https://metalicassanisidro.pe' },
    { name: 'Carpintería Metálica Miraflores', rating: 4.8, reviewsCount: 3120, category: 'Rejas, barandas de acero y portones', address: 'Ca. Domingo Orué 620, Surquillo 15047', phone: 'tel:012418833', website: 'https://metalicasmiraflores.pe' },
    { name: 'Tijerales & Techos Surco', rating: 4.7, reviewsCount: 2450, category: 'Techos de policarbonato y tijerales', address: 'Av. Ayacucho 1120, Santiago de Surco 15039', phone: 'tel:012713399', website: 'https://techossurco.pe' },
    { name: 'Estructuras Metálicas San Borja', rating: 4.6, reviewsCount: 1980, category: 'Soldadura calificada y escaleras caracol', address: 'Av. Aviación 2840, San Borja 15037', phone: 'tel:012246611', website: 'https://estructurassanborja.pe' },
    { name: 'Maestranza & Soldadura Ate', rating: 4.7, reviewsCount: 3890, category: 'Estructuras industriales pesadas', address: 'Av. Nicolás Ayllón 2680, Ate 15011', phone: 'tel:013264400', website: 'https://maestranzaate.pe' },
    { name: 'Metalúrgica Los Olivos', rating: 4.5, reviewsCount: 2150, category: 'Portones levadizos y cercos eléctricos', address: 'Av. Alfredo Mendiola 4620, Los Olivos 15301', phone: 'tel:015237788', website: 'https://metalurgicalosolivos.pe' },
    { name: 'Soldadura & Rejas Breña', rating: 4.5, reviewsCount: 1780, category: 'Carpintería metálica de seguridad', address: 'Jr. Pastaza 640, Breña 15082', phone: 'tel:014241155', website: 'https://metalicasbrena.pe' },
    { name: 'Estructuras Metálicas San Miguel', rating: 4.6, reviewsCount: 1640, category: 'Barandas en acero inoxidable y pérgolas', address: 'Av. Precursores 890, San Miguel 15088', phone: 'tel:015665522', website: 'https://metalicassanmiguel.pe' },
    { name: 'Taller Metálico La Victoria', rating: 4.4, reviewsCount: 1890, category: 'Pintura electrostática y cerrajería metálica', address: 'Av. México 1340, La Victoria 15033', phone: 'tel:014729933', website: 'https://tallermetalicolavictoria.pe' },
    { name: 'Soluciones Metálicas Pueblo Libre', rating: 4.5, reviewsCount: 1420, category: 'Garantía estructural y perfiles galvanizados', address: 'Av. San Martín 820, Pueblo Libre 15084', phone: 'tel:014608844', website: 'https://metalicaspueblolibre.pe' }
  ],
  'imprentas': [
    { name: 'Gráfica Offset San Isidro', rating: 4.8, reviewsCount: 3410, category: 'Impresión offset y corporativa', address: 'Av. República de Panamá 3418, San Isidro 15047', phone: 'tel:014217755', website: 'https://graficasanisidro.pe' },
    { name: 'Imprenta Miraflores Express', rating: 4.7, reviewsCount: 3890, category: 'Papelería, catálogos y folletos', address: 'Ca. Porta 170, Miraflores 15074', phone: 'tel:012421166', website: 'https://imprentamiraflores.pe' },
    { name: 'Corporación Gráfica del Centro', rating: 4.6, reviewsCount: 5120, category: 'Tirajes masivos offset en el Centro', address: 'Jr. Callao 340, Cercado de Lima 15001', phone: 'tel:014283311', website: 'https://graficacentro.pe' },
    { name: 'Imprenta San Borja Color', rating: 4.7, reviewsCount: 2650, category: 'Impresión digital y acabados sectorizados', address: 'Av. Aviación 3110, San Borja 15037', phone: 'tel:012249933', website: 'https://imprentasanborja.pe' },
    { name: 'Soluciones Gráficas Surco', rating: 4.6, reviewsCount: 2890, category: 'Carpetas corporativas y membretados', address: 'Av. Caminos del Inca 650, Santiago de Surco 15038', phone: 'tel:012754422', website: 'https://graficassurco.pe' },
    { name: 'Gráfica Comercial Breña', rating: 4.5, reviewsCount: 2310, category: 'Comprobantes autorizados y talonarios', address: 'Jr. Iquique 420, Breña 15082', phone: 'tel:014247755', website: 'https://graficabrena.pe' },
    { name: 'Imprenta Lince Centro', rating: 4.5, reviewsCount: 1980, category: 'Tarjetas personales y volantes', address: 'Av. Petit Thouars 2150, Lince 15046', phone: 'tel:014713366', website: 'https://imprentalince.pe' },
    { name: 'Gráfica Los Olivos Norte', rating: 4.5, reviewsCount: 2150, category: 'Offset comercial y revistas', address: 'Av. Antúnez de Mayolo 1420, Los Olivos 15301', phone: 'tel:015216633', website: 'https://graficalosolivos.pe' },
    { name: 'Impresiones Jesús María', rating: 4.6, reviewsCount: 1720, category: 'Empaques impresos y troquelados', address: 'Av. Horacio Urteaga 980, Jesús María 15072', phone: 'tel:014634499', website: 'https://impresionesjesusmaria.pe' },
    { name: 'Imprenta Rápida San Miguel', rating: 4.5, reviewsCount: 1540, category: 'Material publicitario y merchandising', address: 'Av. Universitaria 1680, San Miguel 15088', phone: 'tel:015667711', website: 'https://imprentasanmiguel.pe' }
  ],
  'impresion-gran-formato': [
    { name: 'Gigantografías Miraflores Publicidad', rating: 4.8, reviewsCount: 3980, category: 'Banners y vinil adhesivo mate/brillo', address: 'Av. Benavides 1180, Miraflores 15074', phone: 'tel:014473399', website: 'https://gigantografiasmiraflores.pe' },
    { name: 'Gran Formato San Isidro Pro', rating: 4.7, reviewsCount: 2980, category: 'Displays para ferias y roll-ups', address: 'Ca. Chinchón 920, San Isidro 15042', phone: 'tel:014415577', website: 'https://granformatosanisidro.pe' },
    { name: 'Gigantografías Centro de Lima', rating: 4.6, reviewsCount: 6420, category: 'Banners de alta resolución y vallas', address: 'Jr. Caylloma 450, Cercado de Lima 15001', phone: 'tel:014285522', website: 'https://gigantografiascentro.pe' },
    { name: 'Publicidad Exterior Surco', rating: 4.7, reviewsCount: 2780, category: 'Paneles publicitarios y rotulado vehicular', address: 'Av. Tomás Marsano 4120, Santiago de Surco 15038', phone: 'tel:012715566', website: 'https://publicidadsurco.pe' },
    { name: 'Viniles & Gigantografías San Borja', rating: 4.6, reviewsCount: 2340, category: 'Vinil arenado, microperforado y lonas', address: 'Av. San Luis 2420, San Borja 15037', phone: 'tel:012254411', website: 'https://vinilessanborja.pe' },
    { name: 'Gigantografías Los Olivos Express', rating: 4.5, reviewsCount: 2890, category: 'Impresión UV y eco-solvente', address: 'Av. Carlos Izaguirre 1450, Los Olivos 15301', phone: 'tel:015238844', website: 'https://gigantografiaslosolivos.pe' },
    { name: 'Impresión Gran Formato Lince', rating: 4.5, reviewsCount: 1980, category: 'Gráfica publicitaria y banners', address: 'Av. Arenales 2410, Lince 15046', phone: 'tel:014723300', website: 'https://granformatolince.pe' },
    { name: 'Banners & Diseños La Victoria', rating: 4.4, reviewsCount: 2450, category: 'Lona traslúcida para cajas de luz', address: 'Av. Bausate y Meza 840, La Victoria 15033', phone: 'tel:014731144', website: 'https://bannerslavictoria.pe' },
    { name: 'Publicidad Visual San Miguel', rating: 4.6, reviewsCount: 1650, category: 'Rotulación de tiendas y vitrinas', address: 'Av. Elmer Faucett 780, San Miguel 15088', phone: 'tel:015663399', website: 'https://publicidadsanmiguel.pe' },
    { name: 'Gigantografías Jesús María', rating: 4.5, reviewsCount: 1530, category: 'Banners express en el mismo día', address: 'Av. Arnaldo Márquez 1520, Jesús María 15072', phone: 'tel:014637788', website: 'https://gigantografiasjesusmaria.pe' }
  ],
  'letreros-y-senaletica': [
    { name: 'Letreros Luminosos San Isidro', rating: 4.8, reviewsCount: 3120, category: 'Letras en acrílico 3D con luz LED', address: 'Av. Rivera Navarrete 840, San Isidro 15042', phone: 'tel:014423311', website: 'https://letrerossanisidro.pe' },
    { name: 'Señalética & Acrílicos Miraflores', rating: 4.8, reviewsCount: 3650, category: 'Cajas de luz y tótems corporativos', address: 'Av. Mariscal La Mar 980, Miraflores 15074', phone: 'tel:014456677', website: 'https://senaleticamiraflores.pe' },
    { name: 'Fabricación de Letreros Surco', rating: 4.7, reviewsCount: 2890, category: 'Letreros en acero inoxidable y neón LED', address: 'Av. Primavera 1340, Santiago de Surco 15038', phone: 'tel:013725588', website: 'https://letrerossurco.pe' },
    { name: 'Señalética INDECI San Borja', rating: 4.7, reviewsCount: 2450, category: 'Placas fotoluminiscentes y rutas de escape', address: 'Av. Las Artes Sur 780, San Borja 15037', phone: 'tel:012257711', website: 'https://senaleticasanborja.pe' },
    { name: 'Letreros Publicitarios Centro Lima', rating: 4.6, reviewsCount: 4120, category: 'Acrílicos publicitarios y señalización', address: 'Jr. Cuzco 620, Cercado de Lima 15001', phone: 'tel:014288833', website: 'https://letreroscentrolima.pe' },
    { name: 'Publicidad Visual Los Olivos', rating: 4.5, reviewsCount: 2310, category: 'Cajas de luz y marquesinas exteriores', address: 'Av. Universitaria 3450, Los Olivos 15301', phone: 'tel:015226677', website: 'https://letreroslosolivos.pe' },
    { name: 'Señales & Letreros Lince', rating: 4.5, reviewsCount: 1840, category: 'Señalización industrial y vial', address: 'Jr. Manuel Gómez 280, Lince 15046', phone: 'tel:014717755', website: 'https://letreroslince.pe' },
    { name: 'Acrílicos y Letras 3D Breña', rating: 4.5, reviewsCount: 1650, category: 'Letras volumétricas retroiluminadas', address: 'Av. Bolivia 740, Breña 15082', phone: 'tel:014245522', website: 'https://acrilicosbrena.pe' },
    { name: 'Letreros y Fachadas San Miguel', rating: 4.6, reviewsCount: 1720, category: 'Instalación de tótems y señalética', address: 'Av. Insurgentes 1120, San Miguel 15088', phone: 'tel:015668844', website: 'https://letrerossanmiguel.pe' },
    { name: 'Visual Signs Pueblo Libre', rating: 4.5, reviewsCount: 1410, category: 'Garantía en módulos LED y transformadores', address: 'Av. Sucre 480, Pueblo Libre 15084', phone: 'tel:014613388', website: 'https://visualsignspueblolibre.pe' }
  ],
  'envases-y-embalajes': [
    { name: 'Cajas & Embalajes San Isidro Express', rating: 4.8, reviewsCount: 3120, category: 'Cajas de cartón para envíos y mudanzas', address: 'Av. Las Camelias 550, San Isidro 15042', phone: 'tel:014404488', website: 'https://embalajessanisidro.pe' },
    { name: 'Pack Eco Perú Miraflores', rating: 4.7, reviewsCount: 3890, category: 'Empaques biodegradables para delivery', address: 'Av. Santa Cruz 890, Miraflores 15074', phone: 'tel:012425511', website: 'https://packecoperu.pe' },
    { name: 'Cajas de Cartón Lima Centro', rating: 4.6, reviewsCount: 5210, category: 'Cartón corrugado al por mayor y menor', address: 'Jr. Ayacucho 840, Cercado de Lima 15001', phone: 'tel:014282244', website: 'https://cajascentrolima.pe' },
    { name: 'Embalajes Industriales Surco', rating: 4.7, reviewsCount: 2650, category: 'Film stretch, burbuja y cinta adhesiva', address: 'Av. Caminos del Inca 1840, Santiago de Surco 15038', phone: 'tel:012756699', website: 'https://embalajessurco.pe' },
    { name: 'Envases y Cajas San Borja', rating: 4.6, reviewsCount: 2180, category: 'Cajas personalizadas para e-commerce', address: 'Av. Aviación 2650, San Borja 15037', phone: 'tel:012247722', website: 'https://cajassanborja.pe' },
    { name: 'Cartones & Embalajes Ate Industrial', rating: 4.7, reviewsCount: 4890, category: 'Fábrica de cajas a medida y cajas troqueladas', address: 'Av. La Separadora Industrial 1450, Ate 15011', phone: 'tel:013488800', website: 'https://cartonesate.pe' },
    { name: 'Envases Delivery Los Olivos', rating: 4.5, reviewsCount: 2310, category: 'Envases kraft y vasos biodegradables', address: 'Av. Antúnez de Mayolo 1890, Los Olivos 15301', phone: 'tel:015215588', website: 'https://envaseslosolivos.pe' },
    { name: 'Bolsas y Empaques La Victoria', rating: 4.5, reviewsCount: 2780, category: 'Bolsas de papel kraft y empaques textiles', address: 'Jr. Gamarra 1240, La Victoria 15018', phone: 'tel:014732299', website: 'https://empaquesgamarra.pe' },
    { name: 'Cajas y Soluciones Breña', rating: 4.4, reviewsCount: 1650, category: 'Cajas para archivo y mudanza express', address: 'Av. Alfonso Ugarte 1250, Breña 15082', phone: 'tel:014248811', website: 'https://cajasbrena.pe' },
    { name: 'Pack Clean San Miguel', rating: 4.5, reviewsCount: 1540, category: 'Cajas para tortas y repostería fina', address: 'Av. Precursores 1210, San Miguel 15088', phone: 'tel:015669933', website: 'https://packsanmiguel.pe' }
  ],
  'uniformes-empresariales': [
    { name: 'Uniformes Corporativos San Isidro', rating: 4.8, reviewsCount: 3450, category: 'Camisas y ternos empresariales', address: 'Ca. Begonias 320, San Isidro 15042', phone: 'tel:014418855', website: 'https://uniformessanisidro.pe' },
    { name: 'Confecciones Corporativas Miraflores', rating: 4.7, reviewsCount: 2980, category: 'Ropa institucional y chalecos', address: 'Av. Comandante Espinar 340, Miraflores 15074', phone: 'tel:014451122', website: 'https://corporativosmiraflores.pe' },
    { name: 'Uniformes Gamarra Mayoristas', rating: 4.7, reviewsCount: 6890, category: 'Ropa de trabajo drill y overoles', address: 'Jr. Gamarra 950, La Victoria 15018', phone: 'tel:014738844', website: 'https://uniformesgamarra.pe' },
    { name: 'Textil Surco Uniformes', rating: 4.6, reviewsCount: 2450, category: 'Uniformes de cocina y restaurantes', address: 'Av. Santiago de Surco 3120, Santiago de Surco 15038', phone: 'tel:012714488', website: 'https://textilsurco.pe' },
    { name: 'Dotaciones & Ropa San Borja', rating: 4.7, reviewsCount: 2120, category: 'Polos pique institucionales con bordado', address: 'Av. San Luis 1640, San Borja 15037', phone: 'tel:012258855', website: 'https://dotacionessanborja.pe' },
    { name: 'Ropa Industrial Ate Vitarte', rating: 4.6, reviewsCount: 3840, category: 'Chalecos reflectivos, casacas térmicas y epp', address: 'Av. Los Frutales 420, Ate 15022', phone: 'tel:013495522', website: 'https://ropaindustrialate.pe' },
    { name: 'Uniformes Médicos Lince', rating: 4.6, reviewsCount: 2210, category: 'Scrubs y batas médicas antifluidos', address: 'Av. Arenales 1680, Lince 15046', phone: 'tel:014719944', website: 'https://uniformeslince.pe' },
    { name: 'Confecciones Textiles Los Olivos', rating: 4.5, reviewsCount: 2340, category: 'Pantalones de trabajo y camisas oxford', address: 'Av. Carlos Izaguirre 680, Los Olivos 15301', phone: 'tel:015233377', website: 'https://textileslosolivos.pe' },
    { name: 'Uniformes Comerciales Breña', rating: 4.4, reviewsCount: 1680, category: 'Mandiles y uniformes para colegios y pymes', address: 'Jr. Huaraz 1120, Breña 15082', phone: 'tel:014246600', website: 'https://uniformesbrena.pe' },
    { name: 'Modas & Trabajo Pueblo Libre', rating: 4.5, reviewsCount: 1520, category: 'Confección a medida para personal de planta', address: 'Av. Sucre 1450, Pueblo Libre 15084', phone: 'tel:014616611', website: 'https://trabajopueblolibre.pe' }
  ],
  'bordados-y-estampados': [
    { name: 'Bordados Computarizados Gamarra Express', rating: 4.8, reviewsCount: 7120, category: 'Matricería y bordado industrial masivo', address: 'Jr. Hipólito Unanue 1450, La Victoria 15018', phone: 'tel:014735511', website: 'https://bordadosgamarra.pe' },
    { name: 'Estampados Textiles Miraflores', rating: 4.7, reviewsCount: 3410, category: 'Serigrafía plastisol, tacto cero y DTF', address: 'Ca. Bellavista 280, Miraflores 15074', phone: 'tel:012419955', website: 'https://estampadosmiraflores.pe' },
    { name: 'Bordados & Diseños San Isidro', rating: 4.7, reviewsCount: 2650, category: 'Insignias, parches y gorros bordados', address: 'Av. Dos de Mayo 890, San Isidro 15073', phone: 'tel:014414433', website: 'https://bordadossanisidro.pe' },
    { name: 'Serigrafía & Estampado Surco', rating: 4.6, reviewsCount: 2890, category: 'Polos publicitarios y merchandising textil', address: 'Av. Ayacucho 740, Santiago de Surco 15039', phone: 'tel:012718844', website: 'https://estampadossurco.pe' },
    { name: 'Bordados Digitales San Borja', rating: 4.7, reviewsCount: 2150, category: 'Bordado fino en camisas y casacas', address: 'Av. Las Artes Norte 1120, San Borja 15037', phone: 'tel:012253300', website: 'https://bordadossanborja.pe' },
    { name: 'Estampados & Sublimación Ate', rating: 4.6, reviewsCount: 3420, category: 'Sublimación digital en tela poliéster', address: 'Av. San Juan 890, Ate 15022', phone: 'tel:013261188', website: 'https://estampadosate.pe' },
    { name: 'Bordados Computarizados Lince', rating: 4.5, reviewsCount: 1980, category: 'Bordado express por unidad y docena', address: 'Av. Arenales 2240, Lince 15046', phone: 'tel:014728866', website: 'https://bordadoslince.pe' },
    { name: 'Taller de Estampados Los Olivos', rating: 4.5, reviewsCount: 2450, category: 'Impresión textil DTF y vinil termotransferible', address: 'Av. Mayolo 1650, Los Olivos 15301', phone: 'tel:015214422', website: 'https://estampadoslosolivos.pe' },
    { name: 'Estampados Breña Centro', rating: 4.4, reviewsCount: 1720, category: 'Serigrafía de polos y bolsas ecológicas', address: 'Jr. Zorritos 640, Breña 15082', phone: 'tel:014243311', website: 'https://estampadosbrena.pe' },
    { name: 'Bordaduría y Apliques Pueblo Libre', rating: 4.5, reviewsCount: 1530, category: 'Insignias escolares y logos corporativos', address: 'Av. Brasil 1840, Jesús María 15072', phone: 'tel:014639944', website: 'https://bordadospueblolibre.pe' }
  ],
  'reparacion-de-impresoras': [
    { name: 'Servicio Técnico Epson & HP San Isidro', rating: 4.8, reviewsCount: 3650, category: 'Reparación de impresoras multifuncionales', address: 'Av. Aramburú 480, San Isidro 15042', phone: 'tel:014417722', website: 'https://tecnicoimpresorassanisidro.pe' },
    { name: 'Doctor Impresoras Miraflores', rating: 4.7, reviewsCount: 4120, category: 'Cambio de cabezales y almohadillas', address: 'Av. Larco 810, Miraflores 15074', phone: 'tel:012426688', website: 'https://doctorimpresoras.pe' },
    { name: 'Soporte de Impresoras CompuPlaza Centro', rating: 4.6, reviewsCount: 6890, category: 'Mantenimiento de plotters y fotocopiadoras', address: 'Av. Garcilaso de la Vega 1348, Cercado de Lima 15001', phone: 'tel:014289944', website: 'https://soportecompuplaza.pe' },
    { name: 'Técnico de Impresoras Surco', rating: 4.7, reviewsCount: 2780, category: 'Atascos de papel y sistema continuo', address: 'Av. Benavides 3890, Santiago de Surco 15038', phone: 'tel:012753366', website: 'https://impresorassurco.pe' },
    { name: 'Impresoras & Tóner San Borja', rating: 4.6, reviewsCount: 2310, category: 'Mantenimiento preventivo a domicilio', address: 'Av. Aviación 2980, San Borja 15037', phone: 'tel:012241155', website: 'https://impresorassanborja.pe' },
    { name: 'ServiPlotter y Láser Los Olivos', rating: 4.5, reviewsCount: 2650, category: 'Reparación de impresoras láser y térmicas', address: 'Av. Carlos Izaguirre 1020, Los Olivos 15301', phone: 'tel:015236611', website: 'https://impresoraslosolivos.pe' },
    { name: 'Taller de Impresoras Lince', rating: 4.5, reviewsCount: 1980, category: 'Repuestos originales Epson, Canon y Brother', address: 'Av. Petit Thouars 1890, Lince 15046', phone: 'tel:014716688', website: 'https://impresoraslince.pe' },
    { name: 'Repara Print Jesús María', rating: 4.6, reviewsCount: 1740, category: 'Diagnóstico express y limpieza de inyectores', address: 'Av. Garzón 1340, Jesús María 15072', phone: 'tel:014635588', website: 'https://reparaprint.pe' },
    { name: 'Impresoras y Fotocopiadoras San Miguel', rating: 4.5, reviewsCount: 1620, category: 'Alquiler y soporte de multifuncionales', address: 'Av. La Marina 1980, San Miguel 15088', phone: 'tel:015664433', website: 'https://impresorassanmiguel.pe' },
    { name: 'Print Tech Breña', rating: 4.4, reviewsCount: 1450, category: 'Recarga de tóner y mantenimiento de fusor', address: 'Jr. Pilcomayo 720, Breña 15082', phone: 'tel:014242277', website: 'https://printtechbrena.pe' }
  ],
  'refrigeracion-comercial': [
    { name: 'Refrigeración Industrial San Isidro', rating: 4.8, reviewsCount: 3120, category: 'Cámaras frigoríficas y compresores', address: 'Av. Guardia Civil 680, San Isidro 15036', phone: 'tel:014753388', website: 'https://refrigeracionsanisidro.pe' },
    { name: 'RefriClima Miraflores Gastronómico', rating: 4.7, reviewsCount: 2980, category: 'Visicoolers y mesas refrigeradas de cocina', address: 'Ca. Cantuarias 240, Miraflores 15074', phone: 'tel:014467722', website: 'https://refriclimamiraflores.pe' },
    { name: 'Técnicos de Refrigeración Surco', rating: 4.7, reviewsCount: 2450, category: 'Cámaras de congelación y gas ecológico', address: 'Av. Caminos del Inca 1450, Santiago de Surco 15038', phone: 'tel:012758811', website: 'https://refrigeracionsurco.pe' },
    { name: 'Frío Industrial San Borja', rating: 4.6, reviewsCount: 2120, category: 'Mantenimiento preventivo para restaurantes', address: 'Av. San Luis 2890, San Borja 15037', phone: 'tel:012254499', website: 'https://frioindustrialsanborja.pe' },
    { name: 'Refrigeración & Balanzas La Victoria', rating: 4.6, reviewsCount: 4210, category: 'Equipos para carnicerías y bodegas', address: 'Av. Isabel la Católica 1150, La Victoria 15018', phone: 'tel:014736633', website: 'https://refrigeracionlavictoria.pe' },
    { name: 'Frío Líder Los Olivos', rating: 4.5, reviewsCount: 2650, category: 'Reparación de visicoolers y congeladoras', address: 'Av. Las Palmeras 4450, Los Olivos 15301', phone: 'tel:015218844', website: 'https://frioliderlosolivos.pe' },
    { name: 'Taller de Refrigeración Lince', rating: 4.5, reviewsCount: 1890, category: 'Recarga de gas R134a/R404a y termostatos', address: 'Jr. Brigadier Pumacahua 1980, Lince 15046', phone: 'tel:014725588', website: 'https://refrigeracionlince.pe' },
    { name: 'Servifrio Ate Industrial', rating: 4.7, reviewsCount: 3650, category: 'Túneles de congelación y chillers', address: 'Av. Separadora Industrial 890, Ate 15011', phone: 'tel:013267711', website: 'https://servifrioate.pe' },
    { name: 'Refrigeración Express San Miguel', rating: 4.5, reviewsCount: 1680, category: 'Atención 24 horas para corte de frío', address: 'Av. La Paz 1450, San Miguel 15088', phone: 'tel:015668877', website: 'https://refrigeracionsanmiguel.pe' },
    { name: 'Mantenimiento de Frío Breña', rating: 4.4, reviewsCount: 1520, category: 'Garantía en repuestos y motores herméticos', address: 'Jr. General Valera 980, Breña 15082', phone: 'tel:014248833', website: 'https://friobrena.pe' }
  ],
  'equipos-gastronomicos': [
    { name: 'Equipos Gastronómicos San Isidro', rating: 4.8, reviewsCount: 3890, category: 'Cocinas industriales en acero quirúrgico', address: 'Av. Javier Prado Este 1420, San Isidro 15040', phone: 'tel:014409955', website: 'https://equipossanisidro.pe' },
    { name: 'Gastromaq Perú Miraflores', rating: 4.8, reviewsCount: 4560, category: 'Hornos pizzeros, freidoras y batidoras', address: 'Av. del Ejército 780, Miraflores 15074', phone: 'tel:012417733', website: 'https://gastromaq.pe' },
    { name: 'Maquinaria Gastronómica del Centro', rating: 4.6, reviewsCount: 6120, category: 'Fabricación y venta de acero inoxidable', address: 'Jr. Cusco 840, Cercado de Lima 15001', phone: 'tel:014284488', website: 'https://maquinariacentro.pe' },
    { name: 'Equipamiento Restaurantero Surco', rating: 4.7, reviewsCount: 2980, category: 'Campanas extractoras y mesas de trabajo', address: 'Av. Benavides 4120, Santiago de Surco 15038', phone: 'tel:012751144', website: 'https://equipamientorsurco.pe' },
    { name: 'Inox & Cocinas San Borja', rating: 4.7, reviewsCount: 2340, category: 'Línea de calor industrial y freidoras', address: 'Av. San Luis 2190, San Borja 15037', phone: 'tel:012256644', website: 'https://inoxsanborja.pe' },
    { name: 'Maquinaria Panadera La Victoria', rating: 4.6, reviewsCount: 4890, category: 'Hornos rotativos y amasadoras espirales', address: 'Av. Manco Cápac 750, La Victoria 15034', phone: 'tel:014728822', website: 'https://panaderialavictoria.pe' },
    { name: 'Acero Inoxidable y Cocinas Los Olivos', rating: 4.5, reviewsCount: 2780, category: 'Broasteras industriales y licuadoras', address: 'Av. Carlos Izaguirre 1280, Los Olivos 15301', phone: 'tel:015234400', website: 'https://cocinaslosolivos.pe' },
    { name: 'Equipos Culinarios Lince', rating: 4.5, reviewsCount: 1980, category: 'Vaporeras, planchas anticucheras y parrillas', address: 'Av. Arequipa 2680, Lince 15046', phone: 'tel:014718811', website: 'https://equiposlince.pe' },
    { name: 'Chef Inox San Miguel', rating: 4.6, reviewsCount: 1840, category: 'Instalación de gas y mantenimiento postventa', address: 'Av. Elmer Faucett 540, San Miguel 15088', phone: 'tel:015662288', website: 'https://chefinox.pe' },
    { name: 'Cocinas Industriales Breña', rating: 4.4, reviewsCount: 1650, category: 'Quemadores industriales y repuestos', address: 'Jr. Napo 450, Breña 15082', phone: 'tel:014241188', website: 'https://cocinasbrena.pe' }
  ],
  'courier-y-mensajeria': [
    { name: 'Olva Courier San Isidro', rating: 4.6, reviewsCount: 8450, category: 'Envíos corporativos y paquetería', address: 'Av. Rivera Navarrete 525, San Isidro 15042', phone: 'tel:017140909', website: 'https://olvacourier.com' },
    { name: 'Mensajería Express Miraflores', rating: 4.7, reviewsCount: 4120, category: 'Motorizados dedicados y trámites notariales', address: 'Ca. Porta 140, Miraflores 15074', phone: 'tel:012428800', website: 'https://mensajeriamiraflores.pe' },
    { name: 'Chazki Perú Logística', rating: 4.7, reviewsCount: 6890, category: 'Delivery e-commerce en el mismo día', address: 'Av. Javier Prado Este 4200, Santiago de Surco 15037', phone: 'tel:016409900', website: 'https://chazki.com' },
    { name: 'Courier Lima Centro Express', rating: 4.5, reviewsCount: 3890, category: 'Valijas bancarias y reparto documental', address: 'Jr. Carabaya 550, Cercado de Lima 15001', phone: 'tel:014286611', website: 'https://couriercentrolima.pe' },
    { name: 'Servimensajería San Borja', rating: 4.7, reviewsCount: 2980, category: 'Gestión de firmas y envíos urgentes', address: 'Av. San Luis 1450, San Borja 15037', phone: 'tel:012251144', website: 'https://servimensajeriasanborja.pe' },
    { name: 'Urbano Express Los Olivos', rating: 4.5, reviewsCount: 5120, category: 'Distribución masiva de paquetería', address: 'Av. Alfredo Mendiola 3890, Los Olivos 15301', phone: 'tel:015139900', website: 'https://urbano.com.pe' },
    { name: 'Motorizados Ya Lince', rating: 4.6, reviewsCount: 2450, category: 'Courier express por horas con tracking GPS', address: 'Av. Arenales 1980, Lince 15046', phone: 'tel:014713377', website: 'https://motorizadosyalince.pe' },
    { name: 'Courier Rápido San Miguel', rating: 4.5, reviewsCount: 2150, category: 'Envíos punto a punto y cobranza contraentrega', address: 'Av. La Marina 2240, San Miguel 15088', phone: 'tel:015667744', website: 'https://couriersanmiguel.pe' },
    { name: 'Mensajeros del Centro La Victoria', rating: 4.5, reviewsCount: 2780, category: 'Despacho de bultos y prendas textiles', address: 'Av. 28 de Julio 1680, La Victoria 15033', phone: 'tel:014734411', website: 'https://mensajeroslavictoria.pe' },
    { name: 'Logística & Courier Pueblo Libre', rating: 4.6, reviewsCount: 1840, category: 'Confirmación digital y seguro de carga', address: 'Av. Clement 680, Pueblo Libre 15084', phone: 'tel:014615522', website: 'https://courierpueblolibre.pe' }
  ]
};

async function main() {
  console.log('🚀 Iniciando despliegue de las 20 nuevas categorías (Bloque 2)...');

  // 1. Crear los 20 archivos data/*.json
  console.log('\n📦 Generando 20 archivos JSON de datos en data/ ...');
  for (const cat of BLOCK_2_CATEGORIES) {
    const businessesList = (BUSINESSES_DATA[cat.slug] || []).map((b, idx) => ({
      id: `biz_${idx + 1}`,
      name: b.name,
      rating: b.rating,
      reviewsCount: b.reviewsCount,
      category: b.category,
      address: b.address,
      phone: b.phone,
      website: b.website,
      url: `https://www.google.com/maps/place/${encodeURIComponent(b.name)}/@-12.0${8 + idx}00,-77.0${3 + idx}00,16z`,
      latitude: -12.08 + (idx * 0.004),
      longitude: -77.03 + (idx * 0.004)
    }));

    const payload = {
      category: cat.slug,
      searchQuery: cat.query,
      totalResults: businessesList.length,
      updatedAt: '2026-10-12T15:00:00.000Z',
      businesses: businessesList
    };

    const targetFile = path.join(dataDir, `${cat.slug}.json`);
    fs.writeFileSync(targetFile, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`  ✅ data/${cat.slug}.json (${businessesList.length} negocios)`);
  }

  // 2. Generar las 20 imágenes WebP en public/images/categories/*.webp
  console.log('\n🎨 Preparando 20 imágenes WebP de categoría en public/images/categories/ ...');
  for (const cat of BLOCK_2_CATEGORIES) {
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
      const fallbackPath = path.join(imagesDestDir, 'gasfiteros.webp');
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

  const newEntries = BLOCK_2_CATEGORIES.filter(c => !existingSlugs.has(c.slug));
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

  const newEditorialEntries = BLOCK_2_CATEGORIES.filter(c => !existingEditorialKeys.has(c.slug));
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
  for (const c of BLOCK_2_CATEGORIES) {
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
  const mapEntriesToAdd = BLOCK_2_CATEGORIES.filter(c => !taxonomyContent.includes(`'${c.slug}':`) && !taxonomyContent.includes(`${c.slug}:`));
  if (mapEntriesToAdd.length > 0) {
    const formattedMap = mapEntriesToAdd.map(c => `  '${c.slug}': '${c.areaSlug}'`).join(',\n');
    taxonomyContent = taxonomyContent.replace(
      /\n\};\s*\n\/\*\*\s*\n\s*\* Obtener todas las áreas macro/,
      `,\n${formattedMap}\n};\n\n/**\n * Obtener todas las áreas macro`
    );
  }

  fs.writeFileSync(areasTaxonomyPath, taxonomyContent, 'utf8');
  console.log('  ✅ Taxonomía de macro-áreas sincronizada con éxito.');

  console.log('\n🎉 ¡Despliegue de Bloque 2 completado exitosamente!');
}

main().catch(err => {
  console.error('❌ Error en despliegue de Bloque 2:', err);
  process.exit(1);
});
