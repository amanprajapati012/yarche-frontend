"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { useCartStore } from "@/src/store/cartStore";
import { useAuthStore } from "@/src/store/authStore";
import API from "@/src/lib/api";
import { useRouter } from "next/navigation";

import CheckoutHeader from "@/src/components/checkout/CheckoutHeader";
import ShippingForm from "@/src/components/checkout/ShippingForm";
import PaymentMethod from "@/src/components/checkout/PaymentMethod";
import OrderSummary from "@/src/components/checkout/OrderSummary";
import AvailableCoupons from "@/src/components/checkout/AvailableCoupons";

type CheckoutForm = {
  addressId?: string;

  name: string;
  phone: string;
  email: string;

  address: string;

  landmark: string;
  district: string;

  city: string;
  state: string;

  country: string;
  pincode: string;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const { items } = useCartStore();

  const { user } = useAuthStore();

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

    landmark: "",
    district: "",
    country: "",
  });

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [items]);

  const shipping = subtotal >= 899 ? 0 : 49;

  const total = subtotal + shipping - couponDiscount;

  const applyCoupon = async (couponCode?: string) => {
    try {
      const code = couponCode || coupon;

      if (!code.trim()) {
        toast.error("Enter Coupon Code");
        return;
      }

      const userId =
        (user as any)?._id ||
        (user as any)?.id ||
        (user as any)?.user?._id ||
        (user as any)?.user?.id;

      if (!userId) {
        toast.error("User not found. Please login again.");
        return;
      }

      const res = await API.patch("/applydiscount", {
        code: code.trim().toUpperCase(),
        totalAmount: subtotal + shipping,
        userId,
      });

      if (res.data.response === "success") {
        setAppliedCoupon(code.trim().toUpperCase());

        setCouponDiscount(Number(res.data.discountApplied));

        toast.success(res.data.message);
      }
    } catch (err: any) {
      console.error(err);

      setAppliedCoupon(null);
      setCouponDiscount(0);

      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to apply coupon"
      );
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (!form.addressId) {
        toast.error("Please select address");
        return;
      }

      const paymentMode =
        paymentMethod === "razorpay" ? "ONLINE" : "COD";

      const userId =
        (user as any)?._id ||
        (user as any)?.id ||
        (user as any)?.user?._id ||
        (user as any)?.user?.id;

      // ================= BUILD ITEMS (product + combo) =================
      const orderItems = items.map((item) => {
        if (item.type === "combo") {
          return {
            type: "combo",
            combo_id: item._id,
            quantity: item.quantity,
          };
        }

        return {
          type: "product",
          product_id: item._id,
          variant_id: item.variant_id || null,
          quantity: item.quantity,
        };
      });

      const body = {
        fullName: form.name,
        mobile: form.phone,
        user_id: userId,
        shipping,
        couponCode: appliedCoupon,
        discount: couponDiscount,
        paymentMode,

        addressId: form.addressId,

        items: orderItems,
      };

      const res = await API.post("/order", body);

      if (paymentMode === "COD") {

        useCartStore.getState().clearCart();

        router.push(`/order-success/${res.data.order._id}`);

        return;
      }

      openRazorpay(res.data);

    } catch (err: any) {
      console.log(err);
      console.log(err?.response?.data);

      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const openRazorpay = (data: any) => {

    const options = {

      key: data.key,

      amount: data.razorpayOrder.amount,

      currency: data.razorpayOrder.currency,

      order_id: data.razorpayOrder.id,

      name: "Your Store",

      description: "Order Payment",

      prefill: {

        name: form.name,

        contact: form.phone,

        email: form.email,

      },

      handler: async function (response: any) {

        try {

          await API.patch("/updatepayment", {
            id: data.order._id,
            transactionNo: response.razorpay_payment_id,
          });

          useCartStore.getState().clearCart();

          router.push(`/order-success/${data.order._id}`);

        } catch (e) {

          console.log(e);

        }

      },

      theme: {

        color: "#3B281C",

      },

    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function () {

      toast.error("Payment Failed");

    });

    razorpay.open();

  };

  if (!items.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[var(--background)] py-20">
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
    <section className="min-h-screen bg-[var(--background)]  py-6 lg:py-10">
      <div className="mx-auto max-w-[1400px] px-4">

        <CheckoutHeader />

        <div className="mt-6 lg:mt-8 grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-[1fr_380px]">

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
            onPlaceOrder={handlePlaceOrder}
            selectCoupon={(code) => {
              setCoupon(code);
              setAppliedCoupon(code);
              applyCoupon(code);
            }}
          />

        </div>

      </div>
    </section>
  );
}