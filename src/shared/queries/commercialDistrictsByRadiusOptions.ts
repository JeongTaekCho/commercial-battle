import { getCommercialDistrictsByRadius } from "@/src/shared/api/getCommercialDistrictsByRadius";
import { queryOptions } from "@tanstack/react-query";

export interface CoordsType {
  latitude: number;
  longitude: number;
}

export const commercialDistrictsByRadiusOptions = (
  radius: number | undefined,
  coords: CoordsType | undefined,
  indsMclsCd = "",
  indsSclsCd = "",
) => {
  const latitude = coords?.latitude;
  const longitude = coords?.longitude;
  // GPS 좌표의 미세한 소수점 변화로 같은 지역을 새 쿼리로 만들지 않습니다.
  const cacheLatitude = latitude === undefined ? undefined : Number(latitude.toFixed(4));
  const cacheLongitude = longitude === undefined ? undefined : Number(longitude.toFixed(4));

  return queryOptions({
    queryKey: [
      "commercialDistrictsByRadius",
      radius,
      cacheLatitude,
      cacheLongitude,
      indsMclsCd,
      indsSclsCd,
    ],
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    enabled: radius !== undefined && latitude !== undefined && longitude !== undefined,

    queryFn: () => {
      if (radius === undefined || latitude === undefined || longitude === undefined) {
        throw new Error("반경과 좌표가 필요합니다.");
      }

      return getCommercialDistrictsByRadius(
        radius,
        cacheLatitude ?? latitude,
        cacheLongitude ?? longitude,
        indsMclsCd,
        indsSclsCd,
      );
    },
  });
};
