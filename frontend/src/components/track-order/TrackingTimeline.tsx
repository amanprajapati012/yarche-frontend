"use client";

import {
    CheckCircle2,
    Circle,
    Clock3,
    Package,
    PackageCheck,
    Truck,
    Home,
    Ban,
} from "lucide-react";




interface TimelineItem {
    status: string;
    message: string;
    date: string;
}

interface Props {
    status: string;
    deliveryTimeline: TimelineItem[];
}
const steps = [
    {
        label: "Pending",
        icon: Clock3,
    },
    {
        label: "Processing",
        icon: Package,
    },
    {
        label: "Packed",
        icon: PackageCheck,
    },
    {
        label: "Shipped",
        icon: Truck,
    },
    {
        label: "Out for Delivery",
        icon: Truck,
    },
    {
        label: "Delivered",
        icon: Home,
    },
    { label: "RTO Initiated", icon: Truck },
    { label: "RTO In Transit", icon: Truck },
    { label: "RTO Delivered", icon: PackageCheck },
];

export default function TrackingTimeline({
    status,
    deliveryTimeline,
}: Props) {
    const currentIndex = steps.findIndex(
        (item) =>
            item.label.toLowerCase() ===
            status.toLowerCase()
    );

    const isCancelled =
        status === "Cancelled";

    return (
        <div
            className="
      rounded-[30px]
      border
      p-8
      shadow-lg
      "
            style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
            }}
        >
            <div className="flex items-center justify-between">

                <div>

                    <h2
                        className="text-3xl font-bold"
                        style={{
                            color: "var(--foreground)",
                        }}
                    >
                        Order Tracking
                    </h2>

                    <p
                        className="mt-2"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        Follow every stage of your order.
                    </p>

                </div>

                {!isCancelled && (
                    <div
                        className="
            px-5
            py-2
            rounded-full
            text-sm
            font-semibold
            animate-pulse
            "
                        style={{
                            background: "#DCFCE7",
                            color: "#15803d",
                        }}
                    >
                        {status}
                    </div>
                )}

                {isCancelled && (
                    <div
                        className="
            px-5
            py-2
            rounded-full
            text-sm
            font-semibold
            "
                        style={{
                            background: "#FEE2E2",
                            color: "#DC2626",
                        }}
                    >
                        Cancelled
                    </div>
                )}
            </div>

            {/* Timeline */}

            <div className="mt-12 relative">

                {steps.map((step, index) => {
                    const timelineItem = deliveryTimeline.find(
                        (item) =>
                            item.status.trim().toLowerCase() ===
                            step.label.trim().toLowerCase()
                    );
                    console.log(step.label);
                    console.log(deliveryTimeline);
                    console.log(
                        deliveryTimeline.find(
                            (item) =>
                                item.status.trim().toLowerCase() ===
                                step.label.trim().toLowerCase()
                        )
                    );

                    const Icon = step.icon;

                    const completed = index < currentIndex;

                    const active = index === currentIndex;


                    return (
                        <div
                            key={step.label}
                            className="relative flex gap-5 pb-12 last:pb-0"
                        >
                            {/* Line */}

                            {index !==
                                steps.length - 1 && (
                                    <div
                                        className="absolute left-[21px] top-12 w-[3px] h-full"
                                        style={{
                                            background:
                                                completed ||
                                                    active
                                                    ? "#22C55E"
                                                    : "#E5E7EB",
                                        }}
                                    />
                                )}

                            {/* Icon */}

                            <div
                                className={`
                relative
                z-10
                h-11
                w-11
                rounded-full
                flex
                items-center
                justify-center
                transition-all
                duration-500
                ${active
                                        ? "animate-pulse scale-110"
                                        : ""
                                    }
                `}
                                style={{
                                    background: completed
                                        ? "#22C55E"
                                        : active
                                            ? "#C58B63"
                                            : "#F5F5F5",

                                    color:
                                        completed || active
                                            ? "#fff"
                                            : "#999",
                                }}
                            >
                                {completed ? (
                                    <CheckCircle2 size={22} />
                                ) : (
                                    <Icon size={20} />
                                )}
                            </div>

                            {/* Text */}

                            <div className="pt-1">

                                <h3
                                    className="font-bold text-lg"
                                    style={{
                                        color:
                                            completed ||
                                                active
                                                ? "var(--foreground)"
                                                : "#999",
                                    }}
                                >
                                    {step.label}
                                </h3>

                                <p
                                    className="mt-1 text-sm"
                                    style={{
                                        color:
                                            completed || active
                                                ? "var(--text-secondary)"
                                                : "#B0B0B0",
                                    }}
                                >
                                    {timelineItem
                                        ? timelineItem.message
                                        : step.label === "Pending"
                                            ? "Order has been placed successfully."
                                            : "Waiting for update"}
                                </p>
                                {timelineItem ? (
                                    <p className="mt-1 text-xs text-gray-500">
                                        {new Date(timelineItem.date).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                ) : step.label === "Pending" ? (
                                    <p className="mt-1 text-xs text-gray-500">
                                        Order Created
                                    </p>
                                ) : null}

                            </div>
                        </div>
                    );
                })}

                {isCancelled && (
                    <div
                        className="
            mt-10
            rounded-2xl
            border
            p-5
            "
                        style={{
                            background: "#FEF2F2",
                            borderColor: "#FCA5A5",
                        }}
                    >
                        <div className="flex gap-3">

                            <Ban
                                className="text-red-600"
                                size={26}
                            />

                            <div>

                                <h3 className="font-bold text-red-600">
                                    Order Cancelled
                                </h3>

                                <p className="text-sm text-red-500 mt-2">
                                    This order has been
                                    cancelled. If payment
                                    was completed, refund
                                    will be processed
                                    according to our
                                    policy.
                                </p>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}