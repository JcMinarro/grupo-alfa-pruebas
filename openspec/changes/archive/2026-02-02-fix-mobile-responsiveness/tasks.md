## 1. Header Refactor (Mobile-First)

- [x] 1.1 Add burger menu button to `Header.astro` with Tailwind responsive visibility (`md:hidden`).
- [x] 1.2 Implement the mobile navigation drawer/overlay in `Header.astro` with glassmorphism effects.
- [x] 1.3 Refactor existing desktop navigation list to be hidden on mobile (`hidden md:flex`).
- [x] 1.4 Centralize navigation links into a reusable structure within the component to avoid duplication between mobile and desktop views.

## 2. Navigation Logic Implementation

- [x] 2.1 Update `src/scripts/main.js` with robust menu toggle logic using a `menu-open` class.
- [x] 2.2 Add event listeners to close the mobile menu when a navigation link is clicked.
- [x] 2.3 Implement body scroll locking when the navigation drawer is active.

## 3. Global Responsiveness Audit & Fixes

- [x] 3.1 Audit and fix `index.astro` sections (Hero, Value Props, Services) for mobile scaling.
- [x] 3.2 Audit and fix project-specific pages (`promotores.astro`, `inversores.astro`, etc.) ensuring no horizontal overflow.
- [x] 3.3 Refine `ServiceList.astro` mobile layout: reduce icon sizes and improve spacing for smaller viewports.
- [x] 3.4 Update `theme.css` with any necessary responsive typography tokens or fluid font sizes.

## 4. Final Verification

- [x] 4.1 Perform cross-device testing (mobile, tablet, desktop) ensuring no layout breakages.
- [x] 4.2 Verify navigation drawer functionality and scroll locking.
- [x] 4.3 Verify that base Tailwind classes are for mobile and `md:` prefixes handle desktop views across all modified components.
- [x] 4.4 Perform visual regression testing on Chrome DevTools mobile emulator for multiple device sizes (iPhone SE, Pixel 7, iPad).
