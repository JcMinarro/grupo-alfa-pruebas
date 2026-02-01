# Implementation Tasks

## Foundation: Design System
- [x] Create `src/styles/theme.css` with CSS variables for colors, typography, and spacing.
- [x] Add utility classes (`.container`, `.text-center`, `.fade-in`, `.grid`, `.flex`) to `theme.css`.
- [x] Import `theme.css` in `src/layouts/BaseLayout.astro` and remove conflicting global styles from legacy CSS files.

## Core Components
- [x] Create `src/components/Hero.astro` implementing the Hero spec.
- [x] Refactor `src/components/Footer.astro` to remove `customStyle`, enforce dark theme, and look identical to Index footer.
- [x] Update `src/components/Footer.astro` to use the correct logo asset (e.g., `logo-alfa-wolf.png`).
- [x] Refactor `src/components/ContactForm.astro` to support optional props (`showPhone`, `showPrivacy`, `action`, `theme`).

## Content Components
- [x] Create `src/components/InfoGrid.astro` (container).
- [x] Create `src/components/GridItem.astro` (item card).

## Project Template Components
- [x] Create `src/components/project/ProjectDetails.astro`.
- [x] Create `src/components/project/ProjectFinancials.astro`.
- [x] Create `src/components/project/ProjectROI.astro`.

## Page Refactoring
- [x] **Home (`index.astro`)**:
    - [x] Replace Hero section with `<Hero />`.
    - [x] Use `<ContactForm />` with simple props.
    - [x] Verify Footer looks correct (no overrides).
- [x] **Projects Landing (`proyectos.astro`)**:
    - [x] Replace Hero section with `<Hero />`.
    - [x] Remove `footerStyle` prop from Layout.
- [x] **Investors (`inversores.astro`)**:
    - [x] Replace manual process grid with `<InfoGrid>`.
    - [x] Remove `footerStyle` prop.
- [x] **Hunters (`alfa-hunters.astro`)**:
    - [x] Replace Hero with `<Hero />` (video support).
    - [x] Replace benefits grid with `<InfoGrid>`.
    - [x] Remove `footerStyle` prop.
- [x] **Contact (`contacto.astro`)**:
    - [x] Replace hardcoded form with `<ContactForm />` (full props).
    - [x] Remove `footerStyle` prop.
    - [x] Replace Hero with `<Hero />`.
- [x] **Project Sub-pages** (e.g., `local-comercial`, `chalet-dividido`, `flip-house`, etc.):
    - [x] Update `ProjectLayout` or page files to use `<Hero />`.
    - [x] Replace financial tables/grids with `<ProjectDetails>`, `<ProjectFinancials>`, `<ProjectROI>`.
    - [x] Remove `footerStyle` overrides.

## Cleanup & Verification
- [x] Delete valid logo asset: `logo-grupo-alfa-cabeza-negra-mv02n2ZjzOc5pE3k.png`.
- [x] Run `npm run build` to verify no errors.
- [x] Manual verification of `/index` footer matching original.
- [x] Manual verification of forms submission.
