## Context

The `NewWeb` project currently relies on external content delivery networks (CDNs) for several key assets, specifically images hosted on `assets.zyrosite.com`. This creates a dependency on external services that could lead to broken images if those assets are removed or if the project is served in an environment with restricted internet access.

## Goals / Non-Goals

**Goals:**
- Identify all external image, video, and font assets in `NewWeb/`.
- Download these assets to `NewWeb/public/assets/`.
- Update all source code references to point to the local paths.
- Ensure the website remains visually identical after the migration.

**Non-Goals:**
- Localizing Google Fonts (unless requested later, will keep them as CDNs for now as they are standard).
- Localizing external scripts (CDNs for JS libraries).
- Optimization or resizing of assets (will download as-is).

## Decisions

### 1. Audit Strategy
We will use a specialized Python script to perform a recursive search across all `.html` and `.css` files in the `NewWeb/` directory. The search will target URLs starting with `http://` or `https://` (excluding local references and standard font CDNs).

### 2. Download and Storage
Assets will be downloaded using the `requests` library in Python.
- **Location**: `NewWeb/public/assets/`.
- **Naming**: The original filename from the URL will be preserved. If a filename collision occurs, a unique suffix will be added.
- **Handling Zyrosite URLs**: Zyrosite URLs often contain query parameters or path prefixes like `/cdn-cgi/image/`. The script will be designed to extract the core filename from the end of the path.

### 3. Replacement Strategy
The script will perform a global string replacement in each file.
- **HTML**: Replace `src="https://..."` with `src="/public/assets/..."`. 
- **CSS**: Replace `url("https://...")` with `url("/public/assets/...")`.
- ** srcset**: Handle multi-resolution images if present.

## Risks / Trade-offs

- **Path Resolution**: We must ensure that relative paths (e.g., from CSS files in `NewWeb/src/`) correctly point to `/public/assets/` or the relative equivalent. Since the project uses a dev server (Vite), absolute paths starting with `/public/` or just `/assets/` (depending on configuration) are preferred.
- **Corrupted Downloads**: We will implement basic size/status checks during the download process.
- **External Dependencies**: Removing the external link means we won't get updates if the original asset changes (which is actually a goal here for stability).
