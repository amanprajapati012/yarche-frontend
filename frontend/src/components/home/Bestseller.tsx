"use client";

import { useEffect, useRef, useState } from "react";
import API from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

interface BestSellerProps {
  isPage?: boolean;
}

export default function BestSeller({
  isPage = false,
}: BestSellerProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      if (res.data.response === "success") {
        const bestSellers = (res.data.products || []).filter((p: any) =>
          p.tags?.includes("best-seller")
        );

        setProducts(bestSellers);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="py-10 sm:py-14"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-5">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full mb-3"
              style={{
                background: "var(--input-bg)",
                color: "var(--foreground)",
              }}
            >
              <Flame size={11} className="text-[#FF6E23]" />
              CUSTOMER FAVOURITES
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Best Sellers
            </h2>

            <p
              className="mt-2 text-sm sm:text-[15px] max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              The pieces our customers keep coming back for, loved for
              their quality and craftsmanship.
            </p>

            <div
              className="w-14 h-[3px] rounded-full mt-4"
              style={{ background: "var(--footer)" }}
            />
          </div>

          {!isPage && products.length > 0 && (
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll("left")}
                className="p-2.5 rounded-full border transition hover:shadow-md"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="p-2.5 rounded-full border transition hover:shadow-md"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[300px] rounded-2xl animate-pulse"
                style={{
                  background:
                    "linear-gradient(90deg, var(--input-bg), var(--surface), var(--input-bg))",
                }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">🔥</div>
            <p
              className="font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              No best sellers right now
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Check back soon for top-rated picks
            </p>
          </div>
        ) : isPage ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <>
            {/* Mobile */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* Tablet & Desktop */}
            <div
              ref={scrollRef}
              className="hidden md:flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="w-[280px] min-w-[280px] shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }

              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </>
        )}
      </div>
    </section>
  );
}