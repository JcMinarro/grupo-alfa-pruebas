## ADDED Requirements

### Requirement: Hero Section Parity
The homepage hero section SHALL match the visual structure of the original `https://grupoalfa.net` site, including the background image and centered logo text.

#### Scenario: Verify Hero Elements
- **WHEN** the homepage is loaded
- **THEN** it SHALL display the "GRUPO ALFA" logo and "INVERSIÓN INTELIGENTE" tagline over the architectural geometric background.

### Requirement: Process Section Layout
The "NUESTRO PROCESO" section SHALL utilize the specific 4-step grid layout with the original icons and consistent typography.

#### Scenario: Display Process Steps
- **WHEN** the user scrolls to the process section
- **THEN** it SHALL show "Localizamos", "Gestionamos", "Reformamos", and "Rentabilizamos" with their respective icons in a responsive grid.

### Requirement: Service List Styling
The "NUESTROS SERVICIOS" section SHALL implement the specific orange header style for each service item as seen in the site screenshots.

#### Scenario: Verify Services Style
- **WHEN** viewing the services list
- **THEN** each service title SHALL have a prominent orange background bar.

### Requirement: Submarcas Button Grid
The "SUBMARCAS DE GRUPO ALFA" section SHALL display the six sub-brand links as styled black buttons/items in a responsive grid.

#### Scenario: Verify Submarcas
- **WHEN** viewing the submarcas section
- **THEN** it SHALL show "FLIP ART", "LUJO RENT", "SEGUROS", "ALFA CLEAN", "REY SUBASTOS", and "ALFA LAB" as clickable elements.

### Requirement: Office and Contact Parity
The footer and contact section SHALL include "Nuestra Oficina" details and a Google Maps integration that matches the original site's layout.

#### Scenario: Verify Contact Info
- **WHEN** scrolling to the footer
- **THEN** it SHALL display the office address and a map section.

### Requirement: Asset Organization and Stability
The implementation SHALL use friendly, descriptive filenames for key assets (e.g., `logo-alfa-wolf.png`, `hero-bg.jpg`) and maintain a stable Vite configuration that correctly handles asset proxies without loops.

#### Scenario: Asset Loading
- **WHEN** the site loads
- **THEN** all images SHALL load successfully without 404s or timeouts.
