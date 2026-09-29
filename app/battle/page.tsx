import Link from "next/link";
import BattleComparison from "@/src/components/battle/BattleComparison";

export default function BattlePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 sm:py-14 lg:px-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-black tracking-[.2em] text-brand">LOCATION VS LOCATION</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">배틀 결과</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            두 매장의 입지, 같은 기준으로 나란히.
            <br />
            상권 활성도와 경쟁 환경을 비교해 보세요.
          </p>
        </div>
        <Link
          href="/stores"
          className="focus-ring rounded-control border border-border bg-white px-5 py-3.5 text-center text-sm font-bold"
        >
          내 매장 관리 ↗
        </Link>
      </div>
      <BattleComparison />
      <p className="mt-6 text-xs leading-6 text-muted">
        배틀 결과는 서비스에서 정의한 상권 분석 점수 비교 결과이며, 실제 매출이나 사업 성공 가능성을
        의미하지 않습니다.
      </p>
    </main>
  );
}
