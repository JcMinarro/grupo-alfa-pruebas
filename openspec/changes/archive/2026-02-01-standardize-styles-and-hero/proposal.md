# Standardize Styles and Hero Component

## Goal
Standardize the codebase's styling approach and implement a reusable Hero component to ensure visual consistency and reduce code duplication.

## Why
Currently, the codebase uses multiple separate CSS files (e.g., `home.css`, `portfolio.css`) with duplicated styles and values. The "Hero" section is implemented differently across pages (`index.astro` vs `proyectos.astro`), leading to inconsistent behavior and maintenance challenges.

## What Changes
1.  **Refactor CSS**: Consolidate global styles, variables, and typography into a unified Design System.
2.  **Create Hero Component**: Build a flexible `Hero.astro` component to standardizing hero sections across `index.astro`, `proyectos.astro`, and others.
3.  **Refactor Panels & Grids**: Extract specific content grids (e.g., `process-section` in `/inversores` and `benefits-grid` in `/alfa-hunters`) into a reusable `InfoGrid` component.
4.  **Standardize Forms**: Enhance `ContactForm.astro` to support all required fields (terms checkbox, etc.) and replace the hardcoded form in `/contacto`.
5.  **Standardize Footer**: Ensure all pages use the exact footer format and styling as `/index`. Replace the incorrect logo (`logo-grupo-alfa-cabeza-negra...`) with the correct asset (e.g., `logo-alfa-wolf.png` or `logo-alfa-horizontal.png`) and remove the invalid asset.
6.  **Standardize Project Pages**: Create reusable components (`ProjectDetails`, `ProjectFinancials`, `ProjectROI`) to unify the structure of project subsites like `/local-comercial` and `/mini-estudios`.
7.  **Refactor Pages**: Update all affected pages to use these new components.
8.  **Asset Cleanup**: Remove unused or incorrect identity assets.

## Capabilities
-   `Design System`
-   `Hero Component`
-   `Footer Component`
-   `Content Components` (InfoGrid, benefits, steps)
-   `Forms` (Unified ContactForm)
-   `Project Templates` (Standardized components for project details)

## Impact
-   **Consistency**: A unified look and feel across all pages, including sub-pages.
-   **Reusable Library**: A set of robust components for future pages.
-   **Maintainability**: drastic reduction in duplicated HTML and CSS.
-   **Performance**: Optimized CSS delivery.
