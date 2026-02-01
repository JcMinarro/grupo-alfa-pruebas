# Hero Component Spec

## Background
The "Hero" section is currently implemented inconsistently across pages. The homepage uses a specific HTML structure with an overlay and fade-in animations, while project pages have their own inline styles and structures. A reusable `Hero.astro` component is needed to unify this.

## Requirements

### 1. Props Interface

The component should accept the following props:

-   `title` (string, required): The main heading text.
-   `subtitle` (string, optional): The secondary text below the title.
-   `backgroundImage` (string, optional): URL for the background image.
-   `backgroundVideo` (string, optional): URL for the background video (e.g., for Hunters page).
-   `videoPoster` (string, optional): Poster image for the video.
-   `overlayOpacity` (number, default: 0.5): Opacity of the dark overlay.
-   `height` (string, default: '60vh'): specific height preference (e.g., '100vh' for home).
-   `location` (string, optional): Small location tag above the title (used in project pages like `/local-comercial`).

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

**Hunters Page (Video)**:
```astro
<Hero
  title="ALFA HUNTERS"
  backgroundVideo="/assets/hunters/hero-video.mp4"
  videoPoster="/assets/hunters/hero-poster.jpg"
/>
```
