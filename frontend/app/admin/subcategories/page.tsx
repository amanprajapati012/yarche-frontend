"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/src/lib/api";
import { toast } from "sonner";
import DataTable from "@/src/components/admin/DataTable";

export default function SubCategoriesPage() {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 const fetchData = async () => {
  try {
    setLoading(true);

    // ❌ WRONG (tumhare backend me ye route exist nahi kar raha)
    // const res = await API.get("/admin/productsubcategory");

    // ✅ FIX: backend route ke hisaab se correct URL use karo
    const res = await API.get("/productsubcategories");

    console.log("API RESPONSE 👉", res.data);

    const list = res.data?.data || res.data || [];

  const formatted = list.map((item: any) => ({
  ...item,
  category_name: item.category_id?.category || "N/A",
}));

    setData(formatted);
  } catch (err: any) {
    console.error("FETCH ERROR 👉", err?.response?.data || err);
    setData([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (row: any) => {
    try {
      await API.delete(
        `/admin/deleteproductsubcategory/${row._id}`
      );

      toast.success("Deleted");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Sub Categories</h1>
          <p className="text-sm text-gray-500">
            Manage product subcategories
          </p>
        </div>

        <button
          onClick={() =>
            router.push("/admin/subcategories/create")
          }
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Add Sub Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl p-4">
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500">No subcategories found</p>
        ) : (
          <DataTable
            data={data}
            columns={[
              {
                key: "sub_category",
                label: "Sub Category",
              },
              {
                key: "category_name",
                label: "Category",
              },
              {
                key: "createdAt",
                label: "Created",
                render: (row: any) =>
                  new Date(row.createdAt).toLocaleDateString(),
              },
            ]}
            onEdit={(row) =>
              router.push(
                `/admin/subcategories/${row._id}/edit`
              )
            }
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}