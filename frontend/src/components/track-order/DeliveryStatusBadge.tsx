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

  let bg = "var(--surface-3)";
  let color = "var(--text-secondary)";
  let Icon = AlertCircle;

  // ================= PAYMENT =================

  if (payment) {
    switch (value) {
      case "success":
      case "paid":
        bg = "var(--success-light)";
        color = "var(--success)";
        Icon = CheckCircle2;
        break;

      case "pending":
        bg = "var(--warning-light)";
        color = "var(--primary-dark)";
        Icon = Clock3;
        break;

      case "failed":
        bg = "var(--error-light)";
        color = "var(--error)";
        Icon = Ban;
        break;

      default:
        bg = "var(--info-light)";
        color = "var(--info)";
        Icon = CreditCard;
    }
  }

  // ================= DELIVERY =================

  else {
    switch (value) {
      case "pending":
        bg = "var(--warning-light)";
        color = "var(--primary-dark)";
        Icon = Clock3;
        break;

      case "processing":
        bg = "var(--info-light)";
        color = "var(--info)";
        Icon = Package;
        break;

      case "packed":
        bg = "var(--info-light)";
        color = "var(--info)";
        Icon = PackageCheck;
        break;

      case "shipped":
        bg = "var(--info-light)";
        color = "var(--info)";
        Icon = Truck;
        break;

      case "out for delivery":
      case "out_for_delivery":
        bg = "var(--footer-heading)";
        color = "var(--primary-dark)";
        Icon = Truck;
        break;

      case "delivered":
        bg = "var(--success-light)";
        color = "var(--success)";
        Icon = CheckCircle2;
        break;

      case "cancelled":
        bg = "var(--error-light)";
        color = "var(--error)";
        Icon = Ban;
        break;

      case "rto initiated":
      case "rto_initiated":
        bg = "var(--error-light)";
        color = "var(--error)";
        Icon = Truck;
        break;

      case "rto in transit":
      case "rto_in_transit":
        bg = "var(--error-light)";
        color = "var(--error)";
        Icon = Truck;
        break;

      case "rto delivered":
      case "rto_delivered":
        bg = "var(--border)";
        color = "var(--error)";
        Icon = Ban;
        break;

      default:
        bg = "var(--background)";
        color = "var(--text-secondary)";
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