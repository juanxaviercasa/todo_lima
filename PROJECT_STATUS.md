# ESTADO DEL PROYECTO: TODO LIMA (todolima.com)
> **Fecha de guardado:** 08 de Septiembre de 2026  
> **Repositorio Oficial:** [https://github.com/juanxaviercasa/todo_lima.git](https://github.com/juanxaviercasa/todo_lima.git)  
> **Rama Principal:** `main`

---

## 📌 Resumen Ejecutivo
Red masiva de directorios locales hiperespecializados para Lima, Perú (`todolima.com`), diseñada para operar bajo subdominios comodín (ej. `doctores.todolima.com`, `dentistas.todolima.com`, `cerrajeros.todolima.com`) con una única base de código Next.js alojada en Vercel/Cloudflare, alimentada de forma continua por un robot de scraping en Playwright corriendo 24/7 en máquina local.

---

## 🏗️ Arquitectura Implementada

### 1. Frontend Multi-Inquilino (Next.js 14 App Router + Tailwind CSS)
- **`middleware.js`:** Intercepta cualquier subdominio (`*.todolima.com` o `*.localhost:3000`) y reescribe la petición internamente a la ruta dinámica `app/[subdomain]/page.js`.
- **`app/page.js`:** Portal central del dominio raíz (`todolima.com`) que lista todas las categorías y muestra en tiempo real cuáles ya tienen su Top 10 listo.
- **`app/[subdomain]/page.js`:** Plantilla de alta conversión con copy persuasivo estilo **Go High Level**:
  - Héroe de autoridad con distintivo de auditoría Google Maps 2026.
  - Fichas de negocios ordenadas por reputación ponderada con botones de llamada telefónica directa y **enlace a WhatsApp preconfigurado** (`wa.me/51...`).
  - Módulos de reducción de fricción, FAQs dinámicos y llamada a la acción para captación de negocios locales.
- **`lib/getData.js`:** Capa de lectura de archivos JSON planos en `data/[subdomain].json`.

### 2. Motor de Automatización & Scraping 24/7 (Playwright)
- **`scraper/scrape-category.js`:** Extractor robusto de Google Maps en modo *headless*, con evasión de consentimiento de cookies, scroll progresivo del feed, extracción profunda por ficha (nombre, estrellas, reseñas, dirección, teléfono, web y coordenadas) y sanitización de caracteres Unicode.
- **`scraper/config/categories.js`:** Matriz maestra de categorías categorizadas por nicho (salud, hogar, legal, automotriz, belleza, tecnología, eventos).
- **`scraper/utils/gitSync.js`:** Módulo de sincronización automática con Git. Al completar cada categoría, realiza `git add`, `git commit` y `git push origin main` para detonar el despliegue automático en Vercel.
- **`scraper/runner.js`:** Orquestador maestro 24/7 con jitter aleatorio (6 a 14s) anti-bloqueo, control de estado persistente (`scraper/state.json`) y tolerancia a fallos.

---

## ✅ Progreso y Fases Completadas

| Fase | Descripción | Estado |
| :--- | :--- | :--- |
| **Fase 1** | Script base Playwright con extracción profunda y guardado en JSON (`data/doctores.json`) | **Completado** |
| **Fase 2** | Matriz de categorías, control de estado (`state.json`), GitSync automático y orquestador maestro (`runner.js`) | **Completado** |
| **Fase 3** | App Next.js 14, middleware comodín, plantillas persuasivas GHL, componentes y compilación de producción verificada (`next build`) | **Completado** |
| **Fase 4** | Vinculación y push al repositorio remoto en GitHub (`juanxaviercasa/todo_lima`) | **Completado** |

### Categorías con Datos Extraídos y Verificados en GitHub
1. `doctores` (`data/doctores.json`) - Top 10 médicos especialistas.
2. `dentistas` (`data/dentistas.json`) - Top 10 clínicas dentales.
3. `cerrajeros` (`data/cerrajeros.json`) - Top 10 cerrajerías de emergencia 24h.

---

## 🚀 Próximos Pasos Inmediatos para Continuar

Al retomar el trabajo, estos son los pasos a seguir:

1. **Despliegue en Vercel:**
   - Importar `https://github.com/juanxaviercasa/todo_lima.git` en Vercel (Next.js preset).
   - En **Settings > Domains**, vincular `todolima.com` y el comodín `*.todolima.com`.
2. **Configuración de DNS Comodín:**
   - Configurar en el proveedor de dominio:
     - `A` -> `@` -> `76.76.21.21`
     - `CNAME` -> `*` -> `cname.vercel-dns.com`
3. **Expansión de la Matriz:**
   - Ampliar `scraper/config/categories.js` de las 38 categorías base actuales hasta la lista completa de 170+.
4. **Activación de la Automatización Masiva:**
   - Iniciar el orquestador desatendido: `npm run runner:loop` (o en segundo plano con PM2) para que procese y publique automáticamente todas las categorías restantes.

---

## 💻 Atajos de Comandos Útiles

```bash
# Iniciar servidor web de desarrollo
npm run dev

# Ejecutar una categoría puntual y subirla a GitHub
node scraper/runner.js --slug veterinarias

# Ejecutar un lote de prueba (ej. 3 categorías)
npm run runner:batch

# Iniciar bucle desatendido 24/7
npm run runner:loop

# Compilar para producción
npm run build
```
