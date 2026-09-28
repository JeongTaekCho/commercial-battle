export const toWktPolygon = (positions: { lat: number; lng: number }[]) => {
  if (positions.length < 3) {
    throw new Error("폴리곤은 최소 3개의 좌표가 필요합니다.");
  }

  const closedPositions = [...positions, positions[0]];

  const coordinates = closedPositions.map(({ lat, lng }) => `${lng} ${lat}`).join(", ");

  return `POLYGON((${coordinates}))`;
};
