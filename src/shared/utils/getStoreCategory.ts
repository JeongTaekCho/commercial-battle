import { getMiddleCategories, getSmallCategories } from "@/src/constants/industry-categories";
import type { Store } from "../../types/storeType";

export function getStoreCategories(store: Store) {
  const middle =
    getMiddleCategories().find((item) => item.code === store.middle)?.name ??
    { Q: "음식점", S: "카페" }[store.middle] ??
    "업종 확인 필요";
  const small =
    getSmallCategories(store.middle).find((item) => item.indsSclsCd === store.small)?.indsSclsNm ??
    { Q01: "한식", S01: "커피 전문점" }[store.small];
  return { middle, small };
}

export function getStoreCategory(store: Store) {
  const { middle, small } = getStoreCategories(store);
  return small ? `${middle} / ${small}` : middle;
}
