# 🛡️ Guía de Configuración: Backend, Clerk y Supabase para Todo Lima

Esta guía describe cómo conectar **Supabase** (Base de datos PostgreSQL con RLS) y **Clerk** (Autenticación privada) al ecosistema de Todo Lima.

---

## 1. Configuración de Supabase (Base de Datos)

### Paso 1: Crear Proyecto
1. Ingresa a [supabase.com](https://supabase.com) e inicia sesión.
2. Crea un nuevo proyecto llamado `todo-lima-db` (región sugerida: `South America (São Paulo)` o `US East`).
3. Guarda tu contraseña de base de datos.

### Paso 2: Ejecutar el Esquema SQL
1. En el panel de Supabase, ve a **SQL Editor** (en el menú lateral izquierdo).
2. Haz clic en **New query**.
3. Copia y pega todo el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql).
4. Haz clic en **Run**.
5. Las tablas `categories`, `businesses`, `leads_prospecting`, `outreach_pitches` y `automation_jobs` quedarán creadas con sus políticas de Row Level Security (RLS) activadas.

### Paso 3: Obtener Claves de API
En Supabase, ve a **Project Settings > API**:
- Copia la **Project URL**.
- Copia la **anon key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Copia la **service_role key** (`SUPABASE_SERVICE_ROLE_KEY` - ⚠️ *Nunca compartir, tiene acceso total*).

Añade estas variables a tu archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role
ADMIN_SECRET_KEY=tu_clave_secreta_admin
```

### Paso 4: Migrar Datos Existentes
Ejecuta el script automático para subir las 56 categorías y los negocios auditados:
```bash
npm install @supabase/supabase-js
node scripts/migrate-to-supabase.js
```

---

## 2. Configuración de Clerk (Autenticación para /admin)

### Paso 1: Crear Aplicación en Clerk
1. Ve a [clerk.com](https://clerk.com) y crea una aplicación llamada `Todo Lima Admin`.
2. Activa el inicio de sesión con **Google** y **Email/Password**.
3. En **User & Authentication > Restrictions**:
   - Activa el modo de acceso restringido para permitir únicamente tu correo personal (`cabel...` o `xavier...`).

### Paso 2: Instalar y Configurar en Next.js
Instala el paquete oficial:
```bash
npm install @clerk/nextjs
```

Añade las claves al archivo `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
```

### Paso 3: Envolver la Aplicación con `<ClerkProvider>`
En `app/layout.js`:
```jsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Paso 4: Proteger el Middleware
En `middleware.js`, reemplaza la validación temporal de clave por `clerkMiddleware`:
```javascript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    auth().protect();
  }
});
```

---

## 3. Acceso Inmediato al Panel Hoy Mismo

Mientras configuras las credenciales de Clerk y Supabase:
- El acceso público a `/auditoria` ha sido **completamente eliminado y redirigido**.
- El nuevo panel privado está activo en:
  👉 **`http://localhost:3000/admin?key=todolima2026`** (o en producción `todolima.com/admin?key=todolima2026`).
- Una vez que entras con la clave, se guarda una cookie segura en tu navegador durante 30 días para que puedas navegar libremente entre:
  * `/admin` (Dashboard)
  * `/admin/prospectos` (Pipeline de leads y WhatsApp)
  * `/admin/ejecuciones` (Control de scraping y auditorías)
- Cualquier persona ajena que intente entrar a `/admin` sin la clave recibirá un error **404 Not Found**, protegiendo tu negocio al 100%.
