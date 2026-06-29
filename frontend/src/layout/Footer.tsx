import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-footer text-[#FFF6E2] py-16 px-6 mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#FFF6E2]/10 pb-12">

        {/* Brand Information Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center font-serif font-bold">Y</div>
            <span className="text-xl font-serif font-bold tracking-wider">YARCHE</span>
          </div>
          <p className="text-xs text-[#FFF6E2]/70 leading-relaxed max-w-xs">
            Handmade crockery crafted with passion, made for everyday unforgettable dining moments.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#FFF0D3]">Quick Links</h4>
          <ul className="space-y-2 text-xs text-[#FFF6E2]/80">
            <li><Link href="/shop" className="hover:underline">Shop All Products</Link></li>
            <li><Link href="/collections" className="hover:underline">Our Collections</Link></li>
            <li><Link href="/craft" className="hover:underline">Our Master Craft</Link></li>
            <li><Link href="/about" className="hover:underline">About Our Story</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care Policy */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#FFF0D3]">Customer Care</h4>
          <ul className="space-y-2 text-xs text-[#FFF6E2]/80">
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:underline">Shipping & Delivery</Link></li>
            <li><Link href="/returns" className="hover:underline">Returns & Refunds</Link></li>
            <li><Link href="/faqs" className="hover:underline">Help & FAQs</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Subscription inputs */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#FFF0D3]">Newsletter</h4>
          <p className="text-xs text-[#FFF6E2]/70">Subscribe to get updates on new arrivals.</p>
          <form className="flex items-center border-b border-[#FFF6E2]/30 pb-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent text-xs w-full focus:outline-none placeholder-[#FFF6E2]/40 text-[#FFF6E2]"
            />
            <button type="submit" className="text-sm px-2 hover:translate-x-1 transition-transform">→</button>
          </form>
        </div>
      </div>

      {/* Copyright Disclaimer and Powered-by Note */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFF6E2]/50 gap-4">
        <span>© 2024 Yarche. All Rights Reserved.</span>
        <span className="font-sans tracking-wide">Powered by Ujjwal Household Pvt. Ltd.</span>
      </div>
    </footer>
  );
}