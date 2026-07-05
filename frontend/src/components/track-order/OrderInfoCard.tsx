"use client";

import {
  MapPin,
  CreditCard,
  Phone,
  User,
  Package,
  Receipt,
  Truck,
  Ticket,
} from "lucide-react";

import { Order } from "@/src/types/order";
import { getImageUrl } from "@/src/lib/image";
import DeliveryStatusBadge from "./DeliveryStatusBadge";

interface Props {
  order: Order;
}

export default function OrderInfoCard({ order }: Props) {
  const item = order.items[0];

  return (
    <div className="space-y-6">

      {/* PRODUCT */}

      <div
        className="rounded-[30px] border p-6 shadow-lg"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-5"
          style={{
            color: "var(--foreground)",
          }}
        >
          Ordered Product
        </h2>

        <div className="flex gap-4">

         <div
  className="h-28 w-28 overflow-hidden rounded-2xl border"
  style={{
    borderColor: "var(--border)",
  }}
>
  <img
  src={getImageUrl(item.image)}
  alt={item.variant_title || item.product_name}
  className="h-full w-full object-cover hover:scale-110 transition duration-500"
/>
</div>

          <div className="flex-1">

           <h3
  className="font-bold text-lg"
  style={{
    color: "var(--foreground)",
  }}
>
  {item.variant_title || item.product_name}
</h3>

            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Quantity : {item.quantity}
            </p>

            <p
              className="mt-2 text-2xl font-bold"
              style={{
                color: "var(--foreground)",
              }}
            >
              ₹{item.itemTotalPrice}
            </p>

          </div>

        </div>

        {order.items.length > 1 && (

          <div
            className="mt-5 rounded-xl px-4 py-3"
            style={{
              background: "var(--input-bg)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              + {order.items.length - 1} more item(s)
            </p>
          </div>

        )}

      </div>

      {/* SHIPPING */}

      <div
        className="rounded-[30px] border p-6 shadow-lg"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="mb-5 text-xl font-bold flex items-center gap-2"
          style={{
            color: "var(--foreground)",
          }}
        >
          <MapPin size={20} />
          Shipping Address
        </h2>

        <div className="space-y-4">

          <div className="flex gap-3">

            <User
              size={18}
              color="#6b5a4d"
            />

            <span>{order.address.fullName}</span>

          </div>

          <div className="flex gap-3">

            <Phone
              size={18}
              color="#6b5a4d"
            />

            <span>{order.address.mobile}</span>

          </div>

          <div className="flex gap-3 items-start">

            <MapPin
              size={18}
              color="#6b5a4d"
            />

            <span>
              {order.address.addressLine},
              {order.address.landmark && (
                <> {order.address.landmark},</>
              )}
              <br />
              {order.address.city},
              {order.address.district}
              <br />
              {order.address.state},
              {order.address.country}
              <br />
              {order.address.pincode}
            </span>

          </div>

        </div>

      </div>

      {/* PAYMENT */}

      <div
        className="rounded-[30px] border p-6 shadow-lg"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="mb-5 text-xl font-bold flex items-center gap-2"
          style={{
            color: "var(--foreground)",
          }}
        >
          <Receipt size={20} />
          Payment Details
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between">

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Payment Status
            </span>

            <DeliveryStatusBadge
              status={order.paymentStatus}
              payment
            />

          </div>

          <div className="flex justify-between">

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Payment Mode
            </span>

            <span
              className="font-semibold"
              style={{
                color: "var(--foreground)",
              }}
            >
              {order.paymentMode}
            </span>

          </div>

          <div className="flex justify-between">

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Shipping
            </span>

            <span
              className="font-semibold"
              style={{
                color: "var(--foreground)",
              }}
            >
              ₹{order.shipping}
            </span>

          </div>

          <div className="flex justify-between">

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Coupon
            </span>

            <span
              className="font-semibold"
              style={{
                color: "#16a34a",
              }}
            >
              {order.couponCode || "-"}
            </span>

          </div>

          <div className="flex justify-between">

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Discount
            </span>

            <span
              className="font-semibold"
              style={{
                color: "#16a34a",
              }}
            >
              -₹{order.couponDiscount || 0}
            </span>

          </div>

          <div
            className="border-t pt-5 flex justify-between"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <span
              className="text-lg font-bold"
              style={{
                color: "var(--foreground)",
              }}
            >
              Grand Total
            </span>

            <span
              className="text-2xl font-bold"
              style={{
                color: "var(--foreground)",
              }}
            >
              ₹{order.totalPrice}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}