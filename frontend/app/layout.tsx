import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/src/layout/LayoutWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F9F6F0] text-[#2B2321]">

        {/* ✨ Premium Toast System */}
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
              title: "text-[#28170D] font-semibold text-sm",
              description: "text-[#6B5B4D] text-xs",
              success:
                "!border-green-200 !bg-green-50",
              error:
                "!border-red-200 !bg-red-50",
              warning:
                "!border-amber-200 !bg-amber-50",
              info:
                "!border-blue-200 !bg-blue-50",
              closeButton:
                "!bg-white !border !border-[#E6D4B8] !text-[#28170D]",
            },
          }}
        />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}