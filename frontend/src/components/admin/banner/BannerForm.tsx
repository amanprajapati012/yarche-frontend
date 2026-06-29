"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import {
  ImagePlus,
  Type,
  Link as LinkIcon,
  AlignLeft,
  FileText,
} from "lucide-react";
import BackButton from "@/src/components/admin/BackButton";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  editData?: any;
  refresh: () => void;
}

export default function BannerForm({
  open,
  setOpen,
  editData,
  refresh,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    caption: "",
    buttonText: "",
    link: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        caption: editData.caption || "",
        buttonText: editData.buttonText || "",
        link: editData.link || "",
      });

      setExistingImages(editData.images || []);
    } else {
      setForm({
        title: "",
        description: "",
        caption: "",
        buttonText: "",
        link: "",
      });

      setImages([]);
      setExistingImages([]);
    }
  }, [editData]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("caption", form.caption);
      fd.append("buttonText", form.buttonText);
      fd.append("link", form.link);

      fd.append("existingImages", JSON.stringify(existingImages));

      images.forEach((file) => {
        fd.append("images", file);
      });

      if (editData?._id) {
        await API.put(`/admin/updatecarousel/${editData._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/admin/carousel", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      refresh();
      setOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-5">

      <div
        className="w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ background: "#fff6e2" }}
      >
        {/* HEADER */}
        <div className="border-b border-[#f2d9a6] px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <BackButton />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
              {editData ? "Update Banner" : "Create Banner"}
            </h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-foreground text-xl"
          >
            ✕
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto flex-1">

          {/* TITLE */}
          <div className="rounded-xl p-3 flex gap-2 items-center bg-surface">
            <Type size={18} />
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Banner Title"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* CAPTION */}
          <div className="rounded-xl p-3 flex gap-2 items-center bg-surface">
            <FileText size={18} />
            <input
              value={form.caption}
              onChange={(e) => handleChange("caption", e.target.value)}
              placeholder="Caption"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* BUTTON */}
          <div className="rounded-xl p-3 flex gap-2 items-center bg-surface">
            <Type size={18} />
            <input
              value={form.buttonText}
              onChange={(e) => handleChange("buttonText", e.target.value)}
              placeholder="Button Text"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* LINK */}
          <div className="rounded-xl p-3 flex gap-2 items-center bg-surface">
            <LinkIcon size={18} />
            <input
              value={form.link}
              onChange={(e) => handleChange("link", e.target.value)}
              placeholder="/shop"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-1 sm:col-span-2 rounded-xl p-3 bg-surface">
            <div className="flex gap-2 mb-2 items-center text-sm">
              <AlignLeft size={18} />
              <span>Description</span>
            </div>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Banner Description"
              className="w-full bg-transparent outline-none resize-none text-sm"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="col-span-1 sm:col-span-2 rounded-xl p-4 bg-surface">
            <label className="flex gap-2 items-center mb-3 text-foreground font-medium text-sm">
              <ImagePlus size={18} />
              Upload Images
            </label>

            <input
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="w-full text-sm"
            />
          </div>

          {/* EXISTING IMAGES */}
          {existingImages.length > 0 && (
            <div className="col-span-1 sm:col-span-2">
              <h3 className="mb-3 font-semibold text-foreground text-sm">
                Existing Images
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {existingImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`http://localhost:5000${img}`}
                      className="w-full h-20 sm:h-28 object-cover rounded-xl border"
                    />

                    <button
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW IMAGES */}
          {images.length > 0 && (
            <div className="col-span-1 sm:col-span-2">
              <h3 className="mb-3 font-semibold text-foreground text-sm">
                New Images
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    className="w-full h-20 sm:h-28 object-cover rounded-xl border"
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="border-t border-[#f2d9a6] p-4 sm:p-5 flex justify-end gap-3 shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-white text-sm"
            style={{ background: "#28170d" }}
          >
            {loading
              ? "Saving..."
              : editData
                ? "Update Banner"
                : "Create Banner"}
          </button>
        </div>
      </div>
    </div>
  );
}