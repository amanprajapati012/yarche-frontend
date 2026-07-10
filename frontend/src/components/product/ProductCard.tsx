"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


import { getImageUrl } from "@/src/lib/image";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/%/g, "percent")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ProductCard({ product }: any) {
  const router = useRouter();
  const discount =
    product.price > 0
      ? Math.round(
        ((product.price - product.discountedPrice) /
          product.price) *
        100
      )
      : 0;

  // ✅ SAFE IMAGE HANDLER (IMPORTANT)


  const imageSrc = getImageUrl(product.images?.[0]);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <Link
      href={`/products/${slugify(product.name)}`}
      className="group flex flex-col h-full bg-surface rounded-[28px] overflow-hidden border border-[#e6d8bc] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* IMAGE */}
     {/* IMAGE */}
<div className="relative aspect-square w-full p-3 overflow-hidden">
  <div className="w-full h-full rounded-2xl overflow-hidden">
    <img
      src={imageSrc}
      alt={product.name}
      className="
        w-full
        h-full
        object-cover
        group-hover:scale-105
        transition-transform
        duration-500
      "
    />
  </div>

  {discount > 0 && (
    <div className="absolute top-5 left-5 bg-[#2d1a10] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
      {discount}% OFF
    </div>
  )}
</div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-4 sm:px-5 pb-5">
        <p className="text-[11px] uppercase tracking-[2.5px] text-[#8A7B47] font-bold mb-2">
          {product.sub_category}
        </p>

        <h3 className="text-xl font-bold text-[#3F2A1D] leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="mt-1 text-[15px] text-[#74685A] line-clamp-1">
          {product.title}
        </p>

        {/* PRICE */}
        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-end gap-1 flex-wrap">
              <span className="text-xl sm:text-3xl font-extrabold text-[#2D1A10] leading-none">
                ₹{product.discountedPrice}
              </span>

              {product.price > product.discountedPrice && (
                <span className="text-xs sm:text-base text-[#8A8175] line-through mb-1">
                  ₹{product.price}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

              if (product.quantity <= 0) {
                toast.error("Product is out of stock");
                return;
              }

             addToCart({
  _id: product._id,

  variant_id: null,
  isVariant: false,

  name: product.name,

  // Simple product hai, isliye variant title nahi hoga
  title: "",

  price: product.discountedPrice,
  originalPrice: product.price,

  image: imageSrc,

  stock: product.quantity,

  quantity: 1,
});
              router.push("/cart");
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#3B281C] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {/* STOCK STATUS */}
        <div className="mt-2 h-5">
          {product.quantity <= 0 ? (
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              Out of Stock
            </div>
          ) : product.quantity <= 3 ? (
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Hurry! Only {product.quantity} left
            </div>
          ) : product.quantity <= 10 ? (
            <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              Low Stock ({product.quantity} remaining)
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </Link>
  );
}