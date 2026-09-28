export type MapInstance = {
  getProjection: () => {
    fromCoordToOffset: (position: { lat: number; lng: number }) => { x: number; y: number };
  };
  getZoom: () => number;
  setZoom: (zoom: number) => void;
  getMaxZoom: () => number;
  fitBounds: (
    positions: { lat: number; lng: number }[],
    options: { top: number; right: number; bottom: number; left: number; maxZoom: number },
  ) => void;

  setCenter: (position: { lat: number; lng: number }) => void;
  destroy: () => void;
};
export type MarkerInstance = { setMap: (map: MapInstance | null) => void };
