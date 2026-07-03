"use client";

import { useEffect, useRef, useState } from "react";
import API from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TopProductsProps {
  isPage?: boolean;
}

export default function TopProducts({
  isPage = false,
}: TopProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      if (res.data.response === "success") {
        const topProducts = (res.data.products || []).filter((p: any) =>
          p.tags?.includes("top-product")
        );

        setProducts(topProducts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif text-foreground">
              Top Products
            </h2>
            <div className="w-16 h-[2px] bg-footer mt-2" />
          </div>

          {!isPage && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 border rounded-lg bg-white hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="p-2 border rounded-lg bg-white hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No top products found.</p>
        ) : isPage ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[280px] max-w-[280px] shrink-0"
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