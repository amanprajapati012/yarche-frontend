"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers3,
  ShoppingBag,
  Users,
  ImageIcon,
  Settings,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

export default function Sidebar({ open, setOpen }: any) {
  const pathname = usePathname();
  const [tagOpen, setTagOpen] = useState(false);

  const menu = [
    {
      title: "MAIN",
      items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
    },
    {
      title: "MANAGEMENT",
      items: [
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Categories", href: "/admin/categories", icon: FolderTree },
        { name: "SubCategories", href: "/admin/subcategories", icon: FolderTree },
        { name: "Collections", href: "/admin/collections", icon: Layers3 },
      ],
    },
    {
      title: "COMMERCE",
      items: [
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Discounts", href: "/admin/discounts", icon: Trophy },
      ],
    },
    {
      title: "CONTENT",
      items: [
        { name: "Banners", href: "/admin/banners", icon: ImageIcon },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  const productTags = [
    { name: "New Arrival", href: "/admin/product-tags/new-arrival", icon: Sparkles },
    { name: "Featured", href: "/admin/product-tags/featured-products", icon: Star },
    { name: "Top Products", href: "/admin/product-tags/top-products", icon: TrendingUp },
    { name: "Best Seller", href: "/admin/product-tags/best-seller", icon: Trophy },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-[#1f130b]
          text-white
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <h1 className="font-bold text-lg">Yarche Commerce Hub</h1>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* MENU */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-5rem)] sidebar-scroll">
          {menu.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] text-white/40 mb-2 tracking-widest">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)} // ✅ auto close sidebar
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        relative transition
                        ${isActive(item.href)
                          ? "bg-surface text-[#1f130b]"
                          : "hover:bg-white/10"
                        }
                      `}
                    >
                      {isActive(item.href) && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-yellow-400 rounded-r" />
                      )}

                      <Icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* PRODUCT TAGS */}
          <div>
            <button
              onClick={() => setTagOpen(!tagOpen)}
              className="flex w-full items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <Layers3 size={18} />
                Product Tags
              </div>
              {tagOpen ? <ChevronDown /> : <ChevronRight />}
            </button>

            {tagOpen && (
              <div className="ml-6 mt-2 space-y-1">
                {productTags.map((tag) => {
                  const Icon = tag.icon;

                  return (
                    <Link
                      key={tag.href}
                      href={tag.href}
                      onClick={() => setOpen(false)} // ✅ auto close
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                        ${isActive(tag.href)
                          ? "bg-surface text-[#1f130b]"
                          : "hover:bg-white/10"
                        }
                      `}
                    >
                      <Icon size={14} />
                      {tag.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SCROLLBAR STYLE */}
        <style jsx>{`
          .sidebar-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .sidebar-scroll::-webkit-scrollbar-track {
            background: #1f130b;
          }

          .sidebar-scroll::-webkit-scrollbar-thumb {
            background: #1f130b; /* same as sidebar */
            border-radius: 10px;
          }

          .sidebar-scroll {
            scrollbar-color: #1f130b #1f130b; /* Firefox */
            scrollbar-width: thin;
          }
        `}</style>
      </aside>
    </>
  );
}