"use client";

import {
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Truck,
} from "lucide-react";

export default function ProductTabs({
  product,
  selectedVariant,
}: any) {
  const description =
    selectedVariant?.description ||
    product.full_description ||
    product.description;

  return (
    <div
      className="
      bg-[#f5e6c6]
      border
      border-[#28170D]/10
      rounded-[32px]
      overflow-hidden
    "
    >
      {/* HEADER */}

      <div
        className="
        px-5
        md:px-10
        py-6
        border-b
        border-[#28170D]/10
      "
      >
        <div className="flex items-center gap-3">

          <div
            className="
            w-12
            h-12
            rounded-2xl
            bg-[#28170D]
            text-[#FF6E23]
            flex
            items-center
            justify-center
          "
          >
            <Sparkles size={22} />
          </div>

          <div>
            <h2
              className="
              text-2xl
              md:text-3xl
              font-black
              text-[#28170D]
            "
            >
              Product Details
            </h2>

            <p className="text-[#6b5c50] text-sm mt-1">
              Everything you need to know
            </p>
          </div>

        </div>
      </div>

      {/* HIGHLIGHTS */}

      <div className="p-5 md:p-8">

        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          mb-8
        "
        >

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-4
            border
            border-[#28170D]/10
          "
          >
            <ShieldCheck
              size={24}
              className="text-[#28170D]"
            />

            <h4 className="font-bold text-[#28170D] mt-3">
              Premium Quality
            </h4>

            <p className="text-xs text-[#6b5c50] mt-1">
              Carefully selected quality products.
            </p>
          </div>

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-4
            border
            border-[#28170D]/10
          "
          >
            <Truck
              size={24}
              className="text-[#28170D]"
            />

            <h4 className="font-bold text-[#28170D] mt-3">
              Fast Delivery
            </h4>

            <p className="text-xs text-[#6b5c50] mt-1">
              Quick shipping across locations.
            </p>
          </div>

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-4
            border
            border-[#28170D]/10
          "
          >
            <PackageCheck
              size={24}
              className="text-[#28170D]"
            />

            <h4 className="font-bold text-[#28170D] mt-3">
              Easy Replacement
            </h4>

            <p className="text-xs text-[#6b5c50] mt-1">
              Hassle-free replacement support.
            </p>
          </div>

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-4
            border
            border-[#28170D]/10
          "
          >
            <Sparkles
              size={24}
              className="text-[#28170D]"
            />

            <h4 className="font-bold text-[#28170D] mt-3">
              Trusted Product
            </h4>

            <p className="text-xs text-[#6b5c50] mt-1">
              Designed for everyday satisfaction.
            </p>
          </div>

        </div>

        {/* DESCRIPTION */}

        <div
          className="
          bg-[#fff3e2]
          rounded-[28px]
          p-5
          md:p-8
          border
          border-[#28170D]/10
        "
        >
          <div className="mb-5">

            <span
              className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-[#28170D]
              text-[#FF6E23]
              text-xs
              font-bold
            "
            >
              PRODUCT OVERVIEW
            </span>

          </div>

          <div
            className="
            text-[#55463c]
            text-[15px]
            md:text-[17px]
            leading-8
            whitespace-pre-line
          "
          >
            {description}
          </div>
        </div>

        {/* EXTRA INFO */}

        <div
          className="
          mt-6
          grid
          md:grid-cols-3
          gap-4
        "
        >

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-5
            border
            border-[#28170D]/10
          "
          >
            <h4 className="font-black text-[#28170D]">
              Premium Experience
            </h4>

            <p className="text-sm text-[#6b5c50] mt-2">
              Crafted to deliver a better everyday
              shopping experience.
            </p>
          </div>

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-5
            border
            border-[#28170D]/10
          "
          >
            <h4 className="font-black text-[#28170D]">
              Secure Packaging
            </h4>

            <p className="text-sm text-[#6b5c50] mt-2">
              Carefully packed to reach you safely
              and securely.
            </p>
          </div>

          <div
            className="
            bg-[#fff3e2]
            rounded-2xl
            p-5
            border
            border-[#28170D]/10
          "
          >
            <h4 className="font-black text-[#28170D]">
              Customer First
            </h4>

            <p className="text-sm text-[#6b5c50] mt-2">
              Built around quality, trust and
              customer satisfaction.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}