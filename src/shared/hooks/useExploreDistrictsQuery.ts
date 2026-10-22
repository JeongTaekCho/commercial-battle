import { useQuery } from "@tanstack/react-query";
import {
  getCommercialDistrictsByPolygon,
  polygonToWkt,
} from "@/src/shared/api/getCommercialDistrictsByPolygon";
import { useGetCommercialDistrictsByRadiusQuery } from "@/src/shared/hooks/useGetCommercialDistrictsByRadiusQuery";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useTypeFilterStore } from "@/src/store/explore/useTypeFilterStore";
import { useExploreAreaStore } from "@/src/store/explore/useExploreAreaStore";

export function useExploreDistrictsQuery() {
  const { coords, radius } = useLocationStore();
  const { middleType, smallType } = useTypeFilterStore();
  const { mode, points, complete } = useExploreAreaStore();
  const radiusQuery = useGetCommercialDistrictsByRadiusQuery(
    mode === "radius" ? radius : undefined,
    coords,
    middleType,
    smallType,
  );
  const polygonKey = complete && points.length >= 3 ? polygonToWkt(points) : null;
  const polygonQuery = useQuery({
    queryKey: ["commercialDistrictsByPolygon", polygonKey, middleType, smallType],
    queryFn: () => getCommercialDistrictsByPolygon(points, middleType, smallType),
    enabled: mode === "polygon" && polygonKey !== null,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });
  return mode === "polygon" ? polygonQuery : radiusQuery;
}
