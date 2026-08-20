"use client";

import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Category {
  _id: string;
  category: string;
  images?: any[];
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  categories: Category[];
  navLinks: {
    name: string;
    href: string;
  }[];
}

export default function DesktopNav({
  categories,
  navLinks,
}: Props) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  const [hoverOpen, setHoverOpen] = useState(false);

  return (
    <nav
      className="
        hidden
        lg:flex
        w-full
        bg-background
        border-t
        border-foreground/10
      "
    >
      {/* ============================================================
          LEFT CATEGORY BUTTON
          ============================================================ */}

      <div
        className="relative w-[290px] shrink-0"
        onMouseEnter={() => {
          if (!isHome) {
            setHoverOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (!isHome) {
            setHoverOpen(false);
          }
        }}
      >
        <button
          className="
            w-full
            h-[64px]
            bg-footer
            text-footer-text
            flex
            items-center
            gap-3
            px-6
            text-[15px]
            font-bold
            uppercase
            tracking-wide
          "
        >
          <IconMenu2 size={20} />
          Shop By Categories
        </button>

        {/* ============================================================
            CATEGORY DROPDOWN
            ============================================================ */}

        {!isHome && hoverOpen && (
          <div
            className="
              absolute
              top-full
              left-0
              w-full
              bg-background
              border
              border-foreground/10
              shadow-lg
              z-50
            "
          >
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/categories/${encodeURIComponent(
                  cat.category
                )}`}
                className="
                  block
                  px-6
                  py-4
                  text-[15px]
                  border-b
                  border-foreground/5
                  hover:bg-footer-heading
                  transition
                "
              >
                {cat.category}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================
          RIGHT NAVIGATION LINKS
          ============================================================ */}

      <div
        className="
          flex-1
          h-[64px]
          flex
          items-center
          justify-around
        "
      >
        {navLinks.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                relative
                h-full
                flex
                items-center
                px-5
                font-semibold
                transition-colors

                after:content-['']
                after:absolute
                after:left-5
                after:right-5
                after:bottom-0
                after:h-[2.5px]
                after:rounded-full
                after:bg-primary
                after:origin-left
                after:scale-x-0
                after:transition-transform
                after:duration-300

                hover:text-primary
                hover:after:scale-x-100

                ${
                  active
                    ? "text-primary after:scale-x-100"
                    : ""
                }
              `}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}