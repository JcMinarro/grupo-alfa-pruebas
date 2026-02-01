# Capability: Standard Web Header

Establishing a consistent and functional header across all pages of the Grupo Alfa website.

## Requirements

### Requirement: Unified Structure
All pages must include the exact same header HTML structure to ensure consistency.

#### Scenario: Navigation links consistency
- **WHEN** any page is loaded
- **THEN** the header must contain links to: Home (/), Projects (/proyectos), Promoters (/promotores), Investors (/inversores), Alfa Hunters (/alfa-hunters), and Contact (/contacto).

### Requirement: Clean Navigation
Links in the header must not include the `.html` extension.

#### Scenario: Home link
- **WHEN** the user clicks the logo or the "INICIO" link
- **THEN** it should point to `/` instead of `index.html`.

#### Scenario: Internal page links
- **WHEN** the user clicks on "PROYECTOS"
- **THEN** it should point to `/proyectos` instead of `proyectos.html`.

### Requirement: Header Styling
The header MUST be styled using Tailwind CSS utility classes instead of custom CSS.

#### Scenario: Visual Consistency
- **WHEN** the header is rendered with Tailwind classes
- **THEN** it visually matches the design across mobile and desktop, using Tailwind's responsive prefixes (`md:`, `lg:`).

#### Scenario: Dynamic Behavior
- **WHEN** the user scrolls or interacts with the "scrolled" state
- **THEN** header style changes (e.g., background opacity) are applied using Tailwind utilities (e.g., `[.scrolled_&]:bg-white`).
