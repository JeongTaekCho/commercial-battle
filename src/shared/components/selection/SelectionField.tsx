"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { useDebouncedValue } from "@/src/shared/hooks/useDebouncedValue";

type Option = { value: string; label: string; disabled?: boolean };

export default function SelectionField({
  label,
  value,
  options,
  onChange,
  placeholder = "선택해 주세요",
  disabled = false,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const selected = options.find((option) => option.value === value);
  const debouncedQuery = useDebouncedValue(query);
  const searchQuery = query.trim() ? debouncedQuery.trim() : "";
  const filtered = useMemo(
    () => options.filter((option) => option.label.includes(searchQuery)),
    [options, searchQuery],
  );
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const triggerElement = trigger.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      triggerElement?.focus();
    };
  }, [open]);
  return (
    <div className="min-w-0">
      <span id={`${id}-label`} className="mb-2 block text-xs font-bold text-muted">
        {label}
      </span>
      <button
        ref={trigger}
        type="button"
        disabled={disabled}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setQuery("");
          setOpen(true);
        }}
        className="focus-ring flex min-h-14 w-full items-center justify-between gap-3 rounded-control border border-border bg-white px-4 py-3 text-left text-sm transition hover:border-brand hover:bg-brand-soft/30 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted"
      >
        <span id={`${id}-value`} className="break-keep font-semibold">
          {disabled ? "중분류를 먼저 선택해 주세요" : (selected?.label ?? placeholder)}
        </span>
        <span aria-hidden="true" className="text-muted">
          ⌄
        </span>
      </button>
      {open && (
        <dialog
          ref={dialog}
          aria-labelledby={`${id}-title`}
          onCancel={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-32px)] max-w-xl overflow-hidden rounded-3xl border border-border bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div>
              <p className="text-[10px] font-black tracking-[.18em] text-brand">
                FIND YOUR CATEGORY
              </p>
              <h2 id={`${id}-title`} className="mt-2 text-xl font-black">
                {label} 선택
              </h2>
              <p className="mt-2 text-sm text-muted">목록에서 선택하거나 이름으로 검색해 보세요.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="선택 창 닫기"
              className="focus-ring grid size-9 shrink-0 place-items-center rounded-full bg-canvas text-xl"
            >
              ×
            </button>
          </div>
          <div className="p-5">
            <input
              autoFocus
              aria-label={`${label} 검색`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="업종 이름을 검색하세요"
              className="w-full rounded-xl border border-border bg-canvas px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
            <p className="my-4 text-xs text-muted">
              선택 가능한 항목 <strong className="text-ink">{filtered.length}</strong>
            </p>
            <div className="scrollbar-pretty grid max-h-[42dvh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {filtered.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  disabled={option.disabled}
                  aria-pressed={value === option.value}
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`focus-ring flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:border-border disabled:bg-canvas disabled:text-muted ${value === option.value ? "border-brand bg-brand-soft text-brand" : "border-border hover:border-brand hover:bg-canvas"}`}
                >
                  {option.label}
                  <span
                    aria-hidden="true"
                    className={value === option.value ? "text-brand" : "text-border"}
                  >
                    ✓
                  </span>
                </button>
              ))}
              {!filtered.length && (
                <p className="col-span-full py-10 text-center text-sm text-muted">
                  검색 결과가 없습니다. 다른 이름으로 검색해 주세요.
                </p>
              )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
