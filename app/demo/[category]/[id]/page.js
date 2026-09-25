import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Building,
  Home,
  Check,
  ExternalLink,
  Search,
  Key,
  DollarSign
} from 'lucide-react';
import { generatePrototypeBlueprint } from '../../../../auditor/engine/prototypeGenerator.js';
import { extractDistrict, parsePhone } from '../../../../auditor/engine/districtExtractor.js';

export async function generateMetadata({ params }) {
  const { category, id } = params;
  const blueprintPath = path.join(process.cwd(), 'audits', 'prototypes', category, `${id}.json`);
  let name = 'Silvana Verano';
  let district = 'San Isidro';

  if (fs.existsSync(blueprintPath)) {
    try {
      const bp = JSON.parse(fs.readFileSync(blueprintPath, 'utf-8'));
      name = bp.displayName || bp.name;
      district = bp.district || district;
    } catch (e) {}
  }

  return {
    title: `${name} | Luxury Real Estate en ${district}, Lima`,
    description: `Asesoría inmobiliaria exclusiva, venta y alquiler de propiedades residenciales de alta gama en ${district} y Lima Top con contratos blindados y rigor notarial.`
  };
}

export default function DemoPrototypePage({ params }) {
  const { category, id } = params;
  
  // Intentar cargar blueprint pregenerado
  const blueprintPath = path.join(process.cwd(), 'audits', 'prototypes', category, `${id}.json`);
  let blueprint = null;

  if (fs.existsSync(blueprintPath)) {
    try {
      blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf-8'));
    } catch (e) {
      blueprint = null;
    }
  }

  // Fallback: Si no existe el archivo guardado, generarlo en caliente desde data/[category].json
  if (!blueprint) {
    const dataPath = path.join(process.cwd(), 'data', `${category}.json`);
    if (fs.existsSync(dataPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        const biz = (raw.businesses || []).find(b => b.id === id) || (raw.businesses || [])[0];
        if (biz) {
          const district = extractDistrict(biz.address);
          const phoneData = parsePhone(biz.phone);
          blueprint = generatePrototypeBlueprint(biz, category, district, phoneData);
        }
      } catch (err) {
        blueprint = null;
      }
    }
  }

  if (!blueprint) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Prototipo no encontrado</h1>
          <p className="text-slate-400 mb-6">No se encontraron datos para la categoría {category} e id {id}.</p>
          <Link href="/auditoria" className="bg-sky-500 hover:bg-sky-600 px-5 py-2.5 rounded-xl font-bold">
            Volver a la Auditoría
          </Link>
        </div>
      </div>
    );
  }

  const { 
    name, 
    displayName, 
    licenseNumber, 
    credentialTitle, 
    district, 
    address, 
    rating, 
    reviewsCount, 
    googleMapsUrl, 
    phoneData, 
    waLink, 
    services = [], 
    processSteps = [], 
    reviews = [], 
    portfolio = [], 
    faqs = [] 
  } = blueprint;

  // Iniciales para el imagotipo / monograma de lujo
  const initials = (displayName || name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase() || 'SV';

  // Imágenes personalizadas de alta resolución
  const isSilvana = id === 'biz_5' || name.toLowerCase().includes('silvana');
  const heroImg = isSilvana ? '/demo/silvana-verano/hero.jpg' : null;
  const portraitImg = isSilvana ? '/demo/silvana-verano/portrait.jpg' : null;
  const propertyImg = isSilvana ? '/demo/silvana-verano/property.jpg' : null;

  // Teléfono limpio
  const cleanPhone = phoneData?.raw || '999958372';
  const intlPhone = phoneData?.international || '51999958372';

  // Links rápidos a WhatsApp por intención de usuario
  const waBuyLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hola ${displayName} 👋, vi su cartera en ${district} y deseo consultar sobre departamentos o penthouses en venta.`)}`;
  const waSellLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hola ${displayName} 👋, tengo una propiedad en ${district} y deseo solicitar una tasación comercial para venta/alquiler.`)}`;
  const waRentLink = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hola ${displayName} 👋, busco asesoría para el alquiler de un inmueble residencial/corporativo en ${district}.`)}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1D20] font-sans antialiased selection:bg-[#C5A880] selection:text-white scroll-smooth">
      {/* Google Fonts Luxury Typography */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER EDITORIAL DE LUJO */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#EAE6DF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 border border-[#C5A880] bg-[#0A192F] flex items-center justify-center text-[#C5A880] font-serif font-black text-xl shadow-sm tracking-wider">
              {initials}
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0A192F] block leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {displayName ? displayName.toUpperCase() : 'SILVANA VERANO'}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C7A6B] mt-1 block">
                {credentialTitle || 'Agente Inmobiliario Registrado'} {licenseNumber ? `• ${licenseNumber}` : '• PN-11229-MVCS'}
              </span>
            </div>
          </div>

          {/* Menú de navegación principal con anclas exactas */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
            <a href="#propiedades" className="hover:text-[#0A192F] transition-colors">Propiedades</a>
            <a href="#servicios" className="hover:text-[#0A192F] transition-colors">Servicios</a>
            <a href="#trayectoria" className="hover:text-[#0A192F] transition-colors">Trayectoria</a>
            <a href="#metodologia" className="hover:text-[#0A192F] transition-colors">Metodología</a>
            <a href="#reseñas" className="hover:text-[#0A192F] transition-colors">Reseñas ({reviewsCount || 7})</a>
            <a href="#contacto" className="hover:text-[#0A192F] transition-colors">Contacto</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0A192F] hover:bg-[#132A4A] text-[#F4EBD9] font-medium text-xs sm:text-sm px-5 py-2.5 border border-[#C5A880] transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A880]" />
              <span className="hidden sm:inline">Contactar por WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION DE LUJO CON FOTOGRAFÍA GENERADA */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#0A192F]">
        {/* Fotografía de Fondo: Penthouse en San Isidro vista al Golf Club */}
        {heroImg ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            {/* Gradientes equilibrados para máxima legibilidad tipográfica */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/80 to-[#0A192F]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-black/30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#10223D] to-[#0A192F]" />
        )}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center sm:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C5A880]/15 border border-[#C5A880]/40 text-[#F4EBD9] text-xs uppercase tracking-widest font-semibold mb-6 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{district} • Miraflores • Lima Top</span>
          </div>

          <h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Propiedades Exclusivas & Asesoría Inmobiliaria de <span className="italic text-[#E5D5BA]">Alto Nivel</span> en Lima
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#D1D5DB] max-w-2xl leading-relaxed font-light">
            Venta, corretaje y tasación de residencias, penthouses y oficinas corporativas en las zonas más cotizadas de Lima. Máxima discreción, contratos blindados y acceso a inversionistas calificados.
          </p>

          {/* Badges de Autoridad: 5 ESTRELLAS EXACTAS DE GOOGLE (SIN DUPLICADOS) */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
            <a 
              href="#reseñas" 
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2 backdrop-blur-md transition-colors"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">{rating || '5.0'} en Google Maps</span>
              <span className="text-[#C5A880] font-medium">({reviewsCount || 7} opiniones verificadas)</span>
            </a>

            <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Registro Oficial:</span>
              <strong className="text-white font-mono">{licenseNumber || 'PN-11229-MVCS'}</strong>
            </div>
          </div>

          {/* CTAs de Conversión Inmediata */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#C5A880] hover:bg-[#b5976e] text-[#0A192F] font-bold text-sm px-8 py-4 transition-all flex items-center gap-2.5 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-[#0A192F]" />
              <span>Solicitar Asesoría por WhatsApp</span>
            </a>
            <a
              href="#propiedades"
              className="bg-transparent hover:bg-white/10 text-white font-medium text-sm px-7 py-4 border border-white/30 transition-all"
            >
              Ver Propiedades en Cartera
            </a>
          </div>
        </div>
      </section>

      {/* ACCIONES RÁPIDAS POR INTENCIÓN (COMPRAR / VENDER / ALQUILAR) */}
      <section className="bg-[#F3EFEA] border-b border-[#E2DDD3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={waBuyLink}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-5 border border-[#EAE6DF] hover:border-[#C5A880] hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#C5A880] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0A192F] group-hover:text-[#9A7B4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Deseo Comprar o Invertir
                </h4>
                <p className="text-xs text-[#718096] mt-1 font-light">
                  Accede a departamentos y penthouses seleccionados con plusvalía garantizada.
                </p>
                <span className="text-[11px] font-bold text-[#0A192F] mt-2 inline-flex items-center gap-1">
                  Ver opciones por WhatsApp <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                </span>
              </div>
            </a>

            <a
              href={waSellLink}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-5 border border-[#EAE6DF] hover:border-[#C5A880] hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#C5A880] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0A192F] group-hover:text-[#9A7B4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Deseo Vender mi Inmueble
                </h4>
                <p className="text-xs text-[#718096] mt-1 font-light">
                  Tasación comercial exacta, filtro de compradores solventes y contratos blindados.
                </p>
                <span className="text-[11px] font-bold text-[#0A192F] mt-2 inline-flex items-center gap-1">
                  Solicitar tasación gratuita <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                </span>
              </div>
            </a>

            <a
              href={waRentLink}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-5 border border-[#EAE6DF] hover:border-[#C5A880] hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#0A192F] text-[#C5A880] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0A192F] group-hover:text-[#9A7B4F] transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Alquiler Residencial / Corporativo
                </h4>
                <p className="text-xs text-[#718096] mt-1 font-light">
                  Inquilinos diplomáticos y corporativos calificados con cláusulas de desalojo notarial.
                </p>
                <span className="text-[11px] font-bold text-[#0A192F] mt-2 inline-flex items-center gap-1">
                  Coordinar alquiler por WhatsApp <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PERFIL / TRAYECTORIA */}
      <section id="trayectoria" className="py-24 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Foto de la Agente */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 bg-[#EFE9DF] -rotate-1 -z-10" />
                <div className="relative aspect-square overflow-hidden shadow-2xl border-4 border-white">
                  {portraitImg ? (
                    <img 
                      src={portraitImg} 
                      alt={`${displayName} Agente Inmobiliario Registrado`}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#10223D] flex items-center justify-center text-white text-4xl font-serif">{initials}</div>
                  )}
                </div>

                {/* Tarjeta flotante de acreditación oficial */}
                <div className="absolute -bottom-6 -right-4 sm:right-4 bg-[#0A192F] text-white p-4 shadow-xl border border-[#C5A880] max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880]">Acreditación Oficial MVCS</span>
                  </div>
                  <p className="text-xs font-mono text-slate-300">Registro N° {licenseNumber || 'PN-11229-MVCS'}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Ministerio de Vivienda, Construcción y Saneamiento</p>
                </div>
              </div>
            </div>

            {/* Texto y Biografía Comercial */}
            <div className="lg:col-span-7">
              <span className="text-[#9A7B4F] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
                Compromiso & Trayectoria Profesional
              </span>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0A192F] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "Mi prioridad es proteger el valor de tu patrimonio con rigor notarial y absoluta confidencialidad."
              </h2>

              <p className="mt-6 text-base text-[#4A5568] leading-relaxed font-light">
                Con base en {district} y cobertura en las zonas de mayor plusvalía de Lima, brindo una asesoría inmobiliaria integral que va más allá de la simple intermediación: diseño estrategias comerciales a la medida para propietarios que exigen cerrar operaciones seguras, al mejor valor de mercado y sin pérdidas de tiempo.
              </p>

              {/* 3 Pilares clave */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#EAE6DF]">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#0A192F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    5.0 / 5.0
                  </h4>
                  <p className="text-xs text-[#718096] mt-1 font-medium">{reviewsCount || 7} opiniones verificadas en Google Maps</p>
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#0A192F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    100% Blindado
                  </h4>
                  <p className="text-xs text-[#718096] mt-1 font-medium">Contratos elaborados con rigor notarial y legal</p>
                </div>

                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#0A192F]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Red VIP
                  </h4>
                  <p className="text-xs text-[#718096] mt-1 font-medium">Acceso directo a inversionistas calificados en Lima</p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0A192F] hover:text-[#9A7B4F] border-b-2 border-[#0A192F] pb-1 transition-colors"
                >
                  <span>Agendar una reunión personalizada en {district}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO DE PROPIEDADES DESTACADAS */}
      <section id="propiedades" className="py-24 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7B4F] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
              Cartera Exclusiva
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0A192F]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Propiedades Seleccionadas en {district}
            </h2>
            <p className="text-[#718096] text-sm mt-3 font-light">
              Inmuebles residenciales y corporativos seleccionados bajo estrictos estándares de ubicación, arquitectura y plusvalía.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Propiedad 1: Penthouse Panorámico */}
            <div className="bg-white border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                {heroImg ? (
                  <img 
                    src={heroImg} 
                    alt="Penthouse Panorámico Golf View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#10223D]" />
                )}
                <div className="absolute top-3 left-3 bg-[#C5A880] text-[#0A192F] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
                  Penthouse de Lujo
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-[#0A192F] text-xs font-bold px-3 py-1 shadow-md">
                  $890,000 USD
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold text-[#9A7B4F] flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3" />
                  Frente al Lima Golf Club, {district}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Penthouse Panorámico — Golf View
                </h3>
                <p className="text-xs text-[#718096] line-clamp-2 mb-4 font-light">
                  Vistas espectaculares de 360° al Golf, ventanales de piso a techo, ascensor directo y terraza con piscina privada.
                </p>

                <div className="flex items-center justify-between text-xs text-[#4A5568] py-3 border-y border-[#F0ECE1]">
                  <span>🛏️ 4 Suites</span>
                  <span>🚿 5 Baños</span>
                  <span>📐 360 m²</span>
                  <span>🚗 3 Cocheras</span>
                </div>

                <div className="mt-4 pt-2">
                  <a
                    href={`https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hola ${displayName}, deseo información y el dossier del Penthouse Panorámico Golf View ($890,000 USD).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-bold py-2.5 px-4 text-center block transition-colors"
                  >
                    Solicitar Dossier Completo por WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Propiedad 2: Boutique Residences Edificio Montero */}
            <div className="bg-white border border-[#EAE6DF] shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                {propertyImg ? (
                  <img 
                    src={propertyImg} 
                    alt="Boutique Residences Edificio Montero"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#10223D]" />
                )}
                <div className="absolute top-3 left-3 bg-[#0A192F] text-[#F4EBD9] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
                  En Venta Exclusiva
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-[#0A192F] text-xs font-bold px-3 py-1 shadow-md">
                  $480,000 USD
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold text-[#9A7B4F] flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3" />
                  {district} Tradicional
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Boutique Residences — Edificio Montero
                </h3>
                <p className="text-xs text-[#718096] line-clamp-2 mb-4 font-light">
                  Departamentos de estreno con terrazas ajardinadas, acabados en madera fina y mármol italiano.
                </p>

                <div className="flex items-center justify-between text-xs text-[#4A5568] py-3 border-y border-[#F0ECE1]">
                  <span>🛏️ 3 Dormitorios</span>
                  <span>🚿 3 Baños</span>
                  <span>📐 185 m²</span>
                  <span>🚗 2 Cocheras</span>
                </div>

                <div className="mt-4 pt-2">
                  <a
                    href={`https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hola ${displayName}, deseo información y el dossier de Boutique Residences Edificio Montero ($480,000 USD).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#0A192F] hover:bg-[#132A4A] text-white text-xs font-bold py-2.5 px-4 text-center block transition-colors"
                  >
                    Solicitar Dossier Completo por WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Captación de Propietarios */}
            <div className="bg-[#0A192F] text-white border border-[#C5A880]/30 p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/10 rounded-full blur-2xl" />

              <div>
                <span className="text-[#C5A880] text-[10px] font-bold uppercase tracking-[0.2em] block mb-3">
                  Para Propietarios en Lima
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  ¿Deseas Vender o Alquilar tu Propiedad en {district}?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                  Realizamos un estudio de mercado riguroso para tasar tu propiedad a precio comercial óptimo y la promovemos con discreción ante clientes e inversionistas precalificados.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Filtro financiero riguroso de compradores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Fotografía y video profesional de alta gama</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Gestión notarial completa hasta la entrega</span>
                  </li>
                </ul>
              </div>

              <div>
                <a
                  href={waSellLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#C5A880] hover:bg-[#b5976e] text-[#0A192F] text-xs font-bold py-3.5 px-4 text-center block transition-all shadow-md hover:shadow-xl"
                >
                  Solicitar Tasación Comercial Sin Costo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE SERVICIOS */}
      <section id="servicios" className="py-24 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#9A7B4F] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
                Nuestros Servicios
              </span>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0A192F]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Soluciones Inmobiliarias de Alto Nivel
              </h2>
            </div>
            <p className="text-[#718096] text-sm max-w-md font-light">
              Atención personalizada con respaldo legal y notarial en cada etapa de la compra, venta o alquiler de tu inmueble.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, idx) => (
              <div 
                key={idx}
                className="p-8 border border-[#EAE6DF] bg-[#FDFBF7] hover:border-[#C5A880] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-light text-[#C5A880] block mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#718096] leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F0ECE1]">
                  <a
                    href={`https://wa.me/${intlPhone}?text=${encodeURIComponent(`Hola ${displayName}, deseo consultar sobre el servicio de ${s.title} en ${district}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold uppercase tracking-wider text-[#0A192F] hover:text-[#9A7B4F] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Consultar por WhatsApp</span>
                    <ArrowRight className="w-3 h-3 text-[#C5A880]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METODOLOGÍA DE TRABAJO BLINDADO */}
      <section id="metodologia" className="py-24 bg-[#F7F5F0] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7B4F] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
              Seguridad & Eficiencia
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0A192F]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Cómo Trabajamos Cada Operación
            </h2>
            <p className="text-[#718096] text-sm mt-3 font-light">
              Protocolo riguroso en 4 pasos para proteger tu patrimonio y concretar transacciones seguras.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 border border-[#EAE6DF] shadow-sm relative">
                <span className="text-3xl font-serif font-black text-[#C5A880]/40 block mb-2">
                  {step.step || `0${idx + 1}`}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0A192F] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {step.title}
                </h3>
                <p className="text-xs text-[#718096] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE RESEÑAS VERIFICADAS DE GOOGLE MAPS (SHOWCASE COMPLETO) */}
      <section id="reseñas" className="py-24 bg-[#0A192F] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header de Reseñas: Resumen de Autoridad Google Maps */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-10 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-[#C5A880] text-xs uppercase tracking-widest font-semibold mb-4">
                <span>Opiniones Verificadas en Google Maps</span>
              </div>
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                La Confianza de Nuestros Clientes
              </h2>
              <p className="text-slate-300 text-sm mt-2 max-w-xl font-light">
                Comentarios y valoraciones públicas de familias, propietarios e inversionistas que cerraron operaciones con {displayName} en Lima.
              </p>
            </div>

            {/* Tarjeta de Resumen Google Maps con Link Directo */}
            <div className="bg-white/5 border border-white/15 p-6 backdrop-blur-md flex items-center gap-6 shrink-0">
              <div className="text-center pr-6 border-r border-white/10">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-white block leading-none">
                  {rating || '5.0'}
                </span>
                <div className="flex items-center justify-center gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 block">Calificación 5/5</span>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Basado en {reviewsCount || 7} reseñas</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Satisfacción
                </p>
                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-white mt-3 font-semibold underline underline-offset-4 transition-colors"
                  >
                    <span>Ver ficha en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Grid de Reseñas Verificadas de Google */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:border-[#C5A880]/50 hover:bg-white/[0.08] transition-all"
              >
                <div>
                  {/* Header de la Reseña */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C5A880] text-[#0A192F] font-bold flex items-center justify-center text-sm shadow">
                        {rev.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white leading-tight">{rev.author}</h4>
                        <span className="text-[10px] text-[#C5A880] block mt-0.5">{rev.badge || 'Local Guide • Google Maps'}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>

                  {/* Estrellas de Google */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Tag de Transacción */}
                  {rev.transaction && (
                    <span className="inline-block text-[10px] uppercase font-semibold tracking-wider text-[#E5D5BA] bg-white/5 px-2 py-0.5 mb-3 border border-white/10">
                      {rev.transaction}
                    </span>
                  )}

                  {/* Texto de la Reseña */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light italic">
                    "{rev.content}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{rev.role}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verificada
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA post-reseñas */}
          <div className="mt-14 text-center">
            <p className="text-sm text-slate-300 mb-4 font-light">
              ¿Listo para cerrar tu próxima operación inmobiliaria con total respaldo?
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#b5976e] text-[#0A192F] font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-all shadow-xl hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-[#0A192F]" />
              <span>Contactar a {displayName} por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQS) */}
      <section id="faqs" className="py-24 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#9A7B4F] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
              Transparencia Absoluta
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-normal text-[#0A192F]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Preguntas Frecuentes
            </h2>
            <p className="text-[#718096] text-sm mt-2 font-light">
              Respuestas claras sobre tasaciones, contratos exclusivos y procesos de compraventa.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div key={idx} className="p-6 border border-[#EAE6DF] bg-[#FDFBF7] hover:border-[#C5A880] transition-colors">
                <h4 className="font-serif text-lg font-bold text-[#0A192F] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {f.q}
                </h4>
                <p className="text-xs sm:text-sm text-[#718096] leading-relaxed font-light">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CORPORATIVO DE LUJO */}
      <footer id="contacto" className="bg-[#0A192F] text-white py-16 border-t border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {displayName ? displayName.toUpperCase() : 'SILVANA VERANO'}
              </span>
              <p className="text-xs text-[#C5A880] font-mono tracking-widest uppercase mb-4">
                {credentialTitle || 'Agente Inmobiliario Registrado'} {licenseNumber ? `• ${licenseNumber}` : '• PN-11229-MVCS'}
              </p>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Asesoría inmobiliaria boutique especializada en residencias de alta gama, penthouses y corretaje corporativo en Lima, Perú.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#C5A880] mb-4">Ubicación & Atención</h4>
              <p className="text-xs text-slate-300 flex items-start gap-2 mb-2 font-light">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{address}</span>
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2 mb-2 font-light">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Teléfono / WhatsApp: {cleanPhone}</span>
              </p>
              <p className="text-xs text-slate-300 flex items-center gap-2 font-light">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Lunes a Sábado: 9:00 AM - 7:00 PM</span>
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-[#C5A880] mb-4">Contacto Directo</h4>
              <p className="text-xs text-slate-400 font-light mb-4">
                Coordina una visita guiada o solicita la tasación comercial de tu inmueble directamente con {displayName}.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#b5976e] text-[#0A192F] text-xs font-bold py-3 px-5 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-[#0A192F]" />
                  <span>Escribir al WhatsApp Oficial</span>
                </a>
                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white py-2 border border-white/20 transition-colors"
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#C5A880]" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap justify-between items-center text-xs text-slate-400 font-light gap-4">
            <p>© {new Date().getFullYear()} {displayName}. Todos los derechos reservados.</p>
            <p>
              Ficha y Prototipo Digital Certificado por{' '}
              <a href="https://todolima.com" target="_blank" rel="noreferrer" className="text-[#C5A880] hover:underline font-medium">
                Todo Lima (todolima.com)
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE PERMANENTE DE WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">Contactar a {displayName ? displayName.split(' ')[0] : 'Silvana'}</span>
        </a>
      </div>
    </div>
  );
}
