import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

// Leer DATABASE_URL de .env.local o fallback
let connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  const envPath = path.join(rootDir, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
    if (match) connectionString = match[1];
  }
}

if (!connectionString) {
  connectionString = 'postgresql://postgres.uhpekavdwcezyzzgsdnn:572814scxJ357@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
}

async function runMigration() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('⚡ Conectando a Supabase PostgreSQL para migración de cumplimiento...');
    await client.connect();
    console.log('✅ Conexión establecida.');

    const sqlPath = path.join(rootDir, 'supabase', 'migrations', '20261008_compliance_consent.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('📜 Ejecutando script SQL de cumplimiento normativo y consentimientos...');
    await client.query(sql);
    console.log('✅ Migración ejecutada con éxito.');

    // Verificar tablas creadas
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name IN ('contacts', 'consent_records', 'suppression_list', 'message_log', 'wa_account_health', 'data_subject_requests', 'complaints')
      ORDER BY table_name;
    `);

    console.log('\n📊 Tablas de Cumplimiento Verificadas en Supabase:');
    for (const row of tablesRes.rows) {
      console.log(`  • public.${row.table_name}`);
    }

  } catch (err) {
    console.error('❌ Error aplicando la migración:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
