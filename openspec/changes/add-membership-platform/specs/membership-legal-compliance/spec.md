## ADDED Requirements

### Requirement: Membership legal disclosures
The system SHALL present the legal information required for paid membership onboarding.

#### Scenario: User enters the paid membership flow
- **WHEN** a user signs up or proceeds toward checkout for the membership product
- **THEN** the flow includes access to the applicable membership terms, privacy information, and any required purchase disclosures

### Requirement: Minimal legal scope for phase 1
The system SHALL keep the first release limited to the minimum legal and consent surface needed for paid onboarding and operational communications.

#### Scenario: Phase 1 scope is reviewed
- **WHEN** the team reviews the first release scope
- **THEN** legal and compliance behavior is limited to paid-membership disclosures, privacy visibility, communication consent boundaries, and the approved low-friction data collection model

### Requirement: Communication consent boundaries
The system SHALL distinguish required operational communications from optional marketing communications.

#### Scenario: User completes onboarding
- **WHEN** a membership is created and future email communications are configured
- **THEN** the system can separate transactional membership communications from optional marketing or campaign messaging consent

### Requirement: Personal data handling baseline
The system SHALL keep the first release aligned with a low-friction data collection model.

#### Scenario: Initial onboarding scope
- **WHEN** the first release is launched
- **THEN** the platform avoids collecting unnecessary high-friction identity data such as DNI unless a later compliance requirement explicitly introduces it
