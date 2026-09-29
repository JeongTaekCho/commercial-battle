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

  return queryOptions({
    queryKey: ["commercialDistrictsByRadius", radius, latitude, longitude, indsMclsCd, indsSclsCd],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    enabled: radius !== undefined && latitude !== undefined && longitude !== undefined,

    queryFn: () => {
      if (radius === undefined || latitude === undefined || longitude === undefined) {
        throw new Error("반경과 좌표가 필요합니다.");
      }

      return getCommercialDistrictsByRadius(radius, latitude, longitude, indsMclsCd, indsSclsCd);
    },
  });
};
