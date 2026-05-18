## MODIFIED Requirements

### Requirement: Astro Initialization
The `NewWeb` project SHALL be maintained on an Astro baseline that is compatible with version 6 and supports SSR, middleware, and server routes required by the membership platform.

#### Scenario: Successful Astro baseline upgrade
- **WHEN** the project runtime is prepared for the membership platform
- **THEN** the project uses an Astro 6-compatible baseline with a valid Astro configuration and dependency set that supports the required server features

### Requirement: CSS/JS Relocation
Global CSS and JS files SHALL remain under `src/styles/` and `src/scripts/` (or equivalent) while continuing to work after the Astro 6-compatible SSR migration.

#### Scenario: Styles and scripts survive SSR upgrade
- **WHEN** the project is upgraded to the approved Astro 6-compatible SSR baseline
- **THEN** global styles and shared scripts remain correctly referenced and bundled for the migrated site
