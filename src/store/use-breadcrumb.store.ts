// import { type LucideIcon } from "lucide-react";
// import type { TPath } from "@/types";
import type { TPath } from "@/types";
import { create } from "zustand";

type TBreadcrumb = {
  // icon?: LucideIcon;
  name: string;
  path?: TPath;
}[];

type TBreadcrumbStore = {
  breadcrumb: TBreadcrumb;
  setBreadcrumb: (route: TBreadcrumb) => void;
};

export const useBreadcrumb = create<TBreadcrumbStore>()((set) => ({
  breadcrumb: [],
  setBreadcrumb: (route) => set({ breadcrumb: route }),
}));
