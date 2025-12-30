import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
  initializeTheme: () => void;
};

const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme | null;
  return saved || getSystemTheme();
};

const applyThemeToDOM = (theme: Theme) => {
  const root = document.documentElement;
  const effectiveTheme = theme === "system" ? getSystemTheme() : theme;

  root.classList.remove("light", "dark");
  root.classList.add(effectiveTheme);
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),

      setTheme: (theme) => {
        set({ theme });
        get().applyTheme(theme);
      },

      applyTheme: (theme) => {
        applyThemeToDOM(theme);
        localStorage.setItem("theme", theme);
      },

      initializeTheme: () => {
        const { theme, applyTheme } = get();
        applyTheme(theme);
      },
    }),
    {
      name: "theme", // storage key
      partialize: (state) => ({ theme: state.theme }), // persist only theme
    }
  )
);
