import axios from "axios";
import { API_BASE_URL } from "./constants";
import { useLoadingStore } from "@/src/store/loadingStore";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (config) => {
    // Start Global Loader
    useLoadingStore.getState().startLoading();

    if (typeof window !== "undefined") {
      // User token OR Admin token
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      console.log("🔥 TOKEN FROM STORAGE:", token);

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;

        console.log(
          "🔥 AUTH HEADER SET:",
          config.headers.Authorization
        );
      } else {
        console.log("❌ NO TOKEN FOUND");
      }
    }

    return config;
  },
  (error) => {
    // Stop Loader if request fails
    useLoadingStore.getState().stopLoading();
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (response) => {
    // Stop Global Loader
    useLoadingStore.getState().stopLoading();

    console.log("✅ RESPONSE SUCCESS:", response.config.url);

    return response;
  },
  (error) => {
    // Stop Global Loader
    useLoadingStore.getState().stopLoading();

    console.log("❌ RESPONSE ERROR:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data,
    });

    // Optional: logout on invalid token
    if (error.response?.status === 401) {
      console.log("⚠️ Unauthorized request");
    }

    return Promise.reject(error);
  }
);

export default API;