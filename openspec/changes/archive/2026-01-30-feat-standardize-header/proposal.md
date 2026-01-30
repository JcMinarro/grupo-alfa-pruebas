# Proposal: Standardize Header and SPA Navigation

Establish a unified header across the entire website and implement a client-side navigation mechanism to provide a seamless user experience (SPA-like) while ensuring clean URLs.

## Why

Currently, each page might have its own header implementation, leading to maintenance overhead and potential inconsistencies. Additionally, the user experience is interrupted by full page refreshes during navigation. The use of `.html` extensions in URLs is also outdated and less professional. By standardizing the header and implementing smooth transitions, we improve both maintainability and the overall premium feel of the site.

## What Changes

- **Unified Header**: A single header component (or standardized structure) will be applied to all pages.
- **Clean URLs**: All internal links will remove the `.html` extension.
- **Index Redirection**: The landing page `index.html` will be referenced as `/`.
- **SPA Navigation**: Implement a mechanism (using `fetch` and `pushState` or similar) to intercept link clicks, fetch the target page content, and update the DOM without refreshing the header.
- **Decoupled Sections**: Remove dependency on anchor links (`index#section`) for navigating between independent pages.

## Capabilities

### New Capabilities
- `web-standard-header`: A standardized header component used across all pages.
- `web-spa-navigation`: A client-side router that manages page transitions without full refreshes, ensuring the header remains persistent and interactive.

### Modified Capabilities
- `web-index`: Ensure the main entry point is strictly `/` and does not contain embedded versions of other pages.

## Impact

- **Frontend**: Significant changes to the main navigation logic and HTML structure across all pages to ensure the header is consistent and compatible with the SPA loader.
- **SEO**: URLs will be cleaner, but we must ensure proper handling of browser history and initial page loads.
- **UX**: Much smoother navigation transitions, reinforcing the "premium" brand identity.
