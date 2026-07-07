"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import API from "@/src/lib/api";
import { compressImage } from "@/src/lib/compressImage";

import ComboInfo from "./ComboInfo";
import ComboSection from "./ComboSection";
import ComboImageSection from "./ComboImageSection";

import {
  ComboFormData,
  ImageType,
  ProductItem,
} from "./types";

type Props = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function ComboProductForm({
  initialData,
  onSuccess,
}: Props) {
  const router = useRouter();

  const isEdit = !!initialData;

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState<ProductItem[]>([]);
    // Combo Product Images

const [images, setImages] = useState<File[]>([]);

const [existingImages, setExistingImages] = useState<
  {
    url: string;
    public_id: string;
  }[]
>([]);

  const [formData, setFormData] =
    useState<ComboFormData>({
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

      productType: "combo",

      comboProducts: [],

      tags: [],
    });

  // Product Images

  const [
    productImages,
    setProductImages,
  ] = useState<File[]>([]);

  const [
    existingProductImages,
    setExistingProductImages,
  ] = useState<ImageType[]>([]);

  // ==========================
  // Fetch Products
  // ==========================

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        "/products"
      );

      const data =
        res.data.products || [];

      setProducts(
        data.filter(
          (item: any) =>
            item.productType ===
              "single" &&
            item._id !==
              initialData?._id
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================
  // Edit Data
  // ==========================

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      productSku:
        initialData.productSku ||
        "",

      name:
        initialData.name || "",

      title:
        initialData.title || "",

      description:
        initialData.description ||
        "",

      full_description:
        initialData.full_description ||
        "",

      category:
        initialData.category ||
        "",

      sub_category:
        initialData.sub_category ||
        "",

      price:
        initialData.price || 0,

      discountedPrice:
        initialData.discountedPrice ||
        0,

      landingPrice:
        initialData.landingPrice ||
        0,

      quantity:
        initialData.quantity || 0,

      productType: "combo",

      comboProducts:
        initialData.comboProducts ||
        [],

      tags:
        initialData.tags || [],
    });

    setExistingProductImages(
      initialData.images || []
    );
  }, [initialData]);

    // ==========================
  // Submit
  // ==========================

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

      fd.append(
        "productType",
        "combo"
      );

      fd.append(
        "comboProducts",
        JSON.stringify(
          formData.comboProducts
        )
      );

      fd.append(
        "tags",
        JSON.stringify(formData.tags)
      );

      if (isEdit) {
        fd.append(
          "oldImages",
          JSON.stringify(
            existingProductImages
          )
        );
      }

      // ==========================
      // Upload Images
      // ==========================

      for (const file of productImages) {
        const compressedFile =
          await compressImage(file);

        fd.append(
          "productImages",
          compressedFile
        );
      }

      // ==========================
      // Debug
      // ==========================

      console.log(
        "Combo FormData"
      );

      for (const pair of fd.entries()) {
        console.log(
          pair[0],
          pair[1]
        );
      }

      // ==========================
      // API
      // ==========================

      if (isEdit) {
        await API.put(
          `/admin/updateproduct/${initialData._id}`,
          fd
        );

        toast.success(
          "Combo updated successfully"
        );
      } else {
        await API.post(
          "/admin/product",
          fd
        );

        toast.success(
          "Combo created successfully"
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
    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <ComboInfo
        formData={formData}
        setFormData={setFormData}
      />

      <ComboImageSection
        images={images}
        setImages={setImages}
        existingImages={existingImages}
        setExistingImages={setExistingImages}
      />

      <ComboSection
        products={products}
        comboProducts={formData.comboProducts}
        setComboProducts={(updater) =>
          setFormData((prev) => ({
            ...prev,
            comboProducts:
              typeof updater === "function"
                ? updater(prev.comboProducts)
                : updater,
          }))
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
            ? "Update Combo"
            : "Create Combo"}
        </button>
      </div>
    </form>
  );
}
