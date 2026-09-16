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

## With more time

- Add debouncing to the search input.
- Add retry functionality to the error state.
- Add image loading skeletons / placeholders.
