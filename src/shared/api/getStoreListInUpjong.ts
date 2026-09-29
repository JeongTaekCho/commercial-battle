import { COMMERCIAL_BASE_URL } from "@/src/constants/api-url";
import { StoreListType } from "@/src/shared/types/shopApiType";
import { fetchApi } from "@/src/shared/utils/fetchApi";

export const getStoreListInUpjong = async (
  divld: "indsLclsCd" | "indsMclsCd" | "indsSclsCd",
  key: string,
): Promise<StoreListType["body"]> => {
  const params = new URLSearchParams({
    // URLSearchParams가 인코딩하므로 기존 인코딩 키는 먼저 디코딩합니다.
    ServiceKey: decodeURIComponent(process.env.NEXT_PUBLIC_COMMERCIAL_KEY ?? ""),
    pageNo: "1",
    numOfRows: "1000",
    divId: divld,
    key,
    type: "json",
  });

  const data = await fetchApi<StoreListType>(
    `${COMMERCIAL_BASE_URL}/storeListInUpjong?${params.toString()}`,
  );

  return data.body;
};
