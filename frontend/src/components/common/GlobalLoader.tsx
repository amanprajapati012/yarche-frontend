"use client";

import Image from "next/image";
import { useLoadingStore } from "@/src/store/loadingStore";

export default function GlobalLoader() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        {/* Logo */}
        <Image
          src="/logo3.png"
          alt="Loading..."
          width={90}
          height={90}
          priority
          className="animate-pulse"
        />

        {/* Progress Bar */}
        <div className="h-1.5 w-44 overflow-hidden rounded-full bg-gray-200">
          <div className="loading-bar h-full w-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}