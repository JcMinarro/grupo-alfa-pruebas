# Spec: Component Refactor

## ADDED Requirements

### Requirement: Utility-First Styling
All visible styling in refactored components MUST be applied using Tailwind CSS utility classes.

#### Scenario: Visual Parity
- **WHEN** a component is refactored to use Tailwind
- **THEN** it visually matches the original design exactly (pixel verification not required, but visual indistinguishability is)
- **THEN** no ad-hoc CSS classes remain in the component, unless for complex animations or pseudo-elements not coverable by arbitrary values

### Requirement: Theme Token Usage
Refactored components MUST use the configured Tailwind theme tokens instead of hardcoded values.

#### Scenario: Color Usage
- **WHEN** a component requires a brand color (primary, secondary, etc.)
- **THEN** it uses the corresponding Tailwind class (e.g., `text-primary`, `bg-accent`)

#### Scenario: Typography Usage
- **WHEN** a component requires specific fonts
- **THEN** it uses the `font-sans` or `font-heading` (or configured equivalent) utility classes

### Requirement: Responsive Design
Components MUST use Tailwind's responsive modifiers (`md:`, `lg:`) for layout adjustments.

#### Scenario: Media Query Replacement
- **WHEN** the original CSS had a `@media` query
- **THEN** the refactored HTML uses responsive prefixes to achieve the same behavior
