# Design: Homepage Refactor

## Context

The current `index.html` is a placeholder-like implementation. The target is to recreate the high-fidelity design of the original Grupo Alfa website, ensuring all sections from the screenshot `oldScreenshots/index.png` are present and styled correctly.

## Goals

- Achieve 100% visual parity for the homepage.
- Fix layout discrepancies in the Hero, Process, and Services sections.
- Implement the Submarcas and Contact/Map sections.

## Decisions

### 1. Hero Section
- **Background**: Use the architectural/geometric background image.
- **Header**: The logo and navigation will be semi-transparent or integrated into the hero area.

### 2. Process Section (Nuestro Proceso)
- Use a 4-column CSS Grid that collapses to 2 or 1 column on smaller screens.
- Use original icons (Localizamos, Gestionamos, etc.).

### 3. Services Layout (Nuestros Servicios)
- Implement a modern list layout where each service has a title with a broad orange background (full-width or centered as per the screenshot).
- Ensure descriptions have a clean, light serif or sans-serif typography.

### 4. Submarcas Grid
- Replicate the 6-item grid of black buttons.
- Hover effects should be subtle and premium.

### 5. Office & Map Section
- Implement a two-column layout for "Nuestra Oficina" (text and map).
- Use a Google Maps embed or a high-quality static image if an API key is not available.

## Risks / Trade-offs

- **Parity vs. Code Cleanliness**: Replicating a specific layout might require some complex CSS, but visual parity is the priority.
- **Assets**: Some original icons might need extraction or replacement with high-quality equivalents if not already localized.
