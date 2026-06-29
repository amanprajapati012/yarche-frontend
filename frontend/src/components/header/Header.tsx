"use client";

import { useEffect, useState } from "react";

import API from "@/src/lib/api";

import { useAuthStore } from "@/src/store/authStore";
import { useCartStore } from "@/src/store/cartStore";

import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import MobileSearch from "./MobileSearch";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const cartItems = useCartStore((state) => state.items);

  const [categories, setCategories] = useState<string[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Collections", href: "/collections" },
    { name: "Happy Customers", href: "/customers" },
    { name: "Get Support", href: "/support" },
    { name: "Our Story", href: "/story" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/productcategories");

        const data =
          res.data?.data?.map(
            (item: any) => item.category
          ) || [];

        setCategories(data);
      } catch (error) {
        console.error("Category Error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="w-full bg-background sticky top-0 z-[1000] border-b border-[#28170D]/10">
      <div className="max-w-[1440px] mx-auto">
        <TopBar
          user={user}
          logout={logout}
          cartItems={cartItems}
          setShowSearch={setShowSearch}
          setIsDrawerOpen={setIsDrawerOpen}
        />

        <DesktopNav
          categories={categories}
          navLinks={navLinks}
        />
      </div>

      <MobileSearch
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        categories={categories}
        navLinks={navLinks}
      />
    </header>
  );
}