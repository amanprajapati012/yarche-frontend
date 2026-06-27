import API from "./api";

/* ================= TYPES ================= */
export type AddressPayload = {
  type?: "home" | "office" | "other";
  name: string;
  mobile: string;
  addressLine: string;
  landmark?: string;
  city: string;
  district?: string;
  state: string;
  country?: string;
  pincode: string;
  latitude?: string;
  longitude?: string;
};

export type Address = AddressPayload & {
  _id: string;
  isDefault?: boolean;
};

/* ================= API ================= */

export const getAddresses = async () => {
  return API.get("/address");
};

export const addAddress = async (data: AddressPayload) => {
  return API.post("/address", data);
};

export const updateAddress = async (id: string, data: Partial<AddressPayload>) => {
  return API.patch(`/address/${id}`, data);
};

export const deleteAddress = async (id: string) => {
  return API.delete(`/address/${id}`);
};

export const setDefaultAddress = async (id: string) => {
  return API.patch(`/address/default/${id}`);
};