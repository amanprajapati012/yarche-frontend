"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { X, Tag, Link2, FileText, Hash, Star, Eye } from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "@/src/components/admin/ImageUploader";

export default function CollectionForm({
  open,
  setOpen,
  editData,
  refresh,
}: any) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
    isFeatured: false,
    sortOrder: 0,
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // ---------------- EDIT MODE ----------------
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        slug: editData.slug || "",
        description: editData.description || "",
        isActive: Boolean(editData.isActive),
        isFeatured: Boolean(editData.isFeatured),
        sortOrder: Number(editData.sortOrder || 0),
      });

      setExistingImages(editData.images || []);
    }
  }, [editData]);

  // ---------------- SLUG GENERATOR ----------------
  const handleName = (value: string) => {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    setForm((prev) => ({
      ...prev,
      name: value,
      slug,
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.slug) {
        toast.error("Name & Slug required");
        return;
      }

      const data = new FormData();

      data.append("name", form.name);
      data.append("slug", form.slug);
      data.append("description", form.description);
      data.append("isActive", String(form.isActive));
      data.append("isFeatured", String(form.isFeatured));
      data.append("sortOrder", String(form.sortOrder));

      // new images
      images.forEach((img) => {
        data.append("images", img);
      });

      // existing images (for edit)
      data.append("existingImages", JSON.stringify(existingImages));

      if (editData) {
        await API.put(`/admin/collection/${editData._id}`, data);
        toast.success("Collection updated");
      } else {
        await API.post(`/admin/collection`, data);
        toast.success("Collection created");
      }

      refresh();
      setOpen(false);
    } catch (err: any) {
      console.log(err?.response?.data);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      {/* MODAL */}
      <div className="w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 space-y-5"
        style={{ backgroundColor: "#fff6e2" }}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#28170D]">
            <Tag size={18} />
            {editData ? "Edit Collection" : "Create Collection"}
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full hover:bg-white/40"
          >
            <X />
          </button>
        </div>

        {/* IMAGE UPLOADER */}
        <div className="bg-white/40 p-4 rounded-xl">
          <ImageUploader
            images={images}
            setImages={setImages}
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            label="Collection Images"
          />
        </div>

        {/* NAME */}
        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-1">
            <Tag size={14} /> Name
          </label>

          <input
            value={form.name}
            onChange={(e) => handleName(e.target.value)}
            placeholder="Collection Name"
            className="w-full p-3 rounded-lg outline-none"
            style={{ backgroundColor: "#fff0d3" }}
          />
        </div>

        {/* SLUG */}
        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-1">
            <Link2 size={14} /> Slug
          </label>

          <input
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            placeholder="collection-slug"
            className="w-full p-3 rounded-lg outline-none"
            style={{ backgroundColor: "#fff0d3" }}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-1">
            <FileText size={14} /> Description
          </label>

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Write description..."
            className="w-full p-3 rounded-lg outline-none min-h-[100px]"
            style={{ backgroundColor: "#fff0d3" }}
          />
        </div>

        {/* SORT ORDER */}
        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-1">
            <Hash size={14} /> Sort Order
          </label>

          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: Number(e.target.value) })
            }
            className="w-full p-3 rounded-lg outline-none"
            style={{ backgroundColor: "#fff0d3" }}
          />
        </div>

        {/* TOGGLES */}
        <div className="flex gap-6 text-sm">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            <Eye size={14} /> Active
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({ ...form, isFeatured: e.target.checked })
              }
            />
            <Star size={14} /> Featured
          </label>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-medium transition hover:opacity-90"
          style={{ backgroundColor: "#28170D", color: "white" }}
        >
          {editData ? "Update Collection" : "Create Collection"}
        </button>
      </div>
    </div>
  );
}