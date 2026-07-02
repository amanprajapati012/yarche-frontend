"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";

import API from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";


import { getImageUrl } from "@/src/lib/image";



export default function CategoryPage() {
    const params = useParams();

    const categoryName = decodeURIComponent(
        params.category as string
    );

    const [category, setCategory] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] =
        useState("All");

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryName) {
            loadData();
        }
    }, [categoryName]);

    const loadData = async () => {
        try {
            setLoading(true);

            const [categoryRes, productRes, subRes] =
                await Promise.all([
                    API.get(
                        `/productcategorybyname/${encodeURIComponent(
                            categoryName
                        )}`
                    ),

                    API.get(
                        `/productbycategoryname/${encodeURIComponent(
                            categoryName
                        )}`
                    ),

                    API.get(
                        `/productsubcategorybycategoryname/${encodeURIComponent(
                            categoryName
                        )}`
                    ),
                ]);



            setCategory(
                categoryRes.data?.category || null
            );

            setProducts(
                productRes.data?.products || []
            );

            setSubcategories(
                subRes.data?.subCategory || []
            );
        } catch (error) {
            console.error(
                "CATEGORY PAGE ERROR =>",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = useMemo(() => {
        let data = [...products];

        if (selectedSubcategory !== "All") {
            data = data.filter(
                (item) =>
                    item.sub_category ===
                    selectedSubcategory
            );
        }

        if (search.trim()) {
            data = data.filter(
                (item) =>
                    item.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    item.title
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );
        }

        return data;
    }, [
        products,
        selectedSubcategory,
        search,
    ]);

    const categoryImage =
  category?.images?.length > 0
    ? getImageUrl(category.images[0])
    : "/placeholder.png";

    return (
        <div className="min-h-screen bg-[#fff8eb]">
            {/* HERO */}
            <section className="relative h-[260px] md:h-[420px] overflow-hidden">
                {categoryImage && (
                    <img
                        src={categoryImage}
                        alt={category?.category}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/55" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
                    <span className="text-white/80 text-sm">
                        Home / Categories
                    </span>

                    <h1 className="text-4xl md:text-6xl font-black text-white mt-3">
                        {category?.category ||
                            categoryName}
                    </h1>

                    <p className="text-white/90 mt-4 text-lg">
                        Discover our premium collection
                    </p>
                </div>
            </section>

            {/* FILTER */}
            <section className="sticky top-0 z-20 bg-[#fff8eb]/95 backdrop-blur border-b border-[#ead9b8]">
                <div className="max-w-7xl mx-auto px-4 py-5">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search Products..."
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#e5d6ba] bg-white outline-none"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto mt-4 pb-1">
                        <button
                            onClick={() =>
                                setSelectedSubcategory(
                                    "All"
                                )
                            }
                            className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${selectedSubcategory ===
                                "All"
                                ? "bg-[#ff6e23] text-white"
                                : "bg-white border"
                                }`}
                        >
                            All
                        </button>

                        {subcategories.map(
                            (sub: any) => (
                                <button
                                    key={sub._id}
                                    onClick={() =>
                                        setSelectedSubcategory(
                                            sub.sub_category
                                        )
                                    }
                                    className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${selectedSubcategory ===
                                        sub.sub_category
                                        ? "bg-[#ff6e23] text-white"
                                        : "bg-white border"
                                        }`}
                                >
                                    {sub.sub_category}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* DEBUG */}


            {/* PRODUCTS */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map(
                            (_, i) => (
                                <div
                                    key={i}
                                    className="h-[320px] bg-white rounded-3xl animate-pulse"
                                />
                            )
                        )}
                    </div>
                ) : filteredProducts.length ===
                    0 ? (
                    <div className="bg-white rounded-3xl p-14 text-center">
                        <h2 className="text-2xl font-bold">
                            No Products Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Category has no products
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-foreground">
                                Products
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
                            {filteredProducts.map(
                                (product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                )
                            )}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}