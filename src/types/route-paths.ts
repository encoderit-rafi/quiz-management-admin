import type { router } from "@/main";
import type { LucideIcon } from "lucide-react";

export type TPtah = keyof typeof router.routesByPath;
export type TRoute = {
  name: string;
  url: TPtah;
  icon: LucideIcon;
  isActive: boolean;
  isVisible: boolean;
  children?: TRoute[];
};
