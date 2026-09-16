# Notes

> Fill this in as you work. This document is assessed alongside your code.

## Bugs I found

For each: what was wrong, **why** it was wrong, and how I fixed it.

1. **Infinite Data-Fetching Loop (`src/hooks/useProducts.ts`)**:
   - *What was wrong:* The `useEffect` dependency array had `[products]`.
   - *Why it was wrong:* Setting products inside the effect updated `products`, triggering the effect again in an infinite loop.
   - *Fix:* Changed the dependency array to `[]` so the fetch runs only once on mount.

2. **TypeScript `any` Types (`src/hooks/useProducts.ts`)**:
   - *What was wrong:* State and response data were typed as `any`.
   - *Why it was wrong:* Violated type safety and the "No `any`" ground rule.
   - *Fix:* Replaced `any[]` and `any` with `Product[]`.

3. **Broken Search & Category Filtering (`src/app/page.tsx`)**:
   - *What was wrong:* Selecting a category ignored the search term entirely, and search was case-sensitive.
   - *Why it was wrong:* An `if (category !== "all")` early return prevented checking `search`, and `product.title.includes(search)` failed for different letter casing.
   - *Fix:* Combined both conditions (`matchesCategory && matchesSearch`) and used `.toLowerCase().trim()` for case-insensitive matching.

4. **Array Index Used as React Key (`src/components/ProductGrid.tsx`)**:
   - *What was wrong:* `key={index}` was used for list items inside animated Framer Motion elements.
   - *Why it was wrong:* When items are filtered or reordered, index keys cause animation glitches and state mismatches.
   - *Fix:* Changed `key={index}` to `key={product.id}`.

5. **SSR Hydration Mismatch (`src/app/page.tsx`)**:
   - *What was wrong:* Rendering `new Date().toLocaleTimeString()` directly during SSR/render.
   - *Why it was wrong:* The timestamp generated on the server doesn't match the client time during hydration, causing a React hydration error.
   - *Fix:* Set `lastUpdated` inside a `useEffect` hook so it only renders on the client after mount.

## Features I completed

- **Error State UI (`src/app/page.tsx`)**: Rendered the `error` message when data fetching fails.
- **Modal Open/Close Animations (`src/components/ProductModal.tsx`)**: Wrapped the modal with Framer Motion's `AnimatePresence` and added smooth opacity/scale transitions.

## Decisions

- **Combined filter condition**: Used a clean boolean composition (`matchesCategory && matchesSearch`) for clear and predictable filtering behavior.
- **Contained Modal Animation**: Placed `AnimatePresence` inside `ProductModal` around conditional rendering of the backdrop and card so consumers just pass `product={selected}`.
- **Next.js Image Optimization (`src/components/ProductCard.tsx`, `src/components/ProductModal.tsx`)**: Replaced native `<img>` tags with Next.js `<Image>` using `fill`, responsive `sizes`, above-the-fold `priority`, and configured `remotePatterns` in `next.config.mjs` for `fakestoreapi.com`. Added subtle `bg-slate-50` container placeholders for smoother image loading.
- **Memoized Filtering (`src/app/page.tsx`)**: Wrapped `visibleProducts` in `useMemo` to avoid redundant filtering calculations when opening or closing the product modal.
- **Form Accessibility (`src/components/Filters.tsx`)**: Added explicit `aria-label` attributes to the search input and category select dropdown to ensure full screen-reader and WCAG accessibility compliance without altering visual layout.
- **Skeleton Grid Loading UI (`src/components/ProductSkeleton.tsx`)**: Replaced the static loading text with responsive, pulsing skeleton card placeholders that mirror the 1/2/3 column layout to eliminate Cumulative Layout Shift (CLS) and provide a polished user experience.
- **Native React Hook vs. TanStack Query (`src/hooks/useProducts.ts`)**: Evaluated TanStack Query for server-state management, but intentionally opted for a clean, zero-dependency custom React hook using native `useState` and `useEffect` with proper cancellation guards. This directly satisfies the assignment ground rules (*"Keep dependencies minimal"*) while demonstrating core mastery of React lifecycle and dependency reconciliation.

## With more time

- Integrate **TanStack Query** (React Query) if the app expands to include server mutations, multi-page routing, automated window-focus refetching, and pagination.
- Add debouncing to the search input for large catalogs.
- Add a retry button and error recovery UI to the data-fetching error state.
- Add infinite scrolling or virtualization for large product datasets.
