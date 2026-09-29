import { postStore } from "@/src/api/stores/postStore";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { Store } from "@/src/types/storeType";
import { useMutation } from "@tanstack/react-query";

export const usePostStoreMutation = () => {
  const { refetch } = useGetStoreListQuery();

  return useMutation({
    mutationKey: ["postStore"],
    mutationFn: (data: Store) => postStore(data),
    onSuccess: () => {
      refetch();
    },
  });
};
