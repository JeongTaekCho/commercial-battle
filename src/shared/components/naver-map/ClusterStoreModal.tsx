"use client";

import { useEffect, useId, useRef } from "react";
import IndustryCategoryIcon from "@/src/shared/components/IndustryCategoryIcon";
import { getIndustryMarkerAppearance } from "@/src/shared/utils/industry-marker/industry-marker";
import type { NaverMapMarker } from "./ClusterMarkerLayer";

export default function ClusterStoreModal({
  markers,
  onClose,
}: {
  markers: readonly NaverMapMarker[];
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-lg overflow-hidden rounded-3xl border border-border bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-6">
        <div>
          <h2 id={titleId} className="text-xl font-bold">
            {markers.length === 1 ? "매장 정보" : "이 위치의 매장"}
          </h2>
          <p className="mt-2 text-xs text-muted">
            {markers.length === 1
              ? "선택한 매장의 상세 정보입니다."
              : `${markers.length}개 매장이 겹쳐 표시되었습니다.`}
          </p>
        </div>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="매장 목록 닫기"
          className="focus-ring grid size-9 shrink-0 place-items-center rounded-full bg-canvas text-xl"
        >
          ×
        </button>
      </div>
      <ul className="scrollbar-pretty max-h-[min(60dvh,480px)] divide-y divide-border overflow-y-auto px-6">
        {markers.map((marker) => (
          <li key={marker.id} className="flex gap-3 py-5">
            <IndustryCategoryIcon
              smallCategoryCode={marker.smallCategoryCode}
              className="size-11"
            />
            <div className="min-w-0">
              <h3 className="break-words text-sm font-bold">{marker.name || "이름 없는 매장"}</h3>
              <p className="mt-1 text-xs text-brand">
                {getIndustryMarkerAppearance(marker.smallCategoryCode).name}
              </p>
              <p className="mt-2 break-words text-xs leading-5 text-muted">
                {marker.address || "주소 정보 없음"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
