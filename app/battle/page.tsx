import Link from "next/link";
import BattleComparison from "@/src/components/battle/BattleComparison";
import ActionIcon from "@/src/shared/components/ActionIcon";
import WorkspaceIntro from "@/src/shared/components/WorkspaceIntro";

export default function BattlePage() {
  return (
    <main className="workspace-page battle-page">
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:py-10 lg:px-10">
        <WorkspaceIntro
          variant="battle"
          action={
            <Link
              href="/stores"
              className="focus-ring inline-flex items-center justify-center gap-3 rounded-control border border-[#cbdaf4] bg-white/80 px-5 py-3 text-center text-sm font-bold text-[#3768cd] transition hover:border-[#3768cd] hover:bg-white"
            >
              내 매장 관리 <ActionIcon />
            </Link>
          }
        />
        <div className="mb-5 mt-9 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[.16em] text-[#3768cd]">SIDE BY SIDE</p>
            <h2 className="mt-2 text-lg font-bold">어느 자리가 더 잘 맞을까요?</h2>
          </div>
          <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-muted">
            동일 반경 150m 기준
          </span>
        </div>
        <BattleComparison />
        <p className="mt-6 text-xs leading-6 text-muted">
          배틀 결과는 서비스에서 정의한 상권 분석 점수 비교 결과이며, 실제 매출이나 사업 성공
          가능성을 의미하지 않습니다.
        </p>
      </div>
    </main>
  );
}
