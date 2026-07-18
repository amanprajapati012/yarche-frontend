"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCombo, updateCombo } from "@/src/lib/api/combo";

import ComboInfo from "./ComboInfo";
import ComboImageSection from "./ComboImageSection";
import ComboProductsSection from "./ComboProductsSection";

import { ComboFormData, ComboProductRef, ImageType } from "./types";

type Props = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function ComboForm({ initialData, onSuccess }: Props) {
  const router = useRouter();

  const isEdit = !!initialData;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ComboFormData>({
    comboSku: "",
    title: "",
    description: "",

    discountedPrice: 0,
    landingPrice: 0,

    isActive: true,

    products: [],
  });

  const [comboImage, setComboImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<ImageType | null>(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      comboSku: initialData.comboSku || "",
      title: initialData.title || "",
      description: initialData.description || "",

      discountedPrice: initialData.discountedPrice || 0,
      landingPrice: initialData.landingPrice || 0,

      isActive: initialData.isActive ?? true,

      products: (initialData.products || []).map(
        (item: any): ComboProductRef => {
          const dbProduct = item.product; // populated product object

          const variant = item.variantId
            ? dbProduct?.variants?.find(
                (v: any) => v._id === item.variantId
              )
            : null;

          return {
            product: dbProduct?._id || item.product,
            variantId: item.variantId || null,

            name: dbProduct?.name,
            title: dbProduct?.title,
            price: variant ? variant.price : dbProduct?.price,
            images: variant?.images?.length
              ? variant.images
              : dbProduct?.images,
            variantTitle: variant?.title,

            quantity: item.quantity || 1,
          };
        }
      ),
    });

    setExistingImage(initialData.image || null);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.products.length < 2) {
      toast.error("Combo must contain at least 2 products.");
      return;
    }

    if (!isEdit && !comboImage) {
      toast.error("Combo image is required.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        comboSku: formData.comboSku,
        title: formData.title,
        description: formData.description,

        products: formData.products.map((p) => ({
          product: p.product,
          variantId: p.variantId || null,
          quantity: p.quantity,
        })),

        discountedPrice: formData.discountedPrice,
        landingPrice: formData.landingPrice,

        image: comboImage,
      };

      if (isEdit) {
        await updateCombo(initialData._id, payload as any);
        toast.success("Combo updated successfully");
      } else {
        await createCombo(payload as any);
        toast.success("Combo created successfully");
      }

      onSuccess?.();

      router.push("/admin/combos");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ComboInfo formData={formData} setFormData={setFormData} />

      <ComboImageSection
        image={comboImage}
        setImage={setComboImage}
        existingImage={existingImage}
      />

      <ComboProductsSection
        products={formData.products}
        setProducts={(products) =>
          setFormData((prev) => ({ ...prev, products }))
        }
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-footer
            px-6 py-3
            text-white
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : isEdit ? "Update Combo" : "Create Combo"}
        </button>
      </div>
    </form>
  );
}