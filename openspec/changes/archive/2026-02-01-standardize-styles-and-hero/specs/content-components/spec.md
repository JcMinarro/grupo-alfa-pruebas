# Content Components Spec

## Background
Several pages (`/inversores`, `/alfa-hunters`, `/index`) use similar grid layouts to display steps, benefits, or services. Currently, these are implemented with repetitive HTML structures and page-specific CSS. We need reusable components to standardize these patterns.

## Requirements

### 1. InfoGrid Component
A generic grid component for displaying a list of items with optional icons or numbers.

-   **Props**:
    -   `columns` (number, default: 3): Number of columns on desktop.
    -   `gap` (string): Spacing between items.
    -   `class`: Custom classes for the container.

### 2. GridItem Component (or Slot usage)
A sub-component or pattern for individual items within the grid.

-   **Props**:
    -   `title` (string): Card title.
    -   `icon` (string/slot, optional): Path to icon image or slot for svg.
    -   `number` (string, optional): For process steps (e.g., "01").
    -   `description` (string, optional): Main text content.
    -   `animation` (string, default: 'fade-in'): Animation class to apply.

### 3. Usage Examples

**Process Grid (Inversores)**:
```astro
<InfoGrid columns={3}>
  <GridItem number="01" title="ASESORÍA GRATUITA..." description="Analizamos..." />
  <GridItem number="02" title="OFERTA DE INMUEBLES..." description="Seleccionamos..." />
</InfoGrid>
```

**Benefits Grid (Alfa Hunters)**:
```astro
<InfoGrid columns={3}>
  <GridItem title="FLEXIBILIDAD" description="Gestiona tu tiempo...">
    <img slot="icon" src="..." />
  </GridItem>
</InfoGrid>
```

### 4. Implementation Details
-   Extract common styles from `investor.css` (`.process-grid`, `.process-card`) and `hunters.css` (`.benefits-grid`, `.benefit-item`) into the component styles or Design System utilities.
-   Ensure responsiveness (stacking on mobile).
-   Support `fade-in` logic for items.
