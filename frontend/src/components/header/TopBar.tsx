"use client";

import Link from "next/link";
import {
  IconMenu2,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconChevronDown,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/src/lib/image";

import API from "@/src/lib/api";

interface Props {
  user: any;
  logout: () => void;
  cartItems: any[];
  setShowSearch: (value: boolean) => void;
  setIsDrawerOpen: (value: boolean) => void;
}

export default function TopBar({
  user,
  logout,
  cartItems,
  setShowSearch,
  setIsDrawerOpen,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const IMAGE_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const value = query.trim();

      if (!value) {
        setResults([]);
        setOpenSearch(false);
        return;
      }

      try {
        setLoading(true);

        const slug = value.replace(/\s+/g, "-");

        const res = await API.get(`/search/${slug}`);

        setResults(res.data?.products || []);
        setOpenSearch(true);
      } catch (err) {
        console.log(err);
        setResults([]);
        setOpenSearch(false);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div
className="flex items-center justify-between h-[64px] lg:h-[88px] w-full border-b border-[#28170D]/10 bg-background px-4 lg:px-0">

      {/* LOGO */}
   <Link
  href="/"
  className="w-auto lg:w-[290px] h-full flex items-center justify-center lg:border-r border-[#28170D]/10 lg:pl-5"

>
       <Image
  src="/logo3.png"
  alt="Yarche"
  width={220}
  height={90}
  priority
  className="w-[100px] lg:w-[155px] h-auto object-contain"
/>
      </Link>

      {/* SEARCH */}
      <div
        ref={searchRef}
        className="hidden lg:flex flex-1 px-10 relative"
      >
        <div className="w-full h-[54px] flex rounded-2xl overflow-hidden border border-[#E8D9C7] shadow-sm">

          <button className="w-[180px] bg-background border-r border-[#E8D9C7] flex items-center justify-center gap-2 font-medium">
            All Products
            <IconChevronDown size={16} />
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setOpenSearch(true)}
            placeholder="What are you looking for?"
            className="flex-1 px-6 outline-none bg-surface text-[15px]"
          />

          <button className="w-[120px] bg-footer text-white flex items-center justify-center hover:bg-[#241108] transition">
            <IconSearch size={22} />
          </button>
        </div>

        {openSearch && (
          <div className="absolute top-[64px] left-10 right-10 bg-background rounded-xl border border-[#28170D]/10 shadow-xl overflow-hidden z-[999]">

            {loading ? (
              <div className="p-5 text-center">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="p-5 text-center">
                No products found
              </div>
            ) : (
              <div className="max-h-[350px] overflow-y-auto">
                
                                {results.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={() => {
                      setOpenSearch(false);
                      setQuery("");
                    }}
                    className="flex gap-3 p-3 border-b border-[#28170D]/5 hover:bg-[#F5E9CC] transition"
                  >
                    <img
  src={getImageUrl(product.images?.[0])}
  alt={product.product_name || product.name}
  className="w-14 h-14 rounded-lg object-cover bg-white"
/>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                       {product.product_name || product.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold">
                          ₹{product.discountedPrice || product.price}
                        </span>

                        {product.discountedPrice && product.price && (
                          <span className="line-through text-xs text-gray-500">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div
        className="
          hidden
          lg:flex
          items-center
          gap-8
          px-8
          shrink-0
        "
      >
        {user ? (
          <Link
            href="/account/profile"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-footer text-[#FFF6E2] flex items-center justify-center font-bold overflow-hidden">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name?.charAt(0)?.toUpperCase()
              )}
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Welcome
              </p>

              <p className="font-semibold whitespace-nowrap">
                {user.name}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center gap-2"
          >
            <IconUser size={24} />

            <div>
              <p className="text-xs text-gray-500">
                Welcome
              </p>

              <p className="font-semibold">
                Log in
              </p>
            </div>
          </Link>
        )}

        <Link
          href="/cart"
          className="relative"
        >
          <IconShoppingCart size={30} />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-footer text-[#FFF6E2] text-[10px] flex items-center justify-center font-bold">
            {cartItems.length > 9 ? "9+" : cartItems.length}
          </span>
        </Link>
      </div>

      {/* MOBILE ICONS */}
      <div
  className="
    flex
    lg:hidden
    items-center
    gap-4
    px-4
    shrink-0
  "
>
        <button onClick={() => setShowSearch(true)}>
          <IconSearch size={26} />
        </button>

        <Link
          href="/cart"
          className="relative"
        >
          <IconShoppingCart size={28} />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-footer text-[#FFF6E2] text-[10px] flex items-center justify-center font-bold">
            {cartItems.length > 9 ? "9+" : cartItems.length}
          </span>
        </Link>

        <button
          onClick={() => setIsDrawerOpen(true)}
        >
          <IconMenu2 size={30} />
        </button>
      </div>
    </div>
  );
}
              