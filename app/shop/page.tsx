"use client";
import Link from "next/link";
import { getMiddleCategories } from "@/src/constants/industry-categories";
export default function StoresPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-24 py-64 lg:px-56">
      <div className="max-w-2xl">
        <p className="text-xs font-black tracking-[.18em] text-brand">MY STORES</p>
        <h1 className="mt-24 text-4xl font-black tracking-[-.06em]">
          동네 가게의 첫 번째 시나리오
        </h1>
        <p className="mt-20 leading-7 text-muted">
          내 가게와 업종, 위치를 설정하고 주변 상권과 비교해보세요.
        </p>
      </div>
      <div className="mt-64 grid gap-32 lg:grid-cols-[1fr_1fr]">
        <section>
          <h2 className="mb-4 text-lg font-black">
            등록한 매장 <span className="text-brand">2</span>
          </h2>
          <StoreCard
            selected
            name="상권배틀 명동점"
            type="음식점"
            place="서울 중구 시청역 1번 출구"
          />
          <StoreCard name="시청 카페 골목" type="카페" place="서울 중구 무교동" />
        </section>
        <section className="rounded-card border border-border bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">새 매장 설정</h2>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
              비교 준비
            </span>
          </div>
          <label className="mt-7 block text-sm font-bold">
            매장 이름
            <input
              className="mt-2 w-full rounded-control border border-border px-4 py-3 outline-none focus:border-brand"
              defaultValue="상권배틀 명동점"
            />
          </label>
          <label className="mt-5 block text-sm font-bold">
            업종
            <select
              className="mt-2 w-full rounded-control border border-border bg-white px-4 py-3 outline-none focus:border-brand"
              defaultValue="Q"
            >
              {getMiddleCategories().map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-5 rounded-control bg-canvas p-4">
            <p className="text-xs font-bold text-muted">선택 위치</p>
            <p className="mt-2 font-bold">서울 중구 명동 · 지도에서 위치 선택</p>
          </div>
          <button className="mt-7 w-full rounded-control bg-brand py-4 text-sm font-black text-white focus-ring">
            내 매장 저장하기
          </button>
        </section>
      </div>
      <div className="mt-10 rounded-card bg-ink p-7 text-white">
        <p className="text-xs font-black tracking-[.16em] text-white/50">READY TO COMPARE?</p>
        <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-black">매장과 상권의 격차를 확인해보세요.</h2>
            <p className="mt-2 text-sm text-white/60">
              선택한 상권의 경쟁 환경을 리포트로 보여드립니다.
            </p>
          </div>
          <Link
            href="/battle"
            className="rounded-control bg-brand px-5 py-4 text-center text-sm font-black"
          >
            배틀 결과 보기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
function StoreCard({
  selected,
  name,
  type,
  place,
}: {
  selected?: boolean;
  name: string;
  type: string;
  place: string;
}) {
  return (
    <article
      className={`lift mb-4 rounded-card border bg-white p-5 ${selected ? "border-brand ring-2 ring-brand/10" : "border-border"}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <span
            className={`grid size-12 place-items-center rounded-xl text-xl ${selected ? "bg-brand-soft" : "bg-canvas"}`}
          >
            {type === "카페" ? "☕" : "✦"}
          </span>
          <div>
            <h3 className="font-black">{name}</h3>
            <p className="mt-1 text-xs text-muted">
              {type} · {place}
            </p>
          </div>
        </div>
        {selected && (
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-black text-brand">
            선택됨
          </span>
        )}
      </div>
      <div className="mt-5 flex gap-2">
        <button className="rounded-lg bg-canvas px-3 py-2 text-xs font-bold transition hover:bg-ink hover:text-white">
          결과 보기
        </button>
        <button className="rounded-lg bg-canvas px-3 py-2 text-xs font-bold transition hover:bg-ink hover:text-white">
          수정
        </button>
        <button className="rounded-lg bg-canvas px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50">
          삭제
        </button>
      </div>
    </article>
  );
}
