## Why

The header currently lacks responsiveness, causing navigation links to overflow and overlap on mobile devices. While the project uses Tailwind CSS, the header was implemented with a fixed desktop layout, failing to meet the `web-standard-header` specification which requires adaptivity across all screen sizes. Additionally, the entire application needs to transition to a truly **mobile-first** architectural approach, ensuring that all components and layouts are designed for small screens first and then scaled up for desktop. A global review is needed to ensure all pages maintain visual integrity on mobile devices.

## What Changes

- **Responsive Header**: Implement a mobile-first header with a functional burger menu and a mobile navigation drawer/overlay.
- **Tailwind Refactoring**: Update all header components to use responsive utility prefixes (`md:`, `lg:`) for layout consistency.
- **Global Responsiveness Audit**: Review and fix any layout breakages, overflowing content, or oversized typography on devices with widths below 768px across all pages.
- **Mobile Menu Logic**: Add client-side logic in `main.js` or via a script tag in the Header component to handle the menu toggle.

## Capabilities

### New Capabilities
- `mobile-navigation`: Definition of mobile-specific navigation patterns (burger menu, slide-out menu, tap targets).

### Modified Capabilities
- `web-standard-header`: Updating requirements to enforce responsive behavior and mobile-specific elements as part of the standard header.
- `design-system`: Ensuring fluid typography or responsive spacing tokens are correctly applied across the site.

## Impact

- `src/components/Header.astro`: Rewrite of the navigation structure.
- `src/scripts/main.js`: Addition of menu toggle logic.
- `src/styles/theme.css`: Potential addition of responsive font scales.
- All `.astro` pages: Verification and potential minor adjustments for mobile layout scaling.
