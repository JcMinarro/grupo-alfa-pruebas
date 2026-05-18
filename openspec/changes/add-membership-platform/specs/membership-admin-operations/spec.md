## ADDED Requirements

### Requirement: Organization and promo administration baseline
The system SHALL preserve the minimum operational structure needed to add internal organization and promo administration in phase 2.

#### Scenario: Team manages partner campaigns
- **WHEN** the team later introduces phase 2 admin workflows for organization campaigns
- **THEN** the platform already preserves the organization records, promo codes, and usage state needed to support that future operational surface

### Requirement: Membership support visibility
The system SHALL preserve operational visibility needed to support member incidents.

#### Scenario: Team investigates a member issue
- **WHEN** support needs to review a membership problem involving signup, billing, promo attribution, or referral attribution
- **THEN** the system exposes or stores enough member history to identify the issue and support manual resolution

### Requirement: Manual exception handling readiness
The system SHALL allow future operational workflows for exceptional cases without redesigning the platform foundation.

#### Scenario: Team needs a manual override later
- **WHEN** the business later introduces approved manual support flows such as promo correction or access review
- **THEN** the platform data model and operational surface are already structured to support those workflows without changing the public onboarding model
