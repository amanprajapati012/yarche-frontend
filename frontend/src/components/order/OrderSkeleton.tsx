"use client";

import React from "react";

export default function OrderSkeleton() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex gap-4 animate-pulse">
      
      {/* Image Skeleton */}
      <div className="w-20 h-20 rounded-xl bg-[var(--border)]/60 flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 space-y-3">

        {/* Title + Price */}
        <div className="flex justify-between gap-2">
          <div className="h-4 w-2/3 bg-[var(--border)]/70 rounded-md" />
          <div className="h-4 w-16 bg-[var(--border)]/70 rounded-md" />
        </div>

        {/* Meta lines */}
        <div className="space-y-2">
          <div className="h-3 w-1/2 bg-[var(--border)]/60 rounded-md" />
          <div className="h-3 w-1/3 bg-[var(--border)]/60 rounded-md" />
          <div className="h-3 w-2/5 bg-[var(--border)]/60 rounded-md" />
        </div>

        {/* Badges */}
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-16 bg-[var(--border)]/70 rounded-full" />
          <div className="h-5 w-20 bg-[var(--border)]/70 rounded-full" />
          <div className="h-5 w-24 bg-[var(--border)]/70 rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 w-1/3 bg-[var(--border)]/60 rounded-md" />
          <div className="h-7 w-20 bg-[var(--border)]/80 rounded-lg" />
        </div>

      </div>
    </div>
  );
}