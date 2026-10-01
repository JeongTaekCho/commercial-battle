"use client";
import Link from "next/link";
import ReportBackButton from "@/src/components/report/ReportBackButton";
import NaverMap from "@/src/shared/components/NaverMap";
import ReportMetrics from "@/src/components/report/ReportMetrics";
import IndustryDistribution from "@/src/components/report/IndustryDistribution";
import ReportMarkerLayer from "@/src/components/report/ReportMarkerLayer";
import ReportMetricsSkeleton from "@/src/components/report/ReportMetricsSkeleton";
import ActionIcon from "@/src/shared/components/ActionIcon";
import ReportLoadingSkeleton from "@/src/components/report/ReportLoadingSkeleton";
import IndustryCategoryIcon from "@/src/shared/components/IndustryCategoryIcon";
import { getStoreCategory } from "@/src/shared/utils/getStoreCategory";
import { useGetDetailStoreQuery } from "@/src/shared/hooks/useGetDetailStoreQuery";
import { useStoreTrafficQueries } from "@/src/hooks/report/useStoreTrafficQueries";
import { useCompetitionScore } from "@/src/hooks/report/useCompetitionScore";
import { calculateReportScores } from "@/src/shared/utils/calculateTotalScore";

export default function StoreReport({ id }: { id: string }) {
  const { data: detailStore, isLoading: isDetailLoading } = useGetDetailStoreQuery(id);
  const coords =
    detailStore?.y != null && detailStore?.x != null
      ? { latitude: detailStore.y, longitude: detailStore.x }
      : undefined;
  const traffic = useStoreTrafficQueries(coords, 150);

  const competition = useCompetitionScore({ store: detailStore, radius: 150 });
  const currentUpjongList = competition.data;
  const competitionCount = competition.competitionCount;
  const competitionScoreValue = competition.score;
  const activityScore = traffic.trafficScore?.score ?? 0;
  // 경쟁 점수는 활성도의 2배까지만 반영: 활성도 0이면 0점, 최대 가점은 활성도의 30%.
  const report = calculateReportScores(activityScore, competitionScoreValue, competitionCount);

  if (isDetailLoading) return <ReportLoadingSkeleton />;

  if (!detailStore || !report)
    return (
      <main className="report-page">
        <div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10">
          <ReportBackButton />
          <section className="mt-8 rounded-card border border-border bg-white p-8">
            <p className="text-xs font-bold text-brand">분석 리포트</p>
            <h1 className="mt-3 text-2xl font-black">
              {detailStore?.name ?? "매장을 찾을 수 없습니다"}
            </h1>
            {detailStore && (
              <p className="mt-3 text-sm text-muted">
                {detailStore.address} · {getStoreCategory(detailStore)}
              </p>
            )}
            <p className="mt-6 text-sm leading-6 text-muted">
              {detailStore
                ? "이 매장의 분석 데이터는 아직 준비 중입니다."
                : "삭제되었거나 새로고침으로 초기화된 매장입니다. 내 매장 목록에서 다시 선택해 주세요."}
            </p>
          </section>
        </div>
      </main>
    );
  return (
    <main className="report-page">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:py-14 lg:px-10">
        <ReportBackButton />
        <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-black tracking-[.2em] text-brand">MARKET ANALYSIS</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">분석 리포트</h1>
            <p className="mt-4 text-sm text-muted">
              매장 주변의 상권 활성도와 경쟁 환경을 살펴보세요.
            </p>
          </div>
          <Link
            href="/battle"
            className="focus-ring rounded-control bg-brand px-5 py-3.5 text-center text-sm font-bold text-white"
          >
            두 매장 비교하기
          </Link>
        </div>
        <section className="report-summary relative mt-6 overflow-hidden rounded-3xl p-7 sm:p-9">
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[.18em] text-brand">STORE OVERVIEW</p>
              <div className="mt-3 flex items-center gap-3">
                <IndustryCategoryIcon
                  smallCategoryCode={detailStore.small}
                  className="size-11 rounded-2xl"
                  backgroundColor="#ffffff"
                />
                <h2 className="break-words text-2xl font-black">{detailStore.name}</h2>
              </div>
              <p className="mt-3 text-sm text-muted">{detailStore.address}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#d9ddfa] bg-white/80 text-brand px-3 py-1.5 text-xs">
                  {getStoreCategory(detailStore)}
                </span>
                <span className="rounded-full border border-[#d9ddfa] bg-white/80 text-brand px-3 py-1.5 text-xs">
                  분석 반경 150m
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-6 border-t border-[#d9ddfa] pt-6 md:border-t-0 md:border-l md:pl-9 md:pt-0">
              <div className="rounded-2xl border border-[#d9ddfa] bg-white px-6 py-5">
                <p className="text-xs font-bold text-brand">최종 상권 점수</p>
                <p className="mt-2">
                  <strong className="text-6xl font-black tracking-tight text-brand">
                    {traffic.isLoading || competition.isLoading ? "—" : report.totalScore || 0}
                  </strong>
                  <span className="ml-2 text-sm text-muted">/ 100</span>
                </p>
                <p className="mt-3 text-xs text-muted">상권 활성도와 경쟁 환경 종합</p>
              </div>
            </div>
          </div>
        </section>
        {traffic.isLoading || competition.isLoading ? (
          <ReportMetricsSkeleton />
        ) : (
          <ReportMetrics report={report} totalCount={traffic.totalCount} />
        )}
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <section className="min-w-0 rounded-card border border-border bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">주변 경쟁 매장</h2>
              <span className="rounded-full bg-canvas px-3 py-1.5 text-xs font-bold text-muted">
                150m 기준
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">{detailStore.address}</p>
            <div className="relative isolate mt-6 h-72 overflow-hidden rounded-2xl border border-border bg-canvas">
              <NaverMap
                latitude={detailStore.y ?? 37.5636}
                longitude={detailStore.x ?? 126.985}
                zoom={17}
                className="h-full w-full"
              >
                <ReportMarkerLayer store={detailStore} competitors={currentUpjongList?.items} />
              </NaverMap>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="font-bold">주변 경쟁 매장</span>
              <span className="text-muted">MY: 내 매장 · 상호명: 동일 업종</span>
            </div>
            {competition.isLoading && (
              <p role="status" className="mt-2 text-xs text-muted">
                경쟁업체 위치를 불러오는 중입니다.
              </p>
            )}
            {competition.isError && (
              <p role="alert" className="mt-2 text-xs text-red-600">
                경쟁업체 위치를 불러오지 못했습니다.
              </p>
            )}
            {competition.data && report.competitionCount === 0 && (
              <p className="mt-2 text-xs text-muted">
                반경 150m 내 동일 소분류 경쟁업체가 없습니다.
              </p>
            )}
          </section>
          <IndustryDistribution trafficData={traffic.data} trafficTotalCount={traffic.totalCount} />
        </div>
        <section className="mt-7 rounded-card border border-border bg-white p-6 sm:p-8">
          <p className="text-[10px] font-black tracking-[.18em] text-brand">
            READING YOUR NEIGHBORHOOD
          </p>
          <h2 className="mt-2 text-xl font-black">숫자로 읽는 우리 매장 입지</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-blue-700">
                <ActionIcon kind="chart" />
                {activityScore >= 60 ? "방문형 업종이 모여 있는 상권" : "방문형 업종이 적은 상권"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {traffic.isLoading
                  ? "방문형 업종 분포를 분석하고 있습니다."
                  : `반경 150m 안에 음식점·카페 등 방문형 업종 ${traffic.totalCount}개가 확인됩니다. ${
                      activityScore >= 60
                        ? "방문 수요가 비교적 활발한 상권으로 추정됩니다."
                        : "방문형 업종 밀집도가 낮은 상권으로 추정됩니다."
                    }`}
              </p>
            </div>
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
              <h3 className="text-sm font-bold text-positive">◎ 함께 살펴봐야 할 경쟁 환경</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {competition.isLoading
                  ? "동일 소분류 경쟁 환경을 분석하고 있습니다."
                  : report.competitionCount === undefined
                    ? "경쟁 업체 수를 확인할 수 없습니다."
                    : `반경 150m 안에 동일 소분류 경쟁업체가 ${report.competitionCount}곳으로 집계됩니다. 주변 매장과의 차별화 요소를 함께 살펴보세요.`}
              </p>
            </div>
          </div>
        </section>
        <p className="mt-6 text-xs leading-6 text-muted">
          경쟁 환경은 점수가 높을수록 주변 동일 소분류 업체가 적다는 뜻입니다. 업종별 기준은 통계로
          검증되지 않은 초기 추정값이며, 배달·온라인·기업 대상 업종은 150m 밖의 경쟁을 반영하지
          못합니다. 본인 매장은 상호와 주소가 일치하는 경우에만 제외합니다. 상권 활성도는 실제
          유동인구가 아닌 방문형 업종 밀집도를 활용한 추정치입니다. 최종 점수는 서비스 자체 분석
          기준이며, 실제 매출이나 사업 성공 확률을 의미하지 않습니다.
        </p>
      </div>
    </main>
  );
}
