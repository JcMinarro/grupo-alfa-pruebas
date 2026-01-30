# Capability: Web Index

## Purpose
Define the requirements for the Grupo Alfa homepage (`/index.html`).

## Requirements

### Requirement: Homepage Implementation
The system SHALL implement the `/index` page (displayed at root) as a faithful clone.

#### Scenario: User Lands on Site
- **WHEN** user visits `/` or `/index.html`
- **THEN** the full Grupo Alfa homepage is displayed (Hero, Services, Projects, Contact).

### Requirement: Navigation Hub
The homepage SHALL provide correct navigation to all implemented sub-pages.

#### Scenario: Navigation
- **WHEN** user clicks a project or service link
- **THEN** they are navigated to the correct local page (e.g., `rey-subastos.html`, `flip-house.html`).
