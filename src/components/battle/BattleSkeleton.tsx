export function BattleFormSkeleton() {
  return (
    <div role="status" aria-label="비교할 매장 목록을 불러오는 중">
      <div
        aria-hidden="true"
        className="grid animate-pulse gap-4 motion-reduce:animate-none md:grid-cols-2 md:gap-8"
      >
        {[0, 1].map((item) => (
          <div key={item} className="rounded-card border border-border bg-white p-6 sm:p-7">
            <div className="mb-4 h-3 w-16 rounded bg-canvas" />
            <div className="h-4 w-24 rounded bg-canvas" />
            <div className="mt-2 flex gap-2">
              <div className="h-14 flex-1 rounded-control bg-canvas" />
              <div className="h-14 w-20 rounded-control bg-canvas" />
            </div>
            <div className="mt-4 h-4 w-24 rounded bg-canvas" />
            <div className="mt-2 h-4 w-3/4 rounded bg-canvas" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BattleResultSkeleton() {
  return (
    <div role="status" aria-label="상권 점수를 계산하는 중">
      <div aria-hidden="true" className="animate-pulse motion-reduce:animate-none">
        <div className="mt-7 overflow-hidden rounded-3xl border border-[#dbe3f5] bg-[#eef3ff] p-7 sm:p-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2">
              <div className="h-3 w-28 rounded bg-[#dbe3f5]" />
              <div className="mt-4 h-9 w-3/4 rounded bg-[#dbe3f5]" />
              <div className="mt-3 h-6 w-full rounded bg-[#dbe3f5]" />
            </div>
            <div className="flex flex-wrap items-center gap-5 sm:border-l sm:border-[#d4dff4] sm:pl-9">
              <div className="h-16 w-28 rounded bg-[#dbe3f5]" />
              <div className="h-12 w-36 rounded-control bg-[#dbe3f5]" />
            </div>
          </div>
        </div>
        <div className="mt-7 rounded-card border border-border bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="h-7 w-28 rounded bg-canvas" />
            <div className="h-7 w-36 rounded-full bg-canvas" />
          </div>
          <div className="mt-6 flex gap-4">
            <div className="h-5 w-24 rounded bg-canvas" />
            <div className="h-5 w-24 rounded bg-canvas" />
          </div>
          <div className="mt-7 space-y-7">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="grid gap-4 border-b border-border pb-6 sm:grid-cols-[180px_1fr]"
              >
                <div>
                  <div className="h-5 w-24 rounded bg-canvas" />
                  <div className="mt-2 h-5 w-40 rounded bg-canvas" />
                </div>
                <div className="space-y-3">
                  {[0, 1].map((store) => (
                    <div key={store} className="flex items-center gap-3">
                      <div className="h-5 flex-1 rounded-md bg-canvas" />
                      <div className="h-5 w-10 rounded bg-canvas" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-24 rounded-xl bg-canvas" />
        </div>
        <div className="mt-7 rounded-card border border-border bg-white p-6 sm:p-8">
          <div className="h-3 w-24 rounded bg-canvas" />
          <div className="mt-2 h-7 w-40 rounded bg-canvas" />
          <div className="mt-3 h-7 w-3/4 rounded bg-canvas" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="h-36 rounded-2xl bg-canvas" />
            <div className="h-36 rounded-2xl bg-canvas" />
          </div>
        </div>
      </div>
    </div>
  );
}
