import { useGetDetailStoreQuery } from "@/src/shared/hooks/useGetDetailStoreQuery";
import { useGetCommercialDistrictsByRadiusQuery } from "@/src/shared/hooks/useGetCommercialDistrictsByRadiusQuery";
import {
  calculateCompetitionScore,
  countCompetitors,
} from "@/src/shared/utils/calculateCompetitionScore";
import type { Store } from "@/src/types/storeType";

type CompetitionScoreOptions = {
  storeId?: string;
  latitude?: number;
  longitude?: number;
  smallCategoryCode?: string;
  store?: Store | null;
  radius?: number;
};

export function useCompetitionScore({
  storeId,
  latitude,
  longitude,
  smallCategoryCode,
  store,
  radius = 150,
}: CompetitionScoreOptions) {
  const detailQuery = useGetDetailStoreQuery(store ? "" : (storeId ?? ""));
  const targetStore = store ?? detailQuery.data;
  const targetLatitude = targetStore?.y ?? latitude;
  const targetLongitude = targetStore?.x ?? longitude;
  const targetSmallCode = targetStore?.small ?? smallCategoryCode;
  const hasCoords = targetLatitude != null && targetLongitude != null;

  const competitionQuery = useGetCommercialDistrictsByRadiusQuery(
    radius,
    targetSmallCode && hasCoords
      ? { latitude: targetLatitude, longitude: targetLongitude }
      : undefined,
    "",
    targetSmallCode,
  );

  const competitionCount = competitionQuery.isSuccess
    ? competitionQuery.data
      ? targetStore
        ? (countCompetitors(competitionQuery.data, targetStore) ?? 0)
        : Number.isSafeInteger(competitionQuery.data.totalCount)
          ? competitionQuery.data.totalCount
          : 0
      : 0
    : undefined;
  const score =
    targetSmallCode && competitionCount !== undefined
      ? calculateCompetitionScore(targetSmallCode, competitionCount)
      : undefined;

  return {
    score,
    competitionCount,
    competitors: competitionQuery.data?.items ?? [],
    data: competitionQuery.data,
    isLoading: detailQuery.isLoading || competitionQuery.isLoading,
    isFetching: detailQuery.isFetching || competitionQuery.isFetching,
    isError: detailQuery.isError || competitionQuery.isError,
    error: detailQuery.error ?? competitionQuery.error ?? null,
  };
}
