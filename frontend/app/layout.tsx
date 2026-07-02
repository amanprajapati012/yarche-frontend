import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/src/layout/LayoutWrapper";
import { Toaster } from "sonner";
import Script from "next/script";
import GlobalLoader from "@/src/components/common/GlobalLoader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yarche - Handmade Crockery",
  description: "Handmade with Passion, Made for You.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cormorant.variable} h-full antialiased`}
    >
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
  <GlobalLoader />

  <Toaster
    position="top-right"
    richColors
    closeButton
    expand={true}
    theme="light"
    toastOptions={{
      duration: 3500,
      unstyled: true,
      classNames: {
        toast:
          "group flex items-center gap-3 rounded-2xl border border-[#E6D4B8] bg-[#FFF8EA] px-4 py-3 shadow-[0_10px_30px_rgba(40,23,13,0.12)]",
        title: "text-foreground font-semibold text-sm",
        description: "text-[#6B5B4D] text-xs",
        success: "!border-green-200 !bg-green-50",
        error: "!border-red-200 !bg-red-50",
        warning: "!border-amber-200 !bg-amber-50",
        info: "!border-blue-200 !bg-blue-50",
        closeButton:
          "!bg-white !border !border-[#E6D4B8] !text-foreground",
      },
    }}
  />

  <LayoutWrapper>{children}</LayoutWrapper>
</body>
    </html>
  );
}