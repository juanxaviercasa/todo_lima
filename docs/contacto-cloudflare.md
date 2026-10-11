# Formulario de contacto: Cloudflare Pages

La página `/contacto` envía a la función de Pages `/api/contacto`, no a un servidor de otro proveedor. El destinatario está fijado a `contacto@todolima.com`; el correo del visitante se usa como `reply_to`. El asunto incluye motivo y referencia; el cuerpo organiza los datos de la consulta. No suscribe a publicidad.

Para activar el envío, configurar en los secretos de Cloudflare Pages:

- `CLOUDFLARE_ACCOUNT_ID`: identificador de la cuenta.
- `CLOUDFLARE_EMAIL_API_TOKEN`: token privado con permiso de envío de Cloudflare Email Sending.
- `CONTACT_FROM_EMAIL`: remitente autorizado por Email Sending; por defecto `contacto@todolima.com`.

Tener un alias receptor en Email Routing no habilita automáticamente Email Sending. Autorizar el dominio/remitente y habilitar el servicio de envío según https://developers.cloudflare.com/email-service/api/send-emails/rest-api/ . Nunca incluir el token en código ni variables públicas.

El formulario solo confirma éxito si Cloudflare acepta el destinatario como entregado o en cola. Sin configuración devuelve 503 y ofrece el correo directo. Incluye validación, consentimiento, honeypot, tamaño máximo y límite por IP por instancia. Este límite no sustituye protección distribuida; configurar reglas de seguridad de Cloudflare si hay abuso.

Prueba final con secretos: enviar una consulta real desde el sitio, comprobar recepción, referencia y respuesta al remitente. No se ha realizado envío real sin credenciales.
