## ADDED Requirements

### Requirement: Clerk membership metadata contract
The system SHALL maintain a defined membership metadata contract on Clerk user records for access decisions and user-facing membership state.

#### Scenario: Public membership metadata is available
- **WHEN** a signed-in user is evaluated for membership-aware routing or UI state
- **THEN** Clerk public metadata includes at least membership status, membership type, organization code when applicable, and referral code used when applicable

#### Scenario: Private billing metadata is available
- **WHEN** the server needs to reconcile identity with billing state
- **THEN** Clerk private metadata includes at least Stripe customer identity and Stripe subscription identity

### Requirement: Stripe metadata attribution contract
The system SHALL attach enough metadata to Stripe billing objects to reconcile the membership purchase with the authenticated user and acquisition source.

#### Scenario: Initial checkout is created
- **WHEN** the initial membership Checkout session is generated
- **THEN** Stripe metadata includes the Clerk user identifier, source type, and the applicable organization or referral context when present

### Requirement: Server-side metadata source-of-truth rules
The system SHALL define which membership fields are authoritative in Clerk, Stripe, or server-side persistence.

#### Scenario: State changes after billing events
- **WHEN** Stripe lifecycle events modify membership state
- **THEN** the system updates the authoritative server-side record first and synchronizes derived metadata to Clerk as needed instead of treating every system as independently authoritative

### Requirement: Minimal metadata scope for phase 1
The system SHALL keep the phase 1 metadata surface limited to the fields required for access, billing reconciliation, and initial attribution.

#### Scenario: Phase 1 metadata is reviewed
- **WHEN** the team reviews the initial membership implementation scope
- **THEN** only the minimum required metadata fields are synchronized across systems instead of a broader future-facing contract

### Requirement: Historical attribution retention
The system SHALL preserve initial acquisition context even if later membership state changes.

#### Scenario: Member renews or cancels later
- **WHEN** a member changes billing status after the initial purchase
- **THEN** the initial acquisition source, initial promo code, and initial referral context remain historically traceable in server-side persistence
