## Why

The current membership onboarding sends authenticated non-members from account creation into an intermediate paid annual `/join` checkout-preparation step. That adds friction after account creation. The product now needs a public membership/campaign page before sign-up: visitors review the paid membership, see any URL-based discount, create their account, and then go directly to Stripe Checkout.

This change reduces payment friction while keeping the important constraint: no one can pay before a Clerk user exists.

## What Changes

- Add a public membership/campaign screen before account creation and payment.
- Preserve the paid Club Alfa annual path at `99 EUR/year` and route users through sign-up/sign-in directly into Stripe Checkout.
- Replace manual discount-code entry with URL-based campaign/referral codes only. A campaign-specific page may show the discounted price before sign-up, but users do not type discount codes manually.
- Remove `/join` from the normal paid conversion path or keep it only as a legacy/compatibility route.
- Keep `/club` as the commercial page for the paid club while routing membership conversion through the public membership/campaign screen.
- Ensure users who created an account but did not complete payment are treated as unpaid, not as active members.

## Capabilities

### New Capabilities
- `membership-plan-selection`: Public paid membership/campaign presentation, URL-based campaign discount preview, and paid membership selection before sign-up.

### Modified Capabilities
- `membership-platform`: Onboarding flow changes from sign-up -> `/join` to membership/campaign page -> sign-up -> direct Stripe Checkout.
- `membership-metadata`: Clerk and server-side metadata must represent paid membership lifecycle state separately from mere account creation.
- `web-club-alfa`: Club Alfa continues presenting the annual paid offer, but its CTA enters a campaign-aware membership flow before account creation.
- `membership-legal-compliance`: Paid membership terms and billing disclosures need to be visible before payment.

## Impact

- Existing authenticated unpaid users should not be sent to member content. They should be guided to complete payment.
- `/join` should not be the default post-login destination for paid conversion.
- Paid sign-up completion needs a server-side handoff that creates Stripe Checkout with preserved URL campaign context.
- Stripe webhooks remain the source of truth for paid membership activation, renewal, cancellation, and payment failure.
- Clerk can store derived membership status plus Stripe identifiers for fast UI/routing decisions, but Stripe/server-side persistence remain authoritative for billing lifecycle.
