"use client";

import { useEffect, useMemo } from "react";
import ClusterMarkerLayer from "@/src/shared/components/naver-map/ClusterMarkerLayer";
import { useNaverMap } from "@/src/shared/components/naver-map/NaverMapContext";
import type { MarkerInstance } from "@/src/shared/components/naver-map/types";
import type { ShopType } from "@/src/shared/types/shopApiType";
import { findOwnStoreId } from "@/src/shared/utils/calculateCompetitionScore";
import { createNaverMyMarkerIcon } from "@/src/shared/utils/industry-marker/my-marker";
import type { Store } from "@/src/types/storeType";

const EMPTY_COMPETITORS: readonly ShopType[] = [];

/** 분석 대상 매장을 MY로, 동일 소분류 경쟁업체를 상호명 마커로 표시합니다. */
export default function ReportMarkerLayer({
  store,
  competitors = EMPTY_COMPETITORS,
}: {
  store: Store;
  competitors?: readonly ShopType[];
}) {
  const map = useNaverMap();
  const { x: longitude, y: latitude, small, name } = store;
  const markers = useMemo(() => {
    const ownId = findOwnStoreId(competitors, store);
    const seen = new Set<string>();
    return competitors
      .filter((item) => {
        if (item.bizesId === ownId || item.indsSclsCd !== store.small || seen.has(item.bizesId)) {
          return false;
        }
        seen.add(item.bizesId);
        return (
          item.lat != null &&
          item.lon != null &&
          String(item.lat).trim() !== "" &&
          String(item.lon).trim() !== ""
        );
      })
      .map((item) => ({
        id: item.bizesId,
        name: [item.bizesNm, item.brchNm].filter(Boolean).join(" "),
        latitude: Number(item.lat),
        longitude: Number(item.lon),
        smallCategoryCode: item.indsSclsCd,
      }));
  }, [competitors, store]);

  useEffect(() => {
    if (
      !map ||
      !window.naver?.maps ||
      latitude == null ||
      longitude == null ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    )
      return;

    const maps = window.naver.maps;
    const icon = createNaverMyMarkerIcon(small);
    const marker: MarkerInstance = new maps.Marker({
      map,
      position: { lat: latitude, lng: longitude },
      title: `내 매장: ${name}`,
      icon: { ...icon, content: icon.content.replaceAll("주소 검색 위치", "내 매장 위치") },
      zIndex: 1250,
    });
    const listener = maps.Event.addListener(marker, "click", () => {
      map.morph({ lat: latitude, lng: longitude }, Math.min(18, map.getMaxZoom()));
    });
    return () => {
      maps.Event.removeListener(listener);
      marker.setMap(null);
    };
  }, [map, latitude, longitude, small, name]);

  return <ClusterMarkerLayer markers={markers} />;
}
