## 1. Tooling and Preparation

- [x] 1.1 Create the asset localization script `localize_assets.py`.
- [x] 1.2 Identify all target file extensions and external domains to include in the scan.

## 2. Asset Localization

- [x] 2.1 Audit all HTML and CSS files to build a mapping of external URLs to local filenames.
- [x] 2.2 Download all identified assets to `NewWeb/public/assets/`.
- [x] 2.3 Verify all assets were downloaded successfully (check file sizes and status codes).

## 3. Code Refactoring

- [x] 3.1 Update all HTML files in `NewWeb/` to point to local assets.
- [x] 3.2 Update all CSS files in `NewWeb/src/` to point to local assets.
- [x] 3.3 Ensure special attributes like `srcset` are correctly handled.

## 4. Final Verification

- [x] 4.1 Launch the dev server and visually inspect all project pages.
- [x] 4.2 Perform a final grep search for `http` references to ensure no assets were missed.
