import { useQuery } from "@tanstack/react-query";
import {
  commercialDistrictsByRadiusOptions,
  type CoordsType,
} from "@/src/shared/queries/commercialDistrictsByRadiusOptions";

export const useGetCommercialDistrictsByRadiusQuery = (
  radius: number | undefined,
  coords: CoordsType | undefined,
  indsMclsCd = "",
  indsSclsCd = "",
) => useQuery(commercialDistrictsByRadiusOptions(radius, coords, indsMclsCd, indsSclsCd));
