## ADDED Requirements

### Requirement: English membership route model
The system SHALL provide the membership platform using English application routes while keeping the existing public marketing pages intact.

#### Scenario: Public onboarding routes exist
- **WHEN** a visitor begins the membership flow
- **THEN** the system provides public routes for `/sign-in`, `/sign-up`, `/join`, `/checkout/success`, and `/checkout/cancel`

#### Scenario: Private member routes exist
- **WHEN** a signed-in member navigates within the private area
- **THEN** the system provides `/members`, `/members/profile`, `/members/membership`, `/members/benefits`, `/members/resources`, `/members/events`, `/members/expert-sessions`, and `/members/referrals`

### Requirement: Account creation before checkout
The system SHALL require the user to authenticate before starting the paid membership checkout flow.

#### Scenario: Anonymous user wants to join
- **WHEN** an anonymous visitor clicks the primary join path from the public Club Alfa landing
- **THEN** the system sends the visitor to the sign-up flow before allowing access to `/join` or Stripe Checkout

#### Scenario: Signed-in user resumes onboarding
- **WHEN** an authenticated user without an active membership enters the onboarding flow
- **THEN** the system allows the user to continue to `/join` and initiate Checkout

### Requirement: Initial authentication methods
The system SHALL support email plus password and magic link as the initial authentication methods for the membership platform.

#### Scenario: User signs up or signs in without social login
- **WHEN** a user enters the authentication flow for the first release
- **THEN** the system offers email plus password and magic link flows without requiring Google login support

### Requirement: Phase 1 annual membership plan
The system SHALL offer a single phase 1 paid membership plan priced at `99 EUR/year`.

#### Scenario: User reviews the join step
- **WHEN** a user views the join route before checkout
- **THEN** the system presents the annual Club Alfa membership as the only selectable paid plan for phase 1

#### Scenario: User completes purchase
- **WHEN** a user finishes the initial Checkout flow successfully
- **THEN** the resulting Stripe subscription is created against the annual membership plan

### Requirement: Initial-purchase-only discount rules
The system SHALL expose one user-facing discount code field, validate that code against Stripe before Checkout, and apply it only on the initial membership purchase.

#### Scenario: User applies a valid code on first purchase
- **WHEN** a first-time buyer enters a valid discount code during the initial checkout flow
- **THEN** the system applies that single Stripe promotion code to Checkout, updates the pre-checkout price display, and does not expose another code field in Stripe Checkout

#### Scenario: Code metadata defines attribution
- **WHEN** a valid Stripe promotion code has metadata such as `sourceType`, `organizationCode`, or a future referrer/member identifier
- **THEN** the system stores that attribution metadata while keeping the visible code format free of required technical prefixes

#### Scenario: Renewal ignores prior codes
- **WHEN** an existing membership renews or a future membership plan change happens later
- **THEN** the system does not reapply the initial promo or referral code automatically

### Requirement: Locked campaign-derived codes
The system SHALL prefill and lock the single discount code field when the user enters the onboarding flow from a campaign link.

#### Scenario: User arrives from organization link
- **WHEN** a visitor opens a sign-up or join route with a valid `promo` campaign parameter
- **THEN** the system pre-populates the single discount code field and renders it as immutable for that onboarding session

#### Scenario: User arrives from referral link
- **WHEN** a visitor opens a sign-up or join route with a valid `ref` campaign parameter
- **THEN** the system pre-populates the single discount code field and renders it as immutable for that onboarding session

#### Scenario: User enters a code manually
- **WHEN** a visitor does not arrive from a campaign link but has a valid code
- **THEN** the onboarding flow still allows manual code entry before the initial checkout

### Requirement: Webhook-confirmed membership activation
The system SHALL treat server-side Stripe event processing as the source of truth for membership activation and lifecycle updates.

#### Scenario: Checkout success waits for activation
- **WHEN** Stripe redirects the user to `/checkout/success`
- **THEN** the system shows a successful purchase confirmation without granting member access until the webhook-confirmed membership state is active

#### Scenario: Renewal or cancellation changes access state
- **WHEN** Stripe sends renewal, payment failure, or subscription cancellation events
- **THEN** the system synchronizes the persisted membership state and uses that state to control access to `/members` routes

### Requirement: Private member area minimum release scope
The system SHALL provide a minimum private member area focused on operational membership needs even if premium content libraries are not yet complete.

#### Scenario: Active member opens dashboard
- **WHEN** an active member visits `/members`
- **THEN** the system shows membership-oriented navigation and access to membership, profile, benefits, referrals, and future content sections

#### Scenario: Incomplete content areas exist
- **WHEN** an active member opens `/members/resources`, `/members/events`, or `/members/expert-sessions` before full content is published
- **THEN** the system still provides those routes with valid member-only placeholders or empty states instead of exposing missing-page errors
