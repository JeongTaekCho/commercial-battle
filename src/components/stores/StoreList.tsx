"use client";

import StoreCard from "@/src/components/stores/StoreCard";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { Store } from "@/src/types/storeType";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import StoreCardSkeleton from "@/src/components/stores/StoreCardSkeleton";

interface StoreListProps {
  setEditing: Dispatch<SetStateAction<Store | null>>;
}

export default function StoreList({ setEditing }: StoreListProps) {
  const { data: stores, isLoading, isError } = useGetStoreListQuery();
  const router = useRouter();

  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-bold">
          등록한 매장{" "}
          <span className="grid min-w-7 place-items-center rounded-lg bg-[#f4ecdf] px-2 py-1 text-xs text-[#956447]">
            {isLoading ? "—" : stores?.length || 0}
          </span>
        </h2>
        <span className="text-xs text-muted">매장을 선택해 분석 리포트를 확인하세요</span>
      </div>
      <div aria-busy={isLoading} className="grid gap-5 md:grid-cols-2">
        {isLoading &&
          Array.from({ length: 2 }, (_, index) => (
            <StoreCardSkeleton key={`store-skeleton-${index}`} />
          ))}
        {!isLoading &&
          stores?.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onOpen={() => router.push(`/stores/${store.id}`)}
              onEdit={() => setEditing(store)}
            />
          ))}
      </div>
      {isError && (
        <div
          role="alert"
          className="rounded-card border border-red-200 bg-red-50 px-6 py-10 text-center"
        >
          <p className="text-sm font-bold text-red-700">매장 정보를 불러오지 못했습니다.</p>
          <p className="mt-2 text-xs text-red-600">잠시 후 다시 시도해 주세요.</p>
        </div>
      )}
      {!isLoading && !isError && !stores?.length && (
        <div className="rounded-card border border-dashed border-[#dedacb] bg-[#fcfaf4] px-6 py-14 text-center">
          <span
            aria-hidden="true"
            className="mx-auto mb-5 grid size-12 place-items-center rounded-2xl bg-[#f2e8d9] text-2xl text-[#956447]"
          >
            +
          </span>
          <p className="text-lg font-bold">첫 번째 매장을 등록해 보세요</p>
          <p className="mt-3 text-sm text-muted">
            매장 이름과 업종, 주소를 설정하면 준비가 끝나요.
          </p>
          <button
            onClick={() => setEditing({ id: "", name: "", middle: "Q", small: "", address: "" })}
            className="focus-ring mt-6 rounded-control bg-brand px-5 py-3 text-sm font-bold text-white"
          >
            + 매장 등록
          </button>
        </div>
      )}
    </section>
  );
}
