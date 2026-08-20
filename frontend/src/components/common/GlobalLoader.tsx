"use client";

import { useLoadingStore } from "@/src/store/loadingStore";

export default function GlobalLoader() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center backdrop-blur-[2px]"
      style={{ background: "var(--overlay)" }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="rounded-2xl bg-background px-8 py-7 shadow-2xl flex flex-col items-center gap-3">
        <div className="yc-loader">
          <span className="yc-loader-ring yc-loader-ring--outer" />
          <span className="yc-loader-ring" />
          <span className="yc-loader-mark">Y</span>
        </div>
        <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">
          Yarche
        </span>
      </div>
    </div>
  );
}
