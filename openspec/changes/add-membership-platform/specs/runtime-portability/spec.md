## ADDED Requirements

### Requirement: Portable SSR runtime adapter
The system SHALL run the membership platform on an Astro SSR adapter that is not specific to Vercel.

#### Scenario: Runtime adapter selection
- **WHEN** the project is configured for SSR, middleware, protected routes, and webhook endpoints
- **THEN** the Astro runtime adapter does not require the `@astrojs/vercel` package to build or run the application

### Requirement: Hosting portability
The system SHALL keep the membership platform deployable on hosting targets other than Vercel without changing application-level membership behavior.

#### Scenario: Hosting target changes later
- **WHEN** the team decides to move the SSR deployment away from Vercel in the future
- **THEN** the core membership flows, route model, and server-side business logic do not depend on Vercel-specific runtime APIs

### Requirement: Runtime-boundary separation
The system SHALL isolate deployment-specific concerns from membership business logic.

#### Scenario: Business logic implementation
- **WHEN** authentication, billing, webhook, or membership state logic is implemented
- **THEN** that logic is expressed independently from adapter-specific or host-specific code paths wherever possible
