"use client";

import BattleCard from "@/src/components/battle/BattleCard";
import { useGetStoreListQuery } from "@/src/shared/hooks/useGetStoreListQuery";
import { useBattleStore } from "@/src/store/battle/useBattleStore";

export default function BattleForm() {
  const { storeA, storeB, setStoreA, setStoreB } = useBattleStore();
  const { data: storeList } = useGetStoreListQuery();
  const getStoreOptions = (otherStoreId?: string) =>
    storeList?.map((store) => ({
      label: store.name,
      value: store.id,
      disabled: store.id === otherStoreId,
    }));

  const handleChangeStoreA = (value: string) => {
    const result = storeList?.find((store) => store.id === value);
    setStoreA(result);
  };
  const handleChangeStoreB = (value: string) => {
    const result = storeList?.find((store) => store.id === value);
    setStoreB(result);
  };

  return (
    <section
      aria-label="비교할 매장 선택"
      className="relative mt-7 grid gap-4 md:grid-cols-2 md:gap-8"
    >
      <BattleCard
        store={storeA}
        storeOption={getStoreOptions(storeB?.id)}
        handleChangeOption={handleChangeStoreA}
      />
      <BattleCard
        store={storeB}
        storeOption={getStoreOptions(storeA?.id)}
        handleChangeOption={handleChangeStoreB}
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-canvas bg-ink text-xs font-black italic text-white md:grid"
      >
        VS
      </span>
    </section>
  );
}
