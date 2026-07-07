"use client";

import ProductImageSection from "@/src/components/admin/product/ProductImageSection";

type ImageType = {
  url: string;
  public_id: string;
};

type Props = {
  images: File[];

  setImages: React.Dispatch<
    React.SetStateAction<File[]>
  >;

  existingImages: ImageType[];

  setExistingImages: React.Dispatch<
    React.SetStateAction<ImageType[]>
  >;
};

export default function ComboImageSection({
  images,
  setImages,
  existingImages,
  setExistingImages,
}: Props) {
  return (
    <ProductImageSection
      images={images}
      setImages={setImages}
      existingImages={existingImages}
      setExistingImages={setExistingImages}
    />
  );
}