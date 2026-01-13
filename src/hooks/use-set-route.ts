import { useEffect } from "react";
import { useActiveRoute } from "@/store";

type TRoute = {
  name: string;
  path: string;
};

export const useSetRoute = (route: TRoute) => {
  const { setActiveRoute } = useActiveRoute();

  useEffect(() => {
    setActiveRoute(route);
  }, [route.name, route.path]);
};
