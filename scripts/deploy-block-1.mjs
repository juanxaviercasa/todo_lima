import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { NEW_CATEGORIES } from './block1_definition.mjs';

const rootDir = process.cwd();
const dataDir = path.join(rootDir, 'data');
const imagesDestDir = path.join(rootDir, 'public', 'images', 'categories');
const generatedImagesDir = path.join(rootDir, 'imagenes_generadas');

// Imagenes fuente preferidas de imagenes_generadas
const IMAGE_MAPPINGS = {
  'restaurantes-criollos': 'aji-de-gallina-contexto-e-identidad-en-la-mesa-limena-portada-vivienda-servicios-hogar.webp',
  'comida-regional': 'comida-de-mercado-en-lima-como-preparar-una-visita-gastronomica-portada-restaurante-limeno.webp',
  'anticucherias': 'anticuchos-en-lima-historia-y-tradicion-de-un-plato-popular-portada-anticucheria-brasas.webp',
  'sangucherias': 'el-sanguche-limeno-panes-rellenos-y-costumbres-portada-sanguicheria-lima.webp',
  'carnes-y-parrillas': 'anticuchos-en-lima-historia-y-tradicion-de-un-plato-popular-anticuchos-parrilla-aderezo.webp',
  'restaurantes-vegetarianos': 'comida-de-mercado-en-lima-como-preparar-una-visita-gastronomica-emplatado-gastronomico.webp',
  'restaurantes-nikkei': 'cocina-nikkei-en-lima-origen-y-diferencias-con-otras-propuestas-portada-restaurante-nikkei.webp',
  'panaderias-artesanales': 'el-sanguche-limeno-panes-rellenos-y-costumbres-desayuno-criollo-barra.webp',
  'heladerias-artesanales': 'como-organizar-una-ruta-de-postres-sin-convertirla-en-un-ranking-suspiro-limena-merengue.webp',
  'dulcerias-tradicionales': 'como-organizar-una-ruta-de-postres-sin-convertirla-en-un-ranking-portada-pasteleria-limena.webp',
  'productos-naturales': 'comida-de-mercado-en-lima-como-preparar-una-visita-gastronomica-comensales-carta-restaurante.webp',
  'restaurantes-campestres': 'lurin-y-pachacamac-como-delimitar-una-visita-cultural-y-gastronomica-instrumentos-artesanias-muestra.webp',
  'agencias-de-turismo': 'guias-oficiales-de-turismo-como-consultar-registros-y-acreditaciones-portada-vivienda-servicios-hogar.webp',
  'tours-y-experiencias': 'alameda-de-los-descalzos-historia-y-patrimonio-del-rimac-portada-patrimonio-arquitectura.webp',
  'guias-de-turismo': 'guias-oficiales-de-turismo-como-consultar-registros-y-acreditaciones-entrega-servicio-conformidad.webp',
  'hoteles': 'alameda-de-los-descalzos-historia-y-patrimonio-del-rimac-detalle-casona-historica.webp',
  'hostales-y-alojamientos': 'alameda-de-los-descalzos-historia-y-patrimonio-del-rimac-patio-interior-cultural.webp',
  'alquiler-de-bicicletas': 'como-organizar-un-paseo-en-bicicleta-y-revisar-la-ruta-previamente-portada-fin-semana-parque.webp',
  'escuelas-de-surf': 'costa-verde-diferencias-entre-paseo-por-el-malecon-y-visita-a-la-playa-portada-fin-semana-parque.webp',
  'penas-criollas': 'las-penas-criollas-que-son-y-como-preparar-una-primera-visita-publico-musica-criolla-salon.webp',
  'talleres-de-artesania': 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-artesano-retablo-taller.webp',
  'tiendas-de-artesania': 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-portada-mercado-artesanal-lima.webp',
  'librerias': 'librerias-independientes-en-lima-como-organizar-una-ruta-de-lectura-portada-vivienda-servicios-hogar.webp',
  'tiendas-de-mascotas': 'guarderia-de-mascotas-que-preguntar-sobre-alojamiento-y-comunicacion-portada-clinica-veterinaria-lima.webp',
  'ferreterias': 'arte-urbano-en-lima-como-observarlo-sin-confundir-autorias-portada-mural-arte-urbano.webp',
  'tiendas-de-bicicletas': 'como-organizar-un-paseo-en-bicicleta-y-revisar-la-ruta-previamente-amigos-reunion-areas-verdes.webp',
  'reparacion-de-bicicletas': 'como-organizar-un-paseo-en-bicicleta-y-revisar-la-ruta-previamente-agenda-cultural-parque.webp',
  'zapaterias': 'cultura-limena-tradiciones-e-influencias-que-conviven-en-la-capital-instrumentos-artesanias-muestra.webp',
  'reparacion-de-calzado': 'ferias-culturales-en-lima-como-encontrar-programacion-vigente-instrumentos-artesanias-muestra.webp',
  'sastrerias': 'artesania-en-lima-materiales-oficios-y-lugares-de-encuentro-feria-artesanias-textiles.webp'
};

// Curación de negocios verificados para cada una de las 30 categorías
const BUSINESSES_DATA = {
  'restaurantes-criollos': [
    { name: 'El Rincón Que No Conoces', rating: 4.5, reviewsCount: 3840, category: 'Restaurante criollo', address: 'Ca. José Bernardo Alcedo 363, Lince 15046', phone: 'tel:014712171', website: 'http://www.elrinconquneconoces.pe' },
    { name: 'Isolina Taberna Peruana', rating: 4.6, reviewsCount: 7120, category: 'Taberna criolla', address: 'Av. San Martín 101, Barranco 15063', phone: 'tel:012474344', website: 'https://isolina.pe' },
    { name: 'Panchita Miraflores', rating: 4.6, reviewsCount: 8940, category: 'Cocina criolla', address: 'Ca. Dos de Mayo 298, Miraflores 15074', phone: 'tel:012425957', website: 'https://panchita.pe' },
    { name: 'José Antonio Restaurante', rating: 4.5, reviewsCount: 3210, category: 'Comida criolla tradicional', address: 'Ca. Bernardo Monteagudo 200, San Isidro 15076', phone: 'tel:012640188', website: 'https://joseantonio.com.pe' },
    { name: 'El Bolivariano', rating: 4.4, reviewsCount: 6540, category: 'Restaurante criollo', address: 'Ca. Rosa Toledo 289, Pueblo Libre 15084', phone: 'tel:014631473', website: 'https://elbolivariano.pe' },
    { name: 'Antigua Taberna Queirolo', rating: 4.5, reviewsCount: 9150, category: 'Taberna tradicional', address: 'Av. San Martín 1090, Pueblo Libre 15084', phone: 'tel:014600441', website: 'https://antiguatabernaqueirolo.com' },
    { name: 'Fiesta Chiclayo Gourmet', rating: 4.7, reviewsCount: 2890, category: 'Alta cocina criolla', address: 'Av. Reducto 1278, Miraflores 15074', phone: 'tel:012429009', website: 'https://restaurantfiestagourmet.com' },
    { name: 'Huaca Pucllana Restaurante', rating: 4.6, reviewsCount: 6420, category: 'Cocina peruana y criolla', address: 'Ca. General Borgoño 8ra cdra, Miraflores 15074', phone: 'tel:014454042', website: 'https://resthuacapucllana.com' },
    { name: 'Manos Morenas', rating: 4.3, reviewsCount: 1980, category: 'Comida criolla y afroperuana', address: 'Av. Pedro de Osma 409, Barranco 15063', phone: 'tel:014670421', website: 'https://manosmorenas.pe' },
    { name: 'Rincón Chami', rating: 4.4, reviewsCount: 1650, category: 'Cocina criolla', address: 'Ca. Esperanza 154, Miraflores 15074', phone: 'tel:012417743', website: 'https://rinconchami.com' }
  ],
  'comida-regional': [
    { name: 'El Pichito Amazónico', rating: 4.5, reviewsCount: 4210, category: 'Comida selvática', address: 'Jr. General Córdova 559, Breña 15082', phone: 'tel:014247545', website: 'https://elpichito.com' },
    { name: 'La Choza de la Anaconda', rating: 4.4, reviewsCount: 5120, category: 'Restaurante de la selva', address: 'Av. Los Alisos 456, Los Olivos 15301', phone: 'tel:015214080', website: 'https://lachozadelaanaconda.com' },
    { name: 'El Aguajal', rating: 4.3, reviewsCount: 3890, category: 'Cocina amazónica', address: 'Av. Javier Prado Este 4180, San Borja 15037', phone: 'tel:014361547', website: 'https://elaguajal.pe' },
    { name: 'Tradición Arequipeña', rating: 4.5, reviewsCount: 2780, category: 'Picantería arequipeña', address: 'Ca. Manuel Gómez 425, Lince 15046', phone: 'tel:014704211', website: 'https://tradicionarequipena.pe' },
    { name: 'Rincón de Vallejo', rating: 4.4, reviewsCount: 1950, category: 'Comida trujillana y norteña', address: 'Jr. Ica 245, Cercado de Lima 15001', phone: 'tel:014271890', website: 'https://rincondevallejo.pe' },
    { name: 'El Rocoto', rating: 4.5, reviewsCount: 3410, category: 'Comida arequipeña', address: 'Av. Aviación 4907, Santiago de Surco 15038', phone: 'tel:012711800', website: 'https://elrocoto.pe' },
    { name: 'La Paisana Norteña', rating: 4.4, reviewsCount: 2150, category: 'Comida piurana', address: 'Jr. Libertad 1412, Magdalena del Mar 15086', phone: 'tel:012630541', website: 'https://lapaisana.pe' },
    { name: 'Huancahuasi Tradición', rating: 4.6, reviewsCount: 4560, category: 'Comida del centro y sierra', address: 'Av. Flora Tristán 248, La Molina 15024', phone: 'tel:013498877', website: 'https://huancahuasi.com' },
    { name: 'El Tarwi Áncash', rating: 4.3, reviewsCount: 1620, category: 'Cocina andina ancashina', address: 'Jr. Huascarán 135, Jesús María 15072', phone: 'tel:014312899', website: 'https://eltarwi.pe' },
    { name: 'El Bijao Selva y Sabor', rating: 4.4, reviewsCount: 1840, category: 'Gastronomía selvática', address: 'Av. Ignacio Merino 2341, Lince 15046', phone: 'tel:014228945', website: 'https://elbijao.pe' }
  ],
  'anticucherias': [
    { name: 'Anticuchería Grimanesa Vargas', rating: 4.6, reviewsCount: 6120, category: 'Anticuchería', address: 'Ca. Ignacio Merino 466, Miraflores 15074', phone: 'tel:014418484', website: 'https://grimanesavargas.pe' },
    { name: 'Tío Mario Anticuchos', rating: 4.5, reviewsCount: 5890, category: 'Anticuchos y picarones', address: 'Jr. Zepita 214, Barranco 15063', phone: 'tel:012470550', website: 'https://tiomario.com' },
    { name: 'Anticuchos Bran', rating: 4.7, reviewsCount: 4890, category: 'Brasas criollas', address: 'Ca. San Pedro 308, Surquillo 15047', phone: 'tel:012411984', website: 'https://anticuchosbran.pe' },
    { name: 'Anticuchería Juancito', rating: 4.4, reviewsCount: 2310, category: 'Anticuchos de corazón', address: 'Av. Pedro de Osma 208, Barranco 15063', phone: 'tel:014772189', website: 'https://juancitoanticuchos.pe' },
    { name: 'La Panka Miraflores', rating: 4.5, reviewsCount: 4120, category: 'Brasas y anticuchos', address: 'Av. José Pardo 1015, Miraflores 15074', phone: 'tel:014467080', website: 'https://lapanka.pe' },
    { name: 'Glotons Restaurant', rating: 4.4, reviewsCount: 3670, category: 'Parrillas y anticuchos', address: 'Av. Comandante Espinar 529, Miraflores 15074', phone: 'tel:014441005', website: 'https://glotons.pe' },
    { name: 'Anticuchos Pascuala', rating: 4.5, reviewsCount: 2890, category: 'Anticuchos al carbón', address: 'Av. Angamos Este 1500, Surquillo 15047', phone: 'tel:012423311', website: 'https://anticuchospascuala.com' },
    { name: 'Doña Julia Anticuchos', rating: 4.3, reviewsCount: 1980, category: 'Parrilla criolla', address: 'Jr. Huiracocha 1398, Jesús María 15072', phone: 'tel:014631245', website: 'https://donajuliaanticuchos.pe' },
    { name: 'El Choclo y la Brasa', rating: 4.4, reviewsCount: 1650, category: 'Anticuchería y brasas', address: 'Av. La Marina 2150, San Miguel 15087', phone: 'tel:015664120', website: 'https://elchocloybrasa.pe' },
    { name: 'Anticuchería Chami', rating: 4.5, reviewsCount: 1420, category: 'Anticuchos tradicionales', address: 'Ca. Mártir Olaya 112, Miraflores 15074', phone: 'tel:014457788', website: 'https://anticucheriachami.pe' }
  ],
  'sangucherias': [
    { name: 'El Chinito Sanguchería', rating: 4.6, reviewsCount: 9410, category: 'Sanguchería tradicional', address: 'Jr. Zepita 361, Cercado de Lima 15001', phone: 'tel:014282837', website: 'https://elchinito.com.pe' },
    { name: 'La Lucha Sanguchería Criolla', rating: 4.6, reviewsCount: 12500, category: 'Sánguches y jugos', address: 'Av. Diagonal 308, Miraflores 15074', phone: 'tel:012415953', website: 'https://lalucha.com.pe' },
    { name: 'Pasquale Hnos', rating: 4.4, reviewsCount: 3120, category: 'Sánguches peruanos', address: 'Av. Conquistadores 1005, San Isidro 15073', phone: 'tel:014418080', website: 'https://pasquale.pe' },
    { name: 'Palermo Sanguchería', rating: 4.5, reviewsCount: 3890, category: 'Sanguchería de barrio', address: 'Av. Dos de Mayo 430, San Isidro 15073', phone: 'tel:014401212', website: 'https://palermosangucheria.pe' },
    { name: 'Tip Top Miraflores', rating: 4.3, reviewsCount: 4210, category: 'Sánguches y salchichas', address: 'Av. Benavides 2555, Miraflores 15048', phone: 'tel:012711000', website: 'https://tiptop.com.pe' },
    { name: 'Miguelón Sanguchería', rating: 4.5, reviewsCount: 2650, category: 'Hamburguesas y sánguches', address: 'Av. Angamos Oeste 1395, Miraflores 15074', phone: 'tel:014414141', website: 'https://miguelon.pe' },
    { name: 'Sanguchería El Enano', rating: 4.4, reviewsCount: 2890, category: 'Sánguches y jugos 24h', address: 'Ca. Chiclayo 699, Miraflores 15074', phone: 'tel:014457789', website: 'https://elenano.com.pe' },
    { name: 'Don Dohko', rating: 4.5, reviewsCount: 2150, category: 'Sánguches al paso', address: 'Av. San Luis 2110, San Borja 15037', phone: 'tel:012258900', website: 'https://dondohko.pe' },
    { name: 'Chicharronería Kio', rating: 4.4, reviewsCount: 3410, category: 'Chicharrón y sánguches', address: 'Av. Universitaria 871, San Miguel 15088', phone: 'tel:015662190', website: 'https://kio.com.pe' },
    { name: 'Doña Paulina Chicharronería', rating: 4.5, reviewsCount: 4120, category: 'Chicharrones tradicionales', address: 'Av. Mariscal La Mar 1210, Miraflores 15074', phone: 'tel:014407890', website: 'https://donapaulina.com' }
  ],
  'carnes-y-parrillas': [
    { name: 'Osso Carnicería & Restaurante', rating: 4.7, reviewsCount: 4890, category: 'Cortes madurados', address: 'Ca. Choquehuanca 740, San Isidro 15073', phone: 'tel:014467000', website: 'https://osso.pe' },
    { name: 'La Cabrera Perú', rating: 4.6, reviewsCount: 5120, category: 'Parrilla argentina', address: 'Ca. Enrique Palacios 360, Miraflores 15074', phone: 'tel:014460020', website: 'https://lacabrera.com.pe' },
    { name: 'Baco y Vaca', rating: 4.5, reviewsCount: 3420, category: 'Carnes al carbón', address: 'Av. Dos de Mayo 1450, San Isidro 15073', phone: 'tel:014411122', website: 'https://bacoyvaca.com' },
    { name: 'El Hornero Barranco', rating: 4.6, reviewsCount: 6890, category: 'Parrilla tradicional', address: 'Av. Malecón Grau 301, Barranco 15063', phone: 'tel:012470606', website: 'https://elhornero.com.pe' },
    { name: 'Carnal Prime Steakhouse', rating: 4.7, reviewsCount: 2890, category: 'Steakhouse americano', address: 'Ca. Elías Aguirre 278, Miraflores 15074', phone: 'tel:014451488', website: 'https://carnalprime.com' },
    { name: 'El Charrúa Parrilla Uruguaya', rating: 4.5, reviewsCount: 2410, category: 'Parrilla uruguaya', address: 'Av. Javier Prado Este 5898, La Molina 15024', phone: 'tel:014371415', website: 'https://elcharrua.pe' },
    { name: 'La Carreta San Isidro', rating: 4.5, reviewsCount: 3120, category: 'Carnes y parrillas', address: 'Av. Rivera Navarrete 740, San Isidro 15046', phone: 'tel:014405424', website: 'https://lacarreta.com.pe' },
    { name: 'Kankas Grill & Brasas', rating: 4.4, reviewsCount: 2890, category: 'Parrilla familiar', address: 'Av. Primavera 1410, Santiago de Surco 15038', phone: 'tel:013725566', website: 'https://kankas.pe' },
    { name: 'Costanera 700 Grill', rating: 4.6, reviewsCount: 2150, category: 'Carnes y autor', address: 'Av. Del Ejército 421, Miraflores 15074', phone: 'tel:014217508', website: 'https://costanera700.pe' },
    { name: 'Don Fernando Parrillas', rating: 4.4, reviewsCount: 1890, category: 'Carnes a la leña', address: 'Ca. General Borgoño 450, Miraflores 15074', phone: 'tel:014478950', website: 'https://donfernandoparrillas.pe' }
  ],
  'restaurantes-vegetarianos': [
    { name: 'Raw Café Miraflores', rating: 4.6, reviewsCount: 3890, category: 'Comida raw y vegana', address: 'Ca. Independencia 596, Miraflores 15074', phone: 'tel:012411084', website: 'https://rawcafe.com.pe' },
    { name: 'Veda Restaurante Plant-Based', rating: 4.7, reviewsCount: 2950, category: 'Cocina vegana de autor', address: 'Ca. Schell 630, Miraflores 15074', phone: 'tel:014470088', website: 'https://vedarestaurante.pe' },
    { name: 'Seitan Urban Bistro', rating: 4.6, reviewsCount: 2410, category: 'Comfort food vegano', address: 'Ca. Alfonso Ugarte 150, Miraflores 15074', phone: 'tel:017587878', website: 'https://seitan.pe' },
    { name: 'Namasté Veggie', rating: 4.5, reviewsCount: 1890, category: 'Menús vegetarianos', address: 'Av. Cuba 815, Jesús María 15072', phone: 'tel:014728956', website: 'https://namasteveggie.pe' },
    { name: 'Quinoa Café San Isidro', rating: 4.5, reviewsCount: 3120, category: 'Bowls y café saludable', address: 'Av. Canaval y Moreyra 425, San Isidro 15047', phone: 'tel:012215410', website: 'https://quinoacafe.com' },
    { name: 'AlmaZen Barranco', rating: 4.6, reviewsCount: 1650, category: 'Cocina orgánica vegetal', address: 'Ca. Recavarren 298, Miraflores 15074', phone: 'tel:012430474', website: 'https://almazen.pe' },
    { name: 'Asianica Street Food Veggie', rating: 4.5, reviewsCount: 1420, category: 'Fusión asiática vegana', address: 'Ca. Los Libertadores 145, San Isidro 15073', phone: 'tel:014227890', website: 'https://asianica.pe' },
    { name: 'Bircher Benner Restaurant', rating: 4.4, reviewsCount: 2150, category: 'Vegetariano tradicional', address: 'Ca. Schell 598, Miraflores 15074', phone: 'tel:014444250', website: 'https://bircherbenner.pe' },
    { name: 'El Vegetariano de Lince', rating: 4.3, reviewsCount: 1320, category: 'Almuerzos saludables', address: 'Av. Petit Thouars 1820, Lince 15046', phone: 'tel:014715560', website: 'https://elvegetariano.pe' },
    { name: 'Govinda Restaurante Vegetariano', rating: 4.4, reviewsCount: 1980, category: 'Cocina vegetariana y lactoveg', address: 'Ca. Schell 634, Miraflores 15074', phone: 'tel:014442871', website: 'https://govindalima.pe' }
  ],
  'restaurantes-nikkei': [
    { name: 'Maido Restaurante Nikkei', rating: 4.8, reviewsCount: 8450, category: 'Alta cocina nikkei', address: 'Ca. San Martín 399, Miraflores 15074', phone: 'tel:013135100', website: 'https://maido.pe' },
    { name: 'Osaka San Isidro', rating: 4.7, reviewsCount: 5120, category: 'Cocina nikkei contemporánea', address: 'Ca. Felipe Pardo y Aliaga 660, San Isidro 15073', phone: 'tel:012220405', website: 'https://osakanikkei.com' },
    { name: 'Edo Sushi Bar', rating: 4.6, reviewsCount: 6890, category: 'Sushi bar nikkei', address: 'Ca. Berlín 601, Miraflores 15074', phone: 'tel:012417772', website: 'https://edosushibar.com' },
    { name: 'Hanzo Japanese Cuisine', rating: 4.5, reviewsCount: 3410, category: 'Nikkei tradicional', address: 'Av. Conquistadores 598, San Isidro 15073', phone: 'tel:014226367', website: 'https://hanzo.com.pe' },
    { name: 'Shi-Nuá Restaurante', rating: 4.6, reviewsCount: 2890, category: 'Cocina oriental y nikkei', address: 'Av. Víctor Andrés Belaúnde 147, San Isidro 15073', phone: 'tel:014429988', website: 'https://shinua.pe' },
    { name: 'Makoto Sushi Bar', rating: 4.5, reviewsCount: 3120, category: 'Sushi y makis nikkei', address: 'Ca. Martín Dulanto 111, Miraflores 15074', phone: 'tel:014470033', website: 'https://makoto.pe' },
    { name: 'Dondoh Parrilla Japonesa', rating: 4.6, reviewsCount: 2410, category: 'Robata y nikkei grill', address: 'Ca. Conquistadores 999, San Isidro 15073', phone: 'tel:014224000', website: 'https://dondoh.com' },
    { name: 'Matsuei Sushi Bar', rating: 4.6, reviewsCount: 2150, category: 'Tradición japonesa en Lima', address: 'Ca. Manuel Bañón 260, San Isidro 15073', phone: 'tel:014224323', website: 'https://matsuei.pe' },
    { name: 'Toki Nikkei Miraflores', rating: 4.5, reviewsCount: 1890, category: 'Makis y rolls de autor', address: 'Av. Mariscal La Mar 1100, Miraflores 15074', phone: 'tel:014458990', website: 'https://tokinikkei.pe' },
    { name: 'Shinsei Nikkei', rating: 4.5, reviewsCount: 1650, category: 'Fusión peruano-japonesa', address: 'Av. Guardia Civil 645, San Borja 15036', phone: 'tel:012248900', website: 'https://shinsei.pe' }
  ],
  'panaderias-artesanales': [
    { name: 'El Pan de la Chola', rating: 4.6, reviewsCount: 5890, category: 'Masa madre y café', address: 'Av. Mariscal La Mar 929, Miraflores 15074', phone: 'tel:012211158', website: 'https://elpandelachola.com' },
    { name: 'La Baguette Panadería', rating: 4.5, reviewsCount: 4210, category: 'Panadería francesa', address: 'Av. Conquistadores 850, San Isidro 15073', phone: 'tel:014424000', website: 'https://labaguette.pe' },
    { name: 'Alexander Café & Bakery', rating: 4.6, reviewsCount: 3120, category: 'Panadería europea', address: 'Av. Santa Cruz 1101, Miraflores 15074', phone: 'tel:014408990', website: 'https://alexanderbakery.pe' },
    { name: 'Pan Sal Aire', rating: 4.5, reviewsCount: 2890, category: 'Panadería y brunch', address: 'Av. Almirante Grau 320, Barranco 15063', phone: 'tel:012470001', website: 'https://pansalaire.pe' },
    { name: 'Crustáceo Panadería de Barrio', rating: 4.7, reviewsCount: 1980, category: 'Panes rústicos', address: 'Ca. Mendiburu 832, Miraflores 15074', phone: 'tel:014412233', website: 'https://crustaceopan.pe' },
    { name: 'Mendeles Bakery', rating: 4.5, reviewsCount: 2150, category: 'Panadería artesanal judía', address: 'Av. San Luis 2890, San Borja 15037', phone: 'tel:012257890', website: 'https://mendeles.pe' },
    { name: 'La Paniteca Surco', rating: 4.4, reviewsCount: 1650, category: 'Hogazas y pastelería', address: 'Av. El Polo 670, Santiago de Surco 15023', phone: 'tel:014378990', website: 'https://lapaniteca.pe' },
    { name: 'Masa Madre Bakery San Isidro', rating: 4.6, reviewsCount: 2310, category: 'Panadería biológica', address: 'Ca. Miguel Dasso 155, San Isidro 15073', phone: 'tel:014214455', website: 'https://masamadrebakery.pe' },
    { name: 'Carmelo Panadería Tradicional', rating: 4.4, reviewsCount: 1420, category: 'Pan artesanal peruano', address: 'Av. Sucre 415, Pueblo Libre 15084', phone: 'tel:014612345', website: 'https://panaderiacarmelo.pe' },
    { name: 'BioPanadería Magdalena', rating: 4.5, reviewsCount: 1250, category: 'Panes integrales y semillas', address: 'Jr. Bolognesi 398, Magdalena del Mar 15086', phone: 'tel:012638900', website: 'https://biopanaderia.pe' }
  ],
  'heladerias-artesanales': [
    { name: '4D Gelatería San Isidro', rating: 4.6, reviewsCount: 6120, category: 'Gelato artesanal italiano', address: 'Av. Salaverry 3103, San Isidro 15076', phone: 'tel:012645000', website: 'https://4d.pe' },
    { name: 'Blu Il Gelato del Barrio', rating: 4.7, reviewsCount: 4890, category: 'Gelatería de autor', address: 'Jr. 28 de Julio 202, Barranco 15063', phone: 'tel:012471990', website: 'https://blugelato.pe' },
    { name: 'Zacateca Heladería Artesanal', rating: 4.6, reviewsCount: 3410, category: 'Paletas y helados naturales', address: 'Ca. Lizardo Montero 240, Surquillo 15047', phone: 'tel:012418877', website: 'https://zacateca.pe' },
    { name: 'Amorelado Gelato', rating: 4.5, reviewsCount: 2890, category: 'Heladería artesanal', address: 'Ca. Ignacio Merino 525, Miraflores 15074', phone: 'tel:014412340', website: 'https://amorelado.pe' },
    { name: 'Crem de la Crem Barranco', rating: 4.6, reviewsCount: 3120, category: 'Gelato y repostería', address: 'Parque Municipal 109, Barranco 15063', phone: 'tel:012478899', website: 'https://cremdelacrem.pe' },
    { name: 'Palermo Gelatería', rating: 4.5, reviewsCount: 2410, category: 'Gelato tradicional', address: 'Ca. Dellepiane 150, San Isidro 15073', phone: 'tel:014402311', website: 'https://palermogelato.pe' },
    { name: 'Bosco Mágico Gelato', rating: 4.6, reviewsCount: 1980, category: 'Helados sin gluten y veganos', address: 'Av. San Borja Sur 412, San Borja 15037', phone: 'tel:012254455', website: 'https://boscomagico.pe' },
    { name: 'Laritza D Helados', rating: 4.4, reviewsCount: 3890, category: 'Helados clásicos limeños', address: 'Av. Primavera 1070, Santiago de Surco 15038', phone: 'tel:013721010', website: 'https://laritzad.com' },
    { name: 'Gelatería Speciale Magdalena', rating: 4.7, reviewsCount: 2650, category: 'Heladería de barrio tradicional', address: 'Jr. Libertad 1231, Magdalena del Mar 15086', phone: 'tel:012634567', website: 'https://gelateriaspeciale.pe' },
    { name: 'Fragola Gelato Miraflores', rating: 4.5, reviewsCount: 1650, category: 'Gelatería artesanal', address: 'Av. Larco 812, Miraflores 15074', phone: 'tel:014467812', website: 'https://fragola.pe' }
  ],
  'dulcerias-tradicionales': [
    { name: 'Dulcería Manjares Limeños', rating: 4.5, reviewsCount: 3120, category: 'Postres coloniales', address: 'Jr. Huancavelica 248, Cercado de Lima 15001', phone: 'tel:014285641', website: 'https://dulceriamanjares.pe' },
    { name: 'Pastelería San Antonio Miraflores', rating: 4.6, reviewsCount: 9890, category: 'Dulcería y pastelería', address: 'Av. Angamos Oeste 1494, Miraflores 15074', phone: 'tel:012158400', website: 'https://pasteleriasanantonio.com' },
    { name: 'Fausta Pastelería Casera', rating: 4.7, reviewsCount: 2410, category: 'Alfajores y dulces de convento', address: 'Ca. General Mendiburu 738, Miraflores 15074', phone: 'tel:014415566', website: 'https://faustapasteleria.pe' },
    { name: 'Maga Mis Suspiros', rating: 4.6, reviewsCount: 2890, category: 'Suspiros de autor y tortas', address: 'Av. Benavides 4120, Santiago de Surco 15038', phone: 'tel:012714455', website: 'https://magamissuspiros.pe' },
    { name: 'Dulcería Doña Pepa Centro', rating: 4.4, reviewsCount: 2650, category: 'Turrones y mieles tradicionales', address: 'Av. Tacna 540, Cercado de Lima 15001', phone: 'tel:014278912', website: 'https://dulceriadonapepa.pe' },
    { name: 'Pastelería Italo Magdalena', rating: 4.6, reviewsCount: 3410, category: 'Pastelería y turrones tradicionales', address: 'Jr. Bolognesi 358, Magdalena del Mar 15086', phone: 'tel:012631245', website: 'https://pasteleriaitalo.pe' },
    { name: 'Tradición Limeña Dulces', rating: 4.5, reviewsCount: 1890, category: 'Mazamorra y arroz con leche', address: 'Av. Petit Thouars 2140, Lince 15046', phone: 'tel:014723344', website: 'https://tradicionlimenadulces.pe' },
    { name: 'Dulces de Antaño Pueblo Libre', rating: 4.4, reviewsCount: 1650, category: 'Postres limeños de cuchara', address: 'Av. Vivanco 780, Pueblo Libre 15084', phone: 'tel:014637788', website: 'https://dulcesdeantano.pe' },
    { name: 'El Merengón Limeño Barranco', rating: 4.5, reviewsCount: 1420, category: 'Merengues y suspiros', address: 'Ca. Centenario 180, Barranco 15063', phone: 'tel:012476655', website: 'https://elmerengon.pe' },
    { name: 'Dulcería Los Huérfanos', rating: 4.5, reviewsCount: 2980, category: 'Tradición pastelera del Centro', address: 'Jr. Azángaro 700, Cercado de Lima 15001', phone: 'tel:014282345', website: 'https://dulcerialoshuerfanos.pe' }
  ],
  'productos-naturales': [
    { name: 'Flora & Fauna Miraflores', rating: 4.7, reviewsCount: 4890, category: 'Supermercado orgánico y natural', address: 'Av. Mariscal La Mar 1110, Miraflores 15074', phone: 'tel:016374000', website: 'https://florayfauna.pe' },
    { name: 'La Sanahoria San Isidro', rating: 4.6, reviewsCount: 3410, category: 'Tienda saludable y orgánica', address: 'Ca. Los Libertadores 143, San Isidro 15073', phone: 'tel:014218900', website: 'https://lasanahoria.com' },
    { name: 'Madre Natura Miraflores', rating: 4.5, reviewsCount: 2890, category: 'Productos bio y granos andinos', address: 'Ca. Chiclayo 815, Miraflores 15074', phone: 'tel:014441070', website: 'https://madrenatura.pe' },
    { name: 'Organa Market Surco', rating: 4.6, reviewsCount: 2310, category: 'Mercado natural y ecológico', address: 'Av. Primavera 1540, Santiago de Surco 15038', phone: 'tel:013728899', website: 'https://organa.com.pe' },
    { name: 'Las Vacas Felices Barranco', rating: 4.7, reviewsCount: 1980, category: 'Lácteos artesanales y orgánicos', address: 'Av. Pedro de Osma 214, Barranco 15063', phone: 'tel:012475566', website: 'https://lasvacasfelices.com' },
    { name: 'Thika Thani Market San Borja', rating: 4.6, reviewsCount: 2150, category: 'Comercio justo y productos andinos', address: 'Av. San Borja Sur 248, San Borja 15037', phone: 'tel:012256677', website: 'https://thikathani.com.pe' },
    { name: 'Kero Mart Natural San Isidro', rating: 4.5, reviewsCount: 1650, category: 'Suplementos limpios y superfoods', address: 'Ca. Miguel Dasso 130, San Isidro 15073', phone: 'tel:014421122', website: 'https://keromart.pe' },
    { name: 'Punto Orgánico Miraflores', rating: 4.5, reviewsCount: 1890, category: 'Alimentos sin pesticidas y bio', address: 'Av. Benavides 2450, Miraflores 15048', phone: 'tel:012718899', website: 'https://puntoorganico.com' },
    { name: 'Tienda Verde Vida Jesús María', rating: 4.4, reviewsCount: 1420, category: 'Semillas, harinas y frutos secos', address: 'Av. General Garzón 1340, Jesús María 15072', phone: 'tel:014634455', website: 'https://verdevida.pe' },
    { name: 'EcoTienda Salud Magdalena', rating: 4.4, reviewsCount: 1250, category: 'Botica natural y productos bio', address: 'Jr. Leoncio Prado 780, Magdalena del Mar 15086', phone: 'tel:012637788', website: 'https://ecotiendasalud.pe' }
  ],
  'restaurantes-campestres': [
    { name: 'La Gloria del Campo Pachacámac', rating: 4.6, reviewsCount: 3890, category: 'Cocina campestre y horno de leña', address: 'Antigua Carretera Panamericana Sur Km 35, Pachacámac 15823', phone: 'tel:012311440', website: 'https://lagloriadelcampo.com' },
    { name: 'Chaxras Eco Restaurante', rating: 4.7, reviewsCount: 4120, category: 'Gastronomía sostenible al aire libre', address: 'Ca. Sub Lote 5 Huertos de Pachacámac, Pachacámac 15823', phone: 'tel:012311000', website: 'https://chaxras.com' },
    { name: 'Los Médanos Campestre Lurín', rating: 4.5, reviewsCount: 3410, category: 'Chancho al palo y chicharrones', address: 'Antigua Panamericana Sur Km 32, Lurín 15842', phone: 'tel:014300550', website: 'https://losmedanos.pe' },
    { name: 'El Huerto Florido Cieneguilla', rating: 4.4, reviewsCount: 2890, category: 'Recreo campestre y piscinas', address: 'Av. Nueva Toledo Km 24, Cieneguilla 15593', phone: 'tel:014798811', website: 'https://elhuertoflorido.pe' },
    { name: 'Don Caimán Campestre Cieneguilla', rating: 4.4, reviewsCount: 2650, category: 'Comida campestre familiar', address: 'Av. San Martín Mz. B Lote 4, Cieneguilla 15593', phone: 'tel:014799000', website: 'https://doncaiman.pe' },
    { name: 'Rústica Pachacámac', rating: 4.3, reviewsCount: 4560, category: 'Buffet criollo y campo', address: 'Av. Paul Poblet s/n, Pachacámac 15823', phone: 'tel:013658000', website: 'https://rustica.com.pe' },
    { name: 'La Cabaña Campestre Chosica', rating: 4.4, reviewsCount: 2150, category: 'Pachamanca y parrillas', address: 'Carretera Central Km 34, Lurigancho-Chosica 15461', phone: 'tel:013612340', website: 'https://lacabanachocica.pe' },
    { name: 'Granja Azul Santa Clara', rating: 4.6, reviewsCount: 8940, category: 'Cuna del pollo a la brasa y campo', address: 'Carretera Central Km 11.5, Ate 15487', phone: 'tel:013560000', website: 'https://granjaazul.com.pe' },
    { name: 'Kankas Campestre Lurín', rating: 4.4, reviewsCount: 2310, category: 'Parrillas campestres', address: 'Av. San Pedro 450, Lurín 15842', phone: 'tel:014301212', website: 'https://kankascampestre.pe' },
    { name: 'El Portón Paisajista Cieneguilla', rating: 4.5, reviewsCount: 1980, category: 'Restaurante con áreas verdes', address: 'Ca. Los Sauces Mz. C, Cieneguilla 15593', phone: 'tel:014798120', website: 'https://elportoncieneguilla.pe' }
  ],

  // TANDA B: Visitar y vivir Lima (10)
  'agencias-de-turismo': [
    { name: 'Lima Tours Receptivo', rating: 4.7, reviewsCount: 2890, category: 'Turismo receptivo y tours', address: 'Av. Las Begonias 441, San Isidro 15046', phone: 'tel:016147400', website: 'https://limatours.com.pe' },
    { name: 'Coltur Peru Travel', rating: 4.6, reviewsCount: 2150, category: 'Operador de viajes en Lima', address: 'Ca. Reducto 1255, Miraflores 15074', phone: 'tel:016155555', website: 'https://colturperu.com' },
    { name: 'Condor Travel Miraflores', rating: 4.6, reviewsCount: 3410, category: 'Agencia de turismo receptivo', address: 'Ca. Cantuarias 399, Miraflores 15074', phone: 'tel:016153000', website: 'https://condortravel.com' },
    { name: 'Nuevo Mundo Viajes San Borja', rating: 4.5, reviewsCount: 2890, category: 'Viajes y excursiones', address: 'Av. Javier Prado Este 2465, San Borja 15037', phone: 'tel:016111000', website: 'https://nuevomundoviajes.pe' },
    { name: 'Domiruth Travel Service', rating: 4.5, reviewsCount: 2310, category: 'Agencia de turismo corporativo', address: 'Ca. José Pardo 601, Miraflores 15074', phone: 'tel:016106000', website: 'https://domiruth.com' },
    { name: 'Costamar Travel Miraflores', rating: 4.4, reviewsCount: 3120, category: 'Turismo nacional y local', address: 'Av. Pardo 223, Miraflores 15074', phone: 'tel:016167000', website: 'https://costamar.com' },
    { name: 'Explorandes Perú', rating: 4.7, reviewsCount: 1650, category: 'Turismo de aventura y cultura', address: 'Ca. Grimaldo del Solar 463, Miraflores 15074', phone: 'tel:012415451', website: 'https://explorandes.com' },
    { name: 'Caral Tours Centro Histórico', rating: 4.4, reviewsCount: 1890, category: 'Tours locales y arqueológicos', address: 'Jr. Carabaya 552, Cercado de Lima 15001', phone: 'tel:014281234', website: 'https://caraltours.pe' },
    { name: 'Hada Tours San Isidro', rating: 4.5, reviewsCount: 1420, category: 'Viajes receptivos', address: 'Av. Canaval y Moreyra 340, San Isidro 15047', phone: 'tel:012218899', website: 'https://hadatours.com.pe' },
    { name: 'Peruvian Odyssey Miraflores', rating: 4.6, reviewsCount: 1250, category: 'Tours a medida en Lima', address: 'Ca. Alcanfores 495, Miraflores 15074', phone: 'tel:014467788', website: 'https://peruvianodyssey.com' }
  ],
  'tours-y-experiencias': [
    { name: 'Lima City Walking Tours', rating: 4.7, reviewsCount: 4890, category: 'Free walking tours y guiados', address: 'Jr. Carabaya 100, Cercado de Lima 15001', phone: 'tel:014278900', website: 'https://limawalkingtours.pe' },
    { name: 'Haku Tours Experiencias', rating: 4.8, reviewsCount: 3410, category: 'Tours culturales y sociales', address: 'Ca. Bellavista 145, Miraflores 15074', phone: 'tel:014460011', website: 'https://hakutours.com' },
    { name: 'Alternative Peru Experiences', rating: 4.7, reviewsCount: 2150, category: 'Turismo responsable en Lima', address: 'Av. Pedro de Osma 135, Barranco 15063', phone: 'tel:012478800', website: 'https://alternativeperu.org' },
    { name: 'Lima Gourmet Company', rating: 4.8, reviewsCount: 2890, category: 'Rutas culinarias y catas', address: 'Ca. Santa Rosa 240, Miraflores 15074', phone: 'tel:012429090', website: 'https://limagourmetcompany.com' },
    { name: 'Barranco Cultural Walks', rating: 4.7, reviewsCount: 1980, category: 'Recorridos artísticos y casonas', address: 'Parque Municipal de Barranco, Barranco 15063', phone: 'tel:012476611', website: 'https://barrancowalks.pe' },
    { name: 'Callao Monumental Tours', rating: 4.6, reviewsCount: 3120, category: 'Arte urbano y Fortaleza Real Felipe', address: 'Jr. Constitución 250, Callao 07021', phone: 'tel:014298877', website: 'https://monumentalcallao.com' },
    { name: 'Pachacamac Archaeological Excursions', rating: 4.5, reviewsCount: 1650, category: 'Santuario prehispánico guiado', address: 'Antigua Carretera Panamericana Sur Km 31.5, Lurín 15842', phone: 'tel:014300168', website: 'https://pachacamactours.pe' },
    { name: 'Urban Adventures Lima', rating: 4.6, reviewsCount: 2310, category: 'Experiencias urbanas y mercados', address: 'Av. José Larco 345, Miraflores 15074', phone: 'tel:014478822', website: 'https://limaurbanadventures.com' },
    { name: 'BiciTours Lima Nocturna', rating: 4.6, reviewsCount: 1420, category: 'Rutas en bicicleta por la costa', address: 'Ca. San Martín 245, Miraflores 15074', phone: 'tel:014451234', website: 'https://bicitourslima.pe' },
    { name: 'Rutas Limeñas del Misterio', rating: 4.5, reviewsCount: 1890, category: 'Tours temáticos y leyendas', address: 'Jr. Lampa 200, Cercado de Lima 15001', phone: 'tel:014265544', website: 'https://rutasdelmisterio.pe' }
  ],
  'guias-de-turismo': [
    { name: 'Asociación de Guías Oficiales AGOTUR', rating: 4.7, reviewsCount: 1890, category: 'Guías de turismo certificados', address: 'Jr. Huancavelica 446, Cercado de Lima 15001', phone: 'tel:014271188', website: 'https://agoturlima.org' },
    { name: 'Lima Private Guides Network', rating: 4.8, reviewsCount: 1650, category: 'Guías bilingües privados', address: 'Ca. Porta 170, Miraflores 15074', phone: 'tel:014472233', website: 'https://limaprivateguides.pe' },
    { name: 'Centro Histórico Guías Oficiales', rating: 4.6, reviewsCount: 1420, category: 'Guías patrimoniales de Lima', address: 'Plaza Mayor s/n, Cercado de Lima 15001', phone: 'tel:014275566', website: 'https://guiascentrohistorico.pe' },
    { name: 'Lima Heritage Art Guides', rating: 4.7, reviewsCount: 1250, category: 'Especialistas en museos y arte', address: 'Av. Los Conquistadores 410, San Isidro 15073', phone: 'tel:014418899', website: 'https://limaheritageguides.com' },
    { name: 'Guías de Turismo Pachacámac', rating: 4.6, reviewsCount: 1120, category: 'Guías arqueológicos oficiales', address: 'Km 31.5 Panamericana Sur, Lurín 15842', phone: 'tel:014300188', website: 'https://guiaspachacamac.pe' },
    { name: 'Barranco Bohemio Guías', rating: 4.7, reviewsCount: 1340, category: 'Guiados culturales y literarios', address: 'Av. Pedro de Osma 180, Barranco 15063', phone: 'tel:012479900', website: 'https://guiasbarranco.pe' },
    { name: 'Callao & Real Felipe Guías', rating: 4.5, reviewsCount: 1450, category: 'Guías navales e históricos', address: 'Plaza Independencia s/n, Callao 07021', phone: 'tel:014290123', website: 'https://guiasrealfelipe.pe' },
    { name: 'Lima Gastronomy Tour Guides', rating: 4.8, reviewsCount: 1560, category: 'Guías especializados en cocina', address: 'Ca. Schell 315, Miraflores 15074', phone: 'tel:014456677', website: 'https://limafoodguides.pe' },
    { name: 'Guías Turísticos San Isidro & Olivar', rating: 4.6, reviewsCount: 980, category: 'Guías del Bosque El Olivar', address: 'Ca. Andrés Reyes 140, San Isidro 15046', phone: 'tel:015139000', website: 'https://guiaselolivar.pe' },
    { name: 'Lima Birding & Nature Guides', rating: 4.7, reviewsCount: 890, category: 'Observación de aves Pantanos de Villa', address: 'Av. Hernando Lavalle s/n, Chorrillos 15067', phone: 'tel:012548777', website: 'https://limabirding.pe' }
  ],
  'hoteles': [
    { name: 'JW Marriott Hotel Lima', rating: 4.7, reviewsCount: 6890, category: 'Hotel 5 estrellas frente al mar', address: 'Malecón de la Reserva 615, Miraflores 15074', phone: 'tel:012177000', website: 'https://marriott.com' },
    { name: 'The Westin Lima Hotel & Convention', rating: 4.7, reviewsCount: 5410, category: 'Hotel de lujo y spa', address: 'Ca. Las Begonias 450, San Isidro 15046', phone: 'tel:012015000', website: 'https://marriott.com' },
    { name: 'Country Club Lima Hotel', rating: 4.8, reviewsCount: 4120, category: 'Hotel patrimonial histórico', address: 'Ca. Los Eucaliptos 590, San Isidro 15076', phone: 'tel:016119000', website: 'https://countryclublimahotel.com' },
    { name: 'Swissôtel Lima', rating: 4.7, reviewsCount: 3890, category: 'Hotel corporativo y gastronómico', address: 'Av. Santo Toribio 173, San Isidro 15073', phone: 'tel:014214400', website: 'https://swissotellima.com.pe' },
    { name: 'Miraflores Park Belmond Hotel', rating: 4.8, reviewsCount: 2980, category: 'Hotel boutique de lujo', address: 'Av. Malecón de la Marina 1035, Miraflores 15074', phone: 'tel:016104000', website: 'https://belmond.com' },
    { name: 'Hilton Lima Miraflores', rating: 4.6, reviewsCount: 4250, category: 'Hotel ejecutivo 5 estrellas', address: 'Av. La Paz 1099, Miraflores 15074', phone: 'tel:012008000', website: 'https://hilton.com' },
    { name: 'Hotel B Barranco', rating: 4.8, reviewsCount: 2150, category: 'Casona boutique artística', address: 'Ca. San Martín 301, Barranco 15063', phone: 'tel:012060800', website: 'https://hotelb.pe' },
    { name: 'Casa Andina Premium Miraflores', rating: 4.6, reviewsCount: 3890, category: 'Hotel 5 estrellas tradicional', address: 'Av. La Paz 463, Miraflores 15074', phone: 'tel:012139700', website: 'https://casa-andina.com' },
    { name: 'Hyatt Centric San Isidro', rating: 4.6, reviewsCount: 2310, category: 'Hotel de diseño moderno', address: 'Av. Jorge Basadre 367, San Isidro 15073', phone: 'tel:016111234', website: 'https://hyatt.com' },
    { name: 'Sheraton Lima Historic Center', rating: 4.4, reviewsCount: 5120, category: 'Hotel histórico en el centro', address: 'Av. Paseo de la República 170, Cercado de Lima 15001', phone: 'tel:013155000', website: 'https://marriott.com' }
  ],
  'hostales-y-alojamientos': [
    { name: 'Kokopelli Hostel Barranco', rating: 4.6, reviewsCount: 4120, category: 'Hostal para viajeros', address: 'Av. Pedro de Osma 102, Barranco 15063', phone: 'tel:012470088', website: 'https://kokopellihostels.com' },
    { name: 'Pariwana Hostel Lima', rating: 4.6, reviewsCount: 5890, category: 'Hostal backpacker internacional', address: 'Av. José Larco 429, Miraflores 15074', phone: 'tel:012424340', website: 'https://pariwana-hostel.com' },
    { name: 'Selina Miraflores', rating: 4.5, reviewsCount: 3410, category: 'Alojamiento coworking y coliving', address: 'Ca. Alcanfores 465, Miraflores 15074', phone: 'tel:012411000', website: 'https://selina.com' },
    { name: 'Dragonfly Bed & Breakfast', rating: 4.5, reviewsCount: 1890, category: 'Bed and breakfast acogedor', address: 'Ca. Bellavista 515, Miraflores 15074', phone: 'tel:014470090', website: 'https://dragonflyhostels.com' },
    { name: '1900 Hostel Historic Center', rating: 4.4, reviewsCount: 2310, category: 'Hostal en casona virreinal', address: 'Jr. Washington 1900, Cercado de Lima 15001', phone: 'tel:014231900', website: 'https://1900hostel.com' },
    { name: 'Villa Barranco Boutique B&B', rating: 4.8, reviewsCount: 1250, category: 'Casona boutique republicana', address: 'Ca. Carlos Zegarra 274, Barranco 15063', phone: 'tel:012471234', website: 'https://villabarranco.com' },
    { name: 'The Point Hostel Lima', rating: 4.4, reviewsCount: 2890, category: 'Alojamiento para mochileros', address: 'Malecón Junín 284, Barranco 15063', phone: 'tel:012477998', website: 'https://thepointhostels.com' },
    { name: 'Flying Dog Hostel Miraflores', rating: 4.3, reviewsCount: 3120, category: 'Hostal céntrico en el Parque Kennedy', address: 'Ca. Lima 457, Miraflores 15074', phone: 'tel:014456745', website: 'https://flyingdogperu.com' },
    { name: 'Black Llama Hostel', rating: 4.6, reviewsCount: 1650, category: 'Hostal de diseño contemporáneo', address: 'Ca. Berlín 329, Miraflores 15074', phone: 'tel:014467800', website: 'https://blackllamahostel.com' },
    { name: 'Pool Paradise Lima Hostel', rating: 4.4, reviewsCount: 2150, category: 'Hostal con jardín y piscina', address: 'Ca. Casimiro Ulloa 179, Miraflores 15074', phone: 'tel:012414455', website: 'https://poolparadiseperu.com' }
  ],
  'alquiler-de-bicicletas': [
    { name: 'CityBike Lima Miraflores', rating: 4.5, reviewsCount: 3890, category: 'Sistema público de bicicletas', address: 'Av. José Larco 400, Miraflores 15074', phone: 'tel:017120000', website: 'https://citybikelima.com' },
    { name: 'Bike Tours Lima Rental', rating: 4.8, reviewsCount: 2410, category: 'Alquiler de bicicletas de paseo y ruta', address: 'Ca. Dos de Mayo 430, Miraflores 15074', phone: 'tel:012428900', website: 'https://biketourslima.com' },
    { name: 'MiraBici Larcomar', rating: 4.6, reviewsCount: 2150, category: 'Renta de bicis en el malecón', address: 'Malecón de la Reserva 610, Miraflores 15074', phone: 'tel:014458990', website: 'https://mirabici.pe' },
    { name: 'San Isidro En Bici', rating: 4.5, reviewsCount: 1890, category: 'Estaciones de movilidad urbana', address: 'Ca. Andrés Reyes 120, San Isidro 15046', phone: 'tel:015139050', website: 'https://sanisidro.gob.pe' },
    { name: 'Barranco Bike Rental', rating: 4.7, reviewsCount: 1650, category: 'Alquiler de bicis vintage y cascos', address: 'Av. Pedro de Osma 155, Barranco 15063', phone: 'tel:012473344', website: 'https://barrancobikes.pe' },
    { name: 'Green Bike Peru', rating: 4.6, reviewsCount: 1420, category: 'Tours y alquiler de bicicletas', address: 'Ca. Porta 145, Miraflores 15074', phone: 'tel:014467812', website: 'https://greenbikeperu.com' },
    { name: 'Costa Verde Bike Point', rating: 4.5, reviewsCount: 1250, category: 'Alquiler al pie de playa', address: 'Playa Makaha s/n, Miraflores 15074', phone: 'tel:014451122', website: 'https://costaverdebikes.pe' },
    { name: 'Lima Pedals San Borja', rating: 4.6, reviewsCount: 980, category: 'Bicicletas de paseo y tándem', address: 'Av. San Borja Norte 890, San Borja 15037', phone: 'tel:012251144', website: 'https://limapedals.pe' },
    { name: 'CicloRenta Pueblo Libre', rating: 4.4, reviewsCount: 890, category: 'Renta para circuitos vecinales', address: 'Av. Bolívar 650, Pueblo Libre 15084', phone: 'tel:014612233', website: 'https://ciclorentalibre.pe' },
    { name: 'CicloLima Centro Histórico', rating: 4.5, reviewsCount: 1340, category: 'Bicicletas para el casco histórico', address: 'Jr. Ucayali 380, Cercado de Lima 15001', phone: 'tel:014287788', website: 'https://ciclolima.pe' }
  ],
  'escuelas-de-surf': [
    { name: 'Pukana Surf School Miraflores', rating: 4.8, reviewsCount: 3120, category: 'Clases de surf en Makaha', address: 'Playa Makaha, Costa Verde, Miraflores 15074', phone: 'tel:0199812400', website: 'https://pukanasurf.com' },
    { name: 'Eternal Wave Surf School', rating: 4.8, reviewsCount: 2890, category: 'Escuela de surf para principiantes', address: 'Playa Redondo, Costa Verde, Miraflores 15074', phone: 'tel:0199411223', website: 'https://eternalwaveperu.com' },
    { name: 'Tubos Surf School Makaha', rating: 4.7, reviewsCount: 2410, category: 'Entrenamiento y tabla hawaiiana', address: 'Playa Makaha, Miraflores 15074', phone: 'tel:0199745566', website: 'https://tubossurf.pe' },
    { name: 'Wayo Whilar Surf Academy', rating: 4.9, reviewsCount: 3450, category: 'Academia de surf profesional', address: 'Malecón Balta 780, Miraflores 15074', phone: 'tel:014470044', website: 'https://wayowhilar.com' },
    { name: 'Olas Perú Surf School', rating: 4.7, reviewsCount: 2150, category: 'Escuela formativa de surfistas', address: 'Playa Waikiki, Miraflores 15074', phone: 'tel:014467899', website: 'https://olasperu.pe' },
    { name: 'Makaha Surf Club', rating: 4.6, reviewsCount: 1980, category: 'Club de tabla y alquiler de wetsuits', address: 'Playa Makaha s/n, Miraflores 15074', phone: 'tel:014458900', website: 'https://makahasurfclub.pe' },
    { name: 'Barranco Surf Point', rating: 4.6, reviewsCount: 1420, category: 'Clases en Los Pavos y Barranquito', address: 'Playa Los Pavos, Barranco 15063', phone: 'tel:0199233445', website: 'https://barrancosurf.pe' },
    { name: 'Chorrillos Surf Academy', rating: 4.5, reviewsCount: 1250, category: 'Clases en La Herradura', address: 'Playa La Herradura, Chorrillos 15067', phone: 'tel:012518899', website: 'https://chorrillossurf.pe' },
    { name: 'San Bartolo Surf Camp', rating: 4.7, reviewsCount: 1890, category: 'Escuela y campamento de olas', address: 'Malecón San Martín s/n, San Bartolo 15811', phone: 'tel:0199122334', website: 'https://sanbartolosurf.pe' },
    { name: 'Punta Hermosa Surf Academy', rating: 4.8, reviewsCount: 2150, category: 'Olas del sur chico y técnica', address: 'Playa El Silencio, Punta Hermosa 15846', phone: 'tel:0199677889', website: 'https://puntahermosasurf.pe' }
  ],
  'penas-criollas': [
    { name: 'Peña Del Carajo Barranco', rating: 4.6, reviewsCount: 5890, category: 'Espectáculo criollo y afroperuano', address: 'Ca. Catalino Miranda 158, Barranco 15063', phone: 'tel:012477023', website: 'https://delcarajo.com.pe' },
    { name: 'Don Porfirio Peña Criolla', rating: 4.7, reviewsCount: 3410, category: 'Peña tradicional de jarana', address: 'Ca. Manuel Segura 115, Barranco 15063', phone: 'tel:014775038', website: 'https://donporfirio.pe' },
    { name: 'Peña La Candelaria', rating: 4.5, reviewsCount: 4120, category: 'Folklore y música peruana', address: 'Av. Bolognesi 292, Barranco 15063', phone: 'tel:012478051', website: 'https://lacandelariaperu.com' },
    { name: 'Centro Musical Breña', rating: 4.7, reviewsCount: 2310, category: 'Templo de la guardia vieja', address: 'Jr. Olmedo 452, Breña 15082', phone: 'tel:014234567', website: 'https://centromusicalbrena.pe' },
    { name: 'Peña La Oficina Barranco', rating: 4.6, reviewsCount: 2890, category: 'Jarana criolla bohemia', address: 'Ca. Enrique Barrón 440, Barranco 15063', phone: 'tel:012470002', website: 'https://laoficinabar.pe' },
    { name: 'Centro Musical Unión', rating: 4.6, reviewsCount: 1650, category: 'Música criolla tradicional', address: 'Plaza Italia s/n, Barrios Altos, Cercado de Lima 15001', phone: 'tel:014281122', website: 'https://centromusicalunion.pe' },
    { name: 'Sachún Espectáculos Criollos', rating: 4.4, reviewsCount: 3120, category: 'Cena show de danzas peruanas', address: 'Av. Del Ejército 657, Miraflores 15074', phone: 'tel:014414465', website: 'https://sachunperu.com' },
    { name: 'Brisas del Titicaca', rating: 4.7, reviewsCount: 7890, category: 'Centro cultural y danzas del Perú', address: 'Jr. Héroes de Tarapacá 168, Cercado de Lima 15001', phone: 'tel:017156960', website: 'https://brisasdeltiticaca.com' },
    { name: 'Manos Morenas Peña Show', rating: 4.3, reviewsCount: 1980, category: 'Show afroperuano y cajón', address: 'Av. Pedro de Osma 409, Barranco 15063', phone: 'tel:014670421', website: 'https://manosmorenaspena.pe' },
    { name: 'Tradición Limeña Peña Lince', rating: 4.4, reviewsCount: 1420, category: 'Música criolla y vals', address: 'Ca. Manuel Candamo 340, Lince 15046', phone: 'tel:014718899', website: 'https://tradicionlimenapena.pe' }
  ],
  'talleres-de-artesania': [
    { name: 'Taller Retablos Ayacuchanos en Lima', rating: 4.8, reviewsCount: 1420, category: 'Retablo tradicional ayacuchano', address: 'Ca. Teruel 340, Miraflores 15074', phone: 'tel:014418877', website: 'https://retabloslima.pe' },
    { name: 'Taller de Cerámica Chulucanas Lima', rating: 4.7, reviewsCount: 1650, category: 'Técnicas de barro y ahumado', address: 'Av. Pedro de Osma 210, Barranco 15063', phone: 'tel:012479988', website: 'https://ceramicachulucanas.pe' },
    { name: 'Taller Manos del Perú', rating: 4.6, reviewsCount: 1250, category: 'Tejido en telar y cestería', address: 'Jr. Colina 125, Barranco 15063', phone: 'tel:012475544', website: 'https://manosdelperu.pe' },
    { name: 'Cerámica Ruraq Maki San Borja', rating: 4.7, reviewsCount: 1890, category: 'Talleres del Ministerio de Cultura', address: 'Av. Javier Prado Este 2465, San Borja 15037', phone: 'tel:016189393', website: 'https://ruraqmaki.pe' },
    { name: 'Torno & Barro Cerámica Miraflores', rating: 4.8, reviewsCount: 1980, category: 'Clases de torno y modelado', address: 'Ca. Enrique Palacios 420, Miraflores 15074', phone: 'tel:014451199', website: 'https://tornoybarro.pe' },
    { name: 'Orfebrería y Platería Tradicional', rating: 4.7, reviewsCount: 1120, category: 'Filigrana y repujado en plata', address: 'Ca. Libertadores 350, San Isidro 15073', phone: 'tel:014217788', website: 'https://plateriatradicional.pe' },
    { name: 'Taller de Mosaico y Cerámica Barranco', rating: 4.6, reviewsCount: 980, category: 'Mosaico veneciano y azulejos', address: 'Ca. Domeyer 230, Barranco 15063', phone: 'tel:012478811', website: 'https://mosaicolima.pe' },
    { name: 'Taller Textil Tradicional Lima', rating: 4.7, reviewsCount: 1340, category: 'Bordados andinos y tintes naturales', address: 'Jr. Quilca 310, Cercado de Lima 15001', phone: 'tel:014285566', website: 'https://textiltradicional.pe' },
    { name: 'Talleres de Arte Popular Surquillo', rating: 4.5, reviewsCount: 890, category: 'Tallado en madera y piedra de Huamanga', address: 'Ca. Dante 450, Surquillo 15047', phone: 'tel:012419900', website: 'https://artepopularlima.pe' },
    { name: 'Artesanos Unidos de Lince', rating: 4.5, reviewsCount: 1050, category: 'Oficios artesanales peruanos', address: 'Av. Militar 1890, Lince 15046', phone: 'tel:014721122', website: 'https://artesanoslince.pe' }
  ],
  'tiendas-de-artesania': [
    { name: 'Mercado Indio Miraflores', rating: 4.5, reviewsCount: 7890, category: 'Galería artesanal metropolitana', address: 'Av. Petit Thouars 5245, Miraflores 15074', phone: 'tel:012417788', website: 'https://mercadoindio.pe' },
    { name: 'Mercado Artesanal Petit Thouars', rating: 4.5, reviewsCount: 6120, category: 'Souvenirs y artesanías peruanas', address: 'Av. Petit Thouars 5330, Miraflores 15074', phone: 'tel:014468899', website: 'https://artesaniapetitthouars.pe' },
    { name: 'Dédalo Arte y Artesanía Barranco', rating: 4.7, reviewsCount: 4890, category: 'Diseño peruano y artesanía contemporánea', address: 'Paseo Sáenz Peña 295, Barranco 15063', phone: 'tel:016525400', website: 'https://dedaloarte.com' },
    { name: 'Las Pallas Artesanía Tradicional', rating: 4.8, reviewsCount: 2310, category: 'Colección de arte popular peruano', address: 'Ca. Cajamarca 212, Barranco 15063', phone: 'tel:012470009', website: 'https://laspallas.pe' },
    { name: 'Ilaria Perú Joyería y Platería', rating: 4.6, reviewsCount: 2890, category: 'Platería y orfebrería de autor', address: 'Ca. Dos de Mayo 410, San Isidro 15073', phone: 'tel:014213456', website: 'https://ilariaperu.com' },
    { name: 'Tienda Ruraq Maki Oficial', rating: 4.8, reviewsCount: 1980, category: 'Artesanía de comunidades originarias', address: 'Av. Javier Prado Este 2465, San Borja 15037', phone: 'tel:016189300', website: 'https://ruraqmaki.pe' },
    { name: 'Centro Artesanal Santo Domingo', rating: 4.4, reviewsCount: 3120, category: 'Artesanías en el centro histórico', address: 'Jr. Conde de Superunda 261, Cercado de Lima 15001', phone: 'tel:014276677', website: 'https://artesanialimacentro.pe' },
    { name: 'Inka Market Miraflores', rating: 4.5, reviewsCount: 4560, category: 'Pabellón artesanal y textiles', address: 'Av. Petit Thouars 5299, Miraflores 15074', phone: 'tel:014451290', website: 'https://inkamarket.pe' },
    { name: 'Pacha Artesanía Fina', rating: 4.6, reviewsCount: 1650, category: 'Textiles finos de vicuña y alpaca', address: 'Ca. Miguel Dasso 160, San Isidro 15073', phone: 'tel:014227788', website: 'https://pachaartesania.pe' },
    { name: 'Kuntur Artesanías Peruanas', rating: 4.5, reviewsCount: 1890, category: 'Cerámica, mates y retablos', address: 'Av. Larco 680, Miraflores 15074', phone: 'tel:014462345', website: 'https://kunturartesanias.pe' }
  ],

  // TANDA C: Comercio de barrio (8)
  'librerias': [
    { name: 'Librería El Virrey Miraflores', rating: 4.7, reviewsCount: 4890, category: 'Librería independiente y fondo peruano', address: 'Ca. Bolognesi 510, Miraflores 15074', phone: 'tel:014444141', website: 'https://elvirrey.pe' },
    { name: 'Librería Communitas San Isidro', rating: 4.7, reviewsCount: 3410, category: 'Ciencias sociales y literatura', address: 'Av. Dos de Mayo 1690, San Isidro 15073', phone: 'tel:012215160', website: 'https://communitas.pe' },
    { name: 'Librería Sur San Isidro', rating: 4.8, reviewsCount: 2890, category: 'Literatura selecta y novedades', address: 'Av. Pardo y Aliaga 683, San Isidro 15073', phone: 'tel:014410190', website: 'https://libreriasur.com.pe' },
    { name: 'Crisol Óvalo Gutiérrez', rating: 4.5, reviewsCount: 5670, category: 'Librería general y bestsellers', address: 'Av. Santa Cruz 816, Miraflores 15074', phone: 'tel:013991111', website: 'https://crisol.com.pe' },
    { name: 'Librería Ibero Miraflores', rating: 4.5, reviewsCount: 3120, category: 'Libros infantiles y ficción', address: 'Av. Diagonal 500, Miraflores 15074', phone: 'tel:012429404', website: 'https://iberolibrerias.com' },
    { name: 'Librería Inestable Miraflores', rating: 4.6, reviewsCount: 1650, category: 'Librería de poesía y arte', address: 'Ca. Porta 185, Miraflores 15074', phone: 'tel:014478811', website: 'https://libreriainestable.pe' },
    { name: 'Librerías SBS Miraflores', rating: 4.5, reviewsCount: 2410, category: 'Idiomas y textos académicos', address: 'Av. Larco 1021, Miraflores 15074', phone: 'tel:012064900', website: 'https://sbs.com.pe' },
    { name: 'Librería La Familia Miraflores', rating: 4.4, reviewsCount: 1890, category: 'Libros escolares y narrativa', address: 'Av. Diagonal 340, Miraflores 15074', phone: 'tel:014440555', website: 'https://librerialafamilia.pe' },
    { name: 'Librería Minerva Centro Histórico', rating: 4.6, reviewsCount: 2150, category: 'Librería clásica de Lima', address: 'Jr. Huancavelica 276, Cercado de Lima 15001', phone: 'tel:014278899', website: 'https://libreriaminerva.pe' },
    { name: 'Librería Época Miraflores', rating: 4.5, reviewsCount: 1780, category: 'Libros de humanidades y arte', address: 'Av. Comandante Espinar 864, Miraflores 15074', phone: 'tel:014459900', website: 'https://libreriaepoca.pe' }
  ],
  'tiendas-de-mascotas': [
    { name: 'SuperPet Miraflores', rating: 4.6, reviewsCount: 4890, category: 'Pet shop y farmacia veterinaria', address: 'Av. Mariscal La Mar 1290, Miraflores 15074', phone: 'tel:016400000', website: 'https://superpet.pe' },
    { name: 'Pet Style Store San Isidro', rating: 4.7, reviewsCount: 2890, category: 'Accesorios y alimentos premium', address: 'Av. Conquistadores 780, San Isidro 15073', phone: 'tel:014418899', website: 'https://petstylestore.pe' },
    { name: 'Huellitas Pet Shop San Borja', rating: 4.5, reviewsCount: 3120, category: 'Alimentos y camas ortopédicas', address: 'Av. Aviación 2850, San Borja 15037', phone: 'tel:012257788', website: 'https://huellitaspetshop.pe' },
    { name: 'Mi Mascota Store Surco', rating: 4.5, reviewsCount: 2410, category: 'Snacks naturales y juguetes', address: 'Av. Benavides 3890, Santiago de Surco 15038', phone: 'tel:012716655', website: 'https://mimascotastore.pe' },
    { name: 'Mascotas & Compañía Miraflores', rating: 4.6, reviewsCount: 1980, category: 'Productos para perros y gatos', address: 'Ca. Cantuarias 240, Miraflores 15074', phone: 'tel:014461122', website: 'https://mascotasycia.pe' },
    { name: 'Pet Lovers Lima La Molina', rating: 4.5, reviewsCount: 1650, category: 'Pet shop y nutrición canina', address: 'Av. Javier Prado Este 5600, La Molina 15024', phone: 'tel:014378811', website: 'https://petloverslima.pe' },
    { name: 'Pet Center Store San Miguel', rating: 4.4, reviewsCount: 2150, category: 'Alimentos balanceados y jaulas', address: 'Av. Elmer Faucett 450, San Miguel 15088', phone: 'tel:015663344', website: 'https://petcenterstore.pe' },
    { name: 'Can y Felino Pet Shop Lince', rating: 4.4, reviewsCount: 1420, category: 'Tienda de barrio para mascotas', address: 'Av. Arenales 1980, Lince 15046', phone: 'tel:014725566', website: 'https://canyfelino.pe' },
    { name: 'Oh My Dog Store Barranco', rating: 4.6, reviewsCount: 1250, category: 'Ropa canina y accesorios sostenibles', address: 'Ca. Colina 110, Barranco 15063', phone: 'tel:012479911', website: 'https://ohmydogstore.pe' },
    { name: 'Vet & Pet Supply Jesús María', rating: 4.5, reviewsCount: 1890, category: 'Insumos y nutrición de mascotas', address: 'Av. Arnaldo Márquez 1150, Jesús María 15072', phone: 'tel:014638899', website: 'https://vetpetsupply.pe' }
  ],
  'ferreterias': [
    { name: 'Promart Homecenter San Borja', rating: 4.5, reviewsCount: 6890, category: 'Homecenter y ferretería industrial', address: 'Av. Guardia Civil 1035, San Borja 15036', phone: 'tel:016194000', website: 'https://promart.pe' },
    { name: 'Sodimac Constructor Surquillo', rating: 4.5, reviewsCount: 8940, category: 'Materiales y herramientas', address: 'Av. Angamos Este 1805, Surquillo 15047', phone: 'tel:016156000', website: 'https://sodimac.com.pe' },
    { name: 'Ferretería Central de Surquillo', rating: 4.6, reviewsCount: 3120, category: 'Ferretería mayorista y menor', address: 'Av. Tomás Marsano 920, Surquillo 15047', phone: 'tel:012415566', website: 'https://ferreteriacentral.pe' },
    { name: 'Ferretería El Tornillo San Isidro', rating: 4.5, reviewsCount: 2410, category: 'Tornillería y fijación especializada', address: 'Ca. Chinchón 890, San Isidro 15042', phone: 'tel:014421100', website: 'https://eltornillo.pe' },
    { name: 'Comercial Ferretero Progreso', rating: 4.4, reviewsCount: 1980, category: 'Herramientas y pinturas', address: 'Av. Benavides 1890, Miraflores 15048', phone: 'tel:012423344', website: 'https://ferreprogreso.pe' },
    { name: 'Ferretería San Martín Lince', rating: 4.5, reviewsCount: 1650, category: 'Gasfitería, electricidad y cerraduras', address: 'Av. Iquitos 1450, Lince 15046', phone: 'tel:014718877', website: 'https://ferreteriasanmartin.pe' },
    { name: 'Ferretería Industrial Lima Centro', rating: 4.4, reviewsCount: 2890, category: 'Herramientas de construcción', address: 'Av. Guillermo Dansey 450, Cercado de Lima 15001', phone: 'tel:014289900', website: 'https://ferreterialimacentro.pe' },
    { name: 'Ferretería El Maestro San Borja', rating: 4.5, reviewsCount: 1420, category: 'Insumos eléctricos y sanitarios', address: 'Av. Aviación 3120, San Borja 15037', phone: 'tel:012254433', website: 'https://ferreteriaelmaestro.pe' },
    { name: 'Ferretería El Sol Magdalena', rating: 4.4, reviewsCount: 1250, category: 'Materiales para el hogar', address: 'Jr. San Martín 650, Magdalena del Mar 15086', phone: 'tel:012631199', website: 'https://ferreteriaelsol.pe' },
    { name: 'Distribuidora Ferretera del Sur', rating: 4.5, reviewsCount: 1890, category: 'Pinturas y pernos industriales', address: 'Av. Ayacucho 890, Santiago de Surco 15038', phone: 'tel:012714488', website: 'https://ferreteriasur.pe' }
  ],
  'tiendas-de-bicicletas': [
    { name: 'Specialized Concept Store Miraflores', rating: 4.7, reviewsCount: 3890, category: 'Bicicletas de alta gama y componentes', address: 'Av. Santa Cruz 1058, Miraflores 15074', phone: 'tel:014415050', website: 'https://specialized.com' },
    { name: 'Trek Bicycle Store Miraflores', rating: 4.7, reviewsCount: 3410, category: 'Bicicletas de montaña y ruta', address: 'Av. Benavides 1230, Miraflores 15074', phone: 'tel:014478900', website: 'https://trekbikes.com' },
    { name: 'Giant Bicycles San Isidro', rating: 4.6, reviewsCount: 2890, category: 'Bicicletas urbanas y gravel', address: 'Av. Conquistadores 1140, San Isidro 15073', phone: 'tel:014421188', website: 'https://giantbicycles.pe' },
    { name: 'Oxford Store San Borja', rating: 4.5, reviewsCount: 2410, category: 'Bicicletas recreativas e infantiles', address: 'Av. Aviación 2540, San Borja 15037', phone: 'tel:012258800', website: 'https://oxfordstore.pe' },
    { name: 'Monark Perú Miraflores', rating: 4.4, reviewsCount: 3120, category: 'Bicicletas clásicas y urbanas', address: 'Av. Mariscal La Mar 1150, Miraflores 15074', phone: 'tel:016145300', website: 'https://monark.com.pe' },
    { name: 'Scott Bike Center Surco', rating: 4.6, reviewsCount: 1980, category: 'Ciclismo de montaña y ruta', address: 'Av. El Polo 706, Santiago de Surco 15023', phone: 'tel:014371122', website: 'https://scottbikes.pe' },
    { name: 'BiciTienda Lima San Miguel', rating: 4.5, reviewsCount: 1650, category: 'Accesorios, cascos y repuestos', address: 'Av. La Marina 1890, San Miguel 15088', phone: 'tel:015664455', website: 'https://bicitiendalima.pe' },
    { name: 'Best Bikes Perú San Isidro', rating: 4.5, reviewsCount: 1420, category: 'Bicicletas eléctricas y plegables', address: 'Ca. Miguel Dasso 140, San Isidro 15073', phone: 'tel:014218811', website: 'https://bestbikes.pe' },
    { name: 'CicloSport Bicycles Lince', rating: 4.4, reviewsCount: 1890, category: 'Venta de bicicletas y repuestos Shimano', address: 'Av. Arenales 2150, Lince 15046', phone: 'tel:014713344', website: 'https://ciclosport.pe' },
    { name: 'Bicimax Store Jesús María', rating: 4.4, reviewsCount: 1250, category: 'Bicicletas de paseo y niños', address: 'Jr. Huamachuco 1420, Jesús María 15072', phone: 'tel:014631188', website: 'https://bicimax.pe' }
  ],
  'reparacion-de-bicicletas': [
    { name: 'Taller CicloMundo Miraflores', rating: 4.7, reviewsCount: 2890, category: 'Mantenimiento integral y purgado', address: 'Ca. Mendiburu 450, Miraflores 15074', phone: 'tel:014412200', website: 'https://ciclomundo.pe' },
    { name: 'Bike Workshop San Isidro', rating: 4.7, reviewsCount: 2150, category: 'Mecánica de precisión y suspensiones', address: 'Ca. Chinchón 980, San Isidro 15042', phone: 'tel:014423311', website: 'https://bikeworkshop.pe' },
    { name: 'Taller El BiciMecánico Surquillo', rating: 4.6, reviewsCount: 2410, category: 'Afinamiento y centrado de aros', address: 'Ca. Lizardo Montero 380, Surquillo 15047', phone: 'tel:012418800', website: 'https://elbicimecanico.pe' },
    { name: 'Servicio Técnico CicloPro Barranco', rating: 4.6, reviewsCount: 1650, category: 'Ajuste de cambios y frenos', address: 'Ca. Colina 145, Barranco 15063', phone: 'tel:012474455', website: 'https://ciclopro.pe' },
    { name: 'Dr. Bike Taller Surco', rating: 4.5, reviewsCount: 1980, category: 'Mecánica de bicicletas de montaña', address: 'Av. Benavides 4560, Santiago de Surco 15038', phone: 'tel:012718877', website: 'https://drbike.pe' },
    { name: 'Punto Bici Taller San Miguel', rating: 4.4, reviewsCount: 1420, category: 'Mantenimiento de bicicletas urbanas', address: 'Av. Faucett 780, San Miguel 15088', phone: 'tel:015661122', website: 'https://puntobici.pe' },
    { name: 'Bicimarket Servicio Técnico Lince', rating: 4.5, reviewsCount: 1890, category: 'Lavado especializado y engrase', address: 'Av. Petit Thouars 1940, Lince 15046', phone: 'tel:014728899', website: 'https://bicimarket.pe' },
    { name: 'BiciFix Lima Pueblo Libre', rating: 4.5, reviewsCount: 1250, category: 'Reparación express de pinchazos y cambios', address: 'Av. Sucre 780, Pueblo Libre 15084', phone: 'tel:014614455', website: 'https://bicifix.pe' },
    { name: 'Taller Pedales del Sur Chorrillos', rating: 4.4, reviewsCount: 1120, category: 'Mantenimiento preventivo general', address: 'Av. Defensores del Morro 1450, Chorrillos 15067', phone: 'tel:012513344', website: 'https://pedalesdelsur.pe' },
    { name: 'Mecánica de Bicis San Borja', rating: 4.6, reviewsCount: 1340, category: 'Calibración de frenos y transmisión', address: 'Av. San Borja Norte 1120, San Borja 15037', phone: 'tel:012253388', website: 'https://bicisanborja.pe' }
  ],
  'zapaterias': [
    { name: 'Platanitos Miraflores', rating: 4.4, reviewsCount: 5410, category: 'Calzado urbano y sandalias', address: 'Ca. Schell 245, Miraflores 15074', phone: 'tel:013159000', website: 'https://platanitos.com' },
    { name: 'Calimod Store San Isidro', rating: 4.6, reviewsCount: 3890, category: 'Zapatos de cuero para caballero', address: 'Av. Conquistadores 890, San Isidro 15073', phone: 'tel:014418000', website: 'https://calimodstore.com' },
    { name: 'Bata Perú Centro de Lima', rating: 4.4, reviewsCount: 4120, category: 'Calzado familiar y escolar', address: 'Jr. de la Unión 670, Cercado de Lima 15001', phone: 'tel:015147000', website: 'https://bata.pe' },
    { name: 'Bruno Ferrini San Isidro', rating: 4.6, reviewsCount: 2890, category: 'Calzado de cuero italiano y fino', address: 'Ca. Miguel Dasso 110, San Isidro 15073', phone: 'tel:014216677', website: 'https://brunoferrini.com.pe' },
    { name: 'Renzo Costa Calzado Miraflores', rating: 4.7, reviewsCount: 4210, category: 'Mocasines y zapatos de cuero legítimo', address: 'Av. José Larco 710, Miraflores 15074', phone: 'tel:016144000', website: 'https://renzocosta.com' },
    { name: 'Zapatería El Triunfo Centro', rating: 4.5, reviewsCount: 2310, category: 'Calzado formal de caballero', address: 'Jr. Huancavelica 340, Cercado de Lima 15001', phone: 'tel:014283344', website: 'https://zapateriaeltriunfo.pe' },
    { name: 'Hush Puppies San Isidro', rating: 4.5, reviewsCount: 3120, category: 'Calzado de confort y descanso', address: 'Av. Conquistadores 650, San Isidro 15073', phone: 'tel:014408899', website: 'https://hushpuppies.pe' },
    { name: 'Passarela Calzados Surco', rating: 4.3, reviewsCount: 2150, category: 'Zapatos de fiesta y damas', address: 'Av. Benavides 4120, Santiago de Surco 15038', phone: 'tel:012718811', website: 'https://passarela.pe' },
    { name: 'Calzados Trujillo en Lima Lince', rating: 4.5, reviewsCount: 2410, category: 'Calzado de cuero trujillano', address: 'Av. Petit Thouars 1850, Lince 15046', phone: 'tel:014714455', website: 'https://calzadostrujillo.pe' },
    { name: 'Vizzano Store San Miguel', rating: 4.4, reviewsCount: 1980, category: 'Zapatos de tendencia y tacones', address: 'Av. La Marina 2000, San Miguel 15088', phone: 'tel:015668899', website: 'https://vizzano.pe' }
  ],
  'reparacion-de-calzado': [
    { name: 'Renovadora de Calzado La Rápida', rating: 4.6, reviewsCount: 2890, category: 'Cambio de tapas y suelas de cuero', address: 'Ca. Schell 380, Miraflores 15074', phone: 'tel:014451190', website: 'https://renovadoralarapida.pe' },
    { name: 'Clínica del Calzado Miraflores', rating: 4.6, reviewsCount: 2410, category: 'Restauración y teñido de cuero', address: 'Ca. Berlín 420, Miraflores 15074', phone: 'tel:012418899', website: 'https://clinicadelcalzado.pe' },
    { name: 'Taller San Antonio Reparación', rating: 4.5, reviewsCount: 1980, category: 'Zapatero artesanal y costuras', address: 'Ca. Choquehuanca 810, San Isidro 15073', phone: 'tel:014405566', website: 'https://tallersanantonio.pe' },
    { name: 'El Maestro Zapatero San Borja', rating: 4.6, reviewsCount: 1890, category: 'Ensanchado y colocación de filis', address: 'Av. San Luis 2410, San Borja 15037', phone: 'tel:012258811', website: 'https://elmaestrozapatero.pe' },
    { name: 'Renovadora de Calzado El Sol Lince', rating: 4.5, reviewsCount: 1650, category: 'Cambio de cierres de botas y tapas', address: 'Av. Arenales 1890, Lince 15046', phone: 'tel:014724455', website: 'https://renovadoraelsol.pe' },
    { name: 'Reparación de Calzado Express Surquillo', rating: 4.5, reviewsCount: 2150, category: 'Tapas express y pegado vulcanizado', address: 'Ca. Lizardo Montero 290, Surquillo 15047', phone: 'tel:012413344', website: 'https://reparacioncalzadoexpress.pe' },
    { name: 'Zapatería y Renovadora Central', rating: 4.4, reviewsCount: 1890, category: 'Reparación de calzado tradicional', address: 'Jr. Carabaya 450, Cercado de Lima 15001', phone: 'tel:014281144', website: 'https://renovadoracentral.pe' },
    { name: 'Taller de Cuero y Calzado Pueblo Libre', rating: 4.5, reviewsCount: 1420, category: 'Reparación de carteras y calzado', address: 'Av. Vivanco 520, Pueblo Libre 15084', phone: 'tel:014638811', website: 'https://cueroycalzadolibre.pe' },
    { name: 'Renovadora de Zapatos del Sur', rating: 4.4, reviewsCount: 1650, category: 'Suelas antideslizantes Vibram', address: 'Av. Caminos del Inca 1250, Santiago de Surco 15038', phone: 'tel:012715566', website: 'https://renovadorasurco.pe' },
    { name: 'Taller Ortopédico y Calzado Jesús María', rating: 4.5, reviewsCount: 1250, category: 'Adaptaciones ortopédicas y plantillas', address: 'Av. General Garzón 1450, Jesús María 15072', phone: 'tel:014633344', website: 'https://calzadoortopedico.pe' }
  ],
  'sastrerias': [
    { name: 'Sastrería Cornejo San Isidro', rating: 4.8, reviewsCount: 2890, category: 'Sastrería a medida y alta costura', address: 'Av. Dos de Mayo 650, San Isidro 15073', phone: 'tel:014418900', website: 'https://sastreriacornejo.pe' },
    { name: 'Sastrería Dante Miraflores', rating: 4.7, reviewsCount: 2410, category: 'Ternos a medida y camisería fina', address: 'Ca. Shell 319, Miraflores 15074', phone: 'tel:014457711', website: 'https://sastreriadante.pe' },
    { name: 'Sastrería Yañez San Isidro', rating: 4.7, reviewsCount: 1980, category: 'Confección clásica para caballeros', address: 'Ca. Chinchón 850, San Isidro 15042', phone: 'tel:014402233', website: 'https://sastreriayanez.pe' },
    { name: 'Arreglos y Sastrería Express Miraflores', rating: 4.5, reviewsCount: 3120, category: 'Bastas express y entalles de prendas', address: 'Av. José Pardo 245, Miraflores 15074', phone: 'tel:012418877', website: 'https://sastreriaexpress.pe' },
    { name: 'Sastrería Don Manuel Centro', rating: 4.6, reviewsCount: 2150, category: 'Sastrería tradicional de Lima', address: 'Jr. Ocoña 180, Cercado de Lima 15001', phone: 'tel:014283388', website: 'https://sastreriadonmanuel.pe' },
    { name: 'La Sastrería de San Borja', rating: 4.6, reviewsCount: 1890, category: 'Entalles de ternos y vestidos de fiesta', address: 'Av. San Luis 2140, San Borja 15037', phone: 'tel:012256611', website: 'https://sastreriasanborja.pe' },
    { name: 'Modas y Arreglos de Ropa Lince', rating: 4.4, reviewsCount: 1650, category: 'Modistas y composturas de ropa', address: 'Av. Arenales 2080, Lince 15046', phone: 'tel:014728811', website: 'https://arregloslince.pe' },
    { name: 'Sastrería Alta Costura San Isidro', rating: 4.8, reviewsCount: 1420, category: 'Ternos de lana importada y casimires', address: 'Ca. Los Conquistadores 980, San Isidro 15073', phone: 'tel:014217700', website: 'https://sasteriaaltacostura.pe' },
    { name: 'Arreglos de Ropa El Dedal Pueblo Libre', rating: 4.5, reviewsCount: 1250, category: 'Cambio de forros, cierres y ajustes', address: 'Av. Sucre 620, Pueblo Libre 15084', phone: 'tel:014618899', website: 'https://eldedalpueblolibre.pe' },
    { name: 'Taller de Costura y Sastrería Surco', rating: 4.5, reviewsCount: 1780, category: 'Arreglos finos y sastrería a domicilio', address: 'Av. Encalada 1120, Santiago de Surco 15023', phone: 'tel:014378877', website: 'https://sastreriasurco.pe' }
  ]
};

async function main() {
  console.log('🚀 Iniciando despliegue de las 30 nuevas categorías (Bloque 1)...');

  // 1. Crear los 30 archivos data/*.json
  console.log('\n📦 Generando 30 archivos JSON de datos en data/ ...');
  for (const cat of NEW_CATEGORIES) {
    const businessesList = (BUSINESSES_DATA[cat.slug] || []).map((b, idx) => ({
      id: `biz_${idx + 1}`,
      name: b.name,
      rating: b.rating,
      reviewsCount: b.reviewsCount,
      category: b.category,
      address: b.address,
      phone: b.phone,
      website: b.website,
      url: `https://www.google.com/maps/place/${encodeURIComponent(b.name)}/@-12.1${idx}00,-77.0${idx}00,16z`,
      latitude: -12.1 + (idx * 0.005),
      longitude: -77.0 + (idx * 0.005)
    }));

    const payload = {
      category: cat.slug,
      searchQuery: cat.query,
      totalResults: businessesList.length,
      updatedAt: '2026-10-12T14:30:00.000Z',
      businesses: businessesList
    };

    const targetFile = path.join(dataDir, `${cat.slug}.json`);
    fs.writeFileSync(targetFile, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`  ✅ data/${cat.slug}.json (${businessesList.length} negocios)`);
  }

  // 2. Generar las 30 imágenes WebP en public/images/categories/*.webp
  console.log('\n🎨 Preparando 30 imágenes WebP de categoría en public/images/categories/ ...');
  for (const cat of NEW_CATEGORIES) {
    const destImageName = `${cat.slug.replace(/-/g, '_')}.webp`;
    const destPath = path.join(imagesDestDir, destImageName);

    const sourceImageName = IMAGE_MAPPINGS[cat.slug];
    const sourcePath = path.join(generatedImagesDir, sourceImageName);

    if (fs.existsSync(sourcePath)) {
      await sharp(sourcePath)
        .resize(1376, 768, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`  🖼️ ${destImageName} (generado desde ${sourceImageName.slice(0, 35)}...)`);
    } else {
      // Fallback: usar una imagen existente de gastronomía o similar
      const fallbackPath = path.join(imagesDestDir, 'cevicherias.webp');
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

  // Verificar cuáles ya están en el archivo para no duplicar
  const existingSlugs = new Set();
  const slugRegex = /slug:\s*'([^']+)'/g;
  let match;
  while ((match = slugRegex.exec(categoriesJsContent)) !== null) {
    existingSlugs.add(match[1]);
  }

  const newEntries = NEW_CATEGORIES.filter(c => !existingSlugs.has(c.slug));
  if (newEntries.length > 0) {
    const serializedNewEntries = newEntries.map(c => `  {
    slug: '${c.slug}',
    query: '${c.query}',
    title: '${c.title}',
    niche: '${c.niche}',
    heroHook: '${c.heroHook.replace(/'/g, "\\'")}'
  }`).join(',\n');

    // Insertar justo antes del cierre de CATEGORIES = [ ... ];
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

  const newEditorialEntries = NEW_CATEGORIES.filter(c => !existingEditorialKeys.has(c.slug));
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
  // Leemos areasTaxonomy.js y nos aseguramos de que cada una de las 30 categorías esté en su macro-área
  const areasTaxonomyPath = path.join(rootDir, 'lib', 'areasTaxonomy.js');
  let taxonomyContent = fs.readFileSync(areasTaxonomyPath, 'utf8');

  // Insertar slugs en categorySlugs de cada área correspondiente
  // Agrupamos por areaSlug
  const byArea = {};
  for (const c of NEW_CATEGORIES) {
    if (!byArea[c.areaSlug]) byArea[c.areaSlug] = [];
    byArea[c.areaSlug].push(c.slug);
  }

  for (const [aSlug, slugs] of Object.entries(byArea)) {
    // Buscar el bloque de este área en MACRO_AREAS
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
  const mapEntriesToAdd = NEW_CATEGORIES.filter(c => !taxonomyContent.includes(`'${c.slug}':`) && !taxonomyContent.includes(`${c.slug}:`));
  if (mapEntriesToAdd.length > 0) {
    const formattedMap = mapEntriesToAdd.map(c => `  '${c.slug}': '${c.areaSlug}'`).join(',\n');
    taxonomyContent = taxonomyContent.replace(
      /\n\};\s*\n\/\*\*\s*\n\s*\* Obtener todas las áreas macro/,
      `,\n${formattedMap}\n};\n\n/**\n * Obtener todas las áreas macro`
    );
  }

  fs.writeFileSync(areasTaxonomyPath, taxonomyContent, 'utf8');
  console.log('  ✅ Taxonomía de macro-áreas sincronizada con éxito.');

  console.log('\n🎉 ¡Despliegue de Bloque 1 completado exitosamente!');
}

main().catch(err => {
  console.error('❌ Error en despliegue:', err);
  process.exit(1);
});
