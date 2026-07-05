"use client";

import Image from "next/image";
import { useLoadingStore } from "@/src/store/loadingStore";

export default function GlobalLoader() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white/85 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">

        {/* Rotating Ring */}
        <div className="loader-ring" />

        {/* Logo Circle */}
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
          <Image
            src="/logo3.png"
            alt="Loading"
            width={52}
            height={52}
            priority
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}