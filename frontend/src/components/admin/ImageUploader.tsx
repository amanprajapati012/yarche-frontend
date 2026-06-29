"use client";

import { Upload, X, ImageIcon } from "lucide-react";
import { useRef } from "react";
import { UPLOADS_BASE_URL } from "@/src/lib/constants";

interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;

  existingImages?: string[];
  setExistingImages?: React.Dispatch<React.SetStateAction<string[]>>;

  label?: string;
}

export default function ImageUploader({
  images,
  setImages,
  existingImages = [],
  setExistingImages,
  label = "Product Images",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ---------------------------
  // HANDLE FILE UPLOAD
  // ---------------------------
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const newFiles = Array.from(files);

    setImages((prev) => [...prev, ...newFiles]);

    // reset input so same file can be selected again
    e.target.value = "";
  };

  // ---------------------------
  // REMOVE NEW IMAGE
  // ---------------------------
  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------------------
  // REMOVE EXISTING IMAGE
  // ---------------------------
  const removeExistingImage = (index: number) => {
    if (!setExistingImages) return;

    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      {/* LABEL */}
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>

      {/* UPLOAD BOX */}
      <div
        onClick={() => inputRef.current?.click()}
        className="
          flex cursor-pointer flex-col items-center justify-center
          rounded-2xl border-2 border-dashed border-[#d8c7a4]
          bg-[#fffaf1] p-10 transition
          hover:border-[#28170D]
        "
      >
        <Upload className="mb-3" size={28} />

        <h3 className="font-medium">Upload Images</h3>

        <p className="mt-1 text-sm text-gray-500">
          PNG, JPG, JPEG, WEBP
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={handleFiles}
        />
      </div>

      {/* ---------------------------
          EXISTING IMAGES
      --------------------------- */}
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Existing Images
          </h4>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
            {existingImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border bg-white"
              >
                <img
                  src={`${UPLOADS_BASE_URL}${image}`}
                  alt="existing"
                  className="h-32 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="
                    absolute right-2 top-2 rounded-full bg-white p-1 shadow
                    opacity-0 transition group-hover:opacity-100
                  "
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------
          NEW IMAGES
      --------------------------- */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            New Images
          </h4>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border bg-white"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="h-32 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="
                    absolute right-2 top-2 rounded-full bg-white p-1 shadow
                    opacity-0 transition group-hover:opacity-100
                  "
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {images.length === 0 && existingImages.length === 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ImageIcon size={16} />
          No images selected
        </div>
      )}
    </div>
  );
}