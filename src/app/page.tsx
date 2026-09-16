"use client";

import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Filters } from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [products]);

  const visibleProducts = products.filter((product) => {
    if (category !== "all") {
      return product.category === category;
    }
    return product.title.includes(search);
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Product Explorer</h1>
        <p className="text-sm text-slate-500">
          Last updated at {new Date().toLocaleTimeString()}
        </p>
      </header>

      <Filters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {loading && <p className="mt-8 text-slate-500">Loading products…</p>}

      {/*
        TODO(candidate): the hook already exposes `error`, but nothing renders it.
        Show a helpful error state to the user when the request fails.
      */}

      <ProductGrid products={visibleProducts} onSelect={setSelected} />

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
