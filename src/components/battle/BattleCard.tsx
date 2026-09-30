import { getCategoryBySmallCode } from "@/src/constants/industry-categories";
import SelectionField from "@/src/shared/components/selection/SelectionField";
import { Store } from "@/src/types/storeType";
import Link from "next/link";

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
        <Link
          href={`/stores/${store?.id || ""}`}
          aria-label={`${store?.name} 분석 리포트 보기`}
          className="focus-ring flex min-h-14 shrink-0 items-center rounded-control border border-border bg-canvas px-3 text-xs font-bold text-ink transition hover:border-brand hover:bg-brand-soft hover:text-brand"
        >
          리포트 ↗
        </Link>
      </div>
      <p className="mt-4 text-xs font-bold text-muted">
        {" "}
        {getCategoryBySmallCode(store?.small || "")?.indsSclsNm}
      </p>
      <p className="mt-2 text-xs text-muted">{store?.address}</p>
    </div>
  );
}
