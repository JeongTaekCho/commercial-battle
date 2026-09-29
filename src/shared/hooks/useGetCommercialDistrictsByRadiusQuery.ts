import { getCommercialDistrictsByRadius } from "@/src/shared/api/getCommercialDistrictsByRadius";
import { useQuery } from "@tanstack/react-query";

interface CoordsType {
  latitude: number;
  longitude: number;
}

export const useGetCommercialDistrictsByRadiusQuery = (
  radius: number | undefined,
  coords: CoordsType | undefined,
) => {
  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  return useQuery({
    queryKey: ["commercialDistrictsByRadius", radius, latitude, longitude],

    enabled: radius !== undefined && latitude !== undefined && longitude !== undefined,

    queryFn: () => {
      if (radius === undefined || latitude === undefined || longitude === undefined) {
        throw new Error("반경과 좌표가 필요합니다.");
      }

      return getCommercialDistrictsByRadius(radius, latitude, longitude);
    },
  });
};
