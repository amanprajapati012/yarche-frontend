"use client";

import { useEffect, useRef } from "react";

export default function FeatureBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/4252143/pexels-photo-4252143.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3735208/pexels-photo-3735208.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  useEffect(() => {
    const slider = scrollRef.current;

    if (!slider) return;

    let animationFrame: number;
    let position = 0;

    const singleSetWidth = slider.scrollWidth / 2;

    const autoScroll = () => {
      position += 0.8;

      if (position >= singleSetWidth) {
        position = 0;
      }

      slider.scrollLeft = position;

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const features = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
      title: "100% Handmade",
      desc: "Crafted by skilled artisans",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
      title: "Eco Friendly",
      desc: "Sustainable materials",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      title: "Unique Design",
      desc: "Every piece is special",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/679/679720.png",
      title: "Safe Delivery",
      desc: "Packed with care",
    },
  ];

  return (
    <section className="bg-footer py-10 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="uppercase tracking-[0.25em] text-[#C58B63] text-xs font-semibold mb-5">
              Crafted By Hand, Loved Everyday
            </p>

            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Handmade
              <br />
              with Passion,
              <br />
              <span className="text-[#C58B63] italic">Made</span> for You
            </h1>
            <p className="mt-5 text-gray-300 text-[15px] leading-7 w-full max-w-full md:max-w-lg">
              Yarche creates timeless crockery that brings beauty, warmth and
              meaning to every meal. Every piece is handcrafted with care and
              designed to last for generations.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button className="w-full bg-[#C58B63] text-white font-medium py-4 rounded-full">
                Explore Collection
              </button>

              <button className="w-full border border-[#C58B63] text-white py-4 rounded-full">
                Watch Our Craft
              </button>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="relative">
            <div className="absolute w-[300px] h-[300px] md:w-[650px] md:h-[650px] bg-[#C58B63]/15 rounded-full blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-hidden relative z-10 pb-2"
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative min-w-[75%] sm:min-w-[280px] md:min-w-[320px] h-[280px] sm:h-[380px] md:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex-shrink-0"
                >
                  <>
                    <img
                      src={img}
                      alt="Crockery"
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#28170D] via-[#28170D]/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-[#FFF6E2]/70 text-xs uppercase tracking-[0.25em]">
                        Artisan Crafted
                      </span>

                      <h3 className="text-white font-serif text-xl mt-2">
                        Handmade Elegance
                      </h3>
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-12 md:mt-16">
          <div className="bg-background rounded-3xl overflow-hidden shadow-xl border border-[#E7D7C3]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 p-5 border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />

                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
