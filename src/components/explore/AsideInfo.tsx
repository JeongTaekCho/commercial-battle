"use client";

import IndustryFields from "@/src/shared/components/selection/IndustryFields";
import { useLocationStore } from "@/src/store/explore/useLocationStore";
import { useTypeFilterStore } from "@/src/store/explore/useTypeFilterStore";
import { useGetCommercialDistrictsByRadiusQuery } from "@/src/shared/hooks/useGetCommercialDistrictsByRadiusQuery";

export default function AsideInfo() {
  const { address, coords, radius } = useLocationStore();
  const { middleType, setMiddleType, smallType, setSmallType } = useTypeFilterStore();
  const { data, isFetching } = useGetCommercialDistrictsByRadiusQuery(
    radius,
    coords,
    middleType,
    smallType,
  );

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
        <p className="mt-2 text-[16px] font-black">
          {isFetching ? "주소를 불러오는 중..." : address}
        </p>
        <div className="mt-4 border-t border-white/15 pt-4 text-sm">
          <span className="text-white/60">조회된 상권</span>
          <strong className="float-right text-xl">
            {isFetching ? "-" : `${data?.totalCount ?? 0}곳`}
          </strong>
        </div>
        {data && data?.items?.length >= 1000 && (
          <div className="mt-4 border-t border-white/15 pt-4 text-sm">
            <span className="text-white/60">지도에 표기된 상권</span>
            <strong className="float-right text-xl">
              {isFetching ? "-" : `${data?.items?.length ?? 0}곳`}
            </strong>
          </div>
        )}
      </section>
      {data && data?.items?.length >= 1000 && (
        <p className="text-[12px] text-red-500 mt-2 pl-2">
          지도에는 최대 1000개까지 매장을 표시할 수 있습니다.
          <br /> 업종 필터를 적용해주세요.{" "}
        </p>
      )}

      <div className="mt-9">
        <h2 className="mb-3 text-sm font-black">업종 필터</h2>
        <IndustryFields
          middle={middleType}
          small={smallType}
          allowAll
          onMiddleChange={(value) => {
            setMiddleType(value);
            setSmallType("");
          }}
          onSmallChange={setSmallType}
        />
      </div>
    </aside>
  );
}
