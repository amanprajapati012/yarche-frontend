"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function OrderEmpty() {
  return (
    <div
      className="
      bg-surface
      border
      border-border
      rounded-[32px]
      py-20
      px-8
      flex
      flex-col
      items-center
      justify-center
      text-center
      shadow-[0_15px_40px_rgba(40,23,13,0.08)]
      "
    >
      {/* Icon */}

      <div
        className="
        w-24
        h-24
        rounded-full
        bg-[var(--input-bg)]
        flex
        items-center
        justify-center
        "
      >
        <ShoppingBag
          size={42}
          className="text-foreground"
        />
      </div>

      {/* Title */}

      <h2 className="mt-8 text-3xl font-bold text-foreground">
        No Orders Found
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md text-[15px] leading-7 text-[var(--text-secondary)]">
        Looks like you haven't placed any orders yet.
        Explore our latest products and place your first order today.
      </p>

      {/* Button */}

      <Link
        href="/shop"
        className="
        mt-8
        inline-flex
        items-center
        gap-2
        rounded-2xl
        bg-footer
        px-8
        py-3.5
        text-white
        font-semibold
        transition-all
        duration-300
        hover:opacity-90
        hover:-translate-y-1
        "
      >
        <ShoppingBag size={18} />
        Continue Shopping
      </Link>
    </div>
  );
}