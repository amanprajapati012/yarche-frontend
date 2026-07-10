"use client";

import Link from "next/link";

interface Props {
  categories: string[];
}

export default function FeatureBar({ categories }: Props) {
  return (
    <section
      id="home-hero"
      className="w-full overflow-hidden bg-[#FFF6E2]"
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:grid grid-cols-[290px_1fr]">
        {/* CATEGORY SIDEBAR */}
        <div className="bg-background border border-[#28170D]/10">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${encodeURIComponent(cat)}`}
              className="
                block
                px-6
                py-4
                text-[15px]
                border-b
                border-[#28170D]/5
                hover:bg-[#F5E9CC]
                transition
              "
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* ================= DESKTOP BANNERS ================= */}
        <div className="grid grid-cols-[72%_28%]">
          {/* LEFT */}
          <Link
            href="/collections"
            className="overflow-hidden"
          >
            <div className="aspect-square w-full">
              <img
                src="/yarche1.png"
                alt="Banner"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </div>
          </Link>

          {/* RIGHT */}
          <div className="grid h-full grid-rows-2">
            <Link
              href="/collections"
              className="overflow-hidden"
            >
              <img
                src="/yarche3.png"
                alt="Banner"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </Link>

            <Link
              href="/collections"
              className="overflow-hidden"
            >
              <img
                src="/yarche2.png"
                alt="Banner"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        {/* MAIN BANNER */}
        <Link
          href="/collections"
          className="block overflow-hidden"
        >
          <div className="aspect-square w-full">
            <img
              src="/yarche1.png"
              alt="Banner"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>
        </Link>

        {/* SCROLLABLE SQUARE BANNERS */}
        <div
          className="
            mt-4
            flex
            gap-4
            overflow-x-auto
            px-4
            pb-4
            snap-x
            snap-mandatory
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {["/yarche3.png", "/yarche2.png"].map((src) => (
            <Link
              key={src}
              href="/collections"
              className="
                snap-start
                shrink-0
                w-[72vw]
                max-w-[280px]
              "
            >
              <div className="aspect-square overflow-hidden rounded-2xl shadow-md">
                <img
                  src={src}
                  alt="Banner"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}