## MODIFIED Requirements

### Requirement: Clerk membership metadata contract
The system SHALL maintain a defined membership metadata contract on Clerk user records for fast routing and UI decisions, while treating Stripe webhooks and server-side persistence as authoritative for billing lifecycle state.

#### Scenario: Public membership metadata is available
- **WHEN** a signed-in user is evaluated for membership-aware routing or UI state
- **THEN** Clerk public metadata includes derived paid membership status and membership type when available

#### Scenario: Private billing metadata is available
- **WHEN** the server needs to reconcile identity with billing state
- **THEN** Clerk private metadata includes Stripe customer identity and Stripe subscription identity when a paid checkout or paid membership has created those identifiers

## ADDED Requirements

### Requirement: Account creation is separate from paid membership activation
The system SHALL distinguish a Clerk account from an active paid membership.

#### Scenario: User creates account before payment
- **WHEN** a user completes Clerk sign-up but has not completed Stripe Checkout
- **THEN** the system identifies the user as unpaid and does not grant paid member access

#### Scenario: Stripe lifecycle changes membership state
- **WHEN** Stripe sends checkout completion, renewal, payment failure, cancellation, or expiration lifecycle events
- **THEN** the system updates server-side membership state and derived Clerk metadata accordingly

#### Scenario: Access control evaluates membership
- **WHEN** the system evaluates whether an account can access paid member-only routes
- **THEN** only active or explicitly allowed paid membership states satisfy access requirements
