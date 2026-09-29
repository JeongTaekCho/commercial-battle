"use client";

import { useState } from "react";
import AddressSearchModal, { type AddressResult } from "@/src/shared/components/AddressSearchModal";
import IndustryFields from "@/src/shared/components/selection/IndustryFields";
import type { Store } from "../../types/storeType";
import { usePostStoreMutation } from "@/src/hooks/stores/usePostStoreMutation";
import { usePatchStoreMutation } from "@/src/hooks/stores/usePatchStoreMutation";

export default function StoreModal({
  store,
  onClose,
  onSave,
}: {
  store: Store;
  onClose: () => void;
  onSave: (store: Store) => void;
}) {
  const [value, setValue] = useState(store);
  const [addressOpen, setAddressOpen] = useState(false);

  const { mutate: postStoreMutate } = usePostStoreMutation();
  const { mutate: patchStoreMutate } = usePatchStoreMutation();

  const isComplete = Boolean(value.address && value.name && value.small);

  const updateValue = (nextValue: Partial<Store>) => {
    setValue((prev) => ({
      ...prev,
      ...nextValue,
    }));
  };

  const selectAddress = (address: AddressResult) => {
    updateValue({
      address: address.road_address?.address_name ?? address.address_name,
      x: Number(address.x),
      y: Number(address.y),
    });

    setAddressOpen(false);
  };

  const handlePostStore = () => {
    if (!isComplete) return;

    if (store.id) {
      patchStoreMutate(value);
    } else {
      postStoreMutate(value);
    }
    onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[90dvh] w-[min(92vw,520px)] overflow-y-auto rounded-card bg-white p-6 shadow-2xl"
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-black">{store.id ? "매장 수정" : "매장 등록"}</h2>

          <button aria-label="닫기" onClick={onClose} className="text-2xl">
            ×
          </button>
        </div>

        <label className="mt-6 block text-sm font-bold">
          매장명
          <input
            required
            value={value.name}
            onChange={(event) =>
              updateValue({
                name: event.target.value,
              })
            }
            className="mt-2 w-full rounded-control border border-border p-3"
            placeholder="예: 상권배틀 명동점"
          />
        </label>

        <div className="mt-5">
          <IndustryFields
            middle={value.middle}
            small={value.small}
            onMiddleChange={(middle) =>
              updateValue({
                middle,
                small: "",
              })
            }
            onSmallChange={(small) =>
              updateValue({
                small,
              })
            }
          />
        </div>

        <label className="mt-4 block text-sm font-bold">
          주소
          <div className="mt-2 flex gap-2">
            <input
              readOnly
              required
              value={value.address}
              className="w-full rounded-control border border-border bg-canvas p-3"
              placeholder="주소 검색으로 선택해 주세요"
            />

            <button
              type="button"
              onClick={() => setAddressOpen(true)}
              className="whitespace-nowrap rounded-control border border-border px-4 text-sm font-bold"
            >
              주소 검색
            </button>
          </div>
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-control border border-border px-4 py-3 text-sm font-bold"
          >
            취소
          </button>

          <button
            onClick={handlePostStore}
            disabled={!isComplete}
            className="rounded-control bg-brand px-4 py-3 text-sm font-black text-white disabled:!cursor-default disabled:opacity-70"
          >
            저장
          </button>
        </div>
      </div>

      {addressOpen && (
        <AddressSearchModal onClose={() => setAddressOpen(false)} onSelect={selectAddress} />
      )}
    </div>
  );
}
