"use client";

import AddressSearchModal, { AddressResult } from "@/src/shared/components/AddressSearchModal";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useEffect, useRef, useState } from "react";
import MyStoreSelectModal from "@/src/components/explore/MyStoreSelectModal";

export default function AddressSelect() {
  const { address, setAddress, setCoords, radius, setRadius } = useLocationStore();

  const [addressOpen, setAddressOpen] = useState(false);
  const [myStoresOpen, setMyStoresOpen] = useState(false);

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
        <div className="flex min-w-0 gap-2">
          <button
            onClick={() => setAddressOpen(true)}
            className="flex min-w-0 flex-1 items-center rounded-control border border-border bg-white px-4 py-3 text-left text-sm font-bold shadow-sm"
          >
            <span className="mr-2">⌕</span>
            <span className="truncate">{address}</span>
          </button>
          <button
            onClick={() => setAddressOpen(true)}
            className="shrink-0 rounded-control bg-brand px-3 py-3 text-sm font-black text-white sm:px-5"
          >
            주소 검색
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="상권 탐색 반경"
            className="flex max-w-full flex-wrap items-center gap-1 rounded-control border border-border bg-white p-1 shadow-sm"
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
          <button
            type="button"
            onClick={() => setMyStoresOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={myStoresOpen}
            className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-control border border-brand/20 bg-white px-4 py-2 text-sm font-bold text-brand shadow-sm transition hover:border-brand/40 hover:bg-brand-soft hover:shadow-md"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 2-6h14l2 6M3 9v2a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0V9M5 14v7h14v-7M9 21v-6h6v6" />
            </svg>
            내 매장
          </button>
        </div>
      </div>
      {myStoresOpen && <MyStoreSelectModal onClose={() => setMyStoresOpen(false)} />}
      {addressOpen && (
        <AddressSearchModal onClose={() => setAddressOpen(false)} onSelect={selectAddress} />
      )}
    </>
  );
}
