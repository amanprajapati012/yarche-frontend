"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import API from "@/src/lib/api";
import ImageUploader from "@/src/components/admin/ImageUploader";
import { getImageUrl, ImageType } from "@/src/lib/image";
import { X } from "lucide-react";
import { compressImage } from "@/src/lib/compressImage";

type Props = {
  initialData?: any;
  categories: any[];
  onSuccess?: () => void;
};

type ExistingImage = {
  url: string;
  public_id: string;
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
  

const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);

  useEffect(() => {
  if (!initialData) return;

  setSubCategory(initialData.sub_category || "");
  setCategoryId(initialData.category_id || "");

  setExistingImages(initialData.images || []);
}, [initialData]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

formData.append("sub_category", subCategory);
formData.append("category_id", categoryId);

if (initialData?._id) {
  formData.append(
    "oldImages",
    JSON.stringify(existingImages)
  );
}

// Upload Compressed Images
for (const file of images) {
  const compressedFile = await compressImage(file);

  console.log(
    "Original:",
    (file.size / 1024 / 1024).toFixed(2),
    "MB"
  );

  console.log(
    "Compressed:",
    (compressedFile.size / 1024).toFixed(0),
    "KB"
  );

  formData.append("images", compressedFile);
}

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
  <div
    key={img.public_id || i}
    className="relative group"
  >
    <img
      src={getImageUrl(img)}
      alt="subcategory"
      className="w-20 h-20 object-cover rounded-lg border"
    />

    <button
      type="button"
      onClick={() =>
        setExistingImages((prev) =>
          prev.filter((_, index) => index !== i)
        )
      }
      className="
        absolute
        -top-2
        -right-2
        w-6
        h-6
        rounded-full
        bg-red-500
        text-white
        flex
        items-center
        justify-center
        opacity-0
        group-hover:opacity-100
        transition
      "
    >
      <X size={14} />
    </button>
  </div>
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