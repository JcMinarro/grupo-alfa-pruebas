# Delta Spec: Web Standard Header Refactor

## MODIFIED Requirements

### Requirement: Header Styling
The header MUST be styled using Tailwind CSS utility classes instead of custom CSS.

#### Scenario: Visual Consistency
- **WHEN** the header is rendered with Tailwind classes
- **THEN** it visually matches the existing design (height, padding, logo size, navigation spacing, colors)
- **THEN** it responds to screen size changes (mobile vs desktop) exactly as before, using Tailwind's responsive prefixes (`md:`, `lg:`)

#### Scenario: Dynamic Behavior
- **WHEN** the user scrolls or interacts with the specific "scrolled" state
- **THEN** the header style changes (transparency, background color) are applied using Tailwind utilities (e.g., `scrolled:bg-white`) or controlled via class toggling functionality that uses Tailwind classes

### Requirement: Navigation Menu Styling
The navigation menu (both desktop and mobile) MUST be styled with Tailwind utilities.

#### Scenario: Desktop Menu
- **WHEN** viewed on desktop
- **THEN** links use Tailwind typography and spacing utilities
- **THEN** hover states use Tailwind `hover:` modifiers

#### Scenario: Mobile Menu
- **WHEN** the mobile menu is opened
- **THEN** the drawer/overlay is styled using Tailwind positioning and z-index utilities
- **THEN** the transition/animation uses Tailwind transition utilities
