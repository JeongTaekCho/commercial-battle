import { Store } from "@/src/types/storeType";
import { create } from "zustand";

interface BattleStoreType {
  storeA: Store | null;
  storeB: Store | null;
  setStoreA: (middleType: Store | undefined) => void;
  setStoreB: (smallType: Store | undefined) => void;
}

export const useBattleStore = create<BattleStoreType>((set) => ({
  storeA: null,
  storeB: null,
  setStoreA: (storeA: Store | undefined) => set({ storeA }),
  setStoreB: (storeB: Store | undefined) => set({ storeB }),
}));
