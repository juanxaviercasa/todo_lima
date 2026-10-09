-- =======================================================================
-- MIGRACIÓN DE CUMPLIMIENTO LEGAL, PROTECCIÓN DE DATOS Y WHATSAPP BUSINESS
-- Todo Lima (todolima.com) • Ley N° 32323 / Ley N° 29733 / Meta Policy
-- =======================================================================

-- 1. Contactos (Solo alimentado por contactos INBOUND o consentidos)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_e164 VARCHAR(30) UNIQUE NOT NULL,
    business_id VARCHAR(100) REFERENCES public.businesses(id) ON DELETE SET NULL,
    display_name VARCHAR(255),
    first_inbound_at TIMESTAMPTZ,
    last_inbound_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Registro de Consentimientos (Libro Mayor Inmutable / Audit Ledger)
CREATE TABLE IF NOT EXISTS public.consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    phone_e164 VARCHAR(30) NOT NULL,
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('whatsapp', 'web_form', 'in_person_qr', 'click_to_whatsapp_ad')),
    purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('service', 'marketing')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('granted', 'revoked')),
    source TEXT,
    evidence JSONB,
    legal_basis TEXT DEFAULT 'consentimiento_previo_ley_32323',
    captured_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    revoked_at TIMESTAMPTZ
);

-- 3. Lista de Supresión Global (Do-Not-Contact obligatorio para cero spam)
CREATE TABLE IF NOT EXISTS public.suppression_list (
    phone_e164 VARCHAR(30) PRIMARY KEY,
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('opt_out', 'complaint', 'blocked', 'legal_request', 'invalid')),
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Registro de Mensajes (Message Log & Auditoría de Envíos)
CREATE TABLE IF NOT EXISTS public.message_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    phone_e164 VARCHAR(30) NOT NULL,
    direction VARCHAR(20) NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    wa_message_id VARCHAR(100),
    template_name VARCHAR(100),
    category VARCHAR(50) CHECK (category IN ('service', 'utility', 'marketing', 'authentication')),
    status VARCHAR(50),
    error TEXT,
    sent_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Salud y Límites de la Cartera de WhatsApp (Meta Portfolio Health)
CREATE TABLE IF NOT EXISTS public.wa_account_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checked_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    quality_rating VARCHAR(30) DEFAULT 'GREEN', -- GREEN, YELLOW, RED
    messaging_limit_tier INT DEFAULT 250, -- 250, 2000, 10000, 100000
    notes TEXT
);

-- 6. Solicitudes de Derechos ARCO (Ley 29733)
CREATE TABLE IF NOT EXISTS public.data_subject_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(30) NOT NULL CHECK (type IN ('acceso', 'rectificacion', 'cancelacion', 'oposicion')),
    contact_info VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMPTZ
);

-- 7. Libro de Reclamaciones Virtual (Indecopi D.S. 011-2011-PCM)
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    correlativo SERIAL UNIQUE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('reclamo', 'queja')),
    consumer_data JSONB NOT NULL,
    detalle TEXT NOT NULL,
    pedido TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    respuesta TEXT,
    responded_at TIMESTAMPTZ
);

-- Índices para consultas de alta velocidad y validación previa a envíos
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON public.contacts (phone_e164);
CREATE INDEX IF NOT EXISTS idx_consent_phone_status ON public.consent_records (phone_e164, status);
CREATE INDEX IF NOT EXISTS idx_message_log_phone ON public.message_log (phone_e164);

-- Habilitar RLS estricto para proteger los datos personales
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppression_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wa_account_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_subject_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
