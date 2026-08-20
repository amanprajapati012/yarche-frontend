"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "What products does Yarche offer?",
    answer:
      "Yarche offers premium handmade wooden kitchenware including Belan, Chakla, Chopping Boards, Serving Trays, Wooden Bowls, Spoons, and other handcrafted kitchen essentials.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Browse your favorite products, add them to your cart, proceed to checkout, and complete your purchase securely through our website.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept secure online payments through Razorpay, including UPI, Credit/Debit Cards, Net Banking, and Wallets.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are processed within 1–2 business days and usually delivered within 3–7 business days depending on your location.",
  },
  {
    question: "What is your return policy?",
    answer:
      "If you receive a damaged or incorrect product, please contact our support team within the eligible return period. We'll assist you with a replacement or refund as applicable.",
  },
  {
    question: "How can I contact Yarche?",
    answer:
      "You can visit our Contact Us page or email our customer support team. We're always happy to help.",
  },
];

export default function FAQClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background py-16 px-5">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground-2">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 text-gray-600">
            Find answers to the most common questions about Yarche.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() =>
                  setOpen((prev) => (prev === index ? null : index))
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-foreground-2">
                  {faq.question}
                </span>

                <span className="text-2xl font-bold text-secondary">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && (
                <div className="px-6 pb-5 text-gray-600 leading-7">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-secondary p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-semibold">
            Still have a question?
          </h2>

          <p className="mb-6 text-gray-200">
            For any further query or assistance, feel free to contact our
            support team.
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-secondary transition hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}