"use client";
import { create } from "zustand";
import { INITIAL_STORES } from "@/src/constants/store-previews";
import type { Store } from "@/src/types/storeType";

type StoresState = {
  stores: Store[];
};

// 샘플 상태를 페이지 이동 중 공유합니다. 새로고침하면 초기화됩니다.
export const useStoresStore = create<StoresState>((set) => ({
  stores: INITIAL_STORES,
}));
