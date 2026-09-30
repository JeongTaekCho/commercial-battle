"use client";

import { useCompetitionScore } from "@/src/hooks/report/useCompetitionScore";
import { useStoreTrafficQueries } from "@/src/hooks/report/useStoreTrafficQueries";
import { calculateReportScores } from "@/src/shared/utils/calculateTotalScore";
import { useBattleStore } from "@/src/store/battle/useBattleStore";
import Link from "next/link";

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

  if (!storeA || !storeB) return null;

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
    return (
      <p role="status" className="mt-7 text-sm text-muted">
        상권 점수를 계산하고 있어요.
      </p>
    );
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
                className="focus-ring shrink-0 rounded-control border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                승리 매장 리포트 ↗
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
    </>
  );
}
