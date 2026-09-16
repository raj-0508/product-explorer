"use client";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  priority?: boolean;
}

export function ProductCard({ product, onClick, priority = false }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-lg bg-slate-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-contain"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-medium">{product.title}</h3>
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {product.category}
        </span>
        <span className="font-semibold">${product.price}</span>
      </div>
    </button>
  );
}
