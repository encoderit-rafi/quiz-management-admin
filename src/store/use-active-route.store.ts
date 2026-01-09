import { create } from "zustand";

type TActiveRoute = {
  name: string;
  path: string;
};

type TActiveRouteStore = {
  activeRoute: TActiveRoute;
  setActiveRoute: (route: TActiveRoute) => void;
};

export const useActiveRoute = create<TActiveRouteStore>()((set) => ({
  activeRoute: {
    name: "",
    path: "/",
  },
  setActiveRoute: (route) => set({ activeRoute: route }),
}));
