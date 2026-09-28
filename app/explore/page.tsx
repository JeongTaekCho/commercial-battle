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
export default function ExplorePage() {
  const { address, coords } = useLocationStore();
  const { middleType, smallType } = useTypeFilterStore();

  const { data: districtsByRadiusData } = useGetCommercialDistrictsByRadiusQuery();

  const filterData = useMemo<NaverMapMarker[]>(
    () =>
      (districtsByRadiusData?.items ?? [])
        .filter(
          (item) =>
            (!middleType || item.indsMclsCd === middleType) &&
            (!smallType || item.indsSclsCd === smallType),
        )
        .map((item) => ({
          id: item.bizesId,
          name: item.bizesNm,
          latitude: item.lat,
          longitude: item.lon,
          smallCategoryCode: item.indsSclsCd,
        })),
    [districtsByRadiusData?.items, middleType, smallType],
  );

  return (
    <>
      <main className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1440px] lg:grid-cols-[360px_1fr]">
        <AsideInfo />
        <section className="relative min-h-[680px] overflow-hidden bg-[#edf2f3]">
          <NaverMap latitude={coords.latitude} longitude={coords.longitude} zoom={17}>
            <ClusterMarkerLayer markers={filterData} />
          </NaverMap>
          <AddressSelect />
          <div className="absolute bottom-5 left-5 right-5 z-10 rounded-card border border-white/70 bg-white/95 p-5 shadow-xl backdrop-blur md:left-8 md:right-8">
            <p className="text-xs font-black text-brand">현재 지도 영역</p>
            <p className="mt-1 text-sm font-bold">
              {address} · 매장 {filterData.length}곳
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
