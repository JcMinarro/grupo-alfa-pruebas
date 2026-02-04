## 1. Hero Component Update

- [x] 1.1 Add `contentAlignment` prop to `Props` interface in `src/components/Hero.astro` with type `"center" | "bottom"`.
- [x] 1.2 Update component logic to default `contentAlignment` to `"center"`.
- [x] 1.3 Implement conditional class logic: use `items-center` for center alignment and `items-end` + `pb-20` for bottom alignment.

## 2. Page Implementation

- [x] 2.1 Update `src/pages/alfa-hunters.astro` to pass `contentAlignment="bottom"` to the `Hero` component.

## 3. Verification

- [x] 3.1 Verify `/alfa-hunters` hero title is bottom-aligned and visible against the video.
- [x] 3.2 Verify other pages (e.g., home page) still have centered hero titles.
