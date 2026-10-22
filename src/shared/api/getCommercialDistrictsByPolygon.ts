import { COMMERCIAL_BASE_URL } from "@/src/constants/api-url";
import type { PolygonPoint } from "@/src/store/explore/useExploreAreaStore";
import type { StoreListType } from "@/src/shared/types/shopApiType";
import { fetchApi } from "@/src/shared/utils/fetchApi";

export function polygonToWkt(points: readonly PolygonPoint[]) {
  if (
    points.length < 3 ||
    points.some((point) => !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude))
  ) {
    throw new Error("유효한 꼭짓점이 3개 이상 필요합니다.");
  }
  const ring = [...points, points[0]];
  return `POLYGON ((${ring.map(({ longitude, latitude }) => `${longitude} ${latitude}`).join(",")}))`;
}

export async function getCommercialDistrictsByPolygon(
  points: readonly PolygonPoint[],
  indsMclsCd = "",
  indsSclsCd = "",
): Promise<StoreListType["body"]> {
  const params = new URLSearchParams({
    ServiceKey: decodeURIComponent(process.env.NEXT_PUBLIC_COMMERCIAL_KEY ?? ""),
    pageNo: "1",
    numOfRows: "1000",
    key: polygonToWkt(points),
    type: "json",
  });
  if (indsMclsCd) params.set("indsMclsCd", indsMclsCd);
  if (indsSclsCd) params.set("indsSclsCd", indsSclsCd);
  const data = await fetchApi<StoreListType>(
    `${COMMERCIAL_BASE_URL}/storeListInPolygon?${params.toString()}`,
  );
  if (data.header?.resultCode && data.header.resultCode !== "00") {
    throw new Error(data.header.resultMsg || "상권 조회에 실패했습니다.");
  }
  return data.body;
}
