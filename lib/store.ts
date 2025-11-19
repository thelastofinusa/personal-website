import { create } from "zustand";

interface ZustandStoreState {
  logo: string;
  setLogo: (logo: string) => void;
}

export const useZustandStore = create<ZustandStoreState>()((set) => ({
  logo: "/logo-white-tb.png",
  setLogo: (logo) => set({ logo }),
}));
