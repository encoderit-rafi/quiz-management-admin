import AppThemeToggle from "./app-theme-toggle";
import NavUser from "./nav-user";
import AppBreadcrumb from "./app-breadcrumb";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  const router = useRouter();
  const { pathname } = useRouterState({
    select: (state) => state.location,
  });
  return (
    <header className="bg-background flex py-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between sidebar-wrapper:h-12 px-6">
      <div className="flex items-center gap-2">
        {pathname !== "/" && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.history.back()}
          >
            <ArrowLeft />
          </Button>
        )}
        <AppBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <AppThemeToggle />
        <NavUser />
      </div>
    </header>
  );
}
