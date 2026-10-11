#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de Prompts de Imágenes Editoriales para Todo Lima (Artículos TLB-002 a TLB-180)
Produce exactamente 537 prompts independientes (3 por artículo) en un archivo .txt plano,
un renglón por prompt, sin líneas vacías ni saltos internos.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANCO_PATH = ROOT / "docs" / "BANCO_EDITORIAL_180_TITULARES.json"
OUTPUT_TXT = ROOT / "docs" / "PROMPTS_IMAGENES_BLOG_179_ARTICULOS.txt"

def clean_text(t):
    return re.sub(r'\s+', ' ', t).strip()

def build_prompts_for_article(art):
    art_id = art["id"]
    titulo = art["titulo"]
    cat = art["categoria"]
    slug = art["slug_propuesto"]
    
    # Normalizar palabras clave del título
    t_lower = titulo.lower()
    
    # -------------------------------------------------------------
    # 1. IDENTIFICACIÓN TEMÁTICA ESPECÍFICA
    # -------------------------------------------------------------
    # Transporte y Movilidad
    if any(k in t_lower for k in ["transporte", "tarjetas", "rutas y alertas", "transbordos", "terminales", "aeropuerto", "ciclovías", "conducir", "taxis", "metropolitano", "corredor"]):
        if "tarjeta" in t_lower or "transbordo" in t_lower:
            scene_portada = "a modern bus transit station lobby in Lima, Peru, featuring sleek automated turnstiles with clean architectural glass and steel, two commuters seen in medium shot from the side in everyday attire, soft daylight streaming through station glass"
            scene_int1 = "sleek contactless fare validation turnstile in a modern transit station, glowing electronic scanner sensor, blurred station background with warm ambient light"
            scene_int2 = "passengers waiting comfortably along a covered platform of Lima's bus transit system, medium shot from behind showing commuters, clean platform perspective, bright soft morning light"
        elif "aeropuerto" in t_lower:
            scene_portada = "travelers with suitcases arriving at the modern departures terminal concourse of Jorge Chávez International Airport in Lima"
            scene_int1 = "traveler checking flight information display and transportation booking confirmation on a smartphone"
            scene_int2 = "curbside designated passenger pickup area outside the airport terminal with authorized taxis and signage"
        elif "terminales" in t_lower or "buses interprovinciales" in t_lower:
            scene_portada = "bustling interprovincial bus terminal concourse in Lima with passenger boarding gates and clean architectural high ceilings"
            scene_int1 = "modern departures concourse at a bus terminal in Lima, leather luggage suitcases waiting beside an elegant boarding gate, warm travel atmosphere"
            scene_int2 = "family boarding a long-distance coach bus under a high-ceiling transport terminal bay with evening lighting"
        elif "ciclovía" in t_lower or "bicicleta" in t_lower:
            scene_portada = "cyclists riding along a dedicated paved green bike lane overlooking the Pacific coast cliffs of Lima"
            scene_int1 = "cyclist adjusting helmet and checking a digital cycling route map on phone holder mounted on handlebars"
            scene_int2 = "tree-lined residential boulevard with cyclists, pedestrians, and bicycle parking racks in San Isidro"
        else:
            scene_portada = "busy urban transit corridor in Lima with organized bus lanes and city commuters navigating street crossings"
            scene_int1 = "commuter checking official traffic transit alerts and route schedules on a mobile app"
            scene_int2 = "orderly queue of passengers boarding a blue corridor transit bus at an urban station in Lima"

    # Gastronomía y Bebidas
    elif any(k in t_lower for k in ["gastronomía", "chifa", "nikkei", "ceviche", "sánguche", "chicharrón", "suspiro", "café", "restaurante", "postres", "anticuchos", "desayuno", "catering", "mercados", "tortas", "comida"]):
        if "chifa" in t_lower:
            scene_portada = "traditional Peruvian-Chinese chifa restaurant dining room in Lima with red lanterns, warm woodwork, and elegant sharing tables"
            scene_int1 = "chef stir-frying chaufa rice with dynamic flames rising from a traditional round wok, stainless steel kitchen background, warm golden lighting"
            scene_int2 = "multi-generational family gathered happily around a round dining table in a traditional Limeño chifa, steaming sharing bowls of chaufa and dim sum dishes, warm convivial atmosphere, natural conversational postures"
        elif "nikkei" in t_lower:
            scene_portada = "contemporary Nikkei culinary dining room in Lima blending Peruvian woodwork and minimalist Japanese aesthetics"
            scene_int1 = "sushi chef delicately plating fresh tiradito slices garnished with yellow chili emulsion on dark slate tableware"
            scene_int2 = "couple smiling and dining together at an open Nikkei sushi counter, elegant minimalist wooden table set with artisan ceramic plates of fresh tiradito and wine glasses, blurred modern restaurant interior"
        elif "ceviche" in t_lower:
            scene_portada = "vibrant coastal cevichería terrace in Lima with sea breeze and freshly prepared seafood plates on wooden tables"
            scene_int1 = "chef mixing fresh sea bass cubes, red onions, cilantro, and fresh lime juice in a stainless steel bowl"
            scene_int2 = "cheerful table of friends sharing a classic ceviche platter with sweet potato and Andean toasted cancha corn"
        elif "sánguche" in t_lower or "chicharrón" in t_lower:
            scene_portada = "historic breakfast sandwich parlor in Lima with display cases of roasted meats, fresh crispy rolls, and coffee"
            scene_int1 = "cook slicing freshly fried pork chicharrón and sweet potatoes to assemble a hearty breakfast bun"
            scene_int2 = "morning patrons enjoying crusty sandwiches and hot coffee at a wooden counter in Barranco"
        elif "café" in t_lower:
            scene_portada = "warm sunlit specialty coffee shop in Lima with exposed brick walls, indoor plants, and wooden communal tables"
            scene_int1 = "barista carefully pouring hot water from a gooseneck kettle over a ceramic v60 dripper with Peruvian coffee grounds"
            scene_int2 = "patron working peacefully with a laptop and ceramic mug next to a sunny cafe window overlooking a quiet street"
        elif "suspiro" in t_lower or "postre" in t_lower or "torta" in t_lower:
            scene_portada = "charming traditional Limeño pastry shop with glass showcases displaying classic Peruvian desserts and cakes"
            scene_int1 = "pastry chef garnishing delicate glasses of Suspiro a la Limeña with cinnamon and port wine meringue"
            scene_int2 = "afternoon tea table in a Lima courtyard with friends sampling traditional desserts and herbal teas"
        elif "anticucho" in t_lower:
            scene_portada = "traditional evening anticuchería grill courtyard in Lima with glowing charcoal embers and aromatic smoke"
            scene_int1 = "grill master brushing seasoned skewered beef heart with chili panca marinade over an open charcoal grill"
            scene_int2 = "lively outdoor dinner table enjoying skewers served with golden potato halves and rocoto sauce"
        else:
            scene_portada = "bustling traditional restaurant in Lima showcasing authentic Peruvian culinary dishes and warm hospitality"
            scene_int1 = "chef finishing a culinary plate presentation with vibrant fresh herbs and Peruvian chili sauces"
            scene_int2 = "guests reviewing a restaurant menu and consulting the server in a warm dining ambiance"

    # Lugares, Patrimonio, Museos y Huacas
    elif any(k in t_lower for k in ["huaca", "museo", "patrimonio", "plaza", "balcones", "casona", "jirón", "iglesia", "convento", "cementerio", "circuito mágico", "parque", "monumento", "arquitectura"]):
        if "huaca" in t_lower or "adobitos" in t_lower or "ichma" in t_lower:
            scene_portada = "Huaca Pucllana archaeological complex in Miraflores Lima, extensive terraced pre-Inca pyramid constructed of thousands of vertical handmade yellow adobe mud bricks, elevated wooden visitor walkway, contrasting Miraflores modern city buildings in the background, bright coastal Lima daylight"
            scene_int1 = "detailed close-up of ancestral handmade adobe bricks (adobitos) arranged vertically in authentic archaeological Lima culture wall technique, soft natural daylight"
            scene_int2 = "visitors walking peacefully along designated wooden observation paths listening to an interpretive guide at Huaca Pucllana, Miraflores city skyline in background"
        elif "pachacamac" in t_lower:
            scene_portada = "expansive desert sanctuary of Pachacamac with ancient temple ramparts and the Pacific Ocean horizon"
            scene_int1 = "visitors observing ancestral textiles and wooden idol artifacts inside the Pachacamac site museum"
            scene_int2 = "guided cultural group walking the elevated sandy trail leading to the Temple of the Sun overlooking the Lurín valley"
        elif "mucen" in t_lower or "museo" in t_lower:
            scene_portada = "grand exhibition gallery of a prestigious historic museum in downtown Lima with curated vitrines and vaulted ceilings"
            scene_int1 = "curator examining pre-Columbian gold metalwork and colonial paintings under museum conservation lighting"
            scene_int2 = "visitors exploring an interactive cultural gallery with interpretive wall texts in historic Lima"
        elif "balcones" in t_lower:
            scene_portada = "historic colonial street in Lima lined with ornate dark carved cedar enclosed wooden balconies overhanging sidewalks"
            scene_int1 = "architectural detail of intricate wooden latticework and carved panels of a viceregal balcony filtering sunlight"
            scene_int2 = "visitors and students sketching historic architectural facade details from a cobblestone pedestrian street"
        elif "plaza san martín" in t_lower or "plaza" in t_lower:
            scene_portada = "majestic Plaza San Martín in Lima with neoclassical white facades, grand bronze equestrian statue, and dusk streetlamps"
            scene_int1 = "architectural perspective of the historic colonnaded portals surrounding the plaza with warm evening light"
            scene_int2 = "people strolling peacefully across the polished stone square under tall swaying palm trees"
        elif "cementerio" in t_lower or "presbítero maestro" in t_lower:
            scene_portada = "historic neoclassical mausoleums and marble statues among tall cypress trees in Presbítero Maestro cemetery in Lima"
            scene_int1 = "restoration specialist examining an ornate sculpted marble monument with delicate historic motifs"
            scene_int2 = "cultural heritage walking tour group observing historical memorials along a quiet cobblestone avenue"
        elif "circuito mágico" in t_lower or "fuentes" in t_lower:
            scene_portada = "spectacular illuminated water fountains dancing with vibrant colorful lights in Parque de la Reserva in Lima"
            scene_int1 = "visitors walking through an illuminated walk-through tunnel of water fountain arches glowing with blue and green light"
            scene_int2 = "families gathered around a grand fountain plaza admiring water geysers choreographed to music"
        else:
            scene_portada = "majestic historic architectural landmark in Lima with preserved colonial and republican stone details"
            scene_int1 = "close-up of architectural carved stone ornaments and historic wooden doorway in Lima"
            scene_int2 = "visitors touring a preserved cultural heritage building in Lima accompanied by a docent"

    # Historia de Lima
    elif any(k in t_lower for k in ["historia", "independencia", "terremoto", "virreinato", "río rímac", "muralla", "expansión", "plan maestro", "fotografías antiguas", "agua en lima"]):
        if "muralla" in t_lower:
            scene_portada = "remnants of the historic 17th-century stone wall of Lima preserved at Parque de la Muralla alongside the Rímac river"
            scene_int1 = "historical cartographer and museum visitor examining a large antique drawn map of walled colonial Lima"
            scene_int2 = "visitors on an elevated park bridge observing preserved stone bastion foundations and gardens"
        elif "río rímac" in t_lower:
            scene_portada = "historic stone bridge Puente de Piedra spanning the Rímac river with colonial churches of Lima in the backdrop"
            scene_int1 = "archival engraving and vintage historical view of the riverbanks and colonial water canals feeding the founding city"
            scene_int2 = "pedestrians walking across the historic stone bridge looking out towards San Cristóbal hill"
        elif "terremoto" in t_lower or "reconstrucción" in t_lower:
            scene_portada = "historical reenactment scene of Lima's 18th-century reconstruction showing traditional quincha and timber buildings"
            scene_int1 = "architect inspecting traditional earthquake-resilient cane, mud, and timber (quincha) construction framing"
            scene_int2 = "urban planners in an exhibition room studying historical documentation of Lima's architectural evolution"
        elif "independencia" in t_lower:
            scene_portada = "historic Plaza Mayor of Lima dressed with red and white banners celebrating republican history and civic heritage"
            scene_int1 = "visitor observing original historical documents and proclamation broadsheets in a museum archive gallery"
            scene_int2 = "citizens and visitors participating in a commemorative historical walking tour in front of the Government Palace"
        elif "agua" in t_lower:
            scene_portada = "historic stone public water fountain and distribution aqueduct in a colonial square in Lima"
            scene_int1 = "exhibition display showing historical pipes and public water administration records of viceregal Lima"
            scene_int2 = "neighborhood square with children playing near a restored historical ornamental water fountain"
        else:
            scene_portada = "atmospheric panoramic historical view of central Lima blending colonial bell towers and republican streets"
            scene_int1 = "historian examining archival photographs and historical maps of old Lima under a library study lamp"
            scene_int2 = "cultural group engaged in a guided historical walk discovering hidden courtyards of the historic center"

    # Cultura, Tradiciones y Arte
    elif any(k in t_lower for k in ["cultura", "cajón", "señor de los milagros", "peña", "jarana", "música criolla", "arte urbano", "artesanía", "danza", "flor de amancaes", "ferias"]):
        if "señor de los milagros" in t_lower or "morado" in t_lower:
            scene_portada = "vast sea of devotees dressed in traditional purple tunics filling historic Lima streets during the October procession"
            scene_int1 = "delicate incense burners (sahumadoras) releasing fragrant white smoke before the silver and floral float"
            scene_int2 = "street stalls selling traditional turrón de Doña Pepa decorated with multicolored candies during the festival"
        elif "cajón" in t_lower or "peña" in t_lower or "jarana" in t_lower or "música" in t_lower:
            scene_portada = "vibrant cultural peña venue in Barranco with warm lighting, acoustic guitars, and traditional Peruvian cajón players"
            scene_int1 = "close-up of skilled hands playing rhythmic polyrhythmic beats on an authentic wooden Peruvian cajón"
            scene_int2 = "audience enjoying live traditional Afro-Peruvian and Criollo music in a friendly cultural salon"
        elif "arte urbano" in t_lower or "murales" in t_lower:
            scene_portada = "colorful, vibrant large-scale urban street mural depicting Peruvian cultural motifs on a public wall in Barranco"
            scene_int1 = "mural artist with paintbrushes and spray cans adding intricate cultural details to an outdoor wall painting"
            scene_int2 = "visitors walking along a sunlit pedestrian alley admiring contemporary street art and taking respectful photos"
        elif "artesanía" in t_lower:
            scene_portada = "bustling traditional artisan market in Lima with stalls of vibrant Andean textiles, ceramics, and carved gourds"
            scene_int1 = "artisan hand-painting intricate floral patterns on a traditional Ayacucho retablo wooden altar box"
            scene_int2 = "visitors admiring handmade jewelry and textiles while conversing with local craftspeople at a market stall"
        elif "danza" in t_lower:
            scene_portada = "performers in colorful traditional Peruvian costumes practicing the elegant marinera limeña dance with white handkerchiefs"
            scene_int1 = "dance instructor guiding students through traditional footwork and graceful posture in a wooden-floored studio"
            scene_int2 = "outdoor cultural festival performance with enthusiastic spectators clapping along to the rhythm"
        else:
            scene_portada = "celebratory cultural gathering in Lima featuring traditional arts, music, and community festival atmosphere"
            scene_int1 = "close-up of cultural instruments, artisan tools, and artistic materials in a Lima workshop"
            scene_int2 = "residents and visitors enjoying a weekend community cultural fair in a sunlit public plaza"

    # Barrios y Distritos
    elif any(k in t_lower for k in ["barrio", "distrito", "miraflores", "barranco", "san miguel", "magdalena", "surco", "jesús maría", "san borja", "barrios altos", "chaclacayo", "chosica"]):
        if "miraflores" in t_lower:
            scene_portada = "panoramic vista of Miraflores Malecón cliffside park with lush green lawns, paragliders in flight, and Pacific Ocean"
            scene_int1 = "pedestrians and cyclists enjoying the scenic boardwalk path next to coastal gardens and ocean lookouts"
            scene_int2 = "lively Parque Kennedy in Miraflores with street artists, blooming gardens, and bustling corner cafes"
        elif "barranco" in t_lower:
            scene_portada = "picturesque Bajada de Baños walkway in Barranco with rustic wooden bridge, flowering bougainvillea, and colorful casonas"
            scene_int1 = "quaint artisan craft boutique and gallery entrance situated along a cobblestone lane in Barranco"
            scene_int2 = "evening view of visitors resting on benches near the iconic Puente de los Suspiros with coastal breeze"
        elif "magdalena" in t_lower:
            scene_portada = "charming town square of Magdalena del Mar with the iconic Immaculate Heart church and lively market streets"
            scene_int1 = "traditional market stalls in Magdalena featuring fresh fruits, flowers, and local bakeries"
            scene_int2 = "residents and families gathering on plaza benches under shade trees during Sunday afternoon"
        elif "barrios altos" in t_lower:
            scene_portada = "historic streetscape of Barrios Altos with traditional quintas, republican facades, and vibrant neighborhood street life"
            scene_int1 = "ornate wooden doorway and wrought iron balcony of a historic quinta residence in Barrios Altos"
            scene_int2 = "neighbors conversing and greeting each other near a local corner bodega store in Barrios Altos"
        elif "san borja" in t_lower:
            scene_portada = "spacious green public park in San Borja with tree-lined jogging paths and modern cultural library buildings"
            scene_int1 = "citizens exercising and cycling peacefully on clean, designated district recreational paths"
            scene_int2 = "outdoor cultural amphitheater area in San Borja hosting an open-air community weekend event"
        else:
            scene_portada = "characteristic district streetscape in Lima showcasing local neighborhood identity, parks, and architecture"
            scene_int1 = "architectural details of historic houses and neighborhood plazas in an authentic district of Lima"
            scene_int2 = "local residents enjoying daily community life, sidewalk cafes, and neighborhood green spaces"

    # Planes, Bienestar y Actividades
    elif any(k in t_lower for k in ["planes", "paseo", "adultos mayores", "bebés", "niños", "familia", "clubes", "serpar", "pantanos", "excursión", "fin de semana", "talleres"]):
        if "pantanos" in t_lower or "naturaleza" in t_lower:
            scene_portada = "scenic view of Pantanos de Villa protected wetland in Lima with tranquil lagoons, tall bulrushes, and wading birds"
            scene_int1 = "nature observer using binoculars from a wooden birdwatching hide tower overlooking the water"
            scene_int2 = "family walking along the elevated wooden boardwalk trail through the coastal wetland reserve"
        elif "clubes" in t_lower or "serpar" in t_lower:
            scene_portada = "expansive municipal park club in Lima with swimming pools, vast green fields, and family picnic pavilions"
            scene_int1 = "children playing sports and games on well-maintained grass fields under shaded trees"
            scene_int2 = "family enjoying a relaxed weekend picnic lunch under wooden pergolas in a public green park"
        elif "adultos mayores" in t_lower or "accesibilidad" in t_lower:
            scene_portada = "accessible, level paved garden promenade in a Lima park with shaded benches and easy wheelchair access ramps"
            scene_int1 = "family helping senior grandparents comfortably navigate a gentle park walkway with clear signage"
            scene_int2 = "multigenerational family resting together in comfortable shaded chairs enjoying fresh outdoor air"
        elif "niños" in t_lower or "bebés" in t_lower or "familia" in t_lower:
            scene_portada = "cheerful, secure family park in Lima with modern playground equipment, grassy lawns, and shaded walking paths"
            scene_int1 = "parents with a baby stroller resting near a flower garden with clean accessible public amenities"
            scene_int2 = "happy parents and young children engaged in an interactive educational activity in a green space"
        else:
            scene_portada = "inviting weekend leisure setting in Lima with sunny skies, open lawns, and outdoor recreational spaces"
            scene_int1 = "person reviewing a cultural weekend agenda and event guide on a park bench"
            scene_int2 = "friends meeting outdoors in a public urban park in Lima planning their afternoon activities"

    # Negocios Locales y Servicios B2B / Vida Práctica
    elif any(k in t_lower for k in ["negocios", "ficha", "whatsapp", "consultas", "reclamaciones", "reseñas", "promociones", "entrevista", "oficios"]):
        if "whatsapp" in t_lower or "consulta" in t_lower:
            scene_portada = "professional local business owner in Lima attending client inquiries on a clean desk with smartphone and notepad"
            scene_int1 = "close-up of a mobile messaging interface showing clear, polite business responses and appointment confirmations"
            scene_int2 = "small business front counter where a store manager cordially assists a customer inquiring about local services"
        elif "reclamaciones" in t_lower or "libro" in t_lower:
            scene_portada = "orderly customer service counter in a Lima business with an official physical and digital Libro de Reclamaciones"
            scene_int1 = "organized customer reception desk in a modern Lima commercial office, professional laptop and clean wooden counter, warm corporate lighting"
            scene_int2 = "professional customer care desk in Lima ensuring clear communication and official regulatory compliance"
        elif "reseña" in t_lower or "promoción" in t_lower:
            scene_portada = "welcoming independent shopfront in Lima with clear promotion signage, tidy displays, and happy patrons"
            scene_int1 = "business owner working focused at a laptop on a clean wooden desk, coffee cup beside keyboard, sunny office window background"
            scene_int2 = "satisfied customer thanking the business staff outside an authentic neighborhood storefront"
        else:
            scene_portada = "thriving independent neighborhood business in Lima with artisan craftmanship and dedicated customer service"
            scene_int1 = "business owner organizing professional supplies, tools, and appointment logs in an organized workspace"
            scene_int2 = "friendly neighborhood interaction between a local merchant and long-time neighborhood residents"

    # Vida Práctica (Mantenimiento, Hogar, Mascotas, Coordinaciones)
    else:
        if "mascota" in t_lower or "veterinaria" in t_lower or "guardería" in t_lower:
            scene_portada = "bright, welcoming veterinary clinic and pet care center in Lima with friendly staff and clean consultation areas"
            scene_int1 = "veterinarian gently examining a calm healthy dog on a stainless steel examination table with owner present"
            scene_int2 = "tidy veterinary clinic reception area with pet wellness supplies neatly arranged on shelves, bright welcoming interior"
        elif "mantenimiento" in t_lower or "pintura" in t_lower or "incidencia" in t_lower or "reunión" in t_lower:
            scene_portada = "neat residential apartment building lobby in Lima with management noticeboard and building administration office"
            scene_int1 = "residential apartment corridor with freshly painted walls, professional renovation supplies neatly arranged, bright indoor daylight"
            scene_int2 = "resident and building supervisor in an apartment building lobby, clean entrance area, bright afternoon light"
        elif "impresión" in t_lower or "fotografía" in t_lower or "eventos" in t_lower:
            scene_portada = "professional graphic design and print studio in Lima with color sample swatches and precision printing machinery"
            scene_int1 = "technician examining sharp color proofs and print alignment under calibrated studio daylight lamps"
            scene_int2 = "client reviewing proof sheets and deliverables checklist with a professional photographer in a modern office"
        else:
            scene_portada = "modern, organized residential neighborhood in Lima with reliable domestic services and well-kept streets"
            scene_int1 = "organized home study desk in a residential Lima apartment, laptop and notebook, tidy living room background"
            scene_int2 = "friendly professional service specialist arriving at a modern apartment doorway with a clean tool kit, bright daylight"

    # -------------------------------------------------------------
    # 2. ENSAMBLAJE FINAL DE LOS 3 PROMPTS CON ENFOQUE FOTOGRÁFICO DE ALTA FIDELIDAD
    # (Sin 16:9 ya que se define en el pipeline de FLUX, y sin estilo ilustración)
    # -------------------------------------------------------------
    prompt_portada = (
        f"Authentic 35mm editorial documentary photography of {scene_portada}. "
        "Medium shot, elegant architectural perspective, crisp realistic details, natural soft daylight, "
        "subtle depth of field with gently blurred background, natural human proportions, "
        "clean architectural surfaces, no text, no letters, no words, no signs with writing, no logos, no watermarks."
    )
    
    prompt_int1 = (
        f"Detailed close-up documentary photography of {scene_int1}. "
        "Sharp focus on primary subject, realistic natural human hands with five distinct anatomical fingers, "
        "natural skin texture and relaxed grip, shallow depth of field with creamy bokeh, warm natural illumination, "
        "no text, no letters, no words, no signs with writing, no logos, no watermarks."
    )
    
    prompt_int2 = (
        f"Candid documentary photography of {scene_int2}. "
        "Authentic Lima atmosphere, medium shot, realistic human anatomy and natural relaxed postures, "
        "soft natural daylight, elegant depth of field with softly blurred background, "
        "clean architectural surroundings, no text, no letters, no words, no logos, no watermarks."
    )
    
    return [
        clean_text(prompt_portada),
        clean_text(prompt_int1),
        clean_text(prompt_int2)
    ]

def main():
    with open(BANCO_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    articulos = data["articulos"][1:] # Del TLB-002 al TLB-180 (179 artículos)
    total_arts = len(articulos)
    print(f"Procesando {total_arts} artículos (TLB-002 a TLB-180)...")
    
    all_prompts = []
    
    for art in articulos:
        prompts = build_prompts_for_article(art)
        if len(prompts) != 3:
            raise ValueError(f"Error en {art['id']}: no se generaron 3 prompts.")
        all_prompts.extend(prompts)
        
    print(f"Total de prompts generados: {len(all_prompts)} (debe ser {total_arts * 3})")
    
    # Escribir a archivo .txt renglón por renglón sin líneas vacías
    with open(OUTPUT_TXT, "w", encoding="utf-8") as f:
        for p in all_prompts:
            # Asegurar que no tenga saltos de línea internos
            p_single_line = p.replace("\r", " ").replace("\n", " ").strip()
            f.write(p_single_line + "\n")
            
    print(f"Archivo guardado exitosamente en: {OUTPUT_TXT}")
    
    # Verificación de integridad del archivo resultante
    with open(OUTPUT_TXT, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f]
        
    print(f"Verificación de líneas en el archivo: {len(lines)}")
    empty_lines = [i for i, l in enumerate(lines) if not l]
    if empty_lines:
        print(f"ADVERTENCIA: Se encontraron {len(empty_lines)} líneas vacías en los índices: {empty_lines[:5]}")
    else:
        print("CONFIRMADO: 0 líneas vacías. 100% renglón por renglón.")
        
    print("\nEjemplo primeras 3 líneas (TLB-002):")
    for i in range(3):
        print(f"[{i+1}] {lines[i][:110]}...")

if __name__ == "__main__":
    main()
