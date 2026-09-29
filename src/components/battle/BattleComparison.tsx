"use client";
import { useState } from "react";
import Link from "next/link";
import { useStoresStore } from "@/src/store/stores/useStoresStore";
import { REPORT_PREVIEWS } from "@/src/constants/store-previews";
import { getStoreCategory } from "@/src/shared/utils/getStoreCategory";
import SelectionField from "@/src/shared/components/selection/SelectionField";

export default function BattleComparison() {
  const stores = useStoresStore((state) => state.stores);
  const previews = stores.flatMap((store) => {
    const report = REPORT_PREVIEWS[String(store.id)];
    return report
      ? [{ ...store, ...report, id: String(store.id), category: getStoreCategory(store) }]
      : [];
  });
  const [leftId, setLeftId] = useState("1");
  const [rightId, setRightId] = useState("2");
  const left = previews.find((store) => store.id === leftId) ?? previews[0];
  const right =
    previews.find((store) => store.id === rightId && store.id !== left?.id) ??
    previews.find((store) => store.id !== left?.id);
  if (!left || !right)
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
  const winner = left.score > right.score ? left : right;
  const currentLeftId = left.id;
  const currentRightId = right.id;
  function selectLeft(id: string) {
    if (id === currentRightId) setRightId(currentLeftId);
    setLeftId(id);
  }
  function selectRight(id: string) {
    if (id === currentLeftId) setLeftId(currentRightId);
    setRightId(id);
  }
  return (
    <>
      <section
        aria-label="비교할 매장 선택"
        className="relative mt-7 grid gap-4 md:grid-cols-2 md:gap-8"
      >
        {[left, right].map((store, index) => (
          <div
            key={index}
            className={`rounded-card border bg-white p-6 sm:p-7 ${index === 0 ? "border-brand/30" : "border-purple/30"}`}
          >
            <p
              className={`mb-4 text-[10px] font-black tracking-[.2em] ${index === 0 ? "text-brand" : "text-purple"}`}
            >
              STORE {index === 0 ? "A" : "B"}
            </p>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <SelectionField
                  label={`비교 매장 ${index === 0 ? "A" : "B"}`}
                  value={store.id}
                  options={previews.map((item) => ({ value: item.id, label: item.name }))}
                  onChange={index === 0 ? selectLeft : selectRight}
                />
              </div>
              <Link
                href={`/stores/${store.id}`}
                aria-label={`${store.name} 분석 리포트 보기`}
                className="focus-ring flex min-h-14 shrink-0 items-center rounded-control border border-border bg-canvas px-3 text-xs font-bold text-ink transition hover:border-brand hover:bg-brand-soft hover:text-brand"
              >
                리포트 ↗
              </Link>
            </div>
            <p className="mt-4 text-xs font-bold text-muted">{store.category}</p>
            <p className="mt-2 text-xs text-muted">{store.address}</p>
          </div>
        ))}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-canvas bg-ink text-xs font-black italic text-white md:grid"
        >
          VS
        </span>
      </section>
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
              {winner.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              최종 상권 점수가{" "}
              <strong className="text-white">{Math.abs(left.score - right.score)}점</strong> 더
              높아요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:border-l sm:border-white/15 sm:pl-9">
            <div className="flex items-baseline gap-2">
              <strong className="text-6xl font-black tracking-tight text-[#f7c76e]">
                {winner.score}
              </strong>
              <span className="text-sm text-white/50">/ 100점</span>
            </div>
            <Link
              href={`/stores/${winner.id}`}
              aria-label={`${winner.name} 승리 매장 분석 리포트 보기`}
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
            {left.name}
          </span>
          <span className="flex items-center gap-2">
            <i className="size-2 rounded-full bg-purple" />
            {right.name}
          </span>
        </div>
        <div className="mt-7 space-y-7">
          {[
            {
              label: "상권 활성도",
              key: "activity" as const,
              caption: "방문형 업종의 밀집도를 비교해요",
            },
            {
              label: "경쟁 환경",
              key: "competition" as const,
              caption: "경쟁업체가 적을수록 점수가 높아요",
            },
            {
              label: "최종 상권 점수",
              key: "score" as const,
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
                {[left, right].map((store, index) => (
                  <div
                    key={store.id}
                    className="flex items-center gap-3"
                    aria-label={`${store.name} ${metric.label} ${store[metric.key]}점`}
                  >
                    <div className="h-5 flex-1 overflow-hidden rounded-md bg-canvas">
                      <div
                        className={`h-full rounded-md ${index === 0 ? "bg-brand" : "bg-purple"}`}
                        style={{ width: `${store[metric.key]}%` }}
                      />
                    </div>
                    <strong className="w-10 text-right text-sm tabular-nums">
                      {store[metric.key]}
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
            {left.competitors}
            <span className="ml-1 text-xs font-normal">개</span>
          </p>
          <p className="text-center text-xl font-black text-purple">
            <span className="mb-1 block text-[10px] font-bold">매장 B</span>
            {right.competitors}
            <span className="ml-1 text-xs font-normal">개</span>
          </p>
        </div>
      </section>
    </>
  );
}
