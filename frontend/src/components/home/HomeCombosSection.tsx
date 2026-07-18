"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

import ComboCard from "@/src/components/combo/ComboCard";
import { getPublicCombos } from "@/src/lib/api/combo";

const DISPLAY_LIMIT = 4;

export default function HomeCombosSection() {
  const [combos, setCombos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        setLoading(true);
        const data = await getPublicCombos();
        setCombos(data || []);
      } catch (error) {
        console.error(error);
        setCombos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  // Combo section tabhi dikhega jab data ho ya loading ho
  if (!loading && combos.length === 0) return null;

  const visibleCombos = combos.slice(0, DISPLAY_LIMIT);

  return (
    <section
      className="relative py-6 sm:py-8 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* DECORATIVE BG BLOBS */}
      <div
        className="pointer-events-none absolute -top-16 -left-16 w-60 h-60 rounded-full blur-3xl opacity-50"
        style={{ background: "var(--input-bg)" }}
      />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#FF6E23]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <div
              className="inline-flex items-center gap-2 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-3 shadow-sm"
              style={{ background: "var(--footer)" }}
            >
              <Layers size={12} />
              CURATED BUNDLES
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1]"
              style={{ color: "var(--foreground)" }}
            >
              Combo Deals
              <span className="inline-flex align-middle ml-2 text-[#FF6E23]">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
              </span>
            </h2>

            <p
              className="mt-2 text-[15px] sm:text-lg max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Handpicked product bundles at prices you won't find anywhere
              else.
            </p>
          </div>

          {/* VIEW MORE — desktop */}
          <Link
            href="/combos"
            className="hidden sm:inline-flex items-center gap-2 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            style={{ background: "var(--footer)" }}
          >
            View All Combos
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: DISPLAY_LIMIT }).map((_, i) => (
              <div
                key={i}
                className="h-[320px] rounded-[28px] animate-pulse"
                style={{
                  background:
                    "linear-gradient(90deg, var(--input-bg), var(--surface), var(--input-bg))",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleCombos.map((combo) => (
              <div
                key={combo._id}
                className="transform transition duration-300 hover:scale-[1.02]"
              >
                <ComboCard combo={combo} />
              </div>
            ))}

            {/* VIEW MORE — as a card, shows on grid if there are more combos than limit */}
            {combos.length > DISPLAY_LIMIT && (
              <Link
                href="/combos"
                className="group flex flex-col items-center justify-center gap-4 h-full min-h-[280px] rounded-[28px] border-2 border-dashed transition-all duration-300"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--footer)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
                  style={{ background: "var(--footer)" }}
                >
                  <ArrowRight size={22} className="text-white" />
                </div>

                <div className="text-center px-4">
                  <p
                    className="font-bold transition-colors duration-300 group-hover:text-white"
                    style={{ color: "var(--foreground)" }}
                  >
                    View More Combos
                  </p>
                  <p
                    className="text-xs mt-1 transition-colors duration-300 group-hover:text-white/70"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    +{combos.length - DISPLAY_LIMIT} more deals waiting
                  </p>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* VIEW MORE — mobile (button below grid) */}
        <div className="mt-5 flex sm:hidden justify-center">
          <Link
            href="/combos"
            className="inline-flex items-center gap-2 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-lg active:scale-95 transition-all duration-200"
            style={{ background: "var(--footer)" }}
          >
            View All Combos
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}