import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhpekavdwcezyzzgsdnn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_t_lABd7P00vlDhGw7QwReA_439h1BCC';

/**
 * Cliente público de Supabase (usa la clave anónima / publicable)
 * Seguro para usar en el navegador y páginas públicas del directorio.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente administrativo de Supabase (usa service_role key)
 * SOLO debe ejecutarse en el servidor (Server Components, API routes, Server Actions).
 * Bypasea las políticas RLS para leer/escribir leads privados y cola de tareas.
 */
export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada en .env.local');
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
