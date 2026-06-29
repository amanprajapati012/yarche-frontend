"use client";

import { motion, type Variants } from "framer-motion";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Handcrafted",
  },
  {
    icon: ShieldCheck,
    title: "Built To Last",
  },
  {
    icon: Sparkles,
    title: "Everyday Beauty",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Banner() {
  return (
    <section className="bg-footer text-white py-4 md:py-5 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_260px] items-center gap-6">
          
          {/* LEFT IMAGE */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block"
          >
            <div className="relative h-[120px] rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg"
                alt="Artisan"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#28170D]/30" />
            </div>
          </motion.div>

          {/* CENTER CONTENT */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-8 bg-background/40" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#FFF6E2]/60">
                Artisan Made
              </span>

              <div className="h-px w-8 bg-background/40" />
            </div>

            <h2 className="font-serif text-lg md:text-2xl lg:text-3xl leading-tight">
              Not just crockery,
              <span className="italic font-light text-[#FFF6E2]">
                {" "}
                it's a story.
              </span>
            </h2>
          </motion.div>

          {/* RIGHT FEATURES */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3"
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-[#FFF6E2]" />
                  </div>

                  <p className="text-[10px] md:text-xs text-[#FFF6E2]/70 whitespace-nowrap">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}