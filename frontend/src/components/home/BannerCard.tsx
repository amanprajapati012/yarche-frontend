"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import { getImageUrl } from "@/src/lib/image";

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  topText?: string;

  image: {
    url: string;
    public_id?: string;
  };

  leftOffer?: string;
  leftText?: string;
  leftCode?: string;

  rightOffer?: string;
  rightText?: string;
  rightCode?: string;

  features?: string[];

  buttonText?: string;
  link?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export default function BannerCard() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banners");
      setBanners(res.data.banners || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[16/9] rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!banners.length) return null;

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="relative aspect-[16/9] overflow-hidden rounded-3xl group"
          >
            {/* Image */}
            <img
              src={getImageUrl(banner.image)}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-black/15" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4 text-[#F8F8F8]">
              {/* Top */}
              <div className="flex justify-end">
                {banner.topText && (
                  <span className="rounded-full bg-black/25 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium">
                    {banner.topText}
                  </span>
                )}
              </div>

              {/* Middle */}
              <div>
               <h2 className="max-w-[72%] text-xl md:text-2xl lg:text-[30px] font-bold leading-tight tracking-tight drop-shadow-md">
                  {banner.title}
                </h2>

                {banner.subtitle && (
                  <p className="mt-1 max-w-[70%] text-[11px] md:text-xs text-white/80 leading-snug">
                    {banner.subtitle}
                  </p>
                )}
              </div>

              {/* Bottom */}
              {banner.features && banner.features.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {banner.features.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-black/20 backdrop-blur-sm py-2 text-center text-xs font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between items-end">
                  {/* Left */}
                  <div>
                    <h4 className="text-lg md:text-xl font-bold">
                      {banner.leftOffer}
                    </h4>

                   <p className="text-[11px] text-white/80 mt-0.5">
                      {banner.leftText}
                    </p>

                    {banner.leftCode && (
                     <div className="mt-1 inline-flex rounded-md border border-white/15 bg-black/20 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold uppercase">
                        USE : {banner.leftCode}
                      </div>
                    )}
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    <h4 className="text-xl md:text-2xl font-bold">
                      {banner.rightOffer}
                    </h4>

                    <p className="text-xs md:text-sm text-white/80 mt-1">
                      {banner.rightText}
                    </p>

                    {banner.rightCode && (
                      <div className="mt-2 inline-flex rounded-lg border border-white/20 bg-black/20 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-wider">
                        USE : {banner.rightCode}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}