"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";

import {
  User,
  Package,
  MapPin,
  LogOut,
} from "lucide-react";

const menus = [
  {
    name: "Profile",
    icon: User,
    href: "/account/profile",
  },
  {
    name: "Orders",
    icon: Package,
    href: "/account/orders",
  },
  {
    name: "Addresses",
    icon: MapPin,
    href: "/account/addresses",
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");

    router.push("/auth/login");
  };

  return (
    <aside
      className="
      w-full
      lg:w-[280px]
      shrink-0
      bg-surface
      border
      border-[#28170d]/10
      rounded-[32px]
      overflow-hidden
      shadow-[0_15px_40px_rgba(40,23,13,0.08)]
      "
    >
      {/* Header */}

      <div className="p-6 border-b border-[#28170d]/10">
        <h2 className="text-xl font-bold text-foreground">
          My Account
        </h2>

        <p className="text-sm text-foreground/60 mt-1">
          Manage your account
        </p>
      </div>

      {/* Menus */}

      <div className="p-4">
        <div className="space-y-2">

          {menus.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                flex
                items-center
                gap-3
                px-4
                py-3.5
                rounded-2xl
                transition-all
                duration-300

                ${
                  active
                    ? `
                      bg-footer
                      text-white
                      shadow-lg
                    `
                    : `
                      text-foreground
                      hover:bg-background
                    `
                }
              `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}

      <div className="p-4 pt-0">
        <button
          onClick={handleLogout}
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3.5
          rounded-2xl

          text-red-600
          bg-red-50

          hover:bg-red-100
          transition
          "
        >
          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}