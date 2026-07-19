"use client";

import Link from "next/link";
import { ShoppingCart, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCartStore } from "@/src/store/cartStore";
import { getImageUrl } from "@/src/lib/image";
import { getComboAvailableStock } from "@/src/lib/comboStock";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/%/g, "percent")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ComboCard({ combo }: any) {
  const router = useRouter();

  const discount =
    combo.price > 0
      ? Math.round(
          ((combo.price - combo.discountedPrice) / combo.price) * 100
        )
      : 0;

  // pehle "combo.image" (single) tha, ab "combo.images" (array) hai
  const imageSrc = getImageUrl(combo.images?.[0]);

  const availableStock = getComboAvailableStock(combo);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Link
      href={`/combos/${slugify(combo.title)}`}
      className="group flex flex-col h-full bg-surface rounded-[28px] overflow-hidden border border-[#e6d8bc] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative aspect-square w-full p-3 overflow-hidden">
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <img
            src={imageSrc}
            alt={combo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
  <div className="flex items-center gap-1 bg-[#2d1a10] text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full shadow max-w-[60%]">
    <Layers size={11} className="shrink-0" />
    <span className="truncate">Combo</span>
  </div>

  {discount > 0 && (
    <div className="bg-[#FF6E23] text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full shadow whitespace-nowrap">
      {discount}% OFF
    </div>
  )}
</div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-4 sm:px-5 pb-5">
        <p className="text-[11px] uppercase tracking-[2.5px] text-[#8A7B47] font-bold mb-2">
          {combo.products?.length || 0} Products Included
        </p>

        <h3 className="text-xl font-bold text-[#3F2A1D] leading-tight line-clamp-2">
          {combo.title}
        </h3>

        <p className="mt-1 text-[15px] text-[#74685A] line-clamp-1">
          {combo.description}
        </p>

        {/* PRICE */}
        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-end gap-1 flex-wrap">
              <span className="text-xl sm:text-3xl font-extrabold text-[#2D1A10] leading-none">
                ₹{combo.discountedPrice}
              </span>

              {combo.price > combo.discountedPrice && (
                <span className="text-xs sm:text-base text-[#8A8175] line-through mb-1">
                  ₹{combo.price}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

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
            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#3B281C] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        {/* STOCK STATUS */}
        <div className="mt-2 h-5">
          {availableStock <= 0 ? (
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              Out of Stock
            </div>
          ) : availableStock <= 3 ? (
            <div className="flex items-center gap-2 text-sm font-medium text-red-600">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Hurry! Only {availableStock} combo(s) left
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </Link>
  );
}
