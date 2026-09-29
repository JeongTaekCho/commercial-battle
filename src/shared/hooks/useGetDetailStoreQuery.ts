import { getDetailStore } from "@/src/shared/api/getDetailStore";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailStoreQuery = (id: string) => {
  return useQuery({
    queryKey: ["detailStore", id],
    queryFn: () => getDetailStore(id),
    enabled: !!id,
  });
};
