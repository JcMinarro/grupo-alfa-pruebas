## 1. Platform foundation

- [ ] 1.1 Upgrade the project from the current Astro 5 static baseline to the approved Astro 6 baseline for the membership platform.
- [ ] 1.2 Move the Astro project from static output to a portable SSR deployment model that does not depend on `@astrojs/vercel`.
- [ ] 1.3 Add and configure the base integrations and environment contracts for Clerk, Stripe, Supabase, and Resend against the portable runtime baseline.
- [ ] 1.4 Define shared server-side utilities for environment loading, authenticated route guards, and membership state lookup.

## 2. Authentication and onboarding routes

- [ ] 2.1 Implement the public English onboarding routes `/sign-in`, `/sign-up`, and `/join`.
- [ ] 2.2 Integrate Clerk sign-in and sign-up flows with support for redirecting authenticated non-members into `/join`.
- [ ] 2.3 Persist campaign context from `promo` and `ref` query parameters across the onboarding flow.
- [ ] 2.4 Render locked promo or referral fields when onboarding begins from a campaign link.

## 3. Billing and membership lifecycle

- [ ] 3.1 Configure the annual Club Alfa Stripe product and price at `99 EUR/year` for phase 1.
- [ ] 3.2 Implement server-side creation of the initial Stripe Checkout session from `/join`.
- [ ] 3.3 Implement the `/checkout/success` and `/checkout/cancel` routes with a pending-activation state on success.
- [ ] 3.4 Implement Stripe webhook handling for checkout completion, renewals, payment failures, and subscription cancellation.
- [ ] 3.5 Implement Stripe Billing Portal access for active members.

## 4. Membership data and access control

- [ ] 4.1 Define the membership persistence model for users, memberships, billing events, organizations, promo codes, referral codes, and referral usages.
- [ ] 4.2 Define the minimum phase 1 metadata contract across Clerk, Stripe, and server-side persistence.
- [ ] 4.3 Synchronize Clerk users, Stripe customers, subscriptions, membership status, and initial attribution metadata in server-side persistence.
- [ ] 4.4 Enforce access control so only active or otherwise allowed membership states can open `/members` routes.
- [ ] 4.5 Distinguish account identity from membership state throughout the server-side authorization logic.

## 5. Member area MVP

- [ ] 5.1 Implement the private `/members` dashboard shell and shared member navigation.
- [ ] 5.2 Implement `/members/profile` and `/members/membership` with profile access, current plan, renewal state, and Billing Portal entry.
- [ ] 5.3 Implement `/members/benefits` and `/members/referrals` for MVP member value and referral visibility.
- [ ] 5.4 Implement placeholder member-only pages for `/members/resources`, `/members/events`, and `/members/expert-sessions`.

## 6. Promo and referral rules

- [ ] 6.1 Validate that organization promo codes and member referral codes are mutually exclusive during the initial checkout flow.
- [ ] 6.2 Prevent promo and referral discounts from being applied to renewals or reused automatically in future plan changes.
- [ ] 6.3 Track acquisition source as direct, organization, or referral for each initial membership purchase.
- [ ] 6.4 Support both organization entry paths: link-based `?promo=` attribution and manual organization code entry.
- [ ] 6.5 Record organization and referral attribution from campaign links and checkout completion events.

## 7. Public Club Alfa integration

- [ ] 7.1 Update the public `/club` CTA flow so the primary join action points to the new membership registration path.
- [ ] 7.2 Preserve the public commercial role and existing annual pricing presentation of `/club` while removing the dependency on the generic contact CTA for joining.
- [ ] 7.3 Add or update automated coverage for the new route model, Club Alfa conversion behavior, and protected member access behavior.

## 8. Email automation and lifecycle messaging

- [ ] 8.1 Define the transactional email trigger points for welcome, active membership, renewal, payment failure, and cancellation flows.
- [ ] 8.2 Integrate the selected email provider contract so lifecycle events can trigger transactional messages from backend event processing.
- [ ] 8.3 Preserve segmentation-ready membership attributes for future organization, referral, and lifecycle campaigns.

## 9. Antifraud and operational history

- [ ] 9.1 Implement the initial antifraud baseline for first-purchase-only promo and referral behavior.
- [ ] 9.2 Persist historical identifiers and usage records needed for manual investigation of suspicious activity.
- [ ] 9.3 Keep the first release aligned with low-friction controls, relying on Stripe and application-side history instead of high-friction identity verification.

## 10. Analytics and reporting baseline

- [ ] 10.1 Persist acquisition source and initial attribution context for every first membership purchase.
- [ ] 10.2 Persist billing lifecycle events needed for renewal, failure, and cancellation reporting.
- [ ] 10.3 Define the baseline reporting surface for organizations and referrals.

## 11. Admin operations readiness

- [ ] 11.1 Define the minimum operational data and visibility required to support member incidents, promo issues, and referral investigations.
- [ ] 11.2 Prepare the organization and promo data model so simple phase 2 admin workflows can be added without redesigning the platform foundation.
- [ ] 11.3 Document only the future phase 2 admin readiness assumptions that affect the current data model.

## 12. Legal and compliance baseline

- [ ] 12.1 Define the minimum legal disclosures and membership terms entry points required in sign-up and paid onboarding flows.
- [ ] 12.2 Distinguish transactional communications from optional marketing communications in the minimum consent model.
- [ ] 12.3 Keep the first release aligned with the approved low-friction personal data collection scope.
