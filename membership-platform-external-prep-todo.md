# Membership Platform External Prep TODO

## 1. Dominio y entornos

- [ ] 1.1 Confirmar que el dominio principal de la web es `grupoalfa.net` y listar subdominios que podremos usar para auth, emails y entornos.
- [ ] 1.2 Decidir nombres de entornos al menos para `development`, `staging` y `production`.
- [ ] 1.3 Confirmar qué URLs públicas existirán para callbacks, webhooks y login en cada entorno.

## 2. Clerk

- [ ] 2.1 Crear o confirmar la cuenta de Clerk del proyecto.
- [ ] 2.2 Crear la aplicación de Clerk para la membership platform.
- [ ] 2.3 Configurar métodos iniciales de acceso: `email + password` y `magic link`.
- [ ] 2.4 Confirmar que `Google login` queda fuera de la primera release.
- [ ] 2.5 Configurar dominios y redirect URLs para `grupoalfa.net` y los entornos no productivos.
- [ ] 2.6 Recoger `PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY` para cada entorno.
- [ ] 2.7 Validar la estrategia minima de metadata en Clerk con el equipo:
  - `membershipStatus`
  - `membershipType`
  - `organizationCode`
  - `referralCodeUsed`
  - `stripeCustomerId`
  - `stripeSubscriptionId`

## 3. Stripe

- [ ] 3.1 Crear o confirmar la cuenta Stripe del proyecto.
- [ ] 3.2 Verificar que trabajaremos primero en `test mode`.
- [ ] 3.3 Crear el producto de membresía `Club Membership`.
- [ ] 3.4 Crear el precio anual de `99 EUR/year`.
- [ ] 3.5 Activar y revisar Stripe Billing Portal.
- [ ] 3.6 Confirmar la estrategia de descuentos inicial:
  - organization promo codes
  - referral codes
  - no combinables
  - solo primera compra
- [ ] 3.7 Decidir convención de nombres para promo codes de organizaciones.
- [ ] 3.8 Definir si los referrals usarán cupones/promotion codes generados en Stripe o una capa intermedia controlada por backend.
- [ ] 3.9 Recoger `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` y `STRIPE_ANNUAL_PRICE_ID` para cada entorno.
- [ ] 3.10 Confirmar la configuración inicial de Stripe Radar.
- [ ] 3.11 Revisar si hay que activar Stripe Tax ahora o se deja para después.

## 4. Supabase

- [ ] 4.1 Crear o confirmar el proyecto Supabase.
- [ ] 4.2 Elegir región del proyecto.
- [ ] 4.3 Recoger `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] 4.4 Confirmar acceso del equipo técnico al panel y SQL editor.
- [ ] 4.5 Validar con el equipo el modelo base de tablas:
  - `users`
  - `memberships`
  - `organizations`
  - `organization_promo_codes`
  - `referral_codes`
  - `referral_usages`
  - `billing_events`
- [ ] 4.6 Decidir política básica de backups y acceso administrativo.

## 5. Resend

- [ ] 5.1 Crear o confirmar la cuenta Resend.
- [ ] 5.2 Verificar el dominio de envío.
- [ ] 5.3 Decidir remitente principal para comunicaciones del club.
- [ ] 5.4 Recoger `RESEND_API_KEY`.

## 6. Hosting y despliegue

- [ ] 6.1 Confirmar que seguimos desplegando en Vercel como hosting por ahora.
- [ ] 6.2 Confirmar que la app debe quedar desacoplada del runtime de Vercel para facilitar una futura migración.
- [ ] 6.3 Confirmar variables de entorno por entorno en el hosting actual.
- [ ] 6.4 Reservar endpoint público para Stripe webhooks.
- [ ] 6.5 Confirmar estrategia de logs y observabilidad mínima para errores de auth, checkout y webhooks.

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
