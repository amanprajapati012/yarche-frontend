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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">

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

        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--foreground)]/50">
              Browse Collection
            </span>

            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
              Shop by{" "}
              <span className="relative inline-block">
                Category
                <span className="absolute left-0 -bottom-2 h-1 w-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-400"></span>
              </span>
            </h2>
          </div>

          <Link
            href="/best-sellers"
            className="hidden md:flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold hover:shadow-xl hover:-translate-y-0.5 transition"
          >
            View More
            <span>→</span>
          </Link>
        </div>

        {/* Categories */}


        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${encodeURIComponent(cat.category)}`}
              className="group"
            >
              <div
                className="
    relative
    overflow-hidden
    rounded-[28px]
    border
    border-[var(--border)]
    bg-[var(--surface)]
    transition-all
    duration-500
    hover:-translate-y-2
    hover:shadow-2xl
    group
  "
              >

                {/* Glow */}
                <div
                  className="
      absolute
      -top-16
      -right-16
      h-36
      w-36
      rounded-full
      bg-orange-300/20
      blur-3xl
      opacity-0
      transition
      duration-500
      group-hover:opacity-100
    "
                />

                {/* Image */}

                <div className="p-4">

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
          duration-700
          group-hover:scale-110
        "
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.png";
                      }}
                    />

                  </div>

                </div>

                {/* Content */}

                <div className="px-5 pb-5">

                  <h3
                    className="
        min-h-[56px]
        flex
        items-center
        justify-center
        text-center
        text-lg
        font-bold
        text-[var(--foreground)]
      "
                  >
                    {cat.category}
                  </h3>

                  <div className="mt-4 flex justify-center">

                    <span className="text-sm font-semibold text-orange-600 transition-all duration-300 group-hover:tracking-wider">
                      Discover →
                    </span>

                  </div>

                </div>

              </div>

            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:hidden">

  <Link
    href="/best-sellers"
    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold"
  >
    View More →
  </Link>

</div>





      </div>
    </section>
  );
}