"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import DataTable from "@/src/components/admin/DataTable";
import CollectionForm from "@/src/components/admin/collections/CollectionForm";
import { toast } from "sonner";
import { getImageUrl } from "@/src/lib/image";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // ================= FETCH =================
  const fetchCollections = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/collections");

      setCollections(res.data?.collections || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (row: any) => {
    try {
      await API.delete(`/admin/collections/${row._id}`);

      toast.success("Collection deleted");

      fetchCollections();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (row: any) => {
    setEditData(row);
    setOpen(true);
  };

  // ================= ADD =================
  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  // ================= TABLE =================
  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row: any) => (
        <img
          src={getImageUrl(row.image)}
          alt={row.name}
          className="w-12 h-12 rounded-lg object-cover border"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/placeholder.png";
          }}
        />
      ),
    },

    {
      key: "name",
      label: "Name",
    },

    {
      key: "slug",
      label: "Slug",
    },

    {
      key: "description",
      label: "Description",
      render: (row: any) => (
        <span className="text-xs text-gray-600 line-clamp-1">
          {row.description || "-"}
        </span>
      ),
    },

    {
      key: "sortOrder",
      label: "Sort",
    },

    {
      key: "isActive",
      label: "Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "isFeatured",
      label: "Featured",
      render: (row: any) => (
        <span className="text-sm font-medium">
          {row.isFeatured ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-background space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Collections
        </h1>

        <button
          onClick={handleAdd}
          className="bg-footer text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add Collection
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-xl p-3 shadow-sm border">
        <DataTable
          columns={columns}
          data={collections}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Form */}
      {open && (
        <CollectionForm
          open={open}
          setOpen={setOpen}
          editData={editData}
          refresh={fetchCollections}
        />
      )}
    </div>
  );
}