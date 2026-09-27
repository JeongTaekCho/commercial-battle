"use client";
import { useEffect, useRef } from "react";

// Naver's browser SDK does not ship TypeScript declarations in this project.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { naver?: any } }

export default function NaverMap({ latitude, longitude }: { latitude?: number; longitude?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const render = () => { if (!ref.current || ref.current.dataset.ready || !window.naver?.maps) return; const center = new window.naver.maps.LatLng(latitude ?? 37.5665, longitude ?? 126.978); const map = new window.naver.maps.Map(ref.current, { center, zoom: 15, minZoom: 6, zoomControl: true, zoomControlOptions: { position: window.naver.maps.Position.TOP_RIGHT } }); new window.naver.maps.Marker({ position: center, map, title: "선택한 위치" }); ref.current.dataset.ready = "true"; };
    render(); const timer = window.setInterval(render, 500); const element = ref.current; return () => { window.clearInterval(timer); if (element) { delete element.dataset.ready; element.replaceChildren(); } };
  }, [latitude, longitude]);
  return <div ref={ref} className="h-full min-h-[680px] w-full" aria-label="네이버 지도" />;
}
