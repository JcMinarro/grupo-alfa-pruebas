# Capability: Web Index

## Purpose
Define the requirements for the Grupo Alfa homepage (`/index.html`).

## Requirements

### Requirement: Homepage Implementation
The system SHALL implement the `/index` page (displayed at root) as a faithful clone.

#### Scenario: User Lands on Site
- **WHEN** user visits `/` or `/index.html`
- **THEN** the full Grupo Alfa homepage is displayed (Hero, Services, Projects, Contact).

### Requirement: Entry Point
The index page should strictly serve as the root `/`.

#### Scenario: No self-referencing HTML
- **WHEN** the site is accessed
- **THEN** internal links to the home page must use `/` instead of `index.html`.

### Requirement: Navigation Hub
The homepage SHALL provide correct navigation to all implemented sub-pages using clean URLs.

#### Scenario: Navigation
- **WHEN** user clicks a project or service link
- **THEN** they are navigated to the correct local page (e.g., `/rey-subastos`, `/flip-house`).

### Requirement: Decoupled Sections
The index page should not be used as a container for other primary pages or contain deep links to sections that are now independent pages.

#### Scenario: Clean sections
- **WHEN** navigating from the index to "PROYECTOS"
- **THEN** it should navigate to a separate page rather than a section within the index using hash anchors.
