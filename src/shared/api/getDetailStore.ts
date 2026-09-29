import { Store } from "@/src/types/storeType";
import { fetchApi } from "@/src/shared/utils/fetchApi";

export const getDetailStore = async (id: string): Promise<Store> => {
  const data = await fetchApi<Store>(`/stores/${id}`);

  return data;
};
