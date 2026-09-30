import { COMPETITION_BASELINES } from "../../constants/competition-baselines";
import type { StoreListType } from "../types/shopApiType";
import type { Store } from "../../types/storeType";
import type { ShopType } from "../types/shopApiType";

/** 높을수록 150m 내 동일 소분류 경쟁 업체가 적다는 의미. */
export function calculateCompetitionScore(smallCode: string, competitorCount: number) {
  if (
    !Object.prototype.hasOwnProperty.call(COMPETITION_BASELINES, smallCode) ||
    !Number.isSafeInteger(competitorCount) ||
    competitorCount < 0
  )
    return undefined;

  const baseline = COMPETITION_BASELINES[smallCode as keyof typeof COMPETITION_BASELINES];
  return Math.round(100 * 2 ** (-competitorCount / baseline));
}

export function countCompetitors(
  data: StoreListType["body"] | undefined,
  store: Store | undefined,
) {
  if (!data || !store) return;

  const total = Number(data.totalCount);
  if (!Number.isSafeInteger(total) || total < 0) return undefined;

  return Math.max(0, total - (findOwnStoreId(data.items, store) !== undefined ? 1 : 0));
}

export function findOwnStoreId(items: readonly ShopType[], store: Store) {
  // Store.id는 앱 내부 ID이므로 공공데이터 bizesId와 비교하지 않는다.
  // 같은 소분류·상호·주소로 유일하게 확인되는 매장만 본인 점포로 제외한다.
  const normalize = (value: string) => value.replace(/\s+/g, "").trim();
  const name = normalize(store.name);
  const address = normalize(store.address);
  const matches = new Set(
    items
      .filter(
        (item) =>
          name &&
          address &&
          item.indsSclsCd === store.small &&
          normalize(item.bizesNm) === name &&
          [item.rdnmAdr, item.lnoAdr].some((value) => normalize(value ?? "") === address),
      )
      .map((item) => item.bizesId),
  );

  return matches.size === 1 ? matches.values().next().value : undefined;
}
