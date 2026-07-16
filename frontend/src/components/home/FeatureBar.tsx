"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { getImageUrl } from "@/src/lib/image";

type Carousel = {
  _id: string;
  images: {
    url: string;
    public_id?: string;
  }[];
};

interface Props {
  categories: string[];
}



export default function FeatureBar({ categories }: Props) {
  const [carousel, setCarousel] = useState<Carousel | null>(null);

useEffect(() => {
  const fetchCarousel = async () => {
    try {
      const res = await API.get("/carousels");

      const activeCarousel = res.data.carousels?.find(
        (item: any) => item.isActive
      );

      setCarousel(activeCarousel || null);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCarousel();
}, []);
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
         <Link href="/collections" className="overflow-hidden">
  <div className="aspect-square w-full">
    <img
      src={getImageUrl(carousel?.images?.[0])}
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
</Link>

          {/* RIGHT */}
          <div className="grid h-full grid-rows-2">
            <Link href="/best-sellers" className="overflow-hidden">
  <img
    src={getImageUrl(carousel?.images?.[1])}
    alt=""
    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
  />
</Link>

           <Link href="/new-arrivals" className="overflow-hidden">
  <img
    src={getImageUrl(carousel?.images?.[2])}
    alt=""
    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
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
  src={getImageUrl(carousel?.images?.[0])}
  alt=""
  className="h-full w-full object-cover"
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
  {carousel?.images?.slice(1).map((img, index) => (
    <Link
      key={index}
      href="/best-sellers"
      className="snap-start shrink-0 w-[72vw] max-w-[280px]"
    >
      <div className="aspect-square overflow-hidden rounded-2xl shadow-md">
        <img
          src={getImageUrl(img)}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
  ))}
</div>
      </div>
    </section>
  );
}