// import { type LucideIcon } from "lucide-react";
// import type { TPtah } from "@/types";
import type { TPtah } from "@/types";
import { create } from "zustand";

type TBreadcrumb = {
  // icon?: LucideIcon;
  name: string;
  path?: TPtah;
}[];

type TBreadcrumbStore = {
  breadcrumb: TBreadcrumb;
  setBreadcrumb: (route: TBreadcrumb) => void;
};

export const useBreadcrumb = create<TBreadcrumbStore>()((set) => ({
  breadcrumb: [],
  setBreadcrumb: (route) => set({ breadcrumb: route }),
}));
