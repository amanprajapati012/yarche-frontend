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

      <div className="w-full overflow-hidden rounded-[24px] md:rounded-[30px] border border-[#28170D]/10 bg-[var(--surface)]">

       <div
  className="
    relative
    w-full
    aspect-square
    max-w-[650px]
    mx-auto
    overflow-hidden
    p-4
  "
>
          <img
  src={images[index] || "/placeholder.png"}
  alt={product?.name}
  className="
    w-full
    h-full
    object-contain
    transition-transform
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



     {product?.variants?.length > 0 && (
  <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6">

    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-xl font-bold text-[var(--foreground)]">
          Choose Variant
        </h3>

        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Select the option that suits your requirement.
        </p>
      </div>

      <span className="rounded-full bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]">
        {product.variants.length + 1} Options
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      {/* Original */}
      <button
        onClick={() => onVariantChange(null)}
        className={`relative rounded-3xl border-2 p-5 text-left transition-all duration-300 hover:shadow-lg ${
          !selectedVariant
            ? "border-[var(--foreground)] bg-[var(--input-bg)]"
            : "border-[var(--border)] bg-white"
        }`}
      >
        {!selectedVariant && (
          <div className="absolute top-4 right-4 h-7 w-7 rounded-full bg-[var(--footer)] text-white flex items-center justify-center text-xs">
            ✓
          </div>
        )}

        <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
          Default
        </span>

        <h4 className="mt-2 text-lg font-bold text-[var(--foreground)]">
          Original Product
        </h4>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Main product configuration
        </p>
      </button>

      {/* Variant Cards */}
      {product.variants.map((v: any) => (
        <button
          key={v._id}
          onClick={() => onVariantChange(v)}
          className={`relative rounded-3xl border-2 p-5 text-left transition-all duration-300 hover:shadow-lg ${
            selectedVariant?._id === v._id
              ? "border-[var(--foreground)] bg-[var(--input-bg)]"
              : "border-[var(--border)] bg-white"
          }`}
        >
          {selectedVariant?._id === v._id && (
            <div className="absolute top-4 right-4 h-7 w-7 rounded-full bg-[var(--footer)] text-white flex items-center justify-center text-xs">
              ✓
            </div>
          )}

          <span className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
            Variant
          </span>

          <h4 className="mt-2 text-lg font-bold text-[var(--foreground)]">
            {v.title}
          </h4>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Click to select this variant
          </p>
        </button>
      ))}

    </div>

    <div className="mt-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] p-4">
      <p className="text-sm text-[var(--text-secondary)]">
        Selected Variant
      </p>

      <h4 className="mt-1 text-lg font-bold text-[var(--foreground)]">
        {selectedVariant ? selectedVariant.title : "Original Product"}
      </h4>
    </div>

  </div>
)}
    </div>
  );
}