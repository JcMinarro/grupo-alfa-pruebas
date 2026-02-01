# Proposal: Integrate Tailwind CSS and Refactor Styles

## Context
The project has recently migrated to an Astro-based architecture to improve performance and maintainability. Currently, styling is handled through a monolithic `src/styles/theme.css` file and potentially scattered inline styles or component-specific CSS. As the project grows, maintaining visual consistency and managing custom CSS becomes increasingly complex. Modern web development practices favor utility-first CSS frameworks for rapid UI development and consistent design systems.

## Problem
*   **Maintenance Overhead**: The existing `src/styles/theme.css` is large (33KB+) and contains global styles that are difficult to manage and prone to specificity conflicts.
*   **Inconsistency**: Without a strict utility system, design values (colors, spacing, typography) may drift, leading to visual inconsistencies.
*   **Lack of Scalability**: Adding new features requires writing more custom CSS, further bloating the bundle and increasing technical debt.
*   **Developer Experience**: Custom CSS requires context switching between HTML/JSX and CSS files, slowing down iteration.

## Solution
Integrate Tailwind CSS into the Astro project and refactor existing styles to use Tailwind's utility classes. This will involve:
1.  **Integration**: Installing and configuring the official Tailwind CSS integration for Astro.
2.  **Configuration**: Porting the existing design tokens (colors, fonts, breakpoints) from `theme.css` into `tailwind.config.mjs` to ensure the "Grupo Alfa" brand identity is preserved.
3.  **Refactoring**: Systematically replacing vanilla CSS in layouts, pages, and components with Tailwind utility classes.
4.  **Cleanup**: Removing obsolete CSS rules from `theme.css`.

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Replace <name> with kebab-case identifier (e.g., user-auth, data-export, api-rate-limiting). Each creates specs/<name>/spec.md -->
- `tailwind-setup`: Installation of Tailwind CSS, configuration of the design system (theme, colors, fonts) in `tailwind.config.mjs`, and setup of base directives.
- `component-refactor`: Conversion of existing Astro components and pages to use Tailwind utility classes instead of custom CSS classes or inline styles.

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->
- `web-standard-header`: The header implementation will be updated to rely on Tailwind classes for styling instead of custom CSS, ensuring it matches the new system while retaining visual parity.

## Impact

*   **Codebase**: `package.json` will gain Tailwind dependencies. `astro.config.mjs` will be updated. `src/styles/theme.css` will be significantly reduced or eliminated. All `.astro` files in `src/` will be modified.
*   **Workflow**: Development workflow will shift to utility-first styling.
*   **Performance**: CSS bundle size should decrease due to Tailwind's pruning (tree-shaking) of unused styles.
