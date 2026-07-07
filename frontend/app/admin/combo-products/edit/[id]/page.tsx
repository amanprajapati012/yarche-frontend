"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import API from "@/src/lib/api";
import ComboProductForm from "@/src/components/admin/combo-products/ComboProductForm";

export default function EditComboProductPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/products/${params.id}`
      );

      setProduct(res.data.product);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load combo product");

      router.push("/admin/combo-products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-60 items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Combo Product
        </h1>

        <p className="mt-1 text-gray-500">
          Update combo product details.
        </p>
      </div>

      <ComboProductForm
        initialData={product}
        onSuccess={() =>
          router.push("/admin/combo-products")
        }
      />

    </div>
  );
}