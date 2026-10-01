import type { ReactNode } from "react";
import NeighborhoodIllustration from "./NeighborhoodIllustration";
import BattleIllustration from "./BattleIllustration";

export default function WorkspaceIntro({
  variant,
  action,
}: {
  variant: "stores" | "battle";
  action: ReactNode;
}) {
  const isBattle = variant === "battle";
  return (
    <header className={`workspace-intro ${isBattle ? "workspace-intro-battle" : ""}`}>
      <div className="relative z-10 max-w-xl">
        <p
          className={`text-[10px] font-bold tracking-[.2em] ${isBattle ? "text-[#3768cd]" : "text-[#a85c3d]"}`}
        >
          {isBattle ? "LOCATION A × LOCATION B" : "YOUR NEXT CHAPTER STARTS HERE"}
        </p>
        <h1 className="mt-4 text-[32px] font-extrabold tracking-tight sm:text-[38px]">
          {isBattle ? "상권 배틀" : "내 매장"}
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          {isBattle
            ? "두 곳의 가능성, 같은 기준으로 나란히."
            : "우리 가게의 다음 가능성을 발견하는 곳."}
          <br />
          {isBattle
            ? "상권 활성도와 경쟁 환경을 비교해 더 나은 자리를 찾아보세요."
            : "관심 있는 매장을 모으고, 주변 상권을 한눈에 살펴보세요."}
        </p>
        <div className="mt-6">{action}</div>
      </div>
      <div className="workspace-illustration">
        {isBattle ? <BattleIllustration /> : <NeighborhoodIllustration />}
      </div>
    </header>
  );
}
