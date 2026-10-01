import { TrafficData } from "@/src/shared/utils/calculateTrafficScore";

interface IndustryDistributionProps {
  trafficData: TrafficData | undefined;
  trafficTotalCount: number;
}

export default function IndustryDistribution({
  trafficData,
  trafficTotalCount,
}: IndustryDistributionProps) {
  const categoryInfoArray = [
    { label: "음식점", count: trafficData?.food || 0, color: "bg-blue-500" },
    { label: "카페", count: trafficData?.cafe || 0, color: "bg-violet-500" },
    { label: "편의점", count: trafficData?.convenience || 0, color: "bg-amber-500" },
    { label: "주점", count: trafficData?.bar || 0, color: "bg-teal-500" },
    { label: "미용·생활서비스", count: trafficData?.beauty || 0, color: "bg-rose-400" },
  ];

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
        {categoryInfoArray.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="inline-flex items-center gap-2 font-bold">
                <span aria-hidden="true" className={`size-2 rounded-full ${item.color}`} />
                {item.label}
              </span>
              <span className="font-bold">{item.count}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-canvas">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{
                  width: `${(item.count / Math.max(1, ...Object.values(trafficData || {}))) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between border-t border-border pt-4 text-sm font-bold">
        <span>방문형 업종 합계</span>
        <span className="text-brand">{trafficTotalCount}개</span>
      </div>
    </section>
  );
}
