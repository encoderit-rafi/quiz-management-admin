import AppThemeToggle from "./app-theme-toggle";
import NavUser from "./nav-user";
import AppBreadcrumb from "./app-breadcrumb";

export default function Navbar() {
  return (
    <header className="bg-background flex py-1 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between sidebar-wrapper:h-12 px-2 md:px-4">
      <div className="flex items-center gap-2">
        <AppBreadcrumb />
      </div>
      <div className="flex items-center gap-2">
        <AppThemeToggle />
        <NavUser />
      </div>
    </header>
  );
}
