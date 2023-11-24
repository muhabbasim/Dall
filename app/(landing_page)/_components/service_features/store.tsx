import { create } from "zustand";

type ServicesStore ={
  inViewService: number | null;
  setInViewService: (item: number | null) => void;
}

export const useSrvicesStore = create<ServicesStore>((set) => ({
  inViewService: null,
  setInViewService: (item: number | null) => set({ inViewService: item })
}))