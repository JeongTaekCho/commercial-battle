import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  if (!query) return Response.json({ error: "검색어를 입력해 주세요." }, { status: 400 });
  if (!Number.isInteger(page) || page < 1) return Response.json({ error: "페이지가 올바르지 않습니다." }, { status: 400 });

  const key = process.env.KAKAO_REST_KEY || process.env.NEXT_PUBLIC_KAKAO_REST_KEY;
  if (!key) return Response.json({ configured: false, documents: [], error: "Kakao REST 키가 설정되지 않았습니다." }, { status: 503 });
  const url = new URL("https://dapi.kakao.com/v2/local/search/address.json");
  url.search = new URLSearchParams({ query, page: String(page), size: "10" }).toString();
  const response = await fetch(url, { headers: { Authorization: `KakaoAK ${key}` }, cache: "no-store" });
  if (!response.ok) return Response.json({ error: "주소 검색에 실패했습니다." }, { status: response.status });
  const data = await response.json();
  if (data.documents?.length) return Response.json({ documents: data.documents, meta: data.meta ?? {} });
  const keywordUrl = new URL("https://dapi.kakao.com/v2/local/search/keyword.json");
  keywordUrl.search = new URLSearchParams({ query, page: String(page), size: "10" }).toString();
  const keywordResponse = await fetch(keywordUrl, { headers: { Authorization: `KakaoAK ${key}` }, cache: "no-store" });
  if (!keywordResponse.ok) return Response.json({ documents: [], meta: data.meta ?? {} });
  const keywordData = await keywordResponse.json();
  const documents = (keywordData.documents ?? []).map((item: { address_name?: string; road_address_name?: string; place_name?: string; x: string; y: string }) => ({ address_name: item.address_name || item.road_address_name || item.place_name || query, x: item.x, y: item.y, road_address: { address_name: item.road_address_name || item.address_name || query, building_name: item.place_name } }));
  return Response.json({ documents, meta: keywordData.meta ?? {} });
}
