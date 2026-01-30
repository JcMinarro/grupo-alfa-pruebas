# Capability: Web SPA Navigation

Implement a client-side navigation system that provides smooth transitions between pages without full browser refreshes.

## ADDED Requirements

### Requirement: Dynamic Content Loading
Navigation between internal links must update only the page content.

#### Scenario: Intercepting clicks
- **WHEN** a user clicks an internal link (e.g., from Home to Projects)
- **THEN** the default browser navigation must be prevented, and the new content fetched via JS.

#### Scenario: Content replacement
- **WHEN** new content is fetched
- **THEN** the existing `<main>` element should be replaced with the `<main>` element from the fetched page.

### Requirement: URL and History Management
The browser URL and history must be correctly updated during navigation.

#### Scenario: Update URL
- **WHEN** a navigation occurs
- **THEN** the URL bar must be updated using `history.pushState` to match the target page path.

#### Scenario: Back button support
- **WHEN** the user clicks the browser "Back" button
- **THEN** the `popstate` event must trigger the SPA loader to restore the previous page content.

### Requirement: Script Re-initialization
Page-specific scripts and animations must be re-initialized after content replacement.

#### Scenario: Global init trigger
- **WHEN** the `<main>` content is updated
- **THEN** common initialization functions (like `fade-in` observers) must be re-executed.
