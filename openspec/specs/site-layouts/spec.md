# Capability: Site Layouts

## Purpose
Define a hierarchical layout system that provides a consistent shell for all pages while allowing for specific customizations via slots.

## Requirements

### Requirement: Base Layout
A `BaseLayout.astro` component SHALL be created to contain the core HTML structure shared by all pages.

#### Scenario: Base Layout correctly structured
- **WHEN** a page uses `BaseLayout`
- **THEN** it includes the `<head>` with common meta tags, the site `<header>`, the `<main>` content slot, and the site `<footer>`.

### Requirement: Project Layout
A `ProjectLayout.astro` component SHALL be created specifically for project detail pages (e.g., `local-comercial.html`).

#### Scenario: Project Layout provides specific sections
- **WHEN** a project page uses `ProjectLayout`
- **THEN** it includes specific project meta tags and potentially different footer backgrounds as seen in legacy pages.

### Requirement: Layout Slots
Layouts SHALL use Astro slots to allow pages to inject content into specific areas (e.g., `head`, `default`).

#### Scenario: Injecting specific scripts
- **WHEN** a page provides a `script` slot
- **THEN** the script is correctly placed in the layout's head or before the closing body tag.
