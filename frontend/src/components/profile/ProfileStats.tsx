"use client";

import Link from "next/link";
import {
  User,
  MapPin,
  Package,
  Truck,
  Heart,
  LogOut,
} from "lucide-react";

export default function ProfileSidebar() {
  const menus = [
    {
      name: "My Profile",
      icon: User,
      href: "/profile",
    },
    {
      name: "Address Book",
      icon: MapPin,
      href: "#address",
    },
    {
      name: "My Orders",
      icon: Package,
      href: "#orders",
    },
    {
      name: "Track Orders",
      icon: Truck,
      href: "#tracking",
    },
    {
      name: "Wishlist",
      icon: Heart,
      href: "/wishlist",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm h-fit sticky top-5">

      <h3 className="font-bold text-xl mb-5">
        Dashboard
      </h3>

      <div className="space-y-2">

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-background transition"
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}