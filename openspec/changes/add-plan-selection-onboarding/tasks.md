## 1. Product and routing

- [x] 1.1 Decide the final route name for the public membership/campaign screen.
- [x] 1.2 Define redirect rules for anonymous visitors, authenticated unpaid users, and active paid members.
- [x] 1.3 Define the paid-account branch from sign-up/sign-in directly into Stripe Checkout.
- [x] 1.4 Define the payment-required destination for accounts that exist but do not have active paid membership.

## 2. Membership/campaign experience

- [x] 2.1 Add a responsive public membership/campaign screen for the `99 EUR/year` Club Alfa option.
- [x] 2.2 Include clear copy about the annual paid membership, billing, and renewal expectations.
- [x] 2.3 Preserve campaign context from URL parameters such as `ref` when users continue through sign-up/sign-in.
- [x] 2.4 Show discounted pricing on the public membership/campaign page when a URL code resolves against Stripe.
- [x] 2.5 Do not support manual discount-code entry in this phase.

## 3. Account and payment state

- [x] 3.1 Treat Clerk account creation as identity only, not paid membership activation.
- [x] 3.2 Persist or synchronize Stripe customer/subscription identifiers after Checkout creates them.
- [x] 3.3 Keep unpaid, canceled, failed-payment, expired, and active paid membership states distinct.
- [x] 3.4 Ensure Stripe webhooks update server-side membership state and derived Clerk metadata.

## 4. Paid membership flow

- [x] 4.1 Remove `/join` from the normal paid annual checkout path, keeping it only as legacy/compatibility if needed.
- [x] 4.2 Route paid membership selection into sign-up/sign-in and then directly into Stripe Checkout with any campaign attribution intact.
- [x] 4.3 Continue using Stripe webhooks as the source of truth for paid Club Alfa activation and lifecycle changes.

## 5. Access control and navigation

- [x] 5.1 Ensure paid member-only routes remain available only to active or explicitly allowed paid membership states.
- [x] 5.2 Define what signed-in unpaid users see when they attempt to access paid member routes.
- [x] 5.3 Update header/account entry behavior so unpaid users do not appear as active paid Club Alfa members.
- [x] 5.4 Define the future paid “membership account” screen boundary separately from unpaid payment-required messaging.

## 6. Legal, analytics, and tests

- [x] 6.1 Add legal/disclosure copy for paid account creation before Stripe checkout.
- [ ] 6.2 Track membership/campaign page conversions separately from completed paid checkout conversions.
- [x] 6.3 Update automated coverage for the new redirect model, public membership/campaign screen, URL-code paid path, direct post-sign-up Checkout path, and unpaid access behavior.
