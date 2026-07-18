"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import API from "@/src/lib/api";
import { ComboProductRef } from "./types";

type Props = {
  products: ComboProductRef[];
  setProducts: (products: ComboProductRef[]) => void;
};

export default function ComboProductsSection({
  products,
  setProducts,
}: Props) {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(""); // "" = base product
  const [selectedQty, setSelectedQty] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      setAllProducts(res.data?.products || []);
    } catch (error) {
      console.error(error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedDbProduct = allProducts.find(
    (p) => p._id === selectedProductId
  );

  const hasVariants = selectedDbProduct?.variants?.length > 0;

  const makeKey = (productId: string, variantId?: string | null) =>
    `${productId}-${variantId || "base"}`;

  const handleAddProduct = () => {
    if (!selectedProductId) return;

    const dbProduct = allProducts.find((p) => p._id === selectedProductId);
    if (!dbProduct) return;

    const key = makeKey(selectedProductId, selectedVariantId || null);

    const alreadyAdded = products.some(
      (p) => makeKey(p.product, p.variantId) === key
    );

    if (alreadyAdded) {
      setSelectedProductId("");
      setSelectedVariantId("");
      setSelectedQty(1);
      return;
    }

    let itemPrice = dbProduct.price;
    let variantTitle: string | undefined;
    let images = dbProduct.images;

    if (selectedVariantId) {
      const variant = dbProduct.variants.find(
        (v: any) => v._id === selectedVariantId
      );

      if (variant) {
        itemPrice = variant.price;
        variantTitle = variant.title;

        if (!variant.useProductImages && variant.images?.length) {
          images = variant.images;
        }
      }
    }

    setProducts([
      ...products,
      {
        product: dbProduct._id,
        variantId: selectedVariantId || null,

        name: dbProduct.name,
        title: dbProduct.title,
        price: itemPrice,
        images,
        variantTitle,

        quantity: selectedQty,
      },
    ]);

    setSelectedProductId("");
    setSelectedVariantId("");
    setSelectedQty(1);
  };

  const handleQuantityChange = (key: string, quantity: number) => {
    setProducts(
      products.map((p) =>
        makeKey(p.product, p.variantId) === key ? { ...p, quantity } : p
      )
    );
  };

  const handleRemoveProduct = (key: string) => {
    setProducts(
      products.filter((p) => makeKey(p.product, p.variantId) !== key)
    );
  };

  const totalPrice = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.quantity || 1),
    0
  );

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Combo Products
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add as many products / variants as you want (minimum 2 required).
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label className="mb-2 block text-sm font-medium">Product</label>

          <select
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
              setSelectedVariantId("");
            }}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          >
            <option value="">
              {loading ? "Loading products..." : "Select Product"}
            </option>

            {allProducts.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (₹{product.price})
              </option>
            ))}
          </select>
        </div>

        {hasVariants && (
          <div className="min-w-[220px] flex-1">
            <label className="mb-2 block text-sm font-medium">Variant</label>

            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
            >
              <option value="">
                Base Product (₹{selectedDbProduct.price})
              </option>

              {selectedDbProduct.variants.map((variant: any) => (
                <option key={variant._id} value={variant._id}>
                  {variant.title} (₹{variant.price})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="w-28">
          <label className="mb-2 block text-sm font-medium">Qty</label>

          <input
            type="number"
            min={1}
            value={selectedQty}
            onChange={(e) => setSelectedQty(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#28170D]"
          />
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          disabled={!selectedProductId}
          className="flex items-center gap-2 rounded-xl bg-footer px-4 py-3 text-white disabled:opacity-50"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {products.length === 0 && (
        <div className="rounded-xl border-2 border-dashed p-10 text-center">
          <h3 className="text-lg font-medium">No Products Added</h3>
          <p className="mt-2 text-sm text-gray-500">
            Add at least 2 products/variants to create this combo.
          </p>
        </div>
      )}

      {products.length > 0 && (
        <div className="space-y-3">
          {products.map((item) => {
            const key = makeKey(item.product, item.variantId);

            return (
              <div
                key={key}
                className="flex items-center justify-between gap-4 rounded-xl border p-4"
              >
                <div className="flex items-center gap-3">
                  {item.images?.[0]?.url && (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  )}

                  <div>
                    <p className="font-medium">
                      {item.name}
                      {item.variantTitle && (
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {item.variantTitle}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(key, Number(e.target.value))
                    }
                    className="w-20 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#28170D]"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(key)}
                    className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end border-t pt-4 text-sm font-medium">
            Total Price (auto-calculated): ₹{totalPrice}
          </div>
        </div>
      )}
    </div>
  );
}