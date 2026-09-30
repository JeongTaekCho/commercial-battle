import { getCategoryBySmallCode } from "@/src/constants/industry-categories";
import SelectionField from "@/src/shared/components/selection/SelectionField";
import { Store } from "@/src/types/storeType";
import Link from "next/link";
import ActionIcon from "@/src/shared/components/ActionIcon";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface BattleCardProps {
  store: Store | null;
  handleChangeOption: (value: string) => void;
  storeOption: Option[] | undefined;
}

export default function BattleCard({ store, handleChangeOption, storeOption }: BattleCardProps) {
  return (
    <div className="rounded-card border border-brand/30 bg-white p-6 sm:p-7">
      <p className={`mb-4 text-[10px] font-black tracking-[.2em] text-brand`}>STORE A</p>
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <SelectionField
            label={`비교 매장 A`}
            value={store?.id || ""}
            options={storeOption ?? []}
            onChange={handleChangeOption}
          />
        </div>
        {store ? (
          <Link
            href={`/stores/${store.id}`}
            aria-label={`${store?.name} 분석 리포트 보기`}
            className="focus-ring inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-control border border-brand/20 bg-brand-soft px-4 text-xs font-bold text-brand shadow-sm transition hover:border-brand/40 hover:bg-brand hover:text-white hover:shadow-md"
          >
            <ActionIcon kind="report" />
            리포트
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-control border border-border bg-canvas px-4 text-xs font-bold text-muted opacity-60"
          >
            <ActionIcon kind="report" />
            리포트
          </button>
        )}
      </div>
      <p className="mt-4 text-xs font-bold text-muted">
        {" "}
        {getCategoryBySmallCode(store?.small || "")?.indsSclsNm}
      </p>
      <p className="mt-2 text-xs text-muted">{store?.address}</p>
    </div>
  );
}
