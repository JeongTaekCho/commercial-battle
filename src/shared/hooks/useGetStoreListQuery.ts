import { getStoreList } from "@/src/shared/api/getStoreList";
import { useQuery } from "@tanstack/react-query";

export const useGetStoreListQuery = () => {
  return useQuery({
    queryKey: ["storeList"],
    queryFn: getStoreList,
  });
};
