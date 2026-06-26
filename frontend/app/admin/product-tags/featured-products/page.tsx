"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import API from "@/src/lib/api";
import ProductTagSelectionTable from "@/src/components/admin/product-tags/ProductTagSelectionTable";

const TAG = "featured";

export default function FeaturedProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/products"
      );

      const raw =
        res.data?.products || [];

      const formatted = raw.map(
        (item: any) => ({
          _id: item._id,
          productSku:
            item.productSku,
          name: item.name,
          tags:
            item.tags || [],
        })
      );

      setProducts(formatted);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleTag =
    async (
      productId: string,
      checked: boolean
    ) => {
      try {
        await API.patch(
          `/admin/product-tags/${productId}`,
          {
            tag: TAG,
            checked,
          }
        );

        setProducts((prev) =>
          prev.map((product) => {
            if (
              product._id !==
              productId
            )
              return product;

            return {
              ...product,
              tags: checked
                ? [
                    ...product.tags,
                    TAG,
                  ]
                : product.tags.filter(
                    (
                      t: string
                    ) =>
                      t !== TAG
                  ),
            };
          })
        );

        toast.success(
          "Featured Products Updated"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to update"
        );
      }
    };

  const totalSelected =
    products.filter((p) =>
      p.tags?.includes(TAG)
    ).length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#ead9b7] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#28170D]">
              Featured Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Select products to show
              in Featured Products
              section.
            </p>
          </div>

          <div className="rounded-xl bg-[#fff6e7] px-4 py-3">
            <p className="text-xs text-gray-500">
              Selected Products
            </p>

            <p className="text-2xl font-bold text-[#28170D]">
              {totalSelected}
            </p>
          </div>
        </div>
      </div>

      <ProductTagSelectionTable
        products={products}
        loading={loading}
        tag={TAG}
        onToggle={handleToggleTag}
      />
    </div>
  );
}