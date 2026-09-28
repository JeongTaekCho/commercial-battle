import { create } from "zustand";

interface TypeFilterStore {
  middleType: string;
  smallType: string;
  setMiddleType: (middleType: string) => void;
  setSmallType: (smallType: string) => void;
}

export const useTypeFilterStore = create<TypeFilterStore>((set) => ({
  middleType: "",
  smallType: "",
  setMiddleType: (middleType: string) => set({ middleType }),
  setSmallType: (smallType: string) => set({ smallType }),
}));
