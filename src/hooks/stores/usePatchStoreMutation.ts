import { patchStore } from "@/src/api/stores/patchStore";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { toast } from "@/src/shared/utils/toast";
import { Store } from "@/src/types/storeType";
import { useMutation } from "@tanstack/react-query";

export const usePatchStoreMutation = () => {
  const { refetch } = useGetStoreListQuery();

  return useMutation({
    mutationKey: ["patchStore"],
    mutationFn: (data: Store) => patchStore(data),
    onSuccess: () => {
      refetch();
      toast.success("매장 정보가 수정되었어요. 새로운 분석 리포트를 확인해보세요!");
    },
  });
};
