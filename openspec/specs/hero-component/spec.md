# Hero Component Spec

## Background
The "Hero" section is currently implemented inconsistently across pages. The homepage uses a specific HTML structure with an overlay and fade-in animations, while project pages have their own inline styles and structures. A reusable `Hero.astro` component is needed to unify this.

## Requirements

### 1. Props Interface

The component should accept the following props:

-   `title` (string, required): The main heading text.
-   `subtitle` (string, optional): The secondary text below the title.
-   `description` (string, optional): Description text below the subtitle.
-   `backgroundImage` (string, optional): URL for the background image.
-   `backgroundVideo` (string | Array<{url, type}>, optional): URL for the background video or array of video sources. Videos are loaded from `src/data/heros.js`.
-   `videoPoster` (string, optional): Poster image for the video fallback. Stored in `public/assets/heros/`.
-   `overlayOpacity` (number, default: 0.5): Opacity of the dark overlay.
-   `height` (string, default: '60vh'): specific height preference (e.g. '100vh' for home, '50vh' for project pages).
-   `location` (string, optional): Small location tag above the title (used in project pages like `/local-comercial`).
-   `class` (string, optional): Additional CSS classes.
-   `id` (string, optional): HTML id attribute.

### 2. Layout & Styling

-   **Structure**:
    ```html
    <section class="hero" style="...">
      <!-- Background Media (Img/Video) -->
      <!-- Overlay -->
      <div class="container hero-content fade-in">
         <!-- Content -->
      </div>
    </section>
    ```
-   **Animations**: The content container must trigger the standard `.fade-in` animation on load.
-   **Responsive**: Ensure the background covers the area (`object-fit: cover`) and text is readable on mobile.

### 3. Usage Examples

**Homepage**:
```astro
<Hero
  title="INVERSIÓN INTELIGENTE"
  subtitle="CONVIERTE TU DINERO EN UN ACTIVO"
  height="100vh"
  class="home-hero"
>
 <!-- Logos or custom children can be passed via slot if needed -->
</Hero>
```

**Project Page**:
```astro
<Hero
  title="Local Comercial convertido en Estudios"
  location="MURCIA"
  backgroundImage="/assets/projects/local-hero.jpg"
/>
```

**Proyectos Page (Video with external URL)**:
```astro
---
import { heros } from "../data/heros.js";
---
<Hero
  title={t("projects.hero.title")}
  subtitle={t("projects.hero.subtitle")}
  description={t("projects.hero.description")}
  backgroundImage="/assets/photo-1618773928121-c32242e63f39ad04.jpg"
  backgroundVideo={heros.proyectos}
  videoPoster="/assets/heros/proyectos-poster.jpg"
  height="50vh"
/>
```

**Promotores Page (Video with external URL)**:
```astro
<Hero
  title={t("promotores.hero.title")}
  subtitle={t("promotores.hero.subtitle")}
  description={t("promotores.hero.description")}
  backgroundImage="/assets/photo-1618773928121-c32242e63f39ad04.jpg"
  backgroundVideo={heros.promotores}
  videoPoster="/assets/heros/promotores-poster.jpg"
  height="50vh"
/>
```

**Inversores Page (Video with external URL)**:
```astro
<Hero
  title={t("inversores.hero.title")}
  subtitle={t("inversores.hero.subtitle")}
  backgroundImage="/assets/photo-1707903244219-8ed71537554d3d83.jpg"
  backgroundVideo={heros.inversores}
  videoPoster="/assets/heros/inversores-poster.jpg"
  height="50vh"
/>
```

**Alfa Hunters Page (Video with external URL)**:
```astro
<Hero
  title="ALFA HUNTERS"
  backgroundImage="/assets/photo-1618773928121-c32242e63f39ad04.jpg"
  backgroundVideo={heros['alfa-hunters'] || heros.alfaHunters}
  videoPoster="/assets/heros/alfa-hunters-poster.jpg"
  height="50vh"
  overlayOpacity={0.4}
/>
```

## Video Data Source

Hero videos are configured in `src/data/heros.js` with the following structure:

```javascript
export const heros = {
  proyectos: [
    { url: 'https://videos.pexels.com/...', type: 'video/mp4' }
  ],
  promotores: [
    { url: 'https://videos.pexels.com/...', type: 'video/mp4' }
  ],
  inversores: [
    { url: 'https://videos.pexels.com/...', type: 'video/mp4' }
  ],
  alfaHunters: [
    { url: 'https://videos.pexels.com/...', type: 'video/mp4' }
  ],
  "alfa-hunters": [
    { url: 'https://videos.pexels.com/...', type: 'video/mp4' }
  ]
};
```

Video poster images (first frame fallback) are stored in `public/assets/heros/`:
- `proyectos-poster.jpg`
- `promotores-poster.jpg`
- `inversores-poster.jpg`
- `alfa-hunters-poster.jpg`

## Dynamic Hero Video Requirements

### Requirement: Hero video metadata format
The system SHALL accept external video references for hero media with the following metadata fields: `url` (absolute HTTPS), `poster` (optional image URL), `title`, `attribution`, `license`, and optional `variants` (array of objects containing `url`, `width`, `bitrate`).

#### Scenario: Valid metadata accepted
- **WHEN** an editor adds a hero media entry with all required fields and a valid HTTPS `url`
- **THEN** the CMS accepts the entry and stores it in the `hero.media` field

### Requirement: Use external URLs only
The system SHALL NOT store video binary blobs in the repository or primary CDN; videos referenced in `hero.media` MUST be external URLs and treated as external resources.

#### Scenario: Editor attempts to upload video file
- **WHEN** an editor attempts to upload a video file to the repo-backed asset store for hero media
- **THEN** the system rejects the upload and prompts the editor to provide an external URL and poster instead

### Requirement: Source attribution and license tracking
The CMS SHALL store `attribution` and `license` fields for each hero video and surface them in the admin UI for editorial review.

#### Scenario: Display attribution
- **WHEN** a hero video is referenced on a page
- **THEN** the rendered component includes visible or inspectable attribution and license details (e.g., in page footer or an accessible metadata panel)

### Requirement: Playback fallback behavior
The frontend SHALL fallback to a poster image if the video cannot be played (unsupported format, slow connection, or blocked autoplay).

#### Scenario: Slow connection fallback
- **WHEN** the user's `navigator.connection.effectiveType` is `2g` or `slow-2g`
- **THEN** the `HeroVideo` component renders the poster image instead of initiating video playback

### Requirement: Quality-aware source selection
The `HeroVideo` player SHALL select the lowest appropriate `variant` bitrate when the connection is poor, and higher bitrate when connection is good. Editors can override automatic selection via the CMS.

#### Scenario: Connection-based selection
- **WHEN** a page loads on a connection with `effectiveType` `4g`
- **THEN** the player chooses the highest `variant` bitrate available
