"use client";

import { Plus } from "lucide-react";

import VariantCard from "./VariantCard";
import { Variant } from "./types";

type ImageType = {
  url: string;
  public_id: string;
};

type Props = {
  variants: Variant[];

  addVariant: () => void;

  updateVariant: (
    index: number,
    variant: Variant
  ) => void;

  removeVariant: (
    index: number
  ) => void;

  variantImages: Record<
    number,
    File[]
  >;

  setVariantImages: React.Dispatch<
    React.SetStateAction<
      Record<number, File[]>
    >
  >;

  existingVariantImages: Record<
  number,
  ImageType[]
>;

setExistingVariantImages: React.Dispatch<
  React.SetStateAction<
    Record<number, ImageType[]>
  >
>;
};

export default function VariantSection({
  variants,

  addVariant,

  updateVariant,

  removeVariant,

  variantImages,
  setVariantImages,

  existingVariantImages,
  setExistingVariantImages,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Product Variants
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage product sizes,
            colors, materials and
            pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={addVariant}
          className="
            flex items-center gap-2
            rounded-xl
            bg-footer
            px-4 py-2.5
            text-white
            transition
            hover:opacity-90
          "
        >
          <Plus size={18} />
          Add Variant
        </button>
      </div>

      {/* Empty State */}

      {variants.length === 0 && (
        <div
          className="
            rounded-xl border-2
            border-dashed
            p-10 text-center
          "
        >
          <h3 className="text-lg font-medium">
            No Variants Added
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Click "Add Variant" to
            create your first
            variant.
          </p>
        </div>
      )}

      {/* Variants */}

      <div className="space-y-6">
        {variants.map(
          (variant, index) => (
            <VariantCard
              key={
                variant._id ||
                index
              }
              index={index}
              variant={variant}
              onChange={(
                updatedVariant
              ) =>
                updateVariant(
                  index,
                  updatedVariant
                )
              }
              onRemove={() =>
                removeVariant(
                  index
                )
              }
              images={
                variantImages[
                  index
                ] || []
              }
              setImages={(
                updater
              ) => {
                setVariantImages(
                  (prev) => ({
                    ...prev,
                    [index]:
                      typeof updater ===
                      "function"
                        ? updater(
                            prev[
                              index
                            ] || []
                          )
                        : updater,
                  })
                );
              }}
              existingImages={
                existingVariantImages[
                  index
                ] || []
              }
              setExistingImages={(
                updater
              ) => {
                setExistingVariantImages(
                  (prev) => ({
                    ...prev,
                    [index]:
                      typeof updater ===
                      "function"
                        ? updater(
                            prev[
                              index
                            ] || []
                          )
                        : updater,
                  })
                );
              }}
            />
          )
        )}
      </div>
    </div>
  );
}