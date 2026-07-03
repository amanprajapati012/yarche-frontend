"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import API from "@/src/lib/api";
import ImageUploader from "./ImageUploader";
import { API_BASE_URL } from "@/src/lib/constants";
import { X } from "lucide-react";
import { compressImage } from "@/src/lib/compressImage";

type Props = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function CategoryForm({ initialData, onSuccess }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  type ExistingImage = {
    url: string;
    public_id: string;
  };

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);

  // ✅ Load edit data safely
  useEffect(() => {
    if (!initialData) return;

    setCategory(initialData.category || "");

    setExistingImages(initialData.images || []);
  }, [initialData]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("category", category);
      if (initialData?._id) {
        formData.append(
          "oldImages",
          JSON.stringify(existingImages)
        );
      }

     for (const file of images) {
  const compressedFile = await compressImage(file);

  console.log(
    "Category Original:",
    (file.size / 1024).toFixed(0),
    "KB"
  );

  console.log(
    "Category Compressed:",
    (compressedFile.size / 1024).toFixed(0),
    "KB"
  );

  formData.append("images", compressedFile);
}

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
              <div
                key={img.public_id || i}
                className="relative group"
              >
                <img
                  src={img.url}
                  alt="category"
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