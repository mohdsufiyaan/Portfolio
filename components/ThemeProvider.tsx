"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (next: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

function syncThemeDom(next: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", next);
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", next === "dark" ? "#050811" : "#f8fafc");
  }
  try {
    window.localStorage.setItem("portfolio-theme", next);
  } catch {
    /* ignore storage restrictions */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") {
      setThemeState(current);
      syncThemeDom(current);
      return;
    }
    const stored = window.localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") {
      syncThemeDom(stored);
      setThemeState(stored);
      return;
    }
    const prefersLight =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: Theme = prefersLight ? "light" : "dark";
    syncThemeDom(initial);
    setThemeState(initial);
  }, []);

  const setTheme = (next: Theme) => {
    syncThemeDom(next);
    setThemeState(next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    syncThemeDom(next);
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
