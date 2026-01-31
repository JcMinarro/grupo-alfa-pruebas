## Context

The `NewWeb` project is a collection of ~25 static HTML files representing different sections of the Grupo Alfa website. Each page repeats the same header, footer, and metadata blocks, making updates difficult. We need to refactor this into an Astro project to leverage component-based development and centralized layouts.

## Goals / Non-Goals

**Goals:**
- Move all static HTML files to Astro pages.
- Centralize metadata, headers, and footers into layouts and components.
- Maintain existing visual design and animations.
- Improve file organization (assets, styles, scripts).

**Non-Goals:**
- Redesigning the website (visual changes).
- Changing the underlying business logic or data structures.
- Migrating to a full SPA (Astro will be used for static site generation).

## Decisions

- **Astro v4.x**: Use the latest stable version of Astro for the best features and performance.
- **Layout Strategy**:
  - `BaseLayout.astro`: Contains the HTML wrapper, `<head>`, `<Header />`, and `<Footer />`.
  - `ProjectLayout.astro`: Extends `BaseLayout` or wraps it, providing specific slots for project details and potentially different footer backgrounds.
- **Component Strategy**:
  - `Header.astro`: Shared navigation.
  - `Footer.astro`: Shared information.
  - `ContactForm.astro`: Reusable form logic.
- **Asset Management**:
  - Move everything in `NewWeb/public/assets` to the new `public/assets` directory.
  - Move global scripts (`main.js`) to `src/scripts/` and import them in the layout or specifically in pages as needed.
  - Move global styles (`style.css`, `src/*.css`) to `src/styles/`/`src/components/` and import them in the layouts.

## Risks / Trade-offs

- **Risk**: Broken asset paths. Legacy HTML uses relative paths like `/assets/...` or `./style.css`. These must be meticulously updated or handled by Astro's public directory.
- **Risk**: JS conflicts. `main.js` might expect specific DOM structures that could shift during refactoring.
- **Trade-off**: Build step. Moving from pure HTML to Astro introduces a build step (`npm run build`), but the benefits of maintainability outweigh this minor complexity.
