import { MessageCircleQuestionMark, FileText } from "lucide-react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import type { TPtah, TRoute } from "@/types";
import { useRouterState } from "@tanstack/react-router";
import { NavMain } from "./nav-main";
import { useActiveRoute } from "@/store";
import { useEffect } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    location: { pathname },
  } = useRouterState();
  const { setActiveRoute } = useActiveRoute();

  const routes: TRoute[] = [
    {
      name: "Quizzes",
      url: "/",
      icon: MessageCircleQuestionMark,
      isActive: isActiveLink(["/"]),
      isVisible: true,
    },
    {
      name: "Result Pages",
      url: "/result-pages",
      icon: FileText,
      isActive: isActiveLink(["/result-pages"]),
      isVisible: true,
    },
  ];

  function isActiveLink(items: TPtah[]): boolean {
    return items.includes(pathname as TPtah);
  }

  // Update active route when pathname changes
  useEffect(() => {
    const activeRouteItem = routes.find((route) => route.isActive);
    if (activeRouteItem) {
      setActiveRoute({
        name: activeRouteItem.name,
        path: activeRouteItem.url,
      });
    }
  }, [pathname, setActiveRoute]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain routes={routes} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
