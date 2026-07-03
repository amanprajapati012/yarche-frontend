"use client";

import { useEffect, useRef, useState } from "react";
import API from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewArrivalsProps {
  isPage?: boolean;
}

export default function NewArrivals({
  isPage = false,
}: NewArrivalsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      if (res.data.response === "success") {
        const newArrivals = (res.data.products || []).filter((p: any) =>
          p.tags?.includes("new-arrival")
        );

        setProducts(newArrivals);
      }
    } catch (err) {
      console.log(err);
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
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              New Arrivals
            </h2>
            <div className="w-16 h-[2px] bg-footer mt-2" />
          </div>

          {!isPage && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 border rounded-lg bg-white hover:bg-gray-100 transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="p-2 border rounded-lg bg-white hover:bg-gray-100 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No new arrivals found.
          </p>
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
              className="hidden md:flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
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