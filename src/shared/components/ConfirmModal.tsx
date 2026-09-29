"use client";

import { useEffect, useId, useRef } from "react";

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  pendingText?: string;
  variant?: "default" | "danger";
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// 확인 후 닫기와 API 처리 상태는 호출하는 컴포넌트에서 제어합니다.
export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  pendingText = "처리 중…",
  variant = "default",
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const isDanger = variant === "danger";

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    cancelRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      role="alertdialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      aria-busy={isPending}
      onCancel={(event) => {
        event.preventDefault();
        if (!isPending) onCancel();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget || isPending) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onCancel();
      }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-32px)] max-w-md overflow-y-auto rounded-3xl border border-border bg-white p-6 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div
        aria-hidden="true"
        className={`mb-5 grid size-12 place-items-center rounded-2xl text-xl font-black ${isDanger ? "bg-red-50 text-red-600" : "bg-brand-soft text-brand"}`}
      >
        {isDanger ? "!" : "?"}
      </div>
      <h2 id={`${id}-title`} className="break-words text-xl font-black leading-snug">
        {title}
      </h2>
      {description && (
        <p
          id={`${id}-description`}
          className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-muted"
        >
          {description}
        </p>
      )}
      <div className="mt-7 flex gap-3">
        <button
          ref={cancelRef}
          type="button"
          disabled={isPending}
          onClick={onCancel}
          className="focus-ring min-h-12 flex-1 rounded-control border border-border bg-white px-4 py-3 text-sm font-bold transition hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            if (!isPending) onConfirm();
          }}
          className={`focus-ring min-h-12 flex-1 rounded-control px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${isDanger ? "bg-red-600 hover:bg-red-700" : "bg-brand hover:bg-brand/90"}`}
        >
          {isPending ? pendingText : confirmText}
        </button>
      </div>
    </dialog>
  );
}
