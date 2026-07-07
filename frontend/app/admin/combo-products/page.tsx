"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { getImageUrl } from "@/src/lib/image";

import API from "@/src/lib/api";
import DataTable from "@/src/components/admin/DataTable";
const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/%/g, "percent")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
export default function ComboProductsPage() {
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const res = await API.get("/products");

            const combos = (res.data.products || []).filter(
                (item: any) => item.productType === "combo"
            );

            setProducts(combos);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load combo products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (row: any) => {
        const confirmDelete = window.confirm(
            "Delete this combo product?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/admin/product/${row._id}`);

            toast.success("Combo deleted");

            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    const columns = [
        {
            key: "image",
            label: "Image",
            render: (row: any) => (
                <img
                    src={getImageUrl(row.images?.[0])}
                    alt={row.name}
                    className="h-14 w-14 rounded-lg border object-cover"
                />
            ),
        },

        {
            key: "name",
            label: "Product Name",
        },

        {
            key: "productSku",
            label: "SKU",
        },

        {
            key: "category",
            label: "Category",
        },

        {
            key: "price",
            label: "Price",
            render: (row: any) => `₹${row.price}`,
        },

        {
            key: "items",
            label: "Products",
            render: (row: any) =>
                row.comboProducts?.length || 0,
        },

        {
            key: "createdAt",
            label: "Created",
            render: (row: any) =>
                new Date(row.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Combo Products
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all combo products.
                    </p>
                </div>

                <Link
                    href="/admin/combo-products/create"
                    className="
            flex items-center gap-2
            rounded-xl
            bg-footer
            px-5 py-3
            text-white
            hover:opacity-90
          "
                >
                    <Plus size={18} />
                    Create Combo
                </Link>

            </div>

            <DataTable
                columns={columns}
                data={products}
                loading={loading}
                onEdit={(row) =>
                    router.push(
                        `/admin/combo-products/edit/${row._id}`
                    )
                }
                onDelete={handleDelete}
               onView={(row) =>
    router.push(`/products/${slugify(row.name)}`)
}
            />

        </div>
    );
}