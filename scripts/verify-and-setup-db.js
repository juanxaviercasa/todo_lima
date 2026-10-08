import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres.uhpekavdwcezyzzgsdnn:572814scxJ357@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

async function checkAndApply() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Conectando a Supabase PostgreSQL...');
    await client.connect();
    console.log('✅ Conexión establecida con éxito!');

    // 1. Listar tablas existentes
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('📋 Tablas existentes en public:', res.rows.map(r => r.table_name));

    // 2. Ejecutar DDL idempotente (con DROP POLICY IF EXISTS)
    console.log('⚙️ Aplicando esquema y políticas idempotentes...');
    const ddl = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

      CREATE TABLE IF NOT EXISTS public.businesses (
          id VARCHAR(100) PRIMARY KEY,
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

      CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category_slug);
      CREATE INDEX IF NOT EXISTS idx_businesses_district ON public.businesses(district);
      CREATE INDEX IF NOT EXISTS idx_businesses_rating ON public.businesses(rating DESC);

      CREATE TABLE IF NOT EXISTS public.leads_prospecting (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          business_id VARCHAR(100) UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
          mobile_phone_raw VARCHAR(50),
          mobile_phone_intl VARCHAR(50),
          is_mobile BOOLEAN DEFAULT FALSE,
          has_website BOOLEAN DEFAULT FALSE,
          web_audit_type VARCHAR(50),
          web_audit_score INTEGER DEFAULT 0,
          web_audit_issues JSONB DEFAULT '[]'::jsonb,
          opportunity_status VARCHAR(50) DEFAULT 'NEEDS_WEBSITE',
          commercial_priority VARCHAR(20) DEFAULT 'MEDIUM',
          sales_stage VARCHAR(50) DEFAULT 'LEAD',
          internal_notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_leads_priority ON public.leads_prospecting(commercial_priority);
      CREATE INDEX IF NOT EXISTS idx_leads_sales_stage ON public.leads_prospecting(sales_stage);

      CREATE TABLE IF NOT EXISTS public.outreach_pitches (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          business_id VARCHAR(100) REFERENCES public.businesses(id) ON DELETE CASCADE,
          suggested_subdomain VARCHAR(255),
          whatsapp_pitch TEXT NOT NULL,
          phone_script TEXT,
          demo_url TEXT,
          whatsapp_direct_url TEXT,
          sent_at TIMESTAMP WITH TIME ZONE,
          last_response TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS public.automation_jobs (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          task_type VARCHAR(50) NOT NULL,
          category_slug VARCHAR(100),
          status VARCHAR(20) DEFAULT 'PENDING',
          params JSONB DEFAULT '{}'::jsonb,
          results_summary JSONB DEFAULT '{}'::jsonb,
          error_message TEXT,
          started_at TIMESTAMP WITH TIME ZONE,
          completed_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.automation_jobs(status);

      ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.leads_prospecting ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.outreach_pitches ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.automation_jobs ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Acceso público de lectura a categorías" ON public.categories;
      CREATE POLICY "Acceso público de lectura a categorías"
          ON public.categories FOR SELECT TO anon, authenticated USING (true);

      DROP POLICY IF EXISTS "Acceso público de lectura a negocios del directorio" ON public.businesses;
      CREATE POLICY "Acceso público de lectura a negocios del directorio"
          ON public.businesses FOR SELECT TO anon, authenticated USING (true);

      DROP POLICY IF EXISTS "Acceso exclusivo de administrador a leads comerciales" ON public.leads_prospecting;
      CREATE POLICY "Acceso exclusivo de administrador a leads comerciales"
          ON public.leads_prospecting FOR ALL TO authenticated USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Acceso exclusivo de administrador a pitches de WhatsApp" ON public.outreach_pitches;
      CREATE POLICY "Acceso exclusivo de administrador a pitches de WhatsApp"
          ON public.outreach_pitches FOR ALL TO authenticated USING (true) WITH CHECK (true);

      DROP POLICY IF EXISTS "Acceso exclusivo de administrador a cola de tareas" ON public.automation_jobs;
      CREATE POLICY "Acceso exclusivo de administrador a cola de tareas"
          ON public.automation_jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);
    `;

    await client.query(ddl);
    console.log('✅ Esquema y políticas RLS verificados e instalados perfectamente!');

    const tablesAfter = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('🎯 Tablas verificadas en base de datos:', tablesAfter.rows.map(r => r.table_name));

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

checkAndApply();
