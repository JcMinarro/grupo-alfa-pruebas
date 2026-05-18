## Why

Grupo Alfa ya dispone de una landing publica para Club Alfa, pero aun no tiene un flujo real de alta, pago y acceso privado para miembros. La siguiente etapa necesita convertir esa oferta comercial en una plataforma de membresia operativa, con captacion amplia desde organizaciones y referrals sin perder control del ciclo de vida del socio desde el primer dia.

## What Changes

- Add a membership platform with public onboarding routes in English, private member routes under `/members`, and route guards based on authentication and membership state.
- Add a first-purchase subscription flow using Clerk, Stripe Checkout, Stripe Billing Portal, and server-side synchronization through webhooks.
- Add support for organization promo codes and member referral codes that apply only on the initial purchase, are not combinable, and can be locked when the user arrives from a campaign link.
- Add a minimal private member area focused on membership state, profile access, referrals, and placeholders for future premium content.
- Update the public Club Alfa landing so it remains a commercial page while its primary CTA sends users into the new registration flow instead of the contact flow.
- Move the runtime plan away from host-specific Astro adapters so the membership platform can run without a Vercel dependency.
- Upgrade the project's Astro baseline to a version 6-compatible setup that can support the required SSR and middleware features without platform lock-in.

## Capabilities

### New Capabilities
- `membership-platform`: Public onboarding, paid membership lifecycle, private member routes, promo and referral entry rules, and membership access control.
- `runtime-portability`: Host-agnostic SSR runtime requirements for the membership platform using a portable Astro server adapter instead of a Vercel-specific adapter.
- `membership-metadata`: Cross-system metadata ownership and synchronization rules for Clerk, Stripe, and server-side persistence.
- `membership-email-automation`: Transactional email triggers, sender setup assumptions, and segmentation hooks for membership lifecycle events.
- `membership-antifraud`: Basic abuse prevention rules for promotions, referrals, duplicate accounts, and suspicious membership activity.
- `membership-analytics`: Attribution, lifecycle tracking, and organization/referral reporting requirements from first purchase onward.
- `member-content-operations`: Protected member-only content areas, placeholders, and future operational sections such as expert sessions and resources.
- `membership-admin-operations`: Internal operational capabilities for managing organizations, promo codes, member incidents, and manual support flows.
- `membership-legal-compliance`: Legal, consent, privacy, and membership-policy requirements attached to onboarding, billing, and communications.

### Modified Capabilities
- `web-club-alfa`: The Club Alfa landing changes its conversion path from contact intent to membership registration while remaining a public commercial destination.
- `astro-setup`: The Astro project setup changes from a static Astro 5 marketing baseline to an Astro 6-compatible SSR baseline that stays decoupled from Vercel-specific runtime dependencies.

## Impact

- Astro application architecture will need SSR/server execution support instead of remaining purely static.
- New dependencies and integrations are expected for Clerk, Stripe, Supabase, Resend, and a portable Astro server runtime instead of a Vercel-specific adapter.
- New protected routes, API endpoints, and membership persistence/synchronization will be introduced.
- Existing public Club Alfa messaging and CTA behavior will be updated without turning `/club` into the private member area.
