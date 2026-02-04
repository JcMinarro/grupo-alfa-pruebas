## Why

The hero title on the `/alfa-hunters` page is currently centered, which obscures the key focal point of the background video. Repositioning the title lower on the screen will ensure the video content is visible and improves the overall visual composition of the page.

## What Changes

- Modify the `/alfa-hunters` page hero section to position the title lower on the screen (e.g., bottom-aligned). This positioning must be implemented configurably (e.g., via a prop) so that all other pages using the Hero component retain their existing centered alignment.
- Maintain the current content structure (title only, no subtitles), ensuring the new positioning works correctly for this specific content state.

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. -->

### Modified Capabilities
- `web-alfa-hunters`: Update requirements to specify the non-centered, lower positioning of the hero title.

## Impact

- **Pages**: `/alfa-hunters` page component.
- **Components**: `Hero` component (may require a new prop or style variant to support custom vertical alignment).
