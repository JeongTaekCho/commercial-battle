"use client";

import AddressSearchModal, { AddressResult } from "@/src/shared/components/AddressSearchModal";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useEffect, useRef, useState } from "react";

export default function AddressSelect() {
  const { address, setAddress, setCoords, radius, setRadius } = useLocationStore();

  const [addressOpen, setAddressOpen] = useState(false);

  const addressSelected = useRef(false);

  const selectAddress = (result: AddressResult) => {
    addressSelected.current = true;
    setAddress(result.road_address?.address_name ?? result.address_name);
    setCoords({ latitude: Number(result.y), longitude: Number(result.x) });
    setAddressOpen(false);
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    let cancelled = false;
    const controller = new AbortController();
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        if (cancelled || addressSelected.current) return;
        setCoords({ latitude, longitude });
        setAddress("현재 위치");

        try {
          const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),
          });
          const response = await fetch(`/api/address/reverse?${params}`, {
            signal: controller.signal,
          });
          if (!response.ok) return;
          const data: { address: string | null } = await response.json();
          if (!cancelled && !addressSelected.current && data.address) setAddress(data.address);
        } catch {}
      },
      () => {},
      { timeout: 10000, maximumAge: 60000 },
    );

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [setAddress, setCoords]);

  return (
    <>
      <div className="absolute left-5 right-5 top-5 z-10 space-y-3 md:left-8 md:right-8">
        <div className="flex gap-2">
          <button
            onClick={() => setAddressOpen(true)}
            className="flex min-w-0 flex-1 items-center rounded-control border border-border bg-white px-4 py-3 text-left text-sm font-bold shadow-sm"
          >
            <span className="mr-2">⌕</span>
            <span className="truncate">{address}</span>
          </button>
          <button
            onClick={() => setAddressOpen(true)}
            className="rounded-control bg-brand px-5 py-3 text-sm font-black text-white"
          >
            주소 검색
          </button>
        </div>
        <div
          role="group"
          aria-label="상권 탐색 반경"
          className="flex w-fit max-w-full items-center gap-1 rounded-control border border-border bg-white p-1 shadow-sm"
        >
          <span className="px-2 text-xs font-bold text-muted">반경</span>
          {[150, 300, 500, 1000].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={radius === value}
              onClick={() => setRadius(value)}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                radius === value ? "bg-brand text-white" : "text-ink hover:bg-canvas"
              }`}
            >
              {value === 1000 ? "1km" : `${value}m`}
            </button>
          ))}
        </div>
      </div>
      {addressOpen && (
        <AddressSearchModal onClose={() => setAddressOpen(false)} onSelect={selectAddress} />
      )}
    </>
  );
}
