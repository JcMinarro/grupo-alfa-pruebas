# Capability: Web Index (Modified)

Refine the main index page to align with the new entry point and navigation standards.

## MODIFIED Requirements

### Requirement: Entry Point
The index page should strictly serve as the root `/`.

#### Scenario: No self-referencing HTML
- **WHEN** the site is accessed
- **THEN** internal links to the home page must use `/` instead of `index.html`.

### Requirement: Decoupled Sections
The index page should not be used as a container for other primary pages or contain deep links to sections that are now independent pages.

#### Scenario: Clean sections
- **WHEN** navigating from the index to "PROYECTOS"
- **THEN** it should navigate to a separate page rather than a section within the index using hash anchors.
