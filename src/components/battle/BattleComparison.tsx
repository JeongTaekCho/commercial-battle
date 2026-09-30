"use client";
import Link from "next/link";
import BattleForm from "@/src/components/battle/BattleForm";
import BattleResult from "@/src/components/battle/BattleResult";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";

export default function BattleComparison() {
  const { data: storeList } = useGetStoreListQuery();

  if (!storeList || (storeList && storeList?.length < 2))
    return (
      <section className="mt-7 rounded-card border border-border bg-white p-8 text-center">
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
