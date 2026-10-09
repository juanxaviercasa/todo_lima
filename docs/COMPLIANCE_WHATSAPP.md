# Manual Operativo de Cumplimiento Normativo, Protección de Datos y WhatsApp Business Platform

> **Todo Lima (`todolima.com`)**  
> *Marco legal actualizado para Perú (Ley N° 32323 / Ley N° 29733) y Políticas Oficiales de Meta WhatsApp Business.*

---

## ⚠️ Aviso Legal Importante (Disclaimer)
*El presente documento describe la arquitectura técnica y operativa diseñada para Todo Lima con el fin de mitigar riesgos legales y cumplir con los estándares de la industria digital. No constituye asesoramiento legal formal. Se recomienda que el titular del proyecto someta las políticas finales y el registro del banco de datos a la revisión de un abogado especialista en derecho digital y protección al consumidor en el Perú.*

---

## 1. Marco Jurídico Peruano: El Fin del Contacto Comercial en Frío

### A. Ley N° 32323 (Modificación al Art. 58 del Código del Consumidor - Ley 29571)
Promulgada en mayo de 2025, esta norma endureció drásticamente las restricciones contra las comunicaciones comerciales no solicitadas:
* **Prohibición del primer contacto saliente:** Queda terminantemente prohibido utilizar centros de llamadas, llamadas telefónicas, SMS masivos, correos electrónicos masivos y **cualquier medio análogo (incluyendo WhatsApp)** para promover productos o servicios, a menos que el usuario haya contactado **primero por iniciativa propia** al proveedor.
* **Consentimiento previo, libre y explícito:** Solo es legal enviar publicidad si el cliente solicitó el contacto y autorizó de forma inequívoca el envío de información.
* **Revocatoria inmediata (Opt-Out):** El usuario puede revocar su consentimiento en cualquier momento sin necesidad de justificación.
* **Sanciones:** El incumplimiento constituye infracción muy grave sancionable por Indecopi con multas de hasta **450 UIT** (más de S/ 2,400,000).

### B. Ley N° 29733 (Protección de Datos Personales) y D.S. 016-2024-JUS
* **Finalidad y consentimiento:** Toda recolección y tratamiento de números telefónicos o datos personales requiere informar la finalidad y obtener consentimiento.
* **Registro de Bancos de Datos:** Es obligatorio inscribir el banco de datos personales de clientes/usuarios ante la Autoridad Nacional de Protección de Datos Personales (ANPD).
* **Derechos ARCO:** La plataforma debe contar con canales claros y gratuitos para que los titulares ejerzan sus derechos de Acceso, Rectificación, Cancelación y Oposición.

---

## 2. Políticas de WhatsApp Business Platform (Meta 2025-2026)

Meta aplica un riguroso sistema de protección al usuario para evitar el spam en WhatsApp:
1. **Límites por Cartera Comercial (Business Portfolio Limits):** Desde octubre de 2025, el límite de mensajes diarios iniciados por la empresa se gestiona a nivel de cartera, no por número individual:
   * **Tier 1:** 250 usuarios únicos cada 24 horas.
   * **Tier 2:** 2,000 usuarios únicos cada 24 horas.
   * **Tier 3:** 10,000 usuarios únicos cada 24 horas.
   * **Tier 4 / Unlimited:** 100,000+ usuarios únicos.
2. **Quality Rating (Calificación de Calidad):** Basada en los reportes de spam y bloqueos que hagan los usuarios:
   * 🟢 **Verde (Alta):** Permite escalar automáticamente de Tier si se utiliza más del 50% de la capacidad durante 7 días.
   * 🟡 **Amarillo (Media):** Bloquea la subida de Tier. Se deben pausar campañas de marketing.
   * 🔴 **Rojo (Baja):** Riesgo inminente de suspensión o degradación del número.
3. **Ventana de Atención (Customer Service Window):**
   * **24 Horas:** Tras el último mensaje enviado por un usuario, Todo Lima puede responder con mensajes de servicio libres sin costo de plantilla.
   * **72 Horas Gratuitas:** Si el usuario entra a través de un anuncio **Click-to-WhatsApp (CTWA)** o botón en Facebook/Instagram, la ventana se extiende a 72 horas sin costo por mensaje.
4. **Plantillas Oficiales (Templates):** Cualquier mensaje iniciado por Todo Lima fuera de la ventana de servicio DEBE usar una plantilla pre-aprobada por Meta categorizada como `UTILITY` o `MARKETING`, e incluir obligatoriamente pie de baja (*"Responde BAJA"*).

---

## 3. Estrategia Inbound-First de Todo Lima (Cero Riesgo de Penalización)

Para cumplir 100% con la ley peruana y las políticas de Meta, Todo Lima no realiza prospección en frío por WhatsApp sobre los 5,068 comercios indexados. El flujo está invertido: **el dueño nos contacta a nosotros**:

```mermaid
flowchart TD
    A[Comercio en Lima indexado en todolima.com] --> B[Ve su ficha pública]
    B --> C[Hace clic en: ¿Eres el dueño? Reclama tu ficha]
    C --> D[WhatsApp abre chat con mensaje prellenado y cláusula de consentimiento]
    D --> E[El dueño envía el mensaje a Todo Lima]
    E --> F[Webhook en Cloudflare registra contacto inbound y consentimiento legal]
    F --> G[Todo Lima entrega Diagnóstico 360° gratuito dentro de la ventana de servicio]
    G --> H[Conversación de alto valor y cierre comercial 100% legal]
```

### Canales de Adquisición Inbound Autorizados:
1. **Reclamo de Ficha en `todolima.com`:** Enlace en cada tarjeta de negocio con mensaje pre-redactado que contiene consentimiento explícito.
2. **Campañas Click-to-WhatsApp Ads:** Pauta publicitaria geolocalizada en Lima dirigida a profesionales y dueños de pymes. Al hacer clic, ellos inician la conversación.
3. **Visitas Presenciales y Tarjetas QR:** Escaneo físico del código QR en locales comerciales que abre el chat de reclamo oficial.
4. **Visibilidad en Motores de IA (AEO & GEO):** Usuarios que encuentran Todo Lima a través de búsquedas en ChatGPT, Perplexity o Google y solicitan servicios.

---

## 4. Arquitectura Técnica Implementada en el Código

| Componente | Archivo / Ubicación | Función |
| :--- | :--- | :--- |
| **Contacto Centralizado** | [`lib/contact.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/lib/contact.js) | Centraliza el número oficial (+51 961 277 467) y generadores de enlaces wa.me con opt-in explícito. |
| **Políticas y Reglas** | [`outreach/policy.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/outreach/policy.js) | Horarios permitidos (09:00 - 19:00 Lima, no domingos/feriados), palabras de baja (`BAJA`, `STOP`) y caps de frecuencia. |
| **Validador Determinístico** | [`outreach/compliance.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/outreach/compliance.js) | Función `canSend()` que evalúa si un mensaje es legal antes de enviarlo. |
| **Despachador Throttled** | [`outreach/queue.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/outreach/queue.js) | Despacho controlado con modo simulación (`WHATSAPP_DRY_RUN=true` por defecto). |
| **Plantillas Oficiales** | [`outreach/templates.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/outreach/templates.js) | Catálogo de plantillas para Meta con footer obligatorio de baja. |
| **Suite de Pruebas** | [`outreach/selftest.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/outreach/selftest.js) | 14 pruebas automáticas de cumplimiento (100% aprobadas). |
| **Webhook en Edge** | [`functions/api/whatsapp/webhook.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/functions/api/whatsapp/webhook.js) | Recepción de mensajes, captura de consentimientos y bajas automáticas en tiempo real. |
| **Endpoint de Baja** | [`functions/api/optout.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/functions/api/optout.js) | Incorpora números a la lista de supresión y revoca consentimientos. |
| **Libro Reclamaciones** | [`functions/api/reclamaciones.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/functions/api/reclamaciones.js) | Registra reclamos y quejas con correlativo oficial de Indecopi. |

---

## 5. Tablas en Supabase (`uhpekavdwcezyzzgsdnn`)

* `public.contacts`: Contactos que han iniciado comunicación previa con Todo Lima.
* `public.consent_records`: Libro mayor inmutable (*audit ledger*) de consentimientos otorgados y revocados, con evidencia de mensaje y fecha.
* `public.suppression_list`: Lista negra global de exclusión (*Do-Not-Contact*). Cualquier número aquí tiene bloqueo absoluto de envíos.
* `public.message_log`: Historial completo de mensajes entrantes y salientes para auditoría.
* `public.wa_account_health`: Registro del estado de salud de la línea en Meta.
* `public.data_subject_requests`: Solicitudes de derechos ARCO.
* `public.complaints`: Hojas de reclamación del Libro de Reclamaciones virtual.

---

## 6. Variables de Entorno Requeridas (.env.local / Cloudflare Pages)

```ini
# Base de datos Supabase
NEXT_PUBLIC_SUPABASE_URL=https://uhpekavdwcezyzzgsdnn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
DATABASE_URL=postgresql://postgres.uhpekavdwcezyzzgsdnn:...@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# WhatsApp Cloud API (Meta for Developers)
WHATSAPP_TOKEN=EAAG...
WHATSAPP_PHONE_NUMBER_ID=1092837465...
WHATSAPP_VERIFY_TOKEN=todolima_wa_verify_2026
WHATSAPP_APP_SECRET=a8b7c6d5...
WHATSAPP_API_VERSION=v21.0
WHATSAPP_DRY_RUN=true
```

---

## 7. Checklist de Acciones Legales para el Propietario

- [ ] **Completar datos de empresa:** Reemplazar los marcadores `[RAZÓN SOCIAL]`, `[RUC]`, `[DOMICILIO LEGAL]` en [`app/privacidad/page.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/app/privacidad/page.js), [`app/terminos/page.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/app/terminos/page.js) y [`app/libro-de-reclamaciones/page.js`](file:///c:/Users/cabel/Pictures/Todo_Lima/app/libro-de-reclamaciones/page.js).
- [ ] **Inscripción en la ANPD:** Registrar el banco de datos personales de usuarios y clientes ante el Registro Nacional de Protección de Datos Personales del Ministerio de Justicia.
- [ ] **Verificación de Empresa en Meta:** Completar la verificación del negocio en Meta Business Manager con el RUC y ficha RUC de la empresa para habilitar el incremento de tiers de mensajería (2,000+ usuarios/día).
- [ ] **Rotación de Contraseñas:** Asegurar que las contraseñas de base de datos se mantengan resguardadas exclusivamente en variables de entorno del servidor.
