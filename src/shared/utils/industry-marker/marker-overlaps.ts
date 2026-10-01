type Bounds = { left: number; top: number; right: number; bottom: number };

const overlapRatio = (a: Bounds, b: Bounds) => {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const intersection = width * height;
  const areaA = Math.max(1, (a.right - a.left) * (a.bottom - a.top));
  const areaB = Math.max(1, (b.right - b.left) * (b.bottom - b.top));
  return intersection / Math.min(areaA, areaB);
};

export function groupOverlappingMarkers<T>(
  items: readonly T[],
  getBounds: (item: T) => Bounds,
  threshold = 0.7,
) {
  const groups: { items: T[]; bounds: Bounds[] }[] = [];
  const cells = new Map<string, Set<number>>();
  for (const item of items) {
    const bounds = getBounds(item);
    if (!Object.values(bounds).every(Number.isFinite)) continue;
    const candidates = new Set<number>();
    for (let x = Math.floor(bounds.left / 160); x <= Math.floor(bounds.right / 160); x++) {
      for (let y = Math.floor(bounds.top / 64); y <= Math.floor(bounds.bottom / 64); y++) {
        for (const index of cells.get(`${x}:${y}`) ?? []) candidates.add(index);
      }
    }
    const groupIndex = [...candidates].find((index) =>
      groups[index].bounds.some((other) => overlapRatio(bounds, other) >= threshold),
    );
    const group = groupIndex === undefined ? undefined : groups[groupIndex];
    if (group) {
      group.items.push(item);
      group.bounds.push(bounds);
    } else {
      groups.push({ items: [item], bounds: [bounds] });
      const index = groups.length - 1;
      for (let x = Math.floor(bounds.left / 160); x <= Math.floor(bounds.right / 160); x++) {
        for (let y = Math.floor(bounds.top / 64); y <= Math.floor(bounds.bottom / 64); y++) {
          const bucket = cells.get(`${x}:${y}`) ?? new Set<number>();
          bucket.add(index);
          cells.set(`${x}:${y}`, bucket);
        }
      }
    }
  }
  return groups.map((group) => group.items);
}
