# Product Explorer

A modern, responsive e-commerce product catalog built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Data is dynamically fetched from the [FakeStore API](https://fakestoreapi.com/products).

🔗 **Live Demo**: [https://product-explorer-bice.vercel.app/](https://product-explorer-bice.vercel.app/)  
📦 **Repository**: [https://github.com/raj-0508/product-explorer](https://github.com/raj-0508/product-explorer)

---

## 🚀 Live Demo & Overview

- **Live Deployment**: [https://product-explorer-bice.vercel.app/](https://product-explorer-bice.vercel.app/)
- **GitHub Repository**: [https://github.com/raj-0508/product-explorer](https://github.com/raj-0508/product-explorer)

The **Product Explorer** allows users to seamlessly browse, search, filter, and inspect products with fluid micro-interactions and zero cumulative layout shift (CLS).

### ✨ Key Features
- **Responsive Product Grid**: Adaptive layout tailored for mobile (1 column), tablet (2 columns), and desktop (3 columns).
- **Synchronized Search & Category Filters**: Case-insensitive instant search combined with category dropdown filtering.
- **Fluid Micro-Animations**: Smooth entry/exit transitions powered by Framer Motion's `AnimatePresence` and layout animations.
- **Accessible Detail Modal**: Interactive detail view with backdrop dismiss and semantic dialog structure.
- **Skeleton Shimmer UI**: Custom pulsing loading placeholders that prevent layout shifts during initial data fetching.
- **Image Optimization**: Fully optimized image delivery using Next.js `<Image />` with responsive `sizes`, above-the-fold `priority` loading, and placeholder containers.
- **Accessibility (A11y)**: Semantic HTML with explicit `aria-label` attributes for screen readers and automated audit tools.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js (App Router)** | Framework for Server & Client Components, routing, and asset optimization |
| **React 18** | Component architecture and state management |
| **TypeScript** | Strict compile-time type safety with zero `any` types |
| **Tailwind CSS** | Utility-first, responsive styling |
| **Framer Motion** | Declarative page and modal transitions |

---

## 🐛 Bug Fixes & Technical Debt Resolved

This project was built by resolving several deliberate architectural and runtime bugs from a starter template:

1. **Infinite Data-Fetching Loop (`src/hooks/useProducts.ts`)**:
   - *Issue*: `useEffect` had `[products]` in its dependency array, causing state updates to trigger infinite refetch loops.
   - *Fix*: Reset dependencies to `[]` and implemented clean request cancellation.
2. **Strict TypeScript Types (`src/hooks/useProducts.ts`)**:
   - *Issue*: Hook state and API response were typed as `any`.
   - *Fix*: Replaced all untyped variables with strict `Product[]` and `Product` interfaces.
3. **Search & Filter Synchronization (`src/app/page.tsx`)**:
   - *Issue*: Category selection bypassed search query evaluation, and search was case-sensitive.
   - *Fix*: Composed boolean filter logic (`matchesCategory && matchesSearch`) with `.toLowerCase().trim()`.
4. **React Reconciliation & Key Warnings (`src/components/ProductGrid.tsx`)**:
   - *Issue*: Animated elements used array `index` as keys, leading to animation bugs on filter changes.
   - *Fix*: Bound `key={product.id}` for stable reconciliation.
5. **SSR Hydration Mismatch (`src/app/page.tsx`)**:
   - *Issue*: Direct rendering of `new Date().toLocaleTimeString()` mismatched server-rendered HTML.
   - *Fix*: Synchronized client time inside `useEffect` after mount.

---

## 💡 Key Architectural Decisions

- **Next.js `<Image />` with `fill` and `sizes`**: Leveraged Next.js Image Optimization with container bounds rather than static dimensions to avoid aspect-ratio distortion across device breakpoints. Configured `remotePatterns` in `next.config.mjs` for remote CDN security.
- **Memoized Filtering (`useMemo`)**: Wrapped visible product calculations in `useMemo` so modal toggling and unrelated re-renders do not trigger expensive array iterations.
- **Above-The-Fold LCP Optimization**: Tagged initial visible grid items with `priority={index < 6}` to preload Largest Contentful Paint (LCP) assets immediately.
- **Contained Modal Composition**: Encapsulated backdrop and card animation logic within `ProductModal` to keep `HomePage` clean and declarative.

---

## 🧠 What I Learned & Key Takeaways

1. **React Hook Lifecycle Discipline**:
   - Why state updates within `useEffect` must never depend on the updated state without proper dependency isolation or functional state updates.
2. **Next.js Image Pipeline & Core Web Vitals**:
   - How responsive image sizing (`sizes`), aspect-ratio styles, and preloading priority directly affect **Largest Contentful Paint (LCP)** and **Cumulative Layout Shift (CLS)**.
3. **SSR & Hydration Mechanics**:
   - Understanding why non-deterministic values (timestamps, browser storage, random IDs) cause React hydration errors and how to safely defer them to client-side mounts.
4. **Accessible Component Patterns (A11y)**:
   - Ensuring input elements maintain descriptive accessible names (`aria-label`) for screen readers even when visual design relies on placeholders.
5. **Declarative Animation Architecture**:
   - Utilizing Framer Motion's `AnimatePresence` for unmounting transitions and layout animations without breaking grid flow.

---

## 📁 Project Structure

```
product-explorer/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout and metadata configuration
│   │   ├── page.tsx           # Main page (state, filtering, modal orchestration)
│   │   └── globals.css        # Tailwind directives and base styles
│   ├── components/
│   │   ├── Filters.tsx        # Search input and category dropdown controls
│   │   ├── ProductCard.tsx    # Single product card with image & price
│   │   ├── ProductGrid.tsx    # Responsive grid with Framer Motion transitions
│   │   ├── ProductModal.tsx   # Detailed view modal with smooth entry/exit
│   │   └── ProductSkeleton.tsx# Pulsing placeholder shimmer grid for loading states
│   ├── hooks/
│   │   └── useProducts.ts     # Custom hook for fetching and managing catalog state
│   └── types/
│       └── product.ts         # TypeScript interfaces for Product entities
├── next.config.mjs            # Next.js remotePatterns image configuration
├── NOTES.md                   # Assessment notes and technical log
└── package.json
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js **18.17+**
- npm / yarn / pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/raj-0508/product-explorer.git
cd product-explorer

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the optimized production bundle |
| `npm run typecheck` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run lint` | Runs Next.js ESLint checks |
