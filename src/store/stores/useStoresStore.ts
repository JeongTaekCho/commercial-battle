"use client";
import { create } from "zustand";
import { INITIAL_STORES } from "@/src/constants/store-previews";
import type { Store } from "@/src/types/storeType";

type StoresState = {
  stores: Store[];
  saveStore: (store: Store) => void;
  deleteStore: (id: number) => void;
};

// 샘플 상태를 페이지 이동 중 공유합니다. 새로고침하면 초기화됩니다.
export const useStoresStore = create<StoresState>((set) => ({
  stores: INITIAL_STORES,
  saveStore: (store) =>
    set(({ stores }) => ({
      stores: stores.some((item) => item.id === store.id)
        ? stores.map((item) => (item.id === store.id ? store : item))
        : [...stores, { ...store, id: Date.now() }],
    })),
  deleteStore: (id) => set(({ stores }) => ({ stores: stores.filter((store) => store.id !== id) })),
}));
