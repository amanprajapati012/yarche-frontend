"use client";

import { useState } from "react";
import { getImageUrl } from "@/src/lib/image";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Order } from "@/src/types/order";
import OrderDetails from "./OrderDetails";
import { useRouter } from "next/navigation";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const paymentColor = () => {
    switch (order.paymentStatus) {
      case "success":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div
      className="
      bg-surface
      rounded-[30px]
      border
      border-border
      overflow-hidden
      shadow-[0_15px_40px_rgba(40,23,13,.08)]
      transition-all
      duration-300
      hover:-translate-y-1
      "
    >
      {/* Header */}

      <div className="p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-[var(--input-bg)] flex items-center justify-center">

                <ShoppingBag
                  size={22}
                  className="text-foreground"
                />

              </div>

              <div>

                <h3 className="font-bold text-lg text-foreground">

                  #{order._id.slice(-8).toUpperCase()}

                </h3>

                <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-secondary)]">

                  <Calendar size={15} />

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-wrap items-center gap-3">

            <span
              className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                ${paymentColor()}
              `}
            >
              {order.paymentStatus.toUpperCase()}
            </span>

            <span
              className="
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              bg-[var(--input-bg)]
              text-foreground
              "
            >
              {order.paymentMode}
            </span>

          </div>

        </div>

        {/* Products Preview */}

        <div className="mt-7 flex flex-wrap gap-4">

          {order.items.slice(0, 3).map((item) => (
            <div
              key={item.product_id}
              className="
              flex
              items-center
              gap-3
              bg-background
              border
              border-border
              rounded-2xl
              p-3
              "
            >
              <div
                className="
                w-16
                h-16
                rounded-xl
                overflow-hidden
                bg-white
                "
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.variant_title || item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>

                <h4 className="font-semibold text-foreground line-clamp-1">
                  {item.variant_title || item.product_name}
                </h4>

                <p className="text-sm text-[var(--text-secondary)]">

                  Qty : {item.quantity}

                </p>

                <p className="font-bold text-foreground">

                  ₹{item.itemTotalPrice}

                </p>

              </div>

            </div>
          ))}

          {order.items.length > 3 && (
            <div
              className="
              flex
              items-center
              justify-center
              px-6
              rounded-2xl
              bg-background
              border
              border-border
              font-semibold
              text-foreground
              "
            >
              +{order.items.length - 3} More
            </div>
          )}

        </div>

        {/* Bottom */}

        <div className="mt-7 flex flex-col lg:flex-row justify-between gap-5">

          <div className="flex gap-8">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                Total Items
              </p>

              <h3 className="font-bold text-lg text-foreground">
                {order.itemQuantity}
              </h3>
            </div>

            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                Grand Total
              </p>

              <h3 className="font-bold text-2xl text-foreground">
                ₹{order.totalPrice}
              </h3>
            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-wrap gap-3">

            {/* Track Order */}
            <button
              onClick={() => router.push(`/track-order/${order._id}`)}
              className="
      flex
      items-center
      gap-2
      px-6
      py-3
      rounded-2xl
      border-2
      border-[#ff6b1a]
      text-[#ff6b1a]
      font-semibold
      hover:bg-[#ff6b1a]
      hover:text-white
      transition-all
      duration-300
      "
            >
              <Truck size={18} />
              Track Order
            </button>

            {/* View Details */}
            <button
              onClick={() => setOpen(!open)}
              className="
      flex
      items-center
      gap-2
      px-6
      py-3
      rounded-2xl
      bg-footer
      text-white
      font-semibold
      hover:opacity-90
      transition
      "
            >
              <Package size={18} />

              {open ? "Hide Details" : "View Details"}

              {open ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Expand */}

      {open && (
        <OrderDetails order={order} />
      )}
    </div>
  );
}