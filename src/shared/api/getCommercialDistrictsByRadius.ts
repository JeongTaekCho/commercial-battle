import { COMMERCIAL_BASE_URL } from "@/src/constants/api-url";
import { StoreListInRadiusType } from "@/src/shared/types/shopApiType";
import { fetchApi } from "@/src/shared/utils/fetchApi";

export const getCommercialDistrictsByRadius = async (
  radius: number,
  cx: number,
  cy: number,
): Promise<StoreListInRadiusType["body"]> => {
  const lat = String(cy);
  const lng = String(cx);

  const data = await fetchApi<StoreListInRadiusType>(
    `${COMMERCIAL_BASE_URL}/storeListInRadius?ServiceKey=${process.env.NEXT_PUBLIC_COMMERCIAL_KEY}&pageNo=1&numOfRows=1000&radius=${String(radius)}&cx=${lat}&cy=${lng}&type=json`,
  );

  return data.body;
};
