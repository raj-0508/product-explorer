"use client";

import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Filters } from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { ProductGridSkeleton } from "@/components/ProductSkeleton";
import { Product } from "@/types/product";

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = search.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesSearch = product.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Product Explorer</h1>
        {lastUpdated && (
          <p className="text-sm text-slate-500">
            Last updated at {lastUpdated}
          </p>
        )}
      </header>

      <Filters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {loading && <ProductGridSkeleton />}

      {error && <p className="mt-8 text-red-500">{error}</p>}

      {!loading && !error && (
        <ProductGrid products={visibleProducts} onSelect={setSelected} />
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
