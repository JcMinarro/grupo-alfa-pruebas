## 1. Setup and Clean URLs

- [x] 1.1 Create `vite.config.js` to handle clean URL rewrites if necessary, ensuring `/proyectos` serves `proyectos.html`.
- [x] 1.2 Update `package.json` scripts if any special build configuration is needed for the SPA approach.

## 2. Unified Header Implementation

- [x] 2.1 Extract and standardize the header HTML structure based on the reference image (Logo-cabeza left, Nav links right).
- [x] 2.2 Update `style.css` with the new header styles, including the solid underline for the active state.
- [x] 2.3 Ensure the header is responsive and maintains the mobile menu functionality.

## 3. SPA Navigation Engine

- [x] 3.1 Implement the SPA router in `main.js`: intercept link clicks, fetch content, and update DOM.
- [x] 3.2 Add transition effects (e.g., top loading bar or subtle fade for the `<main>` content).
- [x] 3.3 Implement history management (`pushState`, `popstate`).
- [x] 3.4 Create a global initialization function that re-runs animations and observers after page load.

## 4. Page Content Migration

- [x] 4.1 Update `index.html` to remove `.html` extensions from all links and use `/` for home.
- [x] 4.2 Standardize the `<main>` element in all existing HTML files (`proyectos.html`, `promotores.html`, etc.).
- [x] 4.3 Replace the hardcoded header in all pages with the new standardized structure or a placeholder if using client-side injection (though having it static is better for initial load).

## 5. Final Polish and Verification

- [x] 5.1 Verify that direct navigation to clean URLs works (e.g., refresh on `/proyectos`).
- [x] 5.2 Verify that the "active" state in the header updates correctly during SPA navigation.
- [x] 5.3 Ensure the browser "Back" and "Forward" buttons work as expected.
- [x] 5.4 Check that animations (fade-in) trigger correctly on dynamically loaded pages.
