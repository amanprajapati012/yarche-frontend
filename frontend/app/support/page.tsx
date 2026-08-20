 "use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Truck,
  ShoppingBag,
  UserRound,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Clock3,
  MapPin,
  ArrowRight,
  Headphones,
} from "lucide-react";

const SUPPORT_NUMBER = "9936277225";

const offers = [
  { discount: "20% OFF", text: "on selected handmade products" },
  { discount: "10% OFF", text: "on your next purchase" },
  { discount: "15% OFF", text: "on selected collections" },
  { discount: "10% OFF", text: "plus special offers" },
];

export default function GetSupport() {
  const [offerIndex, setOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentOffer = offers[offerIndex];

  const goToProducts = () => {
    window.location.href = "/products";
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(
        "Hello Yarche, I need support regarding your products."
      )}`,
      "_blank"
    );
  };

  const callSupport = () => {
    window.location.href = `tel:+91${SUPPORT_NUMBER}`;
  };

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* HEADER */}
      <header
        className="border-b"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
       
      </header>

      {/* ROTATING OFFER BAR */}
      <button
        onClick={goToProducts}
        className="w-full h-[74px] overflow-hidden cursor-pointer"
        style={{ background: "var(--input-bg)", color: "var(--foreground)" }}
        aria-label="Shop current offer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={offerIndex}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="h-full flex items-center justify-center gap-4 px-6"
          >
            <span className="text-2xl md:text-3xl font-semibold tracking-wide">
              {currentOffer.discount}
            </span>
            <span className="hidden sm:inline text-lg md:text-xl">
              {currentOffer.text}
            </span>
            <ArrowRight size={24} strokeWidth={1.8} />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* MAIN SUPPORT */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8 lg:gap-10 items-stretch">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="overflow-hidden rounded-[32px] border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                {/* Replace this image with your own image */}
                <img
                  src="/support-banner.jpg"
                  alt="Yarche customer support"
                  className="w-full h-[430px] md:h-[570px] object-cover"
                />
              </div>

              <div className="text-center px-5 pt-8">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                  Have questions or need assistance?
                </h2>

                <p
                  className="mt-4 text-lg md:text-xl leading-8"
                  style={{ color: "var(--text-secondary)" }}
                >
                  We&apos;re here to help! Reach out to us, and we&apos;ll get
                  back to you as soon as possible.
                </p>
              </div>
            </motion.div>

            {/* SUPPORT CARD */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-[28px] border p-7 md:p-9 flex flex-col"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2 className="text-center font-serif text-2xl md:text-3xl font-semibold mb-8">
                For more queries
              </h2>

              <button
                className="group w-full rounded-2xl px-5 py-4 mb-4 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--input-bg)", color: "var(--foreground)" }}
                >
                  <Truck size={23} strokeWidth={1.7} />
                </span>
                <span className="flex-1 text-left text-lg md:text-xl">
                  Track your order
                </span>
                <ExternalLink size={19} strokeWidth={1.7} />
              </button>

              <button
                onClick={openWhatsApp}
                className="group w-full rounded-2xl px-5 py-4 mb-4 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--input-bg)", color: "var(--foreground)" }}
                >
                  <MessageCircle size={23} strokeWidth={1.7} />
                </span>
                <span className="flex-1 text-left text-lg md:text-xl">
                  WhatsApp us
                </span>
                <ExternalLink size={19} strokeWidth={1.7} />
              </button>

              <button
                onClick={callSupport}
                className="group w-full rounded-2xl px-5 py-4 mb-10 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--input-bg)", color: "var(--foreground)" }}
                >
                  <Phone size={23} strokeWidth={1.7} />
                </span>
                <span className="flex-1 text-left text-lg md:text-xl">
                  Call us
                </span>
                <ExternalLink size={19} strokeWidth={1.7} />
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Clock3 size={20} strokeWidth={1.7} />
                  <h3 className="font-serif text-xl md:text-2xl">
                    Business Hours:
                  </h3>
                </div>

                <p
                  className="text-base md:text-lg leading-8"
                  style={{ color: "var(--text-secondary)" }}
                >
                  10:00 am to 6:30 pm (Monday to Friday)
                  <br />
                  10:00 am to 5:00 pm (Saturday)
                </p>

                <p
                  className="mt-5 text-base md:text-lg leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  For further assistance you may email us at
                  <br />
                  <a
                    href="mailto:care@yarche.com"
                    className="font-medium hover:underline"
                    style={{ color: "var(--foreground)" }}
                  >
                    care@yarche.com
                  </a>
                </p>
              </div>

              <div
                className="mt-auto pt-8 flex items-center justify-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <Phone size={17} />
                <a href={`tel:+91${SUPPORT_NUMBER}`} className="hover:underline">
                  +91 99362 77225
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ADDRESS */}
      <section className="py-20 md:py-24" style={{ background: "var(--surface)" }}>
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-3xl p-8 md:p-10 border"
              style={{
                background: "var(--background)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--input-bg)" }}
                >
                  <MapPin size={22} strokeWidth={1.7} />
                </span>
                <h2 className="font-serif text-2xl md:text-3xl">Visit Us</h2>
              </div>

              <p
                className="text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Karma Niwas
                <br />
                Plot No 30, Sandauli Umarpur
                <br />
                Barabanki, Uttar Pradesh
                <br />
                225003
              </p>
            </div>

            <div
              className="rounded-3xl p-8 md:p-10 border"
              style={{
                background: "var(--background)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--input-bg)" }}
                >
                  <Headphones size={22} strokeWidth={1.7} />
                </span>
                <h2 className="font-serif text-2xl md:text-3xl">
                  Need Quick Help?
                </h2>
              </div>

              <p
                className="text-lg leading-8 mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                Our support team is just a call or WhatsApp message away.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={callSupport}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 hover:-translate-y-1 transition-transform"
                  style={{ background: "var(--foreground)", color: "var(--background)" }}
                >
                  <Phone size={17} />
                  Call Now
                </button>

                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 hover:-translate-y-1 transition-transform"
                  style={{ background: "var(--input-bg)", color: "var(--foreground)" }}
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS CTA */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--foreground)", color: "var(--background)" }}
      >
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p
            className="uppercase tracking-[6px] text-sm"
            style={{ color: "var(--input-bg)" }}
          >
            Explore Yarche
          </p>

          <h2 className="font-serif text-4xl md:text-6xl mt-5 leading-tight">
            Discover something handmade.
          </h2>

          <p
            className="mt-5 text-lg leading-8"
            style={{ color: "var(--border)" }}
          >
            Explore our collection of thoughtfully crafted handmade products.
          </p>

          <button
            onClick={goToProducts}
            className="mt-9 inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ background: "var(--input-bg)", color: "var(--foreground)" }}
          >
            Shop Now
            <ArrowRight size={19} strokeWidth={1.8} />
          </button>
        </div>
      </section>
    </main>
  );
}