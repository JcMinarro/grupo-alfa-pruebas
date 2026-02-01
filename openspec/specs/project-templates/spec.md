# Project Templates Spec

## Background
Project pages (like `/local-comercial`, `/mini-estudios`, etc.) share a common structure: a Hero section, a "Details" grid, a "Financials" table, and an "ROI" analysis section. Currently, this structure is duplicated across multiple files. We need reusable components to enforce consistency and simplify adding new projects.

## Requirements

### 1. ProjectDetails Component
Displays the key attributes of the project (Location, Size, Type, etc.).

-   **Props**:
    -   `location`: string
    -   `type`: string
    -   `surface`: string
    -   `distribution`: string

### 2. ProjectFinancials Component
Displays the breakdown of costs.

-   **Props**:
    -   `costs`: Array of objects `{ concept: string, amount: string }`.
    -   `total`: string (or calculated if simplest).

### 3. ProjectROI Component
Displays the profitability analysis for different strategies (Sale vs Rent).

-   **Props**:
    -   `strategy`: 'sale' | 'rent' | 'both'
    -   `saleData`: Object containing `{ price, profit, roi }`
    -   `rentData`: Object containing `{ monthly, annual, operationalCosts, netAnnual, roi }`

### 4. ProjectLayout Integration
These components should work seamlessly within the `ProjectLayout`. The layout itself might need minor adjustments to accommodate the standard `Hero` component as well.

### 5. Usage Example

```astro
<ProjectDetails
  location="MURCIA"
  type="Bajo Comercial"
  surface="120 m²"
  distribution="3 Estudios"
/>

<ProjectFinancials
  costs={[
    { concept: "Compra", amount: "90.000 €" },
    { concept: "Reforma", amount: "120.000 €" },
    ...
  ]}
  total="240.000 €"
/>

<ProjectROI
  strategy="both"
  saleData={{ ... }}
  rentData={{ ... }}
/>
```
