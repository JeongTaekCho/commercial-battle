import Link from "next/link";
import NaverMap from "@/src/shared/components/NaverMap";
export default function BattlePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black tracking-[.18em] text-brand">MARKET BATTLE REPORT</p>
          <h1 className="mt-4 text-4xl font-black">상권배틀 명동점 리포트</h1>
          <p className="mt-3 text-muted">
            선택한 매장과 주변 경쟁 매장의 업종·거리를 비교했습니다.
          </p>
        </div>
        <Link
          href="/explore"
          className="rounded-control border border-border bg-white px-5 py-3 text-center text-sm font-black"
        >
          상권 다시 탐색
        </Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["선택 지역 음식점", "128곳", "bg-brand-soft text-brand"],
          ["같은 업종 매장", "12곳", "bg-[#e9f6f2] text-positive"],
          ["가장 가까운 경쟁 매장", "180m", "bg-[#f1edfa] text-purple"],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-card border border-border bg-white p-6">
            <span className={`inline-block rounded-xl px-3 py-2 text-xl ${c}`}>●</span>
            <p className="mt-5 text-sm font-bold text-muted">{l}</p>
            <p className="mt-2 text-3xl font-black">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="min-w-0 rounded-card border border-border bg-white p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold text-muted">현재 매장</p>
              <h2 className="mt-2 break-keep text-xl font-black leading-snug sm:text-2xl">
                상권배틀 명동점
              </h2>
              <p className="mt-2 text-sm text-muted">서울 중구 명동 일대</p>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full bg-brand-soft px-3 py-1.5 text-xs font-black leading-5 text-brand">
              한식
            </span>
          </div>
          <div className="relative isolate mt-6 h-64 overflow-hidden rounded-2xl border border-border bg-canvas sm:h-80">
            <NaverMap latitude={37.5636} longitude={126.985} zoom={16} className="h-full w-full" />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="font-bold">주변 경쟁 매장</p>
            <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-muted">
              연동 준비 중
            </span>
          </div>
        </section>
        <section className="rounded-card border border-border bg-white p-7">
          <h2 className="text-lg font-black">업종별 경쟁 분포</h2>
          <p className="mt-2 text-sm text-muted">선택 상권 주변 매장 분포를 확인하세요.</p>
          {[
            ["음식", "12곳", "26%", "bg-brand"],
            ["주점", "47곳", "86%", "bg-positive"],
            ["카페", "38곳", "70%", "bg-purple"],
            ["편의시설", "31곳", "58%", "bg-amber"],
          ].map(([l, n, w, c]) => (
            <div key={l} className="mt-6">
              <div className="mb-2 flex justify-between text-sm font-bold">
                <span>{l}</span>
                <span className="text-muted">{n}</span>
              </div>
              <div className="h-3 rounded-full bg-canvas">
                <div className={`h-full rounded-full ${c}`} style={{ width: w }} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
