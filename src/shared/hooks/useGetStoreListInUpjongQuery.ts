import { getStoreListInUpjong } from "@/src/shared/api/getStoreListInUpjong";
import { useQuery } from "@tanstack/react-query";

export const useGetStoreListInUpjongQuery = (
  divld: "indsLclsCd" | "indsMclsCd" | "indsSclsCd",
  key: string,
) => {
  return useQuery({
    queryKey: ["storeListUpjong", divld, key],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    queryFn: () => getStoreListInUpjong(divld, key),
    enabled: !!divld && !!key,
  });
};
