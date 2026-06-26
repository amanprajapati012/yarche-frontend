"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import API from "@/src/lib/api";
import ImageUploader from "./ImageUploader";
import { API_BASE_URL } from "@/src/lib/constants";

type Props = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function CategoryForm({ initialData, onSuccess }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // ✅ Load edit data safely
  useEffect(() => {
    if (!initialData) return;

    setCategory(initialData.category || "");

    const imgs = initialData.images || [];

    const normalizedImages = Array.isArray(imgs)
      ? imgs.map((img: any) =>
          typeof img === "string"
            ? img
            : img?.url || img?.path || ""
        )
      : [];

    setExistingImages(normalizedImages.filter(Boolean));
  }, [initialData]);

  // ✅ FIXED IMAGE URL (IMPORTANT)
  const getImageUrl = (img: string) => {
    if (!img) return "";

    if (img.startsWith("http")) return img;

    return `${API_BASE_URL}${img}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("category", category);

      images.forEach((file) => {
        formData.append("images", file);
      });

      // CREATE
      if (!initialData?._id) {
        await API.post("/admin/productcategory", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Category created successfully 🎉");
      }

      // UPDATE
      else {
        await API.put(
          `/admin/updateproductcategory/${initialData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Category updated successfully 🎉");
      }

      // reset form
      setCategory("");
      setImages([]);
      setExistingImages([]);

      onSuccess?.();

      router.replace("/admin/categories");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6">
      <h2 className="text-2xl font-bold">
        {initialData ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* CATEGORY INPUT */}
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="w-full rounded-xl border p-3"
        />

        {/* EXISTING IMAGES */}
        {existingImages.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                alt="category"
                className="w-16 h-16 object-cover rounded border"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display =
                    "none";
                }}
              />
            ))}
          </div>
        )}

        {/* UPLOAD NEW IMAGES */}
        <ImageUploader images={images} setImages={setImages} />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Category"
            : "Save Category"}
        </button>
      </form>
    </div>
  );
}