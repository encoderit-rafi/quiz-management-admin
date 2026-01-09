// import { SidebarTrigger } from "../ui/sidebar";
import AppBackButton from "./app-back-button";
import AppThemeToggle from "./app-theme-toggle";
import { useActiveRoute } from "@/store";
import NavUser from "./nav-user";
import { useRouterState } from "@tanstack/react-router";

export default function Navbar() {
  const { activeRoute } = useActiveRoute();
  const {
    location: { pathname },
  } = useRouterState();
  console.log("👉 ~ Navbar ~ pathname:", pathname);
  const isHomePage = pathname === "/";

  return (
    <header className="bg-background flex py-1 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between sidebar-wrapper:h-12 px-2 md:px-4">
      <div className="flex items-center gap-2">
        {!isHomePage && <AppBackButton />}
        {/* <SidebarTrigger className="-ml-1" /> */}

        <h1 className=" md:text-lg font-semibold">
          Quiz Management
          {Boolean(activeRoute.name) && (
            <span className="font-thin"> | {activeRoute.name}</span>
          )}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <AppThemeToggle />
        <NavUser />
      </div>
    </header>
  );
}
