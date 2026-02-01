# Spec: Tailwind Setup

## ADDED Requirements

### Requirement: Tailwind CSS Installation
The system MUST include the official Tailwind CSS integration for Astro.

#### Scenario: Installation
- **WHEN** the developer runs the proper integration command
- **THEN** Tailwind CSS dependencies are installed
- **THEN** `astro.config.mjs` is updated to include the Tailwind integration

### Requirement: Design System Configuration
The Tailwind configuration MUST define the project's design tokens (colors, fonts, screens) to match the existing brand identity.

#### Scenario: Color Palette Porting
- **WHEN** the configuration is generated
- **THEN** it includes the `primary`, `secondary`, `accent`, and `base` color palettes defined in the current `theme.css`

#### Scenario: Typography Porting
- **WHEN** the configuration is generated
- **THEN** it extends the font family configuration to include `Jost` (main) and `DM Sans` (headings) from the current `theme.css`

### Requirement: Base Styles Injection
The system MUST inject Tailwind's base, components, and utilities directives globally.

#### Scenario: Global CSS
- **WHEN** the application loads
- **THEN** the Tailwind reset and base styles are applied
- **THEN** utility classes are available for use in all components
