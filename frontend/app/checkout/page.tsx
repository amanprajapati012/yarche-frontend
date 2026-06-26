"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  TicketPercent,
} from "lucide-react";

import { useCartStore } from "@/src/store/cartStore";

export default function CheckoutPage() {
  const { items } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Shipping form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Coupon system
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<null | string>(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const shipping = subtotal >= 500 ? 0 : 50;

  const couponDiscount = useMemo(() => {
    if (appliedCoupon === "SAVE10") return Math.round(subtotal * 0.1);
    if (appliedCoupon === "FLAT100") return 100;
    return 0;
  }, [appliedCoupon, subtotal]);

  const total = subtotal + shipping - couponDiscount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "SAVE10" || code === "FLAT100") {
      setAppliedCoupon(code);
    } else {
      setAppliedCoupon(null);
      alert("Invalid coupon code");
    }
  };

  if (!items.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#f3e7d3]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#3B281C]">
            No Items to Checkout
          </h2>
          <Link
            href="/products"
            className="inline-flex mt-6 bg-[#3B281C] text-[#f3e7d3] px-6 py-3 rounded-xl"
          >
            Go Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f3e7d3] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#3B281C]">Checkout</h1>
          <p className="text-[#6f5f52] mt-1">
            Complete your order securely
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* SHIPPING */}
            <div className="bg-[#ead7b8] p-6 rounded-3xl border border-[#d8c2a0]">
              <h2 className="text-xl font-bold text-[#3B281C] mb-4">
                Shipping Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <Input icon={<User />} placeholder="Full Name"
                  value={form.name}
                  onChange={(e: any) => setForm({ ...form, name: e.target.value })}
                />

                <Input icon={<Phone />} placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e: any) => setForm({ ...form, phone: e.target.value })}
                />

                <Input icon={<Mail />} placeholder="Email"
                  className="md:col-span-2"
                  value={form.email}
                  onChange={(e: any) => setForm({ ...form, email: e.target.value })}
                />

                <Textarea icon={<MapPin />} placeholder="Full Address"
                  className="md:col-span-2"
                  value={form.address}
                  onChange={(e: any) => setForm({ ...form, address: e.target.value })}
                />

                <Input placeholder="City"
                  value={form.city}
                  onChange={(e: any) => setForm({ ...form, city: e.target.value })}
                />

                <Input placeholder="State"
                  value={form.state}
                  onChange={(e: any) => setForm({ ...form, state: e.target.value })}
                />

                <Input placeholder="Pincode"
                  value={form.pincode}
                  onChange={(e: any) => setForm({ ...form, pincode: e.target.value })}
                />

              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-[#ead7b8] p-6 rounded-3xl border border-[#d8c2a0]">
              <h2 className="text-xl font-bold text-[#3B281C] mb-4">
                Payment Method
              </h2>

              <label className="flex justify-between p-4 bg-[#e0caa8] rounded-xl">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </div>
                <Truck />
              </label>
            </div>

          </div>

          {/* RIGHT SUMMARY */}
          <div className="sticky top-24">

            <div className="bg-[#ead7b8] p-6 rounded-3xl border border-[#d8c2a0]">

              <h2 className="text-xl font-bold">Order Summary</h2>

              {/* PRODUCTS */}
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3 items-center">
                    
                    <img
                      src={item.image}
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

              {/* COUPON */}
              <div className="mt-5 flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Apply coupon"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#e0caa8] outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-[#3B281C] text-white rounded-lg"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <p className="text-green-700 text-sm mt-2">
                  Coupon {appliedCoupon} applied!
                </p>
              )}

              {/* TOTALS */}
              <div className="mt-5 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* PLACE ORDER */}
              <button className="mt-6 w-full bg-[#2D1A10] text-white py-4 rounded-2xl flex justify-center items-center gap-2">
                Place Order <ArrowRight size={18} />
              </button>

              <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
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

/* INPUT COMPONENTS */
function Input({ icon, className = "", ...props }: any) {
  return (
    <div className={`relative ${className}`}>
      {icon && <div className="absolute left-3 top-3 text-gray-600">{icon}</div>}
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#e0caa8] outline-none"
      />
    </div>
  );
}

function Textarea({ icon, className = "", ...props }: any) {
  return (
    <div className={`relative ${className}`}>
      {icon && <div className="absolute left-3 top-3 text-gray-600">{icon}</div>}
      <textarea
        {...props}
        rows={3}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#e0caa8] outline-none"
      />
    </div>
  );
}