"use client";
import { useState } from "react";
import StoreModal from "@/src/components/stores/StoreModal";
import type { Store } from "@/src/types/storeType";
import StoreList from "@/src/components/stores/StoreList";
import WorkspaceIntro from "@/src/shared/components/WorkspaceIntro";

export default function StoresPage() {
  const [editing, setEditing] = useState<Store | null>(null);

  return (
    <main className="workspace-page">
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:py-10 lg:px-10">
        <WorkspaceIntro
          variant="stores"
          action={
            <button
              onClick={() => setEditing({ id: "", name: "", middle: "Q", small: "", address: "" })}
              className="focus-ring button-primary inline-flex items-center gap-3 rounded-control bg-brand px-5 py-3 text-sm font-bold text-white"
            >
              + 새 매장 등록
            </button>
          }
        />
        <StoreList setEditing={setEditing} />
        {editing && <StoreModal store={editing} onClose={() => setEditing(null)} />}
      </div>
    </main>
  );
}
