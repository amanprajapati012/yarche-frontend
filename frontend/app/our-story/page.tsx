"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function OurStory() {
  return (
    <main
      className="overflow-hidden"
      style={{
        background: "#fffbf5",
        color: "#28170d",
      }}
    >
      {/* ================================================= */}
      {/* Background Decoration */}
      {/* ================================================= */}

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-52 -left-52 w-[650px] h-[650px] rounded-full blur-3xl opacity-30"
          style={{ background: "#efd6ad" }}
        />

        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: "#fff6e8" }}
        />
      </div>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative h-screen min-h-[820px] flex items-center">

        {/* Background Image */}

        <Image
          src="/yarche1.png"
          alt="Our Story"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(40,23,13,.82), rgba(40,23,13,.60), rgba(40,23,13,.25))",
          }}
        />

        {/* Content */}

        <div className="container mx-auto px-6 relative z-10">

          <motion.div
            initial={{
              opacity: 0,
              y: 70,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
            }}
            className="max-w-5xl"
          >
            {/* Small Label */}

            <p
              className="uppercase tracking-[10px] text-sm mb-8"
              style={{
                color: "#efd6ad",
              }}
            >
              OUR STORY
            </p>

            {/* Heading */}

            <h1
              className="font-serif font-bold leading-[1.05]
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              max-w-5xl"
              style={{
                color: "#fffbf5",
              }}
            >
              A Journey
              <br />

              <span
                style={{
                  color: "#efd6ad",
                }}
              >
                I Chose to Continue
              </span>
            </h1>

            {/* Line */}

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: 120,
              }}
              transition={{
                delay: .5,
                duration: .8,
              }}
              className="h-[2px] mt-12"
              style={{
                background: "#efd6ad",
              }}
            />

            {/* Intro */}

            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: .4,
                duration: .8,
              }}
              className="mt-12 max-w-3xl leading-10 text-xl md:text-2xl"
              style={{
                color: "rgba(255,251,245,.90)",
              }}
            >
              Some journeys begin with an idea.

              <br />
              <br />

              Ours began with trust.

              <br />
              <br />

              Built by a father,
              strengthened through relationships,
              and carried forward with a vision
              that continues to grow every single day.
            </motion.p>

            {/* Since */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: .9,
              }}
              className="mt-14"
            >
              <p
                className="text-lg tracking-[6px] uppercase"
                style={{
                  color: "#efd6ad",
                }}
              >
                Since 2013
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll */}

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown
            size={34}
            color="#fffbf5"
          />
        </motion.div>
      </section>

      {/* ================================================= */}
      {/* INTRODUCTION */}
      {/* ================================================= */}

      <section className="py-28 md:py-36">

        <div className="container mx-auto max-w-6xl px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
            }}
            viewport={{
              once: true,
            }}
          >
            {/* Label */}

            <p
              className="uppercase tracking-[8px] text-sm mb-6"
              style={{
                color: "#6b5a4d",
              }}
            >
              OUR BEGINNING
            </p>

            {/* Title */}

            <h2
              className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl"
              style={{
                color: "#28170d",
              }}
            >
              Every journey has
              <br />

              a story worth remembering.
            </h2>

            {/* Quote */}

            <div
              className="mt-20 border-l-[5px] pl-8"
              style={{
                borderColor: "#28170d",
              }}
            >
              <p
                className="text-2xl md:text-4xl font-serif leading-relaxed"
                style={{
                  color: "#28170d",
                }}
              >
                People often ask me,
              </p>

              <p
                className="mt-8 italic text-3xl md:text-5xl font-serif leading-relaxed"
                style={{
                  color: "#28170d",
                }}
              >
                “When did you start
                <br />
                your business?”
              </p>
            </div>

            <div className="mt-16 space-y-10">

              <p
                className="text-xl leading-10"
                style={{
                  color: "#6b5a4d",
                }}
              >
                The truth is...
              </p>

              <p
                className="text-3xl md:text-5xl font-serif leading-relaxed"
                style={{
                  color: "#28170d",
                }}
              >
                I didn't start it—
                <br />
                I grew up with it.
              </p>
                            <p
                className="text-xl leading-10"
                style={{
                  color: "#6b5a4d",
                }}
              >
                In <strong style={{ color: "#28170d" }}>2013</strong>, my father
                started{" "}
                <strong style={{ color: "#28170d" }}>
                  UJJWAL KITCHEN KING PRODUCT
                </strong>{" "}
                with a simple vision: to provide quality kitchenware and
                household products while earning the trust of every customer and
                retailer we served.
              </p>

              <p
                className="text-xl leading-10"
                style={{
                  color: "#6b5a4d",
                }}
              >
                At that time, I was just a child. But I had the privilege of
                watching the business grow—not through advertisements, but
                through trust, quality, and long-term relationships.
              </p>
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* 2013 Timeline */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="mt-32"
          >
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Left Image */}

              <div className="relative">

                {/* Background Box */}

                <div
                  className="absolute -top-6 -left-6 w-full h-full rounded-[32px]"
                  style={{
                    background: "#efd6ad",
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-[32px] shadow-2xl"
                  style={{
                    background: "#fff6e8",
                  }}
                >
                  <Image
                    src="/banner1.png"
                    alt="UJJWAL KITCHEN KING PRODUCT"
                    width={700}
                    height={850}
                    className="w-full h-[650px] object-cover"
                  />
                </div>
              </div>

              {/* Right */}

              <div>

                <p
                  className="uppercase tracking-[8px] text-sm mb-6"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  2013
                </p>

                <h2
                  className="font-serif text-5xl leading-tight"
                  style={{
                    color: "#28170d",
                  }}
                >
                  Where Everything
                  <br />
                  Began
                </h2>

                <div
                  className="w-24 h-[2px] mt-8 mb-10"
                  style={{
                    background: "#28170d",
                  }}
                />

                <p
                  className="text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Every successful business has a beginning. Ours started with
                  honesty, dedication, and a simple promise to never compromise
                  on quality.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  My father believed that businesses aren't built by selling
                  products alone. They're built by keeping promises, respecting
                  customers, and delivering value every single day.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  That philosophy became the strongest foundation of our
                  business, and those values continue to guide every decision we
                  make today.
                </p>

                <div
                  className="mt-12 rounded-3xl p-8"
                  style={{
                    background: "#fff6e8",
                    border: "1px solid #e8d9bd",
                  }}
                >
                  <p
                    className="text-2xl font-serif leading-relaxed"
                    style={{
                      color: "#28170d",
                    }}
                  >
                    "Trust isn't earned in a day.
                    <br />
                    It's earned one customer at a time."
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* 2015 Starts Here */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
            }}
            viewport={{
              once: true,
            }}
            className="mt-40"
          >            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* Left Content */}

              <div>

                <p
                  className="uppercase tracking-[8px] text-sm mb-6"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  2015
                </p>

                <h2
                  className="font-serif text-5xl leading-tight"
                  style={{
                    color: "#28170d",
                  }}
                >
                  Learning Before
                  <br />
                  Leading
                </h2>

                <div
                  className="w-24 h-[2px] mt-8 mb-10"
                  style={{
                    background: "#28170d",
                  }}
                />

                <p
                  className="text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  By <strong style={{ color: "#28170d" }}>2015</strong>, I began
                  spending more time understanding the business.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  I wasn't preparing to become an entrepreneur.
                  I was simply learning from the person who inspired me the most.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Watching customers return again and again taught me something
                  extraordinary. Success wasn't created by advertising—it was
                  created by trust, relationships, and consistency.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Those years became my greatest education. Every conversation,
                  every customer, and every challenge quietly shaped the way I
                  see business today.
                </p>

              </div>

              {/* Right Image */}

              <div className="relative">

                <div
                  className="absolute -bottom-6 -right-6 w-full h-full rounded-[32px]"
                  style={{
                    background: "#efd6ad",
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-[32px] shadow-2xl"
                  style={{
                    background: "#fff6e8",
                  }}
                >
                  <Image
                    src="/handmade.png"
                    alt="Learning the Business"
                    width={700}
                    height={850}
                    className="w-full h-[650px] object-cover"
                  />
                </div>

              </div>

            </div>

          </motion.div>

          {/* ============================================= */}
          {/* Lessons */}
          {/* ============================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="mt-40"
          >

            <div className="text-center max-w-4xl mx-auto">

              <p
                className="uppercase tracking-[8px] text-sm"
                style={{
                  color: "#6b5a4d",
                }}
              >
                LESSONS
              </p>

              <h2
                className="font-serif text-5xl mt-6 leading-tight"
                style={{
                  color: "#28170d",
                }}
              >
                Those years taught me lessons
                <br />
                no classroom ever could.
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-20">

              {/* Card 1 */}

              <div
                className="rounded-[30px] p-10 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "#fff6e8",
                  border: "1px solid #e8d9bd",
                }}
              >

                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: "#efd6ad",
                    color: "#28170d",
                  }}
                >
                  01
                </div>

                <h3
                  className="font-serif text-3xl mt-8"
                  style={{
                    color: "#28170d",
                  }}
                >
                  Trust
                </h3>

                <p
                  className="mt-6 leading-9"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Trust is never built overnight.
                  It grows through honesty,
                  consistency,
                  and every promise you keep.
                </p>

              </div>

              {/* Card 2 */}

              <div
                className="rounded-[30px] p-10 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "#fff6e8",
                  border: "1px solid #e8d9bd",
                }}
              >

                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: "#efd6ad",
                    color: "#28170d",
                  }}
                >
                  02
                </div>

                <h3
                  className="font-serif text-3xl mt-8"
                  style={{
                    color: "#28170d",
                  }}
                >
                  Quality
                </h3>

                <p
                  className="mt-6 leading-9"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Customers may forget prices,
                  but they'll always remember
                  the quality and experience
                  you deliver.
                </p>

              </div>

              {/* Card 3 */}

              <div
                className="rounded-[30px] p-10 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: "#fff6e8",
                  border: "1px solid #e8d9bd",
                }}
              >

                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: "#efd6ad",
                    color: "#28170d",
                  }}
                >
                  03
                </div>

                <h3
                  className="font-serif text-3xl mt-8"
                  style={{
                    color: "#28170d",
                  }}
                >
                  Consistency
                </h3>

                <p
                  className="mt-6 leading-9"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Great businesses aren't built
                  by one extraordinary day.
                  They're built by doing the
                  ordinary things extraordinarily
                  well every single day.
                </p>

              </div>

            </div>

          </motion.div>

                    {/* ============================================= */}
          {/* Offline Growth */}
          {/* ============================================= */}

          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-40"
          >
            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* Image */}

              <div className="relative order-2 lg:order-1">

                <div
                  className="absolute -top-6 -left-6 w-full h-full rounded-[32px]"
                  style={{
                    background: "#efd6ad",
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-[32px] shadow-2xl"
                  style={{
                    background: "#fff6e8",
                  }}
                >
                  <Image
                    src="/handmade2.png"
                    alt="Offline Growth"
                    width={700}
                    height={900}
                    className="w-full h-[650px] object-cover"
                  />
                </div>

              </div>

              {/* Content */}

              <div className="order-1 lg:order-2">

                <p
                  className="uppercase tracking-[8px] text-sm mb-6"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  GROWING TOGETHER
                </p>

                <h2
                  className="font-serif text-5xl leading-tight"
                  style={{
                    color: "#28170d",
                  }}
                >
                  Trust Spread
                  <br />
                  Beyond Products
                </h2>

                <div
                  className="w-24 h-[2px] mt-8 mb-10"
                  style={{
                    background: "#28170d",
                  }}
                />

                <p
                  className="text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Over the years, our offline network expanded across different
                  markets. Every retailer who partnered with us and every
                  customer who returned became a part of our journey.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  We never measured our success by the number of products we
                  sold. We measured it by the number of people who trusted us
                  enough to come back again and recommend us to others.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  That trust became our greatest achievement—and the strongest
                  foundation for everything we would build in the future.
                </p>

              </div>

            </div>
          </motion.section>

          {/* ============================================= */}
          {/* Quote Block */}
          {/* ============================================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-36"
          >

            <div
              className="rounded-[40px] px-10 md:px-20 py-20 text-center"
              style={{
                background: "#fff6e8",
                border: "1px solid #e8d9bd",
              }}
            >

              <p
                className="font-serif text-3xl md:text-5xl leading-relaxed"
                style={{
                  color: "#28170d",
                }}
              >
                "Businesses don't become successful
                because they sell products.
                <br />
                <br />
                They become successful because
                people trust the hands behind them."
              </p>

            </div>

          </motion.div>

          {/* ============================================= */}
          {/* Birth of Yarche */}
          {/* ============================================= */}

          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
            className="mt-40"
          >

            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* Content */}

              <div>

                <p
                  className="uppercase tracking-[8px] text-sm mb-6"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  THE NEXT CHAPTER
                </p>

                <h2
                  className="font-serif text-5xl leading-tight"
                  style={{
                    color: "#28170d",
                  }}
                >
                  The Birth
                  <br />
                  of Yarche
                </h2>

                <div
                  className="w-24 h-[2px] mt-8 mb-10"
                  style={{
                    background: "#28170d",
                  }}
                />

                <p
                  className="text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Years of offline experience inspired us to take the next step.
                  We wanted to bring the same trust, quality, and commitment to
                  people beyond our local markets.
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  That vision gave birth to
                  <strong style={{ color: "#28170d" }}>
                    {" "}Yarche.
                  </strong>
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  Yarche isn't just an online store.
                  It is our digital identity—built upon years of offline
                  experience, genuine relationships, and customer trust earned
                  since 2013.
                </p>

              </div>

              {/* Image */}

              <div className="relative">

                <div
                  className="absolute -bottom-6 -right-6 w-full h-full rounded-[32px]"
                  style={{
                    background: "#efd6ad",
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-[32px] shadow-2xl"
                  style={{
                    background: "#fff6e8",
                  }}
                >

                  <Image
                    src="/handmade3.png"
                    alt="Yarche"
                    width={700}
                    height={900}
                    className="w-full h-[650px] object-cover"
                  />

                </div>

              </div>

            </div>

          </motion.section>
                    {/* ============================================= */}
          {/* 2026 */}
          {/* ============================================= */}

          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-40"
          >
            <div
              className="rounded-[40px] p-10 md:p-16 lg:p-20"
              style={{
                background: "#fff6e8",
                border: "1px solid #e8d9bd",
              }}
            >
              <div className="max-w-5xl">

                <p
                  className="uppercase tracking-[8px] text-sm mb-6"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  2026
                </p>

                <h2
                  className="font-serif text-4xl md:text-6xl leading-tight"
                  style={{
                    color: "#28170d",
                  }}
                >
                  A New Identity,
                  <br />
                  The Same Values
                </h2>

                <div
                  className="w-24 h-[2px] mt-8 mb-10"
                  style={{
                    background: "#28170d",
                  }}
                />

                <p
                  className="text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  In <strong style={{ color: "#28170d" }}>2026</strong>, our
                  journey entered a new chapter as{" "}
                  <strong style={{ color: "#28170d" }}>
                    UJJWAL KITCHEN KING PRODUCT
                  </strong>{" "}
                  evolved into{" "}
                  <strong style={{ color: "#28170d" }}>
                    Ujjwal Household Pvt. Ltd.
                  </strong>
                  .
                </p>

                <p
                  className="mt-8 text-lg leading-10"
                  style={{
                    color: "#6b5a4d",
                  }}
                >
                  It wasn't simply a legal transformation or a new company name.
                  It reflected our commitment to innovation, stronger systems,
                  larger ambitions, and a future-ready brand while remaining
                  deeply connected to the values that built our foundation.
                </p>

              </div>
            </div>
          </motion.section>

          {/* ============================================= */}
          {/* Today */}
          {/* ============================================= */}

          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-40"
          >
            <div className="max-w-5xl mx-auto text-center">

              <p
                className="uppercase tracking-[8px] text-sm"
                style={{
                  color: "#6b5a4d",
                }}
              >
                TODAY
              </p>

              <h2
                className="font-serif text-5xl md:text-7xl mt-8 leading-tight"
                style={{
                  color: "#28170d",
                }}
              >
                Every Order
                <br />
                Carries A Story
              </h2>

              <p
                className="mt-12 text-xl leading-10"
                style={{
                  color: "#6b5a4d",
                }}
              >
                Today, every order we deliver carries far more than a product.
              </p>

              <p
                className="mt-8 text-xl leading-10"
                style={{
                  color: "#6b5a4d",
                }}
              >
                It carries the trust we've earned since <strong>2013</strong>,
                the values my father built this business on, and our promise to
                continue growing while staying true to our roots.
              </p>

            </div>
          </motion.section>

          {/* ============================================= */}
          {/* Final Closing */}
          {/* ============================================= */}

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-44 mb-32"
          >

            <div
              className="rounded-[48px] p-12 md:p-20 text-center"
              style={{
                background: "#28170d",
              }}
            >

              <p
                className="uppercase tracking-[8px] text-sm"
                style={{
                  color: "#efd6ad",
                }}
              >
                OUR JOURNEY CONTINUES
              </p>

              <h2
                className="font-serif text-4xl md:text-6xl leading-tight mt-8"
                style={{
                  color: "#fffbf5",
                }}
              >
                Our journey didn't begin
                <br />
                with a website.
              </h2>

              <p
                className="mt-12 text-xl leading-10 max-w-4xl mx-auto"
                style={{
                  color: "rgba(255,251,245,.85)",
                }}
              >
                It began with a dream in <strong>2013</strong>.
              </p>

              <p
                className="mt-8 text-xl leading-10 max-w-4xl mx-auto"
                style={{
                  color: "rgba(255,251,245,.85)",
                }}
              >
                Today, that dream continues with a new identity, a larger
                vision, and an even stronger commitment to every customer who
                places their trust in us.
              </p>

              <div
                className="w-32 h-[2px] mx-auto mt-16 mb-16"
                style={{
                  background: "#efd6ad",
                }}
              />

              <p
                className="font-serif italic text-2xl md:text-4xl leading-relaxed"
                style={{
                  color: "#efd6ad",
                }}
              >
                "Some businesses are started.
                <br />
                Ours was inherited with trust,
                <br />
                nurtured with passion,
                <br />
                and built for the future."
              </p>

            </div>

          </motion.section>

        </div>
      </section>
    </main>
  );
}