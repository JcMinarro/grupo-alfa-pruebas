## ADDED Requirements

### Requirement: Public paid membership and campaign screen
The system SHALL present visitors with a public paid membership/campaign screen before account creation and before initiating Stripe Checkout.

#### Scenario: Visitor reviews paid membership before account creation
- **WHEN** a visitor enters the membership flow from Club Alfa or a campaign link
- **THEN** the system shows the annual paid membership offer before sign-up/sign-in

#### Scenario: Existing signed-in unpaid user enters membership flow
- **WHEN** a signed-in user without active paid membership enters the membership flow
- **THEN** the system allows the user to continue toward Stripe Checkout without showing active paid member content

### Requirement: Paid Club Alfa option
The system SHALL offer the paid Club Alfa annual option at `99 EUR/year` from the public membership/campaign screen.

#### Scenario: User chooses paid Club Alfa
- **WHEN** a visitor chooses the paid Club Alfa option
- **THEN** the system sends the visitor through sign-up/sign-in and then directly creates Stripe Checkout for the annual membership

#### Scenario: Paid plan is presented commercially
- **WHEN** the membership/campaign screen displays the paid Club Alfa option
- **THEN** the option communicates the annual price and the paid benefits already promised on the Club Alfa landing page

### Requirement: URL-based campaign discount preservation
The system SHALL preserve campaign attribution and discount context when a user reaches the membership/campaign screen from a URL code.

#### Scenario: User arrives with campaign link
- **WHEN** a visitor reaches the membership/campaign screen with a supported campaign URL parameter
- **THEN** the screen shows the resolved discounted price when available and the post-sign-up Checkout receives the same Stripe promotion context

#### Scenario: User arrives with referral link
- **WHEN** a visitor reaches the membership/campaign screen with a `ref` campaign parameter
- **THEN** the screen shows the resolved discounted price when available and the post-sign-up Checkout receives the same Stripe promotion context

#### Scenario: User has no URL code
- **WHEN** a visitor reaches the membership/campaign screen without a supported URL code
- **THEN** the system shows the standard annual paid membership price and does not require a discount-code entry field

#### Scenario: User asks to enter a code manually
- **WHEN** the membership/campaign screen is rendered in this phase
- **THEN** the system does not provide a manual discount-code input

### Requirement: Paid-member access remains gated
The system SHALL NOT grant paid member-only route access solely because a user has created a Clerk account or started Checkout.

#### Scenario: Unpaid account opens paid member area
- **WHEN** a signed-in account without active paid membership attempts to open a paid member-only route
- **THEN** the system redirects or presents a payment-required path instead of granting paid member access
