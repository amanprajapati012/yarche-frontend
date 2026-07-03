"use client";

import { useEffect, useState } from "react";
import { X, Truck, PackageCheck, Package, Clock, Ban, CheckCircle2 } from "lucide-react";
import API from "@/src/lib/api";
import { toast } from "sonner";

type Order = {
  _id: string;
  orderId: string;
  deliveryStatus: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onSuccess?: () => void;
};

const STATUS_FLOW = [
  { label: "Pending", icon: Clock, color: "#f59e0b" },
  { label: "Processing", icon: Package, color: "#3b82f6" },
  { label: "Packed", icon: PackageCheck, color: "#8b5cf6" },
  { label: "Shipped", icon: Truck, color: "#06b6d4" },
  { label: "Out for Delivery", icon: Truck, color: "#f97316" },
  { label: "Delivered", icon: CheckCircle2, color: "#16a34a" },
  { label: "Cancelled", icon: Ban, color: "#ef4444" },
];

export default function DeliveryStatusModal({
  open,
  onClose,
  order,
  onSuccess,
}: Props) {
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) setStatus(order.deliveryStatus);
  }, [order]);

  if (!open || !order) return null;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await API.patch(`/orders/${order._id}/delivery-status`, {
        deliveryStatus: status,
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
    return STATUS_FLOW.find((s) => s.label === label)?.color || "#6b7280";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border bg-white shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-amber-50">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Update Delivery Status
            </h2>
            <p className="text-xs text-gray-500">
              Order #{order.orderId}
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
        <div className="p-6 space-y-5">

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
              className="w-full rounded-xl border px-3 py-3 outline-none focus:ring-2 focus:ring-orange-300"
            >
              {STATUS_FLOW.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* STATUS TIMELINE */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Status Flow
            </p>

            <div className="grid grid-cols-2 gap-2">
              {STATUS_FLOW.map((s) => {
                const Icon = s.icon;
                const active = status === s.label;

                return (
                  <div
                    key={s.label}
                    onClick={() => setStatus(s.label)}
                    className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer transition
                      ${active ? "bg-orange-50 border-orange-300" : "hover:bg-gray-50"}
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
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-white font-medium disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}