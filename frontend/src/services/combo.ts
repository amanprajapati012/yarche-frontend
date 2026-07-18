import API from "@/src/lib/api";
import { compressImage } from "@/src/lib/compressImage";
import { Combo, ComboPayload } from "@/src/types/combo";

// ===========================
// GET ALL COMBOS
// ===========================

export const getCombos = async (): Promise<Combo[]> => {
  const res = await API.get("/get-combos");

  return res.data.combos;
};

// ===========================
// GET SINGLE COMBO
// ===========================

export const getComboById = async (
  id: string
): Promise<Combo> => {
  const res = await API.get(`/get-combo/${id}`);

  return res.data.combo;
};

// ===========================
// CREATE COMBO
// ===========================

export const createCombo = async (
  data: ComboPayload
) => {
  const formData = new FormData();

  formData.append("comboSku", data.comboSku);
  formData.append("title", data.title);
  formData.append("description", data.description);

  formData.append(
    "products",
    JSON.stringify(data.products)
  );

  formData.append(
    "discountedPrice",
    String(data.discountedPrice)
  );

  formData.append(
    "landingPrice",
    String(data.landingPrice)
  );

  if (data.image) {
    const compressed = await compressImage(
      data.image
    );

    formData.append("image", compressed);
  }

  const res = await API.post(
    "/add-combo",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

// ===========================
// UPDATE COMBO
// ===========================

export const updateCombo = async (
  id: string,
  data: ComboPayload
) => {
  const formData = new FormData();

  formData.append("comboSku", data.comboSku);
  formData.append("title", data.title);
  formData.append("description", data.description);

  formData.append(
    "products",
    JSON.stringify(data.products)
  );

  formData.append(
    "discountedPrice",
    String(data.discountedPrice)
  );

  formData.append(
    "landingPrice",
    String(data.landingPrice)
  );

  if (data.image instanceof File) {
    const compressed = await compressImage(
      data.image
    );

    formData.append("image", compressed);
  }

  const res = await API.put(
    `/update-combo/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

// ===========================
// DELETE COMBO
// ===========================

export const deleteCombo = async (
  id: string
) => {
  const res = await API.delete(
    `/delete-combo/${id}`
  );

  return res.data;
};