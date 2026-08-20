"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/src/components/product/ProductCard";

interface ProductPagedCarouselProps {
  products: any[];
  perPage?: number;
}

/**
 * Mobile: groups products into pages of `perPage` (default 8, laid out as a
 * 2-column x 4-row grid) and lets the user page through them horizontally —
 * either by swiping or tapping the prev/next button. Only the active page's
 * images are rendered up front, so it stays fast even with large catalogs.
 */
export default function ProductPagedCarousel({
  products,
  perPage = 8,
}: ProductPagedCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks: any[][] = [];
    for (let i = 0; i < products.length; i += perPage) {
      chunks.push(products.slice(i, i + perPage));
    }
    return chunks;
  }, [products, perPage]);

  const totalPages = pages.length;

  const goToPage = (index: number) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, index));
    setPage(clamped);
    const track = trackRef.current;
    if (track) {
      track.scrollTo({
        left: clamped * track.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const nearest = Math.round(track.scrollLeft / track.clientWidth);
    if (nearest !== page) setPage(nearest);
  };

  if (totalPages === 0) return null;

  return (
    <div className="md:hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="yc-carousel-track flex overflow-x-auto scrollbar-hide -mx-4 px-4"
      >
        {pages.map((pageProducts, pIndex) => (
          <div
            key={pIndex}
            className="yc-carousel-item grid grid-cols-2 gap-3 w-full shrink-0 pr-1"
          >
            {pageProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            aria-label="Previous products"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="yc-carousel-nav p-2 rounded-full border border-border bg-surface text-foreground disabled:opacity-35 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1.5">
            {pages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === page ? 18 : 6,
                  background: i === page ? "var(--primary)" : "var(--border)",
                }}
              />
            ))}
          </div>

          <button
            aria-label="Next products"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages - 1}
            className="yc-carousel-nav p-2 rounded-full border border-border bg-surface text-foreground disabled:opacity-35 disabled:pointer-events-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
