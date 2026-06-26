"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/src/lib/api";
import DataTable from "@/src/components/admin/DataTable";
import { toast } from "sonner";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get("/productcategories");
      setCategories(res.data?.data || []);
    } catch (err) {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (row: any) => {
    toast("Are you sure you want to delete this category?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await API.delete(
              `/admin/deleteproductcategory/${row._id}`
            );
            toast.success("Category deleted");
            fetchCategories();
          } catch (err: any) {
            toast.error(
              err?.response?.data?.message || "Delete failed"
            );
          }
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Categories</h1>
          <p className="text-sm text-gray-500">Manage categories</p>
        </div>

        <button
          onClick={() =>
            router.push("/admin/categories/create")
          }
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Category
        </button>
      </div>

      <div className="bg-white border rounded-xl p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            data={categories}
            columns={[{ key: "category", label: "Category" }]}
            onEdit={(row) =>
              router.push(`/admin/categories/${row._id}/edit`)
            }
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}