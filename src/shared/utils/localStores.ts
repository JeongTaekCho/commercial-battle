import type { Store } from "../../types/storeType";

const DATA_KEY = "commercial-battle:stores:v1";
const MODE_KEY = "commercial-battle:stores:local-mode";

export const usesLocalStores = () => window.localStorage.getItem(MODE_KEY) === "true";

export function enableLocalStores() {
  window.localStorage.setItem(MODE_KEY, "true");
}

function readStores(): Store[] {
  const raw = window.localStorage.getItem(DATA_KEY);
  const stores: unknown = raw ? JSON.parse(raw) : [];
  if (!Array.isArray(stores)) throw new Error("저장된 매장 데이터를 읽을 수 없습니다.");
  return stores;
}

function writeStores(stores: Store[]) {
  window.localStorage.setItem(DATA_KEY, JSON.stringify(stores));
}

export function requestLocalStores(url: string, method: string, body?: unknown): unknown {
  const id = url.split("/")[2];
  const stores = readStores();
  if (method === "GET" && !id) return stores;
  if (method === "POST" && !id) {
    const input = body as Store;
    const store = { ...input, id: input.id || crypto.randomUUID() };
    if (stores.some((item) => item.id === store.id)) throw new Error("이미 존재하는 매장입니다.");
    writeStores([...stores, store]);
    return store;
  }

  const index = stores.findIndex((store) => store.id === id);
  if (index === -1) throw new Error("매장을 찾을 수 없습니다. (404)");
  const store = stores[index];
  if (method === "GET") return store;
  if (method === "PATCH") {
    stores[index] = { ...store, ...(body as Partial<Store>), id: store.id };
    writeStores(stores);
    return stores[index];
  }
  if (method === "DELETE") {
    writeStores(stores.filter((item) => item.id !== id));
    return store;
  }
  throw new Error("지원하지 않는 매장 요청입니다.");
}

// 정상 조회한 서버 데이터를 보관해 연결이 끊겨도 기존 매장을 이용합니다.
export function cacheRemoteStores(url: string, method: string, data: unknown) {
  try {
    if (usesLocalStores()) return;
    const id = url.split("/")[2];
    if (method === "GET" && !id) {
      if (Array.isArray(data)) writeStores(data);
      return;
    }
    const stores = readStores();
    if (method === "DELETE") {
      writeStores(stores.filter((store) => store.id !== id));
    } else if (data && typeof data === "object" && "id" in data) {
      const store = data as Store;
      writeStores([...stores.filter((item) => item.id !== store.id), store]);
    }
  } catch {
    // 저장소를 사용할 수 없더라도 정상적인 서버 응답은 유지합니다.
  }
}
