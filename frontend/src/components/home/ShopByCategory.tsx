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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-5 md:px-10 lg:px-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">

          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-3">
              <div className="h-10 w-72 rounded-lg bg-[var(--border)] animate-pulse" />
              <div className="h-1 w-20 rounded-full bg-[var(--border)] animate-pulse" />
            </div>

            <div className="h-10 w-32 rounded-full bg-[var(--border)] animate-pulse" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="
                  rounded-3xl
                  bg-[var(--surface)]
                  border
                  border-[var(--border)]
                  p-4
                "
              >
                <div className="w-full aspect-square rounded-2xl bg-[var(--border)] animate-pulse" />

                <div className="mt-4 h-5 rounded bg-[var(--border)] animate-pulse" />

                <div className="mt-2 h-4 w-20 rounded bg-[var(--border)] animate-pulse" />
              </div>
            ))}

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-5 md:px-10 lg:px-16 bg-[var(--background)]">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-12">

          <div>

            <h2 className="text-4xl font-bold text-[var(--foreground)]">
              Shop by Category
            </h2>

            <div className="w-24 h-1 mt-3 rounded-full bg-[var(--foreground)] opacity-20" />

          </div>

          <Link
            href="/best-sellers"
            className="
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-6
              py-3
              font-semibold
              text-[var(--foreground)]
              transition-all
              duration-300
              hover:bg-[var(--input-bg)]
              hover:shadow-md
            "
          >
            View More →
          </Link>

        </div>

        {/* Categories */}

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${encodeURIComponent(cat.category)}`}
              className="group"
            >
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                {/* Image */}
                {/* Image */}
<div className="p-3">
  <div
    className="
      aspect-square
      w-full
      overflow-hidden
      rounded-2xl
      bg-[var(--background)]
      border
      border-[var(--border)]
    "
  >
    <img
      src={getImageUrl(cat.images?.[0])}
      alt={cat.category}
     className="
  w-full
  h-full
  object-contain
  transition-transform
  duration-500
  group-hover:scale-105
"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/placeholder.png";
      }}
    />
  </div>
</div>

                {/* Content */}
                <div className="px-5 pb-5">

                  <h3 className="text-lg font-semibold text-[var(--foreground)] text-center leading-snug min-h-[56px] flex items-center justify-center">
                    {cat.category}
                  </h3>

                  <div className="mt-4 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-[var(--background)] border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-all duration-300 group-hover:bg-[var(--input-bg)]">
                      Explore →
                    </span>
                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>





      </div>
    </section>
  );
}