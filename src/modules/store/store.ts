import { create } from "zustand";

interface PageState {
  page: number;
  setPage: (newPage: number) => void;
}

export const usePageStore = create<PageState>((set) => ({
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
}));
