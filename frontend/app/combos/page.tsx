"use client";

import { useEffect, useState } from "react";
import ComboGrid from "@/src/components/combo/ComboGrid";
import { getPublicCombos } from "@/src/lib/api/combo";

export default function CombosPage() {
  const [combos, setCombos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCombos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-foreground">
          Combo Deals
        </h1>
        <p className="text-[#6c5b4f] mt-2">
          Save more when you buy these curated combos.
        </p>
      </div>

      <ComboGrid combos={combos} loading={loading} />
    </div>
  );
}