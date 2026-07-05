

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import API from "@/src/lib/api";
import { getImageUrl } from "@/src/lib/image";


type CarouselImage = {
  _id: string;
  url: string;
  public_id?: string;
};

type Carousel = {
  _id: string;
  title: string;
  description: string;
  caption: string;
  buttonText: string;
  link: string;
  images: CarouselImage[];
};



export default function FeatureBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [carousel, setCarousel] = useState<Carousel | null>(null);
  const [loading, setLoading] = useState(true);

  const images =
    carousel?.images?.length
      ? [...carousel.images, ...carousel.images]
      : [];

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const res = await API.get("/carousels");

        console.log(res.data);

        if (res.data?.carousels?.length) {
          setCarousel(res.data.carousels[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousel();
  }, []);



  useEffect(() => {
    const slider = scrollRef.current;

    if (!slider || images.length === 0) return;

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
  }, [images]);;

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

  if (loading) {
    return null;
  }

  return (
    <section className="bg-footer py-10 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="uppercase tracking-[0.25em] text-[#C58B63] text-xs font-semibold mb-5">
              {carousel?.title}
            </p>

            <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight whitespace-pre-line">
              {carousel?.caption}
            </h1>
            <p className="mt-5 text-gray-300 text-[15px] leading-7 w-full max-w-full md:max-w-lg">
              {carousel?.description}
            </p>

            <div className="mt-8">
              <Link href={carousel?.link || "/"}>
                <button className="w-full md:w-auto bg-[#C58B63] text-white font-medium py-4 px-8 rounded-full">
                  {carousel?.buttonText}
                </button>
              </Link>
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
                  key={`${img._id}-${index}`}
                  className="group relative min-w-[75%] sm:min-w-[280px] md:min-w-[320px] h-[280px] sm:h-[380px] md:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex-shrink-0"
                >
                  <>
                    <img
                      src={getImageUrl(img)}
                      alt={carousel?.title || ""}
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
