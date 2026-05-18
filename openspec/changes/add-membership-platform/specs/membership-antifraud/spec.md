## ADDED Requirements

### Requirement: Promotion abuse prevention baseline
The system SHALL enforce basic restrictions that reduce abuse of organization promotions and referral discounts.

#### Scenario: Member attempts repeated promotional access
- **WHEN** a user or account attempts to obtain repeated initial-purchase promotional benefit outside the allowed rules
- **THEN** the system blocks or flags the attempt according to the initial antifraud constraints

### Requirement: Renewal discount prevention
The system SHALL prevent initial-purchase promo or referral benefits from leaking into renewal billing behavior.

#### Scenario: Membership renews after discounted signup
- **WHEN** a membership created through a promo or referral reaches renewal
- **THEN** the discount used for the initial purchase is not re-applied automatically

### Requirement: Duplicate history retention
The system SHALL retain enough account and billing history to support manual review of suspicious activity.

#### Scenario: Suspicious duplicate signups are investigated
- **WHEN** the team reviews potentially abusive promotional or referral activity
- **THEN** the system retains relevant historical identifiers such as prior emails, Stripe customer references, promo usage, and referral usage records

### Requirement: Low-friction initial controls
The system SHALL avoid high-friction identity checks such as DNI verification in the initial release.

#### Scenario: Initial release onboarding
- **WHEN** the first membership release goes live
- **THEN** the antifraud baseline relies on Stripe Checkout, Stripe Radar, and application-side history checks rather than DNI verification
