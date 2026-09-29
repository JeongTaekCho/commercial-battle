import { fetchApi } from "@/src/shared/utils/fetchApi";
import { Store } from "@/src/types/storeType";

export const postStore = async (data: Store) => {
  const result = await fetchApi("/stores", {
    method: "POST",
    body: data,
  });

  return result;
};
