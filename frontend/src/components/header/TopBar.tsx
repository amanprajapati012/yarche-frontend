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
import Image from "next/image";

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
      <Link href="/" className="flex items-center">
        <Image
          src="/logo3.png"
          alt="Yarche"
          width={300}
          height={120}
          priority
          className="h-16 md:h-20 w-auto object-contain"
        />
      </Link>

      {/* DESKTOP SEARCH */}
      <div
        ref={searchRef}
        className="hidden md:block flex-1 max-w-xl mx-8 relative"
      >
        <div className="flex bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
          <button className="flex items-center gap-1 px-4 text-sm font-medium border-r border-border bg-background text-foreground hover:bg-surface transition-colors">
            All Products
            <IconChevronDown size={14} />
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setOpenSearch(true)}
            className="flex-1 bg-surface px-4 py-3 outline-none text-sm text-foreground placeholder:text-text-secondary"
            placeholder="What are you looking for?"
          />

          <button className="bg-footer hover:opacity-90 px-5 text-white transition-colors">
            <IconSearch size={20} />
          </button>
        </div>

        {openSearch && (
          <div className="absolute top-[110%] left-0 w-full z-[9999] bg-background border border-[#28170D]/10 rounded-xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-4 text-center text-foreground">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-foreground">
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
                      <h4 className="font-medium text-foreground truncate">
                        {product.product_name}
                      </h4>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-bold text-foreground">
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
          className="md:hidden text-foreground"
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
              <div className="w-10 h-10 rounded-full bg-footer text-[#FFF6E2] flex items-center justify-center font-semibold text-sm overflow-hidden">
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

              <div className="text-xs text-foreground hidden lg:block">
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
                className="text-foreground"
              />

              <div className="text-xs text-foreground">
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
            className="relative text-foreground"
          >
            <IconShoppingCart size={24} />

            <span className="absolute -top-1.5 -right-1.5 bg-footer text-[#FFF6E2] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartItems.length > 9 ? "9+" : cartItems.length}
            </span>
          </Link>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsDrawerOpen(true)}
          >
            <IconMenu2 size={28} />
          </button>

        </div>


      </div>
    </div>
  );
}