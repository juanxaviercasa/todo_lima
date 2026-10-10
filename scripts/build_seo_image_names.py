#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de Nombres y Textos Alt SEO para las 537 Imágenes de Todo Lima (TLB-002 a TLB-180).
Crea exactamente 537 renglones 1 a 1 alineados con PROMPTS_IMAGENES_BLOG_179_ARTICULOS.txt.
Produce:
1. docs/NOMBRES_TEXTO_ALT_SEO_179_ARTICULOS.txt (Textos Alt descriptivos SEO profesionales)
2. docs/NOMBRES_ARCHIVOS_SLUGS_SEO_179_ARTICULOS.txt (Nombres de archivo slug .webp)
3. docs/MAPEO_IMAGENES_SEO_537.json (Mapeo integral estructurado)
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANCO_PATH = ROOT / "docs" / "BANCO_EDITORIAL_180_TITULARES.json"
PROMPTS_PATH = ROOT / "docs" / "PROMPTS_IMAGENES_BLOG_179_ARTICULOS.txt"

OUT_ALT_TXT = ROOT / "docs" / "NOMBRES_TEXTO_ALT_SEO_179_ARTICULOS.txt"
OUT_SLUG_TXT = ROOT / "docs" / "NOMBRES_ARCHIVOS_SLUGS_SEO_179_ARTICULOS.txt"
OUT_JSON = ROOT / "docs" / "MAPEO_IMAGENES_SEO_537.json"

def clean_one_line(text):
    return re.sub(r'\s+', ' ', text).strip()

def slugify(text):
    text = text.lower()
    text = re.sub(r'[áàäâ]', 'a', text)
    text = re.sub(r'[éèëê]', 'e', text)
    text = re.sub(r'[íìïî]', 'i', text)
    text = re.sub(r'[óòöô]', 'o', text)
    text = re.sub(r'[úùüû]', 'u', text)
    text = re.sub(r'[ñ]', 'n', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_seo_names_for_article(art):
    art_id = art["id"]
    titulo = art["titulo"]
    cat = art["categoria"]
    slug = art["slug_propuesto"]
    t_lower = titulo.lower()
    
    # ------------------------------------------------------------------
    # Generación contextual por temas
    # ------------------------------------------------------------------
    # 1. Transporte y Movilidad
    if any(k in t_lower for k in ["transporte", "tarjetas", "rutas y alertas", "transbordos", "terminales", "aeropuerto", "ciclovías", "conducir", "taxis", "metropolitano", "corredor"]):
        if "tarjeta" in t_lower or "transbordo" in t_lower:
            alt_portada = "Pasajeros validando tarjetas de transporte público en torniquetes de estación en Lima"
            alt_int1 = "Lector electrónico validando saldo y tarifa de tarjeta de transporte urbano en Lima"
            alt_int2 = "Usuarios esperando ordenadamente en plataforma techada del Metropolitano de Lima"
            slug_p = f"{slug}-portada-estacion.webp"
            slug_i1 = f"{slug}-validador-tarjetas.webp"
            slug_i2 = f"{slug}-plataforma-pasajeros.webp"
        elif "aeropuerto" in t_lower:
            alt_portada = "Viajeros con equipaje llegando al terminal de salidas del Aeropuerto Internacional Jorge Chávez en Lima"
            alt_int1 = "Pasajero consultando itinerario de vuelo y traslados oficiales en smartphone en el aeropuerto"
            alt_int2 = "Zona de embarque y paradero de taxis oficiales en exteriores del aeropuerto de Lima"
            slug_p = f"{slug}-portada-aeropuerto.webp"
            slug_i1 = f"{slug}-itinerario-traslado.webp"
            slug_i2 = f"{slug}-paradero-taxis.webp"
        elif "terminales" in t_lower or "buses interprovinciales" in t_lower:
            alt_portada = "Terminal de buses interprovinciales con andenes de embarque y paneles informativos en Lima"
            alt_int1 = "Pasajero revisando boleto de viaje y comprobante de equipaje en boletería de transporte en Lima"
            alt_int2 = "Familias abordando bus interprovincial en zona de embarque de terminal terrestre de Lima"
            slug_p = f"{slug}-portada-terminal.webp"
            slug_i1 = f"{slug}-boleteria-pasajes.webp"
            slug_i2 = f"{slug}-embarque-viajeros.webp"
        elif "ciclovía" in t_lower or "bicicleta" in t_lower:
            alt_portada = "Ciclistas transitando por ciclovía señalizada con vista al malecón y acantilados de Lima"
            alt_int1 = "Ciclista verificando ruta urbana y estacionamiento para bicicletas en San Isidro"
            alt_int2 = "Avenida residencial arbolada con ciclovía protegida y peatones en Miraflores"
            slug_p = f"{slug}-portada-ciclovia.webp"
            slug_i1 = f"{slug}-mapa-ruta-bicicleta.webp"
            slug_i2 = f"{slug}-avenida-residencial.webp"
        else:
            alt_portada = "Corredor vial de transporte urbano en Lima con buses de tránsito rápido y paraderos ordenados"
            alt_int1 = "Usuario consultando mapa de rutas y alertas de tráfico en aplicación móvil en Lima"
            alt_int2 = "Fila ordenada de pasajeros abordando bus del corredor complementario en Lima"
            slug_p = f"{slug}-portada-transporte.webp"
            slug_i1 = f"{slug}-consulta-rutas-movil.webp"
            slug_i2 = f"{slug}-paradero-corredor.webp"

    # 2. Gastronomía Limeña
    elif any(k in t_lower for k in ["gastronomía", "chifa", "nikkei", "ceviche", "sánguche", "chicharrón", "suspiro", "café", "restaurante", "postres", "anticuchos", "desayuno", "catering", "mercados", "tortas", "comida"]):
        if "chifa" in t_lower:
            alt_portada = "Comedor tradicional de restaurante chifa en Lima con lámparas rojas y mesas familiares de compartir"
            alt_int1 = "Cocinero preparando arroz chaufa al wok a fuego vivo en cocina de chifa en Lima"
            alt_int2 = "Familia compartiendo platos tradicionales de cocina chifa en salón de Calle Capón en Lima"
            slug_p = f"{slug}-portada-salon-chifa.webp"
            slug_i1 = f"{slug}-cocina-wok-chaufa.webp"
            slug_i2 = f"{slug}-banquete-familiar-chifa.webp"
        elif "nikkei" in t_lower:
            alt_portada = "Salón contemporáneo de cocina nikkei en Lima fusionando diseño peruano y estética japonesa"
            alt_int1 = "Chef flameando láminas de tiradito nikkei con emulsión de ají amarillo en barra gastronómica"
            alt_int2 = "Comensales disfrutando de platos nikkei y sushi fusión con vajilla artesanal en Miraflores"
            slug_p = f"{slug}-portada-restaurante-nikkei.webp"
            slug_i1 = f"{slug}-tiradito-nikkei-preparacion.webp"
            slug_i2 = f"{slug}-barra-sushi-degustacion.webp"
        elif "ceviche" in t_lower:
            alt_portada = "Terraza marina de cevichería tradicional en Lima con vista y platos de pescado fresco sobre mesa de madera"
            alt_int1 = "Cocinero preparando ceviche clásico con cubos de corvina, cebolla roja y jugo de limón fresco"
            alt_int2 = "Mesa de amigos compartiendo fuente de ceviche mixto con camote glaseado y cancha serrana en Chorrillos"
            slug_p = f"{slug}-portada-cevicheria-terraza.webp"
            slug_i1 = f"{slug}-ceviche-clasico-preparacion.webp"
            slug_i2 = f"{slug}-fuente-ceviche-compartir.webp"
        elif "sánguche" in t_lower or "chicharrón" in t_lower:
            alt_portada = "Sanguichería tradicional en Lima con vitrinas de carnes asadas, panes crocantes y café caliente"
            alt_int1 = "Preparación de pan con chicharrón crujiente, rodajas de camote frito y salsa criolla fresca"
            alt_int2 = "Clientes disfrutando desayuno tradicional criollo en barra de sanguichería en Barranco"
            slug_p = f"{slug}-portada-sanguicheria-lima.webp"
            slug_i1 = f"{slug}-pan-con-chicharron-detalle.webp"
            slug_i2 = f"{slug}-desayuno-criollo-barra.webp"
        elif "café" in t_lower:
            alt_portada = "Cafetería de especialidad iluminada en Lima con paredes de ladrillo, plantas y mesas de madera"
            alt_int1 = "Barista vertiendo agua caliente con tetera de cuello de cisne sobre filtro con café peruano artesanal"
            alt_int2 = "Cliente trabajando con laptop y café filtrado junto a ventana soleada en San Isidro"
            slug_p = f"{slug}-portada-cafeteria-especialidad.webp"
            slug_i1 = f"{slug}-extraccion-cafe-filtrado.webp"
            slug_i2 = f"{slug}-espacio-trabajo-cafeteria.webp"
        elif "suspiro" in t_lower or "postre" in t_lower or "torta" in t_lower:
            alt_portada = "Pastelería tradicional limeña con vitrinas exhibiendo suspiro a la limeña y postres de convento"
            alt_int1 = "Pastelera decorando copas de suspiro a la limeña con merengue al oporto y canela en polvo"
            alt_int2 = "Mesa de té en patio limeño compartiendo porciones de tortas artesanales y postres clásicos"
            slug_p = f"{slug}-portada-pasteleria-limena.webp"
            slug_i1 = f"{slug}-suspiro-limena-merengue.webp"
            slug_i2 = f"{slug}-mesa-postres-tradicionales.webp"
        elif "anticucho" in t_lower:
            alt_portada = "Patio de anticuchería tradicional al atardecer en Lima con brasas encendidas y aroma a parrilla"
            alt_int1 = "Maestro parrillero barnizando brochetas de anticuchos con aderezo de ají panca sobre la parrilla"
            alt_int2 = "Comensales degustando porciones de anticuchos calientes acompañados de papa dorada y choclo"
            slug_p = f"{slug}-portada-anticucheria-brasas.webp"
            slug_i1 = f"{slug}-anticuchos-parrilla-aderezo.webp"
            slug_i2 = f"{slug}-degustacion-anticuchos-mesa.webp"
        else:
            alt_portada = "Comedor de restaurante emblemático en Lima con arquitectura clásica y servicio gastronómico esmerado"
            alt_int1 = "Chef emplatando especialidad de cocina peruana con hierbas frescas y guarniciones tradicionales"
            alt_int2 = "Clientes revisando la carta gastronómica y conversando en salón acogedor en Lima"
            slug_p = f"{slug}-portada-restaurante-limeno.webp"
            slug_i1 = f"{slug}-emplatado-gastronomico.webp"
            slug_i2 = f"{slug}-comensales-carta-restaurante.webp"

    # 3. Lugares, Patrimonio, Huacas y Museos
    elif any(k in t_lower for k in ["huaca", "museo", "patrimonio", "plaza", "balcones", "casona", "jirón", "iglesia", "convento", "cementerio", "circuito mágico", "parque", "monumento", "arquitectura"]):
        if "huaca" in t_lower or "adobitos" in t_lower or "ichma" in t_lower:
            alt_portada = "Huaca piramidal de adobe prehispánico en Lima con iluminación natural y edificios modernos al fondo"
            alt_int1 = "Detalle constructivo de adobitos colocados en técnica de librero en muro arqueológico de Lima"
            alt_int2 = "Visitantes recorriendo pasarelas elevadas con guía oficial en sitio arqueológico de Lima"
            slug_p = f"{slug}-portada-huaca-prehispanica.webp"
            slug_i1 = f"{slug}-detalle-adobitos-muro.webp"
            slug_i2 = f"{slug}-pasarela-arqueologica-visita.webp"
        elif "pachacamac" in t_lower:
            alt_portada = "Santuario arqueológico de Pachacamac con templos de barro frente al horizonte del Océano Pacífico"
            alt_int1 = "Salas del museo de sitio de Pachacamac exhibiendo textiles ancestrales y el ídolo de madera tallado"
            alt_int2 = "Grupo cultural recorriendo sendero señalizado hacia el Templo del Sol en el valle de Lurín"
            slug_p = f"{slug}-portada-santuario-pachacamac.webp"
            slug_i1 = f"{slug}-museo-sitio-idolo-textiles.webp"
            slug_i2 = f"{slug}-sendero-templo-del-sol.webp"
        elif "mucen" in t_lower or "museo" in t_lower:
            alt_portada = "Galería monumental de museo histórico en Lima con techos altos y vitrinas de arte curadas"
            alt_int1 = "Curador examinando piezas de orfebrería precolombina y pintura republicana bajo iluminación especial"
            alt_int2 = "Público explorando salas de exposición cultural con paneles interpretativos en el centro de Lima"
            slug_p = f"{slug}-portada-galeria-museo.webp"
            slug_i1 = f"{slug}-vitrina-orfebreria-arte.webp"
            slug_i2 = f"{slug}-publico-recorrido-museo.webp"
        elif "balcones" in t_lower:
            alt_portada = "Calle colonial del Centro Histórico de Lima con balcones de cajón de madera tallada en cedro"
            alt_int1 = "Detalle arquitectónico de celosías y tallados en madera de balcón virreinal limeño filtrando la luz"
            alt_int2 = "Estudiantes y visitantes contemplando la arquitectura de fachadas históricas en Jirón de la Unión"
            slug_p = f"{slug}-portada-balcones-centro.webp"
            slug_i1 = f"{slug}-detalle-celosias-madera.webp"
            slug_i2 = f"{slug}-observacion-arquitectura-calle.webp"
        elif "plaza san martín" in t_lower or "plaza" in t_lower:
            alt_portada = "Plaza San Martín en Lima con fachadas neoclásicas blancas, monumento central y farolas al anochecer"
            alt_int1 = "Portales con arquerías coloniales y teatro histórico rodeando la Plaza San Martín de Lima"
            alt_int2 = "Ciudadanos y turistas paseando por la explanada de la plaza entre jardines y palmeras"
            slug_p = f"{slug}-portada-plaza-san-martin.webp"
            slug_i1 = f"{slug}-portales-arquitectura-plaza.webp"
            slug_i2 = f"{slug}-paseo-ciudadano-explanada.webp"
        elif "cementerio" in t_lower or "presbítero maestro" in t_lower:
            alt_portada = "Mausoleos neoclásicos y esculturas de mármol entre cipreses en el Cementerio Presbítero Maestro de Lima"
            alt_int1 = "Conservador de patrimonio inspeccionando escultura funeraria de mármol con detalles históricos"
            alt_int2 = "Recorrido cultural diurno guiado por las avenidas monumentales del camposanto histórico"
            slug_p = f"{slug}-portada-presbitero-maestro.webp"
            slug_i1 = f"{slug}-escultura-marmol-mausoleo.webp"
            slug_i2 = f"{slug}-recorrido-cultural-guiado.webp"
        elif "circuito mágico" in t_lower or "fuentes" in t_lower:
            alt_portada = "Fuentes de agua iluminadas con luces de colores sincronizadas en el Parque de la Reserva de Lima"
            alt_int1 = "Visitantes cruzando túnel de agua con arcos luminosos de tonos verdes y azules en Lima"
            alt_int2 = "Familias reunidas alrededor de pileta ornamental observando espectáculo de chorros de agua"
            slug_p = f"{slug}-portada-circuito-magico-agua.webp"
            slug_i1 = f"{slug}-tunel-arcos-agua-luces.webp"
            slug_i2 = f"{slug}-familias-espectaculo-fuentes.webp"
        else:
            alt_portada = "Conjunto patrimonial arquitectónico de Lima con casonas históricas restauradas y calles empedradas"
            alt_int1 = "Detalle de aldabas de bronce, portones de madera maciza y muros de adobe y quincha en Lima"
            alt_int2 = "Visitantes explorando patio interior tradicional con arcos y plantas en casona cultural de Lima"
            slug_p = f"{slug}-portada-patrimonio-arquitectura.webp"
            slug_i1 = f"{slug}-detalle-casona-historica.webp"
            slug_i2 = f"{slug}-patio-interior-cultural.webp"

    # 4. Historia de Lima
    elif any(k in t_lower for k in ["historia", "independencia", "terremoto", "virreinato", "río rímac", "muralla", "expansión", "plan maestro", "fotografías antiguas", "agua en lima"]):
        if "muralla" in t_lower:
            alt_portada = "Restos arqueológicos de la muralla virreinal de Lima conservados en el Parque de la Muralla junto al río"
            alt_int1 = "Mapa histórico trazado de la antigua Lima amurallada en mesa de exhibición de museo"
            alt_int2 = "Pasarela elevada con mirador hacia los vestigios de piedra de la muralla y el cerro San Cristóbal"
            slug_p = f"{slug}-portada-parque-de-la-muralla.webp"
            slug_i1 = f"{slug}-mapa-historico-lima-amurallada.webp"
            slug_i2 = f"{slug}-mirador-vestigios-muralla.webp"
        elif "río rímac" in t_lower:
            alt_portada = "Puente de Piedra cruzando el río Rímac con iglesias coloniales de Lima en el horizonte"
            alt_int1 = "Recreación histórica de acequias y canales de regadío prehispánicos que dieron origen a la urbe"
            alt_int2 = "Peatones cruzando el puente monumental observando el cauce histórico del río hacia el Rímac"
            slug_p = f"{slug}-portada-puente-rio-rimac.webp"
            slug_i1 = f"{slug}-canales-acequias-historicas.webp"
            slug_i2 = f"{slug}-cruce-peatonal-puente-piedra.webp"
        elif "terremoto" in t_lower or "reconstrucción" in t_lower:
            alt_portada = "Reconstrucción histórica de Lima en el siglo XVIII con arquitectura sismorresistente de quincha"
            alt_int1 = "Detalle de entramado constructivo tradicional de caña y barro resistente a sismos en Lima"
            alt_int2 = "Planos y expedientes de reconstrucción urbana colonial exhibidos en archivo histórico"
            slug_p = f"{slug}-portada-reconstruccion-lima-1746.webp"
            slug_i1 = f"{slug}-estructura-quincha-sismos.webp"
            slug_i2 = f"{slug}-planos-archivo-historico.webp"
        elif "independencia" in t_lower:
            alt_portada = "Plaza Mayor de Lima con banderas cívicas rememorando los escenarios de la proclamación de la independencia"
            alt_int1 = "Facsímil del Acta de la Independencia del Perú y documentos fundacionales de la república"
            alt_int2 = "Visita histórica guiada frente a la fachada del Palacio Municipal de Lima"
            slug_p = f"{slug}-portada-plaza-independencia-lima.webp"
            slug_i1 = f"{slug}-acta-independencia-documentos.webp"
            slug_i2 = f"{slug}-visita-guiada-palacio-municipal.webp"
        elif "agua" in t_lower:
            alt_portada = "Pila monumental de bronce en plaza histórica de Lima como símbolo del abastecimiento urbano de agua"
            alt_int1 = "Exposición de tuberías coloniales de arcilla y sistemas de acueductos antiguos en Lima"
            alt_int2 = "Parque urbano contemporáneo con pileta ornamental y árboles nativos de ribera"
            slug_p = f"{slug}-portada-pila-bronce-agua-lima.webp"
            slug_i1 = f"{slug}-acueductos-arcilla-sistema.webp"
            slug_i2 = f"{slug}-parque-pileta-ribera.webp"
        else:
            alt_portada = "Vista panorámica de Lima combinando campanarios coloniales, techos planos y calles republicanas"
            alt_int1 = "Historiador revisando legajos y mapas cartográficos antiguos de Lima en biblioteca patrimonial"
            alt_int2 = "Grupo de vecinos en recorrido de memoria histórica por casonas y callejones antiguos de Lima"
            slug_p = f"{slug}-portada-panoramica-historica-lima.webp"
            slug_i1 = f"{slug}-legajos-cartografia-antigua.webp"
            slug_i2 = f"{slug}-recorrido-memoria-vecinal.webp"

    # 5. Cultura, Tradiciones y Arte
    elif any(k in t_lower for k in ["cultura", "cajón", "señor de los milagros", "peña", "jarana", "música criolla", "arte urbano", "artesanía", "danza", "flor de amancaes", "ferias"]):
        if "señor de los milagros" in t_lower or "morado" in t_lower:
            alt_portada = "Multitud de fieles vestidos de morado acompañando la procesión del Señor de los Milagros en Lima"
            alt_int1 = "Sahumadoras con pebeteros de plata esparciendo incienso aromático ante las andas procesionales"
            alt_int2 = "Puestos tradicionales vendiendo turrón de Doña Pepa con miel y confites en el mes morado en Lima"
            slug_p = f"{slug}-portada-procesion-senor-milagros.webp"
            slug_i1 = f"{slug}-sahumadoras-incienso-plata.webp"
            slug_i2 = f"{slug}-turron-dona-pepa-puestos.webp"
        elif "cajón" in t_lower or "peña" in t_lower or "jarana" in t_lower or "música" in t_lower:
            alt_portada = "Escenario de peña criolla en Barranco con guitarras de madera, cajones peruanos e iluminación cálida"
            alt_int1 = "Percusionista ejecutando ritmos tradicionales sobre cajón peruano de madera en concierto íntimo"
            alt_int2 = "Asistentes disfrutando de música criolla y marinera en salón cultural tradicional de Lima"
            slug_p = f"{slug}-portada-pena-criolla-barranco.webp"
            slug_i1 = f"{slug}-cajon-peruano-percusionista.webp"
            slug_i2 = f"{slug}-publico-musica-criolla-salon.webp"
        elif "arte urbano" in t_lower or "murales" in t_lower:
            alt_portada = "Mural artístico contemporáneo de gran formato en muro urbano de Barranco con motivos peruanos"
            alt_int1 = "Muralista retocando con pincel detalles de pintura mural al aire libre en calle de Lima"
            alt_int2 = "Jóvenes contemplando intervenciones de arte urbano en pasaje peatonal recuperado en Lima"
            slug_p = f"{slug}-portada-mural-arte-urbano.webp"
            slug_i1 = f"{slug}-muralista-pintura-calle.webp"
            slug_i2 = f"{slug}-pasaje-peatonal-murales.webp"
        elif "artesanía" in t_lower:
            alt_portada = "Mercado artesanal de Lima con puestos de tejidos tradicionales, retablos y cerámicas decoradas"
            alt_int1 = "Artesano pintando a mano figuras tradicionales en taller de imaginería y retablos en Lima"
            alt_int2 = "Visitantes apreciando piezas de platería y telares andinos en feria artesanal de Miraflores"
            slug_p = f"{slug}-portada-mercado-artesanal-lima.webp"
            slug_i1 = f"{slug}-artesano-retablo-taller.webp"
            slug_i2 = f"{slug}-feria-artesanias-textiles.webp"
        elif "danza" in t_lower:
            alt_portada = "Pareja bailando marinera limeña con vestimenta tradicional y pañuelos blancos en festival cultural"
            alt_int1 = "Profesor de danza marcando pasos y postura a estudiantes en salón de ensayos en Lima"
            alt_int2 = "Presentación folclórica de danzas peruanas en anfiteatro al aire libre con público entusiasta"
            slug_p = f"{slug}-portada-marinera-limena-pareja.webp"
            slug_i1 = f"{slug}-clase-danza-postura-ensayo.webp"
            slug_i2 = f"{slug}-presentacion-danzas-anfiteatro.webp"
        else:
            alt_portada = "Feria cultural tradicional en plaza limeña con carpas de arte, música en vivo y talleres comunitarios"
            alt_int1 = "Detalle de instrumentos musicales tradicionales y artesanías expuestas en feria cultural"
            alt_int2 = "Familias participando en actividades culturales al aire libre en parque de Lima"
            slug_p = f"{slug}-portada-feria-cultural-plaza.webp"
            slug_i1 = f"{slug}-instrumentos-artesanias-muestra.webp"
            slug_i2 = f"{slug}-familias-actividad-cultural.webp"

    # 6. Barrios y Distritos
    elif any(k in t_lower for k in ["barrio", "distrito", "miraflores", "barranco", "san miguel", "magdalena", "surco", "jesús maría", "san borja", "barrios altos", "chaclacayo", "chosica"]):
        if "miraflores" in t_lower:
            alt_portada = "Malecón de Miraflores con áreas verdes sobre el acantilado frente al mar y parapentes volando"
            alt_int1 = "Paseantes y ciclistas disfrutando de la senda costera en el Parque del Amor de Miraflores"
            alt_int2 = "Parque Kennedy en Miraflores con cafeterías, puestos de libros y jardines floridos"
            slug_p = f"{slug}-portada-malecon-miraflores.webp"
            slug_i1 = f"{slug}-parque-del-amor-senderos.webp"
            slug_i2 = f"{slug}-parque-kennedy-vida-urbana.webp"
        elif "barranco" in t_lower:
            alt_portada = "Paseo peatonal de la Bajada de Baños en Barranco con casonas de colores y el mar al fondo"
            alt_int1 = "Entrada a galería de arte y café de especialidad en callejón tradicional de Barranco"
            alt_int2 = "Personas descansando en baranda del Puente de los Suspiros con vista a los jardines de Barranco"
            slug_p = f"{slug}-portada-bajada-de-banos.webp"
            slug_i1 = f"{slug}-galeria-cafe-barranco.webp"
            slug_i2 = f"{slug}-puente-de-los-suspiros-vista.webp"
        elif "magdalena" in t_lower:
            alt_portada = "Plaza de Armas de Magdalena del Mar con la cúpula de la iglesia y calles comerciales activas"
            alt_int1 = "Mercado municipal de Magdalena con puestos de frutas frescas, flores y panaderías de barrio"
            alt_int2 = "Vecinos descansando en bancas bajo la sombra de ficus en el parque principal de Magdalena"
            slug_p = f"{slug}-portada-plaza-magdalena-mar.webp"
            slug_i1 = f"{slug}-mercado-comercial-magdalena.webp"
            slug_i2 = f"{slug}-vecinos-parque-principal.webp"
        elif "barrios altos" in t_lower:
            alt_portada = "Calle tradicional de Barrios Altos en Lima con quintas históricas, balcones y vida vecinal"
            alt_int1 = "Zaguán con patio de losetas y macetas en casona residencial histórica de Barrios Altos"
            alt_int2 = "Vecinos conversando amablemente en la esquina de una bodega tradicional en Barrios Altos"
            slug_p = f"{slug}-portada-calle-barrios-altos.webp"
            slug_i1 = f"{slug}-zaguan-quinta-historica.webp"
            slug_i2 = f"{slug}-bodega-esquina-vecinos.webp"
        elif "san borja" in t_lower:
            alt_portada = "Parque de la Felicidad en San Borja con amplios jardines arbolados y senderos para caminatas"
            alt_int1 = "Vecinos trotando y montando bicicleta en circuito deportivo seguro de San Borja"
            alt_int2 = "Plaza del Cuartel General del Ejército con espacios cívicos y eventos culturales al aire libre"
            slug_p = f"{slug}-portada-parques-san-borja.webp"
            slug_i1 = f"{slug}-circuito-deportivo-trotar.webp"
            slug_i2 = f"{slug}-espacios-civicos-culturales.webp"
        else:
            alt_portada = "Avenida residencial y comercial representativa de distrito limeño con árboles y fachadas cuidadas"
            alt_int1 = "Arquitectura de casonas y plazas de barrio emblemáticas en distrito tradicional de Lima"
            alt_int2 = "Vida cotidiana de barrio con vecinos disfrutando de cafeterías locales y parques cuidados"
            slug_p = f"{slug}-portada-distrito-limeno.webp"
            slug_i1 = f"{slug}-arquitectura-barrio-casonas.webp"
            slug_i2 = f"{slug}-vecinos-parque-cafeteria.webp"

    # 7. Planes, Bienestar y Actividades
    elif any(k in t_lower for k in ["planes", "paseo", "adultos mayores", "bebés", "niños", "familia", "clubes", "serpar", "pantanos", "excursión", "fin de semana", "talleres"]):
        if "pantanos" in t_lower or "naturaleza" in t_lower:
            alt_portada = "Humedal protegido de Pantanos de Villa en Lima con lagunas serenas, totorales y aves silvestres"
            alt_int1 = "Visitante observando aves migratorias con binoculares desde torre mirador de madera en Chorrillos"
            alt_int2 = "Sendero de pasarelas de madera entre juncales en área natural protegida de Lima"
            slug_p = f"{slug}-portada-pantanos-de-villa.webp"
            slug_i1 = f"{slug}-observacion-aves-binoculares.webp"
            slug_i2 = f"{slug}-pasarela-juncales-humedal.webp"
        elif "clubes" in t_lower or "serpar" in t_lower:
            alt_portada = "Club metropolitano de SERPAR en Lima con piscinas recreativas, campos deportivos y áreas de picnic"
            alt_int1 = "Niños y jóvenes jugando fútbol en canchas de césped de club zonal de Lima"
            alt_int2 = "Familia compartiendo almuerzo de campo bajo pérgolas sombreadas en parque metropolitano"
            slug_p = f"{slug}-portada-club-metropolitano-serpar.webp"
            slug_i1 = f"{slug}-canchas-futbol-recreacion.webp"
            slug_i2 = f"{slug}-picnic-familiar-pergolas.webp"
        elif "adultos mayores" in t_lower or "accesibilidad" in t_lower:
            alt_portada = "Paseo accesible en parque de Lima con rampas niveladas, senderos lisos y bancas bajo pérgolas"
            alt_int1 = "Familia acompañando a abuela en parque plano con señalización podotáctil y barandas en Lima"
            alt_int2 = "Adultos mayores conversando plácidamente en bancas cómodas de jardín botánico municipal"
            slug_p = f"{slug}-portada-parque-accesible-paseo.webp"
            slug_i1 = f"{slug}-rampas-accesibilidad-familia.webp"
            slug_i2 = f"{slug}-adultos-mayores-bancas-jardin.webp"
        elif "niños" in t_lower or "bebés" in t_lower or "familia" in t_lower:
            alt_portada = "Parque infantil seguro en Lima con juegos modernos, zonas de césped y senderos para coches de bebé"
            alt_int1 = "Padres paseando con coche de bebé por camino plano y sombreado de parque residencial en Lima"
            alt_int2 = "Niños participando en dinámicas de juego libre y recreación en áreas verdes de la ciudad"
            slug_p = f"{slug}-portada-parque-infantil-familiar.webp"
            slug_i1 = f"{slug}-padres-coche-bebe-sendero.webp"
            slug_i2 = f"{slug}-ninos-juegos-areas-verdes.webp"
        else:
            alt_portada = "Parque metropolitano de Lima en fin de semana soleado con actividades recreativas y áreas de descanso"
            alt_int1 = "Persona consultando agenda de actividades culturales en parque urbano de Lima"
            alt_int2 = "Grupo de amigos reunidos en áreas verdes planificando recorrido de fin de semana en Lima"
            slug_p = f"{slug}-portada-fin-semana-parque.webp"
            slug_i1 = f"{slug}-agenda-cultural-parque.webp"
            slug_i2 = f"{slug}-amigos-reunion-areas-verdes.webp"

    # 8. Negocios Locales y Servicios B2B
    elif any(k in t_lower for k in ["negocios", "ficha", "whatsapp", "consultas", "reclamaciones", "reseñas", "promociones", "entrevista", "oficios"]):
        if "whatsapp" in t_lower or "consulta" in t_lower:
            alt_portada = "Emprendedor local en Lima respondiendo consultas de clientes en smartphone desde mostrador comercial"
            alt_int1 = "Pantalla móvil mostrando mensajes claros y profesionales de atención al cliente por WhatsApp Business"
            alt_int2 = "Mostrador de negocio de barrio donde se atiende con amabilidad a un cliente presencial en Lima"
            slug_p = f"{slug}-portada-atencion-whatsapp-negocio.webp"
            slug_i1 = f"{slug}-mensajes-atencion-cliente-movil.webp"
            slug_i2 = f"{slug}-mostrador-atencion-cliente.webp"
        elif "reclamaciones" in t_lower or "libro" in t_lower:
            alt_portada = "Mostrador de atención en negocio limeño con Libro de Reclamaciones oficial físico y código QR visible"
            alt_int1 = "Cliente y encargado de tienda revisando términos de garantía y comprobante de servicio con transparencia"
            alt_int2 = "Oficina de atención al consumidor orientando formalmente sobre derechos y deberes comerciales en Lima"
            slug_p = f"{slug}-portada-libro-reclamaciones-mostrador.webp"
            slug_i1 = f"{slug}-revision-garantias-comprobante.webp"
            slug_i2 = f"{slug}-atencion-consumidor-oficina.webp"
        elif "reseña" in t_lower or "promoción" in t_lower:
            alt_portada = "Tienda independiente en Lima con pizarra de promociones claras, vitrinas ordenadas y clientes satisfechos"
            alt_int1 = "Dueño de negocio actualizando información de servicios y valoraciones en laptop de oficina"
            alt_int2 = "Cliente satisfecho despidiéndose cordialmente del personal de tienda de barrio en Lima"
            slug_p = f"{slug}-portada-tienda-promociones-claras.webp"
            slug_i1 = f"{slug}-actualizacion-ficha-valoraciones.webp"
            slug_i2 = f"{slug}-cliente-satisfecho-tienda.webp"
        else:
            alt_portada = "Taller artesanal y negocio de barrio en Lima con mostrador ordenado y atención personalizada"
            alt_int1 = "Maestro de oficio organizando herramientas de trabajo y cotizaciones en taller de Lima"
            alt_int2 = "Interacción de confianza entre comerciante local y vecinos frecuentes del barrio en Lima"
            slug_p = f"{slug}-portada-taller-negocio-barrio.webp"
            slug_i1 = f"{slug}-herramientas-cotizaciones-taller.webp"
            slug_i2 = f"{slug}-comercio-local-vecinos-confianza.webp"

    # 9. Vida Práctica en Lima (Hogar, Mascotas, Servicios, Mantenimiento)
    else:
        if "mascota" in t_lower or "veterinaria" in t_lower or "guardería" in t_lower:
            alt_portada = "Clínica veterinaria luminosa en Lima con personal calificado y salas de espera acondicionadas para mascotas"
            alt_int1 = "Médica veterinaria examinando con cuidado a perro de compañía en consultorio limpio en Lima"
            alt_int2 = "Dueño recibiendo libreta de vacunas y recomendaciones de salud de su mascota en recepción"
            slug_p = f"{slug}-portada-clinica-veterinaria-lima.webp"
            slug_i1 = f"{slug}-examen-veterinario-perro.webp"
            slug_i2 = f"{slug}-libreta-vacunas-recepcion.webp"
        elif "mantenimiento" in t_lower or "pintura" in t_lower or "incidencia" in t_lower or "reunión" in t_lower:
            alt_portada = "Recepción de edificio residencial en Lima con panel de comunicados y oficina de administración"
            alt_int1 = "Técnico especialista revisando lista de verificación de mantenimiento y protecciones en departamento"
            alt_int2 = "Propietario y administrador supervisando trabajos de refacción terminados en áreas comunes"
            slug_p = f"{slug}-portada-administracion-edificio.webp"
            slug_i1 = f"{slug}-checklist-mantenimiento-tecnico.webp"
            slug_i2 = f"{slug}-supervision-trabajos-areas-comunes.webp"
        elif "impresión" in t_lower or "fotografía" in t_lower or "eventos" in t_lower:
            alt_portada = "Estudio de diseño e impresión gráfica en Lima con muestrarios de color y equipos de impresión de precisión"
            alt_int1 = "Diseñador gráfico revisando pruebas de color y calidad de papel bajo iluminación calibrada"
            alt_int2 = "Cliente acordando catálogo de entregables y formatos con fotógrafo profesional en Lima"
            slug_p = f"{slug}-portada-estudio-impresion-grafica.webp"
            slug_i1 = f"{slug}-pruebas-color-calidad-papel.webp"
            slug_i2 = f"{slug}-coordinacion-entregables-fotografo.webp"
        else:
            alt_portada = "Vivienda residencial en Lima con mantenimiento preventivo y entorno barrial cuidado"
            alt_int1 = "Usuario revisando presupuesto desglosado y constancia de garantía de servicio a domicilio"
            alt_int2 = "Técnico profesional entregando servicio residencial finalizado con hoja de conformidad firmada"
            slug_p = f"{slug}-portada-vivienda-servicios-hogar.webp"
            slug_i1 = f"{slug}-presupuesto-desglosado-garantia.webp"
            slug_i2 = f"{slug}-entrega-servicio-conformidad.webp"

    return {
        "alts": [
            clean_one_line(alt_portada),
            clean_one_line(alt_int1),
            clean_one_line(alt_int2)
        ],
        "slugs": [
            clean_one_line(slug_p),
            clean_one_line(slug_i1),
            clean_one_line(slug_i2)
        ]
    }

def main():
    with open(BANCO_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    with open(PROMPTS_PATH, "r", encoding="utf-8") as f:
        prompts = [l.strip() for l in f if l.strip()]
        
    articulos = data["articulos"][1:] # 179 articulos (TLB-002 a TLB-180)
    print(f"Procesando {len(articulos)} artículos...")
    print(f"Prompts leídos: {len(prompts)} (debe ser {len(articulos) * 3})")
    
    all_alts = []
    all_slugs = []
    mapping = []
    
    prompt_idx = 0
    roles = ["portada", "interna-01", "interna-02"]
    
    for art in articulos:
        names_data = generate_seo_names_for_article(art)
        alts = names_data["alts"]
        slug_names = names_data["slugs"]
        
        for r_i in range(3):
            line_no = prompt_idx + 1
            prompt_line = prompts[prompt_idx]
            alt_text = alts[r_i]
            slug_filename = slug_names[r_i]
            
            all_alts.append(alt_text)
            all_slugs.append(slug_filename)
            
            mapping.append({
                "line_number": line_no,
                "article_id": art["id"],
                "article_title": art["titulo"],
                "category": art["categoria"],
                "image_role": roles[r_i],
                "seo_filename": slug_filename,
                "seo_alt_text": alt_text,
                "prompt": prompt_line
            })
            
            prompt_idx += 1
            
    print(f"Total generados: {len(all_alts)} nombres de texto alt y {len(all_slugs)} slugs.")
    
    # 1. Guardar archivo .txt de Textos Alt SEO (renglón por renglón)
    with open(OUT_ALT_TXT, "w", encoding="utf-8") as f:
        for a in all_alts:
            f.write(a + "\n")
    print(f"Archivo de Textos Alt guardado en: {OUT_ALT_TXT}")
    
    # 2. Guardar archivo .txt de Nombres de Archivo Slugs (renglón por renglón)
    with open(OUT_SLUG_TXT, "w", encoding="utf-8") as f:
        for s in all_slugs:
            f.write(s + "\n")
    print(f"Archivo de Slugs guardado en: {OUT_SLUG_TXT}")
    
    # 3. Guardar archivo JSON con el mapeo completo
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    print(f"Archivo de Mapeo JSON guardado en: {OUT_JSON}")
    
    # Verificación de integridad
    with open(OUT_ALT_TXT, "r", encoding="utf-8") as f:
        v_lines = [l.strip() for l in f]
    print(f"\nVerificación de líneas en {OUT_ALT_TXT.name}: {len(v_lines)}")
    empty_lines = [i for i, l in enumerate(v_lines) if not l]
    if empty_lines:
        print(f"ERROR: {len(empty_lines)} líneas vacías detectadas.")
    else:
        print("CONFIRMADO: 0 líneas vacías. 100% renglón por renglón.")
        
    print("\nMuestra de las 3 primeras líneas (TLB-002):")
    for i in range(3):
        print(f"  [Línea {i+1}] {all_alts[i]}")
        print(f"           Archivo: {all_slugs[i]}")

if __name__ == "__main__":
    main()
