"use client";

import Link from "next/link";
import { getImageUrl } from "@/src/lib/image";

import {
    CheckCircle2,
    Truck,
    MapPin,
    Package,
    Receipt,
    ArrowRight,
    Phone,
    CreditCard
} from "lucide-react";

type Props = {
    order: any;
}

export default function OrderSuccess({ order }: Props) {

    return (

        <section className="min-h-screen bg-[var(--surface)] py-12">

            <div className="max-w-6xl mx-auto px-4">

                <div className="bg-[var(--surface)] rounded-[35px] border border-[var(--border)] overflow-hidden shadow-xl">

                    {/* TOP */}

                    <div className="bg-gradient-to-r from-[#28170d] to-[#4b2f1f] p-10 text-center text-white">

                        <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center mx-auto">

                            <CheckCircle2 size={70} />

                        </div>

                        <h1 className="text-5xl font-bold mt-6">

                            Order Successful

                        </h1>

                        <p className="mt-4 text-white/80">

                            Thank you for shopping with us.

                        </p>

                        <p className="mt-2 text-sm">

                            Order ID

                        </p>

                        <p className="font-semibold">

                            #{order._id}

                        </p>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 p-8">

                        {/* LEFT */}

                        <div>

                            <div className="bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)]">

                                <div className="flex items-center gap-3 mb-6">

                                    <Receipt className="text-[#28170d]" />

                                    <h2 className="font-bold text-2xl">

                                        Order Summary

                                    </h2>

                                </div>

                                <div className="space-y-5">

                                    {order.items.map((item: any) => (

                                        <div
                                            key={item._id}
                                            className="flex gap-4 items-center"
                                        >

                                            <img
  src={getImageUrl(item.image)}
  alt={item.product_name}
  className="w-24 h-24 rounded-2xl object-cover border"
/>

                                            <div className="flex-1">

                                                <h3 className="font-semibold">

                                                    {item.product_name}

                                                </h3>

                                                <p className="text-sm text-gray-500">

                                                    Qty : {item.quantity}

                                                </p>

                                                <p className="text-sm">

                                                    ₹{item.discountedPrice}

                                                </p>

                                            </div>

                                            <div className="font-bold">

                                                ₹{item.itemTotalPrice}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <hr className="my-6" />

                                <div className="space-y-3">

                                    <div className="flex justify-between">

                                        <span>Items</span>

                                        <span>{order.itemQuantity}</span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Shipping</span>

                                        <span>

                                            {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}

                                        </span>

                                    </div>

                                    <div className="flex justify-between text-green-700">

                                        <span>Coupon</span>

                                        <span>

                                            -{order.couponDiscount}

                                        </span>

                                    </div>

                                    <div className="flex justify-between text-2xl font-bold pt-3 border-t">

                                        <span>Total</span>

                                        <span>

                                            ₹{order.totalPrice}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="space-y-6">

                            <div className="bg-[#fffbf5] rounded-3xl border border-[var(--border)] p-6">

                                <div className="flex items-center gap-3">

                                    <MapPin />

                                    <h2 className="font-bold text-xl">

                                        Shipping Address

                                    </h2>

                                </div>

                                <div className="mt-5 space-y-2 text-[15px]">

                                    <p className="font-semibold">

                                        {order.address.fullName}

                                    </p>

                                    <p>

                                        {order.address.addressLine}

                                    </p>

                                    <p>

                                        {order.address.landmark}

                                    </p>

                                    <p>

                                        {order.address.city},{" "}

                                        {order.address.state}

                                    </p>

                                    <p>

                                        {order.address.country}

                                    </p>

                                    <p>

                                        {order.address.pincode}

                                    </p>

                                    <div className="flex items-center gap-2">

                                        <Phone size={17} />

                                        {order.address.mobile}

                                    </div>

                                </div>

                            </div>

                            <div className="bg-[#fffbf5] rounded-3xl border border-[var(--border)] p-6">

                                <div className="flex items-center gap-3">

                                    <CreditCard />

                                    <h2 className="font-bold text-xl">

                                        Payment

                                    </h2>

                                </div>

                                <div className="mt-5 space-y-3">

                                    <div className="flex justify-between">

                                        <span>Method</span>

                                        <span>

                                            {order.paymentMode}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Status</span>

                                        <span className="text-green-600 font-semibold">

                                            {order.paymentStatus}

                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Transaction</span>

                                        <span>

                                            {order.transactionNo || "--"}

                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="bg-[#fffbf5] rounded-3xl border border-[var(--border)] p-6">

                                <div className="flex items-center gap-3">

                                    <Truck />

                                    <h2 className="font-bold text-xl">

                                        Delivery

                                    </h2>

                                </div>

                                <p className="mt-4">

                                    Current Status

                                </p>

                                <div className="mt-3 inline-flex bg-yellow-100 text-yellow-800 px-5 py-2 rounded-full font-semibold">

                                    <Package className="mr-2" size={18} />

                                    {order.deliveryStatus}

                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <Link

                                    href="/account/orders"

                                    className="bg-[#28170d] text-white rounded-2xl py-4 flex justify-center items-center gap-2"

                                >

                                    My Orders

                                    <ArrowRight size={18} />

                                </Link>

                                <Link

                                    href="/products"

                                    className="bg-[#ead7b8] rounded-2xl py-4 text-center"

                                >

                                    Continue Shopping

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    )

}