"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import API from "@/src/lib/api";
import ImageUploader from "@/src/components/admin/ImageUploader";
import { API_BASE_URL } from "@/src/lib/constants";

type Props = {
  initialData?: any;
  categories: any[];
  onSuccess?: () => void;
};

export default function SubCategoryForm({
  initialData,
  categories,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [subCategory, setSubCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (!initialData) return;

    setSubCategory(initialData.sub_category || "");
    setCategoryId(initialData.category_id || "");

    const imgs = initialData.images || [];

    setExistingImages(
      Array.isArray(imgs)
        ? imgs.map((img: any) =>
            typeof img === "string"
              ? img
              : img?.url || img?.path || ""
          )
        : []
    );
  }, [initialData]);

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
      formData.append("sub_category", subCategory);
      formData.append("category_id", categoryId);

      images.forEach((file) => {
        formData.append("images", file);
      });

      if (!initialData?._id) {
        await API.post("/admin/productsubcategory", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Sub Category created 🎉");
      } else {
        await API.put(
          `/admin/updateproductsubcategory/${initialData._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        toast.success("Sub Category updated 🎉");
      }

      setSubCategory("");
      setCategoryId("");
      setImages([]);
      setExistingImages([]);

      onSuccess?.();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-6">
      <h2 className="text-2xl font-bold">
        {initialData ? "Edit Sub Category" : "Add Sub Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* NAME */}
        <input
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          placeholder="Sub category name"
          className="w-full rounded-xl border p-3"
        />

        {/* CATEGORY DROPDOWN */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option value="">Select Category</option>
          {categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>

        {/* EXISTING IMAGES */}
        {existingImages.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                className="w-16 h-16 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {/* UPLOAD */}
        <ImageUploader images={images} setImages={setImages} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Sub Category"
            : "Save Sub Category"}
        </button>
      </form>
    </div>
  );
}