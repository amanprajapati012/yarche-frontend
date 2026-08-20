"use client";

import { ArrowRight, ShieldCheck, Layers } from "lucide-react";
import { getImageUrl } from "@/src/lib/image"; // apna actual path
import { toast } from "sonner";
import AvailableCoupons from "./AvailableCoupons";


type CartItem = {
    _id: string;

    variant_id?: string | null;
    isVariant?: boolean;

    type?: "product" | "combo"; // 👈 NEW

    name: string;
    title?: string;

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
    selectCoupon: (code: string) => void;
    appliedCoupon: string | null;
    couponDiscount: number;
    applyCoupon: (couponCode?: string) => void;

    onPlaceOrder: () => void;
};

export default function OrderSummary({
    items,
    subtotal,
    shipping,
    total,
    coupon,
    setCoupon,
    selectCoupon,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    onPlaceOrder,
}: OrderSummaryProps) {
    return (
        <div className="lg:sticky lg:top-24">
            <div className="bg-surface p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-input-bg">

                {/* Heading */}
                <h2 className="text-xl font-bold text-foreground-2">
                    Order Summary
                </h2>

                {/* Products */}
                <div className="mt-4 space-y-3">
                    {items.map((item) => (
                        <div
                            key={`${item._id}-${item.variant_id || "default"}-${item.type || "product"}`}
                            className="flex gap-3 items-center"
                        >
                            <img
                                src={getImageUrl(item.image)}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover border"
                            />

                            <div className="flex-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {item.type === "combo" && (
                                        <span className="inline-flex items-center gap-1 bg-foreground-3 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                            <Layers size={9} />
                                            Combo
                                        </span>
                                    )}

                                    <p className="text-sm font-medium">
                                        {item.isVariant && item.title
                                            ? item.title
                                            : item.name}
                                    </p>
                                </div>

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
                <div className="mt-5 flex flex-col sm:flex-row gap-2">
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
                        className="flex-1 px-3 py-2 rounded-lg bg-footer outline-none"
                    />

                    <button
                        disabled={!coupon}
                        onClick={() => applyCoupon()}
                        className="px-4 py-2 bg-foreground-2 text-white rounded-lg disabled:opacity-50"
                    >
                        Apply
                    </button>
                </div>

                {appliedCoupon && (
                    <div
                        key={appliedCoupon}
                        className="yc-coupon-applied yc-coupon-shine relative mt-3 flex items-center gap-2.5 overflow-hidden rounded-xl border border-success bg-success-light px-4 py-3"
                    >
                        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path className="yc-check-draw" d="M4 12l5 5L20 6" />
                            </svg>
                        </span>
                        <p className="text-sm text-success">
                            Coupon <strong>{appliedCoupon}</strong> applied — you're saving ₹{couponDiscount}!
                        </p>
                    </div>
                )}
                <AvailableCoupons
                    onSelectCoupon={selectCoupon}
                />

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
                        <div className="flex justify-between text-success">
                            <span>Discount</span>
                            <span>-₹{couponDiscount}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-input-bg">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                {/* Place Order */}
                <button
                    onClick={onPlaceOrder}
                    className="mt-6 w-full bg-foreground-3 text-white py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-foreground-2 transition"
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