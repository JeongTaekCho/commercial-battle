import { patchStore } from "@/src/api/stores/patchStore";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { Store } from "@/src/types/storeType";
import { useMutation } from "@tanstack/react-query";

export const usePatchStoreMutation = () => {
  const { refetch } = useGetStoreListQuery();

  return useMutation({
    mutationKey: ["patchStore"],
    mutationFn: (data: Store) => patchStore(data),
    onSuccess: () => {
      refetch();
    },
  });
};
