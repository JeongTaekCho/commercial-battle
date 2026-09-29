import { deleteStore } from "@/src/api/stores/deleteStore";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { useMutation } from "@tanstack/react-query";

export const useDeleteStoreMutation = () => {
  const { refetch } = useGetStoreListQuery();

  return useMutation({
    mutationKey: ["deleteStore"],
    mutationFn: (id: number) => deleteStore(id),
    onSuccess: () => {
      refetch();
    },
  });
};
