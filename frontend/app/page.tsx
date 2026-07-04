import FeatureBar from "@/src/components/home/FeatureBar";
import CollectionTiles from "@/src/components/home/CollectionTiles";
import Banner from "@/src/components/home/Banner";
import Bestseller from "@/src/components/home/Bestseller";
import CraftStory from "@/src/components/home/CraftStory";
import NewArrivals from "@/src/components/home/NewArrivals";
import TopProducts from "@/src/components/home/TopProducts";
import ShopByCategory from "@/src/components/home/ShopByCategory";

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen">
      <FeatureBar />
     
      <ShopByCategory />
      <TopProducts />
      <Banner />
      <Bestseller />
      <CraftStory />
      <NewArrivals />
       <CollectionTiles />
    </div>
  );
}