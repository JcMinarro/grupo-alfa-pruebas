# Proposal: Refactor NewWeb to Astro

The `NewWeb` project is currently a collection of static HTML files. As the project grows, managing common elements like headers, footers, and meta tags across multiple files becomes difficult and error-prone. This proposal outlines the refactoring of the project to use the Astro framework to introduce modularity and reusable layouts.

## Solution
Migrate the `NewWeb` project to Astro. This involves:
1. Initializing an Astro project.
2. Centrally defining reusable layouts (`BaseLayout`, `ProjectLayout`).
3. Creating modular components for shared UI elements (`Header`, `Footer`).
4. Converting existing HTML pages into Astro components/pages.

## Capabilities

### New Capabilities
- `astro-setup`: A pre-configured Astro project structure replacing the current static file setup.
- `site-layouts`: Generic Astro layouts to govern the structure of common pages and project-specific pages.
- `shared-components`: Reusable components for `Header`, `Footer`, `ContactForm`, and `PortfolioGrid`.

### Modified Capabilities
- `page-migration`: Existing HTML pages (`index.html`, `proyectos.html`, etc.) refactored into Astro pages while maintaining 100% visual fidelity.

## Impact
- **Maintainability**: Common elements will be updated in a single location.
- **Development Speed**: Component-based development will accelerate future feature additions.
- **Performance**: Improved build-time optimization and reduced client-side JavaScript.
- **Structure**: Clean separation between assets, components, layouts, and pages.
