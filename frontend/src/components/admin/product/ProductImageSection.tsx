"use client";

import ImageUploader from "@/src/components/admin/ImageUploader";

export type ExistingImage = {
  url: string;
  public_id: string;
};

type Props = {
  images: File[];
  setImages: React.Dispatch<
    React.SetStateAction<File[]>
  >;

  existingImages: ExistingImage[];
  setExistingImages: React.Dispatch<
    React.SetStateAction<ExistingImage[]>
  >;
};

export default function ProductImageSection({
  images,
  setImages,
  existingImages,
  setExistingImages,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Product Images
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload product gallery images.
        </p>
      </div>

      <ImageUploader
        label="Product Images"
        images={images}
        setImages={setImages}
        existingImages={existingImages}
        setExistingImages={setExistingImages}
      />
    </div>
  );
}