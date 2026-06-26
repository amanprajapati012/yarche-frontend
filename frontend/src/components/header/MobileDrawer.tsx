"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";

interface Props {
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
  isDrawerOpen,
  setIsDrawerOpen,
  showCategories,
  setShowCategories,
  categories,
  navLinks,
}: Props) {
  return (
    <div
      className={`fixed inset-0 z-[2000] md:hidden ${
        isDrawerOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div
        className={`absolute left-0 top-0 h-full w-[85%] bg-[#FFF6E2] transform transition-transform duration-300 ${
          isDrawerOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#28170D]/10">
          <span className="text-xl font-bold text-[#28170D]">
            YARCHE
          </span>

          <button onClick={() => setIsDrawerOpen(false)}>
            <IconX size={28} />
          </button>
        </div>

        <div className="p-2">
          {!showCategories ? (
            <>
              <button
                onClick={() => setShowCategories(true)}
                className="w-full flex items-center justify-between p-4 text-lg font-bold border-b border-[#28170D]/10 text-[#28170D]"
              >
                Shop By Categories
                <IconChevronRight size={20} />
              </button>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block p-4 text-lg font-medium border-b border-[#28170D]/5 text-[#28170D]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </>
          ) : (
            <>
              <button
                onClick={() => setShowCategories(false)}
                className="flex items-center gap-2 p-4 text-lg font-bold border-b border-[#28170D]/10 text-[#28170D]"
              >
                <IconArrowLeft size={20} />
                Back
              </button>

              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="block p-4 text-lg border-b border-[#28170D]/5 text-[#28170D]"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}