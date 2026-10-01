"use client";
import Link from "next/link";
import BattleForm from "@/src/components/battle/BattleForm";
import BattleResult from "@/src/components/battle/BattleResult";
import { BattleFormSkeleton } from "@/src/components/battle/BattleSkeleton";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";

export default function BattleComparison() {
  const { data: storeList, isLoading } = useGetStoreListQuery();

  if (isLoading) return <BattleFormSkeleton />;

  if (!storeList || (storeList && storeList?.length < 2))
    return (
      <section className="rounded-card border border-dashed border-[#d7e1f3] bg-[#f5f8ff] px-6 py-12 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-5 grid size-12 place-items-center rounded-2xl bg-[#e9f0ff] text-xs font-bold tracking-wider text-[#3768cd]"
        >
          A / B
        </span>
        <h2 className="text-lg font-black">비교할 분석 리포트가 부족해요</h2>
        <p className="mt-3 text-sm text-muted">분석 리포트가 있는 매장 2개가 필요합니다.</p>
        <Link
          href="/stores"
          className="focus-ring mt-5 inline-block rounded-control bg-brand px-5 py-3 text-sm font-bold text-white"
        >
          내 매장 보기
        </Link>
      </section>
    );

  return (
    <>
      <BattleForm />
      <BattleResult />
    </>
  );
}
