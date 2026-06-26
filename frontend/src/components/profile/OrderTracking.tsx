"use client";

import {
  CheckCircle,
  Package,
  Truck,
  Home,
} from "lucide-react";

export default function OrderTracking() {
  const steps = [
    {
      title: "Order Placed",
      icon: CheckCircle,
      completed: true,
    },
    {
      title: "Packed",
      icon: Package,
      completed: true,
    },
    {
      title: "Shipped",
      icon: Truck,
      completed: true,
    },
    {
      title: "Delivered",
      icon: Home,
      completed: false,
    },
  ];

  return (
    <div
      id="tracking"
      className="bg-white rounded-3xl p-6"
    >
      <h2 className="text-xl font-bold mb-8">
        Track Order
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-8">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 relative"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <Icon size={24} />
              </div>

              <h4 className="font-semibold mt-3">
                {step.title}
              </h4>

              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-full h-[2px] bg-green-400" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}