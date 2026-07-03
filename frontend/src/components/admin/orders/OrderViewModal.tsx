"use client";

import Image from "next/image";
import { X } from "lucide-react";

type OrderItem = {
  product_id?: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
};

type Address = {
  fullName?: string;
  mobile?: string;
  email?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  pincode?: string;
};

type Order = {
  _id: string;
  fullName: string;
  mobile: string | number;
  address?: Address;

  items: OrderItem[];

  paymentMode: string;
  paymentStatus: string;
  deliveryStatus: string;

  shipping: number;
  couponDiscount: number;
  totalPrice: number;

  createdAt: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order | null;
};

export default function OrderViewModal({
  open,
  onClose,
  order,
}: Props) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl rounded-xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold">
              Order Details
            </h2>
            <p className="text-sm text-gray-500">
  #{order._id.slice(-8).toUpperCase()}
</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Customer */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">
              Customer Details
            </h3>

           <div className="space-y-2 text-sm">
  <p>
    <span className="font-medium">Name:</span>{" "}
    {order.fullName}
  </p>

  <p>
    <span className="font-medium">Mobile:</span>{" "}
    {order.mobile}
  </p>

  <p>
    <span className="font-medium">Email:</span>{" "}
    {order.address?.email || "-"}
  </p>

  <p>
    <span className="font-medium">Address:</span>{" "}
    {order.address?.addressLine}
  </p>

  <p>
    {order.address?.city}, {order.address?.state} -{" "}
    {order.address?.pincode}
  </p>
</div>
          </div>

          {/* Order Info */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">
              Order Information
            </h3>

            <div className="space-y-2 text-sm">
  <p>
    <span className="font-medium">
      Payment Method:
    </span>{" "}
    {order.paymentMode}
  </p>

  <p>
    <span className="font-medium">
      Payment Status:
    </span>{" "}
    {order.paymentStatus}
  </p>

  <p>
    <span className="font-medium">
      Delivery Status:
    </span>{" "}
    {order.deliveryStatus}
  </p>

  <p>
    <span className="font-medium">
      Order Date:
    </span>{" "}
    {new Date(order.createdAt).toLocaleString()}
  </p>
</div>
          </div>
        </div>

        {/* Products */}
        <div className="px-6">
          <h3 className="mb-4 text-lg font-semibold">
            Ordered Products
          </h3>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Product
                  </th>
                  <th className="px-4 py-3 text-center">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            item.image ||
                            "/placeholder.png"
                          }
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />

                        <span>{item.name}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {item.quantity}
                    </td>

                    <td className="px-4 py-3 text-right">
                      ₹{item.price}
                    </td>

                    <td className="px-4 py-3 text-right font-medium">
                      ₹
                      {item.price *
                        item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
       <div className="flex justify-between py-2">
  <span>Shipping</span>
  <span>₹{order.shipping}</span>
</div>

<div className="flex justify-between py-2">
  <span>Discount</span>
  <span>-₹{order.couponDiscount}</span>
</div>

<div className="mt-2 flex justify-between border-t pt-3 text-lg font-bold">
  <span>Total</span>
  <span>₹{order.totalPrice}</span>
</div>
      </div>
    </div>
  );
}