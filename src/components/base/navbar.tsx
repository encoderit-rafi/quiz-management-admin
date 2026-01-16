import AppThemeToggle from "./app-theme-toggle";
import NavUser from "./nav-user";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGINATION } from "@/consts";
import { AudioWaveform } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-background flex py-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon] justify-between sidebar-wrapper:h-12 px-2 md:px-4">
      {/* <AppBreadcrumb /> */}
      <Link
        to="/"
        search={DEFAULT_PAGINATION}
        className="flex items-center gap-2"
      >
        <AudioWaveform />
        Quiz Management
      </Link>
      <div className="flex items-center gap-2">
        <AppThemeToggle />
        <NavUser />
      </div>
    </header>
  );
}
