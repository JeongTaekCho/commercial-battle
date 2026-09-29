"use client";

import StoreCard from "@/src/components/stores/StoreCard";
import { useRouter } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Store } from "@/src/types/storeType";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";

interface StoreListProps {
  setEditing: Dispatch<SetStateAction<Store | null>>;
  setNotice: Dispatch<SetStateAction<string>>;
}

export default function StoreList({ setEditing, setNotice }: StoreListProps) {
  const { data: stores } = useGetStoreListQuery();
  const router = useRouter();

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-black">
          등록한 매장 <span className="ml-2 text-brand">{stores?.length || 0}</span>
        </h2>
        <span className="text-xs text-muted">매장을 선택해 분석 리포트를 확인하세요</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {stores?.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onOpen={() => router.push(`/stores/${store.id}`)}
            onEdit={() => setEditing(store)}
            onDelete={() => {
              setNotice("매장이 삭제되었습니다.");
            }}
          />
        ))}
      </div>
      {!stores?.length && (
        <div className="rounded-card border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold">첫 번째 매장을 등록해 보세요</p>
          <p className="mt-3 text-sm text-muted">
            매장 이름과 업종, 주소를 설정하면 준비가 끝나요.
          </p>
          <button
            onClick={() => setEditing({ id: 0, name: "", middle: "Q", small: "", address: "" })}
            className="focus-ring mt-6 rounded-control bg-brand px-5 py-3 text-sm font-bold text-white"
          >
            + 매장 등록
          </button>
        </div>
      )}
    </section>
  );
}
