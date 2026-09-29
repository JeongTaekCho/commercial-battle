import type { Store } from "@/src/types/storeType";

export const INITIAL_STORES: Store[] = [
  { id: 1, name: "상권배틀 명동점", middle: "Q", small: "Q01", address: "서울 중구 명동길 1" },
  { id: 2, name: "명동 카페 골목", middle: "S", small: "S01", address: "서울 중구 을지로 12" },
];

export type ReportPreview = {
  activity: number;
  competition: number;
  competitors: number;
  score: number;
};
export const REPORT_PREVIEWS: Record<string, ReportPreview> = {
  "1": { activity: 84, competition: 72, competitors: 5, score: 79 },
  "2": { activity: 76, competition: 88, competitors: 2, score: 82 },
};
