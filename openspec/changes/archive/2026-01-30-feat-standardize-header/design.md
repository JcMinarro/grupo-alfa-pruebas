# Design: Standardize Header and SPA Navigation

This document outlines the technical approach to unify the website header and implement a client-side navigation system (SPA) for seamless transitions between pages.

## Context

The website consists of multiple static HTML files served by Vite. Currently, navigation involves full page refreshes, and URLs include the `.html` extension. The header needs to be consistent and persistent across all views.

## Goals / Non-Goals

**Goals:**
- Unify the header across all pages with a consistent design and navigation links.
- Implement clean URLs (e.g., `/proyectos` instead of `/proyectos.html`).
- Implement an SPA-like navigation system that only updates the `<main>` content.
- Ensure the header is shared and not refreshed during navigation.
- Redirect `index.html` to `/`.

![Header Reference](/home/jcminarro/.gemini/antigravity/brain/0d35ce92-cfda-47fe-a72a-c2b21ec83bb9/uploaded_media_1769779761482.png)

**Non-Goals:**
- Convert the project to a full-blown framework like React or Vue.
- Implement complex state management.
- Change the visual design of the header (only its structure and logic).

## Decisions

### 1. Unified Header Template
The header structure will be standardized in a single CSS class `site-header`. Every page will contain the exact same HTML for the header to maintain visual consistency.

### 2. Client-Side Router (SPA)
A lightweight router will be implemented in `main.js`. It will:
- Listen for `click` events on the `document` (event delegation).
- Intercept internal links.
- Use `fetch()` to retrieve the destination page.
- Use `DOMParser` to extract the `<main>` content and `<title>` from the fetched HTML.
- Update the current page's `<main>` and `<title>` without a full reload.
- Update the browser history using `history.pushState`.
- Handle the `popstate` event to manage browser back/forward buttons.

### 3. Clean URLs in Vite
To support direct access to clean URLs (e.g., typing `/proyectos` in the address bar), we will create a `vite.config.js` with a rewrite rule or use Vite's default behavior for multi-page apps if possible.
Alternatively, we will ensure all internal links use the clean format, and the SPA router will handle the mapping to `.html` files during `fetch`.

### 4. Animation Re-initialization
Since the `<main>` content is replaced dynamically, any scripts that initialize animations (e.g., `IntersectionObserver` for `fade-in` elements) must be re-executed after each navigation.

## Risks / Trade-offs

- **SEO**: Static search engines might struggle if content is *only* available via JS, but since we are keeping the `.html` files, it remains SEO-friendly as a "Progressive SPA".
- **Script State**: Re-initializing scripts might lead to duplicate event listeners if not handled carefully. Navigation should clear/re-init global states if necessary.
- **Loading State**: Since `fetch` is used, we should implement a subtle loading indicator (e.g., a top progress bar) to give feedback during transitions.
