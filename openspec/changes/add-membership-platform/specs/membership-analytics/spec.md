## ADDED Requirements

### Requirement: Acquisition source tracking
The system SHALL classify each initial membership purchase by acquisition source.

#### Scenario: Member joins through any entry path
- **WHEN** a first-time membership purchase is completed
- **THEN** the system records whether the acquisition source was direct, organization, or referral

### Requirement: Organization reporting baseline
The system SHALL support baseline reporting for organization-driven acquisition.

#### Scenario: Team reviews partner performance
- **WHEN** the team needs to review an organization campaign
- **THEN** the system can report at least signups, conversions, renewals, and cancellations attributable to that organization

### Requirement: Referral reporting baseline
The system SHALL support baseline reporting for member referral behavior.

#### Scenario: Team reviews referral performance
- **WHEN** the team needs to review referral usage
- **THEN** the system can report at least the referral code used, the member who referred, the member who joined, and the resulting membership conversion

### Requirement: Lifecycle event tracking
The system SHALL retain billing lifecycle events needed for operational analysis.

#### Scenario: Team reviews payment state changes
- **WHEN** renewals, payment failures, or cancellations occur
- **THEN** the system stores the relevant event history needed to analyze membership lifecycle behavior over time
