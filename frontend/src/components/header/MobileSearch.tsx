"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconChevronDown,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import API from "@/src/lib/api";
import { getImageUrl } from "@/src/lib/image";

interface Category {
  _id?: string;
  category: string;
}

interface Props {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  categories: Category[];
}

export default function MobileSearch({
  showSearch,
  setShowSearch,
  categories,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showSearch) {
      setQuery("");
      setResults([]);
      setCategoryOpen(false);
    }
  }, [showSearch]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const value = query.trim();

      if (!value) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const slug = value.replace(/\s+/g, "-");

        let url = `/search/${encodeURIComponent(slug)}`;

        // Specific category selected
        if (selectedCategory !== "all") {
          url += `?category=${encodeURIComponent(
            selectedCategory
          )}`;
        }

        console.log("Mobile Search URL:", url);

        const res = await API.get(url);

        setResults(res.data?.products || []);
      } catch (error) {
        console.error("Mobile Search Error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

  if (!showSearch) return null;

  const selectedCategoryName =
    selectedCategory === "all"
      ? "All Products"
      : selectedCategory;

  return (
    <div className="fixed inset-0 z-[3000] bg-background p-5 md:hidden overflow-y-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-foreground">
          Search
        </span>

        <button
          type="button"
          onClick={() => setShowSearch(false)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface transition"
        >
          <IconX size={28} />
        </button>
      </div>

      <div className="space-y-4">

        {/* CATEGORY SELECTOR */}
        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setCategoryOpen((prev) => !prev)
            }
            className="w-full bg-border/30 px-4 py-3 rounded-md flex justify-between items-center text-sm font-medium border border-foreground/10"
          >
            <span className="truncate">
              {selectedCategoryName}
            </span>

            <IconChevronDown
              size={16}
              className={`transition-transform ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {categoryOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-background border border-foreground/10 rounded-xl shadow-xl z-[100] overflow-hidden">

              {/* ALL PRODUCTS */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setCategoryOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm border-b border-foreground/5 hover:bg-footer-heading transition ${
                  selectedCategory === "all"
                    ? "font-bold bg-footer-heading"
                    : ""
                }`}
              >
                All Products
              </button>

              {/* CATEGORIES */}
              {categories.map((item) => (
                <button
                  key={item._id || item.category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(item.category);
                    setCategoryOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm border-b border-foreground/5 hover:bg-footer-heading transition ${
                    selectedCategory === item.category
                      ? "font-bold bg-footer-heading"
                      : ""
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH INPUT */}
        <div className="flex border border-foreground rounded-md overflow-hidden">

          <input
            autoFocus
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="flex-1 p-3 outline-none bg-transparent"
            placeholder={
              selectedCategory === "all"
                ? "What are you looking for?"
                : `Search in ${selectedCategory}...`
            }
          />

          <button
            type="button"
            className="bg-footer text-white px-5"
            onClick={() => {
              if (!query.trim()) return;
            }}
          >
            <IconSearch size={20} />
          </button>
        </div>

        {/* SEARCH CATEGORY INFO */}
        {query.trim() && (
          <div className="text-xs text-gray-500 px-1">
            Searching in:{" "}
            <span className="font-semibold text-foreground">
              {selectedCategoryName}
            </span>
          </div>
        )}

        {/* RESULTS */}
        {query.trim() && (
          <div className="rounded-xl border border-foreground/10 overflow-hidden bg-background">

            {/* LOADING */}
            {loading ? (
              <div className="p-6 text-center text-foreground">
                Searching...
              </div>
            ) : results.length === 0 ? (
              /* NO RESULTS */
              <div className="p-6 text-center text-foreground">
                <p className="font-medium">
                  No products found
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Try another product name or category.
                </p>
              </div>
            ) : (
              /* PRODUCT RESULTS */
              results.map((product) => {
                const image =
                  product.images?.[0]
                    ? getImageUrl(product.images[0])
                    : "/placeholder.png";

                return (
                 <Link
  key={product._id}
  href={`/products/${product.slug}`}
  onClick={() => {
    setShowSearch(false);
    setQuery("");
    setResults([]);
  }}
  className="flex items-center gap-3 p-3 border-b border-foreground/5 hover:bg-footer-heading transition"
>

                    {/* IMAGE */}
                    <img
                      src={image}
                      alt={
                        product.product_name ||
                        product.name ||
                        "Product"
                      }
                      className="w-14 h-14 rounded-lg object-cover bg-white shrink-0"
                    />

                    {/* DETAILS */}
                    <div className="flex-1 min-w-0">

                      <p className="font-medium text-foreground line-clamp-2">
                        {product.product_name ||
                          product.name}
                      </p>

                      {/* CATEGORY */}
                      {product.category && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {product.category}
                        </p>
                      )}

                      {/* PRICE */}
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