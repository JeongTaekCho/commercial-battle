"use client";
import Link from "next/link";
import NaverMap from "@/src/shared/components/NaverMap";
import ReportMetrics from "@/src/components/report/ReportMetrics";
import IndustryDistribution from "@/src/components/report/IndustryDistribution";

import { REPORT_PREVIEWS } from "@/src/constants/store-previews";
import { getStoreCategory } from "@/src/shared/utils/getStoreCategory";
import { useGetDetailStoreQuery } from "@/src/shared/hooks/useGetDetailStoreQuery";
import { useGetStoreListInUpjongQuery } from "@/src/shared/hooks/useGetStoreListInUpjongQuery";

export default function StoreReport({ id }: { id: string }) {
  const { data: detailStore } = useGetDetailStoreQuery(id);

  const { data } = useGetStoreListInUpjongQuery("indsSclsCd", "G20405");

  console.log(data);

  const report = REPORT_PREVIEWS[id];
  if (!detailStore || !report)
    return (
      <main className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10">
        <Link href="/stores" className="focus-ring text-sm font-bold text-muted">
          ← 내 매장 목록
        </Link>
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
      </main>
    );
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 sm:py-14 lg:px-10">
      <Link href="/stores" className="focus-ring text-xs font-bold text-muted hover:text-brand">
        ← 내 매장 목록
      </Link>
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
          두 매장 비교하기 ↗
        </Link>
      </div>
      <div className="mt-7 rounded-xl border border-brand/15 bg-brand-soft px-5 py-3 text-xs leading-5 text-brand">
        예시 리포트 · 아래 수치와 점수는 화면 구성을 위한 샘플입니다.
      </div>
      <section className="relative mt-6 overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-9">
        <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold text-white/50">MY STORE</p>
            <h2 className="mt-3 text-2xl font-black">{detailStore.name}</h2>
            <p className="mt-3 text-sm text-white/65">{detailStore.address}</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">
                {getStoreCategory(detailStore)}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs">분석 반경 500m</span>
            </div>
          </div>
          <div className="flex items-center gap-6 border-t border-white/15 pt-6 sm:border-t-0 sm:border-l sm:pl-9 sm:pt-0">
            <div>
              <p className="text-xs font-bold text-white/60">최종 상권 점수</p>
              <p className="mt-2">
                <strong className="text-6xl font-black tracking-tight text-[#ff956f]">
                  {report.score}
                </strong>
                <span className="ml-2 text-sm text-white/50">/ 100</span>
              </p>
              <p className="mt-3 text-xs text-white/60">상권 활성도와 경쟁 환경 종합</p>
            </div>
          </div>
        </div>
      </section>
      <ReportMetrics report={report} />
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <section className="min-w-0 rounded-card border border-border bg-white p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">매장 주변 상권</h2>
            <span className="rounded-full bg-canvas px-3 py-1.5 text-xs font-bold text-muted">
              500m 기준
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">{detailStore.address}</p>
          <div className="relative isolate mt-6 h-72 overflow-hidden rounded-2xl border border-border bg-canvas">
            <NaverMap
              latitude={detailStore.y ?? 37.5636}
              longitude={detailStore.x ?? 126.985}
              zoom={16}
              className="h-full w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="font-bold">주변 경쟁 매장</span>
            <span className="text-muted">지도 표시 연동 준비 중</span>
          </div>
        </section>
        <IndustryDistribution />
      </div>
      <section className="mt-7 rounded-card border border-border bg-white p-6 sm:p-8">
        <p className="text-[10px] font-black tracking-[.18em] text-brand">
          READING YOUR NEIGHBORHOOD
        </p>
        <h2 className="mt-2 text-xl font-black">숫자로 읽는 우리 매장 입지</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand-soft/60 p-5">
            <h3 className="text-sm font-bold text-brand">↗ 방문형 업종이 모여 있는 상권</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              주변 음식점과 카페 등 방문형 업종 126개가 밀집되어 있어 유동 활성도가 높은 상권으로
              추정됩니다.
            </p>
          </div>
          <div className="rounded-2xl bg-canvas p-5">
            <h3 className="text-sm font-bold text-positive">◎ 함께 살펴봐야 할 경쟁 환경</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              반경 500m 안에 동일·유사 업종 경쟁업체가 {report.competitors}곳 존재합니다. 주변
              매장과의 차별화 요소를 함께 살펴보세요.
            </p>
          </div>
        </div>
      </section>
      <p className="mt-6 text-xs leading-6 text-muted">
        상권 활성도는 실제 유동인구가 아닌 방문형 업종 밀집도를 활용한 추정치입니다. 최종 점수는
        서비스 자체 분석 기준이며, 실제 매출이나 사업 성공 확률을 의미하지 않습니다.
      </p>
    </main>
  );
}
