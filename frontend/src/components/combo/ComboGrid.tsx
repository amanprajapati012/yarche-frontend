"use client";

import { useEffect, useRef, useState } from "react";
import ComboCard from "./ComboCard";

type ComboGridProps = {
  combos: any[];
  loading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
};

export default function ComboGrid({
  combos = [],
  loading = false,
  hasMore = false,
  loadMore,
}: ComboGridProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !isFetching) {
          setIsFetching(true);
          await loadMore?.();
          setIsFetching(false);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore, isFetching]);

  if (loading && !combos.length) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[320px] rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!loading && combos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-3">🎁</div>
        <p className="text-gray-600 text-lg font-medium">No combos found</p>
        <p className="text-gray-400 text-sm mt-1">
          Check back later for new deals
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {combos.map((combo: any) => (
          <div
            key={combo._id}
            className="transform transition hover:scale-[1.02]"
          >
            <ComboCard combo={combo} />
          </div>
        ))}
      </div>

      {isFetching && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[320px] rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </>
  );
}