import { fetchApi } from "@/src/shared/utils/fetchApi";
import { Store } from "@/src/types/storeType";

export const patchStore = async (data: Store) => {
  const result = await fetchApi(`/stores/${data.id}`, {
    method: "PATCH",
    body: data,
  });

  return result;
};
