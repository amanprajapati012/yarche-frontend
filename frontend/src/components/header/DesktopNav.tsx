"use client";

import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";

interface Props {
  categories: string[];
  navLinks: {
    name: string;
    href: string;
  }[];
}

export default function DesktopNav({
  categories,
  navLinks,
}: Props) {
  return (
    <nav className="hidden md:flex items-center px-4 md:px-8">
      {/* Categories Dropdown */}
      <div className="relative group">
        <button className="bg-footer text-[#FFF6E2] px-6 py-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
          <IconMenu2 size={18} />
          Shop By Categories
        </button>

        <div className="absolute top-full left-0 w-64 bg-background shadow-xl border border-[#28170D]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {categories.map((cat) => (
  <Link
    key={cat}
    href={`/categories/${encodeURIComponent(cat)}`}
    className="block px-6 py-3 text-sm text-foreground hover:bg-[#F5E9CC] border-b border-[#28170D]/5"
  >
    {cat}
  </Link>
))}
        </div>
      </div>

      {/* Navigation Links */}
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="px-6 py-4 text-sm font-semibold text-foreground hover:text-foreground/70 transition-all"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}