"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/src/lib/api";

interface Category {
  _id: string;
  category: string;
  images: string[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getImage = (img?: string) => {
  if (!img) return "/placeholder.png";

  if (img.startsWith("http")) return img;

  return `${BASE_URL}${img.startsWith("/") ? img : `/${img}`}`;
};

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
      <section className="bg-background py-12 px-5 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-[28px] bg-surface animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-14 px-5 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Shop by Category
            </h2>

            <div className="w-24 h-1 mt-3 rounded-full bg-[#ff6e23]" />
          </div>

          <Link
            href="/categories"
            className="text-sm md:text-base font-semibold text-foreground hover:opacity-80 transition"
          >
            View All →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
          {categories.map((cat) => {
            console.log(cat.category);
            const image = getImage(cat.images?.[0]);

            return (
              <Link
                key={cat._id}
                href={`/categories/${encodeURIComponent(cat.category)}`}
                className="
                  group
                  relative
                  block
                  rounded-[32px]
                  overflow-hidden
                  bg-surface
                  border border-[#ead9b8]
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-300
                "
              >
                {/* IMAGE */}
                <div className="h-[150px] flex items-center justify-center p-4">
                  <img
                    src={image}
                    alt={cat.category}
                    className="
                      w-full
                      h-full
                      object-contain
                      group-hover:scale-110
                      transition duration-500
                    "
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder.png";
                    }}
                  />
                </div>

                {/* BADGE */}
                <div className="pb-5 px-3 text-center">
                  <div
                    className="
                      inline-block
                      px-4 py-1.5
                      rounded-full
                      text-white
                      font-semibold
                      text-sm
                      shadow-md
                      tracking-wide
                    "
                    style={{ backgroundColor: "#ff6e23" }}
                  >
                    {cat.category}
                  </div>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6e23]/40 to-transparent" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}