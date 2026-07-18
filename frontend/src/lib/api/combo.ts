import API from "@/src/lib/api";
import { compressImage } from "@/src/lib/compressImage";

// ===========================
// TYPES
// ===========================

export interface ComboProductPayload {
  product: string;
  variantId?: string | null;
  quantity: number;
}

export interface ComboPayload {
  comboSku: string;
  title: string;
  description: string;

  products: ComboProductPayload[];

  discountedPrice: number;
  landingPrice: number;

  image?: File | null;
}

export interface Combo {
  _id: string;
  comboSku: string;
  title: string;
  description: string;

  image: {
    url: string;
    public_id: string;
  };

  products: {
    product: any;
    variantId?: string | null;
    quantity: number;
  }[];

  price: number;
  discountedPrice: number;
  landingPrice: number;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

// ===========================
// ADMIN — GET ALL COMBOS
// ===========================

export const getCombos = async (): Promise<Combo[]> => {
  const res = await API.get("/admin/get-combos");
  return res.data.combos;
};

// ===========================
// ADMIN — GET SINGLE COMBO
// ===========================

export const getComboById = async (id: string): Promise<Combo> => {
  const res = await API.get(`/admin/get-combo/${id}`);
  return res.data.combo;
};

// ===========================
// ADMIN — CREATE COMBO
// ===========================

export const createCombo = async (data: ComboPayload) => {
  const formData = new FormData();

  formData.append("comboSku", data.comboSku);
  formData.append("title", data.title);
  formData.append("description", data.description);

  formData.append("products", JSON.stringify(data.products));

  formData.append("discountedPrice", String(data.discountedPrice));
  formData.append("landingPrice", String(data.landingPrice));

  if (data.image) {
    const compressed = await compressImage(data.image);
    formData.append("image", compressed);
  }

  const res = await API.post("/admin/add-combo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// ===========================
// ADMIN — UPDATE COMBO
// ===========================

export const updateCombo = async (id: string, data: ComboPayload) => {
  const formData = new FormData();

  formData.append("comboSku", data.comboSku);
  formData.append("title", data.title);
  formData.append("description", data.description);

  formData.append("products", JSON.stringify(data.products));

  formData.append("discountedPrice", String(data.discountedPrice));
  formData.append("landingPrice", String(data.landingPrice));

  if (data.image instanceof File) {
    const compressed = await compressImage(data.image);
    formData.append("image", compressed);
  }

  const res = await API.put(`/admin/update-combo/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// ===========================
// ADMIN — DELETE COMBO
// ===========================

export const deleteCombo = async (id: string) => {
  const res = await API.delete(`/admin/delete-combo/${id}`);
  return res.data;
};

// ===========================
// PUBLIC — GET ALL COMBOS
// ===========================

export const getPublicCombos = async (): Promise<Combo[]> => {
  const res = await API.get("/combos");
  return res.data.combos;
};

// ===========================
// PUBLIC — GET COMBO BY ID
// ===========================

export const getPublicComboById = async (id: string): Promise<Combo> => {
  const res = await API.get(`/combo/${id}`);
  return res.data.combo;
};

// ===========================
// PUBLIC — GET COMBO BY SLUG (title-based)
// ===========================

export const getPublicComboByName = async (
  comboName: string
): Promise<Combo> => {
  const res = await API.get(
    `/combobyname/${encodeURIComponent(comboName)}`
  );
  return res.data.data;
};