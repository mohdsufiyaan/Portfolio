"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="btn-cool-secondary inline-flex h-[38px] items-center gap-1.5 rounded-xl px-3 text-xs font-semibold"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -25, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-3.5 w-3.5 text-amber-400" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-blue-600" />
        )}
      </motion.span>
      <span className="hidden xl:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
