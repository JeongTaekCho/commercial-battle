import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const latitude = request.nextUrl.searchParams.get("latitude");
  const longitude = request.nextUrl.searchParams.get("longitude");
  const lat = Number(latitude);
  const lng = Number(longitude);
  if (
    !latitude?.trim() ||
    !longitude?.trim() ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    Math.abs(lat) > 90 ||
    Math.abs(lng) > 180
  ) {
    return Response.json({ error: "좌표가 올바르지 않습니다." }, { status: 400 });
  }

  const key = process.env.KAKAO_REST_KEY || process.env.NEXT_PUBLIC_KAKAO_REST_KEY;
  if (!key)
    return Response.json({ error: "Kakao REST 키가 설정되지 않았습니다." }, { status: 503 });

  const url = new URL("https://dapi.kakao.com/v2/local/geo/coord2address.json");
  url.search = new URLSearchParams({ x: String(lng), y: String(lat) }).toString();
  try {
    const response = await fetch(url, {
      headers: { Authorization: `KakaoAK ${key}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return Response.json({ error: "주소 변환에 실패했습니다." }, { status: 502 });
    const data = await response.json();
    const document = data.documents?.[0];
    return Response.json({
      address: document?.road_address?.address_name || document?.address?.address_name || null,
    });
  } catch {
    return Response.json({ error: "주소 변환에 실패했습니다." }, { status: 502 });
  }
}
