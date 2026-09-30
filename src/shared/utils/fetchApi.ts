import { cacheRemoteStores, enableLocalStores, requestLocalStores, usesLocalStores } from "./localStores";

interface FetchApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

const BASE_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
const TIMEOUT_MS = 30_000;

export const fetchApi = async <T = unknown>(
  url: string,
  options: FetchApiOptions = {},
): Promise<T> => {
  const { body, headers: customHeaders, signal, ...requestOptions } = options;
  const isStoreRequest = typeof window !== "undefined" && /^\/stores(?:\/[^/?]+)?$/.test(url);
  const method = (options.method ?? "GET").toUpperCase();
  signal?.throwIfAborted();
  if (isStoreRequest && (!BASE_URL || usesLocalStores())) {
    enableLocalStores();
    return requestLocalStores(url, method, body) as T;
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), isStoreRequest ? 3000 : TIMEOUT_MS);

  try {
    const isFormData = body instanceof FormData;
    const headers = new Headers(customHeaders);
    if (body !== undefined && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const requestUrl = /^https?:\/\//i.test(url) ? url : `${BASE_URL}/${url.replace(/^\/+/, "")}`;
    let response: Response;
    try {
      response = await fetch(requestUrl, {
        ...requestOptions,
        headers,
        signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
        body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      if (!isStoreRequest || signal?.aborted) throw error;
      enableLocalStores();
      return requestLocalStores(url, method, body) as T;
    }

    if (isStoreRequest && response.status >= 500) {
      enableLocalStores();
      return requestLocalStores(url, method, body) as T;
    }

    if (!response.ok) {
      throw new Error(`API 요청에 실패했습니다. (${response.status})`);
    }

    const text = await response.text();
    const data = text.trim() ? JSON.parse(text) : undefined;
    if (isStoreRequest) cacheRemoteStores(url, method, data);
    return data as T;
  } finally {
    clearTimeout(timeoutId);
  }
};
