"use client";

import { useEffect, useState } from "react";
import { ChevronDown, TicketPercent } from "lucide-react";
import API from "@/src/lib/api";

type Coupon = {
  _id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  endDate: string;
  isActive: boolean;
};

type Props = {
  onSelectCoupon: (code: string) => void;
};

export default function AvailableCoupons({
  onSelectCoupon,
}: Props) {
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/admin/discounts");

      const activeCoupons = (res.data.data || []).filter(
    (item: Coupon) =>
        item.isActive &&
        new Date(item.endDate) > new Date()
);

      setCoupons(activeCoupons);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-4 rounded-xl border border-input-bg bg-footer-text overflow-hidden">

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <TicketPercent
            size={18}
            className="text-foreground-2"
          />

          <span className="font-semibold text-foreground-2">
            Available Coupons
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-input-bg">

          {coupons.length === 0 && (
            <p className="p-4 text-sm text-gray-500">
              No Coupon Available
            </p>
          )}

          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="border-b last:border-0 border-border-light p-4"
            >
              <div className="flex justify-between items-start">

                <div>

                  <div className="font-bold text-foreground-2">
                    {coupon.code}
                  </div>

                  <div className="text-sm text-gray-600 mt-1">

                    {coupon.type === "percentage"
                      ? `${coupon.value}% OFF`
                      : `₹${coupon.value} OFF`}

                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Min Order ₹{coupon.minOrderAmount}
                  </div>

                  {(coupon.maxDiscountAmount ?? 0) > 0 && (
                    <div className="text-xs text-gray-500">
                      Max Discount ₹{coupon.maxDiscountAmount}
                    </div>
                  )}

                </div>

                <button
                  onClick={() =>
                    onSelectCoupon(coupon.code)
                  }
                  className="rounded-lg bg-foreground-2 px-4 py-2 text-white text-sm hover:bg-foreground-2"
                >
                  Apply
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}