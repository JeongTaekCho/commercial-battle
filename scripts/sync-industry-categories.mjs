import { mkdir, writeFile } from "node:fs/promises";

const rawKey = process.env.NEXT_PUBLIC_COMMERCIAL_KEY;
if (!rawKey) throw new Error("NEXT_PUBLIC_COMMERCIAL_KEY가 필요합니다.");
const serviceKey = rawKey.includes("%") ? decodeURIComponent(rawKey) : rawKey;
const url = new URL("https://apis.data.go.kr/B553077/api/open/sdsc2/smallUpjongList");
url.search = new URLSearchParams({ ServiceKey: serviceKey, type: "json", numOfRows: "1000", pageNo: "1" }).toString();

const response = await fetch(url);
if (!response.ok) throw new Error(`상권업종 API 호출 실패: ${response.status} ${await response.text()}`);
const payload = await response.json();
if (payload?.header?.resultCode !== "00") throw new Error(`상권업종 API 오류: ${payload?.header?.resultMsg}`);

const items = payload.body?.items ?? [];
const categories = [...new Map(items.map((item) => [item.indsSclsCd, {
  indsMclsCd: String(item.indsMclsCd),
  indsMclsNm: String(item.indsMclsNm),
  indsSclsCd: String(item.indsSclsCd),
  indsSclsNm: String(item.indsSclsNm),
}])).values()].sort((a, b) => a.indsSclsCd.localeCompare(b.indsSclsCd));
const middleCount = new Set(categories.map((item) => item.indsMclsCd)).size;
if (categories.length !== 247 || middleCount !== 75) throw new Error(`응답 개수 검증 실패: 중분류 ${middleCount}개 / 소분류 ${categories.length}개`);

const rows = categories.map((item) => `  ${JSON.stringify(item)},`).join("\n");
const output = `/** 소상공인시장진흥공단 상권업종분류 API 응답에서 생성됨. */
export type IndustryCategory = { indsMclsCd: string; indsMclsNm: string; indsSclsCd: string; indsSclsNm: string };
export const INDUSTRY_CATEGORIES = [
${rows}
] as const satisfies readonly IndustryCategory[];
export type MiddleCategory = { code: string; name: string };
export const getMiddleCategories = (): MiddleCategory[] => Array.from(new Map(INDUSTRY_CATEGORIES.map((item) => [item.indsMclsCd, { code: item.indsMclsCd, name: item.indsMclsNm }])).values());
export const getSmallCategories = (middleCode: string) => INDUSTRY_CATEGORIES.filter((item) => item.indsMclsCd === middleCode);
export const getCategoryBySmallCode = (smallCode: string) => INDUSTRY_CATEGORIES.find((item) => item.indsSclsCd === smallCode);
export const isValidCategoryPath = (middleCode: string, smallCode: string) => INDUSTRY_CATEGORIES.some((item) => item.indsMclsCd === middleCode && item.indsSclsCd === smallCode);
`;
await mkdir("src/constants", { recursive: true });
await writeFile("src/constants/industry-categories.ts", output, "utf8");
console.log(`상수 생성 완료: 중분류 ${middleCount}개 / 소분류 ${categories.length}개`);
