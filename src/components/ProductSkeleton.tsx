export function ProductCardSkeleton() {
  return (
    <div
      className="flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      aria-hidden="true"
    >
      <div className="h-40 w-full animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-auto flex items-center justify-between pt-6">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
