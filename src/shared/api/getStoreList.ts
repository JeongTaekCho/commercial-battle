import { Store } from "@/src/types/storeType";
import { fetchApi } from "@/src/shared/utils/fetchApi";

export const getStoreList = async (): Promise<Store[]> => {
  const data = await fetchApi<Store[]>("/stores");

  return data;
};
