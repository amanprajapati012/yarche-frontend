"use client";

import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { getImageUrl } from "@/src/lib/image";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/%/g, "percent")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ComboIncludedProducts({ combo }: any) {
  if (!combo?.products?.length) return null;

  return (
    <div className="bg-[var(--surface)] border border-bg-[var(--footer)]/10 rounded-[32px] p-5 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-footer text-[#FF6E23] flex items-center justify-center">
          <PackageOpen size={22} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black text-foreground">
            What's Included
          </h2>
          <p className="text-[#6b5c50] text-sm mt-1">
            {combo.products.length} items in this combo
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {combo.products.map((item: any, index: number) => {
          const dbProduct = item.product;
          if (!dbProduct) return null;

          const variant = item.variantId
            ? dbProduct.variants?.find(
                (v: any) => v._id === item.variantId
              )
            : null;

          const displayImages = variant?.images?.length
            ? variant.images
            : dbProduct.images;

          const imageSrc = getImageUrl(displayImages?.[0]);
          const displayPrice = variant ? variant.price : dbProduct.price;

          return (
            <Link
              key={`${dbProduct._id}-${item.variantId || "base"}-${index}`}
              href={`/products/${slugify(dbProduct.name)}`}
              className="flex items-center gap-4 rounded-2xl border border-[#28170D]/10 bg-[#fff3e2] p-4 hover:border-[#FF6E23] transition-all"
            >
              <img
                src={imageSrc}
                alt={dbProduct.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate">
                  {dbProduct.name}
                  {variant && (
                    <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-gray-600 border">
                      {variant.title}
                    </span>
                  )}
                </p>

                <p className="text-sm text-[#6b5c50] mt-1">
                  ₹{displayPrice} × {item.quantity}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-black text-foreground">
                  ₹{displayPrice * item.quantity}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}