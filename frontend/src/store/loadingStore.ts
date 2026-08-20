import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  requestCount: number;
  startLoading: () => void;
  stopLoading: () => void;
}

// Only show the global loader if a request is genuinely slow, and once shown
// never flicker it off in under MIN_VISIBLE_MS. This is what makes the site
// *feel* fast: quick API calls never trigger a full-screen loader at all.
const SHOW_DELAY_MS = 220;
const MIN_VISIBLE_MS = 260;

let showTimer: ReturnType<typeof setTimeout> | null = null;
let shownAt = 0;

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loading: false,
  requestCount: 0,

  startLoading: () => {
    const count = get().requestCount + 1;
    set({ requestCount: count });

    if (showTimer || get().loading) return;

    showTimer = setTimeout(() => {
      showTimer = null;
      if (get().requestCount > 0) {
        shownAt = Date.now();
        set({ loading: true });
      }
    }, SHOW_DELAY_MS);
  },

  stopLoading: () => {
    const count = Math.max(0, get().requestCount - 1);
    set({ requestCount: count });

    if (count > 0) return;

    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
      return;
    }

    if (!get().loading) return;

    const elapsed = Date.now() - shownAt;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setTimeout(() => {
      if (get().requestCount === 0) set({ loading: false });
    }, remaining);
  },
}));
