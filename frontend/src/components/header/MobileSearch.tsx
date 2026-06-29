"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconChevronDown,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import API from "@/src/lib/api";

interface Props {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

export default function MobileSearch({
  showSearch,
  setShowSearch,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const IMAGE_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const slug = query.trim().replace(/\s+/g, "-");

        const res = await API.get(`/search/${slug}`);

        setResults(res.data?.products || []);
      } catch (err) {
        console.log(err);
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  if (!showSearch) return null;

  return (
    <div className="fixed inset-0 z-[3000] bg-background p-5 md:hidden overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-foreground">
          Search
        </span>

        <button onClick={() => setShowSearch(false)}>
          <IconX size={28} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="w-full bg-[#E5DCC9]/30 px-4 py-3 rounded-md flex justify-between items-center text-sm font-medium border border-[#28170D]/10">
          All products
          <IconChevronDown size={16} />
        </div>

        <div className="flex border border-[#28170D] rounded-md overflow-hidden">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 outline-none bg-transparent"
            placeholder="What are you looking for?"
          />

          <button className="bg-footer text-white px-5">
            <IconSearch size={20} />
          </button>
        </div>

        {query && (
          <div className="rounded-xl border border-[#28170D]/10 overflow-hidden bg-background">
            {results.length === 0 ? (
              <div className="p-6 text-center text-foreground">
                No products found
              </div>
            ) : (
              results.map((product) => {
                const image = product.images?.[0]
                  ? product.images[0].startsWith("http")
                    ? product.images[0]
                    : `${IMAGE_BASE}${product.images[0]}`
                  : "/placeholder.png";

                return (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={() => setShowSearch(false)}
                    className="flex items-center gap-3 p-3 border-b border-[#28170D]/5 hover:bg-[#F5E9CC] transition"
                  >
                    <img
                      src={image}
                      alt={product.product_name}
                      className="w-14 h-14 rounded-lg object-cover bg-white"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-foreground line-clamp-2">
                        {product.product_name}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-bold text-foreground">
                          ₹
                          {product.discountedPrice ||
                            product.price}
                        </span>

                        {product.discountedPrice &&
                          product.price && (
                            <span className="text-xs text-gray-500 line-through">
                              ₹{product.price}
                            </span>
                          )}
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}