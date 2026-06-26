"use client";

import { useEffect, useRef, useState } from "react";
import API from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Bestseller() {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      if (res.data.response === "success") {
        const allProducts = res.data.products || [];

        const bestSellers = allProducts.filter((p: any) =>
          p.tags?.includes("best-seller")
        );

        setProducts(bestSellers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#FFF6E2] py-16">
      <div className="max-w-7xl mx-auto px-5">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif text-[#28170D]">
              Best Sellers
            </h2>
            <div className="w-16 h-[2px] bg-[#28170D] mt-2" />
          </div>

          {/* ARROWS */}
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
        </div>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {products.map((product) => (
            <div key={product._id} className="min-w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}