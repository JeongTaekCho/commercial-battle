import { getStoreList } from "@/src/shared/api/getStoreList";
import { Store } from "@/src/types/storeType";
import { useQuery } from "@tanstack/react-query";

export const useGetStoreListQuery = () => {
  return useQuery({
    queryKey: ["storeList"],
    queryFn: getStoreList,
  });
};
