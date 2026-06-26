"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  LogOut,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  LayoutDashboard,
  CheckCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import API from "@/src/lib/api";
import { io } from "socket.io-client";

interface HeaderProps {
  setOpen: (value: boolean) => void;
}

export default function Header({ setOpen }: HeaderProps) {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  useEffect(() => {
    fetchNotifications();

    const socket = io(
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000"
    );

    socket.on(
      "new-notification",
      (notification) => {
        setNotifications((prev) => [
          notification,
          ...prev,
        ]);

        setUnreadCount((prev) => prev + 1);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get(
        "/admin/notifications"
      );

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const markAllRead = async () => {
    try {
      await API.put(
        "/admin/notifications/read-all"
      );

      setUnreadCount(0);

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/auth/login");
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-20
        border-b border-[#ead9b7]
        bg-[#fff0d3]/90
        backdrop-blur-xl
      "
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="
              lg:hidden
              rounded-xl
              p-2.5
              hover:bg-[#28170D]/5
              transition
            "
          >
            <Menu size={24} />
          </button>

          {/* Logo Badge */}
          <div
            className="
              hidden md:flex
              h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-[#28170D]
              text-white
              shadow-lg
            "
          >
            <ShoppingBag size={22} />
          </div>

          {/* Heading */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#28170D]">
                Yarche Commerce Hub
              </h1>

              <span
                className="
                  hidden md:flex
                  items-center gap-1
                  rounded-full
                  bg-green-100
                  px-2 py-1
                  text-[10px]
                  font-semibold
                  text-green-700
                "
              >
                <Sparkles size={10} />
                LIVE
              </span>
            </div>

            <p className="hidden md:flex items-center gap-2 text-xs text-[#28170D]/60 mt-1">
              <LayoutDashboard size={13} />
              Monitor sales, manage inventory, track orders &
              grow your handmade crockery business.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <div className="relative">
            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="
      relative
      rounded-xl
      p-3
      bg-white
      border border-[#ead9b7]
      hover:shadow-md
      transition
    "
            >
              <Bell size={20} />

              {unreadCount > 0 && (
                <span
                  className="
          absolute
          -top-2
          -right-2
          min-w-[20px]
          h-5
          px-1
          rounded-full
          bg-red-500
          text-white
          text-[10px]
          font-bold
          flex items-center justify-center
        "
                >
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="
        absolute
        right-0
        top-14
        w-[340px]
        max-w-[90vw]
        bg-white
        border border-[#ead9b7]
        rounded-3xl
        shadow-2xl
        overflow-hidden
        z-50
      "
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-bold text-[#28170D]">
                    Notifications
                  </h3>

                  {notifications.length > 0 && (
                    <button
                      onClick={markAllRead}
                      className="
              flex items-center gap-1
              text-xs
              font-semibold
              text-[#28170D]
            "
                    >
                      <CheckCheck size={14} />
                      Mark All Read
                    </button>
                  )}
                </div>

                <div className="max-h-[420px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell
                        size={30}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-3 text-sm text-gray-500">
                        No notifications yet
                      </p>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item._id}
                        className={`
                p-4 border-b last:border-b-0
                hover:bg-[#fff7e7]
                transition
                ${!item.read
                            ? "bg-[#fff9ef]"
                            : ""
                          }
              `}
                      >
                        <div className="flex items-start gap-3">
                          {!item.read && (
                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0" />
                          )}

                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-[#28170D]">
                              {item.title}
                            </h4>

                            <p className="text-xs text-gray-500 mt-1">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="
                flex items-center gap-3
                rounded-2xl
                border border-[#ead9b7]
                bg-white
                px-3 py-2
                hover:shadow-md
                transition
              "
            >
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  bg-[#28170D]
                  text-white
                  font-bold
                "
              >
                A
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[#28170D]">
                  Admin Panel
                </p>

                <p className="text-xs text-[#28170D]/60">
                  Store Administrator
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`hidden md:block transition-transform ${showProfile ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div
                className="
                  absolute right-0 sm:right-0
top-16
                  w-64
                  overflow-hidden
                  rounded-3xl
                  border border-[#ead9b7]
                  bg-white
                  shadow-2xl
                "
              >
                <div className="p-5 border-b">
                  <h3 className="font-semibold text-[#28170D]">
                    Welcome Back 👋
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Manage products, customers and orders from
                    one place.
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="
                    flex w-full items-center gap-3
                    px-5 py-4
                    text-red-600
                    hover:bg-red-50
                    transition
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}