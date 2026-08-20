"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  Share2,
  Globe,
  Video,
} from "lucide-react";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    // Connect your API/email service here.
    // Example: fetch("/api/contact", { method: "POST", ... })
  };

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* =========================
          PAGE HEADER
      ========================== */}
      <section className="pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-sm uppercase tracking-[7px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Get In Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Contact Us
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 90 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-7 h-[2px]"
            style={{ background: "var(--foreground)" }}
          />
        </div>
      </section>

      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section className="pb-28 md:pb-36">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.65fr_0.85fr] gap-14 lg:gap-24 items-start">

            {/* =========================
                FORM
            ========================== */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-serif text-3xl md:text-4xl mb-8"
                style={{ color: "var(--foreground)" }}
              >
                We would love to hear from you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="relative">
                    <User
                      size={19}
                      strokeWidth={1.7}
                      className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      className="w-full rounded-xl pl-13 pr-5 py-4 outline-none transition-all"
                      style={{
                        background: "var(--input-bg)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail
                      size={19}
                      strokeWidth={1.7}
                      className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="w-full rounded-xl pl-13 pr-5 py-4 outline-none transition-all"
                      style={{
                        background: "var(--input-bg)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                      }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone
                    size={19}
                    strokeWidth={1.7}
                    className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full rounded-xl pl-13 pr-5 py-4 outline-none"
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare
                    size={19}
                    strokeWidth={1.7}
                    className="absolute left-5 top-5 pointer-events-none"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                    rows={8}
                    className="w-full rounded-xl pl-13 pr-5 py-4 outline-none resize-none"
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 pt-2 cursor-pointer">
                  <span className="relative mt-1 flex-shrink-0">
                    <input
                      type="checkbox"
                      required
                      className="peer sr-only"
                    />
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded border transition-all peer-checked:bg-foreground peer-checked:border-foreground"
                      style={{
                        borderColor: "var(--foreground)",
                        background: "var(--background)",
                      }}
                    >
                      <CheckCircle2
                        size={13}
                        strokeWidth={3}
                        className="hidden text-background peer-checked:block"
                      />
                    </span>
                  </span>

                  <span
                    className="text-sm md:text-base leading-7"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    I hereby give my consent to receive further communication
                    from Yarche via call, SMS, email, WhatsApp, or RCS about
                    its products & offers. This consent overrides any
                    registration for DND/NDNC.
                  </span>
                </label>

                {/* Submit */}
                <div className="pt-5">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: "var(--foreground)",
                      color: "var(--background)",
                    }}
                  >
                    Submit Now
                    <Send
                      size={18}
                      strokeWidth={1.8}
                      className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {submitted && (
                  <p
                    className="flex items-center gap-2 pt-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <CheckCircle2 size={17} />
                    Thank you! Your message has been received.
                  </p>
                )}
              </form>
            </motion.div>

            {/* =========================
                CONTACT DETAILS
            ========================== */}
            <motion.aside
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:pt-2"
            >
              {/* Address */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={21} />
                  <h2 className="font-serif text-2xl">Address</h2>
                </div>

                <p
                  className="text-lg leading-8 pl-8"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Add your business address here.
                  <br />
                  Lucknow, Uttar Pradesh, India
                </p>
              </div>

              {/* Customer Support */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Phone size={20} />
                  <h2 className="font-serif text-2xl">Customer Support</h2>
                </div>

                <div
                  className="space-y-2 pl-8 text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <a
                    href="tel:+919511115584"
                    className="block hover:underline"
                  >
                    +91 95111 15584
                  </a>

                  <a
                    href="mailto:care@yarche.com"
                    className="block hover:underline"
                  >
                    care@yarche.com
                  </a>
                </div>
              </div>

              {/* Corporate Orders */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={20} />
                  <h2 className="font-serif text-2xl">Corporate Orders</h2>
                </div>

                <div
                  className="space-y-2 pl-8 text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <a
                    href="mailto:partners@yarche.com"
                    className="block hover:underline"
                  >
                    partners@yarche.com
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="font-serif text-2xl mb-5">Social Media</h2>

                <div className="flex items-center gap-5">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <Globe size={21} strokeWidth={1.8} />
                  </a>

                  <a
                    href="#"
                    aria-label="Facebook"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <Share2 size={21} strokeWidth={1.8} />
                  </a>

                  <a
                    href="#"
                    aria-label="YouTube"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <Video size={22} strokeWidth={1.8} />
                  </a>

                  <a
                    href="#"
                    aria-label="WhatsApp"
                    className="transition-transform hover:-translate-y-1"
                  >
                    <MessageCircle size={21} strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* =========================
          BOTTOM CTA
      ========================== */}
      <section
        className="py-20 md:py-24"
        style={{ background: "var(--foreground)" }}
      >
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p
            className="uppercase tracking-[6px] text-sm"
            style={{ color: "var(--input-bg)" }}
          >
            We are here for you
          </p>

          <h2
            className="font-serif text-4xl md:text-6xl mt-5"
            style={{ color: "var(--background)" }}
          >
            Let&apos;s start a conversation.
          </h2>
        </div>
      </section>
    </main>
  );
}