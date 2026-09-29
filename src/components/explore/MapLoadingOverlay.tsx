export default function MapLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-20 grid cursor-wait place-items-center bg-white/60 backdrop-blur-[2px]">
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-2xl border border-border bg-white px-6 py-4 shadow-lg"
      >
        <span
          aria-hidden="true"
          className="size-6 shrink-0 animate-spin rounded-full border-[3px] border-brand/20 border-t-brand motion-reduce:animate-none"
        />
        <span className="text-sm font-bold text-ink">주변 상가를 불러오는 중이에요</span>
      </div>
    </div>
  );
}
