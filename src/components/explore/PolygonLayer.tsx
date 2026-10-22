"use client";

import { useEffect } from "react";
import { useNaverMap } from "@/src/shared/components/naver-map/NaverMapContext";
import { useExploreAreaStore } from "@/src/store/explore/useExploreAreaStore";

export default function PolygonLayer() {
  const map = useNaverMap();
  const { mode, points, complete, addPoint, movePoint, finish } = useExploreAreaStore();

  useEffect(() => {
    if (!map || !window.naver?.maps || mode !== "polygon" || complete) return;
    const maps = window.naver.maps;
    const listener = maps.Event.addListener(
      map,
      "click",
      (event: {
        coord?: { lat: () => number; lng: () => number };
        latlng?: { lat: () => number; lng: () => number };
      }) => {
        const point = event.coord ?? event.latlng;
        if (point) addPoint({ latitude: point.lat(), longitude: point.lng() });
      },
    );
    return () => maps.Event.removeListener(listener);
  }, [map, mode, complete, addPoint]);

  useEffect(() => {
    if (!map || !window.naver?.maps || mode !== "polygon" || points.length === 0) return;
    const maps = window.naver.maps;
    const path = points.map((point) => new maps.LatLng(point.latitude, point.longitude));
    const shape =
      complete && points.length >= 3
        ? new maps.Polygon({
            map,
            paths: [path],
            fillColor: "#ef523d",
            fillOpacity: 0.2,
            strokeColor: "#e1432e",
            strokeWeight: 3,
            clickable: false,
          })
        : new maps.Polyline({
            map,
            path,
            strokeColor: "#e1432e",
            strokeWeight: 3,
            clickable: false,
          });
    const handles: { setMap: (map: null) => void }[] = [];
    const listeners: unknown[] = [];
    points.forEach((point, index) => {
      const isStartingPoint = index === 0 && !complete;
      const handleSize = isStartingPoint ? 24 : 16;
      const handle = new maps.Marker({
        map,
        position: new maps.LatLng(point.latitude, point.longitude),
        draggable: complete,
        title:
          isStartingPoint && points.length >= 3
            ? "첫 꼭짓점 클릭하여 영역 완성"
            : complete
              ? `${index + 1}번 꼭짓점 이동`
              : `${index + 1}번 꼭짓점`,
        icon: {
          content: `<div style="width:${handleSize}px;height:${handleSize}px;border:3px solid white;border-radius:50%;background:#e1432e;box-shadow:0 1px 6px #3338"></div>`,
          size: { width: handleSize, height: handleSize },
          anchor: { x: handleSize / 2, y: handleSize / 2 },
        },
        zIndex: 2000,
      });
      handles.push(handle);
      if (isStartingPoint && points.length >= 3) {
        listeners.push(maps.Event.addListener(handle, "click", finish));
      }
      if (complete) {
        listeners.push(
          maps.Event.addListener(handle, "dragend", () => {
            const position = handle.getPosition();
            movePoint(index, { latitude: position.lat(), longitude: position.lng() });
          }),
        );
      }
    });
    return () => {
      listeners.forEach((listener) => maps.Event.removeListener(listener));
      handles.forEach((handle) => handle.setMap(null));
      shape.setMap(null);
    };
  }, [map, mode, points, complete, movePoint, finish]);

  return null;
}
