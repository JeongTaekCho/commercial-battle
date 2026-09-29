"use client";

import { useNaverMap } from "@/src/shared/components/naver-map/NaverMapContext";
import { createNaverMyMarkerIcon } from "@/src/shared/utils/industry-marker/my-marker";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useTypeFilterStore } from "@/src/store/explore/useTypeFilterStore";
import { useEffect } from "react";

export default function MyMarkerLayer() {
  const map = useNaverMap();
  const { coords } = useLocationStore();
  const smallType = useTypeFilterStore((state) => state.smallType);

  useEffect(() => {
    if (!map || !window.naver?.maps) return;
    const maps = window.naver.maps;

    const marker = new maps.Marker({
      position: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
      map,
      icon: createNaverMyMarkerIcon(smallType),
      zIndex: 1100,
    });

    return () => {
      marker.setMap(null);
    };
  }, [map, coords.latitude, coords.longitude, smallType]);

  return null;
}
