## MODIFIED Requirements

### Requirement: Account creation before checkout
The system SHALL require the user to authenticate before starting the paid membership checkout flow, while allowing paid membership and campaign review before authentication.

#### Scenario: Anonymous user wants to join
- **WHEN** an anonymous visitor clicks the primary join path from the public Club Alfa landing
- **THEN** the system sends the visitor to the public paid membership/campaign screen before sign-up and does not allow Stripe Checkout until account creation is complete

#### Scenario: Signed-in unpaid user resumes onboarding
- **WHEN** an authenticated user without an active paid membership enters the membership flow
- **THEN** the system allows the user to initiate Stripe Checkout without visiting `/join` as a mandatory intermediate screen

### Requirement: Phase 1 annual membership plan
The system SHALL offer a paid Club Alfa membership plan priced at `99 EUR/year`.

#### Scenario: User reviews the paid plan before sign-up
- **WHEN** a visitor views the paid Club Alfa option on the membership/campaign screen
- **THEN** the system presents the annual Club Alfa membership as the paid selectable plan for phase 1 before account creation

#### Scenario: User completes paid purchase
- **WHEN** a user finishes the paid Checkout flow successfully
- **THEN** the resulting Stripe subscription is created against the annual Club Alfa membership plan

### Requirement: Unpaid account handling
The system SHALL treat account creation without successful payment as an unpaid state, not as active membership.

#### Scenario: User cancels Stripe Checkout
- **WHEN** a user creates an account but cancels or abandons Stripe Checkout
- **THEN** the next login shows a payment-required path instead of paid member content

#### Scenario: Paid membership is no longer active
- **WHEN** a user's payment fails, subscription is canceled, or membership expires
- **THEN** paid member content remains hidden and the user sees membership payment or renewal messaging
