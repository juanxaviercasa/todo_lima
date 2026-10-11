import os
import json
import re
from datetime import datetime, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STAGING_DIR = os.path.join(ROOT, "staging", "editorial")
DATA_DIR = os.path.join(ROOT, "data", "blog")
LIB_DIR = os.path.join(ROOT, "lib")

os.makedirs(DATA_DIR, exist_ok=True)

# 1. Diccionario de corrección especializada SEO/GEO/AEO para los 54 artículos con templates genéricos
TAILORED_ALTS = {
    "TLB-007": {
        "portada": "Fachada e ingreso al Museo Central MUCEN del Banco Central de Reserva en el Centro Histórico de Lima, Perú",
        "interna-01": "Vitrina con piezas numismáticas, orfebrería y arte precolombino en salas de exhibición del MUCEN en Lima",
        "interna-02": "Visitantes apreciando colecciones de pintura y patrimonio cultural peruano en sala del MUCEN, Lima"
    },
    "TLB-014": {
        "portada": "Mostrador de atención turística y consulta de agencias registradas en Miraflores, Lima, Perú",
        "interna-01": "Turista verificando credenciales oficiales y directorio de prestadores turísticos autorizados en Lima",
        "interna-02": "Asesor turístico formal entregando itinerario y comprobante de reserva en oficina de Lima, Perú"
    },
    "TLB-023": {
        "portada": "Entorno residencial en Lima donde propietarios analizan presupuestos y condiciones de contratación",
        "interna-01": "Usuario comparando cotizaciones detalladas y cláusulas de garantía para servicios del hogar en Lima",
        "interna-02": "Reunión de coordinación entre cliente y contratista revisando especificaciones de obra en Lima"
    },
    "TLB-026": {
        "portada": "Vivienda residencial en San Borja, Lima, donde se planifican acuerdos y contratos de remodelación",
        "interna-01": "Contrato de obra y registro fotográfico de acuerdos de remodelación en departamento de Lima",
        "interna-02": "Supervisión técnica de avances con acta de entrega y conformidad de obra firmada en Lima"
    },
    "TLB-036": {
        "portada": "Sala de departamento en Miraflores, Lima, lista para mudanza con cajas organizadas de esenciales",
        "interna-01": "Caja de esenciales de mudanza con artículos de primera necesidad e higiene en vivienda de Lima",
        "interna-02": "Familia instalando artículos básicos durante su primer día en nueva residencia en Lima, Perú"
    },
    "TLB-042": {
        "portada": "Ingreso y recepción de edificio residencial multifamiliar con protocolo de seguridad en San Isidro, Lima",
        "interna-01": "Cuaderno de registro y control de ingreso de proveedores técnicos en conserjería de edificio en Lima",
        "interna-02": "Conserje coordinando acceso autorizado de personal técnico a áreas comunes en Lima"
    },
    "TLB-043": {
        "portada": "Panorámica histórica del valle del río Rímac y el damero de Pizarro en el Centro de Lima, Perú",
        "interna-01": "Documentos cartográficos y planos fundacionales de la ciudad virreinal en archivo histórico de Lima",
        "interna-02": "Plaza Mayor de Lima y entorno fundacional donde se estableció el Cabildo de Lima en 1535"
    },
    "TLB-044": {
        "portada": "Pareja de bailarines ejecutando marinera limeña con vestimenta tradicional y pañuelos en salón criollo",
        "interna-01": "Guitarrista y cajonero acompañando un vals criollo tradicional en peña cultural de Barranco, Lima",
        "interna-02": "Encuentro de música criolla con público disfrutando de marinera y jaranas en Lima, Perú"
    },
    "TLB-045": {
        "portada": "Puesto tradicional de dulces limeños exhibiendo porciones humeantes de combinado en el Centro de Lima",
        "interna-01": "Preparación artesanal de mazamorra morada con maíz morado y frutas secas en cocina tradicional de Lima",
        "interna-02": "Tazón de combinado de arroz con leche y mazamorra morada servido con canela molida en Lima"
    },
    "TLB-046": {
        "portada": "Familias y jóvenes disfrutando de un picnic sobre el césped en el parque El Olivar de San Isidro, Lima",
        "interna-01": "Cesta de picnic con aperitivos frescos y mantel sobre áreas verdes cuidadas en parque de Lima",
        "interna-02": "Visitantes respetando la señalización de convivencia y reciclaje durante picnic en parque de Lima"
    },
    "TLB-049": {
        "portada": "Monumento y arquitectura histórica virreinal conmemorativa de la Ciudad de los Reyes en Lima, Perú",
        "interna-01": "Grabado antiguo y escudo de armas virreinal otorgado a la Ciudad de los Reyes de Lima",
        "interna-02": "Detalle arquitectónico virreinal en balcón tallado de casona histórica en el Centro de Lima"
    },
    "TLB-050": {
        "portada": "Mural y centro cultural afroperuano conmemorando la tradición musical en La Victoria, Lima, Perú",
        "interna-01": "Percusionista profesional afinando un cajón afroperuano de madera en taller musical de Lima",
        "interna-02": "Ensamble comunitario interpretando festejo y danza afroperuana en espacio cultural de Lima"
    },
    "TLB-063": {
        "portada": "Complejo arqueológico y pirámides truncas de la cultura Ichma en el valle bajo de Lima, Perú",
        "interna-01": "Muros de tapia y adobes representativos de la arquitectura señorial Ichma en huaca de Lima",
        "interna-02": "Cerámica ceremonial y textiles polícromos Ichma en vitrina de museo arqueológico de Lima"
    },
    "TLB-072": {
        "portada": "Fieles con hábitos morados acompañando la procesión del Señor de los Milagros en calles de Lima",
        "interna-01": "Feligreses consultando el aplicativo móvil y ruta oficial de las andas del Señor de los Milagros en Lima",
        "interna-02": "Entorno del Santuario de Las Nazarenas durante los recorridos oficiales de octubre en Lima"
    },
    "TLB-074": {
        "portada": "Canchas de fútbol y fulbito de césped sintético iluminadas para partidos nocturnos en Lima, Perú",
        "interna-01": "Usuario reservando horario de cancha deportiva mediante plataforma digital en distrito de Lima",
        "interna-02": "Amigos equipados con indumentaria deportiva ingresando a campo de juego alquilado en Lima"
    },
    "TLB-076": {
        "portada": "Taller de ebanistería y carpintería con muestras de maderas finas y acabados en Villa El Salvador, Lima",
        "interna-01": "Plano de diseño técnico y catálogo de materiales para fabricación de muebles a medida en Lima",
        "interna-02": "Carpintero artesano tomando medidas milimétricas para mueble empotrado en vivienda de Lima"
    },
    "TLB-078": {
        "portada": "Fachada atractiva e iluminada de cafetería de barrio fotografiada profesionalmente en Miraflores, Lima",
        "interna-01": "Emprendedor utilizando cámara y trípode para capturar ángulos fieles del salón de su negocio en Lima",
        "interna-02": "Fotografía nítida del mostrador y productos de panadería local lista para ficha de Google en Lima"
    },
    "TLB-080": {
        "portada": "Peña criolla tradicional con guitarras y cajones celebrando el Día de la Canción Criolla en Barranco, Lima",
        "interna-01": "Cantantes criollos entonando valses y polkas con acompañamiento acústico en centro musical de Lima",
        "interna-02": "Público brindando con pisco sour durante espectáculo en vivo por el Día de la Canción Criolla en Lima"
    },
    "TLB-081": {
        "portada": "Plato servido de ají de gallina con crema de ají amarillo, aceituna botija, huevo duro y arroz en Lima",
        "interna-01": "Cocina tradicional deshilachando pechuga de gallina y preparando aderezo con pasta de ají amarillo en Lima",
        "interna-02": "Comensales degustando ají de gallina en mesa familiar de restaurante criollo en Lima, Perú"
    },
    "TLB-082": {
        "portada": "Complejo deportivo con canchas múltiples y gradas para torneos de aficionados en Surco, Lima",
        "interna-01": "Organizador anotando fixture de partidos y tabla de posiciones de torneo deportivo en Lima",
        "interna-02": "Equipos de amigos celebrando la premiación y entrega de trofeo tras torneo relámpago en Lima"
    },
    "TLB-084": {
        "portada": "Salón de exposición de cortinas, estores roller y telas blackout en tienda de decoración en Lima",
        "interna-01": "Muestrario de telas y mecanismos de estores siendo evaluados por clienta en tienda de Lima",
        "interna-02": "Instalador profesional tomando medidas de ventana para colocación de estores a medida en Lima"
    },
    "TLB-085": {
        "portada": "Vista de la Alameda de los Descalzos y convento virreinal en el distrito histórico del Rímac, Lima",
        "interna-01": "Casona solariega con balcones de celosía en calle tradicional de abajo el puente en el Rímac",
        "interna-02": "Paseo de Aguas iluminado con visitantes recorriendo senderos peatonales en el Rímac, Lima"
    },
    "TLB-086": {
        "portada": "Mapa interactivo y croquis de cobertura distrital publicado en vitrina de negocio local en Lima",
        "interna-01": "Dueña de tienda configurando zonas de reparto y mapa de envíos para clientes en Lima, Perú",
        "interna-02": "Repartidor en motocicleta entregando pedido con confirmación de dirección en San Miguel, Lima"
    },
    "TLB-087": {
        "portada": "Tramo empedrado y señalizado del Qhapaq Ñan camino inca costero conservado en los valles de Lima",
        "interna-01": "Panteón y muro de contención precolombino a lo largo de antigua calzada incaica en Lima",
        "interna-02": "Cartel informativo arqueológico sobre la red vial prehispánica del Qhapaq Ñan en Lima, Perú"
    },
    "TLB-090": {
        "portada": "Piscina recreativa y olímpica temperada con carriles y áreas verdes en club metropolitano de Lima",
        "interna-01": "Salvavidas e inspector revisando cartilla de parámetros de calidad de agua y cloro en piscina de Lima",
        "interna-02": "Bañistas y familias disfrutando responsablemente de piscina municipal en día soleado en Lima"
    },
    "TLB-092": {
        "portada": "Departamento remodelado en Surquillo, Lima, recibiendo servicio profesional de limpieza post-obra",
        "interna-01": "Equipo de operarios con aspiradoras industriales retirando polvo de yeso y pintura en Lima",
        "interna-02": "Pisos de porcelanato pulidos y ventanas impecables tras limpieza integral post-construcción en Lima"
    },
    "TLB-094": {
        "portada": "Vitrina comercial con horario de atención actualizado y código QR de contacto en Miraflores, Lima",
        "interna-01": "Administradora actualizando perfil de negocio en Google Maps y redes sociales en oficina de Lima",
        "interna-02": "Cliente verificando teléfono y horario abierto en puerta de negocio local en Lima, Perú"
    },
    "TLB-095": {
        "portada": "Canal histórico de regadío y acequia prehispánica Huatica en entorno urbano de San Isidro, Lima",
        "interna-01": "Muro de contención de canto rodado en acequia milenaria que abasteció los valles agrícolas de Lima",
        "interna-02": "Parque lineal moderno integrado sobre el cauce histórico de una acequia virreinal en Lima"
    },
    "TLB-096": {
        "portada": "Santuario y ermita de Santa Rosa de Lima con el pozo de los deseos en la avenida Tacna, Lima",
        "interna-01": "Visitantes depositando cartas de oración en el pozo de los deseos de Santa Rosa en Lima, Perú",
        "interna-02": "Jardines y reliquias históricas conservadas en el convento de Santa Rosa de Lima en el Centro"
    },
    "TLB-097": {
        "portada": "Fachada pintoresca de huarique gastronómico tradicional con comensales en mesa de barra en Lima",
        "interna-01": "Cocinero sirviendo porción generosa de plato criollo insignia en huarique de Surquillo, Lima",
        "interna-02": "Pizarra con menú del día y especialidades caseras en huarique escondido del Centro de Lima"
    },
    "TLB-098": {
        "portada": "Cabina de masajes y relajación con aromaterapia y toallas limpias en spa de San Isidro, Lima",
        "interna-01": "Ficha de consentimiento y consulta estética sin promesas médicas en recepción de spa en Lima",
        "interna-02": "Terapeuta especializada preparando aceites esenciales naturales para sesión de bienestar en Lima"
    },
    "TLB-100": {
        "portada": "Especialista en control de plagas con traje protector y atomizador en edificio residencial de Lima",
        "interna-01": "Constancia sanitaria y ficha técnica de químicos autorizados por DIGESA para fumigación en Lima",
        "interna-02": "Técnico explicando medidas de ventilación y reingreso seguro tras fumigación en departamento de Lima"
    },
    "TLB-102": {
        "portada": "Panel visible con preguntas frecuentes y políticas de servicio en entrada de local en Lima, Perú",
        "interna-01": "Sección web de preguntas frecuentes optimizada para atención rápida a clientes en Lima",
        "interna-02": "Recepcionista respondiendo dudas frecuentes de clientes por mensajería instantánea en Lima"
    },
    "TLB-110": {
        "portada": "Cartel promocional con términos y condiciones legibles en mostrador de tienda en San Borja, Lima",
        "interna-01": "Documento digital detallando vigencia y restricciones de promoción comercial en negocio de Lima",
        "interna-02": "Cliente revisando ticket con descuento aplicado conforme a términos de campaña en Lima"
    },
    "TLB-113": {
        "portada": "Cafetería de especialidad en Miraflores con conexión wifi rápida y mesas amplias para teletrabajo en Lima",
        "interna-01": "Profesional trabajando con laptop y taza de café filtrado peruano en cafetería tranquila de Lima",
        "interna-02": "Zona de enchufes y ambiente cómodo con buena iluminación natural para trabajo remoto en Lima"
    },
    "TLB-122": {
        "portada": "Calle iluminada concurrida con restaurantes y locales nocturnos en el pasaje San Ramón de Miraflores, Lima",
        "interna-01": "Grupo de personas planificando horario de transporte por aplicativo para regreso nocturno en Lima",
        "interna-02": "Paradero seguro y taxi autorizado recogiendo pasajeros tras salida nocturna en Lima, Perú"
    },
    "TLB-126": {
        "portada": "Oficina de asesoría tributaria y contable para mypes en el centro empresarial de San Isidro, Lima",
        "interna-01": "Ficha RUC digital de SUNAT y comparativa de persona natural con negocio vs SAC en Lima, Perú",
        "interna-02": "Contador explicando deberes tributarios y regímenes de renta a emprendedor en Lima"
    },
    "TLB-128": {
        "portada": "Marquesina iluminada del Teatro Segura con público ingresando a función en el Centro de Lima",
        "interna-01": "Cartelera teatral y programa de mano de obra en temporada cultural en teatro de Lima, Perú",
        "interna-02": "Espectadores acomodándose en butacas de teatro histórico antes de iniciar la función en Lima"
    },
    "TLB-132": {
        "portada": "Mostrador de lavandería por encargo con estanterías de prendas limpias clasificadas en Lince, Lima",
        "interna-01": "Inventario detallado y revisión de prendas delicadas con ticket de recepción en lavandería de Lima",
        "interna-02": "Entrega de ropa planchada y embolsada con ticket de control de calidad en lavandería de Lima"
    },
    "TLB-134": {
        "portada": "Oficina de plataforma de atención municipal para trámites de licencia de funcionamiento en Lima",
        "interna-01": "Inspector revisando requisitos de Inspección Técnica de Seguridad en Edificaciones ITSE en Lima",
        "interna-02": "Cartel oficial de licencia de funcionamiento y certificado ITSE exhibido en local de Lima"
    },
    "TLB-135": {
        "portada": "Vagón restaurado del tranvía histórico de Lima exhibido en el parque de Barranco, Lima, Perú",
        "interna-01": "Antiguos rieles y fotografías de archivo del tranvía eléctrico que conectaba Lima y Chorrillos",
        "interna-02": "Estación de Desamparados con andenes ferroviarios históricos en el Centro Histórico de Lima"
    },
    "TLB-136": {
        "portada": "Sala de lectura iluminada de la Biblioteca Nacional del Perú en San Borja, Lima, con usuarios investigando",
        "interna-01": "Catálogo bibliográfico digital y fichero histórico consultado por lector en biblioteca de Lima",
        "interna-02": "Estudiantes y lectores en módulos individuales de biblioteca pública municipal de Lima"
    },
    "TLB-137": {
        "portada": "Terraza gastronómica en azotea con vista panorámica a cúpulas coloniales en el Centro de Lima",
        "interna-01": "Comensales al aire libre disfrutando de piqueos peruanos al atardecer en terraza del Centro de Lima",
        "interna-02": "Mesa servida con cocteles criollos y platos típicos en terraza patrimonial de Lima, Perú"
    },
    "TLB-138": {
        "portada": "Humedal costero con pasarelas de madera y aves migratorias en los Pantanos de Villa, Chorrillos, Lima",
        "interna-01": "Observador de aves utilizando binoculares y guía ornitológica ilustrada en humedal de Lima",
        "interna-02": "Grupo de ecoturistas en mirador con guía naturalista identificando especies de aves en Lima"
    },
    "TLB-140": {
        "portada": "Pista de lavado de autos profesional con hidrolavadoras y espumado activo en Surco, Lima",
        "interna-01": "Hoja de inventario vehicular registrando estado exterior y pertenencias antes de car wash en Lima",
        "interna-02": "Técnico detallador aplicando cera protectora en carrocería de vehículo limpio en Lima"
    },
    "TLB-141": {
        "portada": "Acantilados y malecón de Chorrillos con vista al morro solar y playas del litoral limeño en Perú",
        "interna-01": "Senderos ecológicos entre totorales en los Pantanos de Villa en el distrito de Chorrillos, Lima",
        "interna-02": "Paseo peatonal por el muelle de pescadores y caleta artesanal de Chorrillos en Lima"
    },
    "TLB-142": {
        "portada": "Taller de artesanía textil y cerámica tradicional con maestro artesano trabajando en Lima, Perú",
        "interna-01": "Constancia oficial de inscripción en el Registro Nacional del Artesano RNA de MINCETUR en Lima",
        "interna-02": "Feria de artesanía formal con piezas peruanas certificadas en parque de Miraflores, Lima"
    },
    "TLB-144": {
        "portada": "Interior acogedor de librería independiente con estanterías de madera y novedades editoriales en Lima",
        "interna-01": "Lector hojeando libro de literatura peruana contemporánea en rincón de lectura en Barranco, Lima",
        "interna-02": "Mesa de recomendaciones literarias con publicaciones independientes en librería de Lima"
    },
    "TLB-147": {
        "portada": "Fachada imponente de la Casa de la Literatura Peruana en la antigua estación de Desamparados en Lima",
        "interna-01": "Sala de lectura Mario Vargas Llosa con visitantes leyendo poesía y narrativa peruana en Lima",
        "interna-02": "Exposición temática sobre autores peruanos con manuscritos y primeras ediciones en la Casa de la Literatura"
    },
    "TLB-148": {
        "portada": "Sillón de barbero clásico y espejo iluminado en barbería contemporánea de Magdalena, Lima",
        "interna-01": "Barbero profesional mostrando catálogo de cortes y acordando diseño con cliente en Lima",
        "interna-02": "Servicio de afeitado tradicional con toalla caliente y navaja en barbería de Lima, Perú"
    },
    "TLB-150": {
        "portada": "Guía oficial de turismo con credencial y distintivo oficial orientando a grupo en plaza de Lima",
        "interna-01": "Carnet oficial de Guía de Turismo emitido por DIRCETUR consultado en ventanilla de Lima",
        "interna-02": "Guía profesional explicando detalles arquitectónicos de convento virreinal en el Centro de Lima"
    },
    "TLB-162": {
        "portada": "Aula acústica de academia de música con piano, guitarras y atriles en San Isidro, Lima, Perú",
        "interna-01": "Profesor de música enseñando digitación y técnica de cuerdas a alumno en escuela de Lima",
        "interna-02": "Estudiantes practicando ensamble instrumental en sala de ensayo equipada en Lima"
    },
    "TLB-166": {
        "portada": "Mostrador comercial con código QR para dejar opiniones genuinas de clientes en San Miguel, Lima",
        "interna-01": "Pantalla móvil mostrando proceso transparente para redactar reseña verificada en Google en Lima",
        "interna-02": "Dueño de negocio respondiendo cordialmente a valoraciones de usuarios en plataforma de Lima"
    },
    "TLB-177": {
        "portada": "Mesa servida con menú gastronómico criollo completo y bebidas en restaurante del Centro de Lima",
        "interna-01": "Grupo de amigos planificando presupuesto y dividiendo cuenta con aplicación móvil en restaurante de Lima",
        "interna-02": "Comensales compartiendo piqueos y platos de fondo en almuerzo de fin de semana en Lima, Perú"
    }
}

# 2. Generación y auditoría de todos los 180 paquetes
all_posts_output = []
master_images_dict = {}

base_date = datetime(2026, 10, 10)
post_count = 0

print(f"\n=======================================================")
print(f"Iniciando recorrido e inyección SEO/GEO/AEO para los 180 posts...")
print(f"=======================================================\n")

for i in range(1, 181):
    pkg_id = f"TLB-{i:03d}"
    pkg_folder = os.path.join(STAGING_DIR, pkg_id)
    pkg_json_path = os.path.join(pkg_folder, "package.json")
    manifest_path = os.path.join(pkg_folder, "images", "manifest.json")

    if not os.path.exists(pkg_json_path) or not os.path.exists(manifest_path):
        print(f"[ERROR] No existe paquete: {pkg_id}")
        continue

    with open(pkg_json_path, "r", encoding="utf-8") as f:
        pkg_data = json.load(f)

    with open(manifest_path, "r", encoding="utf-8") as f:
        img_manifest = json.load(f)

    content = pkg_data["content"]
    title = content["title"]
    slug = content["slug"]
    category = content["category"]
    tags = content.get("tags", [])
    desc = content.get("description", "")

    # Fechas secuenciales de publicación retroactivas (1 por día o cada 1-2 días)
    pub_date = (base_date - timedelta(days=180 - i)).strftime("%Y-%m-%d")
    mod_date = "2026-10-10"

    content["published"] = pub_date
    content["modified"] = mod_date

    # Comprobar si este artículo tiene reemplazos personalizados
    tailored = TAILORED_ALTS.get(pkg_id, {})

    cover_id = None
    internal_ids = []

    for img_entry in img_manifest["manifest"]:
        role = img_entry["role"]
        img_id = img_entry["id"]

        # Asignar roles a los campos del artículo
        if role == "portada":
            cover_id = img_id
        elif role == "interna-01":
            internal_ids.append(img_id)
        elif role == "interna-02":
            internal_ids.append(img_id)

        # Determinar Alt Text definitivo
        current_alt = img_entry.get("alt", "").strip()

        if role in tailored:
            final_alt = tailored[role]
        else:
            final_alt = current_alt
            # Si no menciona Lima ni Perú, agregamos el anclaje GEO
            if "Lima" not in final_alt and "Perú" not in final_alt:
                final_alt = f"{final_alt} en Lima, Perú"

        # Generar caption editorial
        caption = f"{final_alt}. Perspectiva editorial contextual para Todo Lima."

        img_entry["alt"] = final_alt
        img_entry["caption"] = caption
        img_entry["status"] = "publicado_r2"

        # Agregar al diccionario maestro de imágenes
        master_images_dict[img_id] = {
            "src": f"/editorial/{img_id}.webp",
            "alt": final_alt,
            "caption": caption,
            "role": role,
            "article_id": pkg_id,
            "article_slug": slug
        }

    # Asegurar que content tenga cover y las dos internas
    content["cover"] = cover_id
    content["internal"] = internal_ids

    # Guardar package.json actualizado
    with open(pkg_json_path, "w", encoding="utf-8") as f:
        json.dump(pkg_data, f, indent=2, ensure_ascii=False)

    # Guardar manifest.json actualizado
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(img_manifest, f, indent=2, ensure_ascii=False)

    all_posts_output.append(content)
    post_count += 1

# Incluir las 6 imágenes prototipo históricas para compatibilidad hacia atrás
ORIGINAL_LEGACY = {
    "blog-centro-portada": {
        "src": "/images/editorial/blog-centro-portada.webp",
        "alt": "Patrimonio arquitectónico y calles históricas del Centro de Lima, Perú",
        "caption": "Patrimonio arquitectónico del Centro de Lima. Todo Lima."
    },
    "blog-centro-patrimonio": {
        "src": "/images/editorial/blog-centro-patrimonio.webp",
        "alt": "Balcones virreinales de celosía tallada en casonas del Centro Histórico de Lima, Perú",
        "caption": "Balcones virreinales en el Centro Histórico de Lima."
    },
    "blog-centro-recorrido": {
        "src": "/images/editorial/blog-centro-recorrido.webp",
        "alt": "Ciudadanos y visitantes en recorrido cultural por las plazas y jirones de Lima",
        "caption": "Recorrido peatonal cultural en Lima."
    },
    "blog-negocio-portada": {
        "src": "/images/editorial/blog-negocio-portada.webp",
        "alt": "Consumidores comparando información oficial de negocios en Lima, Perú",
        "caption": "Comparación informada de servicios en Lima."
    },
    "blog-negocio-cobertura": {
        "src": "/images/editorial/blog-negocio-cobertura.webp",
        "alt": "Consulta telefónica sobre distritos de cobertura para servicios en Lima",
        "caption": "Verificación de cobertura distrital en Lima."
    },
    "blog-negocio-condiciones": {
        "src": "/images/editorial/blog-negocio-condiciones.webp",
        "alt": "Documentación y notas de condiciones de garantía de servicios en Lima",
        "caption": "Revisión de garantías y condiciones en Lima."
    }
}

for k, v in ORIGINAL_LEGACY.items():
    if k not in master_images_dict:
        master_images_dict[k] = v

# 3. Guardar data/blog/images.json
images_json_path = os.path.join(DATA_DIR, "images.json")
with open(images_json_path, "w", encoding="utf-8") as f:
    json.dump(master_images_dict, f, indent=2, ensure_ascii=False)

# 4. Guardar staging/editorial/all-180-posts.json y data/blog/posts.json
all_posts_path = os.path.join(STAGING_DIR, "all-180-posts.json")
with open(all_posts_path, "w", encoding="utf-8") as f:
    json.dump(all_posts_output, f, indent=2, ensure_ascii=False)

prod_posts_path = os.path.join(DATA_DIR, "posts.json")
with open(prod_posts_path, "w", encoding="utf-8") as f:
    json.dump(all_posts_output, f, indent=2, ensure_ascii=False)

# 5. Extraer todos los tags únicos para actualizar lib/blogTaxonomy.js
all_unique_tags = {}
for p in all_posts_output:
    for t in p.get("tags", []):
        if t not in all_unique_tags:
            # Formatear nombre legible
            words = t.replace("-", " ").split()
            formatted = " ".join(w.capitalize() if len(w) > 3 or w == "atu" else w for w in words)
            formatted = formatted.replace("Atu", "ATU").replace("Itse", "ITSE").replace("Ruc", "RUC")
            all_unique_tags[t] = formatted

print(f"[OK] Total posts procesados y sincronizados: {post_count}")
print(f"[OK] Total imágenes en catálogo maestro: {len(master_images_dict)}")
print(f"[OK] Total tags únicos identificados: {len(all_unique_tags)}")
print(f"[OK] Guardado: {images_json_path}")
print(f"[OK] Guardado: {all_posts_path}")
print(f"[OK] Guardado: {prod_posts_path}")
