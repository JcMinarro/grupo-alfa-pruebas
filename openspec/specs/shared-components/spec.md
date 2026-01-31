# Capability: Shared Components

## Purpose
Centrally manage reusable UI elements across all pages of the Astro website to ensure consistency and maintainability.

## Requirements

### Requirement: Global Header Component
The header SHALL be extracted into a `Header.astro` component.

#### Scenario: Header menu functionality
- **WHEN** the `Header` component is rendered
- **THEN** it contains the logo and the navigation menu with links to `/`, `/proyectos`, etc.

### Requirement: Global Footer Component
The footer SHALL be extracted into a `Footer.astro` component.

#### Scenario: Footer contact info
- **WHEN** the `Footer` component is rendered
- **THEN** it contains the correct contact information and social links.

### Requirement: Reusable Contact Form
The contact form seen in multiple pages SHALL be extracted into a `ContactForm.astro` component.

#### Scenario: Form validation
- **WHEN** the `ContactForm` is used
- **THEN** it maintains required fields and existing submission behavior (or improves upon it).
