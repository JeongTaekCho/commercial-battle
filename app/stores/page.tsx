"use client";
import { useState } from "react";
import StoreModal from "@/src/components/stores/StoreModal";
import type { Store } from "@/src/types/storeType";
import StoreList from "@/src/components/stores/StoreList";

export default function StoresPage() {
  const [editing, setEditing] = useState<Store | null>(null);

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 sm:py-14 lg:px-10">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-black tracking-[.2em] text-brand">MY STORES</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">내 매장</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            내 가게의 가능성, 위치에서부터 시작하세요.
            <br />
            등록한 매장의 주변 상권과 경쟁 환경을 한눈에 확인할 수 있어요.
          </p>
        </div>
        <button
          onClick={() => setEditing({ id: "", name: "", middle: "Q", small: "", address: "" })}
          className="focus-ring button-primary rounded-control bg-brand px-6 py-3.5 text-sm font-bold text-white"
        >
          + 새 매장 등록
        </button>
      </div>
      <StoreList setEditing={setEditing} />
      {editing && <StoreModal store={editing} onClose={() => setEditing(null)} />}
    </main>
  );
}
