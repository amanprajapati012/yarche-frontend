"use client";

import { useEffect, useState } from "react";
import API from "@/src/lib/api";
import ProductGrid from "@/src/components/product/ProductGrid";
import Loader from "@/src/components/common/Loader";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");

      if (res.data.response === "success") {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground">
            All Products
          </h1>
          <p className="text-gray-600 mt-2">
            Explore premium collection curated for you
          </p>
        </div>

        {/* GRID */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}