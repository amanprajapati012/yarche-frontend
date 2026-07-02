"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/src/components/admin/DataTable";
import API from "@/src/lib/api";
import { toast } from "sonner";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      key: "productSku",
      label: "SKU",
    },
    {
      key: "name",
      label: "Product Name",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "sub_category",
      label: "Sub Category",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "discountedPrice",
      label: "Discount Price",
    },
    {
      key: "landingPrice",
      label: "Landing Price",
    },
    {
      key: "quantity",
      label: "Stock",
    },
    {
      key: "variantsCount",
      label: "Variants",
    },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      console.log("PRODUCTS RESPONSE =>", res.data);

      const rawProducts = res.data?.products || [];

      const formattedProducts = rawProducts.map((product: any) => {
        return {
          _id: product._id,
          productSku: product.productSku,
          name: product.name,
          category: product.category,
          sub_category: product.sub_category,

          price: product.price,
          discountedPrice: product.discountedPrice,
          landingPrice: product.landingPrice,

          quantity: product.quantity,

          // ✅ THIS IS THE MAIN CHANGE
          variantsCount: product.variants?.length || 0,
        };
      });

      setProducts(formattedProducts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (row: any) => {
    toast(`Delete "${row.name}" ?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await API.delete(`/admin/deleteproduct/${row._id}`);

            setProducts((prev) =>
              prev.filter((item) => item._id !== row._id)
            );

            toast.success("Product deleted successfully");
          } catch (error) {
            toast.error("Failed to delete product");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all products
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/products/create")}
          className="
            rounded-xl
            bg-footer
            px-5 py-3
            text-white
            transition
            hover:opacity-90
          "
        >
          Add Product
        </button>
      </div>

      <div className="rounded-2xl border border-[#E7D6B4] bg-white p-6">
        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading products...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={products}
            onEdit={(row) =>
              router.push(`/admin/products/${row._id}/edit`)
            }
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}