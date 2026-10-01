import { useState } from "react";
import { getStoreCategories } from "../../shared/utils/getStoreCategory";
import type { Store } from "../../types/storeType";
import ConfirmModal from "@/src/shared/components/ConfirmModal";
import { useDeleteStoreMutation } from "@/src/hooks/stores/useDeleteStoreMutation";
import IndustryCategoryIcon from "@/src/shared/components/IndustryCategoryIcon";
import ActionIcon from "@/src/shared/components/ActionIcon";
import { toast } from "@/src/shared/utils/toast";

export default function StoreCard({
  store,
  onOpen,
  onEdit,
}: {
  store: Store;
  onOpen: () => void;
  onEdit: () => void;
}) {
  const { middle, small } = getStoreCategories(store);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const { mutate: deleteStoreMutate } = useDeleteStoreMutation();

  const handleToggleDeleteConfirmModal = () => {
    setIsDeleteConfirm((prev) => !prev);
  };

  const handleDeleteStore = () => {
    if (!store.id) return;

    deleteStoreMutate(store.id, {
      onSuccess: () => {
        toast.success(`${store.name} 매장이 삭제되었습니다.`);
      },
    });
  };

  return (
    <>
      <article className="group overflow-hidden rounded-card border border-border bg-white shadow-[0_4px_20px_#293d3504] transition hover:border-[#ccba9f] hover:shadow-lg hover:shadow-ink/5">
        <button
          type="button"
          onClick={onOpen}
          className="focus-ring block w-full p-6 text-left sm:p-7"
        >
          <div className="flex items-center justify-between">
            <IndustryCategoryIcon smallCategoryCode={store.small} className="size-12 rounded-2xl" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f4eb] px-3 py-1.5 text-[11px] font-medium text-positive">
              <span className="size-1.5 rounded-full bg-[#88a078]" /> 내 매장
            </span>
          </div>
          <h3 className="mt-5 break-words text-xl font-bold tracking-tight">{store.name}</h3>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-lg bg-canvas px-3 py-2">
              <span className="text-muted">중분류</span>
              <span className="font-bold text-ink">{middle}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-[#fbf1e6] px-3 py-2">
              <span className="text-muted">소분류</span>
              <span className="font-bold text-[#9c6544]">{small ?? "미선택"}</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{store.address}</p>
          <div className="mt-7 flex items-center justify-between border-t border-border pt-5 text-sm font-bold">
            <span>상권 분석 보기</span>
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-[#f1f4eb] text-positive transition group-hover:bg-positive group-hover:text-white"
            >
              <ActionIcon />
            </span>
          </div>
        </button>
        <div className="flex justify-end gap-2 border-t border-border bg-[#fcfbf7] px-6 py-2">
          <button
            onClick={onEdit}
            aria-label="매장 수정"
            title="매장 수정"
            className="focus-ring grid size-9 place-items-center rounded-lg text-muted hover:bg-white hover:text-ink"
          >
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={handleToggleDeleteConfirmModal}
            aria-label="매장 삭제"
            title="매장 삭제"
            className="focus-ring grid size-9 place-items-center rounded-lg text-red-500 hover:bg-red-50"
          >
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6 18 20H6L5 6" />
              <path d="M10 11v5M14 11v5" />
            </svg>
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
