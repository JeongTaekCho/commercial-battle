import { getIndustryMarkerAppearance } from "@/src/shared/utils/industry-marker/industry-marker";

export default function IndustryCategoryIcon({
  smallCategoryCode,
  className = "size-6",
  backgroundColor,
}: {
  smallCategoryCode: string;
  className?: string;
  backgroundColor?: string;
}) {
  const appearance = getIndustryMarkerAppearance(smallCategoryCode);

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-xl ${className}`}
      style={{
        backgroundColor: backgroundColor ?? `${appearance.color}18`,
        color: appearance.color,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[65%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={appearance.path} />
      </svg>
    </span>
  );
}
