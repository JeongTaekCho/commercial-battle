export default function IndustryDistribution() {
  return (
    <section className="rounded-card border border-border bg-white p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">방문형 업종 분포</h2>
        <span className="text-xs text-muted">단위: 개</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">
        상권 활성도를 추정하는 주변 업종 구성이에요.
      </p>
      <div className="mt-7 space-y-5">
        {[
          { label: "음식점", count: 52, color: "bg-brand" },
          { label: "카페", count: 21, color: "bg-purple" },
          { label: "편의점", count: 8, color: "bg-amber" },
          { label: "주점", count: 16, color: "bg-positive" },
          { label: "소매·생활서비스", count: 29, color: "bg-slate-400" },
        ].map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="font-bold">{item.label}</span>
              <span className="font-bold">{item.count}</span>
            </div>
            <div className="h-2 rounded-full bg-canvas">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.count / 52) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between border-t border-border pt-4 text-sm font-bold">
        <span>방문형 업종 합계</span>
        <span className="text-brand">126개</span>
      </div>
    </section>
  );
}
