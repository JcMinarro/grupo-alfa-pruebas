## Context

The implemented membership platform currently has this funnel:

```text
/club
  |
  v
/sign-up or /sign-in
  |
  v
/join
  |
  v
Stripe Checkout
  |
  v
/members after webhook-confirmed active membership
```

That is technically safe because Clerk identity exists before Stripe payment, but `/join` is now unnecessary friction after account creation. The desired funnel is:

```text
/club or campaign link
  |
  v
public membership/campaign page
  |
  v
/sign-up or /sign-in
  |
  v
Stripe Checkout
  |
  v
/members after webhook-confirmed active membership
```

If payment is canceled or fails, the Clerk account can still exist, but it must not unlock paid membership content.

## Goals / Non-Goals

**Goals:**
- Let visitors review the paid membership before creating an account.
- Show campaign/referral discounted pricing before sign-up when a supported URL code is present.
- Keep Club Alfa as the paid annual plan at `99 EUR/year`.
- Route paid selection into sign-up/sign-in and then directly to Stripe Checkout.
- Preserve URL-based campaign/referral context through sign-up so Checkout receives the resolved Stripe promotion code.
- Ensure unpaid accounts, canceled subscriptions, failed payments, and expired memberships do not see paid member content.
- Preserve paid member-only protection for `/members` content that requires an active paid membership.

**Non-Goals:**
- Adding a free account product/path.
- Adding monthly billing in this phase.
- Adding a second paid Stripe product.
- Implementing the future member account details screen content.
- Changing `/club` into an authenticated dashboard.
- Supporting manual discount-code entry in this phase.

## Product Shape

```text
                 ┌────────────────────┐
                 │ Visitor            │
                 └─────────┬──────────┘
                           │
                           v
                 ┌────────────────────┐
                 │ Membership /       │
                 │ campaign page      │
                 └─────────┬──────────┘
                           │
                           v
                 ┌────────────────────┐
                 │ Clerk sign-up/in   │
                 └─────────┬──────────┘
                           │
                           v
                 ┌────────────────────┐
                 │ Stripe Checkout    │
                 └──────┬────────┬────┘
                        │        │
             paid active│        │canceled / failed / expired
                        v        v
              ┌─────────────┐  ┌────────────────────┐
              │ /members    │  │ Payment-required   │
              │ paid content│  │ message / retry    │
              └─────────────┘  └────────────────────┘
```

Account creation is not membership activation. Paid membership activation happens only after Stripe confirms the subscription lifecycle through webhook processing.

## Decisions

### Membership/campaign page before authentication

Add a public membership/campaign page before sign-up/sign-in. Users see the annual price, benefits, and any URL-code discount before creating an account.

Rationale:
- Visitors understand the paid commitment before account creation.
- Campaign/referral links can show a clear discounted price without a manual coupon step.
- Payment conversion improves because account creation can hand off directly to Stripe.

### Remove `/join` from the normal paid path

Do not keep `/join` as the mandatory paid checkout-preparation route. If retained, it should be legacy/compatibility only, not the default post-authentication destination.

Rationale:
- The paid user has already reviewed the membership before sign-up.
- After sign-up, the account exists in Clerk, so the server can immediately create Stripe Checkout with the user id and campaign context.
- Removing the extra screen should improve conversion.

### URL-only discount codes

Discounts are not entered manually by users in this phase. Codes arrive through URL context, for example `?ref=xxx` or a future campaign parameter. The membership/campaign page shows the original price crossed out and the discounted price when the URL code resolves against Stripe. When the visitor proceeds to sign-up/sign-in, the code context is preserved. After authentication completes, Checkout is created directly with the resolved Stripe promotion code.

Rationale:
- Avoids a manual coupon-entry step after registration.
- Keeps partner/referral journeys simple: follow a link, see discounted price, create account, pay.
- Reduces support risk from mistyped codes.
- Keeps Stripe Checkout free of a second promotion-code field.

### Membership state source of truth

Stripe webhooks and server-side persistence remain authoritative for paid membership lifecycle. Clerk stores derived metadata for fast routing/UI decisions and references to Stripe objects.

Minimum model:
- Clerk public metadata: derived membership status and membership type for UI/routing.
- Clerk private metadata: Stripe customer id and Stripe subscription id when they exist.
- Server-side persistence: canonical user-membership link, subscription state, payment lifecycle, attribution, and history.
- Stripe: billing/subscription source of truth.

Rationale:
- Clerk is excellent for authentication and fast app decisions, but billing can change asynchronously outside the current browser session.
- Stripe can receive cancellations, payment failures, refunds, disputes, and subscription lifecycle changes after sign-up.
- Webhooks keep Clerk/server state synchronized without trusting frontend redirects.

### Paid access remains subscription-gated

Only active or otherwise explicitly allowed paid membership statuses should unlock paid member-only content.

Unpaid states include:
- Account created but Checkout canceled.
- Checkout started but not completed.
- Payment failed.
- Subscription canceled.
- Subscription expired or no longer active.

Rationale:
- Account creation alone is not paid membership.
- A user who logs in without an active paid membership should see a payment-required or retry-payment path, not the member account content.
- Future monthly plans can reuse the same membership-status model.

## Risks / Trade-offs

- [Campaign code loss during sign-up] -> Preserve URL/campaign context through Clerk redirects and the server-side checkout handoff.
- [Webhook delay after successful payment] -> Keep success page in pending/activation state until webhook-confirmed membership is available.
- [Stripe state changes after login] -> Refresh membership from server-side persistence and webhook-derived Clerk metadata rather than trusting stale frontend state.
- [Existing tests assume `/sign-up -> /join`] -> Specs and tests need to change to reflect membership/campaign page -> sign-up -> direct Checkout for the paid path.

## Open Questions

- Should the public route be `/join`, `/membership`, `/plans`, or a campaign-specific route name? Current product direction says the current `/join` screen as implemented should not remain a post-sign-up step.
- Should the URL parameter be standardized as `ref`, `promo`, or a more generic campaign parameter?
- What should the “payment required” screen contain for accounts that exist but are not active paid members?
- What should the future “membership account” screen contain once a paid member logs in?
