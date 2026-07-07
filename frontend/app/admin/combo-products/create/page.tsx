"use client";

import { useRouter } from "next/navigation";
import ComboProductForm from "@/src/components/admin/combo-products/ComboProductForm";

export default function CreateComboProductPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Create Combo Product
        </h1>

        <p className="mt-1 text-gray-500">
          Create a new combo product by combining multiple products.
        </p>
      </div>

      <ComboProductForm
        onSuccess={() =>
          router.push("/admin/combo-products")
        }
      />

    </div>
  );
}