"use client";
import { useEffect, useRef, useState } from "react";
import type { AddressResult } from "@/src/shared/components/AddressSearchModal";

export function useAddressSearch() {
  const [query, setQuery] = useState("");
  const [request, setRequest] = useState({ query: "", immediate: false });
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("주소 또는 건물명을 검색해 주세요.");
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!request.query) return;
    const controller = new AbortController();
    activeRequest.current = controller;
    const timer = setTimeout(
      async () => {
        try {
          const response = await fetch(
            `/api/address/search?query=${encodeURIComponent(request.query)}&page=1`,
            { signal: controller.signal },
          );
          const data = await response.json();
          if (controller.signal.aborted) return;
          if (!response.ok) throw new Error(data.error ?? "주소 검색 중 오류가 발생했습니다.");
          setResults(data.documents ?? []);
          setMessage(data.error ?? (data.documents?.length ? "" : "검색 결과가 없습니다."));
        } catch (error) {
          if (controller.signal.aborted) return;
          setMessage(error instanceof Error ? error.message : "주소 검색 중 오류가 발생했습니다.");
        } finally {
          if (!controller.signal.aborted) setLoading(false);
        }
      },
      request.immediate ? 0 : 300,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [request]);

  function search(value: string, immediate = false) {
    activeRequest.current?.abort();
    setQuery(value);
    setResults([]);
    setLoading(Boolean(value.trim()));
    setMessage(value.trim() ? "" : "주소 또는 건물명을 입력해 주세요.");
    setRequest({ query: value.trim(), immediate });
  }
  return {
    query,
    results,
    loading,
    message,
    updateQuery: (value: string) => search(value),
    searchNow: () => search(query, true),
  };
}
