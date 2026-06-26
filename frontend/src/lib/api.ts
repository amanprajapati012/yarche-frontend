import axios from "axios";
import { API_BASE_URL } from "./constants";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// 🔥 REQUEST INTERCEPTOR (DEBUG INCLUDED)
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("adminToken");

    console.log("🔥 TOKEN FROM STORAGE:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔥 AUTH HEADER SET:", config.headers.Authorization);
    } else {
      console.log("❌ NO TOKEN FOUND");
    }
  }

  return config;
});

// 🔥 RESPONSE DEBUG (IMPORTANT)
API.interceptors.response.use(
  (res) => {
    console.log("✅ RESPONSE SUCCESS:", res.config.url);
    return res;
  },
  (err) => {
    console.log("❌ RESPONSE ERROR:", {
      url: err.config?.url,
      status: err.response?.status,
      message: err.response?.data,
    });

    return Promise.reject(err);
  }
);

export default API;