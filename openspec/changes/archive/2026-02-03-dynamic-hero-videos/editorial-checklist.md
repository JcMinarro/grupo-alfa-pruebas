# Editorial checklist — validating remote hero videos

Use this checklist when adding or approving a `hero.media` entry in the CMS.

- [ ] Confirm the `url` is HTTPS and points to a direct media file (mp4/webm). No embed providers.
- [ ] Confirm `title` matches the media's intended caption.
- [ ] Add `attribution` (author/source) and provide a link to the original page where available.
- [ ] Add `license` text or SPDX identifier (e.g., CC0, CC-BY, Pexels license) and attach a screenshot or link showing license terms.
- [ ] Provide a `poster` image (editor-uploaded recommended) or reference an approved poster path in CMS.
- [ ] Add `variants` if you have lower/higher bitrate alternatives (include `url`, `width`, `bitrate`).
- [ ] Verify media plays in a modern browser (desktop) and that poster fallback appears on mobile/slow connections.
- [ ] Confirm no copyright / DMCA issues discovered for this asset.
- [ ] Mark `editor-approved: true` when all checks pass and add reviewer initials + date in CMS notes.
