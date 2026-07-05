"use client";

import Link from "next/link";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ShieldCheck,
    ArrowRight,
    Truck,
    BadgeCheck,
} from "lucide-react";
import { useAuthStore } from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";// ya sonner use kar rahe ho to sonner

import { useCartStore } from "@/src/store/cartStore";



export default function CartPage() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const handleCheckout = () => {
        if (!user) {
            toast.error("Please login first");

            router.push("/auth/login");
            return;
        }

        router.push("/checkout");
    };
    const {
        items,
        removeFromCart,
        increaseQty,
        decreaseQty,
    } = useCartStore();

    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shipping = subtotal >= 500 ? 0 : 50;
    const freeShippingTarget = 500;

    const total = subtotal + shipping;

    const totalItems = items.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const progress = Math.min(
        (subtotal / freeShippingTarget) * 100,
        100
    );

    if (!items.length) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-[#f3e7d3]">
                <div className="text-center">
                    <ShoppingBag
                        size={80}
                        className="mx-auto text-[#3B281C]"
                    />
                    <h2 className="text-3xl font-bold mt-5 text-[#3B281C]">
                        Your Cart is Empty
                    </h2>
                    <p className="text-[#6f5f52] mt-3">
                        Add products to continue shopping
                    </p>

                    <Link
                        href="/products"
                        className="inline-flex mt-6 bg-[#3B281C] text-[#f3e7d3] px-8 py-4 rounded-2xl"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[var(--background)] py-20] min-h-screen py-10">
            <div className="max-w-[1600px] mx-auto px-4">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-[#3B281C]">
                        Shopping Cart
                    </h1>

                    <span className="text-[#6f5f52] font-medium">
                        {totalItems} Items
                    </span>
                </div>

                <div className="grid lg:grid-cols-[1fr_430px] gap-8">

                    {/* LEFT SIDE CART ITEMS */}
                    <div className="space-y-5">

                        {items.map((item) => (
                            <div
                                key={`${item._id}-${item.variant_id || "default"}`}
                                className=" bg-[var(--background)] rounded-[30px] border border-[#d8c2a0] p-5 shadow-md"
                            >
                                <div className="flex flex-col md:flex-row gap-5">

                                    <div className="w-full md:w-[150px] h-[150px] bg-[#e0caa8] rounded-3xl overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">

                                       <h3 className="text-2xl font-bold text-[#3F2A1D]">
    {item.isVariant && item.title
        ? item.title
        : item.name}
</h3>

                                       

                                        <div className="mt-4 flex items-center gap-3">
                                            <span className="text-3xl font-extrabold text-[#2D1A10]">
                                                ₹{item.price}
                                            </span>

                                            {item.originalPrice &&
                                                item.originalPrice > item.price && (
                                                    <span className="line-through text-[#7d6c5e]">
                                                        ₹{item.originalPrice}
                                                    </span>
                                                )}
                                        </div>

                                        {/* QUANTITY CONTROLS */}
                                        <div className="mt-6 flex items-center justify-between">

                                            <div className="flex items-center overflow-hidden rounded-2xl border border-[#cbb28f]  bg-[var(--surface)]">
                                                <button
                                                    onClick={() =>
                                                        decreaseQty(
                                                            item._id,
                                                            item.variant_id || null
                                                        )
                                                    }
                                                    className="w-12 h-12 flex items-center justify-center"
                                                >
                                                    <Minus size={18} />
                                                </button>

                                                <span className="w-14 text-center font-bold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    disabled={item.quantity >= item.stock}
                                                    onClick={() =>
                                                        increaseQty(
                                                            item._id,
                                                            item.variant_id || null
                                                        )
                                                    }
                                                    className={`w-12 h-12 flex items-center justify-center transition
                                                        ${item.quantity >= item.stock
                                                            ? "opacity-40 cursor-not-allowed"
                                                            : "hover:bg-[#ddc39a]"
                                                        }`}
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(
                                                        item._id,
                                                        item.variant_id || null
                                                    )
                                                }
                                                className="w-12 h-12 rounded-xl bg-[#e3c1b8] text-[#7a2e2e] flex items-center justify-center"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        {item.quantity >= item.stock && (
                                            <p className="text-xs text-red-500 mt-2">
                                                Maximum stock reached
                                            </p>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* RIGHT SIDE SUMMARY */}
                    <div className="sticky top-24">

                        <div className="bg-[var(--background)] border border-bg-[var(--footer)] rounded-[34px] p-7 shadow-xl">

                            <h2 className="text-2xl font-bold text-[#3B281C]">
                                Order Summary
                            </h2>

                            {/* DELIVERY PROGRESS */}
                            <div className="mt-6 bg-[var(--surface)] rounded-2xl p-4">

                                <div className="flex justify-between text-sm mb-2">
                                    <span>Free Delivery Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>

                                <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#3B281C]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                {subtotal < freeShippingTarget ? (
                                    <p className="mt-3 text-sm text-[#6f5f52]">
                                        Add ₹{freeShippingTarget - subtotal} more for FREE delivery 🚚
                                    </p>
                                ) : (
                                    <p className="mt-3 text-sm font-semibold text-green-700">
                                        🎉 Free Delivery Unlocked
                                    </p>
                                )}
                            </div>

                            {/* ICON FEATURES */}
                            <div className="grid grid-cols-3 gap-3 mt-5">

                                <div className="bg-[var(--surface)] rounded-2xl p-3 text-center">
                                    <Truck size={20} className="mx-auto text-[#3B281C]" />
                                    <p className="text-xs mt-2">Fast Delivery</p>
                                </div>

                                <div className="bg-[var(--surface)] rounded-2xl p-3 text-center">
                                    <ShieldCheck size={20} className="mx-auto text-[#3B281C]" />
                                    <p className="text-xs mt-2">Secure</p>
                                </div>

                                <div className="bg-[var(--surface)] rounded-2xl p-3 text-center">
                                    <BadgeCheck size={20} className="mx-auto text-[#3B281C]" />
                                    <p className="text-xs mt-2">Quality</p>
                                </div>

                            </div>

                            {/* BILLING */}
                            <div className="space-y-4 mt-7">

                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        <Truck size={16} />
                                        Shipping
                                    </span>

                                    <span className="font-semibold">
                                        {shipping === 0 ? (
                                            <span className="text-green-700">FREE</span>
                                        ) : (
                                            `₹${shipping}`
                                        )}
                                    </span>
                                </div>

                                <hr className="border-[#cbb28f]" />

                                <div className="flex justify-between text-2xl font-bold text-[#2D1A10]">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>

                            </div>

                            {/* CHECKOUT */}
                            <button
                                onClick={handleCheckout}
                                className="mt-8 h-14 w-full bg-[#2D1A10] text-[#f3e7d3] rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg"
                            >
                                Proceed To Checkout
                                <ArrowRight size={18} />
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-5 text-[#6f5f52] text-sm">
                                <ShieldCheck size={14} />
                                Secure Checkout
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}