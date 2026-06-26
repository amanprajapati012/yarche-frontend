"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/src/lib/api";

import ProductGallery from "@/src/components/product/ProductGallery";
import ProductInfo from "@/src/components/product/ProductInfo";
import ProductTabs from "@/src/components/product/ProductTabs";
import RelatedProducts from "@/src/components/product/RelatedProducts";
import Loader from "@/src/components/common/Loader";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const cleanSlug = decodeURIComponent(slug).toLowerCase();

      const res = await API.get(
        `/productbyname/${encodeURIComponent(cleanSlug)}`
      );

      if (res.data.response === "success") {
        const data = res.data.data;

        setProduct(data);
        setSelectedVariant(null);

        if (data?.category) {
          fetchRelated(data.category, data._id);
        }
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (
    category: string,
    productId: string
  ) => {
    try {
      const res = await API.get(
        `/products?category=${encodeURIComponent(category)}`
      );

      if (res.data.response === "success") {
        const products = res.data.products || [];

        setRelated(
          products.filter(
            (item: any) => item._id !== productId
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff6e2] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fff6e2] flex items-center justify-center px-4">
        <div className="bg-[#f5e6c6] border border-[#28170D]/10 rounded-[24px] md:rounded-[30px] p-6 md:p-8 text-center max-w-md w-full">
          <h2 className="text-2xl md:text-3xl font-black text-[#28170D]">
            Product Not Found
          </h2>

          <p className="text-[#6b584b] mt-3 text-sm md:text-base">
            The product you are looking for does not exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff6e2] relative overflow-x-hidden">

      {/* Background Blur */}

      <div className="absolute top-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#28170D]/5 blur-[100px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#28170D]/5 blur-[140px] rounded-full" />

      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 md:py-10">

        {/* Product Section */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1.05fr_0.95fr]
            gap-6
            md:gap-10
            items-start
            w-full
          "
        >
          <div className="w-full min-w-0">
            <ProductGallery
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          </div>

          <div className="w-full min-w-0">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          </div>
        </div>

        {/* Tabs */}

        <div className="mt-10 md:mt-14 w-full">
          <ProductTabs
            product={product}
            selectedVariant={selectedVariant}
          />
        </div>

        {/* Related Products */}

        {related?.length > 0 && (
          <div className="mt-14 md:mt-20">

            <div className="mb-8">

              <span
                className="
                  inline-flex
                  items-center
                  px-4
                  py-2
                  rounded-full
                  bg-[#FF6E23]
                  text-[#28170D]
                  font-bold
                  text-[11px]
                  md:text-xs
                  uppercase
                "
              >
                Recommended
              </span>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                  font-black
                  text-[#28170D]
                  mt-4
                  break-words
                "
              >
                Related Products
              </h2>

              <p className="text-[#6b584b] mt-3 text-sm md:text-base">
                Handpicked products you may also like.
              </p>
            </div>

            <RelatedProducts products={related} />
          </div>
        )}
      </div>
    </div>
  );
}