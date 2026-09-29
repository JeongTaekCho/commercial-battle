"use client";

import { createContext, useContext } from "react";
import type { MapInstance } from "./types";

export const NaverMapContext = createContext<MapInstance | null | undefined>(undefined);

export const useNaverMap = () => {
  const map = useContext(NaverMapContext);
  if (map === undefined) {
    throw new Error("useNaverMap은 NaverMap의 children 안에서 사용해야 합니다.");
  }
  return map;
};
