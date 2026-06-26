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
      document.removeEventListener(
        "mousedown",
        handler
      );
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
    <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-5">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-[#28170D] rounded-full flex items-center justify-center text-[#FFF6E2] font-serif font-bold text-xl tracking-tight">
          Y
        </div>

        <span className="text-3xl font-bold tracking-tighter text-[#28170D]">
          YARCHE
        </span>
      </Link>

      {/* DESKTOP SEARCH */}
      <div
        ref={searchRef}
        className="hidden md:block flex-1 max-w-xl mx-8 relative"
      >
        <div className="flex bg-white border border-[#28170D]/20 rounded-md overflow-hidden">
          <button className="flex items-center gap-1 px-4 text-sm font-medium border-r border-[#28170D]/10 text-[#28170D]">
            All products
            <IconChevronDown size={14} />
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setOpenSearch(true)}
            className="flex-1 px-4 py-2.5 outline-none text-sm placeholder:text-gray-400"
            placeholder="What are you looking for?"
          />

          <button className="bg-[#28170D] px-5 text-white">
            <IconSearch size={20} />
          </button>
        </div>

        {openSearch && (
          <div className="absolute top-[110%] left-0 w-full z-[9999] bg-[#FFF6E2] border border-[#28170D]/10 rounded-xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-4 text-center text-[#28170D]">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-[#28170D]">
                No products found
              </div>
            ) : (
              <div className="max-h-[320px] overflow-y-auto">
                {results.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    onClick={() => {
                      setOpenSearch(false);
                      setQuery("");
                    }}
                    className="flex gap-3 p-3 border-b border-[#28170D]/5 hover:bg-[#F5E9CC] transition-all duration-200"
                  >
                    <img
                      src={
                        product.images?.[0]
                          ? `${IMAGE_BASE}${product.images[0]}`
                          : "/placeholder.png"
                      }
                      alt={product.product_name}
                      className="w-14 h-14 rounded-lg object-cover bg-white"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#28170D] truncate">
                        {product.product_name}
                      </h4>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-bold text-[#28170D]">
                          ₹{product.discountedPrice || product.price}
                        </span>

                        {product.discountedPrice && product.price && (
                          <span className="line-through text-gray-500 text-xs">
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


      {/* ICONS */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-[#28170D]"
          onClick={() => setShowSearch(true)}
        >
          <IconSearch size={28} />
        </button>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Link
              href="/account/profile"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#28170D] text-[#FFF6E2] flex items-center justify-center font-semibold text-sm overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <div className="text-xs text-[#28170D] hidden lg:block">
                <p>Welcome</p>
                <p className="font-bold group-hover:underline">
                  {user.name}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2"
            >
              <IconUser
                size={24}
                className="text-[#28170D]"
              />

              <div className="text-xs text-[#28170D]">
                <p>Welcome</p>
                <p className="font-bold">Log in</p>
              </div>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">



          {/* user login section */}

          <Link
            href="/cart"
            className="relative text-[#28170D]"
          >
            <IconShoppingCart size={24} />

            <span className="absolute -top-1.5 -right-1.5 bg-[#28170D] text-[#FFF6E2] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartItems.length > 9 ? "9+" : cartItems.length}
            </span>
          </Link>

          <button
            className="md:hidden text-[#28170D]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <IconMenu2 size={28} />
          </button>

        </div>


      </div>
    </div>
  );
}