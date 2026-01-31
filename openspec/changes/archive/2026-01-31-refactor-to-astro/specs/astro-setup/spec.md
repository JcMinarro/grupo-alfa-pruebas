## ADDED Requirements

### Requirement: Astro Initialization
The `NewWeb` project SHALL be initialized as an Astro project.

#### Scenario: Successful Astro init
- **WHEN** `npm create astro@latest` (or equivalent) is run in `NewWeb`
- **THEN** a `package.json` with `astro` dependency and an `astro.config.js` file are created.

### Requirement: Asset Relocation
All static assets (images, logos, etc.) from the legacy root SHALL be moved to the `public/` directory.

#### Scenario: Images accessible after move
- **WHEN** images are moved to `NewWeb/public/assets/`
- **THEN** they can be served at `/assets/` in the Astro site.

### Requirement: CSS/JS Relocation
Global CSS and JS files SHALL be moved to `src/styles/` and `src/scripts/` (or similar) while maintaining references.

#### Scenario: Styles and Scripts linked in Astro
- **WHEN** styles are imported in Astro components
- **THEN** they are correctly bundled and applied to the built pages.
