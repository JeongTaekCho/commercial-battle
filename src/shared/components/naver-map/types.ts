export type MapInstance = {
  getProjection: () => {
    fromCoordToOffset: (position: { lat: number; lng: number }) => { x: number; y: number };
  };
  getZoom: () => number;
  setZoom: (zoom: number) => void;
  getMaxZoom: () => number;
  morph: (position: { lat: number; lng: number }, zoom: number) => void;
  fitBounds: (
    positions: { lat: number; lng: number }[],
    options: { top: number; right: number; bottom: number; left: number; maxZoom: number },
  ) => void;

  setCenter: (position: { lat: number; lng: number }) => void;
  destroy: () => void;
};
export type MarkerInstance = {
  setMap: (map: MapInstance | null) => void;
  setIcon: (icon: {
    content: string;
    size: { width: number; height: number };
    anchor: { x: number; y: number };
  }) => void;
  setZIndex: (zIndex: number) => void;
};
