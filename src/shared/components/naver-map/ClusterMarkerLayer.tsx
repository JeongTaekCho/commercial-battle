"use client";

import { useEffect, useState } from "react";
import ClusterStoreModal from "./ClusterStoreModal";
import { createNaverIndustryMarkerIcon } from "@/src/shared/utils/industry-marker/industry-marker";
import {
  clusterMarkers,
  createClusterMarkerIcon,
} from "@/src/shared/utils/industry-marker/marker-clusters";
import { useNaverMap } from "./NaverMapContext";
import type { MarkerInstance } from "./types";
import { groupOverlappingMarkers } from "@/src/shared/utils/industry-marker/marker-overlaps";

export type NaverMapMarker = {
  id: string;
  name?: string;
  address?: string;
  latitude: number;
  longitude: number;
  smallCategoryCode: string;
};

export default function ClusterMarkerLayer({ markers }: { markers: readonly NaverMapMarker[] }) {
  const map = useNaverMap();
  const [selection, setSelection] = useState<{
    source: readonly NaverMapMarker[];
    items: NaverMapMarker[];
  } | null>(null);
  useEffect(() => {
    if (!map || !window.naver?.maps) return;
    const maps = window.naver.maps;
    const minimumZoom = map.getMinZoom?.() ?? 10;
    const modalZoom = Math.min(minimumZoom + 9, map.getMaxZoom());
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
    const icons = new Map(
      items.map((item) => [
        item.id,
        createNaverIndustryMarkerIcon({
          smallCategoryCode: item.smallCategoryCode,
          name: item.name,
          showLabel: true,
        }),
      ]),
    );
    const remove = (entry: { marker: MarkerInstance; listeners: unknown[] }) => {
      entry.listeners.forEach((listener) => maps.Event.removeListener(listener));
      entry.marker.setMap(null);
    };
    const clear = () => {
      displayed.forEach(remove);
      displayed.clear();
    };
    let renderedZoom: number | undefined;
    let frame: number | undefined;
    const render = () => {
      const zoom = map.getZoom();
      if (renderedZoom === zoom) return;
      renderedZoom = zoom;
      const projection = map.getProjection();
      const isMaxZoom = zoom >= map.getMaxZoom();
      const project = (item: NaverMapMarker) =>
        projection.fromCoordToOffset(new maps.LatLng(item.latitude, item.longitude));
      const groups = isMaxZoom
        ? groupOverlappingMarkers(items, (item) => {
            const point = project(item);
            const icon = icons.get(item.id)!;
            const left = point.x - icon.anchor.x;
            const top = point.y - icon.anchor.y;
            return { left, top, right: left + icon.size.width, bottom: top + icon.size.height };
          })
        : clusterMarkers(items, project, zoom >= modalZoom - 1 ? 50 : 80);
      const activeKeys = new Set<string>();
      for (const group of groups) {
        const key = `${isMaxZoom}:${JSON.stringify(group.map((item) => item.id))}`;
        activeKeys.add(key);
        if (displayed.has(key)) continue;
        const markerListeners: unknown[] = [];
        const isCluster = group.length > 1;
        const position = {
          lat: group.reduce((sum, item) => sum + item.latitude, 0) / group.length,
          lng: group.reduce((sum, item) => sum + item.longitude, 0) / group.length,
        };
        const baseZIndex = isCluster ? 1300 : 1200;
        const icon = isCluster ? createClusterMarkerIcon(group.length) : icons.get(group[0].id)!;
        let hoverIcon: typeof icon | undefined;
        const marker: MarkerInstance = new maps.Marker({
          position,
          map,
          title: isCluster ? `매장 ${group.length}곳` : (group[0].name ?? "업종 마커"),
          icon,
          zIndex: baseZIndex,
        });
        displayed.set(key, { marker, listeners: markerListeners });
        markerListeners.push(
          maps.Event.addListener(marker, "mouseover", () => {
            marker.setZIndex(2000);
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
        markerListeners.push(
          maps.Event.addListener(marker, "click", () => {
            const currentZoom = map.getZoom();
            const canOpenList = currentZoom >= modalZoom;
            if (isCluster) {
              if (canOpenList) {
                setSelection({ source: markers, items: group });
              } else {
                map.morph(position, Math.min(currentZoom + 2, modalZoom));
              }
              return;
            }
            setSelection({ source: markers, items: group });
          }),
        );
      }
      for (const [key, entry] of displayed) {
        if (!activeKeys.has(key)) {
          remove(entry);
          displayed.delete(key);
        }
      }
    };
    const scheduleRender = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        render();
      });
    };
    scheduleRender();
    const idleListener = maps.Event.addListener(map, "idle", scheduleRender);
    return () => {
      maps.Event.removeListener(idleListener);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      clear();
    };
  }, [map, markers]);

  return selection?.source === markers ? (
    <ClusterStoreModal markers={selection.items} onClose={() => setSelection(null)} />
  ) : null;
}
