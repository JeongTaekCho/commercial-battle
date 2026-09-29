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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const isFormData = body instanceof FormData;
    const headers = new Headers(customHeaders);
    if (body !== undefined && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const requestUrl = /^https?:\/\//i.test(url) ? url : `${BASE_URL}/${url.replace(/^\/+/, "")}`;
    const response = await fetch(requestUrl, {
      ...requestOptions,
      headers,
      signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API 요청에 실패했습니다. (${response.status})`);
    }

    const text = await response.text();
    return (text.trim() ? JSON.parse(text) : undefined) as T;
  } finally {
    clearTimeout(timeoutId);
  }
};
