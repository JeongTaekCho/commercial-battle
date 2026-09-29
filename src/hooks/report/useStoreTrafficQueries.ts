import { useQueries } from "@tanstack/react-query";
import {
  commercialDistrictsByRadiusOptions,
  type CoordsType,
} from "@/src/shared/queries/commercialDistrictsByRadiusOptions";
import { calculateTrafficScore, type TrafficData } from "@/src/shared/utils/calculateTrafficScore";

const TRAFFIC_CATEGORIES: { category: keyof TrafficData; middle: string; small: string }[] = [
  { category: "food", middle: "I201", small: "" },
  { category: "food", middle: "I202", small: "" },
  { category: "food", middle: "I203", small: "" },
  { category: "food", middle: "I204", small: "" },
  { category: "food", middle: "I205", small: "" },
  { category: "bar", middle: "I211", small: "" },
  { category: "cafe", middle: "I212", small: "" },
  { category: "convenience", middle: "", small: "G20405" },
  { category: "beauty", middle: "S207", small: "" },
];

export function useStoreTrafficQueries(coords: CoordsType | undefined, radius = 300) {
  const queries = useQueries({
    queries: TRAFFIC_CATEGORIES.map(({ middle, small }) =>
      commercialDistrictsByRadiusOptions(radius, coords, middle, small),
    ),
  });

  const isSuccess = queries.every((query) => query.isSuccess);
  let data: TrafficData | undefined;
  let totalCount: number = 0;

  if (isSuccess) {
    data = { food: 0, cafe: 0, convenience: 0, bar: 0, beauty: 0 };
    queries.forEach((query, index) => {
      console.log(query.data);
      data![TRAFFIC_CATEGORIES[index].category] += Number(query.data!.totalCount || 0);
      totalCount += Number(query.data!.totalCount || 0);
    });
  }

  return {
    data,
    totalCount,
    trafficScore: data ? calculateTrafficScore(data, radius) : undefined,
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isError: queries.some((query) => query.isError),
    error: queries.find((query) => query.isError)?.error ?? null,
  };
}
