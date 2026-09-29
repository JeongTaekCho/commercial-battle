import { fetchApi } from "@/src/shared/utils/fetchApi";

export const deleteStore = async (id: number) => {
  const result = await fetchApi(`/stores/${id}`, {
    method: "DELETE",
  });

  return result;
};
