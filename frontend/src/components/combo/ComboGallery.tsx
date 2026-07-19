"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { getImageUrl } from "@/src/lib/image";

export default function ComboGallery({ combo }: any) {
  const images = combo?.images?.length ? combo.images : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];
  const imageSrc = getImageUrl(activeImage);

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden space-y-4">
      <div className="w-full overflow-hidden rounded-[24px] md:rounded-[30px] border border-[#28170D]/10 bg-[var(--surface)]">
        <div className="relative w-full aspect-square overflow-hidden p-2 sm:p-4 max-w-full">
          <img
            src={imageSrc || "/placeholder.png"}
            alt={combo?.title}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105 select-none"
          />

          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <div className="flex items-center gap-2 bg-footer text-[#FF6E23] px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold">
              <Sparkles size={13} />
              Combo Deal
            </div>
          </div>
        </div>
      </div>

      {/* THUMBNAILS — sirf tab dikhenge jab 1 se zyada images hon */}
      {images.length > 1 && (
        <div className="
    flex
    w-full
    max-w-full
    gap-2
    overflow-x-auto
    overflow-y-hidden
    pb-1
    snap-x
    snap-mandatory
    scrollbar-hide
">
          {images.map((img: any, index: number) => (
            <button
              key={img.public_id || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                activeIndex === index
                  ? "border-[#FF6E23]"
                  : "border-[#28170D]/10 hover:border-[#28170D]/30"
              }`}
            >
              <img
                src={getImageUrl(img)}
                alt={`${combo?.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
