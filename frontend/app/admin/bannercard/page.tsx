"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Eye } from "lucide-react";

import API from "@/src/lib/api";
import { getImageUrl } from "@/src/lib/image";

import DataTable from "@/src/components/admin/DataTable";
import BannerModal from "@/src/components/admin/bannercard/BannerModal";

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  topText: string;

  leftOffer: string;
  leftText: string;
  leftCode: string;

  rightOffer: string;
  rightText: string;
  rightCode: string;

  buttonText: string;
  link: string;

  displayOrder: number;
  isActive: boolean;

  features: string[];

  image?: any;
}

export default function BannerCard() {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [bannerList, setBannerList] = useState<Banner[]>([]);

  const [editData, setEditData] = useState<any>(null);

  // ===========================
  // FETCH
  // ===========================

  const fetchBanner = async () => {
    try {
      setLoading(true);

     const res = await API.get("/admin/banner");

console.log(res.data);

if (Array.isArray(res.data)) {
  setBannerList(res.data);
} else if (Array.isArray(res.data.data)) {
  setBannerList(res.data.data);
} else if (Array.isArray(res.data.banners)) {
  setBannerList(res.data.banners);
} else {
  setBannerList([]);
}
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  // ===========================
  // DELETE
  // ===========================

  const handleDelete = async (row: Banner) => {
    const ok = window.confirm(
      "Delete this Banner?"
    );

    if (!ok) return;

    try {
      await API.delete(
        `/admin/deletebanner/${row._id}`
      );

      fetchBanner();
    } catch (err) {
      console.log(err);
    }
  };

  // ===========================
  // EDIT
  // ===========================

  const handleEdit = (row: Banner) => {
    setEditData(row);

    setOpen(true);
  };

  // ===========================
  // CREATE
  // ===========================

  const handleCreate = () => {
    setEditData(null);

    setOpen(true);
  };

  // ===========================
  // VIEW
  // ===========================

  const handleView = (row: Banner) => {
    window.open(row.link || "/", "_blank");
  };

  // ===========================
  // TABLE COLUMNS
  // ===========================

  const columns = useMemo(
    () => [
      {
        key: "image",
        label: "Image",

        render: (row: Banner) => (
          <div className="w-20 h-14 rounded-lg overflow-hidden border">
            {row.image ? (
              <img
                src={getImageUrl(row.image)}
                alt={row.title}
                width={100}
                height={60}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs">
                No Image
              </div>
            )}
          </div>
        ),
      },

      {
        key: "title",
        label: "Title",
      },

      {
        key: "subtitle",
        label: "Subtitle",
      },

      {
        key: "displayOrder",
        label: "Order",
      },

      {
        key: "isActive",
        label: "Status",

        render: (row: Banner) => (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              row.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.isActive
              ? "Active"
              : "Inactive"}
          </span>
        ),
      },
    ],
    []
  );
    return (
    <>
      <div
        className="rounded-3xl p-6 shadow-lg"
        style={{
          background: "var(--background)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Banner Management
            </h1>

            <p
              className="mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              Manage Homepage Promotional Banners
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-white font-semibold transition hover:opacity-90"
            style={{
              background: "var(--footer)",
            }}
          >
            <Plus size={18} />
            Add Banner
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={bannerList}
          loading={loading}
          pageSize={10}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      {/* Modal */}
      <BannerModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        refresh={fetchBanner}
      />
    </>
  );
}