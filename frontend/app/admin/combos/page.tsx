"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DataTable from "@/src/components/admin/DataTable";
import { getCombos, deleteCombo } from "@/src/lib/api/combo";

export default function CombosPage() {
  const router = useRouter();

  const [combos, setCombos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "comboSku", label: "SKU" },
    { key: "title", label: "Title" },
    { key: "productsCount", label: "Products" },
    { key: "price", label: "Price" },
    { key: "discountedPrice", label: "Discount Price" },
    { key: "landingPrice", label: "Landing Price" },
    { key: "isActive", label: "Active" },
  ];

  const fetchCombos = async () => {
    try {
      setLoading(true);

      const data = await getCombos();

      const formatted = data.map((combo: any) => ({
        _id: combo._id,
        comboSku: combo.comboSku,
        title: combo.title,

        productsCount: combo.products?.length || 0,

        price: combo.price,
        discountedPrice: combo.discountedPrice,
        landingPrice: combo.landingPrice,

        isActive: combo.isActive ? "Yes" : "No",
      }));

      setCombos(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch combos");
      setCombos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const handleDelete = (row: any) => {
    toast(`Delete "${row.title}" ?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteCombo(row._id);

            setCombos((prev) => prev.filter((item) => item._id !== row._id));

            toast.success("Combo deleted successfully");
          } catch (error) {
            toast.error("Failed to delete combo");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Combos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all product combos
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/combos/create")}
          className="rounded-xl bg-footer px-5 py-3 text-white transition hover:opacity-90"
        >
          Add Combo
        </button>
      </div>

      <div className="rounded-2xl border border-[#E7D6B4] bg-white p-6">
        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading combos...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={combos}
            onEdit={(row) => router.push(`/admin/combos/${row._id}/edit`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}