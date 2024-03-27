import { create } from "zustand";

interface PageState {
  page: number;
  pageSize: number;
  sort: "name" | "activity" | "popular";
  order: "asc" | "desc";
  setPage: (newPage: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const usePageStore = create<PageState>((set) => ({
  page: 1,
  pageSize: 10,
  sort: "name",
  order: "asc",
  setPage: (newPage) => set({ page: newPage }),
  setPageSize: (pageSize) => set({ pageSize }),
}));
