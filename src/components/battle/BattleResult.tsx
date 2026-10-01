"use client";

import { BattleResultSkeleton } from "@/src/components/battle/BattleSkeleton";
import { useCompetitionScore } from "@/src/hooks/report/useCompetitionScore";
import { useStoreTrafficQueries } from "@/src/hooks/report/useStoreTrafficQueries";
import { calculateReportScores } from "@/src/shared/utils/calculateTotalScore";
import { useBattleStore } from "@/src/store/battle/useBattleStore";
import Link from "next/link";
import ActionIcon from "@/src/shared/components/ActionIcon";

export default function BattleResult() {
  const { storeA, storeB } = useBattleStore();
  const storeATraffic = useStoreTrafficQueries(
    {
      latitude: storeA?.y || 0,
      longitude: storeA?.x || 0,
    },
    150,
  );
  const storeBTraffic = useStoreTrafficQueries(
    {
      latitude: storeB?.y || 0,
      longitude: storeB?.x || 0,
    },
    150,
  );

  const competitionA = useCompetitionScore({ store: storeA, radius: 150 });
  const competitionCountA = competitionA.competitionCount;
  const competitionScoreValueA = competitionA.score;
  const activityScoreA = storeATraffic.trafficScore?.score ?? 0;
  const competitionB = useCompetitionScore({ store: storeB, radius: 150 });
  const competitionCountB = competitionB.competitionCount;
  const competitionScoreValueB = competitionB.score;
  const activityScoreB = storeBTraffic.trafficScore?.score ?? 0;

  const scoreA = calculateReportScores(activityScoreA, competitionScoreValueA, competitionCountA);
  const scoreB = calculateReportScores(activityScoreB, competitionScoreValueB, competitionCountB);

  if (!storeA || !storeB) {
    return (
      <div className="mt-7 rounded-card border border-dashed border-brand/30 bg-brand-soft/40 p-8 text-center">
        <h2 className="text-base font-bold">비교할 매장 두 곳을 선택해주세요</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          선택하면 항목별 점수와 상권 비교 코멘트를 확인할 수 있어요.
        </p>
      </div>
    );
  }

  if (
    storeATraffic.isError ||
    storeBTraffic.isError ||
    competitionA.isError ||
    competitionB.isError
  ) {
    return (
      <p className="mt-7 text-sm text-muted">
        비교 점수를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  if (
    storeATraffic.isLoading ||
    storeBTraffic.isLoading ||
    competitionA.isLoading ||
    competitionB.isLoading
  ) {
    return <BattleResultSkeleton />;
  }

  const storeAResult = {
    ...storeA,
    ...scoreA,
  };
  const storeBResult = {
    ...storeB,
    ...scoreB,
  };

  const scoreDifference = Math.abs(storeAResult.totalScore - storeBResult.totalScore);
  const winner =
    scoreDifference === 0
      ? null
      : storeAResult.totalScore > storeBResult.totalScore
        ? storeAResult
        : storeBResult;

  return (
    <>
      <section className="mt-7 overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-9">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-black tracking-[.2em] text-[#f7c76e]">
              {winner ? "BATTLE WINNER" : "BATTLE DRAW"}
            </p>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              <span aria-hidden="true" className="mr-3">
                🏆
              </span>
              {winner ? winner.name : "무승부"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              {winner ? (
                <>
                  최종 상권 점수가 <strong className="text-white">{scoreDifference}점</strong> 더
                  높아요.
                </>
              ) : (
                "두 매장의 최종 상권 점수가 같아요."
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:border-l sm:border-white/15 sm:pl-9">
            <div className="flex items-baseline gap-2">
              <strong className="text-6xl font-black tracking-tight text-[#f7c76e]">
                {winner ? winner.totalScore : storeAResult.totalScore}
              </strong>
              <span className="text-sm text-white/50">/ 100점</span>
            </div>
            {winner && (
              <Link
                href={`/stores/${winner?.id}`}
                aria-label={`${winner?.name} 승리 매장 분석 리포트 보기`}
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-control border border-[#f7c76e]/30 bg-[#f7c76e] px-4 py-3 text-sm font-bold text-ink shadow-sm transition hover:bg-[#ffda93] hover:shadow-md"
              >
                <ActionIcon kind="report" />
                승리 매장 리포트
                <ActionIcon />
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="mt-7 rounded-card border border-border bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-black">항목별 비교</h2>
          <span className="rounded-full bg-canvas px-3 py-1.5 text-xs text-muted">
            동일 반경 150m 기준
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-[14px] font-bold">
          <span className="flex items-center gap-2">
            <i className="size-2 rounded-full bg-brand" />
            {storeAResult?.name}
          </span>
          <span className="flex items-center gap-2">
            <i className="size-2 rounded-full bg-purple" />
            {storeBResult.name}
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
                {[storeAResult, storeBResult].map((store, index) => (
                  <div
                    key={`score-${store?.id}-${index}`}
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
            <span className="mb-1 block text-[14px] font-bold">{storeAResult.name}</span>
            {storeAResult.competitionCount}
            <span className="ml-1 text-xs font-normal">개</span>
          </p>
          <p className="text-center text-xl font-black text-purple">
            <span className="mb-1 block text-[14px] font-bold">{storeBResult.name}</span>
            {storeBResult.competitionCount}
            <span className="ml-1 text-xs font-normal">개</span>
          </p>
        </div>
      </section>
      <section className="mt-7 rounded-card border border-border bg-white p-6 sm:p-8">
        <p className="text-[10px] font-black tracking-[.18em] text-brand">BATTLE INSIGHT</p>
        <h2 className="mt-2 text-xl font-black">상권 비교 코멘트</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          {winner
            ? `${winner.name}의 최종 상권 점수가 ${scoreDifference}점 더 높아요. 아래 항목별 차이도 함께 살펴보세요.`
            : "최종 점수는 같아도 상권의 특성은 다를 수 있어요. 활성도와 경쟁 환경을 함께 살펴보세요."}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              key: "activityScore",
              label: "상권 활성도",
              description: "방문형 업종의 밀집도를 기준으로 비교한 점수예요.",
            },
            {
              key: "competitionScore",
              label: "경쟁 환경",
              description: "각 매장 업종의 기준으로 계산하며, 점수가 높을수록 경쟁 부담이 낮아요.",
            },
          ].map(({ key, label, description }) => {
            const metric = key as "activityScore" | "competitionScore";
            const difference = Math.abs(scoreA[metric] - scoreB[metric]);
            const leadingStore = scoreA[metric] > scoreB[metric] ? storeA : storeB;
            return (
              <div key={key} className="rounded-2xl bg-canvas p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-brand">
                  <ActionIcon kind="chart" />
                  {label}
                </h3>
                <p className="mt-3 text-sm font-bold leading-7">
                  {difference === 0
                    ? `두 매장이 ${scoreA[metric]}점으로 같아요.`
                    : `${leadingStore.name} 매장이 ${difference}점 더 높아요.`}
                </p>
                <p className="mt-2 text-xs leading-6 text-muted">{description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
