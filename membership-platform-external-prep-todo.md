# Membership Platform External Prep TODO

## 1. Dominio y entornos

- [x] 1.1 Confirmar que el dominio principal de la web es `grupoalfa.net` y listar subdominios que podremos usar para auth, emails y entornos.
- [x] 1.2 Decidir nombres de entornos al menos para `development`, `staging` y `production`.
- [x] 1.3 Confirmar qué URLs públicas existirán para callbacks, webhooks y login en cada entorno.

Notas confirmadas:
- Dominio principal: `grupoalfa.net`.
- Entorno local/development: `http://localhost:4321`.
- Entorno demo cliente: `https://<nombre-del-proyecto>.vercel.app`, usando la URL de Production del nuevo proyecto Vercel sin dominio propio.
- Entorno staging: `https://staging.grupoalfa.net`.
- Entorno production: `https://grupoalfa.net`.
- Dominio de email: `updates.grupoalfa.net`.
- URLs de login: `/sign-in`, `/sign-up`, `/join`.
- Endpoint de webhook Stripe por entorno: `/api/stripe-webhook`.
- Rama recomendada para la demo cliente: `client-demo`, configurada como Production Branch del nuevo proyecto Vercel.

## 2. Clerk

- [x] 2.1 Crear o confirmar la cuenta de Clerk del proyecto.
- [x] 2.2 Crear la aplicación de Clerk para la membership platform.
- [x] 2.3 Configurar métodos iniciales de acceso: `email + password` y `magic link`.
- [x] 2.4 Confirmar que `Google login` queda fuera de la primera release.
- [x] 2.5 Configurar dominios y redirect URLs para `grupoalfa.net` y los entornos no productivos.
- [x] 2.6 Recoger `PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY` para cada entorno.
- [ ] 2.7 Validar la estrategia minima de metadata en Clerk con el equipo:
  - `membershipStatus`
  - `membershipType`
  - `organizationCode`
  - `referrerMemberId` o equivalente, solo si se activa atribucion/recompensa de referrals
  - `stripeCustomerId`
  - `stripeSubscriptionId`

Notas para 2.5:
- Local/development: `http://localhost:4321/sign-in`, `http://localhost:4321/sign-up`, `http://localhost:4321/join`, `http://localhost:4321/members`.
- Demo cliente: `https://<nombre-del-proyecto>.vercel.app/sign-in`, `https://<nombre-del-proyecto>.vercel.app/sign-up`, `https://<nombre-del-proyecto>.vercel.app/join`, `https://<nombre-del-proyecto>.vercel.app/members`, `https://<nombre-del-proyecto>.vercel.app/api/checkout` si Clerk exige allowlist para redirects/return URLs.
- Staging: `https://staging.grupoalfa.net/sign-in`, `https://staging.grupoalfa.net/sign-up`, `https://staging.grupoalfa.net/join`, `https://staging.grupoalfa.net/members`.
- Production: `https://grupoalfa.net/sign-in`, `https://grupoalfa.net/sign-up`, `https://grupoalfa.net/join`, `https://grupoalfa.net/members`.

## 3. Stripe

- [x] 3.1 Crear o confirmar la cuenta Stripe del proyecto.
- [x] 3.2 Verificar que trabajaremos primero en `test mode`.
- [x] 3.3 Crear el producto de membresía `Club Membership`.
- [x] 3.4 Crear el precio anual de `99 EUR/year`.
- [x] 3.5 Activar y revisar Stripe Billing Portal.
- [x] 3.6 Confirmar la estrategia de descuentos inicial:
  - organization promo codes
  - referral codes
  - no combinables
  - solo primera compra
- [x] 3.7 Decidir convención de nombres para promo codes de organizaciones.
- [x] 3.8 Definir si los referrals usarán cupones/promotion codes generados en Stripe o una capa intermedia controlada por backend.
- [x] 3.9 Recoger `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` y `STRIPE_ANNUAL_PRICE_ID` para cada entorno.
- [x] 3.10 Confirmar la configuración inicial de Stripe Radar.
- [x] 3.11 Revisar si hay que activar Stripe Tax ahora o se deja para después.

Notas para 3.5:
- Stripe Billing Portal se revisa en Stripe Dashboard > Settings > Billing > Customer portal.
- Debe permitir a miembros activos gestionar metodo de pago, ver facturas y cancelar o actualizar datos de facturacion segun la politica aprobada.
- La app usa el endpoint `/api/billing-portal` para crear sesiones del portal desde `/members/membership`.

Notas para 3.6:
- Antes del pago anual, el usuario puede introducir un unico codigo.
- Codigo referral generado por otro usuario: descuento inicial previsto del 10%.
- Codigo de agencia/organizacion colaboradora: descuento inicial previsto del 100%.
- Los codigos no son combinables.
- Los codigos aplican solo a la primera compra, no a renovaciones.
- En fase 1 los codigos se generaran inicialmente desde Stripe.
- Queda diferido a fase 2/3 valorar un backoffice propio para gestionar codigos, agencias y referrals.

Notas para 3.7:
- Los codigos visibles para agencias/organizaciones no usaran prefijos tecnicos obligatorios.
- Pueden ser codigos legibles con el nombre de la agencia o codigos comerciales acordados con cada partner.
- La atribucion de organizacion se guardara en metadata de Stripe (`sourceType=organization`, `organizationCode=<codigo interno>`), no en el formato visible del codigo.

Notas para 3.8:
- Fase 1: los referral codes se gestionaran en Stripe como promotion codes creados manualmente desde Stripe.
- Los referral codes seran alfanumericos random, sin prefijos tecnicos visibles.
- Descuento previsto: 10% solo en la primera compra.
- El usuario solo ve un campo generico de codigo; la plataforma valida el codigo contra Stripe y aplica el descuento configurado alli.
- Para referrals, en fase 1 basta con `sourceType=referral`; no es necesario duplicar el codigo visible en metadata como `referralCode`.
- Fase futura: valorar una capa backend/backoffice propio para generar, asignar y controlar referrals desde la plataforma creando cupones/promotion codes mediante la API de Stripe.

Notas para 3.9:
- Variables Stripe recogidas/configuradas para el entorno de pruebas inicial.
- Endpoint webhook demo cliente: `https://<nombre-del-proyecto>.vercel.app/api/stripe-webhook`.
- Endpoint webhook staging: `https://staging.grupoalfa.net/api/stripe-webhook`.
- Endpoint webhook production previsto: `https://grupoalfa.net/api/stripe-webhook`.
- Eventos Stripe suscritos:
  - `checkout.session.completed`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`

Notas para 3.10:
- Fase 1 mantiene Stripe Radar con configuracion estandar.
- No se anaden reglas custom agresivas inicialmente para evitar bloquear pagos legitimos.
- Las investigaciones manuales se apoyaran en Stripe y en el historial persistido por la aplicacion.

Notas para 3.11:
- Stripe Tax queda fuera de fase 1.
- La activacion de Stripe Tax queda pendiente de validacion fiscal/asesoria antes de production si aplica.

## 4. Supabase

- [x] 4.1 Crear o confirmar el proyecto Supabase.
- [x] 4.2 Elegir región del proyecto.
- [x] 4.3 Recoger `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
- [x] 4.4 Confirmar acceso del equipo técnico al panel y SQL editor.
- [x] 4.5 Validar con el equipo el modelo base de tablas:
  - `membership_users`
  - `memberships`
  - `organizations`
  - `promo_codes`
  - `referral_codes`
  - `referral_usages`
  - `billing_events`
  - `suspicious_activity_notes`
- [x] 4.6 Decidir política básica de backups y acceso administrativo.

Notas para 4.3:
- `SUPABASE_URL` se obtiene como `https://<PROJECT_ID>.supabase.co` desde Settings > General > Project ID.
- `SUPABASE_SERVICE_ROLE_KEY` se obtiene en Settings > API Keys > Secret keys.
- Nombre recomendado para la secret key backend: `membership-platform-server`.
- La service role key solo debe usarse en backend/hosting, nunca en frontend ni en repositorio.

Notas para 4.4:
- Confirmado acceso al panel de Supabase y al SQL Editor.

Notas para 4.5:
- Modelo base validado contra la migracion `supabase/migrations/001_membership_platform.sql`.
- Se usan los nombres reales `membership_users` y `promo_codes` en lugar de los nombres preliminares `users` y `organization_promo_codes`.

Notas para 4.6:
- Backups gestionados por Supabase segun el plan contratado.
- Acceso administrativo limitado a responsables tecnicos.
- `SUPABASE_SERVICE_ROLE_KEY` solo en backend/hosting, nunca frontend.
- Rotacion de claves ante sospecha de exposicion o cambios de equipo.
- No se dara acceso de escritura a perfiles no tecnicos en fase 1.

## 5. Resend

- [x] 5.1 Crear o confirmar la cuenta Resend.
- [x] 5.2 Verificar el dominio de envío.
- [x] 5.3 Decidir remitente principal para comunicaciones del club.
- [x] 5.4 Recoger `RESEND_API_KEY`.

## 6. Hosting y despliegue

- [x] 6.1 Confirmar que seguimos desplegando en Vercel como hosting por ahora.
- [x] 6.2 Confirmar que la app debe quedar desacoplada del runtime de Vercel para facilitar una futura migración.
- [ ] 6.3 Confirmar variables de entorno por entorno en el hosting actual.
- [ ] 6.4 Reservar endpoint público para Stripe webhooks.
- [ ] 6.5 Confirmar estrategia de logs y observabilidad mínima para errores de auth, checkout y webhooks.

Notas para 6.3:
- El proyecto demo cliente debe ser un nuevo proyecto Vercel conectado al mismo repositorio, si Vercel lo permite.
- El proyecto demo cliente debe usar `client-demo` como Production Branch para no depender directamente de `main`.
- La URL que se compartira con el cliente sera la Production URL de Vercel: `https://<nombre-del-proyecto>.vercel.app`.
- No se compartiran Preview URLs con el cliente porque pueden quedar protegidas por Vercel Authentication en el plan Hobby.
- Variables necesarias en Vercel Production para la demo cliente:
  - `PUBLIC_APP_URL=https://<nombre-del-proyecto>.vercel.app`
  - `PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_ANNUAL_PRICE_ID`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`, recomendado aunque tenga fallback.
- Despues de cambiar variables en Vercel, hacer redeploy manual porque no se aplican a deployments anteriores.

Notas para 6.4:
- Crear un webhook Stripe especifico para la demo cliente en test mode.
- No reutilizar el `STRIPE_WEBHOOK_SECRET` de local, staging o production.
- El webhook demo debe suscribirse a `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed` y `customer.subscription.deleted`.
- Antes de compartir la URL, confirmar en Stripe Workbench que el endpoint demo responde HTTP 200.

## 7. Organizaciones y campañas

- [ ] 7.1 Preparar listado inicial de organizaciones colaboradoras.
- [ ] 7.2 Definir para cada organización:
  - nombre
  - código interno
  - promo code visible
  - tipo de acceso gratuito/promocional
  - fechas o límites si aplican
- [ ] 7.3 Confirmar que soportaremos ambas entradas:
  - link dedicado con `?promo=...`
  - código manual introducido por el usuario

## 8. Referral program

- [ ] 8.1 Confirmar naming convention inicial de referral codes.
- [ ] 8.2 Confirmar descuento inicial del referral.
- [ ] 8.3 Confirmar reglas operativas:
  - no combinable con promos de organización
  - solo primera compra
  - no aplica en renovaciones

## 9. Legal y compliance

- [ ] 9.1 Reunir los textos legales minimos necesarios para la membresía.
- [ ] 9.2 Confirmar términos de membresía y política de cancelación.
- [ ] 9.3 Confirmar política de privacidad aplicable al nuevo flujo.
- [ ] 9.4 Confirmar el enfoque de consentimientos para emails transaccionales vs marketing.
- [ ] 9.5 Confirmar que no pediremos DNI ni verificación documental en la primera release.

## 10. Contenido y operación interna

- [ ] 10.1 Preparar copy base para `sign-up`, `join`, `checkout success` y placeholders privados.
- [ ] 10.2 Preparar listado de beneficios iniciales visibles en el área privada.
- [ ] 10.3 Definir qué habrá al principio en:
  - recursos
  - eventos
  - expert sessions
- [ ] 10.4 Definir procedimiento interno para incidencias de:
  - pago fallido
  - promo inválida
  - referral conflictivo
  - webhook no procesado

## 11. Credenciales y handoff al equipo técnico

- [ ] 11.1 Centralizar todas las credenciales y variables en un gestor seguro.
- [ ] 11.2 Preparar documento compartido con responsables por proveedor.
- [ ] 11.3 Confirmar quién del equipo puede crear, rotar y revocar claves.
- [ ] 11.4 Entregar al equipo técnico el inventario completo de cuentas, claves y configuraciones aprobadas.

## 12. Demo cliente en Vercel

- [ ] 12.1 Crear rama `client-demo` desde el estado que se quiera enseñar al cliente.
- [ ] 12.2 Crear nuevo proyecto Vercel conectado al mismo repositorio.
- [ ] 12.3 Configurar `client-demo` como Production Branch del nuevo proyecto Vercel.
- [ ] 12.4 Confirmar la Production URL asignada por Vercel: `https://<nombre-del-proyecto>.vercel.app`.
- [ ] 12.5 Confirmar que la Production URL abre sin login de Vercel.
- [ ] 12.6 Configurar todas las variables de entorno en Vercel Production.
- [ ] 12.7 Configurar Clerk para la URL demo.
- [ ] 12.8 Configurar Stripe test mode para la URL demo.
- [ ] 12.9 Configurar Supabase demo/staging y aplicar `supabase/migrations/001_membership_platform.sql`.
- [ ] 12.10 Decidir/configurar Resend para emails de prueba.
- [ ] 12.11 Hacer redeploy despues de configurar variables.
- [ ] 12.12 Completar prueba E2E antes de enviar la URL al cliente.
- [ ] 12.13 Enviar al cliente solo `https://<nombre-del-proyecto>.vercel.app`, indicando que es una URL temporal de pruebas.

Checklist de variables para 12.6:
- [ ] `PUBLIC_APP_URL=https://<nombre-del-proyecto>.vercel.app`
- [ ] `PUBLIC_CLERK_PUBLISHABLE_KEY=<clave Clerk demo>`
- [ ] `CLERK_SECRET_KEY=<clave Clerk demo>`
- [ ] `STRIPE_SECRET_KEY=<sk_test...>`
- [ ] `STRIPE_WEBHOOK_SECRET=<whsec del webhook demo>`
- [ ] `STRIPE_ANNUAL_PRICE_ID=<price_... test>`
- [ ] `SUPABASE_URL=<Supabase demo/staging>`
- [ ] `SUPABASE_SERVICE_ROLE_KEY=<service role demo/staging>`
- [ ] `RESEND_API_KEY=<clave Resend>`
- [ ] `RESEND_FROM_EMAIL=<remitente verificado>`

Checklist Clerk para 12.7:
- [ ] Decidir si se usa la instancia Clerk actual de development o una app/instancia separada para demo.
- [ ] Recomendado: crear una app/instancia separada si el cliente va a crear usuarios de prueba.
- [ ] Configurar `email + password` y `magic link` si sigue aprobado.
- [ ] Mantener `Google login` fuera si sigue fuera de la primera release.
- [ ] Añadir/validar `https://<nombre-del-proyecto>.vercel.app/sign-in`.
- [ ] Añadir/validar `https://<nombre-del-proyecto>.vercel.app/sign-up`.
- [ ] Añadir/validar `https://<nombre-del-proyecto>.vercel.app/join`.
- [ ] Añadir/validar `https://<nombre-del-proyecto>.vercel.app/members`.
- [ ] Añadir/validar `https://<nombre-del-proyecto>.vercel.app/api/checkout` si Clerk exige allowlist para redirects/return URLs.
- [ ] Copiar las claves Clerk demo a Vercel Production.
- [ ] Crear un usuario de prueba y confirmar login/logout.

Checklist Stripe para 12.8:
- [ ] Confirmar que se esta trabajando en Stripe test mode.
- [ ] Crear o confirmar producto de membresia anual de test.
- [ ] Copiar el `price_...` de test a `STRIPE_ANNUAL_PRICE_ID`.
- [ ] Configurar Billing Portal en test mode.
- [ ] Crear webhook endpoint demo: `https://<nombre-del-proyecto>.vercel.app/api/stripe-webhook`.
- [ ] Suscribir `checkout.session.completed`.
- [ ] Suscribir `invoice.paid`.
- [ ] Suscribir `invoice.payment_failed`.
- [ ] Suscribir `customer.subscription.deleted`.
- [ ] Copiar el signing secret `whsec_...` del endpoint demo a `STRIPE_WEBHOOK_SECRET`.
- [ ] Crear promotion codes de test si el cliente probara `promo` o `ref`.
- [ ] Probar checkout con tarjetas de test.
- [ ] Confirmar en Stripe Workbench que los webhooks llegan con HTTP 200.

Checklist Supabase para 12.9:
- [ ] Decidir si se usa Supabase actual o un proyecto Supabase demo.
- [ ] Recomendado: crear proyecto Supabase demo para evitar contaminar datos reales.
- [ ] Aplicar `supabase/migrations/001_membership_platform.sql` en el proyecto demo.
- [ ] Configurar `SUPABASE_URL` en Vercel Production.
- [ ] Configurar `SUPABASE_SERVICE_ROLE_KEY` en Vercel Production.
- [ ] Confirmar que tras un checkout completado se crean/actualizan registros de membership.

Checklist Resend para 12.10:
- [ ] Decidir si la demo enviara emails reales.
- [ ] Si enviara emails, confirmar dominio/remitente verificado.
- [ ] Configurar `RESEND_API_KEY` en Vercel Production.
- [ ] Configurar `RESEND_FROM_EMAIL` en Vercel Production.
- [ ] Probar email de bienvenida tras `checkout.session.completed` si se activa envio real.

Prueba E2E para 12.12:
- [ ] Abrir `https://<nombre-del-proyecto>.vercel.app` sin estar logueado en Vercel.
- [ ] Abrir `/membership`.
- [ ] Crear cuenta desde `/sign-up`.
- [ ] Confirmar redireccion a Stripe Checkout.
- [ ] Completar pago con tarjeta de test.
- [ ] Confirmar vuelta a `/checkout/success`.
- [ ] Confirmar acceso a `/members`.
- [ ] Confirmar acceso a `/members/membership`.
- [ ] Abrir Billing Portal desde el formulario correspondiente.
- [ ] Confirmar en Stripe que el webhook demo recibio `checkout.session.completed` con HTTP 200.
- [ ] Confirmar en Supabase que se creo/actualizo la membresia.
- [ ] Confirmar en Clerk que metadata/usuario quedan coherentes si aplica.
- [ ] Confirmar email Resend si se activa envio real.

Notas de entrega al cliente para 12.13:
- Indicar que la URL es temporal y de pruebas.
- Indicar que los pagos son de test y proporcionar tarjeta de prueba si procede.
- Pedir feedback sobre registro, pago, area privada, billing portal, textos y diseno.
- Registrar incidencias separando bugs tecnicos de feedback de producto/contenido.
