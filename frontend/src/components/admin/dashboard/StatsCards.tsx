"use client";

import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

interface Props {
  loading: boolean;
  stats: {
    totalProducts: number;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
  };
}

export default function StatsCards({ stats, loading }: Props) {
  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="
              relative overflow-hidden
              rounded-2xl p-5
              bg-white
              shadow-md
              border border-gray-100
              hover:shadow-xl
              transition
            "
          >
            {/* gradient bg */}
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-30 bg-gradient-to-r ${card.gradient}`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-1">
                  {loading ? "..." : card.value}
                </h2>
              </div>

              <div
                className={`p-3 rounded-xl text-white bg-gradient-to-r ${card.gradient}`}
              >
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}