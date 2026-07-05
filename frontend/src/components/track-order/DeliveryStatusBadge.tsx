"use client";

import {
  CheckCircle2,
  Clock3,
  Truck,
  Package,
  PackageCheck,
  Ban,
  CreditCard,
  AlertCircle,
} from "lucide-react";

interface Props {
  status: string;
  payment?: boolean;
}

export default function DeliveryStatusBadge({
  status,
  payment = false,
}: Props) {
  const value = status?.toLowerCase();

  let bg = "#E5E7EB";
  let color = "#6B7280";
  let Icon = AlertCircle;

  // ================= PAYMENT =================

  if (payment) {
    switch (value) {
      case "success":
      case "paid":
        bg = "#DCFCE7";
        color = "#15803D";
        Icon = CheckCircle2;
        break;

      case "pending":
        bg = "#FEF3C7";
        color = "#B45309";
        Icon = Clock3;
        break;

      case "failed":
        bg = "#FEE2E2";
        color = "#DC2626";
        Icon = Ban;
        break;

      default:
        bg = "#DBEAFE";
        color = "#1D4ED8";
        Icon = CreditCard;
    }
  }

  // ================= DELIVERY =================

  else {
    switch (value) {
      case "pending":
        bg = "#FEF3C7";
        color = "#B45309";
        Icon = Clock3;
        break;

      case "processing":
        bg = "#DBEAFE";
        color = "#2563EB";
        Icon = Package;
        break;

      case "packed":
        bg = "#EDE9FE";
        color = "#7C3AED";
        Icon = PackageCheck;
        break;

      case "shipped":
        bg = "#CFFAFE";
        color = "#0891B2";
        Icon = Truck;
        break;

      case "out for delivery":
      case "out_for_delivery":
        bg = "#FFEDD5";
        color = "#EA580C";
        Icon = Truck;
        break;

      case "delivered":
        bg = "#DCFCE7";
        color = "#15803D";
        Icon = CheckCircle2;
        break;

      case "cancelled":
        bg = "#FEE2E2";
        color = "#DC2626";
        Icon = Ban;
        break;

      case "rto initiated":
      case "rto_initiated":
        bg = "#FEE2E2";
        color = "#DC2626";
        Icon = Truck;
        break;

      case "rto in transit":
      case "rto_in_transit":
        bg = "#FFE4E6";
        color = "#E11D48";
        Icon = Truck;
        break;

      case "rto delivered":
      case "rto_delivered":
        bg = "#FECACA";
        color = "#B91C1C";
        Icon = Ban;
        break;

      default:
        bg = "#F3F4F6";
        color = "#6B7280";
        Icon = AlertCircle;
    }
  }

  return (
    <span
      className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      text-sm
      font-semibold
      transition-all
      duration-300
      hover:scale-105
      shadow-sm
      "
      style={{
        background: bg,
        color,
      }}
    >
      <Icon size={16} />

      {status
        ?.replaceAll("_", " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase())}
    </span>
  );
}