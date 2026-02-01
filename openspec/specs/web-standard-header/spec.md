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
- **THEN** it visually matches the design across all viewports, ensuring that mobile layout is the default and desktop enhancements are added via responsive prefixes (`md:`, `lg:`).

### Requirement: Mobile Toggle
The header SHALL include a visible toggle (burger menu) on screens smaller than 768px.

#### Scenario: Burger menu visibility
- **WHEN** the screen width is less than 768px
- **THEN** the desktop navigation links are hidden and the burger menu icon is visible.

### Requirement: Navigation Drawer
The mobile navigation SHALL be implemented as a full-screen drawer or overlay that triggers on clicking the burger menu.

#### Scenario: Opening the menu
- **WHEN** the user clicks the burger menu icon
- **THEN** the navigation drawer slides in or fades in, showing all site links.

#### Scenario: Dynamic Behavior
- **WHEN** the user scrolls or interacts with the "scrolled" state
- **THEN** header style changes (e.g., background opacity) are applied using Tailwind utilities (e.g., `[.scrolled_&]:bg-white`).
