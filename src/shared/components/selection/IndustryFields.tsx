"use client";
import { getMiddleCategories, getSmallCategories } from "@/src/constants/industry-categories";
import SelectionField from "./SelectionField";

export default function IndustryFields({
  middle,
  small,
  onMiddleChange,
  onSmallChange,
  allowAll = false,
}: {
  middle: string;
  small: string;
  onMiddleChange: (value: string) => void;
  onSmallChange: (value: string) => void;
  allowAll?: boolean;
}) {
  return (
    <div className="grid gap-4">
      <SelectionField
        label="중분류"
        value={middle}
        onChange={onMiddleChange}
        options={[
          ...(allowAll ? [{ value: "", label: "전체 중분류" }] : []),
          ...getMiddleCategories().map((item) => ({ value: item.code, label: item.name })),
        ]}
      />
      <SelectionField
        label="소분류"
        value={small}
        onChange={onSmallChange}
        disabled={!getMiddleCategories().some((item) => item.code === middle)}
        placeholder="소분류를 선택해 주세요"
        options={[
          ...(allowAll ? [{ value: "", label: "전체 소분류" }] : []),
          ...getSmallCategories(middle).map((item) => ({
            value: item.indsSclsCd,
            label: item.indsSclsNm,
          })),
        ]}
      />
    </div>
  );
}
