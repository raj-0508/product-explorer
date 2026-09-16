"use client";

import { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) {
    return null;
  }

  // TODO(candidate): this modal pops in and out instantly.
  // Add a smooth open/close transition using Framer Motion (AnimatePresence).
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <button
            onClick={onClose}
            className="ml-4 rounded-full px-2 text-slate-400 hover:text-slate-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-48 w-auto object-contain"
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-slate-400">
            {product.category}
          </span>
          <span className="text-lg font-semibold">${product.price}</span>
        </div>
      </div>
    </div>
  );
}
