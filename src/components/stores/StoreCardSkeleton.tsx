export default function StoreCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="animate-pulse overflow-hidden rounded-card border border-border bg-white"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="size-12 rounded-2xl bg-canvas" />
          <div className="h-6 w-20 rounded-full bg-canvas" />
        </div>
        <div className="mt-6 h-7 w-2/3 rounded bg-canvas" />
        <div className="mt-4 flex gap-2">
          <div className="h-9 w-24 rounded-lg bg-brand-soft" />
          <div className="h-9 w-28 rounded-lg bg-canvas" />
        </div>
        <div className="mt-4 h-6 w-4/5 rounded bg-canvas" />
        <div className="mt-7 border-t border-border pt-5">
          <div className="h-5 w-32 rounded bg-canvas" />
        </div>
      </div>
      <div className="h-14 border-t border-border bg-canvas/50" />
    </article>
  );
}
