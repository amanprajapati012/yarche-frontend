"use client";

import { Truck } from "lucide-react";

type PaymentMethodProps = {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodProps) {
  return (
    <div className="bg-[#ead7b8] p-6 rounded-3xl border border-[#d8c2a0]">
      <h2 className="text-xl font-bold text-[#3B281C] mb-4">
        Payment Method
      </h2>

      <label className="flex justify-between items-center p-4 bg-[#e0caa8] rounded-xl cursor-pointer border border-transparent hover:border-[#3B281C] transition-all">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
            className="accent-[#3B281C]"
          />

          <div>
            <p className="font-semibold text-[#3B281C]">
              Cash on Delivery
            </p>

            <p className="text-sm text-[#6f5f52]">
              Pay when your order is delivered.
            </p>
          </div>
        </div>

        <Truck className="text-[#3B281C]" size={22} />
      </label>
    </div>
  );
}