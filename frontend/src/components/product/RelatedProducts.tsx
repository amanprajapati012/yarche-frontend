"use client";

import ProductCard from "@/src/components/product/ProductCard";

export default function RelatedProducts({ products }: any) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16">

      {/* HEADER */}

     

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