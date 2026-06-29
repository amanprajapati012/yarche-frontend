"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import DataTable from "@/src/components/admin/DataTable";
import BannerForm from "@/src/components/admin/banner/BannerForm";
import { ImageIcon } from "lucide-react";

export default function BannerPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/carousel");

      setData(res.data.carousels || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
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
    if (!confirm("Delete this banner?")) return;

    try {
      await API.delete(`/admin/deletecarousel/${row._id}`);

      fetchBanners();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row: any) => (
        <img
          src={`http://localhost:5000${row.images?.[0]}`}
          alt=""
          className="w-24 h-16 object-cover rounded-lg border"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "caption",
      label: "Caption",
    },
    {
      key: "buttonText",
      label: "Button",
    },
    {
      key: "link",
      label: "Link",
      render: (row: any) => (
        <span className="max-w-[250px] truncate block">
          {row.link}
        </span>
      ),
    },
    {
      key: "images",
      label: "Images",
      render: (row: any) => (
        <span>{row.images?.length || 0}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-xs ${row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
            }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "#fff6e2" }}
    >
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-foreground">
          <ImageIcon size={20} />
          Banner Management
        </h1>

        <button
          onClick={handleAdd}
          className="px-5 py-2 rounded-lg text-white"
          style={{ background: "#28170d" }}
        >
          + Add Banner
        </button>
      </div>

      <BannerForm
        open={open}
        setOpen={setOpen}
        editData={editData}
        refresh={fetchBanners}
      />

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