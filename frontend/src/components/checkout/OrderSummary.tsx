"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";

type CartItem = {
    _id: string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
};

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  coupon: string;
  setCoupon: React.Dispatch<React.SetStateAction<string>>;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: () => void;

  onPlaceOrder: () => void; // NEW
};

export default function OrderSummary({
    items,
    subtotal,
    shipping,
    total,
    coupon,
    setCoupon,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    onPlaceOrder,
}: OrderSummaryProps) {
    return (
        <div className="sticky top-24">
            <div className="bg-[#ead7b8] p-6 rounded-3xl border border-[#d8c2a0]">

                {/* Heading */}
                <h2 className="text-xl font-bold text-[#3B281C]">
                    Order Summary
                </h2>

                {/* Products */}
                <div className="mt-4 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-3 items-center"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover border"
                            />

                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {item.name}
                                </p>

                                <p className="text-xs text-gray-600">
                                    Qty: {item.quantity}
                                </p>
                            </div>

                            <p className="text-sm font-semibold">
                                ₹{item.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Coupon */}
                <div className="mt-5 flex gap-2">
                    <input
                        value={coupon}
                        onChange={(e) =>
                            setCoupon(
                                e.target.value
                                    .toUpperCase()
                                    .replace(/[^A-Z0-9]/g, "")
                            )
                        }
                        placeholder="Apply coupon"
                        className="flex-1 px-3 py-2 rounded-lg bg-[#e0caa8] outline-none"
                    />

                    <button 
                        disabled={!coupon}
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-[#3B281C] text-white rounded-lg disabled:opacity-50"
                    >
                        Apply
                    </button>
                </div>

                {appliedCoupon && (
                    <p className="text-green-700 text-sm mt-2">
                        Coupon <strong>{appliedCoupon}</strong> Applied Successfully 🎉
                    </p>
                )}

                {/* Totals */}
                <div className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                            {shipping === 0 ? "FREE" : `₹${shipping}`}
                        </span>
                    </div>

                    {couponDiscount > 0 && (
                        <div className="flex justify-between text-green-700">
                            <span>Discount</span>
                            <span>-₹{couponDiscount}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-[#d8c2a0]">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                {/* Place Order */}
                <button
    onClick={onPlaceOrder}
    className="mt-6 w-full bg-[#2D1A10] text-white py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-[#3B281C] transition"
>
    Place Order
    <ArrowRight size={18} />
</button>

                {/* Secure Checkout */}
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                    <ShieldCheck size={14} />
                    <span>Secure Checkout</span>
                </div>

            </div>
        </div>
    );
}