"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconMapPin,
  IconMail,
  IconPhone,
  IconArrowUp,
} from "@tabler/icons-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-footer text-footer-text relative">
      {/* Brand accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-primary via-primary-dark to-primary" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12 border-b border-footer-text/10 pb-12">
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

            <p className="mt-6 text-sm leading-8 text-footer-text/75 max-w-[280px]">
              Handmade crockery crafted with passion, made for everyday
              unforgettable dining moments.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-footer-text/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-footer transition-colors"
              >
                <IconBrandInstagram size={18} />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-footer-text/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-footer transition-colors"
              >
                <IconBrandFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider text-footer-heading mb-6">
              Quick Links
            </h4>

            <ul className="space-y-4 text-footer-text/80">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-primary transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-primary transition-colors">
                  About Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider text-footer-heading mb-6">
              Customer Care
            </h4>

            <ul className="space-y-4 text-footer-text/80">
              <li>
                <Link href="/contact-us" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-delivery" className="hover:text-primary transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/return-refund" className="hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-primary transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter + contact */}
          <div>
            <h4 className="text-lg font-semibold uppercase tracking-wider text-footer-heading mb-6">
              Stay In Touch
            </h4>

            <p className="text-footer-text/75 mb-4 text-sm">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex items-center border-b border-footer-text/30 pb-2 focus-within:border-primary transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-footer-text/40 text-sm"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="ml-2 text-xl hover:translate-x-1 hover:text-primary transition-all"
                >
                  →
                </button>
              </div>

              {subscribed && (
                <p className="yc-coupon-applied text-xs text-primary mt-2">
                  Thanks! You're on the list. ✨
                </p>
              )}
            </form>

            <div className="mt-7 space-y-3 text-sm text-footer-text/75">
              <div className="flex items-center gap-2.5">
                <IconMail size={16} className="text-primary shrink-0" />
                <span>support@yarche.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconPhone size={16} className="text-primary shrink-0" />
                <span>+91 00000 00000</span>
              </div>
              <div className="flex items-start gap-2.5">
                <IconMapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm text-footer-text/60">
          <span>© {new Date().getFullYear()} Yarche. All Rights Reserved.</span>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <span>Powered by Ujjwal Household Pvt. Ltd.</span>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute right-6 -top-6 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
      >
        <IconArrowUp size={20} />
      </button>
    </footer>
  );
}
