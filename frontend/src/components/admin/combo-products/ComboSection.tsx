"use client";

import { Plus, Trash2 } from "lucide-react";
import { ComboProduct, ProductItem } from "./types";

type Props = {
  products: ProductItem[];

  comboProducts: ComboProduct[];

  setComboProducts: React.Dispatch<
    React.SetStateAction<ComboProduct[]>
  >;
};

export default function ComboSection({
  products,
  comboProducts,
  setComboProducts,
}: Props) {
  const addComboProduct = () => {
    setComboProducts((prev) => [
      ...prev,
      {
        product: "",
        variantId: null,
        quantity: 1,
      },
    ]);
  };

  const removeComboProduct = (index: number) => {
    setComboProducts((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateCombo = (
    index: number,
    key: keyof ComboProduct,
    value: any
  ) => {
    setComboProducts((prev) => {
      const copy = [...prev];

      copy[index] = {
        ...copy[index],
        [key]: value,
      };

      if (key === "product") {
        copy[index].variantId = null;
      }

      return copy;
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Combo Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Select products included in this combo.
          </p>
        </div>

        <button
          type="button"
          onClick={addComboProduct}
          className="flex items-center gap-2 rounded-xl bg-footer px-4 py-2.5 text-white hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {comboProducts.length === 0 && (
        <div className="rounded-xl border-2 border-dashed p-10 text-center">
          <h3 className="font-semibold text-lg">
            No Products Added
          </h3>

          <p className="text-gray-500 mt-2">
            Click Add Product to build your combo.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {comboProducts.map((combo, index) => {
          const selectedProduct =
            products.find(
              (p) => p._id === combo.product
            );

          return (
            <div
              key={index}
              className="rounded-xl border p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">
                  Product #{index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    removeComboProduct(index)
                  }
                  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {/* Product */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Product
                  </label>

                  <select
                    value={combo.product}
                    onChange={(e) =>
                      updateCombo(
                        index,
                        "product",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option value="">
                      Select Product
                    </option>

                    {products.map((product) => (
                      <option
                        key={product._id}
                        value={product._id}
                      >
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Variant */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Variant
                  </label>

                  <select
                    value={
                      combo.variantId || ""
                    }
                    disabled={
                      !selectedProduct
                    }
                    onChange={(e) =>
                      updateCombo(
                        index,
                        "variantId",
                        e.target.value ||
                          null
                      )
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  >
                    <option value="">
                      Default Product
                    </option>

                    {selectedProduct?.variants.map(
                      (variant) => (
                        <option
                          key={variant._id}
                          value={variant._id}
                        >
                          {variant.title}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Quantity */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={combo.quantity}
                    onChange={(e) =>
                      updateCombo(
                        index,
                        "quantity",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>
              </div>

              {selectedProduct && (
                <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                  Selected Product :
                  <span className="ml-2 font-medium text-black">
                    {selectedProduct.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}