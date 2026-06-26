"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import API from "@/src/lib/api";

import ProductForm from "@/src/components/admin/product/ProductForm";
import BackButton from "@/src/components/admin/BackButton";

export default function EditProductPage() {
  const params = useParams();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState<any>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      console.log("PRODUCT ID =>", params.id);

      const res = await API.get(
        `/product/${params.id}`
      );

      console.log(
        "PRODUCT =>",
        res.data.product
      );

      setProduct(
        res.data.product
      );
    } catch (error) {
      console.error("FETCH PRODUCT ERROR =>", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchProduct();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />

        <div>
          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="text-gray-500">
            Update product details
          </p>
        </div>
      </div>

      <ProductForm
        initialData={product}
      />
    </div>
  );
}