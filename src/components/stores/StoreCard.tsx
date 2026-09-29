import { useState } from "react";
import { getStoreCategories } from "../../shared/utils/getStoreCategory";
import type { Store } from "../../types/storeType";
import ConfirmModal from "@/src/shared/components/ConfirmModal";
import { useDeleteStoreMutation } from "@/src/hooks/stores/useDeleteStoreMutation";

export default function StoreCard({
  store,
  onOpen,
  onEdit,
  onDelete,
}: {
  store: Store;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { middle, small } = getStoreCategories(store);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const { mutate: deleteStoreMutate } = useDeleteStoreMutation();

  const handleToggleDeleteConfirmModal = () => {
    setIsDeleteConfirm((prev) => !prev);
  };

  const handleDeleteStore = () => {
    if (!store.id) return;

    deleteStoreMutate(store.id);
  };

  console.log(store);
  return (
    <>
      <article className="group overflow-hidden rounded-card border border-border bg-white transition hover:border-brand/40 hover:shadow-lg hover:shadow-ink/5">
        <button
          type="button"
          onClick={onOpen}
          className="focus-ring block w-full p-6 text-left sm:p-7"
        >
          <div className="flex items-center justify-between">
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-2xl text-brand"
            >
              ⌂
            </span>
            <span className="rounded-full bg-canvas px-3 py-1.5 text-[11px] font-bold text-muted">
              MY STORE
            </span>
          </div>
          <h2 className="mt-6 break-words text-xl font-black tracking-tight">{store.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-lg bg-brand-soft px-3 py-2">
              <span className="text-muted">중분류</span>
              <span className="font-bold text-brand">{middle}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-canvas px-3 py-2">
              <span className="text-muted">소분류</span>
              <span className="font-bold text-ink">{small ?? "미선택"}</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{store.address}</p>
          <div className="mt-7 flex items-center justify-between border-t border-border pt-5 text-sm font-bold">
            <span>상권 분석 보기</span>
            <span aria-hidden="true" className="text-brand transition group-hover:translate-x-1">
              ↗
            </span>
          </div>
        </button>
        <div className="flex justify-end gap-2 border-t border-border bg-canvas/50 px-6 py-3">
          <button
            onClick={onEdit}
            className="focus-ring rounded-lg px-3 py-2 text-xs font-bold text-muted hover:bg-white hover:text-ink"
          >
            매장 수정
          </button>
          <button
            onClick={handleToggleDeleteConfirmModal}
            className="focus-ring rounded-lg px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
          >
            삭제
          </button>
        </div>
      </article>
      <ConfirmModal
        isOpen={isDeleteConfirm}
        title="매장을 삭제하시겠습니까?"
        description="삭제한 매장은 복구할 수 없습니다."
        confirmText="삭제"
        variant="danger"
        onConfirm={handleDeleteStore}
        onCancel={handleToggleDeleteConfirmModal}
      />
    </>
  );
}
