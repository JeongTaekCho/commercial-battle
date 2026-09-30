"use client";

import { useRouter } from "next/navigation";
import ActionIcon from "@/src/shared/components/ActionIcon";

type WindowWithNavigation = Window & {
  navigation?: { canGoBack: boolean };
};

export default function ReportBackButton() {
  const router = useRouter();

  const handleBack = () => {
    const navigation = (window as WindowWithNavigation).navigation;
    // Navigation API는 현재 페이지와 연속된 동일 출처의 방문 기록만 노출합니다.
    if (navigation) {
      if (navigation.canGoBack) {
        window.history.back();
        return;
      }
    } else if (window.history.length > 1 && document.referrer) {
      try {
        if (new URL(document.referrer).origin === window.location.origin) {
          window.history.back();
          return;
        }
      } catch {
        // 이전 주소를 확인할 수 없으면 매장 목록으로 이동합니다.
      }
    }

    router.replace("/stores");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="focus-ring group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-5 text-sm font-bold text-ink shadow-sm transition hover:border-brand/30 hover:bg-brand-soft/40 hover:text-brand hover:shadow-md"
    >
      <span className="grid size-8 place-items-center rounded-full bg-canvas text-muted transition group-hover:bg-brand group-hover:text-white">
        <ActionIcon className="size-4 rotate-180" />
      </span>
      뒤로가기
    </button>
  );
}
