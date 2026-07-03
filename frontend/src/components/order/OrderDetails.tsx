"use client";

import Image from "next/image";
import {
  CreditCard,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";
import { getImageUrl } from "@/src/lib/image";
import { Order } from "@/src/types/order";

interface Props {
  order: Order;
}

export default function OrderDetails({
  order,
}: Props) {
  return (
    <div className="border-t border-border bg-background p-6">

      {/* Products */}

      <div>

        <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-5">
          <Package size={20} />
          Ordered Products
        </h3>

        <div className="space-y-4">

          {order.items.map((item) => (
            <div
              key={item.product_id}
              className="
              bg-surface
              border
              border-border
              rounded-3xl
              p-4

              flex
              flex-col
              md:flex-row
              gap-5
              "
            >
              {/* Image */}

              <div
                className="
                w-28
                h-28
                rounded-2xl
                overflow-hidden
                bg-white
                shrink-0
                "
              >
               <img
  src={getImageUrl(item.image)}
  alt={item.product_name}
  className="w-full h-full object-cover"
/>
              </div>

              {/* Details */}

              <div className="flex-1">

                <h4 className="font-bold text-lg text-foreground">
                  {item.product_name}
                </h4>

                {item.category && (
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Category : {item.category}
                  </p>
                )}

                {item.subcategory && (
                  <p className="text-sm text-[var(--text-secondary)]">
                    Sub Category : {item.subcategory}
                  </p>
                )}

                <div className="flex flex-wrap gap-8 mt-5">

                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Price
                    </p>

                    <h4 className="font-semibold text-foreground">
                      ₹{item.discountedPrice}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Quantity
                    </p>

                    <h4 className="font-semibold text-foreground">
                      {item.quantity}
                    </h4>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Total
                    </p>

                    <h4 className="font-bold text-xl text-foreground">
                      ₹{item.itemTotalPrice}
                    </h4>
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Address */}

      <div className="mt-8">

        <h3 className="text-xl font-bold flex items-center gap-2 text-foreground mb-5">
          <MapPin size={20} />
          Shipping Address
        </h3>

        <div
          className="
          bg-surface
          border
          border-border
          rounded-3xl
          p-6
          "
        >

          <div className="flex items-center gap-3">

            <User
              size={18}
              className="text-foreground"
            />

            <span className="font-semibold text-foreground">
              {order.address.fullName}
            </span>

          </div>

          <div className="flex items-center gap-3 mt-4">

            <Phone
              size={18}
              className="text-foreground"
            />

            <span className="text-foreground">
              {order.address.mobile}
            </span>

          </div>

          <div className="mt-5 text-[15px] leading-7 text-[var(--text-secondary)]">

            {order.address.addressLine}

            {order.address.landmark && (
              <>
                <br />
                {order.address.landmark}
              </>
            )}

            <br />

            {order.address.city},{" "}
            {order.address.district}

            <br />

            {order.address.state},{" "}
            {order.address.country}

            <br />

            PIN : {order.address.pincode}

          </div>

        </div>

      </div>
            {/* Payment & Summary */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        {/* Payment */}

        <div
          className="
          bg-surface
          border
          border-border
          rounded-3xl
          p-6
          "
        >
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
            <CreditCard size={20} />
            Payment Details
          </h3>

          <div className="space-y-5">

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">
                Payment Mode
              </span>

              <span className="font-semibold text-foreground">
                {order.paymentMode}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">
                Payment Status
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  order.paymentStatus === "success"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">
                Order Date
              </span>

              <span className="font-medium text-foreground">
                {new Date(order.createdAt).toLocaleString("en-IN")}
              </span>
            </div>

          </div>
        </div>

        {/* Summary */}

        <div
          className="
          bg-surface
          border
          border-border
          rounded-3xl
          p-6
          "
        >
          <h3 className="text-xl font-bold text-foreground mb-6">
            Order Summary
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">
                Sub Total
              </span>

              <span className="font-medium">
                ₹
                {order.totalPrice -
                  order.shipping +
                  (order.couponDiscount || 0)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">
                Shipping
              </span>

              <span className="font-medium">
                ₹{order.shipping}
              </span>
            </div>

            {order.couponDiscount ? (
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">
                  Discount
                </span>

                <span className="font-medium text-green-700">
                  - ₹{order.couponDiscount}
                </span>
              </div>
            ) : null}

            {order.couponCode && (
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">
                  Coupon
                </span>

                <span className="font-semibold text-foreground">
                  {order.couponCode}
                </span>
              </div>
            )}

            <div className="border-t border-border pt-4 flex justify-between">

              <span className="text-lg font-bold text-foreground">
                Grand Total
              </span>

              <span className="text-2xl font-bold text-foreground">
                ₹{order.totalPrice}
              </span>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}