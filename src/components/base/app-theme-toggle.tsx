import { useEffect } from "react";
import { LaptopMinimal, Moon, Sun, type LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/store";

/**
 * Define allowed theme types for type safety.
 * These correspond to the possible visual modes your app can have.
 */
type Theme = "light" | "dark" | "system";

/**
 * List of available themes shown in the dropdown.
 * Each theme includes a user-friendly name and an icon.
 */
const themes: { value: Theme; name: string; icon: LucideIcon }[] = [
  { value: "light", name: "Light", icon: Sun },
  { value: "dark", name: "Dark", icon: Moon },
  { value: "system", name: "System", icon: LaptopMinimal },
];

/**
 * Main theme toggle component.
 * Displays a dropdown for selecting the app's color mode.
 * Uses Zustand store for centralized theme management.
 */
export default function AppThemeToggle() {
  const { theme, setTheme, initializeTheme } = useTheme();

  /**
   * Initialize theme on component mount.
   * This applies the saved or system theme to the DOM.
   */
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  /**
   * If the user selects "system", listen for system preference changes
   * (e.g., when macOS or Windows switches to dark mode automatically)
   * and update the theme dynamically in response.
   */
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, setTheme]);

  return (
    <DropdownMenu>
      {/* The button users click to open the dropdown */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          {/* Sun icon for light mode */}
          <Sun className=" scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          {/* Moon icon for dark mode */}
          <Moon className="absolute  scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown content listing all available themes */}
      <DropdownMenuContent align="end" className="space-y-0.5">
        {themes.map((item) => {
          const isActive = item.value === theme;
          return (
            <DropdownMenuItem
              key={item.value}
              onClick={() => setTheme(item.value)}
              className={`flex items-center gap-2 ${
                isActive ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              <item.icon />
              <span>{item.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
