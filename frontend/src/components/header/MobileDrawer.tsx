"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconChevronRight,
  IconX,
  IconUser,
  IconPackage,
  IconHeart,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandWhatsapp,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";

interface Props {
  user: any;
  logout: () => void;

  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;

  showCategories: boolean;
  setShowCategories: (value: boolean) => void;

  categories: string[];

  navLinks: {
    name: string;
    href: string;
  }[];
}

export default function MobileDrawer({
  user,
  logout,

  isDrawerOpen,
  setIsDrawerOpen,

  showCategories,
  setShowCategories,

  categories,
  navLinks,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-[2000] md:hidden ${isDrawerOpen ? "visible" : "invisible"
        }`}
    >
      {/* Overlay */}

      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer */}

      <div
        className={`absolute left-0 top-0 h-full w-[86%] bg-[#FCF9F5] shadow-2xl transform transition-transform duration-300 flex flex-col ${isDrawerOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-[#3A2315] via-[#5A3824] to-[#7A5333] text-white px-5 pt-6 pb-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold tracking-wider">
                YARCHE
              </h2>

              <p className="text-xs text-white/70 mt-1">
                Premium Fashion Store
              </p>

            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <IconX size={22} />
            </button>

          </div>

          {/* User Card */}

          {user ? (
            <Link
              href="/account/profile"
              onClick={() => setIsDrawerOpen(false)}
              className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur p-4"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex items-center justify-center text-xl font-bold">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase()
                )}

              </div>

              <div>

                <p className="text-xs text-white/70">
                  Welcome Back
                </p>

                <h3 className="font-semibold text-lg">
                  {user.name}
                </h3>

                <p className="text-xs text-white/60">
                  Manage your account
                </p>

              </div>

            </Link>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setIsDrawerOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-[#4B2E1E] font-semibold"
            >
              <IconLogin size={18} />
              Login / Register
            </Link>
          )}
        </div>

        {/* Scroll Area */}

        <div className="flex-1 overflow-y-auto px-3 py-3">

          {!showCategories ? (
            <>

              {user && (
                <>

                  <Link
                    href="/account/profile"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-[#F5EEE6] transition"
                  >
                    <IconUser size={22} />
                    <span className="font-medium">
                      My Profile
                    </span>
                  </Link>

                  <Link
                    href="/account/orders"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-[#F5EEE6] transition"
                  >
                    <IconPackage size={22} />
                    <span className="font-medium">
                      My Orders
                    </span>
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-[#F5EEE6] transition"
                  >
                    <IconHeart size={22} />
                    <span className="font-medium">
                      Wishlist
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-4 rounded-xl px-4 py-4 hover:bg-red-50 text-red-600 transition"
                  >
                    <IconLogout size={22} />
                    <span className="font-medium">
                      Logout
                    </span>
                  </button>

                  <div className="my-3 border-t border-[#e9dfd5]" />

                </>
              )}

              <button
                onClick={() => setShowCategories(true)}
                className="w-full flex items-center justify-between rounded-xl px-4 py-4 hover:bg-[#F5EEE6] transition font-semibold"
              >
                Shop By Categories

                <IconChevronRight size={20} />
              </button>

              <div className="mt-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-[15px] font-medium text-[#2E2017] hover:bg-[#F5EEE6] transition-all duration-200"
                  >
                    {link.name}
                    <IconChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowCategories(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-4 font-semibold hover:bg-[#F5EEE6] transition"
              >
                <IconArrowLeft size={20} />
                Back
              </button>

              <div className="mt-2 space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${encodeURIComponent(cat)}`}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setShowCategories(false);
                    }}
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-[15px] hover:bg-[#F5EEE6] transition"
                  >
                    {cat}
                    <IconChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom Section */}

        <div className="border-t border-[#E8DDD0] px-5 py-5 bg-white">

          <p className="text-xs uppercase tracking-[2px] text-gray-500 font-semibold mb-4">
            Follow Us
          </p>

          <div className="flex items-center justify-between">

            <a
              href="https://instagram.com/"
              target="_blank"
              className="w-12 h-12 rounded-full bg-[#F5EEE6] flex items-center justify-center hover:bg-[#E8D7C6] transition"
            >
              <IconBrandInstagram size={22} />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              className="w-12 h-12 rounded-full bg-[#F5EEE6] flex items-center justify-center hover:bg-[#E8D7C6] transition"
            >
              <IconBrandFacebook size={22} />
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              className="w-12 h-12 rounded-full bg-[#F5EEE6] flex items-center justify-center hover:bg-[#E8D7C6] transition"
            >
              <IconBrandYoutube size={22} />
            </a>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="w-12 h-12 rounded-full bg-[#F5EEE6] flex items-center justify-center hover:bg-[#E8D7C6] transition"
            >
              <IconBrandWhatsapp size={22} />
            </a>

          </div>

          <div className="mt-5 text-center">

            <h3 className="font-bold tracking-widest text-[#3A2315]">
              YARCHE
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Premium Fashion Store
            </p>

            <p className="text-[11px] text-gray-400 mt-3">
              © 2026 Yarche. All Rights Reserved.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
