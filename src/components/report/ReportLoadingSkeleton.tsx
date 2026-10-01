export default function ReportLoadingSkeleton({ withStore = false }: { withStore?: boolean }) {
  return (
    <main className="report-page">
      <div
        className="mx-auto max-w-[1200px] animate-pulse motion-reduce:animate-none px-5 py-10 sm:py-14 lg:px-10"
        aria-busy="true"
      >
        <p className="text-[11px] font-black tracking-[.2em] text-brand">MARKET ANALYSIS</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">분석 리포트</h1>
        <p className="mt-4 text-sm text-muted">매장 주변의 상권 활성도와 경쟁 환경을 살펴보세요.</p>
        <section className="mt-7 h-52 rounded-3xl bg-brand-soft p-7 sm:p-9">
          <div className="h-4 w-20 rounded bg-white/60" />
          <div className="mt-5 h-8 w-48 rounded bg-white/60" />
          <div className="mt-4 h-4 w-64 max-w-full rounded bg-white/60" />
        </section>
        {withStore && (
          <p className="mt-5 text-sm text-muted">매장 분석 정보를 불러오는 중입니다.</p>
        )}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-40 rounded-card border border-border bg-white p-6">
              <div className="h-4 w-24 rounded bg-canvas" />
              <div className="mt-6 h-9 w-20 rounded bg-canvas" />
              <div className="mt-5 h-2 rounded-full bg-canvas" />
            </div>
          ))}
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div className="h-96 rounded-card border border-border bg-white p-6">
            <div className="h-5 w-36 rounded bg-canvas" />
            <div className="mt-6 h-72 rounded-2xl bg-canvas" />
          </div>
          <div className="h-96 rounded-card border border-border bg-white p-6">
            <div className="h-5 w-36 rounded bg-canvas" />
            <div className="mt-6 h-72 rounded-2xl bg-canvas" />
          </div>
        </div>
      </div>
    </main>
  );
}
