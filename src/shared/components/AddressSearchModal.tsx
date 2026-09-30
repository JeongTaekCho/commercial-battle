"use client";
import { useEffect } from "react";
import { useAddressSearch } from "@/src/shared/hooks/useAddressSearch";

export type AddressResult = {
  address_name: string;
  x: string;
  y: string;
  road_address?: { address_name: string; building_name?: string; zone_no?: string };
  address?: { address_name: string; building_name?: string; zone_no?: string };
};

export default function AddressSearchModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (address: AddressResult) => void;
}) {
  const { query, results, loading, message, updateQuery, searchNow } = useAddressSearch();
  useEffect(() => {
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="flex max-h-[min(90vh,720px)] w-[min(92vw,620px)] flex-col rounded-card bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex shrink-0 items-center justify-between">
          <h2 id="address-title" className="text-xl font-black">
            주소 검색
          </h2>
          <button aria-label="닫기" onClick={onClose} className="leading-none !text-[24px]">
            ×
          </button>
        </div>
        <div className="mt-5 flex shrink-0 gap-2">
          <input
            autoFocus
            aria-label="주소 또는 건물명 검색"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                event.preventDefault();
                searchNow();
              }
            }}
            className="min-w-0 flex-1 rounded-control border border-border p-3"
            placeholder="도로명 주소 또는 건물명"
          />
          {/* <button
            onClick={searchNow}
            className="shrink-0 whitespace-nowrap rounded-control bg-brand px-5 text-sm font-black text-white"
          >
            {loading ? "검색 중" : "검색"}
          </button> */}
        </div>
        {!loading && message && (
          <p className="mt-4 shrink-0 rounded-lg bg-canvas p-3 text-sm text-muted">{message}</p>
        )}
        {loading && (
          <div
            role="status"
            className="mt-4 flex shrink-0 items-center justify-center gap-2.5 py-8 text-sm text-muted"
          >
            <span>주소를 검색중입니다...</span>
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-border border-t-brand motion-reduce:animate-none"
            />
          </div>
        )}
        <div
          hidden={loading}
          className="scrollbar-pretty mt-4 min-h-0 space-y-3 overflow-y-auto pr-1"
        >
          {results.map((item, index) => {
            const road = item.road_address;
            const legacy = item.address;
            const buildingName = road?.building_name || legacy?.building_name;
            return (
              <button
                key={`address-${item.x}-${index}`}
                onClick={() => onSelect(item)}
                className="relative w-full rounded-control border border-border p-4 text-left transition hover:border-brand hover:bg-brand-soft"
              >
                <strong className="block text-base">
                  {road?.address_name ?? item.address_name}
                </strong>
                <div className="mt-2 space-y-1 pr-36 text-xs leading-5 text-muted">
                  <p>지번 {item.address_name}</p>
                  {road?.zone_no && <p>우편번호 {road.zone_no}</p>}
                </div>
                {buildingName && (
                  <span
                    className="absolute bottom-4 right-4 max-w-32 truncate rounded-full bg-ink px-2 py-1 text-xs font-bold text-white"
                    title={buildingName}
                  >
                    {buildingName}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
