"use client";

import Image from "next/image";
import {
  Trophy,
  TrendingUp,
  ArrowRight,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/src/lib/image";

interface Props {
  products: any[];
}

export default function TopProducts({
  products,
}: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-3xl border border-surface-3 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-surface-3">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Top Selling Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Best performing products based on delivered orders
          </p>
        </div>

        <button
          onClick={() =>
            router.push("/admin/products")
          }
          className="flex items-center gap-1 text-xs font-medium px-3 py-2 rounded-xl bg-surface text-secondary hover:bg-secondary hover:text-white transition-all"
        >
          View All
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Products */}
      <div className="p-6 space-y-4">
        {products.length > 0 ? (
          products.map(
            (
              product: any,
              index: number
            ) => {
              const stock = product.quantity || 0;

              const price =
                product.discountedPrice ||
                product.price ||
                0;

              const imageUrl = getImageUrl(
                product.image?.url ||
                product.image ||
                product.images?.[0]
              );

              const sku =
                product.productSku ||
                product.sku ||
                "N/A";

              const sold = product.sold || 0;

              const revenue =
                product.revenue || 0;

              return (
                <div
                  key={product._id}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-surface-3 hover:border-input-bg hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Rank */}

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0
                      ${index === 0
                          ? "bg-warning-light text-warning"
                          : index === 1
                            ? "bg-gray-100 text-gray-700"
                            : index === 2
                              ? "bg-primary-light text-primary-dark"
                              : "bg-surface-3 text-secondary"
                        }`}
                    >
                      #{index + 1}
                    </div>

                    {/* Image */}

                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border bg-gray-50 shrink-0">
                      <Image
                        src={imageUrl}
                        alt={product.displayName}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Product Info */}

                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {product.displayName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹
                        {price.toLocaleString()}
                      </p>

                      <p className="text-xs text-gray-400 mt-1 truncate">
                        SKU: {sku}
                      </p>
                    </div>
                  </div>

                  {/* Right Side */}

                  <div className="hidden lg:flex items-center gap-10">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 flex items-center gap-1 justify-center">
                        <ShoppingBag className="w-3 h-3" />
                        Sold
                      </p>

                      <p className="font-bold text-info">
                        {sold}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 flex items-center gap-1 justify-center">
                        <Package className="w-3 h-3" />
                        Stock
                      </p>

                      <p className="font-semibold">
                        {stock}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400">
                        Revenue
                      </p>

                      <p className="font-bold text-success">
                        ₹
                        {revenue.toLocaleString()}
                      </p>
                    </div>

                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                </div>
              );
            }
          )
        ) : (
          <div className="py-12 text-center text-gray-500">
            No sales yet
          </div>
        )}
      </div>
    </div>
  );
}