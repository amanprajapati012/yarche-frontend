"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { getImageUrl } from "@/src/lib/image";


export default function ProductGallery({
  product,
  selectedVariant,
  onVariantChange,
}: any) {
  const [index, setIndex] = useState(0);

 const images =
  selectedVariant?.images?.length > 0
    ? selectedVariant.images.map(getImageUrl)
    : product?.images?.map(getImageUrl) || [];

  useEffect(() => {
    setIndex(0);
  }, [selectedVariant]);

  return (
    <div className="w-full min-w-0 space-y-4">

      {/* MAIN IMAGE */}

      <div className="w-full overflow-hidden rounded-[24px] md:rounded-[30px] border border-[#28170D]/10 + bg-white">

        <div
          className="
            relative
            w-full
            h-[280px]
            sm:h-[420px]
            md:h-[520px]
            lg:h-[600px]
            flex
            items-center
            justify-center
            p-4
            sm:p-6
            md:p-8
            overflow-hidden
          "
        >
          <img
            src={images[index] || "/placeholder.png"}
            alt={product?.name}
            className="
              max-w-full
              max-h-full
              object-contain
              transition-all
              duration-500
              hover:scale-105
              select-none
            "
          />

          {/* Badge */}

          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <div
              className="
                flex
                items-center
                gap-2
                bg-footer
                text-[#FF6E23]
                px-3
                py-2
                rounded-full
                text-[10px]
                sm:text-xs
                font-bold
              "
            >
              <Sparkles size={13} />
              Premium Product
            </div>
          </div>

          {/* Arrows */}

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setIndex((prev) =>
                    prev > 0
                      ? prev - 1
                      : images.length - 1
                  )
                }
                className="
                  absolute
                  left-2
                  sm:left-4
                  top-1/2
                  -translate-y-1/2
                  w-9
                  h-9
                  sm:w-11
                  sm:h-11
                  rounded-full
                  bg-footer
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() =>
                  setIndex((prev) =>
                    prev < images.length - 1
                      ? prev + 1
                      : 0
                  )
                }
                className="
                  absolute
                  right-2
                  sm:right-4
                  top-1/2
                  -translate-y-1/2
                  w-9
                  h-9
                  sm:w-11
                  sm:h-11
                  rounded-full
                  bg-footer
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* THUMBNAILS */}

      {images.length > 1 && (
        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-2
            w-full
            scrollbar-hide
          "
        >
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                flex-shrink-0
                w-16
                h-16
                sm:w-20
                sm:h-20
                md:w-24
                md:h-24
                rounded-2xl
                overflow-hidden
                border-2
                transition-all
                ${index === i
                  ? "border-[#28170D] scale-105"
                  : "border-[#28170D]/10"
                }
              `}
            >
              <img
                src={img}
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </button>
          ))}
        </div>
      )}

      {/* VARIANTS */}

      {/* VARIANTS */}

      {product?.variants?.length > 0 && (
        <div className="bg-[#f5e6c6] border border-[#28170D]/10 rounded-[28px] p-5">

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-foreground text-lg">
              Choose Variant
            </h3>

            <span className="text-xs text-[#6b5c50]">
              {product.variants.length + 1} Options
            </span>
          </div>

          <div className="flex flex-wrap gap-3">

            {/* ORIGINAL */}

            <button
              onClick={() => onVariantChange(null)}
              className={`
          px-4
          py-3
          rounded-2xl
          border
          transition-all
          ${!selectedVariant
                  ? "bg-footer text-white border-[#28170D]"
                  : "bg-white border-[#28170D]/10 text-foreground"
                }
        `}
            >
              <div className="flex flex-col items-start">
                <span className="font-bold">
                  Original
                </span>

                <span className="text-[11px] opacity-70">
                  Default Product
                </span>
              </div>
            </button>

            {/* VARIANTS */}

            {product.variants.map((v: any) => (
              <button
                key={v._id}
                onClick={() => onVariantChange(v)}
                className={`
            relative
            px-4
            py-3
            rounded-2xl
            border
            min-w-[140px]
            text-left
            transition-all
            ${selectedVariant?._id === v._id
                    ? "bg-footer text-white border-[#28170D]"
                    : "bg-white border-[#28170D]/10 text-foreground"
                  }
          `}
              >
                <div className="flex flex-col">
                  <span className="font-bold">
                    {v.title}
                  </span>

                  <span className="text-[11px] opacity-70">
                    Variant
                  </span>
                </div>

                {selectedVariant?._id === v._id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FF6E23] text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}

          </div>

          <div className="mt-4 bg-[#fff3e2] border border-[#28170D]/10 rounded-xl p-3">
            <span className="text-xs text-[#6b5c50]">
              Selected:
            </span>

            <p className="font-bold text-foreground mt-1">
              {selectedVariant
                ? selectedVariant.title
                : "Main Product"}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}