"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPublicComboByName } from "@/src/lib/api/combo";

import ComboGallery from "@/src/components/combo/ComboGallery";
import ComboInfo from "@/src/components/combo/ComboInfo";
import ComboIncludedProducts from "@/src/components/combo/ComboIncludedProducts";

export default function ComboDetailPage() {
  const params = useParams();

  const [combo, setCombo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCombo = async () => {
    try {
      setLoading(true);

      const data = await getPublicComboByName(params.combo_name as string);

      setCombo(data);
    } catch (error) {
      console.error("FETCH COMBO ERROR =>", error);
      setCombo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.combo_name) {
      fetchCombo();
    }
  }, [params?.combo_name]);

  if (loading) {
    return <div className="py-20 text-center">Loading combo...</div>;
  }

  if (!combo) {
    return (
      <div className="py-20 text-center text-red-500">Combo not found</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ComboGallery combo={combo} />
        <ComboInfo combo={combo} />
      </div>

      <ComboIncludedProducts combo={combo} />
    </div>
  );
}