import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-footer text-[#FFF6E2]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 border-b border-[#FFF6E2]/10 pb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Yarche"
                width={220}
                height={90}
                priority
                className="w-[170px] md:w-[190px] h-auto"
              />
            </Link>

            <p className="mt-6 text-sm leading-8 text-[#FFF6E2]/75 max-w-[280px]">
              Handmade crockery crafted with passion, made for everyday
              unforgettable dining moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#FFF0D3] mb-6">
              Quick Links
            </h4>

            <ul className="space-y-4 text-[#FFF6E2]/80">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Shop All Products
                </Link>
              </li>

              <li>
                <Link href="/collections" className="hover:text-white transition">
                  Our Collections
                </Link>
              </li>

              <li>
                <Link href="/craft" className="hover:text-white transition">
                  Our Master Craft
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#FFF0D3] mb-6">
              Customer Care
            </h4>

            <ul className="space-y-4 text-[#FFF6E2]/80">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link href="/faqs" className="hover:text-white transition">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider text-[#FFF0D3] mb-6">
              Newsletter
            </h4>

            <p className="text-[#FFF6E2]/75 mb-5">
              Subscribe to get updates on new arrivals.
            </p>

            <form className="flex items-center border-b border-[#FFF6E2]/30 pb-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none placeholder:text-[#FFF6E2]/40"
              />

              <button
                type="submit"
                className="ml-2 text-xl hover:translate-x-1 transition"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm text-[#FFF6E2]/60">
          <span>© 2024 Yarche. All Rights Reserved.</span>

          <span>Powered by Ujjwal Household Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  );
}