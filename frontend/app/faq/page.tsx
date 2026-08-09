import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQs | Yarche",
  description:
    "Frequently Asked Questions about Yarche products, shipping, payments, returns, and support.",
};

export default function Page() {
  return <FAQClient />;
}