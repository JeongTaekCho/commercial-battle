"use client";

import { useMemo } from "react";
import NaverMap from "@/src/shared/components/NaverMap";
import ClusterMarkerLayer, {
  type NaverMapMarker,
} from "@/src/shared/components/naver-map/ClusterMarkerLayer";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useGetCommercialDistrictsByRadiusQuery } from "@/src/shared/hooks/useGetCommercialDistrictsByRadiusQuery";
import AsideInfo from "@/src/components/explore/AsideInfo";
import AddressSelect from "@/src/components/explore/AddressSelect";
import { useTypeFilterStore } from "@/src/store/explore/useTypeFilterStore";
import MyMarkerLayer from "@/src/shared/components/naver-map/MyMarkerLayer";
import MapLoadingOverlay from "@/src/components/explore/MapLoadingOverlay";
export default function ExplorePage() {
  const { address, coords, radius } = useLocationStore();
  const { middleType, smallType } = useTypeFilterStore();

  const { data: districtsByRadiusData, isFetching } = useGetCommercialDistrictsByRadiusQuery(
    radius,
    coords,
    middleType,
    smallType,
  );

  const markers = useMemo<NaverMapMarker[]>(
    () =>
      (districtsByRadiusData?.items ?? []).map((item) => ({
        id: item.bizesId,
        name: [item.bizesNm, item.brchNm].filter(Boolean).join(" "),
        address: item.rdnmAdr || item.lnoAdr,
        latitude: item.lat,
        longitude: item.lon,
        smallCategoryCode: item.indsSclsCd,
      })),
    [districtsByRadiusData?.items],
  );

  return (
    <>
      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1440px] lg:grid-cols-[360px_1fr]">
        <AsideInfo />
        <section
          aria-busy={isFetching}
          className="relative isolate min-h-[680px] overflow-hidden bg-[#edf2f3]"
        >
          <NaverMap latitude={coords.latitude} longitude={coords.longitude} zoom={18}>
            <ClusterMarkerLayer markers={markers} />
            <MyMarkerLayer />
          </NaverMap>
          <AddressSelect />
          <div className="w-[calc(100%-105px)] absolute bottom-4 left-3 right-3 z-10 rounded-card border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-5 md:left-8 md:right-8">
            <p className="text-xs font-black text-brand">현재 지도 영역</p>
            <p className="mt-1 text-sm font-bold">
              {address} · {isFetching ? "매장 조회 중" : `매장 ${markers.length}곳`}
            </p>
          </div>
          {isFetching && <MapLoadingOverlay />}
        </section>
      </main>
    </>
  );
}
