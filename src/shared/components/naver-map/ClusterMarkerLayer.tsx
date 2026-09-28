"use client";

import { useEffect } from "react";
import { createNaverIndustryMarkerIcon } from "../industry-marker/industry-marker";
import { clusterMarkers, createClusterMarkerIcon } from "../industry-marker/marker-clusters";
import { useNaverMap } from "./NaverMapContext";
import type { MarkerInstance } from "./types";

export type NaverMapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  smallCategoryCode: string;
};

/** 지도에 마커를 추가하는 레이어. 제거 시 모든 마커와 이벤트도 해제합니다. */
export default function ClusterMarkerLayer({ markers }: { markers: readonly NaverMapMarker[] }) {
  const map = useNaverMap();
  useEffect(() => {
    if (!map || !window.naver?.maps) return;
    const maps = window.naver.maps;
    const items = markers
      .filter(
        (item) =>
          Number.isFinite(item.latitude) &&
          Number.isFinite(item.longitude) &&
          Math.abs(item.latitude) <= 90 &&
          Math.abs(item.longitude) <= 180,
      )
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id));
    let displayed: MarkerInstance[] = [];
    let clickListeners: unknown[] = [];
    const clear = () => {
      clickListeners.forEach((listener) => maps.Event.removeListener(listener));
      displayed.forEach((marker) => marker.setMap(null));
      displayed = [];
      clickListeners = [];
    };
    const render = () => {
      clear();
      const projection = map.getProjection();
      // 19레벨(또는 지도 최대 줌)부터 클러스터를 풀어 개별 업종을 표시합니다.
      const groups = clusterMarkers(
        items,
        (item) =>
          projection.fromCoordToOffset({
            lat: item.latitude,
            lng: item.longitude,
          }),
        map.getZoom() >= Math.min(19, map.getMaxZoom()) ? 0 : 80,
      );
      for (const group of groups) {
        const isCluster = group.length > 1;
        const position = {
          lat: group.reduce((sum, item) => sum + item.latitude, 0) / group.length,
          lng: group.reduce((sum, item) => sum + item.longitude, 0) / group.length,
        };
        const marker: MarkerInstance = new maps.Marker({
          position,
          map,
          title: isCluster ? `매장 ${group.length}곳 · 클릭하여 확대` : "업종 마커",
          icon: isCluster
            ? createClusterMarkerIcon(group.length)
            : createNaverIndustryMarkerIcon({
                smallCategoryCode: group[0].smallCategoryCode,
                showLabel: true,
              }),
          zIndex: isCluster ? 200 : 100,
        });
        displayed.push(marker);
        if (isCluster) {
          clickListeners.push(
            maps.Event.addListener(marker, "click", () => {
              const previousZoom = map.getZoom();
              map.fitBounds(
                group.map((item) => ({ lat: item.latitude, lng: item.longitude })),
                {
                  top: 80,
                  right: 80,
                  bottom: 80,
                  left: 80,
                  maxZoom: Math.min(19, map.getMaxZoom()),
                },
              );
              if (map.getZoom() <= previousZoom) {
                map.setCenter(position);
                map.setZoom(Math.min(previousZoom + 1, 19, map.getMaxZoom()));
              }
            }),
          );
        }
      }
    };
    render();
    const idleListener = maps.Event.addListener(map, "idle", render);
    return () => {
      maps.Event.removeListener(idleListener);
      clear();
    };
  }, [map, markers]);

  return null;
}
