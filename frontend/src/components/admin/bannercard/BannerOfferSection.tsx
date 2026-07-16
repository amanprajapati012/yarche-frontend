"use client";

import { Percent } from "lucide-react";

interface Props {
  form: {
    leftOffer: string;
    leftText: string;
    leftCode: string;
    rightOffer: string;
    rightText: string;
    rightCode: string;
  };
  handleChange: (
    key: any,
    value: any
  ) => void;
}

export default function BannerOfferSection({
  form,
  handleChange,
}: Props) {
  return (
    <div
      className="rounded-3xl p-6"
      style={{
        background: "var(--surface)",
      }}
    >
      <h3
        className="text-xl font-bold mb-6"
        style={{
          color: "var(--foreground)",
        }}
      >
        Offer Details
      </h3>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= Left Offer ================= */}

        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
        >
          <h4
            className="flex items-center gap-2 text-lg font-semibold mb-5"
            style={{
              color: "var(--foreground)",
            }}
          >
            <Percent size={18} />
            Left Offer
          </h4>

          <div className="space-y-4">

            <input
              value={form.leftOffer}
              onChange={(e) =>
                handleChange(
                  "leftOffer",
                  e.target.value
                )
              }
              placeholder="8% OFF"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />

            <input
              value={form.leftText}
              onChange={(e) =>
                handleChange(
                  "leftText",
                  e.target.value
                )
              }
              placeholder="On Orders Above ₹1000"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />

            <input
              value={form.leftCode}
              onChange={(e) =>
                handleChange(
                  "leftCode",
                  e.target.value
                )
              }
              placeholder="Coupon Code"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />

          </div>
        </div>

        {/* ================= Right Offer ================= */}

        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
        >
          <h4
            className="flex items-center gap-2 text-lg font-semibold mb-5"
            style={{
              color: "var(--foreground)",
            }}
          >
            <Percent size={18} />
            Right Offer
          </h4>

          <div className="space-y-4">

            <input
              value={form.rightOffer}
              onChange={(e) =>
                handleChange(
                  "rightOffer",
                  e.target.value
                )
              }
              placeholder="10% OFF"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />

            <input
              value={form.rightText}
              onChange={(e) =>
                handleChange(
                  "rightText",
                  e.target.value
                )
              }
              placeholder="On Orders Above ₹4000"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />

            <input
              value={form.rightCode}
              onChange={(e) =>
                handleChange(
                  "rightCode",
                  e.target.value
                )
              }
              placeholder="Coupon Code"
              className="w-full rounded-xl px-4 py-3 outline-none border"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />

          </div>
        </div>

      </div>
    </div>
  );
}