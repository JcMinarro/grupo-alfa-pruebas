## ADDED Requirements

### Requirement: Transactional membership emails
The system SHALL support transactional emails for key membership lifecycle events.

#### Scenario: User joins successfully
- **WHEN** a membership is confirmed after the initial purchase flow
- **THEN** the system can send a welcome or membership-active transactional email to the member

#### Scenario: Billing lifecycle changes occur
- **WHEN** renewal, payment failure, or cancellation events are processed
- **THEN** the system can trigger the corresponding transactional email flows for that billing state

### Requirement: Event-driven email triggers
The system SHALL treat server-side lifecycle events as the trigger source for membership transactional emails.

#### Scenario: Avoid frontend-only email triggering
- **WHEN** checkout success, renewal, payment failure, or cancellation happens
- **THEN** transactional email behavior is driven from validated backend events instead of relying solely on frontend route visits

### Requirement: Segmentation-ready email attributes
The system SHALL keep enough membership attributes to support future segmentation for campaigns.

#### Scenario: Future campaign filtering
- **WHEN** the team wants to target members by organization, referral origin, billing cadence, or lifecycle state
- **THEN** the stored membership data contains the attributes required to build those segments without redesigning the core model
