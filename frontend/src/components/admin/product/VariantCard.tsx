"use client";

import { Trash2 } from "lucide-react";

import ImageUploader from "@/src/components/admin/ImageUploader";
import { Variant } from "./types";

type Props = {
  index: number;

  variant: Variant;

  onChange: (
    variant: Variant
  ) => void;

  onRemove: () => void;

  images: File[];
  setImages: React.Dispatch<
    React.SetStateAction<File[]>
  >;

  existingImages: string[];
  setExistingImages: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function VariantCard({
  index,
  variant,
  onChange,
  onRemove,

  images,
  setImages,

  existingImages,
  setExistingImages,
}: Props) {
  const updateField = (
    field: keyof Variant,
    value: any
  ) => {
    onChange({
      ...variant,
      [field]: value,
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#28170D]">
          Variant #{index + 1}
        </h3>

        <button
          type="button"
          onClick={onRemove}
          className="
            flex items-center gap-2
            rounded-lg
            bg-red-50
            px-3 py-2
            text-red-600
            hover:bg-red-100
          "
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>

      {/* Fields */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Variant Title *
          </label>

          <input
            type="text"
            value={variant.title}
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
            placeholder="Wooden / Glass / Metal"
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity *
          </label>

          <input
            type="number"
            min={0}
            value={variant.quantity}
            onChange={(e) =>
              updateField(
                "quantity",
                Number(e.target.value)
              )
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Price *
          </label>

          <input
            type="number"
            min={0}
            value={variant.price}
            onChange={(e) =>
              updateField(
                "price",
                Number(e.target.value)
              )
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Discounted Price
          </label>

          <input
            type="number"
            min={0}
            value={variant.discountedPrice}
            onChange={(e) =>
              updateField(
                "discountedPrice",
                Number(e.target.value)
              )
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Landing Price
          </label>

          <input
            type="number"
            min={0}
            value={variant.landingPrice}
            onChange={(e) =>
              updateField(
                "landingPrice",
                Number(e.target.value)
              )
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              outline-none
              focus:ring-2
              focus:ring-[#28170D]
            "
          />
        </div>
      </div>

      {/* Description */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Variant Description
        </label>

        <textarea
          rows={4}
          value={variant.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
          placeholder="Variant Description"
          className="
            w-full rounded-xl border
            px-4 py-3
            outline-none
            focus:ring-2
            focus:ring-[#28170D]
          "
        />
      </div>

      <div className="mt-6">
  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={
        variant.useProductImages ?? true
      }
      onChange={(e) =>
        updateField(
          "useProductImages",
          e.target.checked
        )
      }
    />

    <span className="text-sm font-medium">
      Use Product Images
    </span>
  </label>

  <p className="mt-1 text-xs text-gray-500">
    If checked, this variant will
    automatically use product images.
  </p>
</div>

      {/* Images */}

      {!variant.useProductImages && (
  <div className="mt-8">
    <ImageUploader
      label={`Variant ${index + 1} Images`}
      images={images}
      setImages={setImages}
      existingImages={existingImages}
      setExistingImages={
        setExistingImages
      }
    />
  </div>
)}
    </div>
  );
}