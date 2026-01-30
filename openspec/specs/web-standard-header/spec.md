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

### Requirement: Visual Style
The header must match the design layout and styling standards.
- Logo (cabeza) on the far left.
- Navigation links on the right.
- Links in ALL CAPS.

#### Scenario: Active item styling
- **WHEN** a page is active (e.g., PROYECTOS)
- **THEN** its link in the header must have a solid underline.
