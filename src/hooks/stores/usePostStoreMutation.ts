import { postStore } from "@/src/api/stores/postStore";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { toast } from "@/src/shared/utils/toast";
import { Store } from "@/src/types/storeType";
import { useMutation } from "@tanstack/react-query";

export const usePostStoreMutation = () => {
  const { refetch } = useGetStoreListQuery();

  return useMutation({
    mutationKey: ["postStore"],
    mutationFn: (data: Store) => postStore(data),
    onSuccess: () => {
      refetch();
      toast.success("새로운 매장이 등록되었어요. 분석리포트도 확인해보세요!");
    },
  });
};
