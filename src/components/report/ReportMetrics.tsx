import type { ReportPreview } from "@/src/constants/store-previews";

export default function ReportMetrics({ report }: { report: ReportPreview }) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-3">
      {[
        {
          label: "상권 활성도",
          value: report.activity,
          detail: "주변 방문형 업종 126개",
          color: "bg-brand",
          number: "text-brand",
          icon: "↗",
        },
        {
          label: "경쟁 환경",
          value: report.competition,
          detail: `500m 내 동일·유사 업종 ${report.competitors}개`,
          color: "bg-positive",
          number: "text-positive",
          icon: "◎",
        },
        {
          label: "주변 전체 상가",
          value: 183,
          detail: "선택 반경 500m 기준",
          color: "bg-purple",
          number: "text-purple",
          icon: "⌂",
        },
      ].map((item, index) => (
        <section key={item.label} className="rounded-card border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-muted">{item.label}</h2>
            <span
              aria-hidden="true"
              className={`grid size-8 place-items-center rounded-lg bg-canvas text-lg ${item.number}`}
            >
              {item.icon}
            </span>
          </div>
          <p className="mt-5 flex items-baseline gap-2">
            <strong className="text-3xl font-black">{item.value}</strong>
            <span className="text-sm text-muted">{index === 2 ? "개" : "/ 100"}</span>
          </p>
          <p className="mt-3 text-xs text-muted">{item.detail}</p>
          {index !== 2 && (
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
