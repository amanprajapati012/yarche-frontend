"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useCartStore } from "@/src/store/cartStore";

import CheckoutHeader from "@/src/components/checkout/CheckoutHeader";
import ShippingForm from "@/src/components/checkout/ShippingForm";
import PaymentMethod from "@/src/components/checkout/PaymentMethod";
import OrderSummary from "@/src/components/checkout/OrderSummary";

type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Address ID
  addressId?: string;
};

export default function CheckoutPage() {
  const { items } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState<CheckoutForm>({
    addressId: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [items]);

  const shipping = subtotal >= 500 ? 0 : 50;

  const couponDiscount = useMemo(() => {
    if (appliedCoupon === "SAVE10") {
      return Math.round(subtotal * 0.1);
    }

    if (appliedCoupon === "FLAT100") {
      return 100;
    }

    return 0;
  }, [subtotal, appliedCoupon]);

  const total = subtotal + shipping - couponDiscount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "SAVE10" || code === "FLAT100") {
      setAppliedCoupon(code);
    } else {
      setAppliedCoupon(null);
      alert("Invalid Coupon Code");
    }
  };

  if (!items.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#f3e7d3]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#3B281C]">
            No Items To Checkout
          </h2>

          <Link
            href="/products"
            className="inline-flex mt-6 rounded-xl bg-[#3B281C] px-6 py-3 text-white"
          >
            Go Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f3e7d3] py-6 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-4">

        <CheckoutHeader />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT */}

          <div className="space-y-6">

            <ShippingForm
              form={form}
              setForm={setForm}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

          </div>

          {/* RIGHT */}

          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            coupon={coupon}
            setCoupon={setCoupon}
            appliedCoupon={appliedCoupon}
            couponDiscount={couponDiscount}
            applyCoupon={applyCoupon}
          />

        </div>

      </div>
    </section>
  );
}