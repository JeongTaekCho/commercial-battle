import { INDUSTRY_CATEGORIES } from "../../../constants/industry-categories";
import { INDUSTRY_MARKER_GLYPHS, type SmallCategoryCode } from "./category-glyphs";
import { MARKER_GLYPHS } from "./marker-glyphs";

const categories = new Map<string, (typeof INDUSTRY_CATEGORIES)[number]>(
  INDUSTRY_CATEGORIES.map((category) => [category.indsSclsCd, category]),
);

const COLORS: Record<string, string> = {
  G: "#2563eb", // 소매
  I1: "#4f46e5", // 숙박
  I2: "#c2410c", // 음식
  L: "#0f766e", // 부동산
  M: "#475569", // 전문 서비스
  N: "#0369a1", // 사업 지원
  P: "#7c3aed", // 교육
  Q: "#047857", // 의료
  R: "#a21caf", // 여가
  S: "#be185d", // 생활 서비스
};

export type IndustryMarkerOptions = {
  smallCategoryCode: string;
  name?: string;
  selected?: boolean;
  showLabel?: boolean;
};

export function getIndustryMarkerAppearance(smallCategoryCode: string) {
  const category = categories.get(smallCategoryCode);
  const glyph = category
    ? INDUSTRY_MARKER_GLYPHS[category.indsSclsCd as SmallCategoryCode]
    : "shop";
  return {
    name: category?.indsSclsNm ?? "기타 업종",
    color: category
      ? (COLORS[smallCategoryCode.slice(0, 2)] ?? COLORS[smallCategoryCode[0]] ?? "#475569")
      : "#475569",
    glyph,
    path: MARKER_GLYPHS[glyph],
  };
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

/** React와 지도에서 동일한 SVG를 사용합니다. 좌표는 말풍선 아래 꼭짓점입니다. */
export function createIndustryMarkerSvg({
  smallCategoryCode,
  name,
  selected = false,
  showLabel = true,
}: IndustryMarkerOptions) {
  const appearance = getIndustryMarkerAppearance(smallCategoryCode);
  const displayName = name ?? appearance.name;
  const shortName = name ?? appearance.name.replace(/ 소매업$| 서비스업$| 운영업$| 전문$/, "");
  const label = shortName.length > 10 ? `${shortName.slice(0, 9)}…` : shortName;
  const width = showLabel
    ? 52 + Array.from(label).reduce((sum, char) => sum + (/[^\x00-\x7F]/.test(char) ? 12 : 7), 0)
    : 44;
  const height = 52;
  const anchor = { x: width / 2, y: height - 2 };
  const fill = selected ? appearance.color : "#ffffff";
  const textColor = selected ? "#ffffff" : "#1e293b";
  const stroke = selected ? "#ffffff" : appearance.color;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(displayName)}${selected ? " (선택됨)" : ""}">
<title>${escapeXml(displayName)}${selected ? " (선택됨)" : ""}</title>
<path d="M14 2H${width - 14}Q${width - 2} 2 ${width - 2} 14V29Q${width - 2} 41 ${width - 14} 41H${anchor.x + 7}L${anchor.x} 50L${anchor.x - 7} 41H14Q2 41 2 29V14Q2 2 14 2Z" fill="${fill}" stroke="${stroke}" stroke-width="${selected ? 2.5 : 1.5}"/>
<circle cx="22" cy="21" r="15" fill="${selected ? "#ffffff" : appearance.color}"/>
<g transform="translate(11 10) scale(.9167)" fill="none" stroke="${selected ? appearance.color : "#ffffff"}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${appearance.path}"/></g>
${showLabel ? `<text x="43" y="25.5" fill="${textColor}" font-family="system-ui,-apple-system,sans-serif" font-size="12" font-weight="700">${escapeXml(label)}</text>` : ""}
</svg>`;
  return { svg, width, height, anchor };
}

/** Naver MarkerOptions.icon에 그대로 전달하는 HtmlIcon (SDK 로드 전에도 호출 가능). */
export function createNaverIndustryMarkerIcon(options: IndustryMarkerOptions) {
  const { svg, width, height, anchor } = createIndustryMarkerSvg(options);
  return {
    content: svg,
    size: { width, height },
    anchor,
  };
}
