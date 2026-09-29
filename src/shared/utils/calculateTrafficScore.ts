export type TrafficData = {
  food: number;
  cafe: number;
  convenience: number;
  bar: number;
  beauty: number;
};

export const calculateTrafficScore = (
  data: TrafficData,
  radius: number,
  p95Density: number = 500,
) => {
  const weightedStoreCount =
    data.food * 1.0 + data.cafe * 1.2 + data.convenience * 1.5 + data.bar * 0.8 + data.beauty * 0.6;

  const radiusKm = radius / 1000;

  const areaKm2 = Math.PI * radiusKm ** 2;

  const density = weightedStoreCount / areaKm2;

  const normalizedDensity = Math.min(density / p95Density, 1);

  const score = Math.pow(normalizedDensity, 0.85) * 100;

  return {
    weightedStoreCount: Number(weightedStoreCount.toFixed(1)),
    density: Number(density.toFixed(1)),
    score: Math.round(score),
  };
};
