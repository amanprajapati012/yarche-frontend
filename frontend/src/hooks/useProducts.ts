import { useQuery } from "@tanstack/react-query";
import API from "@/src/lib/api";

const fetchProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};