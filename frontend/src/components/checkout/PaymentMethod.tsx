"use client";

import { Truck, CreditCard, Globe } from "lucide-react";

type PaymentMethodProps = {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

const methods = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order is delivered.",
    icon: Truck,
  },
  {
    id: "razorpay",
    title: "Razorpay",
    description: "Pay securely using UPI, Cards, Net Banking & Wallets.",
    icon: CreditCard,
  },
  {
    id: "paypal",
    title: "PayPal",
    description: "Pay securely with your PayPal account.",
    icon: Globe,
  },
];

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodProps) {
  return (
    <div className="bg-background p-6 rounded-3xl border border-bg-surface">
      <h2 className="text-xl font-bold text-[#3B281C] mb-5">
        Payment Method
      </h2>

      <div className="space-y-4">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <label
              key={method.id}
              className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border transition-all ${
                paymentMethod === method.id
                  ? "border-[#3B281C] bg-surface"
                  : "border-[#d8c2a0] bg-surface hover:border-[#3B281C]"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="accent-[#3B281C]"
                />

                <div>
                  <p className="font-semibold text-[#3B281C]">
                    {method.title}
                  </p>

                  <p className="text-sm text-[#6f5f52]">
                    {method.description}
                  </p>
                </div>
              </div>

              <Icon
                size={24}
                className="text-[#3B281C] flex-shrink-0"
              />
            </label>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-surface border border-[#d8c2a0] p-4">
        {paymentMethod === "cod" && (
          <p className="text-sm text-[#6f5f52]">
            ✔ No advance payment required. Pay the delivery partner after receiving your order.
          </p>
        )}

        {paymentMethod === "razorpay" && (
          <p className="text-sm text-[#6f5f52]">
            ✔ Secure payment powered by Razorpay. Supports UPI, Credit/Debit Cards, Net Banking and Wallets.
          </p>
        )}

        {paymentMethod === "paypal" && (
          <p className="text-sm text-[#6f5f52]">
            ✔ You will be redirected to PayPal to complete your payment securely.
          </p>
        )}
      </div>
    </div>
  );
}