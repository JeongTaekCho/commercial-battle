"use client";

import { getMiddleCategories, getSmallCategories } from "@/src/constants/industry-categories";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useTypeFilterStore } from "@/src/store/explore/useTypeFilterStore";

export default function AsideInfo() {
  const { address } = useLocationStore();
  const { middleType, setMiddleType, smallType, setSmallType } = useTypeFilterStore();

  return (
    <aside className="border-r border-border bg-white p-8 lg:p-10">
      <p className="text-xs font-black tracking-[.18em] text-brand">DISCOVER YOUR NEXT SPOT</p>
      <h1 className="mt-5 text-3xl font-black leading-tight">
        내 가게의
        <br />
        다음 자리를 찾아보세요
      </h1>
      <p className="mt-5 text-sm leading-6 text-muted">
        상권과 업종 데이터를 바탕으로 성장 가능성이 높은 위치를 발견해 보세요.
      </p>
      <section className="mt-9 rounded-card bg-ink p-6 text-white">
        <p className="text-xs text-white/60">선택한 상권</p>
        <p className="mt-2 text-lg font-black">{address}</p>
        <div className="mt-6 border-t border-white/15 pt-4 text-sm">
          <span className="text-white/60">조회된 상권 음식점</span>
          <strong className="float-right text-xl">128곳</strong>
        </div>
      </section>
      <div className="mt-9">
        <h2 className="mb-3 text-sm font-black">업종 필터</h2>
        <label className="text-xs font-bold text-muted">
          중분류
          <select
            value={middleType}
            onChange={(event) => {
              setMiddleType(event.target.value);
              setSmallType("");
            }}
            className="mt-2 w-full rounded-control border border-border bg-white p-3"
          >
            <option value="">전체 중분류</option>
            {getMiddleCategories().map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 block text-xs font-bold text-muted">
          소분류
          <select
            value={smallType}
            onChange={(event) => setSmallType(event.target.value)}
            disabled={!middleType}
            className="mt-2 w-full rounded-control border border-border bg-white p-3 disabled:bg-canvas"
          >
            <option value="">전체 소분류</option>
            {getSmallCategories(middleType).map((item) => (
              <option key={item.indsSclsCd} value={item.indsSclsCd}>
                {item.indsSclsNm}
              </option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
}
