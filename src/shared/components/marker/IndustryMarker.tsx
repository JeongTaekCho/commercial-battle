import {
  createIndustryMarkerSvg,
  type IndustryMarkerOptions,
} from "@/src/shared/utils/industry-marker/industry-marker";

export default function IndustryMarker(props: IndustryMarkerOptions) {
  const { svg, width, height } = createIndustryMarkerSvg(props);
  return (
    <span
      style={{ display: "inline-flex", width, height, verticalAlign: "middle", flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
