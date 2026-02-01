## 1. Environment & Config

- [x] 1.1 Install Tailwind CSS integration using `npx astro add tailwind`
- [x] 1.2 Identify and extract color palette and fonts from `src/styles/theme.css`
- [x] 1.3 Update `tailwind.config.mjs` with extracted theme configuration (colors, fonts, screens)
- [x] 1.4 Verify development server runs and browser loads Tailwind base styles

## 2. Core Refactor (Global & Layouts)

- [x] 2.1 Refactor `src/layouts/Layout.astro` to use Tailwind utilities for `html` and `body`
- [x] 2.2 Refactor `Header.astro` component to use Tailwind classes
- [x] 2.3 Refactor `Footer.astro` component to use Tailwind classes
- [x] 2.4 Remove ported global styles from `src/styles/theme.css` to verify substitution
- [x] 2.5 Verify `Header` and `Footer` responsiveness and visual parity

## 3. Page Refactor

- [x] 3.1 Refactor `src/pages/index.astro` (Homepage) section by section
- [x] 3.2 Refactor Hero section in Homepage
- [x] 3.3 Refactor Services/Process sections in Homepage
- [x] 3.4 Verify Homepage for visual regressions

## 4. Verification & Cleanup

- [x] 4.1 Audit codebase for mixed styling (ensure no conflicting custom CSS remains for refactored parts)
- [x] 4.2 Run final visual check of Header, Footer, and Homepage across mobile and desktop
- [x] 4.3 Clean up any unused files or assets
