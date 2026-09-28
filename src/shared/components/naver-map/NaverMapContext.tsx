"use client";

import { createContext, useContext } from "react";
import type { MapInstance } from "./types";

// undefined: Provider 밖, null: SDK/지도 초기화 대기 중.
export const NaverMapContext = createContext<MapInstance | null | undefined>(undefined);

/** 가장 가까운 NaverMap의 인스턴스. 지도 준비 전에는 null을 반환합니다. */
export function useNaverMap() {
  const map = useContext(NaverMapContext);
  if (map === undefined) {
    throw new Error("useNaverMap은 NaverMap의 children 안에서 사용해야 합니다.");
  }
  return map;
}
