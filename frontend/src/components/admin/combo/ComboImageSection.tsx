"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { ImageType } from "./types";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  existingImages: ImageType[];
  onRemoveExisting: (publicId: string) => void;
};

export default function ComboImageSection({
  images,
  setImages,
  existingImages,
  onRemoveExisting,
}: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (images.length === 0) {
      setPreviews([]);
      return;
    }

    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }

    // same file dobara select karne dene ke liye reset kar do
    e.target.value = "";
  };

  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCount = existingImages.length + images.length;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Combo Images
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload one or more images for this combo.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Existing images (already uploaded, edit mode) */}
        {existingImages.map((img) => (
          <div key={img.public_id} className="relative">
            <img
              src={img.url}
              alt="Combo"
              className="h-32 w-32 rounded-xl border object-cover"
            />

            <button
              type="button"
              onClick={() => onRemoveExisting(img.public_id)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Newly selected images (not uploaded yet) */}
        {previews.map((url, i) => (
          <div key={url} className="relative">
            <img
              src={url}
              alt="New combo"
              className="h-32 w-32 rounded-xl border object-cover"
            />

            <button
              type="button"
              onClick={() => removeNewImage(i)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Add more button */}
        <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-gray-400 hover:bg-gray-50">
          <Upload size={22} />
          <span className="text-xs">Add Image</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {totalCount === 0 && (
        <p className="mt-3 text-sm text-red-500">
          At least one image is required.
        </p>
      )}
    </div>
  );
}
