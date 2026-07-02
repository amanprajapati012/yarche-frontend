"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { getImageUrl, ImageType } from "@/src/lib/image";

interface Category {
  _id: string;
  category: string;
  images: ImageType[];
}

export default function ShopByCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/productcategories");
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-5 md:px-10 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="h-12 w-72 rounded bg-[var(--border)] animate-pulse" />
            <div className="h-6 w-40 rounded bg-[var(--border)] animate-pulse" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] bg-surface border border-[var(--border)] overflow-hidden"
              >
                <div className="h-56 bg-[var(--border)] animate-pulse" />
                <div className="p-5">
                  <div className="h-5 rounded bg-[var(--border)] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-5 md:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-4xl font-bold text-foreground">
              Shop by Category
            </h2>

            <div className="w-24 h-1 bg-[#ff6e23] rounded-full mt-3" />
          </div>

          <Link
            href="/categories"
            className="
              text-lg
              font-semibold
              text-foreground
              hover:text-[#ff6e23]
              transition
            "
          >
            Shop All Products →
          </Link>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-8">

          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${encodeURIComponent(cat.category)}`}
              className="group"
            >
              <div
                className="
                  h-full
                  rounded-[28px]
                  bg-surface
                  border
                  border-[var(--border)]
                  shadow-sm
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="h-[240px] flex items-center justify-center p-5">

                  <img
                    src={getImageUrl(cat.images?.[0])}
                    alt={cat.category}
                    className="
                      w-full
                      h-full
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder.png";
                    }}
                  />

                </div>

                {/* Name */}
                <div className="px-4 pb-6 text-center">

                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-foreground
                      leading-snug
                      transition
                      group-hover:text-[#ff6e23]
                    "
                  >
                    {cat.category}
                  </h3>

                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}