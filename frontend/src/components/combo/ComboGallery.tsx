"use client";

import { Sparkles } from "lucide-react";
import { getImageUrl } from "@/src/lib/image";

export default function ComboGallery({ combo }: any) {
  const imageSrc = getImageUrl(combo?.image);

  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="w-full overflow-hidden rounded-[24px] md:rounded-[30px] border border-[#28170D]/10 bg-[var(--surface)]">
        <div className="relative w-full aspect-square max-w-[650px] mx-auto overflow-hidden p-4">
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
    </div>
  );
}