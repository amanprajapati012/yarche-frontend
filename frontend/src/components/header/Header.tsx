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

const [categories, setCategories] = useState<any[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "New Arrivals", href: "/new-arrivals" },


    { name: "Get Support", href: "/support" },
    { name: "Our Story", href: "/our-story" },
  ];

 
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await API.get("/productcategories");

      const data =
        res.data?.data || [];

      setCategories(data);
    } catch (error) {
      console.error("Category Error:", error);
    }
  };

  fetchCategories();
}, []);


  return (
    <>
      <header
        className={`
          w-full
          bg-background
          sticky
          top-0
          z-[1000]
          border-b
          border-foreground/10
          transition-shadow
          duration-300
          ${scrolled ? "shadow-[0_6px_24px_rgba(40,23,13,0.08)]" : ""}
        `}
      >
        <div className="max-w-[1440px] mx-auto">

          <TopBar
  user={user}
  logout={logout}
  cartItems={cartItems}
  setShowSearch={setShowSearch}
  setIsDrawerOpen={setIsDrawerOpen}
  categories={categories}
/>


          {/* Navbar only */}
          <DesktopNav
            categories={categories}
            navLinks={navLinks}
          />

        </div>


       <MobileSearch
  showSearch={showSearch}
  setShowSearch={setShowSearch}
  categories={categories}
/>


        <MobileDrawer
          user={user}
          logout={logout}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          showCategories={showCategories}
          setShowCategories={setShowCategories}
          categories={categories}
          navLinks={navLinks}
        />

      </header>
    </>
  );
}