import { getCommercialDistrictsByRadius } from "@/src/shared/api/getCommercialDistrictsByRadius";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useQuery } from "@tanstack/react-query";

export const useGetCommercialDistrictsByRadiusQuery = () => {
  const { coords, radius } = useLocationStore();

  return useQuery({
    queryKey: ["commercialDistrictsByRadius", radius, coords.latitude, coords.longitude],
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey[2] === coords.latitude &&
      previousQuery?.queryKey[3] === coords.longitude
        ? previousData
        : undefined,
    queryFn: () => getCommercialDistrictsByRadius(radius, coords.latitude, coords.longitude),
  });
};
