## Why

Currently, several pages in the `NewWeb` project reference assets (images, fonts, icons, etc.) hosted on the original `grupoalfa.net` domain. This creates a dependency on external infrastructure, risks broken links if the original content is updated or removed, and can lead to mixed content warnings or performance issues. Ensuring all assets are local is essential for a truly self-contained and reliable web project.

## What Changes

- **Asset Audit**: A comprehensive scan of all HTML, CSS, and JS files in the project to identify any URLs pointing to `grupoalfa.net` or other external domains where assets belong to the project.
- **Asset Localization**: Downloading identified assets and placing them in the project's local directory structure (e.g., `NewWeb/public/assets/`).
- **Refactoring References**: Updating all source code references to point to these new local paths.
- **Verification**: Ensuring all pages load correctly without any external asset dependencies.

## Capabilities

### New Capabilities
- `asset-localization`: Defines the process and standards for identifying and localizing external assets across the entire project.

### Modified Capabilities
- (None)

## Impact

- **Affected Files**: All HTML files in `NewWeb` and CSS files in `NewWeb/src/`.
- **Infrastructure**: Increased project repository size due to newly downloaded assets.
- **Build Process**: No changes to the build process, but ensures assets are available offline/locally.
