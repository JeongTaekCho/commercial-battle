import { createIndustryMarkerSvg, type IndustryMarkerOptions } from "./industry-marker";

/** 범례·목록·미리보기용. 클릭 동작이 필요하면 호출하는 쪽에서 button으로 감싸세요. */
export default function IndustryMarker(props: IndustryMarkerOptions) {
  const { svg, width, height } = createIndustryMarkerSvg(props);
  return (
    <span
      style={{ display: "inline-flex", width, height, verticalAlign: "middle", flexShrink: 0 }}
      // SVG 경로는 내부 상수이며 모든 텍스트는 XML 이스케이프 처리됩니다.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
