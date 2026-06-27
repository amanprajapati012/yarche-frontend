"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <div className="mb-6 md:mb-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-[#6f5f52] mb-3">
        <Link
          href="/"
          className="hover:text-[#3B281C] transition-colors"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <Link
          href="/cart"
          className="hover:text-[#3B281C] transition-colors"
        >
          Cart
        </Link>

        <ChevronRight size={14} />

        <span className="font-semibold text-[#3B281C]">
          Checkout
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B281C]">
        Checkout
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-sm sm:text-base text-[#6f5f52] max-w-2xl">
        Complete your order securely and enjoy a hassle-free shopping
        experience.
      </p>
    </div>
  );
}