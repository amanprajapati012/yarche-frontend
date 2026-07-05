"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  CalendarDays,
  Truck,
} from "lucide-react";

import API from "@/src/lib/api";
import { Order } from "@/src/types/order";

import TrackingTimeline from "@/src/components/track-order/TrackingTimeline";
import OrderInfoCard from "@/src/components/track-order/OrderInfoCard";
import DeliveryStatusBadge from "@/src/components/track-order/DeliveryStatusBadge";

export default function TrackOrderPage() {
  const params = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    fetchOrder();
  }, [params?.id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      // change api according to your backend
      const res = await API.get(`/admin/order/${params.id}`);
      console.log(res.data.order.deliveryTimeline);

      setOrder(res.data.order);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

 const estimatedDate = () => {
    if (!order) return "-";

    if (order.expectedDelivery) {
        return new Date(order.expectedDelivery).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    }

    return "-";
};

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <Loader2
          className="animate-spin"
          size={45}
          color="#28170d"
        />
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <h2 className="text-2xl font-semibold text-red-500">
          Order Not Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Back */}

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 text-foreground hover:opacity-70 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Hero */}

        <div
          className="
          rounded-[36px]
          overflow-hidden
          shadow-xl
          relative
          "
          style={{
            background:
              "linear-gradient(135deg,#28170d 0%,#3c2415 60%,#5b3a25 100%)",
          }}
        >
          <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />

          <div className="absolute left-[-100px] bottom-[-120px] h-[250px] w-[250px] rounded-full bg-[#caa574]/20 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-10">

            {/* LEFT */}

            <div>

              <span
                className="
                inline-flex
                rounded-full
                px-4
                py-2
                bg-white/10
                text-white
                text-sm
                "
              >
                Track Your Order
              </span>

              <h1 className="text-white text-5xl font-bold mt-5">

                #{order._id.slice(-8).toUpperCase()}

              </h1>

              <p className="text-white/70 mt-4 text-lg">

                Stay updated with your shipment in real time.

              </p>

              <div className="flex flex-wrap gap-8 mt-8">

                <div>

                  <p className="text-white/60 text-sm">
                    Payment
                  </p>

                  <DeliveryStatusBadge
                    status={order.paymentStatus}
                    payment
                  />

                </div>

                <div>

                  <p className="text-white/60 text-sm">
                    Delivery
                  </p>

                  <DeliveryStatusBadge
                    status={order.deliveryStatus}
                  />

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex justify-end">

              <div
                className="
                rounded-3xl
                p-7
                w-full
                max-w-sm
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                "
              >
                <div className="flex items-center gap-3">

                  <Truck
                    size={24}
                    className="text-[#efd6ad]"
                  />

                  <div>

                    <p className="text-white/60 text-sm">

                      Estimated Delivery

                    </p>

                    <h2 className="text-2xl font-bold text-white mt-1">

                      {estimatedDate()}

                    </h2>

                  </div>

                </div>

                <div className="mt-8 flex items-center gap-3">

                  <CalendarDays
                    className="text-[#efd6ad]"
                    size={22}
                  />

                  <div>

                    <p className="text-white/60 text-sm">

                      Ordered On

                    </p>

                    <h3 className="text-white font-medium">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* BODY */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* Timeline */}

          <div className="lg:col-span-2">

            <TrackingTimeline
  status={order.deliveryStatus}
  deliveryTimeline={order.deliveryTimeline || []}
/>

          </div>

          {/* Product */}

          <div>

            <OrderInfoCard order={order} />

          </div>

        </div>

      </div>
    </div>
  );
}