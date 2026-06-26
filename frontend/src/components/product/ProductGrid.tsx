"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: any[];
  loading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
};

export default function ProductGrid({
  products = [],
  loading = false,
  hasMore = false,
  loadMore,
}: ProductGridProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  // 🧠 Infinite scroll logic
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !isFetching) {
          setIsFetching(true);

          await loadMore?.();

          setIsFetching(false);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore, isFetching]);

  // 🔄 Initial loading skeleton
  if (loading && !products.length) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[320px] rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // 📭 Empty state
  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-3">🛍️</div>
        <p className="text-gray-600 text-lg font-medium">
          No products found
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Try changing filters or search again
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 🧱 Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="transform transition hover:scale-[1.02]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* 🔄 Loading more skeleton (pagination scroll) */}
      {isFetching && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[320px] rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* 👇 Observer trigger (infinite scroll point) */}
      {hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </>
  );
}