import { getIndustryMarkerAppearance } from "./industry-marker";

export const createMyMarkerSvg = (smallCategoryCode = "") => {
  const appearance = getIndustryMarkerAppearance(smallCategoryCode);
  const width = 84;
  const height = 56;
  const anchor = { x: 42, y: 54 };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 84 56" role="img" aria-label="주소 검색 위치">
<title>주소 검색 위치</title>
<path d="M17 2H67Q82 2 82 17V29Q82 44 67 44H49L42 54L35 44H17Q2 44 2 29V17Q2 2 17 2Z" fill="#0f172a" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
<circle cx="24" cy="23" r="15" fill="#ffffff"/>
<g transform="translate(13 12) scale(.9167)" fill="none" stroke="${appearance.color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${appearance.path}"/></g>
<text x="58" y="28.5" text-anchor="middle" fill="#ffffff" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="800">MY</text>
</svg>`;

  return { svg, width, height, anchor };
};

export const createNaverMyMarkerIcon = (smallCategoryCode = "") => {
  const { svg, width, height, anchor } = createMyMarkerSvg(smallCategoryCode);
  return { content: svg, size: { width, height }, anchor };
};
