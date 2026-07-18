"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getComboById } from "@/src/lib/api/combo";

import ComboForm from "@/src/components/admin/combo/ComboForm";
import BackButton from "@/src/components/admin/BackButton";

export default function EditComboPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [combo, setCombo] = useState<any>(null);

  const fetchCombo = async () => {
    try {
      setLoading(true);

      const data = await getComboById(params.id as string);

      setCombo(data);
    } catch (error) {
      console.error("FETCH COMBO ERROR =>", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchCombo();
    }
  }, [params?.id]);

  if (loading) {
    return <div className="py-10 text-center">Loading combo...</div>;
  }

  if (!combo) {
    return (
      <div className="py-10 text-center text-red-500">Combo not found</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />

        <div>
          <h1 className="text-3xl font-bold">Edit Combo</h1>
          <p className="text-gray-500">Update combo details</p>
        </div>
      </div>

      <ComboForm initialData={combo} />
    </div>
  );
}