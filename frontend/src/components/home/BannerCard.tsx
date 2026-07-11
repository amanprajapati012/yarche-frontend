import Image from "next/image";

const banners = [
  {
    id: 1,
    image: "/handmade.png",
    title: "The Celebration\nStarts Here",
    leftOffer: "8% off",
    leftText: "on ₹1,000+",
    leftCode: "GR8TR8",
    rightOffer: "10% off",
    rightText: "on ₹4,000+",
    rightCode: "GR8TR10",
  },
  {
    id: 2,
    image: "/handmade2.png",
    title: "Unlock More\nRewards",
    leftOffer: "15% off",
    leftText: "on ₹8,000+",
    leftCode: "GR8TR15",
    rightOffer: "18% off",
    rightText: "on ₹16,000+",
    rightCode: "GR8TR18",
    topText: "Plus Mystery Gifts\nwith qualifying orders",
  },
  {
    id: 3,
    image: "/handmade3.png",
    title: "BB Members\nOnly Pass",
    subtitle: "Unlock at ₹20,000+",
    features: [
      "Exclusive Discounts",
      "Early Access",
      "Secret Deals",
    ],
  },
];

export default function BannerCard() {
  return (
    <main className="bg-background">
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-2xl aspect-[16/9] group"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">

                {banner.topText && (
                  <div className="text-right text-sm font-medium whitespace-pre-line">
                    {banner.topText}
                  </div>
                )}

                {!banner.topText && <div />}

                <div>
                  <h2 className="text-4xl font-bold leading-tight whitespace-pre-line">
                    {banner.title}
                  </h2>

                  {banner.subtitle && (
                    <p className="mt-2 text-lg">
                      {banner.subtitle}
                    </p>
                  )}
                </div>

                {banner.features ? (
                  <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
                    {banner.features.map((item) => (
                      <div
                        key={item}
                        className="bg-black/40 rounded-lg py-2"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-2xl font-bold">
                        {banner.leftOffer}
                      </h4>

                      <p className="text-sm">
                        {banner.leftText}
                      </p>

                      <span className="inline-block mt-2 rounded bg-black/60 px-3 py-1 text-xs">
                        USE: {banner.leftCode}
                      </span>
                    </div>

                    <div className="text-right">
                      <h4 className="text-2xl font-bold">
                        {banner.rightOffer}
                      </h4>

                      <p className="text-sm">
                        {banner.rightText}
                      </p>

                      <span className="inline-block mt-2 rounded bg-black/60 px-3 py-1 text-xs">
                        USE: {banner.rightCode}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}