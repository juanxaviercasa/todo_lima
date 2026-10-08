-- ==============================================================================
-- TODO LIMA (todolima.com) — ESQUEMA RELACIONAL SEGURO PARA SUPABASE (POSTGRESQL)
-- ==============================================================================
-- Este script crea las tablas, índices, políticas de seguridad RLS (Row Level Security)
-- y vistas necesarias para separar la información pública del directorio de la
-- inteligencia comercial privada (prospección B2B y pitches de WhatsApp).
-- ==============================================================================

-- 1. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABLA: categories (Pública)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    niche VARCHAR(50) NOT NULL,
    query VARCHAR(200) NOT NULL,
    hero_hook TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- TABLA: businesses (Pública — Cara al Ciudadano y Visitante)
-- Contiene únicamente los datos que los usuarios de Lima deben consultar.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.businesses (
    id VARCHAR(100) PRIMARY KEY, -- Ej: 'biz_10' o UUID
    category_slug VARCHAR(100) REFERENCES public.categories(slug) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    address TEXT,
    district VARCHAR(100),
    phone_public VARCHAR(50),
    website_url TEXT,
    maps_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices de búsqueda pública
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category_slug);
CREATE INDEX IF NOT EXISTS idx_businesses_district ON public.businesses(district);
CREATE INDEX IF NOT EXISTS idx_businesses_rating ON public.businesses(rating DESC);

-- ==============================================================================
-- TABLA: leads_prospecting (100% PRIVADA — Inteligencia Comercial)
-- Contiene teléfonos móviles directos de los dueños, diagnósticos y prioridades.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leads_prospecting (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id VARCHAR(100) UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    mobile_phone_raw VARCHAR(50),
    mobile_phone_intl VARCHAR(50), -- Ej: '51925475034'
    is_mobile BOOLEAN DEFAULT FALSE,
    has_website BOOLEAN DEFAULT FALSE,
    web_audit_type VARCHAR(50), -- 'NO_WEBSITE', 'SOCIAL_ONLY', 'REDESIGN_WEBSITE', etc.
    web_audit_score INTEGER DEFAULT 0,
    web_audit_issues JSONB DEFAULT '[]'::jsonb,
    opportunity_status VARCHAR(50) DEFAULT 'NEEDS_WEBSITE',
    commercial_priority VARCHAR(20) DEFAULT 'MEDIUM', -- 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'
    sales_stage VARCHAR(50) DEFAULT 'LEAD', -- 'LEAD', 'PITCH_SENT', 'DEMO_VIEWED', 'NEGOTIATION', 'CLOSED', 'REJECTED'
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_priority ON public.leads_prospecting(commercial_priority);
CREATE INDEX IF NOT EXISTS idx_leads_sales_stage ON public.leads_prospecting(sales_stage);

-- ==============================================================================
-- TABLA: outreach_pitches (100% PRIVADA — Estrategia de Venta por WhatsApp)
-- Contiene los mensajes de venta redactados, guiones telefónicos y links demo.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.outreach_pitches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id VARCHAR(100) UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    suggested_subdomain VARCHAR(255),
    whatsapp_pitch TEXT NOT NULL,
    phone_script TEXT,
    demo_url TEXT,
    whatsapp_direct_url TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    last_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- TABLA: automation_jobs (100% PRIVADA — Cola de Tareas de Scraping y Auditoría)
-- Permite que el panel admin dispare ejecuciones y un worker las procese.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.automation_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_type VARCHAR(50) NOT NULL, -- 'SCRAPE_CATEGORY', 'RUN_AUDIT', 'GENERATE_PROTOTYPES'
    category_slug VARCHAR(100),
    status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'RUNNING', 'COMPLETED', 'FAILED'
    params JSONB DEFAULT '{}'::jsonb,
    results_summary JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.automation_jobs(status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) — BLINDAJE DE PRIVACIDAD
-- ==============================================================================

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads_prospecting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_jobs ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para 'categories' y 'businesses' (LECTURA PÚBLICA)
-- Cualquier visitante anónimo del directorio puede ver las categorías y negocios
CREATE POLICY "Acceso público de lectura a categorías"
    ON public.categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Acceso público de lectura a negocios del directorio"
    ON public.businesses FOR SELECT
    TO anon, authenticated
    USING (true);

-- 3. Políticas para 'leads_prospecting' (100% PRIVADA)
-- ÚNICAMENTE usuarios autenticados (admin logueado con Clerk/Supabase Auth)
-- o el service_role pueden ver o modificar los leads comerciales.
CREATE POLICY "Acceso exclusivo de administrador a leads comerciales"
    ON public.leads_prospecting FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Políticas para 'outreach_pitches' (100% PRIVADA)
CREATE POLICY "Acceso exclusivo de administrador a pitches de WhatsApp"
    ON public.outreach_pitches FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Políticas para 'automation_jobs' (100% PRIVADA)
CREATE POLICY "Acceso exclusivo de administrador a cola de tareas"
    ON public.automation_jobs FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- VISTA DE CONSULTA RÁPIDA PARA EL FRONTEND PÚBLICO
-- ==============================================================================
CREATE OR REPLACE VIEW public.v_public_directory AS
SELECT 
    b.id,
    b.name,
    b.rating,
    b.reviews_count,
    b.address,
    b.district,
    b.phone_public,
    b.website_url,
    b.maps_url,
    c.slug AS category_slug,
    c.title AS category_title,
    c.niche AS category_niche
FROM public.businesses b
JOIN public.categories c ON b.category_slug = c.slug;
