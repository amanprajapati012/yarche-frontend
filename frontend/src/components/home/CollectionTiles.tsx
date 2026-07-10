"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Dinnerware",
    desc: "Plates, bowls & more",
    img: "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tall: true,
  },
  {
    title: "Mugs & Cups",
    desc: "Sip in style",
    img: "https://images.pexels.com/photos/4252143/pexels-photo-4252143.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tall: false,
  },
  {
    title: "Serveware",
    desc: "Bowls, trays & more",
    img: "https://images.pexels.com/photos/3735208/pexels-photo-3735208.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tall: false,
  },
  {
    title: "Table Accessories",
    desc: "Little details, big impact",
    img: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tall: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function CollectionTiles() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-[var(--background)]  overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#28170D_1px,transparent_1px)] [background-size:28px_28px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="uppercase tracking-[0.25em] text-xs text-foreground/60">
                Shop Our
              </span>

              <div className="h-px w-12 bg-footer/20" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Collections
            </h2>

            <p className="mt-5 text-foreground/65 text-sm leading-7">
              Discover handcrafted pottery and timeless pieces designed to
              elevate everyday dining.
            </p>

            <div className="flex gap-3 mt-8">
              <button
                onClick={scrollLeft}
                className="w-11 h-11 rounded-full border border-[#28170D]/20 flex items-center justify-center hover:bg-footer hover:text-white transition-all"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                onClick={scrollRight}
                className="w-11 h-11 rounded-full border border-[#28170D]/20 flex items-center justify-center hover:bg-footer hover:text-white transition-all"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* COLLECTIONS */}
          <div
            ref={scrollRef}
            className="
              lg:col-span-9
              flex
              lg:grid
              lg:grid-cols-3
              gap-6
              overflow-x-auto
              lg:overflow-visible
              snap-x
              snap-mandatory
              scrollbar-hide
              pb-2
            "
          >
            {/* Card 1 */}
            <motion.div
              variants={cardVariants}
              className="min-w-[85vw] sm:min-w-[420px] lg:min-w-0 snap-center"
            >
              <CollectionCard
                item={collections[0]}
                tall
              />
            </motion.div>

            {/* Middle Column */}
            <div className="min-w-[85vw] sm:min-w-[420px] lg:min-w-0 flex flex-col gap-6 snap-center">
              <motion.div variants={cardVariants}>
                <CollectionCard item={collections[1]} />
              </motion.div>

              <motion.div variants={cardVariants}>
                <CollectionCard item={collections[2]} />
              </motion.div>
            </div>

            {/* Card 3 */}
            <motion.div
              variants={cardVariants}
              className="min-w-[85vw] sm:min-w-[420px] lg:min-w-0 snap-center"
            >
              <CollectionCard
                item={collections[3]}
                tall
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CollectionCard({
  item,
  tall = false,
}: {
  item: {
    title: string;
    desc: string;
    img: string;
  };
  tall?: boolean;
}) {
  return (
    <div
      className={`
      group
      relative
      overflow-hidden
      rounded-[32px]
      bg-surface
      shadow-[0_10px_40px_rgba(40,23,13,0.12)]
      hover:shadow-[0_20px_60px_rgba(40,23,13,0.18)]
      hover:-translate-y-2
      transition-all
      duration-700
      
      ${
        tall
          ? "h-[320px] sm:h-[380px] md:h-[420px] lg:h-[520px]"
          : "h-[220px] sm:h-[240px] md:h-[200px] lg:h-[247px]"
      }
      `}
    >
      {/* IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
        style={{
          backgroundImage: `url(${item.img})`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#28170D]/80 via-[#28170D]/30 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
        <div>
          <h3 className="text-white font-serif text-2xl md:text-3xl">
            {item.title}
          </h3>

          <p className="text-white/75 text-sm mt-2">
            {item.desc}
          </p>
        </div>

        <button className="w-12 h-12 rounded-full bg-white text-foreground flex items-center justify-center shadow-lg group-hover:translate-x-1 group-hover:scale-105 transition-all">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}