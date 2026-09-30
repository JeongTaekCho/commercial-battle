"use client";
import { useState } from "react";
import Link from "next/link";
import SelectionField from "@/src/shared/components/selection/SelectionField";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { getCategoryBySmallCode } from "@/src/constants/industry-categories";
import BattleForm from "@/src/components/battle/BattleForm";
import { useBattleStore } from "@/src/store/battle/useBattleStore";

type BattleReport = {
  id: string;
  name: string;
  category: string;
  address: string;
  activityScore: number;
  competitionScore: number;
  competitionCount: number;
  totalScore: number;
};

/**
 * 배틀 결과에 표시할 데이터.
 * 실제 분석 API가 연결되면 이 배열만 교체하면 됩니다.
 */
const BATTLE_REPORTS: readonly BattleReport[] = [
  {
    id: "store-a",
    name: "매장 A",
    category: "업종을 입력해 주세요",
    address: "주소를 입력해 주세요",
    activityScore: 0,
    competitionScore: 0,
    competitionCount: 0,
    totalScore: 0,
  },
  {
    id: "store-b",
    name: "매장 B",
    category: "업종을 입력해 주세요",
    address: "주소를 입력해 주세요",
    activityScore: 0,
    competitionScore: 0,
    competitionCount: 0,
    totalScore: 0,
  },
];

export default function BattleComparison() {
  const { storeA, storeB } = useBattleStore();

  // if (!left)
  //   return (
  //     <section className="mt-7 rounded-card border border-border bg-white p-8 text-center">
  //       <h2 className="text-lg font-black">비교할 분석 리포트가 부족해요</h2>
  //       <p className="mt-3 text-sm text-muted">분석 리포트가 있는 매장 2개가 필요합니다.</p>
  //       <Link
  //         href="/stores"
  //         className="focus-ring mt-5 inline-block rounded-control bg-brand px-5 py-3 text-sm font-bold text-white"
  //       >
  //         내 매장 보기
  //       </Link>
  //     </section>
  //   );
  // const winner = left.totalScore > right.totalScore ? left : right;
  const winner = storeA;

  return (
    <>
      <BattleForm />
      <section className="mt-7 overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-9">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-black tracking-[.2em] text-[#f7c76e]">
              BATTLE WINNER · 예시 결과
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              <span aria-hidden="true" className="mr-3">
                🏆
              </span>
              {winner?.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              최종 상권 점수가{" "}
              <strong className="text-white">
                {/* {Math.abs(left.totalScore - right.totalScore)}점 */}
              </strong>{" "}
              더 높아요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:border-l sm:border-white/15 sm:pl-9">
            <div className="flex items-baseline gap-2">
              <strong className="text-6xl font-black tracking-tight text-[#f7c76e]">
                {/* {winner.totalScore} */}
              </strong>
              <span className="text-sm text-white/50">/ 100점</span>
            </div>
            <Link
              href={`/stores/${winner?.id}`}
              aria-label={`${winner?.name} 승리 매장 분석 리포트 보기`}
              className="focus-ring shrink-0 rounded-control border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              승리 매장 리포트 ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="mt-7 rounded-card border border-border bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-black">항목별 비교</h2>
          <span className="rounded-full bg-canvas px-3 py-1.5 text-xs text-muted">
            동일 반경 500m 기준
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold">
          <span className="flex items-center gap-2">
            <i className="size-2 rounded-full bg-brand" />
            {storeA?.name}
          </span>
          <span className="flex items-center gap-2">
            <i className="size-2 rounded-full bg-purple" />
            {"오른쪽 이름"}
          </span>
        </div>
        <div className="mt-7 space-y-7">
          {[
            {
              label: "상권 활성도",
              key: "activityScore" as const,
              caption: "방문형 업종의 밀집도를 비교해요",
            },
            {
              label: "경쟁 환경",
              key: "competitionScore" as const,
              caption: "경쟁업체가 적을수록 점수가 높아요",
            },
            {
              label: "최종 상권 점수",
              key: "totalScore" as const,
              caption: "활성도와 경쟁 환경을 종합한 점수예요",
            },
          ].map((metric) => (
            <div
              key={metric.key}
              className="grid gap-4 border-b border-border pb-6 sm:grid-cols-[180px_1fr]"
            >
              <div>
                <h3 className="text-sm font-bold">{metric.label}</h3>
                <p className="mt-2 text-[11px] leading-5 text-muted">{metric.caption}</p>
              </div>
              <div className="space-y-3">
                {[storeA, storeB].map((store, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                    aria-label={`${"store.name"} ${metric.label} ${"100"}점`}
                  >
                    <div className="h-5 flex-1 overflow-hidden rounded-md bg-canvas">
                      <div
                        className={`h-full rounded-md ${index === 0 ? "bg-brand" : "bg-purple"}`}
                        style={{ width: `${100}%` }}
                      />
                    </div>
                    <strong className="w-10 text-right text-sm tabular-nums">
                      {100}
                      <span className="ml-0.5 text-[10px] font-normal text-muted">점</span>
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-[1.4fr_1fr_1fr] items-center gap-3 rounded-xl bg-canvas px-4 py-5">
          <div>
            <h3 className="text-sm font-bold">주변 경쟁업체</h3>
            <p className="mt-1 text-[10px] text-muted">동일·유사 업종</p>
          </div>
          <p className="text-center text-xl font-black text-brand">
            <span className="mb-1 block text-[10px] font-bold">매장 A</span>
            {4}
            <span className="ml-1 text-xs font-normal">개</span>
          </p>
          <p className="text-center text-xl font-black text-purple">
            <span className="mb-1 block text-[10px] font-bold">매장 B</span>
            {5}
            <span className="ml-1 text-xs font-normal">개</span>
          </p>
        </div>
      </section>
    </>
  );
}
