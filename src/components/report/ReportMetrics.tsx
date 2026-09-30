import { ReportType } from "@/src/types/reportType";

interface ReportMetricsProps {
  report: ReportType;
  totalCount: number;
}

export default function ReportMetrics({ report, totalCount }: ReportMetricsProps) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-3">
      {[
        {
          label: "상권 활성도",
          value: report.activityScore || 0,
          detail: `주변 방문형 업종 ${totalCount}개`,
          color: "bg-brand",
          number: "text-brand",
          icon: "activity",
        },
        {
          label: "경쟁 환경 (추정)",
          value: report.competitionScore,
          detail:
            report.competitionCount === undefined
              ? "경쟁 업체 정보 확인 필요"
              : `150m 내 동일 소분류 ${report.competitionCount}개 · 높을수록 경쟁 적음`,
          color: "bg-positive",
          number: "text-positive",
          icon: "competition",
        },
        {
          label: "주변 전체 상가",
          value: totalCount,
          detail: "선택 반경 150m 기준",
          color: "bg-purple",
          number: "text-purple",
          icon: "stores",
        },
      ].map((item, index) => (
        <section key={item.label} className="rounded-card border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-muted">{item.label}</h2>
            <span
              aria-hidden="true"
              className={`grid size-8 place-items-center rounded-lg bg-canvas text-lg ${item.number}`}
            >
              {item.icon === "activity" && (
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17 9 11l4 4 8-8" />
                  <path d="M15 7h6v6" />
                </svg>
              )}
              {item.icon === "competition" && (
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
                </svg>
              )}
              {item.icon === "stores" && (
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10h18l-2-6H5Z" />
                  <path d="M5 10v10h14V10M9 20v-6h6v6" />
                </svg>
              )}
            </span>
          </div>
          <p className="mt-5 flex items-baseline gap-2">
            <strong className="text-3xl font-black">{item.value ?? "—"}</strong>
            <span className="text-sm text-muted">{index === 2 ? "개" : "/ 100"}</span>
          </p>
          <p className="mt-3 text-xs text-muted">{item.detail}</p>
          {index !== 2 && item.value !== undefined && (
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-canvas">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
