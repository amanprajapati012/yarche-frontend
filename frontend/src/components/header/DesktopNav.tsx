"use client";

import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
        border-[#28170D]/10
      "
    >

      {/* LEFT CATEGORY BUTTON */}
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
            text-[#FFF6E2]
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


        {/* OTHER PAGES ONLY DROPDOWN */}
        {!isHome && hoverOpen && (

          <div
            className="
              absolute
              top-full
              left-0
              w-full
              bg-background
              border
              border-[#28170D]/10
              shadow-lg
              z-50
            "
          >

            {categories.map((cat) => (

              <Link
                key={cat}
                href={`/categories/${encodeURIComponent(cat)}`}
                className="
                  block
                  px-6
                  py-4
                  text-[15px]
                  border-b
                  border-[#28170D]/5
                  hover:bg-[#F5E9CC]
                  transition
                "
              >
                {cat}
              </Link>

            ))}

          </div>

        )}

      </div>



      {/* RIGHT LINKS */}
      <div
        className="
          flex-1
          h-[64px]
          flex
          items-center
          justify-around
        "
      >

        {navLinks.map((link)=>(
          <Link
            key={link.name}
            href={link.href}
            className="
              h-full
              flex
              items-center
              px-5
              font-semibold
              hover:text-[#6F4A2D]
              transition
            "
          >
            {link.name}
          </Link>
        ))}

      </div>


    </nav>
  );
}