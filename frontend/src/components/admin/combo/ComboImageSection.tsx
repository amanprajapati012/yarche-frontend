"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { ImageType } from "./types";

type Props = {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  existingImage: ImageType | null;
};

export default function ComboImageSection({
  image,
  setImage,
  existingImage,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const displayUrl = preview || existingImage?.url;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Combo Image
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload a cover image for this combo.
        </p>
      </div>

      {displayUrl ? (
        <div className="w-48">
          <div className="relative">
            <img
              src={displayUrl}
              alt="Combo"
              className="h-48 w-48 rounded-xl border object-cover"
            />

            {preview && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">
            <Upload size={14} />
            Replace Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <label className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-gray-400 hover:bg-gray-50">
          <Upload size={24} />
          <span className="text-sm">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}