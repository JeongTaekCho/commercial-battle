"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { NaverMapContext } from "./naver-map/NaverMapContext";
import type { MapInstance } from "./naver-map/types";

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
      minZoom: 10,
      tileDuration: 150,
    });
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
      <div className="relative h-full w-full">
        <div ref={ref} className={className} aria-label="네이버 지도" />
        <button
          type="button"
          aria-label="현재 위치로 이동"
          title="현재 위치로 이동"
          disabled={!map}
          onClick={() => {
            if (!map) return;
            map.morph({ lat: latitude, lng: longitude }, map.getZoom());
          }}
          className="focus-ring absolute bottom-24 right-4 z-[9999] grid size-11 place-items-center rounded-full border border-black/10 bg-white/95 text-ink shadow-lg transition hover:bg-white hover:text-brand disabled:cursor-wait disabled:opacity-60 sm:bottom-5"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <circle cx="12" cy="12" r="8" strokeOpacity=".35" />
          </svg>
        </button>
      </div>
      {children}
    </NaverMapContext.Provider>
  );
}
