## ADDED Requirements

### Requirement: Paid membership disclosures before checkout
The system SHALL present paid Club Alfa membership disclosures before or during the paid checkout flow.

#### Scenario: User reviews paid membership before account creation
- **WHEN** a visitor reviews the membership/campaign screen before sign-up
- **THEN** the system provides clear paid membership, billing, renewal, privacy, and communication disclosures appropriate to the annual Club Alfa membership

#### Scenario: User continues into Stripe Checkout
- **WHEN** a user completes sign-up/sign-in and continues into Stripe Checkout
- **THEN** paid membership terms, billing, renewal, and transactional communication expectations remain available before or during checkout
