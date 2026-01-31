## ADDED Requirements

### Requirement: Page Fidelity
All migrated pages SHALL maintain 100% visual and functional parity with the original static HTML versions.

#### Scenario: Verify index page
- **WHEN** `index.html` is converted to `src/pages/index.astro`
- **THEN** the rendered page looks identical to the original and all animations and scripts work as expected.

### Requirement: Clean URLs
The Astro project SHALL support clean URLs for all project pages.

#### Scenario: Accessing a project page
- **WHEN** a user navigates to `/local-comercial`
- **THEN** the corresponding Astro page is rendered without requiring the `.html` extension.

### Requirement: Global Script Integration
The `main.js` script SHALL be appropriately integrated into the Astro project.

#### Scenario: Script loading
- **WHEN** a page is loaded
- **THEN** it correctly loads and executes the JS logic previously found in `main.js`.
