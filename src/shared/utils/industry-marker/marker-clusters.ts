export type ClusterPoint = { x: number; y: number };

/** 인접 셀도 검사하므로 격자 경계에 걸친 마커도 반경 안이면 묶입니다. */
export const clusterMarkers = <T>(
  items: readonly T[],
  project: (item: T) => ClusterPoint,
  radius = 80,
): T[][] => {
  if (!Number.isFinite(radius) || radius <= 0) return items.map((item) => [item]);
  const cells = new Map<string, { point: ClusterPoint; items: T[] }[]>();
  const groups: T[][] = [];
  for (const item of items) {
    const point = project(item);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) continue;
    const x = Math.floor(point.x / radius);
    const y = Math.floor(point.y / radius);
    let nearest: { point: ClusterPoint; items: T[] } | undefined;
    let distance = radius * radius;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (const group of cells.get(`${x + dx}:${y + dy}`) ?? []) {
          const squared = (point.x - group.point.x) ** 2 + (point.y - group.point.y) ** 2;
          if (squared <= distance) {
            nearest = group;
            distance = squared;
          }
        }
      }
    }
    if (nearest) {
      nearest.items.push(item);
    } else {
      const group = { point, items: [item] };
      const key = `${x}:${y}`;
      const bucket = cells.get(key) ?? [];
      bucket.push(group);
      cells.set(key, bucket);
      groups.push(group.items);
    }
  }
  return groups;
};

/** 외곽 링과 실제 매장 수를 표시하는 Naver HtmlIcon. */
export const createClusterMarkerIcon = (count: number) => {
  const total = Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 1;
  const label = total.toLocaleString("ko-KR");
  const size = Math.max(total >= 100 ? 64 : total >= 10 ? 56 : 48, label.length * 11 + 20);
  const center = size / 2;
  return {
    content: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="매장 ${label}곳, 클릭하여 확대"><title>매장 ${label}곳 · 클릭하여 확대</title><circle cx="${center}" cy="${center}" r="${center}" fill="#2563eb" fill-opacity=".18"/><circle cx="${center}" cy="${center}" r="${center - 5}" fill="#1d4ed8" stroke="white" stroke-width="2"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-size="16" font-weight="800">${label}</text></svg>`,
    size: { width: size, height: size },
    anchor: { x: center, y: center },
  };
};
