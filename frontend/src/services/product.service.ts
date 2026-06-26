import API from "@/src/lib/api";

export const productService = {
  getAll: async (params?: any) => {
    const res = await API.get("/products", { params });
    return res.data;
  },

  getBySlug: async (slug: string) => {
    const res = await API.get(`/products/${slug}`);
    return res.data;
  },
};