import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  requestCount: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loading: false,
  requestCount: 0,

  startLoading: () => {
    const count = get().requestCount + 1;

    set({
      requestCount: count,
      loading: true,
    });
  },

  stopLoading: () => {
    const count = Math.max(0, get().requestCount - 1);

    set({
      requestCount: count,
      loading: count > 0,
    });
  },
}));