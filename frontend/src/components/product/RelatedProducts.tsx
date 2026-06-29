"use client";

import ProductCard from "@/src/components/product/ProductCard";

export default function RelatedProducts({ products }: any) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16">

      {/* HEADER */}

      <div className="mb-8">

        <h2
          className="
          text-2xl
          md:text-3xl
          font-black
          text-foreground
        "
        >
          Related Products
        </h2>

        <p
          className="
          text-sm
          md:text-base
          text-[#7b6a5c]
          mt-2
        "
        >
          You may also like these products
        </p>

      </div>

      {/* GRID */}

      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        gap-4
        md:gap-6
      "
      >
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}