"use client";

import { useEffect } from "react";
import { createNaverIndustryMarkerIcon } from "../industry-marker/industry-marker";
import { clusterMarkers, createClusterMarkerIcon } from "../industry-marker/marker-clusters";
import { useNaverMap } from "./NaverMapContext";
import type { MarkerInstance } from "./types";

export type NaverMapMarker = {
  id: string;
  name?: string;
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
    const individualZoom = Math.min(15, map.getMaxZoom());
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
    const displayed = new Map<string, { marker: MarkerInstance; listeners: unknown[] }>();
    const remove = (entry: { marker: MarkerInstance; listeners: unknown[] }) => {
      entry.listeners.forEach((listener) => maps.Event.removeListener(listener));
      entry.marker.setMap(null);
    };
    const clear = () => {
      displayed.forEach(remove);
      displayed.clear();
    };
    let renderedZoom: number | undefined;
    const render = () => {
      const zoom = map.getZoom();
      // 이동만 했거나 개별 표시 구간이면 SDK가 기존 마커 위치를 갱신합니다.
      if (
        renderedZoom === zoom ||
        (renderedZoom !== undefined && renderedZoom >= individualZoom && zoom >= individualZoom)
      )
        return;
      renderedZoom = zoom;
      const projection = map.getProjection();
      // 확대할수록 묶는 범위를 줄이고, 줌 15부터 개별 마커를 표시합니다.
      const groups = clusterMarkers(
        items,
        (item) =>
          projection.fromCoordToOffset({
            lat: item.latitude,
            lng: item.longitude,
          }),
        map.getZoom() >= individualZoom ? 0 : map.getZoom() >= individualZoom - 1 ? 50 : 80,
      );
      const activeKeys = new Set<string>();
      for (const group of groups) {
        const key = JSON.stringify(group.map((item) => item.id));
        activeKeys.add(key);
        if (displayed.has(key)) continue;
        const markerListeners: unknown[] = [];
        const isCluster = group.length > 1;
        const position = {
          lat: group.reduce((sum, item) => sum + item.latitude, 0) / group.length,
          lng: group.reduce((sum, item) => sum + item.longitude, 0) / group.length,
        };
        const baseZIndex = isCluster ? 200 : 100;
        const icon = isCluster
          ? createClusterMarkerIcon(group.length)
          : createNaverIndustryMarkerIcon({
              smallCategoryCode: group[0].smallCategoryCode,
              name: group[0].name,
              showLabel: true,
            });
        let hoverIcon: typeof icon | undefined;
        const marker: MarkerInstance = new maps.Marker({
          position,
          map,
          title: isCluster
            ? `매장 ${group.length}곳 · 클릭하여 확대`
            : (group[0].name ?? "업종 마커"),
          icon,
          zIndex: baseZIndex,
        });
        displayed.set(key, { marker, listeners: markerListeners });
        markerListeners.push(
          maps.Event.addListener(marker, "mouseover", () => {
            marker.setZIndex(1000);
            hoverIcon ??= isCluster
              ? {
                  ...icon,
                  content: `<div style="filter:brightness(1.2) drop-shadow(0 3px 5px #0005)">${icon.content}</div>`,
                }
              : createNaverIndustryMarkerIcon({
                  smallCategoryCode: group[0].smallCategoryCode,
                  name: group[0].name,
                  showLabel: true,
                  selected: true,
                });
            marker.setIcon(hoverIcon);
          }),
          maps.Event.addListener(marker, "mouseout", () => {
            marker.setZIndex(baseZIndex);
            marker.setIcon(icon);
          }),
        );
        if (isCluster) {
          markerListeners.push(
            maps.Event.addListener(marker, "click", () => {
              const previousZoom = map.getZoom();
              map.fitBounds(
                group.map((item) => ({ lat: item.latitude, lng: item.longitude })),
                {
                  top: 80,
                  right: 80,
                  bottom: 80,
                  left: 80,
                  maxZoom: individualZoom,
                },
              );
              if (map.getZoom() <= previousZoom) {
                map.setCenter(position);
                map.setZoom(Math.min(previousZoom + 1, individualZoom));
              }
            }),
          );
        }
      }
      for (const [key, entry] of displayed) {
        if (!activeKeys.has(key)) {
          remove(entry);
          displayed.delete(key);
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
