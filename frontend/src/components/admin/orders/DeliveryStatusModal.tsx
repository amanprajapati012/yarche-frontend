"use client";

import { useEffect, useState } from "react";
import { X, Truck, PackageCheck, Package, Clock, Ban, CheckCircle2 } from "lucide-react";
import API from "@/src/lib/api";
import { toast } from "sonner";

import { Order } from "@/src/types/order";

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onSuccess?: () => void;
};

const STATUS_FLOW = [
  { label: "Pending", icon: Clock, color: "var(--warning)" },
  { label: "Processing", icon: Package, color: "var(--info)" },
  { label: "Packed", icon: PackageCheck, color: "var(--info)" },
  { label: "Shipped", icon: Truck, color: "var(--info)" },
  { label: "Out for Delivery", icon: Truck, color: "var(--primary)" },
  { label: "Delivered", icon: CheckCircle2, color: "var(--success)" },
  { label: "Cancelled", icon: Ban, color: "var(--error)" },
  { label: "RTO Initiated", icon: Truck, color: "var(--error)" },
  { label: "RTO In Transit", icon: Truck, color: "var(--error)" },
  { label: "RTO Delivered", icon: PackageCheck, color: "var(--error)" },
];
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  Pending: ["Processing", "Cancelled"],
  Processing: ["Packed", "Cancelled"],
  Packed: ["Shipped", "Cancelled"],
  Shipped: ["Out for Delivery", "RTO Initiated"],
  "Out for Delivery": ["Delivered", "RTO Initiated"],
  Delivered: [],
  Cancelled: [],
  "RTO Initiated": ["RTO In Transit"],
  "RTO In Transit": ["RTO Delivered"],
  "RTO Delivered": [],
};

export default function DeliveryStatusModal({
  open,
  onClose,
  order,
  onSuccess,
}: Props) {
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [courierName, setCourierName] = useState("");
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [rtoReason, setRtoReason] = useState("");

  useEffect(() => {
    if (!order) return;

    setStatus(order.deliveryStatus);

    setTrackingId(order.trackingId || "");

    setCourierName(order.courierName || "");

    setExpectedDelivery(
      order.expectedDelivery
        ? order.expectedDelivery.slice(0, 10)
        : ""
    );

    setRtoReason(order.rtoReason || "");
  }, [order]);

  if (!open || !order) return null;

  const availableStatuses = [
  order.deliveryStatus,
  ...(ALLOWED_TRANSITIONS[order.deliveryStatus] || []),
];

  const handleUpdate = async () => {
    if (
  ["Shipped", "Out for Delivery"].includes(status) &&
  (!courierName.trim() || !trackingId.trim())
) {
  toast.error("Courier Name and Tracking ID are required.");
  return;
}

if (
  ["RTO Initiated", "RTO In Transit", "RTO Delivered"].includes(status) &&
  !rtoReason.trim()
) {
  toast.error("Please enter RTO reason.");
  return;
}
    try {
      
      setLoading(true);

      await API.patch(`/admin/udpatedelivery/${order._id}`, {
        deliveryStatus: status,
        trackingId,
        courierName,
        expectedDelivery,
        rtoReason,
      });

      toast.success("Delivery status updated");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (label: string) => {
    const item = STATUS_FLOW.find((s) => s.label === label);
    return item?.icon || Clock;
  };

  const getColor = (label: string) => {
    return STATUS_FLOW.find((s) => s.label === label)?.color || "var(--text-secondary)";
  };

  return (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
  
  <div className="w-full max-w-lg h-[95vh] sm:h-[90vh] rounded-2xl border bg-white shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary-light to-primary-light">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Update Delivery Status
            </h2>
            <p className="text-xs text-gray-500">
              Order #{order._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">

          {/* CURRENT STATUS CARD */}
          <div className="rounded-xl border bg-gray-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Current Status</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                {(() => {
                  const Icon = getIcon(status);
                  return <Icon size={18} color={getColor(status)} />;
                })()}
                {status}
              </p>
            </div>

            <div
              className="h-3 w-3 rounded-full"
              style={{ background: getColor(status) }}
            />
          </div>

          {/* SELECT STATUS */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Change Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border px-3 py-3 outline-none focus:ring-2 focus:ring-primary"
            >
              {STATUS_FLOW.filter((s) =>
  availableStatuses.includes(s.label)
).map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
            {/* Courier Details */}

            {["Shipped", "Out for Delivery"].includes(status) && (
              <div className="space-y-3 mt-4">

                <input
                  type="text"
                  placeholder="Courier Name"
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full rounded-xl border px-3 py-3"
                />

                <input
                  type="text"
                  placeholder="Tracking ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full rounded-xl border px-3 py-3"
                />

                <input
                  type="date"
                  value={expectedDelivery}
                  onChange={(e) => setExpectedDelivery(e.target.value)}
                  className="w-full rounded-xl border px-3 py-3"
                />

              </div>
            )}
            {[
              "RTO Initiated",
              "RTO In Transit",
              "RTO Delivered",
            ].includes(status) && (
                <div className="mt-4">

                  <textarea
                    rows={4}
                    placeholder="Enter RTO Reason..."
                    value={rtoReason}
                    onChange={(e) => setRtoReason(e.target.value)}
                    className="w-full rounded-xl border px-3 py-3 resize-none"
                  />

                </div>
              )}
          </div>

          {/* STATUS TIMELINE */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Status Flow
            </p>

            <div className="grid grid-cols-2 gap-2">
              {STATUS_FLOW.filter((s) =>
  availableStatuses.includes(s.label)
).map((s) => {
                const Icon = s.icon;
                const active = status === s.label;

                return (
                  <div
                    key={s.label}
                    onClick={() => setStatus(s.label)}
                    className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer transition
                      ${active ? "bg-primary-light border-primary" : "hover:bg-gray-50"}
                    `}
                  >
                    <Icon size={16} color={s.color} />
                    <span className="text-sm">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="rounded-xl border px-5 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-primary to-primary px-5 py-2 text-white font-medium disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}