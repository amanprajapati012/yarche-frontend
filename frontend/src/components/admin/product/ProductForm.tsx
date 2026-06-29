"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import API from "@/src/lib/api";

import ProductInfo from "./ProductInfo";
import ProductImageSection from "./ProductImageSection";
import VariantSection from "./VariantSection";

import { ProductFormData, Variant } from "./types";

type Props = {
  initialData?: any;
  onSuccess?: () => void;
};

const createEmptyVariant = (): Variant => ({
  title: "",

  price: 0,
  discountedPrice: 0,
  landingPrice: 0,

  quantity: 0,

  description: "",

  images: [],

  useProductImages: true,
});

export default function ProductForm({
  initialData,
  onSuccess,
}: Props) {
  const router = useRouter();

  const isEdit = !!initialData;

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState<ProductFormData>({
      productSku: "",

      name: "",
      title: "",

      description: "",
      full_description: "",

      category: "",
      sub_category: "",

      price: 0,
      discountedPrice: 0,
      landingPrice: 0,

      quantity: 0,

      variants: [],
    });

  // Product Images

  const [
    productImages,
    setProductImages,
  ] = useState<File[]>([]);

  const [
    existingProductImages,
    setExistingProductImages,
  ] = useState<string[]>([]);

  // Variant Images

  const [
    variantImages,
    setVariantImages,
  ] = useState<Record<number, File[]>>(
    {}
  );

  const [
    existingVariantImages,
    setExistingVariantImages,
  ] = useState<
    Record<number, string[]>
  >({});

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      productSku: initialData.productSku || "",

      name: initialData.name || "",
      title: initialData.title || "",

      description: initialData.description || "",
      full_description:
        initialData.full_description || "",

      category: initialData.category || "",
      sub_category:
        initialData.sub_category || "",

      price: initialData.price || 0,
      discountedPrice:
        initialData.discountedPrice || 0,
      landingPrice:
        initialData.landingPrice || 0,

      quantity: initialData.quantity || 0,

      variants:
        initialData.variants?.map((v: any) => ({
          ...v,
          useProductImages:
            v.useProductImages ?? true,
        })) || [],
    });

    setExistingProductImages(
      initialData.images || []
    );

    const variantImageMap: Record<
      number,
      string[]
    > = {};

    (
      initialData.variants || []
    ).forEach(
      (
        variant: any,
        index: number
      ) => {
        variantImageMap[index] =
          variant.images || [];
      }
    );

    setExistingVariantImages(
      variantImageMap
    );
  }, [initialData]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();

      fd.append(
        "productSku",
        formData.productSku
      );

      fd.append("name", formData.name);

      fd.append(
        "title",
        formData.title
      );

      fd.append(
        "description",
        formData.description
      );

      fd.append(
        "full_description",
        formData.full_description
      );

      fd.append(
        "category",
        formData.category
      );

      fd.append(
        "sub_category",
        formData.sub_category
      );
      fd.append(
        "price",
        String(formData.price)
      );

      fd.append(
        "discountedPrice",
        String(formData.discountedPrice)
      );

      fd.append(
        "landingPrice",
        String(formData.landingPrice)
      );

      fd.append(
        "quantity",
        String(formData.quantity)
      );

      const variantsPayload = formData.variants.map((variant, index) => ({
        ...variant,
        images: existingVariantImages[index] || [],
      }));

      fd.append("variants", JSON.stringify(variantsPayload));

      if (isEdit) {
        fd.append(
          "oldImages",
          JSON.stringify(
            existingProductImages
          )
        );
      }

      // Product Images

      productImages.forEach(
        (file) => {
          fd.append(
            "productImages",
            file
          );
        }
      );

      // Variant Images

      Object.entries(variantImages).forEach(
        ([index, files]) => {
          files.forEach((file) => {
            fd.append(
              `variantImages_${index}`,
              file
            );
          });
        }
      );

      // ===== DEBUG START =====

      console.log("PRODUCT IMAGES STATE");
      console.log(productImages);

      console.log("VARIANT IMAGES STATE");
      console.log(variantImages);

      console.log("FORMDATA CONTENT");

      for (const pair of fd.entries()) {
        console.log(pair[0], pair[1]);
      }

      // ===== DEBUG END =====


      if (isEdit) {
        await API.put(
          `/admin/updateproduct/${initialData._id}`,
          fd
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await API.post(
          "/admin/product",
          fd
        );

        toast.success(
          "Product created successfully"
        );
      }

      onSuccess?.();

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        createEmptyVariant(),
      ],
    }));
  };

  const updateVariant = (
    index: number,
    updatedVariant: Variant
  ) => {
    setFormData((prev) => {
      const variants = [
        ...prev.variants,
      ];

      variants[index] =
        updatedVariant;

      return {
        ...prev,
        variants,
      };
    });
  };

  const removeVariant = (
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants:
        prev.variants.filter(
          (_, i) =>
            i !== index
        ),
    }));

    setVariantImages((prev) => {
      const copy = { ...prev };

      delete copy[index];

      return copy;
    });

    setExistingVariantImages(
      (prev) => {
        const copy = { ...prev };

        delete copy[index];

        return copy;
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <ProductInfo
        formData={formData}
        setFormData={setFormData}
      />

      <ProductImageSection
        images={productImages}
        setImages={
          setProductImages
        }
        existingImages={
          existingProductImages
        }
        setExistingImages={
          setExistingProductImages
        }
      />

      <VariantSection
        variants={
          formData.variants
        }
        addVariant={
          addVariant
        }
        updateVariant={
          updateVariant
        }
        removeVariant={
          removeVariant
        }
        variantImages={
          variantImages
        }
        setVariantImages={
          setVariantImages
        }
        existingVariantImages={
          existingVariantImages
        }
        setExistingVariantImages={
          setExistingVariantImages
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
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
}