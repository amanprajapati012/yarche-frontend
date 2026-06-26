"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/src/lib/api";
import CategoryForm from "@/src/components/admin/CategoryForm";

export default function EditCategoryPage() {
  const params = useParams();

  const id = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          `/admin/productcategory/${id}`
        );
        setCategory(res?.data?.data || res?.data || null);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Failed to load category"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Category</h1>

      {category && (
        <CategoryForm initialData={category} />
      )}
    </div>
  );
}