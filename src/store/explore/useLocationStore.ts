import { create } from "zustand";

type Coords = {
  latitude: number;
  longitude: number;
};

interface LocationStore {
  address: string;
  coords: Coords;
  radius: number;
  setRadius: (radius: number) => void;
  setAddress: (address: string) => void;
  setCoords: (coords: Coords) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  address: "서울 중구 명동",
  coords: { latitude: 37.5665, longitude: 126.978 },
  radius: 500,
  setRadius: (radius) => set({ radius }),

  setAddress: (address: string) => set({ address }),
  setCoords: (coords) => set({ coords }),
}));
