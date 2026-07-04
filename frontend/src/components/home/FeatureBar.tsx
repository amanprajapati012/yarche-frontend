"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/src/lib/api";
import { getImageUrl } from "@/src/lib/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export default function Banner() {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await API.get("/carousels");
        console.log(res.data.carousels[0].images);
        setBanners(res.data.carousels || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const banner = banners[currentBanner];
  useEffect(() => {
   
  }, [currentImage, banner]);
  // Auto Change Banner
  useEffect(() => {
    if (!banner?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev >= banner.images.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBanner]);

  useEffect(() => {
    setCurrentImage(0);
  }, [currentBanner]);

  // Auto Change Images inside Banner
  useEffect(() => {
    if (!banner || banner.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        return (prev + 1) % banner.images.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [banner]);

  const nextBanner = () => {
    setCurrentBanner((prev) => {
      const next = (prev + 1) % banners.length;
      setCurrentImage(0);
      return next;
    });
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => {
      const next = prev === 0 ? banners.length - 1 : prev - 1;
      setCurrentImage(0);
      return next;
    });
  };

  if (loading) {
    return (
      <section className="h-[620px] bg-footer animate-pulse" />
    );
  }

  if (!banner) return null;

  const image =
  banner?.images?.[currentImage]?.url ?? "/placeholder.png";

 

  return (
    <section className="relative h-[560px] md:h-[650px] bg-footer overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={`${currentBanner}-${currentImage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
  src={image}
  alt={banner.title}
  className="absolute inset-0 w-full h-full object-contain bg-[#28170d]"
/>

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center">
      <div className="max-w-3xl text-left">

  {/* Small Caption */}
  <motion.p
    key={banner.caption}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="uppercase tracking-[0.30em] text-[11px] md:text-xs font-medium text-[#EFD6AD] mb-6"
  >
    ✦ {banner.caption || "CRAFTED BY HAND, LOVED EVERYDAY."}
  </motion.p>

  {/* Heading */}
  <motion.h1
    key={banner.title}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="font-serif font-semibold leading-[0.95] text-5xl md:text-7xl lg:text-8xl text-[#FFFBF5]"
  >
    {banner.title}
  </motion.h1>

  {/* Description */}
  <motion.p
    key={banner.description}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="mt-8 max-w-xl text-[#E8D9BD] text-base md:text-lg leading-8"
  >
    {banner.description}
  </motion.p>

  {/* Button */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.35 }}
    className="mt-10"
  >
    <Link
      href={banner.link || "/shop"}
      className="inline-flex items-center gap-3 rounded-full bg-[#FFF6E8] px-8 py-4 text-[#28170D] font-semibold hover:bg-[#EFD6AD] transition-all duration-300"
    >
      {banner.buttonText || "Explore Collection"}

      <ArrowRight
        size={18}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  </motion.div>

</div>

      </div>

      {/* Left Arrow */}
      <button
        onClick={prevBanner}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-footer transition-all duration-300"
      >
        <ChevronLeft className="mx-auto" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextBanner}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-footer transition-all duration-300"
      >
        <ChevronRight className="mx-auto" />
      </button>
      {/* Banner Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {banners.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => {
              setCurrentBanner(index);
            }}
            className={`transition-all duration-300 rounded-full ${currentBanner === index
                ? "w-10 h-3 bg-white"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Images Indicator (only if banner has multiple images) */}
      {banner.images?.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banner.images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`rounded-full transition-all duration-300 ${currentImage === index
                  ? "w-8 h-2 bg-[#FFF6E2]"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-footer to-transparent pointer-events-none" />
    </section>
  );
}