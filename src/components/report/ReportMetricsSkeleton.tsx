export default function ReportMetricsSkeleton() {
  return (
    <div
      className="mt-7 grid animate-pulse gap-4 sm:grid-cols-3"
      role="status"
      aria-label="점수 계산 중"
    >
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-40 rounded-card border border-border bg-white p-6">
          <div className="h-4 w-24 rounded bg-canvas" />
          <div className="mt-6 h-9 w-20 rounded bg-canvas" />
          <div className="mt-5 h-2 rounded-full bg-canvas" />
        </div>
      ))}
    </div>
  );
}
