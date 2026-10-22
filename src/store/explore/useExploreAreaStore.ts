import { create } from "zustand";

export type PolygonPoint = { latitude: number; longitude: number };

type ExploreAreaState = {
  mode: "radius" | "polygon";
  points: PolygonPoint[];
  complete: boolean;
  setMode: (mode: "radius" | "polygon") => void;
  addPoint: (point: PolygonPoint) => void;
  movePoint: (index: number, point: PolygonPoint) => void;
  undoPoint: () => void;
  finish: () => void;
  clear: () => void;
};

export const useExploreAreaStore = create<ExploreAreaState>((set) => ({
  mode: "radius",
  points: [],
  complete: false,
  setMode: (mode) => set({ mode }),
  addPoint: (point) =>
    set((state) => (state.complete ? state : { points: [...state.points, point] })),
  movePoint: (index, point) =>
    set((state) => ({
      points: state.points.map((item, itemIndex) => (itemIndex === index ? point : item)),
    })),
  undoPoint: () => set((state) => (state.complete ? state : { points: state.points.slice(0, -1) })),
  finish: () => set((state) => (state.points.length >= 3 ? { complete: true } : state)),
  clear: () => set({ points: [], complete: false }),
}));
