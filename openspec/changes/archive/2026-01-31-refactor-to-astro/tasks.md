## 1. Project Setup

- [x] 1.1 Initialize Astro project in `NewWeb` directory
- [x] 1.2 Move static assets from root to `public/assets/`
- [x] 1.3 Configure `astro.config.js` for clean URLs and static output

## 2. Layouts & Components

- [x] 2.1 Create `src/layouts/BaseLayout.astro` with common HTML structure
- [x] 2.2 Create `src/components/Header.astro` from legacy header HTML
- [x] 2.3 Create `src/components/Footer.astro` from legacy footer HTML
- [x] 2.4 Create `src/components/ContactForm.astro` from legacy contact form
- [x] 2.5 Create `src/layouts/ProjectLayout.astro` for detail pages

## 3. Page Migration

- [x] 3.1 Migrate `index.html` to `src/pages/index.astro`
- [x] 3.2 Migrate `proyectos.html` to `src/pages/proyectos.astro`
- [x] 3.3 Migrate all project sub-pages (e.g., `local-comercial.html`) to `src/pages/`
- [x] 3.4 Integrate global scripts and styles into Astro components/layouts

## 4. Verification

- [x] 4.1 Run `npm run build` to ensure no build errors
- [x] 4.2 Verify all internal links are working correctly
- [x] 4.3 Manually verify visual parity on key pages (Home, Proyectos, Detail)
