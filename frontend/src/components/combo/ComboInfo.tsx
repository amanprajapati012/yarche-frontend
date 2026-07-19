"use client";

import {
  BadgeCheck,
  ShieldCheck,
  Truck,
  PackageCheck,
  ScanBarcode,
  ShoppingCart,
  Zap,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCartStore } from "@/src/store/cartStore";
import { getImageUrl } from "@/src/lib/image";
import { getComboAvailableStock } from "@/src/lib/comboStock";

export default function ComboInfo({ combo }: any) {
  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);

  const imageSrc = getImageUrl(combo.image);

  const availableStock = getComboAvailableStock(combo);

  const discount =
    combo.price > 0
      ? Math.round(
          ((combo.price - combo.discountedPrice) / combo.price) * 100
        )
      : 0;

  return (
    <div className="w-full min-w-0 lg:sticky lg:top-24 space-y-5">
      {/* BADGES + TITLE */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#28170D] to-[#4a2a1c] text-white shadow-lg">
            <Layers size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Combo Deal
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6E23] text-white shadow-lg">
            <BadgeCheck size={14} />
            <span className="text-xs font-bold">
              {combo.products?.length || 0} Products Included
            </span>
          </div>
        </div>

        <h1 className="mt-5 text-2xl sm:text-3xl md:text- font-black text-foreground leading-tight break-words">
          {combo.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-5">
          <div
            className={`flex items-center gap-2 text-sm font-semibold ${
              availableStock > 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            <CheckCircle2 size={16} />
            {availableStock > 0
              ? `In Stock (${availableStock} combo${
                  availableStock > 1 ? "s" : ""
                } available)`
              : "Out of Stock"}
          </div>
        </div>
      </div>

      {/* PRICE */}
      <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-2xl md:rounded-[28px] p-4 sm:p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground">
            ₹{combo.discountedPrice}
          </span>

          {combo.price > combo.discountedPrice && (
            <span className="text-lg sm:text-xl md:text-2xl text-[#8f7a68] line-through">
              ₹{combo.price}
            </span>
          )}

          {discount > 0 && (
            <span className="bg-footer text-[#FF6E23] px-3 py-2 rounded-full text-sm font-bold">
              {discount}% OFF
            </span>
          )}
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

        <p className="mt-5 text-[#5f5147] leading-7">{combo.description}</p>
      </div>

      {/* BUTTONS */}
      <div className=" grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 gap-4 -mt-1">
        <button
          onClick={() => {
            if (availableStock <= 0) {
              toast.error("Combo is out of stock");
              return;
            }

            addToCart({
              _id: combo._id,
              type: "combo",

              variant_id: null,
              isVariant: false,

              name: combo.title,
              title: "",

              price: combo.discountedPrice,
              originalPrice: combo.price,

              image: imageSrc,

              stock: availableStock,

              quantity: 1,
            });

            router.push("/cart");
          }}
          className="h-12 sm:h-14 md:h-16 rounded-2xl border-2 border-[#28170D] bg-[#fff3e2] text-foreground font-black flex items-center justify-center gap-2 hover:bg-footer hover:text-white transition-all"
        >
          <ShoppingCart size={18} />
          Add To Cart
        </button>

        <button className="h-14 md:h-16 rounded-2xl bg-footer text-white font-black flex items-center justify-center gap-2 hover:scale-[1.03] hover:shadow-xl transition-all">
          <Zap size={18} />
          Buy Now Securely
        </button>
      </div>

      {/* SKU */}
      <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-footer flex items-center justify-center text-[#FF6E23]">
            <ScanBarcode size={22} />
          </div>

          <div>
            <p className="text-xs text-[#6f6257] uppercase tracking-wider">
              Combo SKU
            </p>
            <p className="font-black text-foreground break-all">
              {combo.comboSku}
            </p>
          </div>
        </div>
      </div>

      {/* DELIVERY */}
      <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-2xl md:rounded-[28px] p-4 sm:p-5 space-y-4">
        <div className="flex gap-4">
          <Truck className="text-[#FF6E23]" />
          <div>
            <h4 className="font-black text-foreground">Estimated Delivery</h4>
            <p className="text-[#6d5f53]">Jun 23 - Jun 27</p>
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
            <h4 className="font-black text-foreground">Secure Checkout</h4>
            <p className="text-[#6d5f53]">
              100% secure payments & protected transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}