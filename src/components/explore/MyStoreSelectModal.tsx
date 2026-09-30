"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IndustryCategoryIcon from "@/src/shared/components/IndustryCategoryIcon";
import ActionIcon from "@/src/shared/components/ActionIcon";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import type { Store } from "@/src/types/storeType";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useTypeFilterStore } from "@/src/store/explore/useTypeFilterStore";

export default function MyStoreSelectModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedId, setSelectedId] = useState<string>();
  const [isSelecting, setIsSelecting] = useState(false);
  const { data: stores, isLoading, isError, refetch } = useGetStoreListQuery();
  const { setAddress, setCoords } = useLocationStore();
  const { setMiddleType, setSmallType } = useTypeFilterStore();

  const handleClickAddress = (store: Store) => {
    if (isSelecting) return;
    setSelectedId(store.id);
    setIsSelecting(true);
    setAddress(store.address);
    // 선택 상태를 잠깐 보여준 뒤 지도 좌표를 갱신합니다.
    window.setTimeout(() => {
      setMiddleType(store.middle);
      setSmallType(store.small);
      setCoords({ latitude: store.y || 0, longitude: store.x || 0 });
      onClose();
    }, 180);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="my-store-modal-title"
      aria-describedby="my-store-modal-description"
      onCancel={onClose}
      onClick={(event) => {
        if (!isSelecting && event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[min(92vw,460px)] max-w-none overflow-hidden rounded-2xl border border-border bg-white p-0 text-ink shadow-xl backdrop:bg-black/35"
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div className="shrink-0 border-b border-border px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="my-store-modal-title" className="text-lg font-bold">
                내 매장
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSelecting}
              aria-label="내 매장 선택 닫기"
              className="focus-ring grid size-9 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-canvas hover:text-ink"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <p id="my-store-modal-description" className="mt-1 text-xs leading-5 text-muted">
            탐색할 매장을 선택하세요.
          </p>
        </div>
        <div className="scrollbar-pretty min-h-0 overflow-y-auto p-2">
          {isLoading ? (
            <div role="status" aria-label="내 매장 불러오는 중" className="divide-y divide-border">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  aria-hidden="true"
                  className="flex animate-pulse items-center gap-3 px-3 py-4 motion-reduce:animate-none"
                >
                  <div className="size-10 rounded-lg bg-canvas" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-1/2 rounded bg-canvas" />
                    <div className="h-3 w-5/6 rounded bg-canvas" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="py-10 text-center">
              <p className="text-sm text-muted">매장 목록을 불러오지 못했어요.</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="focus-ring mt-4 rounded-control bg-brand-soft px-4 py-2 text-sm font-bold text-brand"
              >
                다시 불러오기
              </button>
            </div>
          ) : !stores?.length ? (
            <div className="py-10 text-center">
              <p className="font-bold">아직 등록한 매장이 없어요</p>
              <p className="mt-2 text-sm text-muted">내 매장 관리에서 첫 매장을 등록해주세요.</p>
              <Link
                href="/stores"
                className="focus-ring mt-5 inline-flex items-center gap-2 rounded-control bg-brand px-5 py-3 text-sm font-bold text-white"
              >
                내 매장 관리 <ActionIcon />
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-2">
                {stores.map((store) => (
                  <li key={store.id}>
                    <button
                      type="button"
                      aria-pressed={selectedId === store.id}
                      onClick={() => handleClickAddress(store)}
                      className={`focus-ring flex w-full cursor-default items-center gap-3 rounded-lg px-3 py-4 text-left transition-colors ${selectedId === store.id ? "bg-brand-soft/50" : "bg-white hover:bg-canvas"}`}
                      disabled={isSelecting}
                    >
                      <IndustryCategoryIcon
                        smallCategoryCode={store.small}
                        className="size-10 rounded-lg"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-semibold leading-6">{store.name}</p>
                        <p className="mt-1 break-words text-xs leading-5 text-muted">
                          {store.address}
                        </p>
                      </div>
                      <span className="grid size-5 shrink-0 place-items-center text-brand">
                        {selectedId === store.id ? (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="size-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m5 12 4 4L19 6" />
                          </svg>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {isSelecting && (
          <div
            className="absolute inset-0 z-10 grid place-items-center bg-white/75 backdrop-blur-[1px]"
            role="status"
            aria-label="선택한 매장으로 이동하는 중"
          >
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-muted shadow-lg">
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-border border-t-brand motion-reduce:animate-none"
              />
              매장 위치를 불러오는 중...
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
