"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { NaverMapContext } from "./naver-map/NaverMapContext";
import type { MapInstance } from "./naver-map/types";

// Naver's browser SDK does not ship TypeScript declarations in this project.
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver?: any;
  }
}

export default function NaverMap({
  latitude = 37.5665,
  longitude = 126.978,
  zoom = 15,
  children,
  className = "h-full min-h-[680px] w-full",
}: {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [map, setMap] = useState<MapInstance | null>(null);

  useEffect(() => {
    if (!sdkReady || !ref.current || !window.naver?.maps) return;
    const maps = window.naver.maps;
    const instance: MapInstance = new maps.Map(ref.current, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 15,
      minZoom: 6,
      zoomControl: true,
      zoomControlOptions: { position: maps.Position.TOP_RIGHT },
    });
    // SDK 인스턴스를 하위 레이어와 공유하는 외부 시스템 동기화입니다.
    setMap(instance);
    return () => instance.destroy();
  }, [sdkReady]);

  useEffect(() => {
    map?.setCenter({ lat: latitude, lng: longitude });
  }, [map, latitude, longitude]);

  useEffect(() => {
    map?.setZoom(zoom);
  }, [map, zoom]);

  return (
    <NaverMapContext.Provider value={map}>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? ""}`}
        strategy="afterInteractive"
        onReady={() => setSdkReady(true)}
      />
      <div ref={ref} className={className} aria-label="네이버 지도" />
      {/* SDK가 관리하는 DOM 안에 React children을 렌더링하지 않습니다. */}
      {children}
    </NaverMapContext.Provider>
  );
}
