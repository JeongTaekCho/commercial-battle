"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";

const destinations = [
  {
    href: "/explore",
    label: "상권 탐색",
    description: "지도에서 발견하는 새로운 기회",
    icon: "map",
    tone: "coral",
  },
  {
    href: "/stores",
    label: "내 매장",
    description: "관심 매장과 분석 리포트를 한곳에",
    icon: "store",
    tone: "amber",
  },
  {
    href: "/battle",
    label: "상권 배틀",
    description: "두 매장의 입지를 같은 기준으로",
    icon: "battle",
    tone: "blue",
  },
] as const;

function NavigationIcon({ kind }: { kind: (typeof destinations)[number]["icon"] }) {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "map" && (
        <>
          <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
          <path d="M9 3v15M15 6v15" />
        </>
      )}
      {kind === "store" && (
        <>
          <path d="M3 10h18l-2-6H5l-2 6Zm2 0v10h14V10M9 20v-6h6v6" />
          <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        </>
      )}
      {kind === "battle" && (
        <>
          <path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4" />
        </>
      )}
    </svg>
  );
}

function Navigation({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const active =
    path === "/" ? "/explore" : path === "/shop" ? "/stores" : `/${path.split("/")[1]}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) {
        if (header.current?.querySelector("[data-mobile-nav]")?.contains(document.activeElement)) {
          header.current
            ?.querySelector<HTMLAnchorElement>(`[data-desktop-nav] a[href="${active}"]`)
            ?.focus();
        }
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, active]);

  return (
    <header
      ref={header}
      className={styles.header}
      data-open={open}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
          setOpen(false);
      }}
    >
      <div className={styles.bar}>
        <Link
          href="/explore"
          className={`${styles.logo} focus-ring`}
          onClick={() => setOpen(false)}
          aria-label="상권배틀 홈"
        >
          <Image width={200} height={100} src={"/images/logo.png"} alt="상권배틀 로고" />
        </Link>
        <nav data-desktop-nav className={styles.desktop} aria-label="주요 메뉴">
          {destinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "page" : undefined}
              data-tone={item.tone}
              className={`${styles.desktopLink} focus-ring`}
            >
              <NavigationIcon kind={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>
        <span className={styles.tagline}>
          <span />더 나은 입지, 더 나은 시작
        </span>
        <button
          ref={toggle}
          type="button"
          className={`${styles.toggle} focus-ring`}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.hamburger} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <div id="mobile-navigation" className={styles.drawer} inert={!open} aria-hidden={!open}>
        <div className={styles.drawerClip}>
          <nav data-mobile-nav className={styles.mobile} aria-label="모바일 주요 메뉴">
            <p className={styles.caption}>내 가게의 다음 가능성을 찾아보세요</p>
            {destinations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "page" : undefined}
                data-tone={item.tone}
                className={`${styles.mobileLink} focus-ring`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.mobileIcon}>
                  <NavigationIcon kind={item.icon} />
                </span>
                <span className={styles.mobileText}>
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
            <p className={styles.footer}>상권을 읽고, 가능성을 발견하세요.</p>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  const path = usePathname();
  return <Navigation key={path} path={path} />;
}
