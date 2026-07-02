"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import DataTable from "@/src/components/admin/DataTable";
import DiscountForm from "@/src/components/admin/discount/DiscountForm";
import { Tag } from "lucide-react";

export default function DiscountsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/discounts");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditData(row);
    setOpen(true);
  };

  const handleDelete = async (row: any) => {
    if (!confirm("Delete this discount?")) return;

    await API.delete(`/admin/deletediscount/${row._id}`);
    fetchDiscounts();
  };

  const columns = [
    {
      key: "code",
      label: "Code",
      render: (row: any) => (
        <span className="font-semibold text-foreground">
          {row.code}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row: any) => (
        <span className="capitalize">{row.type}</span>
      ),
    },
    {
      key: "value",
      label: "Value",
      render: (row: any) => (
        <span>
          {row.type === "percentage"
            ? `${row.value}%`
            : `₹${row.value}`}
        </span>
      ),
    },
    {
      key: "minOrderAmount",
      label: "Min Order",
      render: (row: any) => `₹${row.minOrderAmount}`,
    },
    {
      key: "usage",
      label: "Usage",
      render: (row: any) => (
        <span>
          {row.usedCount}
          {row.usageLimit ? ` / ${row.usageLimit}` : " / ∞"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "endDate",
      label: "End Date",
      render: (row: any) =>
        new Date(row.endDate).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Tag size={18} /> Discounts
        </h1>

        <button
          onClick={handleAdd}
          className="bg-footer text-white px-4 py-2 rounded-lg"
        >
          + Add Discount
        </button>
      </div>

      {/* FORM */}
      <DiscountForm
        open={open}
        setOpen={setOpen}
        editData={editData}
        refresh={fetchDiscounts}
      />

      {/* TABLE (YOUR COMPONENT) */}
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={10}
      />
    </div>
  );
}