"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import DataTable from "@/src/components/admin/DataTable";

interface Product {
  _id: string;
  productSku: string;
  name: string;
  tags: string[];
}

interface ProductTagSelectionTableProps {
  products: Product[];
  loading: boolean;
  tag: string;
  onToggle: (
    productId: string,
    checked: boolean
  ) => void;
}

export default function ProductTagSelectionTable({
  products,
  loading,
  tag,
  onToggle,
}: ProductTagSelectionTableProps) {
  const router = useRouter();

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
      key: "selected",
      label: "Selected",
      render: (row: Product) => {
        const active = row.tags?.includes(tag);

        return (
          <div className="flex justify-center">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) =>
                onToggle(
                  row._id,
                  e.target.checked
                )
              }
              className="h-5 w-5 cursor-pointer accent-[#28170D]"
            />
          </div>
        );
      },
    },
    {
      key: "edit",
      label: "Edit",
      render: (row: Product) => (
        <button
          type="button"
          onClick={() =>
            router.push(
              `/admin/products/${row._id}/edit`
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead9b7] bg-white transition hover:bg-[#fff6e7]"
        >
          <Pencil size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="rounded-2xl bg-white">
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
      />
    </div>
  );
}