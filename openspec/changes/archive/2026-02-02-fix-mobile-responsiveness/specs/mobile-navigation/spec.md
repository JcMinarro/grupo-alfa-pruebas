## ADDED Requirements

### Requirement: Mobile Toggle
The header SHALL include a visible toggle (burger menu) on screens smaller than 768px.

#### Scenario: Burger menu visibility
- **WHEN** the screen width is less than 768px
- **THEN** the desktop navigation links are hidden and the burger menu icon is visible.

### Requirement: Navigation Drawer
The mobile navigation SHALL be implemented as a full-screen drawer or overlay that triggers on clicking the burger menu.

#### Scenario: Opening the menu
- **WHEN** the user clicks the burger menu icon
- **THEN** the navigation drawer slides in or fades in, showing all site links.

### Requirement: Mobile-first Layout
All application layouts and components SHALL be implemented using a mobile-first approach.

#### Scenario: Base styling for mobile
- **WHEN** applying styles via Tailwind CSS
- **THEN** default utility classes (no prefix) MUST target mobile devices, while `md:` and larger prefixes are used for desktop enhancement.
