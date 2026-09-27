"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link href="/explore" className="flex items-center gap-3 focus-ring">
          <span className="grid size-10 place-items-center rounded-xl bg-brand text-sm font-black text-white">
            SB
          </span>
          <span className="text-xl font-black tracking-tight">상권배틀</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          <Link
            href="/explore"
            className={`nav-link ${path === "/explore" || path === "/" ? "active" : ""}`}
          >
            상권 탐색
          </Link>
          <Link href="/stores" className={`nav-link ${path === "/stores" ? "active" : ""}`}>
            내 매장
          </Link>
          <Link href="/battle" className={`nav-link ${path === "/battle" ? "active" : ""}`}>
            배틀 결과
          </Link>
        </nav>
        <div></div>
        {/* <button
          onClick={() => window.alert("로그인 기능은 다음 단계에서 연결됩니다.")}
          className="focus-ring rounded-control border border-border px-4 py-3 text-sm font-bold transition hover:border-ink hover:bg-ink hover:text-white"
        >
          로그인
        </button> */}
      </div>
    </header>
  );
}
