## Context

The current Astro site is a static marketing website with a public Club Alfa landing at `/club`, a shared public header, and no server-side auth or billing stack. The planned membership platform adds authenticated onboarding, paid subscriptions, protected member routes, campaign attribution, and Stripe-driven lifecycle events to a codebase that currently does not run in SSR mode and has no membership state model.

This change also has a product split that needs to remain explicit: `/club` stays as the public sales page, while the private member experience lives under a separate English route namespace. The project needs high-volume acquisition through organization links and referrals, but also clean operational tracking from the first release.

## Goals / Non-Goals

**Goals:**
- Preserve `/club` as a public commercial destination while redirecting conversion into a new registration flow.
- Introduce an English route model for onboarding and member-only pages.
- Define a single annual paid plan for phase 1 at `99 EUR/year`.
- Support organization promo codes and member referral codes only on the initial purchase, never combined.
- Lock prefilled promo or referral codes when the user arrives through a campaign link.
- Make Stripe webhooks the source of truth for membership activation and renewal state.
- Provide a minimum private member area that can launch before premium content is fully populated.

**Non-Goals:**
- Monthly billing or multi-plan support in phase 1.
- Custom card collection UI outside Stripe Checkout.
- Advanced anti-fraud features beyond basic Stripe and application-level controls.
- Rich content management for masterclasses, seminars, or resources in the first release.
- Turning `/club` itself into the private member dashboard.

## Decisions

### Runtime portability and Astro baseline
Adopt a portable SSR runtime strategy and avoid a hard dependency on the Vercel adapter. The target setup should upgrade the project to an Astro 6-compatible baseline and prefer a host-agnostic adapter such as `@astrojs/node` for server execution.

Rationale:
- The membership platform needs SSR, middleware, protected routes, and webhook endpoints, but those concerns do not require Vercel-specific runtime coupling.
- Keeping the server adapter portable makes future hosting changes materially easier.
- Aligning the runtime move with an Astro 6 upgrade reduces version-friction with modern integrations and gives the project a cleaner long-term baseline.
- The team can continue using Vercel as the current hosting provider while keeping the application runtime contract portable enough to migrate later if needed.

Alternatives considered:
- Use `@astrojs/vercel` because the initial hosting target is Vercel: rejected because it introduces unnecessary host coupling into the runtime contract.
- Stay on Astro 5 and only patch what is needed: rejected because the membership platform is already a structural change and this is the right time to move the framework baseline intentionally.

### Route model
Use English routes for the new flows and keep the existing public marketing pages unchanged.

- Public onboarding routes: `/sign-in`, `/sign-up`, `/join`, `/checkout/success`, `/checkout/cancel`
- Private routes: `/members`, `/members/profile`, `/members/membership`, `/members/benefits`, `/members/resources`, `/members/events`, `/members/expert-sessions`, `/members/referrals`

Rationale:
- Keeps the marketing site readable for both locales while making the application namespace feel product-like.
- Avoids overloading `/club` with authenticated and unauthenticated concerns.

Alternatives considered:
- Keep Spanish routes for the app: rejected because the product namespace will look cleaner and more standard in English.
- Put the private area under `/club`: rejected because it mixes commercial and authenticated modes in one route tree.

### Public-to-private split
Keep `/club` as a pure public landing page and change its primary CTA to point at the new sign-up flow.

Rationale:
- Preserves the existing commercial positioning and SEO target.
- Makes the private area easier to evolve without changing the landing's role.

Alternative considered:
- Make `/club` conditional on session state: rejected because it complicates UX and mixes two different page goals.

### Identity before payment
Require account creation before checkout: `/club -> /sign-up -> /join -> Stripe Checkout`.

Rationale:
- Clerk becomes the stable identity anchor for attribution, membership state, referrals, and future member content.
- Avoids orphaned Stripe customers or ambiguous user linkage.

Alternative considered:
- Checkout before account creation: rejected because it weakens attribution and complicates webhook reconciliation.

### Initial authentication methods
Start with Clerk authentication using email plus password and magic link, without Google login in the first release.

Rationale:
- Covers the desired low-friction login methods without introducing third-party OAuth complexity in the first release.
- Keeps the initial membership identity model simpler to support and document.

Alternative considered:
- Add Google login from the start: rejected because it is not needed for the first release.

### Phase 1 billing model
Expose only one annual Stripe plan in phase 1 with a public price of `99 EUR/year`.

Rationale:
- Matches the current Club Alfa sales messaging.
- Reduces UI, billing, and reporting complexity for the first release.

Alternative considered:
- Ship annual and monthly together: rejected because monthly is intentionally deferred.

### Promotion and referral model
Use a single Stripe coupon or promotion code at initial checkout only.

Rules:
- Organization codes and referral codes are mutually exclusive.
- Only one code can be applied per initial checkout.
- Codes do not apply to renewals.
- Codes do not apply automatically to future plan changes if new plans are introduced later.
- If the user lands through a campaign link such as `?promo=` or `?ref=`, the corresponding field is prefilled and immutable in the onboarding UI.

Rationale:
- Keeps discount rules aligned with Stripe's own constraints.
- Simplifies support, reporting, and abuse prevention.

Alternatives considered:
- Allow stacking discounts: rejected because it conflicts with the desired business rules and increases operational complexity.
- Allow editing prefilled campaign codes: rejected because campaign links should remain attributable and harder to tamper with.

### Organization entry model
Support both organization-specific links with embedded query parameters and manual code entry for organization campaigns.

Rationale:
- Embedded links improve attribution and reduce user mistakes.
- Manual code entry remains necessary for cases where a user receives only the code or lands outside the campaign link.

Alternative considered:
- Support only links or only manual code entry: rejected because the business needs both forms.

### Metadata scope for phase 1
Keep the metadata contract intentionally small in the first release.

Rationale:
- The platform needs just enough cross-system data to reconcile identity, billing state, and first-purchase attribution.
- A minimal metadata surface reduces sync complexity and lowers the risk of drift across Clerk, Stripe, and server-side persistence.

Phase 1 minimum:
- Clerk public metadata: membership status, membership type, organization code when applicable, referral code used when applicable.
- Clerk private metadata: Stripe customer id, Stripe subscription id.
- Stripe metadata: Clerk user id, source type, organization code or referral code when applicable.

Alternative considered:
- Define a broad metadata contract from day one: rejected because the current goal is to keep phase 1 as simple as possible.

### Membership source of truth
Treat Stripe subscription events and server-side persistence as the source of truth for membership state, not the frontend redirect.

Rationale:
- Handles delayed payment confirmation, retries, failures, and renewals correctly.
- Protects private access decisions from client-side assumptions.

Alternative considered:
- Grant access immediately on checkout success page: rejected because it is vulnerable to race conditions and inconsistent payment state.

### Private area scope for release 1
Launch the member area with operational pages first: membership status, profile, benefits, referrals, and placeholders for resources, events, and expert sessions.

Rationale:
- Decouples platform launch from the future editorial calendar.
- Lets the team onboard paid members before all premium content exists.

Alternative considered:
- Delay launch until all premium content is ready: rejected because it blocks the platform on content production.

### Admin operations scope
Keep admin operations as phase 2 readiness rather than a first-release product surface.

Rationale:
- The immediate goal is a member-facing platform that can onboard, bill, and protect access correctly.
- Internal admin workflows should be anticipated in the data model, but not expanded into a larger scope than necessary for release 1.

## Risks / Trade-offs

- [Static-to-SSR architecture shift] -> Introduce SSR deliberately and keep public marketing pages simple to limit regressions.
- [Astro 6 upgrade may reveal compatibility gaps in current pages or tooling] -> Treat the framework upgrade as an explicit migration step with its own validation surface before deep membership work continues.
- [Portable adapter choice may require extra deployment setup compared with a host-native adapter] -> Accept the small setup cost in exchange for avoiding long-term platform lock-in.
- [Webhook synchronization delays could create short-lived access confusion] -> Show a pending activation state after checkout success and wait for webhook-confirmed membership.
- [Campaign attribution errors if codes can be changed after link entry] -> Lock campaign-derived promo/referral inputs in the onboarding UI and persist the original source context server-side.
- [Launching with little private content may feel thin] -> Make the initial member home clearly useful through membership status, next steps, referrals, and booking/resource placeholders.
- [Future monthly or multi-plan expansion may reshape billing assumptions] -> Keep plan and discount models extensible in data design even though phase 1 exposes only the annual plan.

## Migration Plan

1. Upgrade the project to an Astro 6-compatible baseline and choose a portable SSR adapter that does not depend on Vercel.
2. Add Clerk authentication and public onboarding routes.
3. Add Stripe annual product, Checkout, Billing Portal, and webhook handling.
4. Add membership persistence and lifecycle synchronization.
5. Add protected `/members` routes with minimum release-1 sections.
6. Update `/club` CTA and conversion path to the new onboarding flow.
7. Enable organization and referral campaign entry with locked prefilled code behavior.

Rollback strategy:
- Leave `/club` and the rest of the public marketing site functional even if private routes are disabled.
- Disable new onboarding CTAs and private routing if billing or synchronization issues appear.

## Open Questions

- Whether `/sign-up` should also accept manual promo/referral entry directly or only receive it from campaign-aware links plus a join screen.
- What exact copy and empty states should appear in `/members/resources`, `/members/events`, and `/members/expert-sessions` before real content is published.
- Which exact Astro 6 minor version should be the target baseline once adapter and Clerk compatibility are validated together.
