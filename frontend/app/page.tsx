"use client";

import { useEffect, useState } from "react";

import API from "@/src/lib/api";

import FeatureBar from "@/src/components/home/FeatureBar";
import CollectionTiles from "@/src/components/home/CollectionTiles";
import Banner from "@/src/components/home/Banner";
import Bestseller from "@/src/components/home/Bestseller";
import CraftStory from "@/src/components/home/CraftStory";
import NewArrivals from "@/src/components/home/NewArrivals";
import TopProducts from "@/src/components/home/TopProducts";
import ShopByCategory from "@/src/components/home/ShopByCategory";
import BannerCard from "@/src/components/home/BannerCard";
import HomeCombosSection from "@/src/components/home/HomeCombosSection";


export default function Home() {

  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const res = await API.get("/productcategories");

        const data =
          res.data?.data?.map(
            (item: any) => item.category
          ) || [];


        setCategories(data);


      } catch (error) {

        console.error(
          "Category Error:",
          error
        );

      }

    };


    fetchCategories();

  }, []);



  return (

    <div className="w-full bg-background min-h-screen">


      {/* HERO + CATEGORY SIDEBAR */}
      <FeatureBar
        categories={categories}
      />

      <BannerCard />


      <ShopByCategory />

        <HomeCombosSection />


      <TopProducts />


      <Banner />


      <Bestseller />


      <NewArrivals />


      <CraftStory />


      {/* <CollectionTiles /> */}


    </div>

  );
}