## MODIFIED Requirements

### Requirement: Header Styling
The header MUST be styled using Tailwind CSS utility classes instead of custom CSS, following a mobile-first approach.

#### Scenario: Visual Consistency
- **WHEN** the header is rendered with Tailwind classes
- **THEN** it visually matches the design across all viewports, ensuring that mobile layout is the default and desktop enhancements are added via responsive prefixes (`md:`, `lg:`).

#### Scenario: Dynamic Behavior
- **WHEN** the user scrolls or interacts with the "scrolled" state
- **THEN** header style changes (e.g., background opacity) are applied using Tailwind utilities (e.g., `[.scrolled_&]:bg-white`) and remain responsive.
