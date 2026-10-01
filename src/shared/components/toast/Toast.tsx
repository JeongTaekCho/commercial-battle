"use client";

import type { ToastType } from "@/src/shared/store/useToastStore";

const styles: Record<ToastType, { icon: string; label: string; className: string }> = {
  success: {
    icon: "✓",
    label: "완료",
    className: "border-positive/20 bg-[#f1fbf7] text-positive",
  },
  error: {
    icon: "!",
    label: "오류",
    className: "border-red-200 bg-red-50 text-red-700",
  },
  warning: {
    icon: "!",
    label: "확인",
    className: "border-amber-200 bg-amber-50 text-[#9a6700]",
  },
  info: {
    icon: "i",
    label: "안내",
    className: "border-slate-200 bg-white text-ink",
  },
};

export default function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  const style = styles[type];

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`pointer-events-auto flex w-full max-w-[500px] items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-[0_14px_36px_rgba(23,36,59,0.12)] backdrop-blur-sm animate-[toast-in_220ms_ease-out] ${style.className}`}
    >
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full bg-current/10 text-sm font-black"
      >
        {style.icon}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[11px] font-black tracking-[0.08em] opacity-70">{style.label}</p>
        <p className="mt-0.5 break-words text-sm font-semibold leading-5 text-ink/85">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="알림 닫기"
        className="-mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded-full text-lg leading-none text-ink/45 transition hover:bg-black/5 hover:text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
      >
        ×
      </button>
    </div>
  );
}
