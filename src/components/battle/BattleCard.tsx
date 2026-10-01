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
  side: "A" | "B";
  store: Store | null;
  handleChangeOption: (value: string) => void;
  storeOption: Option[] | undefined;
}

export default function BattleCard({
  side,
  store,
  handleChangeOption,
  storeOption,
}: BattleCardProps) {
  const isFirst = side === "A";
  return (
    <div
      className={`min-w-0 rounded-card border border-t-[3px] bg-white p-5 shadow-[0_4px_20px_#293d3504] sm:p-7 ${isFirst ? "border-[#f2cfc4]" : "border-[#cbdaf4]"}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`grid size-9 place-items-center rounded-xl text-sm font-bold ${isFirst ? "bg-[#fff0ea] text-[#c65338]" : "bg-[#edf3ff] text-[#3768cd]"}`}
        >
          {side}
        </span>
        <div>
          <p className="text-sm font-bold">{isFirst ? "기준이 되는 매장" : "함께 비교할 매장"}</p>
          <p className="mt-1 text-[10px] tracking-[.12em] text-muted">STORE {side}</p>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <SelectionField
            label={`비교 매장 ${side}`}
            value={store?.id || ""}
            options={storeOption ?? []}
            onChange={handleChangeOption}
          />
        </div>
        {store ? (
          <Link
            href={`/stores/${store.id}`}
            aria-label={`${store?.name} 분석 리포트 보기`}
            className={`focus-ring inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-control border px-4 text-xs font-bold transition hover:shadow-sm ${isFirst ? "border-[#f2cfc4] bg-[#fff0ea] text-[#c65338] hover:bg-[#ffe3d8]" : "border-[#cbdaf4] bg-[#edf3ff] text-[#3768cd] hover:bg-[#dde9ff]"}`}
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
      <div className="mt-5 min-h-14 border-t border-border pt-4">
        <p className="text-xs font-bold text-muted">
          {store
            ? getCategoryBySmallCode(store.small || "")?.indsSclsNm
            : "등록한 매장에서 선택해 주세요"}
        </p>
        <p className="mt-2 break-words text-xs leading-5 text-muted">
          {store?.address || "두 매장을 선택하면 상권 비교가 시작돼요."}
        </p>
      </div>
    </div>
  );
}
