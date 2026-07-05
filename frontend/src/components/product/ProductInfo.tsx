"use client";

import {
  BadgeCheck,
  ShieldCheck,
  Truck,
  PackageCheck,
  ScanBarcode,
  ShoppingCart,
  Zap,
  Tag,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/src/store/cartStore";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/src/lib/image";
import { toast } from "sonner";
export default function ProductInfo({
  product,
  selectedVariant,
}: any) {
  const active = selectedVariant || product;

const isVariant = !!selectedVariant;
  const router = useRouter();

const addToCart = useCartStore(
  (state) => state.addToCart
);

const imageSrc = getImageUrl(
  active.images?.[0] || product.images?.[0]
);

  const discount =
    active?.price > 0
      ? Math.round(
          ((active.price - active.discountedPrice) /
            active.price) *
            100
        )
      : 0;

  return (
    <div className="w-full min-w-0 lg:sticky lg:top-24 space-y-5">

      {/* CATEGORY + TITLE */}

      <div className="min-w-0">

        <div className="flex flex-wrap items-center gap-3">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#28170D] to-[#4a2a1c] text-white shadow-lg">
            <BadgeCheck size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6E23] text-white shadow-lg">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">
              Premium Product
            </span>
          </div>

        </div>

        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight break-words">
  {isVariant ? active.title : product.name}
</h1>

{!isVariant && (
  <p className="text-[#6c5b4f] text-sm md:text-lg mt-3 leading-7 break-words">
    {product.title}
  </p>
)}

        <div className="flex flex-wrap items-center gap-4 mt-5">

          <div
  className={`flex items-center gap-2 text-sm font-semibold ${
    active.quantity > 0
      ? "text-green-700"
      : "text-red-600"
  }`}
>
  <CheckCircle2 size={16} />
  {active.quantity > 0
    ? `In Stock (${active.quantity})`
    : "Out of Stock"}
</div>

          <div className="text-[#6c5b4f] text-sm">
            Ready To Dispatch
          </div>

        </div>

        {(product?.tags?.length > 0 ||
          product?.category) && (
          <div className="flex flex-wrap gap-2 mt-5">

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#fff3e2] border border-[#28170D]/10 text-foreground text-xs font-semibold">
              <Tag size={12} />
              {product.category}
            </div>

            {Array.isArray(product?.tags) &&
              product.tags.map(
                (
                  tag: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#fff3e2] border border-[#28170D]/10 text-foreground text-xs font-semibold hover:border-[#FF6E23] transition-all"
                  >
                    <Tag size={12} />
                    {tag}
                  </div>
                )
              )}
          </div>
        )}

      </div>

      {/* PRICE */}

      <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-[28px] p-6">

        <div className="flex flex-wrap items-center gap-3">

          <span className="text-4xl md:text-6xl font-black text-foreground">
            ₹{active.discountedPrice}
          </span>

          <span className="text-xl md:text-2xl text-[#8f7a68] line-through">
            ₹{active.price}
          </span>

          <span className="bg-footer text-[#FF6E23] px-3 py-2 rounded-full text-sm font-bold">
            {discount}% OFF
          </span>

        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
            Free Shipping
          </span>

          <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            Secure Payment
          </span>

          <span className="px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
            Easy Return
          </span>

        </div>

        <p className="mt-5 text-[#5f5147] leading-7">
          {active.description}
        </p>

      </div>

      {/* SKU */}

      <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-2xl p-4">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-footer flex items-center justify-center text-[#FF6E23]">
            <ScanBarcode size={22} />
          </div>

          <div>

            <p className="text-xs text-[#6f6257] uppercase tracking-wider">
              Product SKU
            </p>

            <p className="font-black text-foreground break-all">
              {product.productSku}
            </p>

          </div>

        </div>

      </div>

      {/* DELIVERY */}

      <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-[28px] p-5 space-y-4">

        <div className="flex gap-4">
          <Truck className="text-[#FF6E23]" />
          <div>
            <h4 className="font-black text-foreground">
              Estimated Delivery
            </h4>
            <p className="text-[#6d5f53]">
              Jun 23 - Jun 27
            </p>
          </div>
        </div>

        <div className="h-px bg-footer/10" />

        <div className="flex gap-4">
          <PackageCheck className="text-[#FF6E23]" />
          <div>
            <h4 className="font-black text-foreground">
              Free Shipping & Replacement
            </h4>
            <p className="text-[#6d5f53]">
              Ships within 24hrs with 7-Day easy replacement.
            </p>
          </div>
        </div>

        <div className="h-px bg-footer/10" />

        <div className="flex gap-4">
          <ShieldCheck className="text-[#FF6E23]" />
          <div>
            <h4 className="font-black text-foreground">
              Secure Checkout
            </h4>
            <p className="text-[#6d5f53]">
              100% secure payments & protected transactions.
            </p>
          </div>
        </div>

      </div>

      {/* BUTTONS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <button
  onClick={() => {
  if ((active.quantity ?? product.quantity) <= 0) {
    toast.error("Product is out of stock");
    return;
  }

  addToCart({
  _id: product._id,

  variant_id: isVariant ? active._id : null,

  isVariant,

  name: isVariant
  ? active.title
  : product.name,

title: isVariant
  ? active.title
  : product.title,

  price: active.discountedPrice,

  originalPrice: active.price,

  image: imageSrc,

  stock: active.quantity,

  quantity: 1,
});

  router.push("/cart");
}}
  className="h-14 md:h-16 rounded-2xl border-2 border-[#28170D] bg-[#fff3e2] text-foreground font-black flex items-center justify-center gap-2 hover:bg-footer hover:text-white transition-all"
>
  <ShoppingCart size={18} />
  Add To Cart
</button>

        <button className="h-14 md:h-16 rounded-2xl bg-footer text-white font-black flex items-center justify-center gap-2 hover:scale-[1.03] hover:shadow-xl transition-all">
          <Zap size={18} />
          Buy Now Securely
        </button>

      </div>

    </div>
  );
}